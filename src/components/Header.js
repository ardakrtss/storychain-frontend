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
    <header className="bg-gradient-to-r from-gray-900/95 to-purple-900/95 backdrop-blur-xl text-white shadow-2xl border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="text-3xl group-hover:scale-110 transition-transform duration-300">✏️</div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:via-pink-300 group-hover:to-purple-300 transition-all duration-300">
              StoryChain
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1">
            <Link 
              href="/" 
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                pathname === '/' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Ana Sayfa
            </Link>
            <Link 
              href="/stories" 
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                pathname === '/stories' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Hikayeler
            </Link>
            <Link 
              href="/leaderboard" 
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                pathname === '/leaderboard' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Lider Tablosu
            </Link>
            <Link 
              href="/how-it-works" 
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                pathname === '/how-it-works' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Nasıl Çalışır
            </Link>
          </nav>

          {/* User Menu */}
          <div className="hidden lg:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-gray-300 font-medium px-4 py-2 bg-white/5 rounded-xl backdrop-blur-sm">
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
                  href="/themes" 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  ✏️ Hikaye Yaz
                </Link>
                <Link 
                  href="/profile" 
                  className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 border border-white/20 hover:border-white/40 backdrop-blur-sm"
                >
                  👤 Profilim
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="bg-white/10 hover:bg-red-500/20 text-white hover:text-red-300 px-6 py-3 rounded-xl font-semibold transition-all duration-300 border border-white/20 hover:border-red-500/40 backdrop-blur-sm"
                >
                  🚪 Çıkış
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  href="/register" 
                  className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 border border-white/20 hover:border-white/40 backdrop-blur-sm"
                >
                  📝 Kayıt Ol
                </Link>
                <Link 
                  href="/nickname" 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  🔑 Giriş Yap
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Navigation - Simplified */}
          <div className="lg:hidden flex items-center space-x-2">
            {user ? (
              <>
                <Link 
                  href="/themes" 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg"
                >
                  ✏️
                </Link>
                <Link 
                  href="/profile" 
                  className="bg-white/10 text-white px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 border border-white/20"
                >
                  👤
                </Link>
              </>
            ) : (
              <Link 
                href="/nickname" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg"
              >
                🔑
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
