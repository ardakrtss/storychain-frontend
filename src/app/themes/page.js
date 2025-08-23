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
  const [isVisible, setIsVisible] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Giriş Yapmanız Gerekiyor</h2>
          <Link href="/nickname" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300">
            Giriş Yap
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-2xl text-white">Temalar yükleniyor...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Hata</h2>
          <p className="text-gray-300 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-12 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-pink-600/5 to-purple-600/5 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-bounce"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-full border border-purple-500/30 mb-8">
            <span className="text-purple-300 text-sm font-semibold">🎨 Hikaye Temaları</span>
          </div>
          <h1 className="text-6xl lg:text-7xl font-black text-white mb-8">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Hikaye Yazma
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Merhaba <span className="font-bold text-purple-400">{user.nickname}</span>! 
            Yeni bir hikaye başlat veya mevcut bir hikayeye devam et!
          </p>
        </div>

        {/* Continue Existing Story Section */}
        <div className={`mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-white/20 hover:border-white/40 transition-all duration-500">
              <div className="text-center">
                <div className="text-8xl mb-6 animate-bounce">📖</div>
                <h2 className="text-3xl font-black text-white mb-6">
                  Mevcut Hikayeye Devam Et
                </h2>
                <p className="text-gray-300 mb-8 max-w-3xl mx-auto text-lg leading-relaxed">
                  Diğer yazarların başlattığı hikayelere katıl! Rastgele bir hikaye seçilir ve 
                  sadece bir önceki yazarın yazdığını görürsün. Sen kaçıncı yazar olduğunu da bilirsin!
                </p>
                <button
                  onClick={handleContinueStory}
                  className="group relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-500 shadow-2xl hover:shadow-purple-500/50 transform hover:scale-110 flex items-center justify-center gap-4 mx-auto overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <span className="text-2xl relative z-10">🎲</span>
                  <span className="relative z-10">Rastgele Hikayeye Devam Et</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className={`flex items-center justify-center mb-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          <span className="px-8 text-white/60 font-bold text-lg">VEYA</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        </div>

        {/* New Story Section */}
        <div className={`text-center mb-12 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-black text-white mb-6">Yeni Hikaye Başlat</h2>
          <p className="text-xl text-gray-300">
            Hangi dünyada hikâye yazmak istiyorsun? Sevdiğin temayı seç ve maceraya başla!
          </p>
        </div>

        {/* Themes Grid */}
        <div className={`transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {themes.map((theme, index) => (
              <div
                key={theme.id}
                className={`group relative transition-all duration-1000 delay-${index * 200} cursor-pointer`}
                style={{ animationDelay: `${index * 200}ms` }}
                onClick={() => handleThemeSelect(theme.id)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 hover:border-white/40 transition-all duration-500 hover:bg-white/15 hover:scale-105 overflow-hidden">
                  {/* Theme Icon */}
                  <div 
                    className="h-56 flex items-center justify-center text-9xl group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundColor: theme.color + '20' }}
                  >
                    {theme.icon}
                  </div>
                  
                  {/* Theme Content */}
                  <div className="p-8">
                    <h3 className="text-2xl font-black text-white mb-4">{theme.name}</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed text-lg">{theme.description}</p>
                    
                    {/* Characters */}
                    <div className="mb-6">
                      <h4 className="font-bold text-white mb-3 text-lg">Karakterler:</h4>
                      <p className="text-gray-300">{theme.characters}</p>
                    </div>
                    
                    {/* Plot Hints */}
                    <div className="mb-8">
                      <h4 className="font-bold text-white mb-3 text-lg">Hikaye İpuçları:</h4>
                      <p className="text-gray-300">{theme.plotHints}</p>
                    </div>
                    
                    {/* Action Button */}
                    <div 
                      className="group relative w-full text-center py-4 rounded-2xl text-white font-bold text-lg transition-all duration-500 shadow-lg hover:shadow-xl transform hover:scale-105 overflow-hidden"
                      style={{ backgroundColor: theme.color }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      <span className="relative z-10">Bu Temayı Seç →</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className={`mt-20 transition-all duration-1000 delay-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border border-white/20 hover:border-white/40 transition-all duration-500 max-w-4xl mx-auto">
              <h3 className="text-2xl font-black text-white mb-8 text-center">Nasıl Çalışır?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center group/item">
                  <div className="text-4xl mb-4 group-hover/item:scale-110 transition-transform duration-500">1️⃣</div>
                  <p className="text-gray-300 font-semibold">Tema seç veya mevcut hikayeye devam et</p>
                </div>
                <div className="text-center group/item">
                  <div className="text-4xl mb-4 group-hover/item:scale-110 transition-transform duration-500">2️⃣</div>
                  <p className="text-gray-300 font-semibold">1000 karakter yaz</p>
                </div>
                <div className="text-center group/item">
                  <div className="text-4xl mb-4 group-hover/item:scale-110 transition-transform duration-500">3️⃣</div>
                  <p className="text-gray-300 font-semibold">5 yazar tamamlar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
