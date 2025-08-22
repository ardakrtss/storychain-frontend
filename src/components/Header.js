'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { usePathname } from 'next/navigation';

export default function Header() {
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Don't show header on nickname page
  if (pathname === '/nickname') {
    return null;
  }

  const handleLogout = () => {
    signOut();
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white bg-opacity-90 backdrop-blur-sm text-gray-800 shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">✏️</div>
            <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">StoryChain</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              Ana Sayfa
            </Link>
            <Link href="/stories" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              Hikayeler
            </Link>
            <Link href="/leaderboard" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              Lider Tablosu
            </Link>
            <Link href="/how-it-works" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              Nasıl Çalışır
            </Link>
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-medium">Merhaba, {user.nickname || 'Yazar'}!</span>
                {user.role === 'admin' && (
                  <Link href="/admin" className="bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white px-4 py-2 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg">
                    Admin Panel
                  </Link>
                )}
                <Link href="/themes" className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white px-4 py-2 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg">
                  Hikaye Yaz
                </Link>
                <Link href="/profile" className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full font-semibold transition-all duration-300">
                  Profilim
                </Link>
                <button onClick={handleLogout} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full font-semibold transition-all duration-300">
                  Çıkış
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/nickname" className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white px-4 py-2 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg">
                  Giriş Yap
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-purple-600 focus:outline-none focus:text-purple-600 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 bg-white bg-opacity-95 backdrop-blur-sm rounded-b-lg shadow-lg">
              <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                Ana Sayfa
              </Link>
              <Link href="/stories" className="block px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                Hikayeler
              </Link>
              <Link href="/leaderboard" className="block px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                Lider Tablosu
              </Link>
              <Link href="/how-it-works" className="block px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                Nasıl Çalışır
              </Link>
              
              {user ? (
                <>
                  <div className="px-3 py-2 text-gray-700 border-t border-gray-200 mt-4 pt-4 font-medium">
                    Merhaba, {user.nickname || 'Yazar'}!
                  </div>
                  {user.role === 'admin' && (
                    <Link href="/admin" className="block px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors">
                      Admin Panel
                    </Link>
                  )}
                  <Link href="/themes" className="block px-3 py-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors">
                    Hikaye Yaz
                  </Link>
                  <Link href="/profile" className="block px-3 py-2 text-gray-700 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors">
                    Profilim
                  </Link>
                  <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    Çıkış
                  </button>
                </>
              ) : (
                <>
                  <Link href="/nickname" className="block px-3 py-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors">
                    Giriş Yap
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
