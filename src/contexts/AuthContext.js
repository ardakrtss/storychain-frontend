'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api';

const AuthContext = createContext(undefined);

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
    // Check if user is logged in on app start
    const checkAuth = async () => {
      try {
        // Cookie-based authentication - /api/auth/me endpoint'i kullan
        const response = await api.get('/auth/me');
        setUser(response.data);
      } catch (error) {
        // Kullanıcı giriş yapmamış, user null kalacak
        console.log('User not authenticated');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const signIn = async (nickname, password) => {
    try {
      // Cookie-based authentication
      const response = await api.post('/auth/login', { 
        nickname: nickname.toLowerCase(), 
        password 
      });
      
      // Cookie otomatik olarak set edildi, user bilgisini al
      const userResponse = await api.get('/auth/me');
      setUser(userResponse.data);
      
      return { success: true };
    } catch (error) {
      console.error('Sign in error:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Giriş yapılamadı';
      return { 
        success: false, 
        error: errorMessage
      };
    }
  };

  const signOut = async () => {
    try {
      // Cookie'yi temizlemek için logout endpoint'ini çağır
      await api.post('/auth/logout');
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
      // Hata olsa bile user'ı temizle
      setUser(null);
    }
  };

  const updateUser = async (updates) => {
    try {
      if (user) {
        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
      }
    } catch (error) {
      console.error('Update user error:', error);
    }
  };

  const value = {
    user,
    loading,
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
