import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  deleteDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';

// Hikaye koleksiyonu referansı
const storiesCollection = collection(db, 'stories');

// Yeni hikaye oluştur
export const createStory = async (storyData) => {
  try {
    const story = {
      title: storyData.title,
      theme: storyData.theme,
      authorId: storyData.authorId,
      authorName: storyData.authorName,
      segments: [{
        content: storyData.initialContent,
        authorId: storyData.authorId,
        authorName: storyData.authorName,
        createdAt: serverTimestamp(),
        segmentNumber: 1
      }],
      isComplete: false,
      maxSegments: 3,
      currentSegment: 1,
      likeCount: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const docRef = await addDoc(storiesCollection, story);
    return { success: true, storyId: docRef.id, story };
  } catch (error) {
    console.error('Create story error:', error);
    return { success: false, error: 'Hikaye oluşturulurken hata oluştu' };
  }
};

// Hikayeye segment ekle
export const addSegmentToStory = async (storyId, segmentData) => {
  try {
    const storyRef = doc(db, 'stories', storyId);
    const storyDoc = await getDoc(storyRef);
    
    if (!storyDoc.exists()) {
      return { success: false, error: 'Hikaye bulunamadı' };
    }

    const storyData = storyDoc.data();
    
    // Hikaye tamamlanmış mı kontrol et
    if (storyData.isComplete) {
      return { success: false, error: 'Bu hikaye zaten tamamlanmış' };
    }

    // Maksimum segment sayısını kontrol et
    if (storyData.segments.length >= storyData.maxSegments) {
      return { success: false, error: 'Hikaye maksimum segment sayısına ulaştı' };
    }

    // Yeni segment
    const newSegment = {
      content: segmentData.content,
      authorId: segmentData.authorId,
      authorName: segmentData.authorName,
      createdAt: serverTimestamp(),
      segmentNumber: storyData.segments.length + 1
    };

    // Hikayeyi güncelle
    const updatedSegments = [...storyData.segments, newSegment];
    const isComplete = updatedSegments.length >= storyData.maxSegments;
    
    await updateDoc(storyRef, {
      segments: updatedSegments,
      currentSegment: updatedSegments.length,
      isComplete: isComplete,
      updatedAt: serverTimestamp()
    });

    return { 
      success: true, 
      segment: newSegment,
      isComplete: isComplete
    };
  } catch (error) {
    console.error('Add segment error:', error);
    return { success: false, error: 'Segment eklenirken hata oluştu' };
  }
};

// Hikaye detaylarını getir
export const getStory = async (storyId) => {
  try {
    const storyRef = doc(db, 'stories', storyId);
    const storyDoc = await getDoc(storyRef);
    
    if (!storyDoc.exists()) {
      return { success: false, error: 'Hikaye bulunamadı' };
    }

    const storyData = storyDoc.data();
    return { 
      success: true, 
      story: {
        id: storyDoc.id,
        ...storyData
      }
    };
  } catch (error) {
    console.error('Get story error:', error);
    return { success: false, error: 'Hikaye yüklenirken hata oluştu' };
  }
};

// Tüm hikayeleri getir
export const getAllStories = async () => {
  try {
    const q = query(
      storiesCollection,
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const stories = [];
    
    querySnapshot.forEach((doc) => {
      stories.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return { success: true, stories };
  } catch (error) {
    console.error('Get all stories error:', error);
    return { success: false, error: 'Hikayeler yüklenirken hata oluştu' };
  }
};

// Tamamlanmış hikayeleri getir
export const getCompletedStories = async () => {
  try {
    const q = query(
      storiesCollection,
      where('isComplete', '==', true),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const stories = [];
    
    querySnapshot.forEach((doc) => {
      stories.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return { success: true, stories };
  } catch (error) {
    console.error('Get completed stories error:', error);
    return { success: false, error: 'Tamamlanmış hikayeler yüklenirken hata oluştu' };
  }
};

// Devam eden hikayeleri getir
export const getOngoingStories = async () => {
  try {
    const q = query(
      storiesCollection,
      where('isComplete', '==', false),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const stories = [];
    
    querySnapshot.forEach((doc) => {
      stories.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return { success: true, stories };
  } catch (error) {
    console.error('Get ongoing stories error:', error);
    return { success: false, error: 'Devam eden hikayeler yüklenirken hata oluştu' };
  }
};

// Kullanıcının hikayelerini getir
export const getUserStories = async (userId) => {
  try {
    const q = query(
      storiesCollection,
      where('authorId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const stories = [];
    
    querySnapshot.forEach((doc) => {
      stories.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return { success: true, stories };
  } catch (error) {
    console.error('Get user stories error:', error);
    return { success: false, error: 'Kullanıcı hikayeleri yüklenirken hata oluştu' };
  }
};

// Hikaye beğen
export const likeStory = async (storyId, userId) => {
  try {
    const storyRef = doc(db, 'stories', storyId);
    const storyDoc = await getDoc(storyRef);
    
    if (!storyDoc.exists()) {
      return { success: false, error: 'Hikaye bulunamadı' };
    }

    const storyData = storyDoc.data();
    const newLikeCount = storyData.likeCount + 1;
    
    await updateDoc(storyRef, {
      likeCount: newLikeCount,
      updatedAt: serverTimestamp()
    });

    return { success: true, likeCount: newLikeCount };
  } catch (error) {
    console.error('Like story error:', error);
    return { success: false, error: 'Hikaye beğenilirken hata oluştu' };
  }
};

// Hikaye sil
export const deleteStory = async (storyId, userId) => {
  try {
    const storyRef = doc(db, 'stories', storyId);
    const storyDoc = await getDoc(storyRef);
    
    if (!storyDoc.exists()) {
      return { success: false, error: 'Hikaye bulunamadı' };
    }

    const storyData = storyDoc.data();
    
    // Sadece hikaye sahibi silebilir
    if (storyData.authorId !== userId) {
      return { success: false, error: 'Bu hikayeyi silme yetkiniz yok' };
    }

    await deleteDoc(storyRef);
    return { success: true };
  } catch (error) {
    console.error('Delete story error:', error);
    return { success: false, error: 'Hikaye silinirken hata oluştu' };
  }
};

// Popüler hikayeleri getir
export const getPopularStories = async (limit = 10) => {
  try {
    const q = query(
      storiesCollection,
      where('isComplete', '==', true),
      orderBy('likeCount', 'desc'),
      limit(limit)
    );
    
    const querySnapshot = await getDocs(q);
    const stories = [];
    
    querySnapshot.forEach((doc) => {
      stories.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return { success: true, stories };
  } catch (error) {
    console.error('Get popular stories error:', error);
    return { success: false, error: 'Popüler hikayeler yüklenirken hata oluştu' };
  }
};
