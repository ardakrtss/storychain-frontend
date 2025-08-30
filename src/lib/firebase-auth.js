import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  collection, 
  query, 
  where, 
  getDocs 
} from 'firebase/firestore';
import { auth, db } from './firebase';

// Kullanıcı kayıt fonksiyonu
export const registerUser = async (nickname, email, password) => {
  try {
    console.log('🔥 Firebase Auth: Kullanıcı kaydı başlatılıyor...', { nickname, email });
    
    // Email ile kullanıcı oluştur
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    console.log('✅ Firebase Auth: Kullanıcı oluşturuldu', user.uid);

    // Kullanıcı profilini güncelle (nickname ekle)
    await updateProfile(user, {
      displayName: nickname
    });
    
    console.log('✅ Firebase Auth: Profil güncellendi');

    // Firestore'da kullanıcı dokümanı oluştur
    const userData = {
      uid: user.uid,
      nickname: nickname,
      email: email,
      role: 'user',
      isActive: true,
      storiesWritten: 0,
      totalLikes: 0,
      createdAt: new Date(),
      lastLogin: new Date()
    };
    
    console.log('🔥 Firestore: Kullanıcı dokümanı oluşturuluyor...', userData);
    
    await setDoc(doc(db, 'users', user.uid), userData);
    
    console.log('✅ Firestore: Kullanıcı dokümanı oluşturuldu');

    return { success: true, user: user };
  } catch (error) {
    console.error('❌ Register error:', error);
    let errorMessage = 'Kayıt olurken bir hata oluştu';
    
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'Bu email adresi zaten kullanılıyor';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'Şifre en az 6 karakter olmalıdır';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Geçersiz email adresi';
    }
    
    return { success: false, error: errorMessage };
  }
};

// Kullanıcı giriş fonksiyonu
export const loginUser = async (email, password) => {
  try {
    console.log('🔥 Firebase Auth: Giriş başlatılıyor...', { email });
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    console.log('✅ Firebase Auth: Giriş başarılı', user.uid);

    // Firestore'da kullanıcı bilgilerini güncelle
    await updateDoc(doc(db, 'users', user.uid), {
      lastLogin: new Date()
    });
    
    console.log('✅ Firestore: Son giriş tarihi güncellendi');

    return { success: true, user: user };
  } catch (error) {
    console.error('❌ Login error:', error);
    let errorMessage = 'Giriş yapılamadı';
    
    if (error.code === 'auth/user-not-found') {
      errorMessage = 'Kullanıcı bulunamadı';
    } else if (error.code === 'auth/wrong-password') {
      errorMessage = 'Hatalı şifre';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Geçersiz email adresi';
    }
    
    return { success: false, error: errorMessage };
  }
};

// Kullanıcı çıkış fonksiyonu
export const logoutUser = async () => {
  try {
    console.log('🔥 Firebase Auth: Çıkış yapılıyor...');
    await signOut(auth);
    console.log('✅ Firebase Auth: Çıkış başarılı');
    return { success: true };
  } catch (error) {
    console.error('❌ Logout error:', error);
    return { success: false, error: 'Çıkış yapılırken hata oluştu' };
  }
};

// Kullanıcı bilgilerini getir
export const getUserData = async (uid) => {
  try {
    console.log('🔥 Firestore: Kullanıcı bilgileri getiriliyor...', uid);
    
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      console.log('✅ Firestore: Kullanıcı bilgileri alındı', userData);
      return { success: true, data: userData };
    } else {
      console.log('⚠️ Firestore: Kullanıcı dokümanı bulunamadı');
      return { success: false, error: 'Kullanıcı bulunamadı' };
    }
  } catch (error) {
    console.error('❌ Get user data error:', error);
    return { success: false, error: 'Kullanıcı bilgileri alınamadı' };
  }
};

// Nickname ile kullanıcı ara
export const findUserByNickname = async (nickname) => {
  try {
    console.log('🔥 Firestore: Nickname ile kullanıcı aranıyor...', nickname);
    
    const q = query(collection(db, 'users'), where('nickname', '==', nickname.toLowerCase()));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      console.log('✅ Firestore: Kullanıcı bulundu', userData);
      return { success: true, data: userData };
    } else {
      console.log('⚠️ Firestore: Kullanıcı bulunamadı');
      return { success: false, error: 'Kullanıcı bulunamadı' };
    }
  } catch (error) {
    console.error('❌ Find user by nickname error:', error);
    return { success: false, error: 'Kullanıcı aranamadı' };
  }
};

// Şifre sıfırlama
export const resetPassword = async (email) => {
  try {
    console.log('🔥 Firebase Auth: Şifre sıfırlama emaili gönderiliyor...', email);
    
    await sendPasswordResetEmail(auth, email);
    
    console.log('✅ Firebase Auth: Şifre sıfırlama emaili gönderildi');
    return { success: true };
  } catch (error) {
    console.error('❌ Reset password error:', error);
    let errorMessage = 'Şifre sıfırlama emaili gönderilemedi';
    
    if (error.code === 'auth/user-not-found') {
      errorMessage = 'Bu email adresi ile kayıtlı kullanıcı bulunamadı';
    }
    
    return { success: false, error: errorMessage };
  }
};

// Auth state listener
export const onAuthStateChange = (callback) => {
  console.log('🔥 Firebase Auth: Auth state listener başlatılıyor...');
  return onAuthStateChanged(auth, (user) => {
    console.log('🔄 Firebase Auth: Auth state değişti', user ? user.uid : 'null');
    callback(user);
  });
};

export const getUsers = async () => {
  try {
    console.log('🔥 Firestore: Tüm kullanıcılar getiriliyor...');
    const usersSnapshot = await getDocs(collection(db, 'users'));
    const users = [];
    
    usersSnapshot.forEach((doc) => {
      const userData = doc.data();
      users.push({
        id: doc.id,
        ...userData,
        createdAt: userData.createdAt?.toDate() || new Date(),
        lastLogin: userData.lastLogin?.toDate() || new Date()
      });
    });
    
    console.log('✅ Firestore: Kullanıcılar getirildi', users.length);
    return users;
  } catch (error) {
    console.error('❌ Get users error:', error);
    throw error;
  }
};
