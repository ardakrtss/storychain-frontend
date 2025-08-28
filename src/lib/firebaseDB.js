import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  updateDoc,
  deleteDoc,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

// Koleksiyon referansları
const usersCollection = collection(db, 'users');
const storiesCollection = collection(db, 'stories');
const themesCollection = collection(db, 'themes');
const leaderboardCollection = collection(db, 'leaderboard');

// Kullanıcı işlemleri
export const userDB = {
  // Kullanıcı oluşturma
  createUser: async (userData) => {
    try {
      const { nickname, password } = userData;
      
      // Kullanıcı adı zaten var mı kontrol et
      const existingUser = await userDB.getUserByNickname(nickname);
      if (existingUser) {
        return { success: false, error: 'Bu kullanıcı adı zaten kullanılıyor' };
      }

      // Şifreyi hashle
      const hashedPassword = await bcrypt.hash(password, 10);

      // Yeni kullanıcı dokümanı
      const newUser = {
        id: uuidv4(),
        nickname: nickname.trim(),
        password: hashedPassword,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        isActive: true,
        role: 'user'
      };

      // Firestore'a kaydet
      await setDoc(doc(usersCollection, newUser.id), newUser);

      // Şifreyi çıkar ve döndür
      const { password: _, ...userWithoutPassword } = newUser;
      return { success: true, user: userWithoutPassword };

    } catch (error) {
      console.error('Kullanıcı oluşturma hatası:', error);
      return { success: false, error: 'Kullanıcı oluşturulamadı' };
    }
  },

  // Kullanıcı adına göre kullanıcı getirme
  getUserByNickname: async (nickname) => {
    try {
      const q = query(
        usersCollection,
        where('nickname', '==', nickname.trim()),
        limit(1)
      );
      
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        return null;
      }

      const doc = snapshot.docs[0];
      return { id: doc.id, ...doc.data() };

    } catch (error) {
      console.error('Kullanıcı getirme hatası:', error);
      return null;
    }
  },

  // Kullanıcı ID'sine göre kullanıcı getirme
  getUserById: async (userId) => {
    try {
      const docRef = doc(usersCollection, userId);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        return null;
      }

      return { id: docSnap.id, ...docSnap.data() };

    } catch (error) {
      console.error('Kullanıcı getirme hatası:', error);
      return null;
    }
  },

  // Kullanıcı doğrulama
  authenticateUser: async (nickname, password) => {
    try {
      const user = await userDB.getUserByNickname(nickname);
      
      if (!user) {
        return { success: false, error: 'Kullanıcı bulunamadı' };
      }

      // Şifreyi kontrol et
      const isValidPassword = await bcrypt.compare(password, user.password);
      
      if (!isValidPassword) {
        return { success: false, error: 'Geçersiz şifre' };
      }

      // Şifreyi çıkar ve döndür
      const { password: _, ...userWithoutPassword } = user;
      return { success: true, user: userWithoutPassword };

    } catch (error) {
      console.error('Kullanıcı doğrulama hatası:', error);
      return { success: false, error: 'Doğrulama hatası' };
    }
  },

  // Kullanıcı güncelleme
  updateUser: async (userId, updates) => {
    try {
      const updateData = {
        ...updates,
        updatedAt: serverTimestamp()
      };

      await updateDoc(doc(usersCollection, userId), updateData);
      return { success: true };

    } catch (error) {
      console.error('Kullanıcı güncelleme hatası:', error);
      return { success: false, error: 'Kullanıcı güncellenemedi' };
    }
  },

  // Tüm kullanıcıları getirme (admin için)
  getAllUsers: async () => {
    try {
      const q = query(
        usersCollection,
        where('isActive', '==', true),
        orderBy('createdAt', 'desc')
      );
      
      const snapshot = await getDocs(q);

      const users = [];
      snapshot.forEach(doc => {
        const userData = doc.data();
        const { password, ...userWithoutPassword } = userData;
        users.push({ id: doc.id, ...userWithoutPassword });
      });

      return { success: true, users };

    } catch (error) {
      console.error('Kullanıcıları getirme hatası:', error);
      return { success: false, error: 'Kullanıcılar getirilemedi' };
    }
  }
};

