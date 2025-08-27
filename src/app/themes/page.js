'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import Link from 'next/link';
import api from '../../lib/api';

export default function ThemesPage() {
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await api.get('/themes');
        setThemes(response.data);
      } catch (error) {
        console.error('Error fetching themes:', error);
        setError('Temalar yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchThemes();
  }, []);

  const handleThemeSelect = (themeId) => {
    // Tema seçildiğinde yeni hikaye yazma sayfasına yönlendir
    router.push(`/write?theme=${themeId}&mode=new`);
  };

  const handleContinueStory = async () => {
    try {
      const response = await api.get(`/stories/random?authorId=${user?.id}`);
      const { story } = response.data;
      
      // Mevcut hikayeye devam etme sayfasına yönlendir
      router.push(`/write?storyId=${story.id}&mode=continue`);
    } catch (error) {
      console.error('Error getting random story:', error);
      alert('Devam edilecek hikaye bulunamadı. Yeni bir hikaye başlatmayı deneyin!');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-black mb-4">Giriş Yapmanız Gerekiyor</h2>
          <Link href="/nickname" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg">
            Giriş Yap
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-2xl text-black">Temalar yükleniyor...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-black mb-4">Hata</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 mb-8 shadow-sm">
            <span className="text-gray-700 text-sm font-semibold">Hikaye Temaları</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-black mb-8">
            Hikaye Yazma
          </h1>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Merhaba <span className="font-bold text-blue-600">{user.nickname}</span>! 
            Yeni bir hikaye başlat veya mevcut bir hikayeye devam et!
          </p>
        </div>

        {/* Continue Existing Story Section */}
        <div className="mb-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-10 border border-gray-200 hover:shadow-xl transition-all duration-300">
            <div className="text-center">
              <div className="text-6xl mb-6">📖</div>
              <h2 className="text-3xl font-bold text-black mb-6">
                Mevcut Hikayeye Devam Et
              </h2>
              <p className="text-gray-700 mb-8 max-w-3xl mx-auto text-lg leading-relaxed">
                Diğer yazarların başlattığı hikayelere katıl! Rastgele bir hikaye seçilir ve 
                sadece bir önceki yazarın yazdığını görürsün. Sen kaçıncı yazar olduğunu da bilirsin!
              </p>
              <button
                onClick={handleContinueStory}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-4 mx-auto"
              >
                <span className="text-2xl">🎲</span>
                <span>Rastgele Hikayeye Devam Et</span>
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center mb-16">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-8 text-gray-500 font-bold text-lg">VEYA</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* New Story Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-black mb-6">Yeni Hikaye Başlat</h2>
          <p className="text-xl text-gray-700">
            Hangi dünyada hikâye yazmak istiyorsun? Sevdiğin temayı seç ve maceraya başla!
          </p>
        </div>

        {/* Themes Grid */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {themes.map((theme, index) => (
              <div
                key={theme.id}
                className="group cursor-pointer"
                onClick={() => handleThemeSelect(theme.id)}
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
                  {/* Theme Icon */}
                  <div 
                    className="h-48 flex items-center justify-center text-8xl group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: theme.color + '10' }}
                  >
                    {theme.icon}
                  </div>
                  
                  {/* Theme Content */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-black mb-4">{theme.name}</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">{theme.description}</p>
                    
                    {/* Characters */}
                    <div className="mb-6">
                      <h4 className="font-bold text-black mb-3">Karakterler:</h4>
                      <p className="text-gray-700">{theme.characters}</p>
                    </div>
                    
                    {/* Plot Hints */}
                    <div className="mb-8">
                      <h4 className="font-bold text-black mb-3">Hikaye İpuçları:</h4>
                      <p className="text-gray-700">{theme.plotHints}</p>
                    </div>
                    
                    {/* Action Button */}
                    <div 
                      className="w-full text-center py-4 rounded-2xl text-white font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                      style={{ backgroundColor: theme.color }}
                    >
                      Bu Temayı Seç →
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-20">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-10 border border-gray-200 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-black mb-8 text-center">Nasıl Çalışır?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">1️⃣</div>
                <p className="text-gray-700 font-semibold">Tema seç veya mevcut hikayeye devam et</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">2️⃣</div>
                <p className="text-gray-700 font-semibold">1000 karakter yaz</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">3️⃣</div>
                <p className="text-gray-700 font-semibold">5 yazar tamamlar</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
