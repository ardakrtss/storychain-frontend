import { db, usersCollection, storiesCollection, themesCollection, leaderboardCollection } from './firebase-admin.js';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

// User Services
export const userDB = {
  async createUser(nickname, password) {
    try {
      // Check if user already exists
      const existingUser = await usersCollection
        .where('nickname', '==', nickname.toLowerCase())
        .get();
      
      if (!existingUser.empty) {
        throw new Error('Bu rumuz zaten kullanılıyor');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        id: uuidv4(),
        nickname: nickname.toLowerCase(),
        password: hashedPassword,
        createdAt: new Date().toISOString(),
        isActive: true,
        role: 'user'
      };

      await usersCollection.doc(newUser.id).set(newUser);
      return { ...newUser, password: undefined };
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  async authenticateUser(nickname, password) {
    try {
      const userSnapshot = await usersCollection
        .where('nickname', '==', nickname.toLowerCase())
        .get();

      if (userSnapshot.empty) {
        throw new Error('Kullanıcı bulunamadı');
      }

      const userDoc = userSnapshot.docs[0];
      const user = userDoc.data();

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error('Şifre yanlış');
      }

      return { ...user, password: undefined };
    } catch (error) {
      console.error('Error authenticating user:', error);
      throw error;
    }
  },

  async getUserById(userId) {
    try {
      const userDoc = await usersCollection.doc(userId).get();
      if (!userDoc.exists) {
        throw new Error('Kullanıcı bulunamadı');
      }
      const user = userDoc.data();
      return { ...user, password: undefined };
    } catch (error) {
      console.error('Error getting user by ID:', error);
      throw error;
    }
  },

  async updateUser(userId, updates) {
    try {
      await usersCollection.doc(userId).update(updates);
      return await this.getUserById(userId);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }
};

// Story Services
export const storyDB = {
  async createStory(storyData) {
    try {
      const newStory = {
        id: uuidv4(),
        ...storyData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true,
        likeCount: 0,
        userLikes: []
      };

      await storiesCollection.doc(newStory.id).set(newStory);
      return newStory;
    } catch (error) {
      console.error('Error creating story:', error);
      throw error;
    }
  },

  async getStoryById(storyId) {
    try {
      const storyDoc = await storiesCollection.doc(storyId).get();
      if (!storyDoc.exists) {
        throw new Error('Hikaye bulunamadı');
      }
      return storyDoc.data();
    } catch (error) {
      console.error('Error getting story by ID:', error);
      throw error;
    }
  },

  async updateStory(storyId, updates) {
    try {
      const updateData = {
        ...updates,
        updatedAt: new Date().toISOString()
      };
      await storiesCollection.doc(storyId).update(updateData);
      return await this.getStoryById(storyId);
    } catch (error) {
      console.error('Error updating story:', error);
      throw error;
    }
  },

  async getCompletedStories(limit = 50) {
    try {
      const storiesSnapshot = await storiesCollection
        .where('isCompleted', '==', true)
        .where('isActive', '==', true)
        .orderBy('createdAt', 'desc')
        .limit(limit)
        .get();

      return storiesSnapshot.docs.map(doc => doc.data());
    } catch (error) {
      console.error('Error getting completed stories:', error);
      throw error;
    }
  },

  async getPopularStories(limit = 10) {
    try {
      const storiesSnapshot = await storiesCollection
        .where('isCompleted', '==', true)
        .where('isActive', '==', true)
        .orderBy('likeCount', 'desc')
        .limit(limit)
        .get();

      return storiesSnapshot.docs.map(doc => doc.data());
    } catch (error) {
      console.error('Error getting popular stories:', error);
      throw error;
    }
  },

  async likeStory(storyId, userId) {
    try {
      const storyRef = storiesCollection.doc(storyId);
      const storyDoc = await storyRef.get();
      
      if (!storyDoc.exists) {
        throw new Error('Hikaye bulunamadı');
      }

      const story = storyDoc.data();
      const userLikes = story.userLikes || [];
      
      if (userLikes.includes(userId)) {
        // Unlike
        const newUserLikes = userLikes.filter(id => id !== userId);
        await storyRef.update({
          likeCount: story.likeCount - 1,
          userLikes: newUserLikes
        });
        return { liked: false, likeCount: story.likeCount - 1 };
      } else {
        // Like
        const newUserLikes = [...userLikes, userId];
        await storyRef.update({
          likeCount: story.likeCount + 1,
          userLikes: newUserLikes
        });
        return { liked: true, likeCount: story.likeCount + 1 };
      }
    } catch (error) {
      console.error('Error liking story:', error);
      throw error;
    }
  },

  async getStoriesByAuthor(authorId) {
    try {
      const storiesSnapshot = await storiesCollection
        .where('authorId', '==', authorId)
        .where('isActive', '==', true)
        .orderBy('createdAt', 'desc')
        .get();

      return storiesSnapshot.docs.map(doc => doc.data());
    } catch (error) {
      console.error('Error getting stories by author:', error);
      throw error;
    }
  },

  async getLikedStoriesByUser(userId) {
    try {
      const storiesSnapshot = await storiesCollection
        .where('userLikes', 'array-contains', userId)
        .where('isActive', '==', true)
        .orderBy('createdAt', 'desc')
        .get();

      return storiesSnapshot.docs.map(doc => doc.data());
    } catch (error) {
      console.error('Error getting liked stories by user:', error);
      throw error;
    }
  }
};

// Theme Services
export const themeDB = {
  async getThemes() {
    try {
      const themesSnapshot = await themesCollection.get();
      return themesSnapshot.docs.map(doc => doc.data());
    } catch (error) {
      console.error('Error getting themes:', error);
      throw error;
    }
  },

  async createTheme(themeData) {
    try {
      const newTheme = {
        id: uuidv4(),
        ...themeData,
        createdAt: new Date().toISOString(),
        isActive: true
      };

      await themesCollection.doc(newTheme.id).set(newTheme);
      return newTheme;
    } catch (error) {
      console.error('Error creating theme:', error);
      throw error;
    }
  }
};

// Leaderboard Services
export const leaderboardDB = {
  async getLeaderboard() {
    try {
      const leaderboardSnapshot = await leaderboardCollection
        .orderBy('score', 'desc')
        .limit(100)
        .get();

      return leaderboardSnapshot.docs.map(doc => doc.data());
    } catch (error) {
      console.error('Error getting leaderboard:', error);
      throw error;
    }
  },

  async updateScore(userId, score) {
    try {
      const userScoreDoc = await leaderboardCollection.doc(userId).get();
      
      if (userScoreDoc.exists) {
        const currentScore = userScoreDoc.data().score;
        if (score > currentScore) {
          await leaderboardCollection.doc(userId).update({
            score,
            updatedAt: new Date().toISOString()
          });
        }
      } else {
        await leaderboardCollection.doc(userId).set({
          userId,
          score,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error updating score:', error);
      throw error;
    }
  }
};
