'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import Link from 'next/link';
import api from '../../lib/api';

interface Theme {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  characters: string;
  plotHints: string;
}

export default function ThemesPage() {
  const [themes, setThemes] = useState<Theme[]>([]);
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

  const handleThemeSelect = (themeId: string) => {
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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Giriş Yapmanız Gerekiyor</h2>
          <Link href="/nickname" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold">
            Rumuz Gir
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-2xl text-gray-900">Temalar yükleniyor...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Hata</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Hikaye Yazma Seçenekleri
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Merhaba <span className="font-semibold text-purple-600">{user.nickname}</span>! 
            Yeni bir hikaye başlat veya mevcut bir hikayeye devam et!
          </p>
        </div>

        {/* Continue Existing Story Section */}
        <div className="mb-12">
          <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-dashed border-purple-300">
            <div className="text-center">
              <div className="text-6xl mb-4">📖</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Mevcut Hikayeye Devam Et
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Diğer yazarların başlattığı hikayelere katıl! Rastgele bir hikaye seçilir ve 
                sadece bir önceki yazarın yazdığını görürsün. Sen kaçıncı yazar olduğunu da bilirsin!
              </p>
              <button
                onClick={handleContinueStory}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 mx-auto"
              >
                <span>🎲</span>
                Rastgele Hikayeye Devam Et
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-4 text-gray-500 font-semibold">VEYA</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* New Story Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Yeni Hikaye Başlat</h2>
          <p className="text-xl text-gray-600">
            Hangi dünyada hikâye yazmak istiyorsun? Sevdiğin temayı seç ve maceraya başla!
          </p>
        </div>

        {/* Themes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {themes.map((theme) => (
            <div
              key={theme.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer border border-gray-100 overflow-hidden"
              onClick={() => handleThemeSelect(theme.id)}
            >
              {/* Theme Icon */}
              <div 
                className="h-48 flex items-center justify-center text-8xl"
                style={{ backgroundColor: theme.color + '20' }}
              >
                {theme.icon}
              </div>
              
              {/* Theme Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{theme.name}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{theme.description}</p>
                
                {/* Characters */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Karakterler:</h4>
                  <p className="text-sm text-gray-600">{theme.characters}</p>
                </div>
                
                {/* Plot Hints */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Hikaye İpuçları:</h4>
                  <p className="text-sm text-gray-600">{theme.plotHints}</p>
                </div>
                
                {/* Action Button */}
                <div 
                  className="w-full text-center py-3 rounded-lg text-white font-semibold transition-colors"
                  style={{ backgroundColor: theme.color }}
                >
                  Bu Temayı Seç →
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Nasıl Çalışır?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div>
                <div className="text-2xl mb-2">1️⃣</div>
                <p>Tema seç veya mevcut hikayeye devam et</p>
              </div>
              <div>
                <div className="text-2xl mb-2">2️⃣</div>
                <p>1000 karakter yaz</p>
              </div>
              <div>
                <div className="text-2xl mb-2">3️⃣</div>
                <p>5 yazar tamamlar</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
