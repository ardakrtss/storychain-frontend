const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "storychain-xxxxx.firebaseapp.com",
  projectId: "storychain-xxxxx",
  storageBucket: "storychain-xxxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkUsers() {
  try {
    console.log('Firebase veritabanındaki kullanıcılar kontrol ediliyor...');
    
    const usersCollection = collection(db, 'users');
    const querySnapshot = await getDocs(usersCollection);
    
    console.log(`Toplam ${querySnapshot.size} kullanıcı bulundu:`);
    console.log('----------------------------------------');
    
    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      console.log(`ID: ${doc.id}`);
      console.log(`Nickname: ${userData.nickname || 'Belirtilmemiş'}`);
      console.log(`Email: ${userData.email || 'Belirtilmemiş'}`);
      console.log(`Role: ${userData.role || 'user'}`);
      console.log(`Created: ${userData.createdAt ? new Date(userData.createdAt.seconds * 1000).toLocaleString('tr-TR') : 'Belirtilmemiş'}`);
      console.log('----------------------------------------');
    });
    
  } catch (error) {
    console.error('Hata:', error);
  }
}

checkUsers();
