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
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'text-gray-700 hover:text-black hover:bg-gray-100'
              }`}
            >
              Ana Sayfa
            </Link>
            <Link 
              href="/how-it-works" 
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                pathname === '/how-it-works' 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'text-gray-700 hover:text-black hover:bg-gray-100'
              }`}
            >
              Nasıl Çalışır
            </Link>
            <Link 
              href="/about" 
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                pathname === '/about' 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'text-gray-700 hover:text-black hover:bg-gray-100'
              }`}
            >
              Hakkımızda
            </Link>
            <Link 
              href="/contact" 
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                pathname === '/contact' 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'text-gray-700 hover:text-black hover:bg-gray-100'
              }`}
            >
              İletişim
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
                  href="/register" 
                  className="px-6 py-2 rounded-lg font-medium transition-all duration-300 bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 shadow-md"
                >
                  Kaydol
                </Link>
              </>
            ) : (
              <>
                <Link 
                  href="/profile" 
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    pathname === '/profile' 
                      ? 'bg-blue-500 text-white shadow-md' 
                      : 'text-gray-700 hover:text-black hover:bg-gray-100'
                  }`}
                >
                  Profilim
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg font-medium transition-all duration-300 text-gray-700 hover:text-black hover:bg-gray-100"
                >
                  Çıkış
                </button>
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
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-black shadow-xl'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 text-black hover:from-blue-600 hover:to-blue-700 hover:shadow-xl'
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
    </header>
  );
}
