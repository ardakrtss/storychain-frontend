'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  // Don't show footer on nickname page
  if (pathname === '/nickname') {
    return null;
  }

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo ve Açıklama */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-2xl">✏️</div>
              <span className="text-xl font-bold">StoryChain</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              İlkokul öğrencileri için tasarlanmış paylaşımlı hikaye yazma platformu. 
              Hayal gücünü serbest bırak ve arkadaşlarınla birlikte harika hikayeler yarat!
            </p>
            <div className="flex space-x-4">
              <div className="text-2xl">📚</div>
              <div className="text-2xl">🎨</div>
              <div className="text-2xl">🌟</div>
              <div className="text-2xl">🚀</div>
            </div>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hızlı Linkler</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link href="/themes" className="text-gray-300 hover:text-white transition-colors">
                  Temalar
                </Link>
              </li>
              <li>
                <Link href="/stories" className="text-gray-300 hover:text-white transition-colors">
                  Hikayeler
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="text-gray-300 hover:text-white transition-colors">
                  Lider Tablosu
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-gray-300 hover:text-white transition-colors">
                  Nasıl Çalışır
                </Link>
              </li>
            </ul>
          </div>

          {/* Destek */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Destek</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  İletişim
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
                  Kullanım Şartları
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  Gizlilik Politikası
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Alt Çizgi */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 StoryChain. Tüm hakları saklıdır.
            </div>
            <div className="flex space-x-6 text-sm">
              <span className="text-gray-400">Güvenli</span>
              <span className="text-gray-400">Eğitici</span>
              <span className="text-gray-400">Eğlenceli</span>
            </div>
          </div>
        </div>

        {/* Özellikler */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="text-2xl mb-2">👥</div>
              <div className="text-sm font-semibold">Paylaşımlı Yazım</div>
              <div className="text-xs text-gray-400">5 yazar birlikte</div>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="text-2xl mb-2">🎯</div>
              <div className="text-sm font-semibold">6 Tema</div>
              <div className="text-xs text-gray-400">Farklı dünyalar</div>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="text-2xl mb-2">📝</div>
              <div className="text-sm font-semibold">1000 Karakter</div>
              <div className="text-xs text-gray-400">Her bölüm için</div>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="text-2xl mb-2">❤️</div>
              <div className="text-sm font-semibold">Beğeni Sistemi</div>
              <div className="text-xs text-gray-400">En iyi hikayeler</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
