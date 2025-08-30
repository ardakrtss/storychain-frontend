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

  const handleLogout = async () => {
    try {
      await signOut();
      console.log('✅ Çıkış başarılı');
    } catch (error) {
      console.error('❌ Çıkış hatası:', error);
    }
  };

  return (
    <header className="bg-gradient-to-r from-gray-100 to-white text-black shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-6 h-6 bg-gradient-to-r from-pink-500 via-orange-500 to-purple-500 rounded-full"></div>
            <span className="text-xl font-bold">
              <span className="text-purple-800">Story</span>
              <span className="text-purple-500">Chain</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                pathname === '/' 
                  ? 'bg-purple-500 text-white shadow-md' 
                  : 'text-gray-700 hover:text-black hover:bg-gray-100'
              }`}
            >
              Ana Sayfa
            </Link>
            <Link 
              href="/stories" 
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                pathname === '/stories' 
                  ? 'bg-purple-500 text-white shadow-md' 
                  : 'text-gray-700 hover:text-black hover:bg-gray-100'
              }`}
            >
              Hikayeler
            </Link>
            <Link 
              href="/write" 
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                pathname === '/write' 
                  ? 'bg-purple-500 text-white shadow-md' 
                  : 'text-gray-700 hover:text-black hover:bg-gray-100'
              }`}
            >
              Hikaye Yaz
            </Link>
            <Link 
              href="/themes" 
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                pathname === '/themes' 
                  ? 'bg-purple-500 text-white shadow-md' 
                  : 'text-gray-700 hover:text-black hover:bg-gray-100'
              }`}
            >
              Temalar
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {!user ? (
              <>
                <Link 
                  href="/nickname" 
                  className="px-6 py-2 rounded-lg font-medium transition-all duration-300 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                >
                  Giriş Yap
                </Link>
                <Link 
                  href="/kaydol" 
                  className="px-6 py-2 rounded-lg font-medium transition-all duration-300 bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 shadow-md"
                >
                  Kaydol
                </Link>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-3">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">👋</span> {user.nickname || user.displayName || user.email}
                  </div>
                  <Link 
                    href="/write" 
                    className="px-4 py-2 rounded-lg font-medium transition-all duration-300 bg-purple-500 text-white hover:bg-purple-600 shadow-md"
                  >
                    ✏️ Yaz
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-lg font-medium transition-all duration-300 text-gray-700 hover:text-black hover:bg-gray-100"
                  >
                    Çıkış
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
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
            href="/themes"
            className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 whitespace-nowrap bg-gray-100 hover:bg-gray-200 ${
              pathname === '/themes'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-sm'
                : 'text-gray-700'
            }`}
          >
            Temalar
          </Link>
          {!user && (
            <>
              <Link
                href="/kaydol"
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 whitespace-nowrap shadow-lg transform hover:scale-105 ${
                  pathname === '/kaydol'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 hover:shadow-xl'
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
              <div className="text-xs text-gray-600 px-2">
                👋 {user.nickname || user.displayName || user.email}
              </div>
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 whitespace-nowrap bg-gray-100 hover:bg-gray-200 text-gray-700"
              >
                Çıkış
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
