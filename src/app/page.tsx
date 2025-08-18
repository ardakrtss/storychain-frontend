'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { themeStorage, storyStorage } from '../lib/storage';
import MagicalHero from '../components/MagicalHero';

export default function HomePage() {
  const { user } = useAuth();
  const [recentStories, setRecentStories] = useState<any[]>([]);
  const [popularStories, setPopularStories] = useState<any[]>([]);
  const [themes, setThemes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // LocalStorage'dan veri al
        const mockThemes = themeStorage.get();
        const mockStories = storyStorage.getCompleted().slice(0, 3);
        const popularStories = storyStorage.getPopular().slice(0, 3);

        setRecentStories(mockStories);
        setPopularStories(popularStories);
        setThemes(mockThemes);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-pink-600">
        <div className="text-2xl text-white">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section - Masalsı Gökyüzü */}
      <MagicalHero />

      {/* Hikaye Yazma Bölümü */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Hikaye Yazmaya Başla</h2>
            <p className="text-xl text-gray-600">
              Hangi dünyada hikâye yazmak istiyorsun? Sevdiğin temayı seç ve maceraya başla!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {themes.map((theme) => (
              <Link
                key={theme.id}
                href={`/themes`}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 border border-gray-100 overflow-hidden">
                  {/* Tema İllüstrasyonu */}
                  <div 
                    className="h-48 flex items-center justify-center text-6xl"
                    style={{ backgroundColor: theme.color + '20' }}
                  >
                    {theme.icon}
                  </div>
                  
                  {/* Tema Bilgileri */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{theme.name}</h3>
                    <p className="text-gray-600 mb-4">{theme.description}</p>
                    <div 
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition-colors"
                      style={{ backgroundColor: theme.color }}
                    >
                      → Yazmaya Başla
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* En Çok Beğenilen Hikayeler */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">En Çok Beğenilen Hikâyeler</h2>
            <p className="text-xl text-gray-600">
              Diğer yazarlarımızın birlikte yarattığı harika hikâyeleri keşfet!
            </p>
          </div>
          
          <div className="flex justify-center mb-8">
            <Link href="/stories" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2">
              Tüm Hikâyeleri Gör →
            </Link>
          </div>
          
          <div className="flex justify-center">
            <Link href="/leaderboard" className="text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-2">
              🏆 Liderlik Tablosunu Gör
            </Link>
          </div>
        </div>
      </section>

      {/* Son Hikayeler */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Son Hikayeler</h2>
            <Link href="/stories" className="text-purple-600 hover:text-purple-700 font-semibold">
              Tümünü Gör →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentStories.map((story) => (
              <div key={story.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{story.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {story.segments?.[0]?.content?.substring(0, 120) || 'Hikaye içeriği...'}...
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                    {story.theme}
                  </span>
                  <span className="flex items-center gap-1">
                    ❤️ {story.likeCount || 0}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popüler Hikayeler */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Popüler Hikayeler</h2>
            <Link href="/stories" className="text-purple-600 hover:text-purple-700 font-semibold">
              Tümünü Gör →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularStories.map((story) => (
              <div key={story.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{story.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {story.segments?.[0]?.content?.substring(0, 120) || 'Hikaye içeriği...'}...
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                    {story.theme}
                  </span>
                  <span className="flex items-center gap-1">
                    ❤️ {story.likeCount || 0}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Hikaye Yazmaya Hazır mısın?
          </h2>
          <p className="text-xl mb-8 text-purple-100">
            Hayal gücünü kullan ve diğer yazarlarla birlikte harika hikayeler yarat!
          </p>
          {user ? (
            <Link href="/themes" className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Hemen Başla
            </Link>
          ) : (
            <Link href="/nickname" className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Rumuz Gir ve Başla
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
