import { usersCollection } from './firebase-admin';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

// Kullanıcı oluşturma
export async function createUser(userData) {
  try {
    const { nickname, password } = userData;
    
    // Kullanıcı adı zaten var mı kontrol et (case-insensitive)
    const existingUser = await getUserByNickname(nickname);
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
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true,
      role: 'user'
    };

    // Firestore'a kaydet
    await usersCollection.doc(newUser.id).set(newUser);

    // Şifreyi çıkar ve döndür
    const { password: _, ...userWithoutPassword } = newUser;
    return { success: true, user: userWithoutPassword };

  } catch (error) {
    console.error('Kullanıcı oluşturma hatası:', error);
    return { success: false, error: 'Kullanıcı oluşturulamadı' };
  }
}

// Kullanıcı adına göre kullanıcı getirme
export async function getUserByNickname(nickname) {
  try {
    const snapshot = await usersCollection
      .where('nickname', '==', nickname.trim())
      .limit(1)
      .get();

    if (snapshot.empty) {
      return null;
    }

    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };

  } catch (error) {
    console.error('Kullanıcı getirme hatası:', error);
    return null;
  }
}

// Kullanıcı ID'sine göre kullanıcı getirme
export async function getUserById(userId) {
  try {
    const doc = await usersCollection.doc(userId).get();
    
    if (!doc.exists) {
      return null;
    }

    return { id: doc.id, ...doc.data() };

  } catch (error) {
    console.error('Kullanıcı getirme hatası:', error);
    return null;
  }
}

// Kullanıcı doğrulama
export async function authenticateUser(nickname, password) {
  try {
    const user = await getUserByNickname(nickname);
    
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
}

// Kullanıcı güncelleme
export async function updateUser(userId, updates) {
  try {
    const updateData = {
      ...updates,
      updatedAt: new Date().toISOString()
    };

    await usersCollection.doc(userId).update(updateData);
    return { success: true };

  } catch (error) {
    console.error('Kullanıcı güncelleme hatası:', error);
    return { success: false, error: 'Kullanıcı güncellenemedi' };
  }
}

// Tüm kullanıcıları getirme (admin için)
export async function getAllUsers() {
  try {
    const snapshot = await usersCollection
      .where('isActive', '==', true)
      .orderBy('createdAt', 'desc')
      .get();

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
