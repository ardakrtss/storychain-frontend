import { storiesCollection } from './firebase-admin';
import { v4 as uuidv4 } from 'uuid';

// Hikaye oluşturma
export async function createStory(storyData) {
  try {
    const { title, content, theme, authorId, authorNickname } = storyData;

    const newStory = {
      id: uuidv4(),
      title: title.trim(),
      content: content.trim(),
      theme: theme,
      authorId: authorId,
      authorNickname: authorNickname,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isCompleted: false,
      likes: [],
      likeCount: 0,
      views: 0,
      isActive: true
    };

    // Firestore'a kaydet
    await storiesCollection.doc(newStory.id).set(newStory);

    return { success: true, story: newStory };

  } catch (error) {
    console.error('Hikaye oluşturma hatası:', error);
    return { success: false, error: 'Hikaye oluşturulamadı' };
  }
}

// Hikaye getirme (ID ile)
export async function getStoryById(storyId) {
  try {
    const doc = await storiesCollection.doc(storyId).get();
    
    if (!doc.exists) {
      return null;
    }

    return { id: doc.id, ...doc.data() };

  } catch (error) {
    console.error('Hikaye getirme hatası:', error);
    return null;
  }
}

// Kullanıcının hikayelerini getirme
export async function getStoriesByAuthor(authorId) {
  try {
    const snapshot = await storiesCollection
      .where('authorId', '==', authorId)
      .where('isActive', '==', true)
      .orderBy('createdAt', 'desc')
      .get();

    const stories = [];
    snapshot.forEach(doc => {
      stories.push({ id: doc.id, ...doc.data() });
    });

    return { success: true, stories };

  } catch (error) {
    console.error('Kullanıcı hikayeleri getirme hatası:', error);
    return { success: false, error: 'Hikayeler getirilemedi' };
  }
}

// Tema bazlı hikayeleri getirme
export async function getStoriesByTheme(theme) {
  try {
    const snapshot = await storiesCollection
      .where('theme', '==', theme)
      .where('isActive', '==', true)
      .where('isCompleted', '==', true)
      .orderBy('createdAt', 'desc')
      .limit(20)
      .get();

    const stories = [];
    snapshot.forEach(doc => {
      stories.push({ id: doc.id, ...doc.data() });
    });

    return { success: true, stories };

  } catch (error) {
    console.error('Tema hikayeleri getirme hatası:', error);
    return { success: false, error: 'Hikayeler getirilemedi' };
  }
}

// Tamamlanmış hikayeleri getirme
export async function getCompletedStories() {
  try {
    const snapshot = await storiesCollection
      .where('isCompleted', '==', true)
      .where('isActive', '==', true)
      .orderBy('createdAt', 'desc')
      .limit(50)
      .get();

    const stories = [];
    snapshot.forEach(doc => {
      stories.push({ id: doc.id, ...doc.data() });
    });

    return { success: true, stories };

  } catch (error) {
    console.error('Tamamlanmış hikayeler getirme hatası:', error);
    return { success: false, error: 'Hikayeler getirilemedi' };
  }
}

// Popüler hikayeleri getirme
export async function getPopularStories(limit = 10) {
  try {
    const snapshot = await storiesCollection
      .where('isCompleted', '==', true)
      .where('isActive', '==', true)
      .orderBy('likeCount', 'desc')
      .limit(limit)
      .get();

    const stories = [];
    snapshot.forEach(doc => {
      stories.push({ id: doc.id, ...doc.data() });
    });

    return { success: true, stories };

  } catch (error) {
    console.error('Popüler hikayeler getirme hatası:', error);
    return { success: false, error: 'Hikayeler getirilemedi' };
  }
}

// Hikaye güncelleme
export async function updateStory(storyId, updates) {
  try {
    const updateData = {
      ...updates,
      updatedAt: new Date().toISOString()
    };

    await storiesCollection.doc(storyId).update(updateData);
    return { success: true };

  } catch (error) {
    console.error('Hikaye güncelleme hatası:', error);
    return { success: false, error: 'Hikaye güncellenemedi' };
  }
}

// Hikaye beğenme/beğenmeme
export async function toggleStoryLike(storyId, userId) {
  try {
    const story = await getStoryById(storyId);
    
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

    await updateStory(storyId, {
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
}

// Hikaye silme
export async function deleteStory(storyId, authorId) {
  try {
    const story = await getStoryById(storyId);
    
    if (!story) {
      return { success: false, error: 'Hikaye bulunamadı' };
    }

    if (story.authorId !== authorId) {
      return { success: false, error: 'Bu işlem için yetkiniz yok' };
    }

    await storiesCollection.doc(storyId).update({
      isActive: false,
      updatedAt: new Date().toISOString()
    });

    return { success: true };

  } catch (error) {
    console.error('Hikaye silme hatası:', error);
    return { success: false, error: 'Hikaye silinemedi' };
  }
}

// Tüm hikayeleri getirme (admin için)
export async function getAllStories() {
  try {
    const snapshot = await storiesCollection
      .where('isActive', '==', true)
      .orderBy('createdAt', 'desc')
      .get();

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
