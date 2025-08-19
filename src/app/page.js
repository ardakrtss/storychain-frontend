'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../contexts/AuthContext';
import { themeStorage, storyStorage } from '../lib/storage';

export default function HomePage() {
  const { user } = useAuth();
  const [recentStories, setRecentStories] = useState([]);
  const [popularStories, setPopularStories] = useState([]);
  const [themes, setThemes] = useState([]);
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400">
        <div className="text-2xl text-white font-semibold">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section - Masalsı Arka Plan */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Arka Plan Resmi */}
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `
                linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%),
                url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:%23e0f2fe;stop-opacity:1" /><stop offset="50%" style="stop-color:%23fce7f3;stop-opacity:1" /><stop offset="100%" style="stop-color:%23f3e8ff;stop-opacity:1" /></linearGradient><radialGradient id="rainbow" cx="50%" cy="20%" r="40%"><stop offset="0%" style="stop-color:%23ff6b6b;stop-opacity:0.8" /><stop offset="16.66%" style="stop-color:%23ffd93d;stop-opacity:0.8" /><stop offset="33.33%" style="stop-color:%236bcf7f;stop-opacity:0.8" /><stop offset="50%" style="stop-color:%234ecdc4;stop-opacity:0.8" /><stop offset="66.66%" style="stop-color:%2345b7d1;stop-opacity:0.8" /><stop offset="83.33%" style="stop-color:%2396ceb4;stop-opacity:0.8" /><stop offset="100%" style="stop-color:%23feca57;stop-opacity:0.8" /></radialGradient></defs><rect width="1200" height="800" fill="url(%23sky)"/><ellipse cx="600" cy="160" rx="400" ry="80" fill="url(%23rainbow)"/><circle cx="600" cy="300" r="80" fill="%23ffb3d9" opacity="0.9"/><circle cx="580" cy="280" r="15" fill="%23ffb3d9" opacity="0.8"/><circle cx="620" cy="280" r="15" fill="%23ffb3d9" opacity="0.8"/><circle cx="600" cy="320" r="20" fill="%23ffb3d9" opacity="0.8"/><rect x="550" y="380" width="100" height="120" fill="%23a8e6cf" opacity="0.7"/><rect x="540" y="370" width="120" height="20" fill="%23a8e6cf" opacity="0.7"/><rect x="530" y="360" width="140" height="20" fill="%23a8e6cf" opacity="0.7"/><rect x="520" y="350" width="160" height="20" fill="%23a8e6cf" opacity="0.7"/><circle cx="400" cy="200" r="3" fill="%23ffd93d" opacity="0.8"/><circle cx="800" cy="150" r="2" fill="%23ffd93d" opacity="0.6"/><circle cx="500" cy="120" r="2.5" fill="%23ffd93d" opacity="0.7"/><circle cx="700" cy="180" r="1.5" fill="%23ffd93d" opacity="0.5"/><circle cx="450" cy="160" r="1" fill="%23ffd93d" opacity="0.6"/><circle cx="750" cy="140" r="2" fill="%23ffd93d" opacity="0.7"/><circle cx="350" cy="180" r="1.5" fill="%23ffd93d" opacity="0.5"/><circle cx="850" cy="170" r="1" fill="%23ffd93d" opacity="0.6"/><text x="200" y="100" font-size="60" fill="white" opacity="0.3">☁️</text><text x="900" y="120" font-size="50" fill="white" opacity="0.2">☁️</text><text x="300" y="80" font-size="40" fill="white" opacity="0.25">☁️</text><text x="800" y="90" font-size="45" fill="white" opacity="0.15">☁️</text><text x="150" y="150" font-size="35" fill="white" opacity="0.3">🕊️</text><text x="950" y="110" font-size="30" fill="white" opacity="0.25">🕊️</text><text x="250" y="120" font-size="25" fill="white" opacity="0.35">🕊️</text><text x="850" y="130" font-size="20" fill="white" opacity="0.3">🕊️</text><text x="350" y="140" font-size="28" fill="white" opacity="0.4">🦄</text><text x="750" y="160" font-size="35" fill="white" opacity="0.25">🦄</text><text x="450" y="180" font-size="22" fill="white" opacity="0.3">🦄</text><text x="650" y="170" font-size="18" fill="white" opacity="0.2">🦄</text><text x="200" y="700" font-size="40" fill="white" opacity="0.4">🌸</text><text x="950" y="720" font-size="35" fill="white" opacity="0.35">🌺</text><text x="300" y="680" font-size="30" fill="white" opacity="0.3">🌼</text><text x="850" y="690" font-size="25" fill="white" opacity="0.25">🌻</text><text x="400" y="710" font-size="20" fill="white" opacity="0.3">🌹</text><circle cx="300" cy="250" r="4" fill="%23f9a8d4" opacity="0.6"/><circle cx="750" cy="200" r="3" fill="%2393c5fd" opacity="0.5"/><circle cx="500" cy="300" r="3.5" fill="%23fde047" opacity="0.7"/></svg>')
              `,
              backgroundSize: 'cover'
            }}
          />
          {/* Masalsı elementler */}
          <div className="absolute inset-0">
            {/* Yıldızlar */}
            <div className="absolute top-20 left-20 w-2 h-2 bg-yellow-300 rounded-full animate-pulse opacity-80"></div>
            <div className="absolute top-32 right-32 w-1 h-1 bg-yellow-300 rounded-full animate-pulse opacity-60"></div>
            <div className="absolute top-16 left-1/2 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse opacity-70"></div>
            <div className="absolute top-40 right-1/4 w-1 h-1 bg-yellow-300 rounded-full animate-pulse opacity-50"></div>
            <div className="absolute top-24 left-1/3 w-1 h-1 bg-yellow-300 rounded-full animate-pulse opacity-80"></div>
            
            {/* Bulutlar */}
            <div className="absolute top-16 left-8 text-white text-6xl opacity-20 animate-pulse">☁️</div>
            <div className="absolute top-28 right-16 text-white text-5xl opacity-15 animate-pulse delay-1000">☁️</div>
            <div className="absolute top-12 right-1/3 text-white text-4xl opacity-25 animate-pulse delay-2000">☁️</div>
            
            {/* Kuşlar */}
            <div className="absolute top-6 right-16 text-white text-4xl opacity-40">🕊️</div>
            <div className="absolute top-10 right-32 text-white text-3xl opacity-30">🕊️</div>
            <div className="absolute top-20 left-1/4 text-white text-2xl opacity-35">🕊️</div>
            
            {/* Masalsı yaratıklar */}
            <div className="absolute bottom-28 left-1/4 text-white text-5xl opacity-30 animate-bounce">🦄</div>
            <div className="absolute bottom-24 right-1/3 text-white text-4xl opacity-25 animate-bounce delay-1000">🦄</div>
            <div className="absolute bottom-20 left-1/3 text-white text-3xl opacity-20 animate-bounce delay-2000">🦄</div>
            
            {/* Çiçekler */}
            <div className="absolute bottom-8 left-8 text-white text-4xl opacity-40">🌸</div>
            <div className="absolute bottom-6 right-16 text-white text-3xl opacity-35">🌺</div>
            <div className="absolute bottom-12 right-1/3 text-white text-2xl opacity-30">🌼</div>
            
            {/* Büyülü ışıklar */}
            <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-pink-300 rounded-full animate-pulse opacity-60"></div>
            <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-blue-300 rounded-full animate-pulse opacity-50"></div>
            <div className="absolute top-1/2 left-1/3 w-3.5 h-3.5 bg-yellow-300 rounded-full animate-pulse opacity-70"></div>
          </div>
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        </div>

        {/* İçerik */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">
            Hayal Gücünü{' '}
            <span className="text-yellow-300 animate-pulse drop-shadow-lg">Serbest Bırak!</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white drop-shadow-lg max-w-3xl mx-auto leading-relaxed font-medium">
            Arkadaşlarınla birlikte sürükleyici hikâyeler yaz, kelime sınırını zorla, eğlenceli sürprizlerle hikâyeni tamamla!
          </p>
          
          {/* Animasyonlu elementler */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            {user ? (
              <Link 
                href="/themes" 
                className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl text-lg"
              >
                <span className="text-2xl">✏️</span>
                <span>Hazır mısın?</span>
              </Link>
            ) : (
              <>
                <Link 
                  href="/nickname" 
                  className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl text-lg"
                >
                  <span className="text-2xl">✏️</span>
                  <span>Hazır mısın?</span>
                </Link>
                <Link 
                  href="/how-it-works" 
                  className="bg-white bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl text-lg border border-white border-opacity-30"
                >
                  <span className="text-2xl">❓</span>
                  <span>Nasıl Çalışır?</span>
                </Link>
              </>
            )}
          </div>
          
          {/* Ek animasyonlu elementler */}
          <div className="flex justify-center items-center gap-8 text-4xl opacity-80">
            <div className="animate-bounce">🦄</div>
            <div className="animate-pulse">⭐</div>
            <div className="animate-bounce delay-100">🦄</div>
            <div className="animate-pulse delay-200">🦋</div>
            <div className="animate-bounce delay-300">🦄</div>
          </div>
        </div>
        
        {/* Alt dekoratif elementler */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-purple-800 to-transparent"></div>
      </section>

      {/* Hikaye Yazma Bölümü */}
      <section className="py-16 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Hikaye Yazmaya Başla</h2>
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
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 border border-gray-100 overflow-hidden">
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
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white font-semibold transition-colors"
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
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">En Çok Beğenilen Hikâyeler</h2>
            <p className="text-xl text-gray-600">
              Diğer yazarlarımızın birlikte yarattığı harika hikâyeleri keşfet!
            </p>
          </div>
          
          <div className="flex justify-center mb-8">
            <Link href="/stories" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-3 rounded-full font-semibold transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl">
              Tüm Hikâyeleri Gör →
            </Link>
          </div>
          
          <div className="flex justify-center">
            <Link href="/leaderboard" className="text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-2">
              🏆 Liderlik Tablosunu Gör
            </Link>
          </div>
        </div>
      </section>

      {/* Son Hikayeler */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800">Son Hikayeler</h2>
            <Link href="/stories" className="text-teal-600 hover:text-teal-700 font-semibold">
              Tümünü Gör →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentStories.map((story) => (
              <div key={story.id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{story.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {story.segments?.[0]?.content?.substring(0, 120) || 'Hikaye içeriği...'}...
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs font-medium">
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
      <section className="py-16 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800">Popüler Hikayeler</h2>
            <Link href="/stories" className="text-orange-600 hover:text-orange-700 font-semibold">
              Tümünü Gör →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularStories.map((story) => (
              <div key={story.id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{story.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {story.segments?.[0]?.content?.substring(0, 120) || 'Hikaye içeriği...'}...
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-medium">
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
      <section className="py-16 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Hikaye Yazmaya Hazır mısın?
          </h2>
          <p className="text-xl mb-8 text-purple-100">
            Hayal gücünü kullan ve diğer yazarlarla birlikte harika hikayeler yarat!
          </p>
          {user ? (
            <Link href="/themes" className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl text-lg">
              Hemen Başla
            </Link>
          ) : (
            <Link href="/nickname" className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl text-lg">
              Rumuz Gir ve Başla
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
