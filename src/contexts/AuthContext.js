'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../lib/api';

interface User {
  id: string;
  nickname: string;
  role?: 'user' | 'admin';
  stories_written?: number;
  total_likes?: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (nickname: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
             const checkAuth = async () => {
           const token = localStorage.getItem('token');
           const adminToken = localStorage.getItem('adminToken');
           
           if (adminToken) {
             try {
               const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');
               setUser(adminUser);
             } catch {
               localStorage.removeItem('adminToken');
               localStorage.removeItem('adminUser');
             }
           } else if (token) {
             try {
               const response = await api.get('/auth/me');
               setUser(response.data);
             } catch {
               localStorage.removeItem('token');
             }
           }
           setLoading(false);
         };

    checkAuth();
  }, []);

           const signIn = async (nickname: string): Promise<{ success: boolean; error?: string }> => {
           try {
             const response = await api.post('/auth/login', { nickname });
             const { token, user } = response.data;
             
             localStorage.setItem('token', token);
             setUser(user);
             
             return { success: true };
           } catch (error: unknown) {
             console.error('Sign in error:', error);
             const errorMessage = error instanceof Error ? error.message : 'Giriş yapılamadı';
             return { 
               success: false, 
               error: errorMessage
             };
           }
         };

           const signOut = async () => {
           try {
             localStorage.removeItem('token');
             localStorage.removeItem('adminToken');
             localStorage.removeItem('adminUser');
             setUser(null);
           } catch {
             console.error('Sign out error');
           }
         };

           const updateUser = async (updates: Partial<User>) => {
           try {
             if (user) {
               const response = await api.put('/users/profile', updates);
               setUser(response.data);
             }
           } catch {
             console.error('Update user error');
           }
         };

  const value: AuthContextType = {
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
