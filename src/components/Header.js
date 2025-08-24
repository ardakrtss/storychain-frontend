'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { usePathname } from 'next/navigation';

export default function Header() {
  const { user, signOut } = useAuth();
  const pathname = usePathname();

  // Don't show header on nickname page
  if (pathname === '/nickname') {
    return null;
  }

  const handleLogout = () => {
    signOut();
  };

  return (
    <header className="bg-white/95 backdrop-blur-xl text-gray-900 shadow-2xl border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="text-3xl group-hover:scale-110 transition-transform duration-300">✏️</div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-500 group-hover:via-pink-500 group-hover:to-purple-500 transition-all duration-300">
              StoryChain
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            <Link 
              href="/" 
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                pathname === '/' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Ana Sayfa
            </Link>
            <Link 
              href="/stories" 
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                pathname === '/stories' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Hikayeler
            </Link>
            <Link 
              href="/write" 
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                pathname === '/write' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Hikaye Yaz
            </Link>
            <Link 
              href="/about" 
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                pathname === '/about' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Hakkımızda
            </Link>
            {!user && (
              <>
                <Link 
                  href="/register" 
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    pathname === '/register' 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Kayıt Ol
                </Link>
                <Link 
                  href="/nickname" 
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    pathname === '/nickname' 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Giriş Yap
                </Link>
              </>
            )}
          </nav>

          {/* User Menu - Only show when logged in */}
          {user && (
            <div className="hidden md:flex items-center space-x-3">
              <span className="text-gray-700 font-medium px-4 py-2 bg-gray-100 rounded-xl backdrop-blur-sm">
                Merhaba, {user.nickname || 'Yazar'}! 👋
              </span>
              {user.role === 'admin' && (
                <Link 
                  href="/admin" 
                  className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Admin Panel
                </Link>
              )}
              <Link 
                href="/profile" 
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300 border border-gray-200 hover:border-gray-300 backdrop-blur-sm"
              >
                👤 Profilim
              </Link>
              <button 
                onClick={handleLogout} 
                className="bg-gray-100 hover:bg-red-100 text-gray-700 hover:text-red-600 px-6 py-3 rounded-xl font-semibold transition-all duration-300 border border-gray-200 hover:border-red-300 backdrop-blur-sm"
              >
                🚪 Çıkış
              </button>
            </div>
          )}

          {/* Mobile Navigation - Text Links */}
          <div className="md:hidden flex items-center space-x-2 overflow-x-auto px-2">
            <Link 
              href="/" 
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 whitespace-nowrap bg-gray-100 hover:bg-gray-200 ${
                pathname === '/' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-sm' 
                  : 'text-gray-700'
              }`}
            >
              Ana Sayfa
            </Link>
            <Link 
              href="/stories" 
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 whitespace-nowrap bg-gray-100 hover:bg-gray-200 ${
                pathname === '/stories' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-sm' 
                  : 'text-gray-700'
              }`}
            >
              Hikayeler
            </Link>
            <Link 
              href="/write" 
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 whitespace-nowrap bg-gray-100 hover:bg-gray-200 ${
                pathname === '/write' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-sm' 
                  : 'text-gray-700'
              }`}
            >
              Hikaye Yaz
            </Link>
            <Link 
              href="/about" 
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 whitespace-nowrap bg-gray-100 hover:bg-gray-200 ${
                pathname === '/about' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-sm' 
                  : 'text-gray-700'
              }`}
            >
              Hakkımızda
            </Link>
            {!user && (
              <>
                <Link 
                  href="/register" 
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 whitespace-nowrap shadow-lg transform hover:scale-105 ${
                    pathname === '/register' 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-xl' 
                      : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 hover:shadow-xl'
                  }`}
                >
                  ✨ Kayıt Ol
                </Link>
                <Link 
                  href="/nickname" 
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 whitespace-nowrap bg-gray-100 hover:bg-gray-200 ${
                    pathname === '/nickname' 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-sm' 
                      : 'text-gray-700'
                  }`}
                >
                  Giriş Yap
                </Link>
              </>
            )}
            {user && (
              <>
                <Link 
                  href="/profile" 
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 whitespace-nowrap bg-gray-100 hover:bg-gray-200 ${
                    pathname === '/profile' 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-sm' 
                      : 'text-gray-700'
                  }`}
                >
                  Profilim
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