// Hikaye işlemleri
export const storyDB = {
  // Hikaye oluşturma
  createStory: async (storyData) => {
    try {
      const { title, content, theme, authorId, authorNickname } = storyData;

      const newStory = {
        id: uuidv4(),
        title: title.trim(),
        content: content.trim(),
        theme: theme,
        authorId: authorId,
        authorNickname: authorNickname,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        isCompleted: false,
        likes: [],
        likeCount: 0,
        views: 0,
        isActive: true
      };

      // Firestore'a kaydet
      await setDoc(doc(storiesCollection, newStory.id), newStory);

      return { success: true, story: newStory };

    } catch (error) {
      console.error('Hikaye oluşturma hatası:', error);
      return { success: false, error: 'Hikaye oluşturulamadı' };
    }
  },

  // Hikaye getirme (ID ile)
  getStoryById: async (storyId) => {
    try {
      const docRef = doc(storiesCollection, storyId);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        return null;
      }

      return { id: docSnap.id, ...docSnap.data() };

    } catch (error) {
      console.error('Hikaye getirme hatası:', error);
      return null;
    }
  },

  // Kullanıcının hikayelerini getirme
  getStoriesByAuthor: async (authorId) => {
    try {
      const q = query(
        storiesCollection,
        where('authorId', '==', authorId),
        where('isActive', '==', true),
        orderBy('createdAt', 'desc')
      );
      
      const snapshot = await getDocs(q);

      const stories = [];
      snapshot.forEach(doc => {
        stories.push({ id: doc.id, ...doc.data() });
      });

      return { success: true, stories };

    } catch (error) {
      console.error('Kullanıcı hikayeleri getirme hatası:', error);
      return { success: false, error: 'Hikayeler getirilemedi' };
    }
  },

  // Tema bazlı hikayeleri getirme
  getStoriesByTheme: async (theme) => {
    try {
      const q = query(
        storiesCollection,
        where('theme', '==', theme),
        where('isActive', '==', true),
        where('isCompleted', '==', true),
        orderBy('createdAt', 'desc'),
        limit(20)
      );
      
      const snapshot = await getDocs(q);

      const stories = [];
      snapshot.forEach(doc => {
        stories.push({ id: doc.id, ...doc.data() });
      });

      return { success: true, stories };

    } catch (error) {
      console.error('Tema hikayeleri getirme hatası:', error);
      return { success: false, error: 'Hikayeler getirilemedi' };
    }
  },

  // Tamamlanmış hikayeleri getirme
  getCompletedStories: async () => {
    try {
      const q = query(
        storiesCollection,
        where('isCompleted', '==', true),
        where('isActive', '==', true),
        orderBy('createdAt', 'desc'),
        limit(50)
      );
      
      const snapshot = await getDocs(q);

      const stories = [];
      snapshot.forEach(doc => {
        stories.push({ id: doc.id, ...doc.data() });
      });

      return { success: true, stories };

    } catch (error) {
      console.error('Tamamlanmış hikayeler getirme hatası:', error);
      return { success: false, error: 'Hikayeler getirilemedi' };
    }
  },

  // Popüler hikayeleri getirme
  getPopularStories: async (limitCount = 10) => {
    try {
      const q = query(
        storiesCollection,
        where('isCompleted', '==', true),
        where('isActive', '==', true),
        orderBy('likeCount', 'desc'),
        limit(limitCount)
      );
      
      const snapshot = await getDocs(q);

      const stories = [];
      snapshot.forEach(doc => {
        stories.push({ id: doc.id, ...doc.data() });
      });

      return { success: true, stories };

    } catch (error) {
      console.error('Popüler hikayeler getirme hatası:', error);
      return { success: false, error: 'Hikayeler getirilemedi' };
    }
  },

  // Hikaye güncelleme
  updateStory: async (storyId, updates) => {
    try {
      const updateData = {
        ...updates,
        updatedAt: serverTimestamp()
      };

      await updateDoc(doc(storiesCollection, storyId), updateData);
      return { success: true };

    } catch (error) {
      console.error('Hikaye güncelleme hatası:', error);
      return { success: false, error: 'Hikaye güncellenemedi' };
    }
  },

  // Hikaye beğenme/beğenmeme
  toggleStoryLike: async (storyId, userId) => {
    try {
      const story = await storyDB.getStoryById(storyId);
      
      if (!story) {
        return { success: false, error: 'Hikaye bulunamadı' };
      }

      const likes = story.likes || [];
      const userIndex = likes.indexOf(userId);

      if (userIndex > -1) {
        // Beğeniyi kaldır
        likes.splice(userIndex, 1);
      } else {
        // Beğeni ekle
        likes.push(userId);
      }

      await storyDB.updateStory(storyId, {
        likes: likes,
        likeCount: likes.length
      });

      return { 
        success: true, 
        liked: userIndex === -1,
        likeCount: likes.length 
      };

    } catch (error) {
      console.error('Hikaye beğenme hatası:', error);
      return { success: false, error: 'İşlem başarısız' };
    }
  },

  // Hikaye silme
  deleteStory: async (storyId, authorId) => {
    try {
      const story = await storyDB.getStoryById(storyId);
      
      if (!story) {
        return { success: false, error: 'Hikaye bulunamadı' };
      }

      if (story.authorId !== authorId) {
        return { success: false, error: 'Bu işlem için yetkiniz yok' };
      }

      await storyDB.updateStory(storyId, {
        isActive: false
      });

      return { success: true };

    } catch (error) {
      console.error('Hikaye silme hatası:', error);
      return { success: false, error: 'Hikaye silinemedi' };
    }
  },

  // Tüm hikayeleri getirme (admin için)
  getAllStories: async () => {
    try {
      const q = query(
        storiesCollection,
        where('isActive', '==', true),
        orderBy('createdAt', 'desc')
      );
      
      const snapshot = await getDocs(q);

      const stories = [];
      snapshot.forEach(doc => {
        stories.push({ id: doc.id, ...doc.data() });
      });

      return { success: true, stories };

    } catch (error) {
      console.error('Tüm hikayeler getirme hatası:', error);
      return { success: false, error: 'Hikayeler getirilemedi' };
    }
  }
};
