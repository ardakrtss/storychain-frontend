'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { 
  registerUser, 
  loginUser, 
  logoutUser, 
  getUserData, 
  onAuthStateChange 
} from '../lib/firebase-auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Firebase auth state listener
    const unsubscribe = onAuthStateChange(async (firebaseUser) => {
      if (firebaseUser) {
        // Firebase user varsa, Firestore'dan detaylı bilgileri al
        const userDataResult = await getUserData(firebaseUser.uid);
        if (userDataResult.success) {
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            ...userDataResult.data
          });
        } else {
          // Firestore'da kullanıcı yoksa, sadece Firebase user'ı kullan
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            nickname: firebaseUser.displayName,
            role: 'user',
            storiesWritten: 0,
            totalLikes: 0
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (nickname, email, password) => {
    try {
      const result = await registerUser(nickname, email, password);
      if (result.success) {
        // Kullanıcı otomatik olarak giriş yapacak ve auth state listener tetiklenecek
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Sign up error:', error);
      return { success: false, error: 'Kayıt olurken bir hata oluştu' };
    }
  };

  const signIn = async (email, password) => {
    try {
      const result = await loginUser(email, password);
      if (result.success) {
        // Kullanıcı otomatik olarak giriş yapacak ve auth state listener tetiklenecek
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Sign in error:', error);
      return { success: false, error: 'Giriş yapılamadı' };
    }
  };

  const signOut = async () => {
    try {
      await logoutUser();
      setUser(null);
      return { success: true };
    } catch (error) {
      console.error('Sign out error:', error);
      return { success: false, error: 'Çıkış yapılırken hata oluştu' };
    }
  };

  const updateUser = async (updates) => {
    try {
      if (user) {
        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        return { success: true };
      }
      return { success: false, error: 'Kullanıcı bulunamadı' };
    } catch (error) {
      console.error('Update user error:', error);
      return { success: false, error: 'Kullanıcı güncellenirken hata oluştu' };
    }
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
