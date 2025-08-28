import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

export const db = admin.firestore();
export const auth = admin.auth();

// Koleksiyon referansları
export const usersCollection = db.collection('users');
export const storiesCollection = db.collection('stories');
export const themesCollection = db.collection('themes');
export const leaderboardCollection = db.collection('leaderboard');
