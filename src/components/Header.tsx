'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
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
    <header className="bg-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl">✏️</div>
            <span className="text-xl font-bold text-white">StoryChain</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">
              Ana Sayfa
            </Link>
            <Link href="/stories" className="text-gray-300 hover:text-white transition-colors">
              Hikayeler
            </Link>
            <Link href="/leaderboard" className="text-gray-300 hover:text-white transition-colors">
              Lider Tablosu
            </Link>
            <Link href="/how-it-works" className="text-gray-300 hover:text-white transition-colors">
              Nasıl Çalışır
            </Link>
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-300">Merhaba, {user.nickname || 'Yazar'}!</span>
                {user.role === 'admin' && (
                  <Link href="/admin" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                    Admin Panel
                  </Link>
                )}
                <Link href="/themes" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                  Hikaye Yaz
                </Link>
                <Link href="/profile" className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                  Profilim
                </Link>
                <button onClick={handleLogout} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                  Çıkış
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/nickname" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                  Rumuz Gir
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
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
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-700">
              <Link href="/" className="block px-3 py-2 text-gray-300 hover:text-white">
                Ana Sayfa
              </Link>
              <Link href="/stories" className="block px-3 py-2 text-gray-300 hover:text-white">
                Hikayeler
              </Link>
              <Link href="/leaderboard" className="block px-3 py-2 text-gray-300 hover:text-white">
                Lider Tablosu
              </Link>
              <Link href="/how-it-works" className="block px-3 py-2 text-gray-300 hover:text-white">
                Nasıl Çalışır
              </Link>
              
              {user ? (
                <>
                  <div className="px-3 py-2 text-gray-300 border-t border-gray-700 mt-4">
                    Merhaba, {user.nickname || 'Yazar'}!
                  </div>
                  {user.role === 'admin' && (
                    <Link href="/admin" className="block px-3 py-2 text-purple-400 hover:text-purple-300">
                      Admin Panel
                    </Link>
                  )}
                  <Link href="/themes" className="block px-3 py-2 text-purple-400 hover:text-purple-300">
                    Hikaye Yaz
                  </Link>
                  <Link href="/profile" className="block px-3 py-2 text-gray-300 hover:text-gray-200">
                    Profilim
                  </Link>
                  <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-gray-300 hover:text-red-400">
                    Çıkış
                  </button>
                </>
              ) : (
                <>
                  <Link href="/nickname" className="block px-3 py-2 text-purple-400 hover:text-purple-300">
                    Rumuz Gir
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
