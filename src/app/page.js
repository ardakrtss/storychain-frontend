'use client';

import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Floating Clouds */}
        <div className="absolute top-20 left-10 w-20 h-12 bg-white/30 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute top-40 right-20 w-16 h-10 bg-white/40 rounded-full animate-pulse opacity-70"></div>
        <div className="absolute bottom-40 left-20 w-24 h-14 bg-white/35 rounded-full animate-bounce opacity-65"></div>
        
        {/* Rainbow Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 via-yellow-400/20 via-green-400/20 via-blue-400/20 via-purple-400/20 to-pink-400/20 animate-pulse"></div>
        
        {/* Floating Stars */}
        <div className="absolute top-32 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
        <div className="absolute top-48 right-1/3 w-1 h-1 bg-yellow-300 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-1/3 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-48 right-1/4 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
        
        {/* Bubbles */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-xl animate-bounce"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-r from-pink-400/30 to-red-400/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-r from-green-400/30 to-yellow-400/30 rounded-full blur-lg animate-bounce"></div>
      </div>

      {/* Hero Section - SaaS Website Kit Style */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Main Content */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Badge */}
            <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-400/90 to-orange-400/90 backdrop-blur-sm rounded-full border-2 border-yellow-500/50 mb-8 shadow-lg">
              <span className="text-white text-lg font-bold">🌟 Çocuklar İçin Özel Hikaye Dünyası</span>
            </div>

            {/* Main Title */}
            <h1 className="text-8xl lg:text-9xl font-black mb-8 leading-none">
              <span className="bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse drop-shadow-2xl" style={{ fontFamily: 'Osnabruck, sans-serif' }}>
                StoryChain
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-4xl lg:text-5xl text-gray-800 mb-8 max-w-5xl mx-auto leading-relaxed font-bold">
              Hayal Gücünü{' '}
              <span className="text-yellow-600 font-black animate-bounce drop-shadow-lg">
                Serbest Bırak!
              </span>
            </p>

            {/* Description */}
            <p className="text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed font-semibold">
              🎨 Arkadaşlarınla birlikte sürükleyici hikâyeler yaz! 🚀 Kelime sınırını zorla! 🎉 Eğlenceli sürprizlerle hikâyeni tamamla!
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16">
              {user ? (
                <Link 
                  href="/themes" 
                  className="group relative bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-16 py-8 rounded-3xl font-black text-2xl transition-all duration-500 shadow-2xl hover:shadow-green-500/50 transform hover:scale-110 flex items-center gap-4 overflow-hidden border-4 border-white/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <span className="text-4xl relative z-10 animate-bounce">✏️</span>
                  <span className="relative z-10">Yazmaya Başla!</span>
                  <span className="group-hover:translate-x-2 transition-transform duration-300 relative z-10 text-3xl">🚀</span>
                </Link>
              ) : (
                <Link 
                  href="/register" 
                  className="group relative bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-16 py-8 rounded-3xl font-black text-2xl transition-all duration-500 shadow-2xl hover:shadow-green-500/50 transform hover:scale-110 flex items-center gap-4 overflow-hidden border-4 border-white/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <span className="text-4xl relative z-10 animate-bounce">✏️</span>
                  <span className="relative z-10">Yazmaya Başla!</span>
                  <span className="group-hover:translate-x-2 transition-transform duration-300 relative z-10 text-3xl">🚀</span>
                </Link>
              )}
              
              <Link 
                href="/how-it-works" 
                className="group bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white px-16 py-8 rounded-3xl font-black text-2xl transition-all duration-500 border-4 border-white/20 backdrop-blur-sm flex items-center gap-4 hover:scale-110 shadow-2xl hover:shadow-yellow-500/50"
              >
                <span className="text-4xl animate-pulse">❓</span>
                <span>Nasıl Çalışır?</span>
                <span className="group-hover:translate-x-2 transition-transform duration-300 text-3xl">🎯</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
              <div className="group bg-gradient-to-r from-purple-400/90 to-pink-400/90 backdrop-blur-sm rounded-3xl p-8 border-4 border-white/30 hover:border-white/50 transition-all duration-300 hover:scale-110 shadow-2xl hover:shadow-purple-500/30">
                <div className="text-center">
                  <div className="text-5xl mb-4 animate-bounce">👥</div>
                  <div className="text-4xl font-black text-white mb-2 drop-shadow-lg">1000+</div>
                  <div className="text-white font-bold text-lg">Aktif Yazar</div>
                </div>
              </div>
              <div className="group bg-gradient-to-r from-green-400/90 to-blue-400/90 backdrop-blur-sm rounded-3xl p-8 border-4 border-white/30 hover:border-white/50 transition-all duration-300 hover:scale-110 shadow-2xl hover:shadow-green-500/30">
                <div className="text-center">
                  <div className="text-5xl mb-4 animate-pulse">📚</div>
                  <div className="text-4xl font-black text-white mb-2 drop-shadow-lg">5000+</div>
                  <div className="text-white font-bold text-lg">Tamamlanan Hikaye</div>
                </div>
              </div>
              <div className="group bg-gradient-to-r from-yellow-400/90 to-orange-400/90 backdrop-blur-sm rounded-3xl p-8 border-4 border-white/30 hover:border-white/50 transition-all duration-300 hover:scale-110 shadow-2xl hover:shadow-yellow-500/30">
                <div className="text-center">
                  <div className="text-5xl mb-4 animate-bounce">🎨</div>
                  <div className="text-4xl font-black text-white mb-2 drop-shadow-lg">50+</div>
                  <div className="text-white font-bold text-lg">Farklı Tema</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - Modern Design */}
      <div className="relative py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-full border border-purple-500/30 mb-8">
              <span className="text-purple-700 text-sm font-semibold">🚀 Nasıl Çalışır?</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                3 Basit Adımda Başlayın
              </span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              StoryChain ile hikaye yazma deneyimi çok kolay. Sadece 3 adımda başlayın!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-white/80 backdrop-blur-lg rounded-3xl p-8 border border-gray-200 hover:border-gray-300 transition-all duration-500 hover:bg-white/90 hover:scale-105 shadow-lg">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-white text-4xl font-bold mx-auto mb-8 group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                    1
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Tema Seçin</h3>
                  <p className="text-gray-700 leading-relaxed">
                    İlham verici temalar arasından seçim yapın ve hikayenizi başlatın.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 to-purple-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-white/80 backdrop-blur-lg rounded-3xl p-8 border border-gray-200 hover:border-gray-300 transition-all duration-500 hover:bg-white/90 hover:scale-105 shadow-lg">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl flex items-center justify-center text-white text-4xl font-bold mx-auto mb-8 group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                    2
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Hikaye Yazın</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Hayal gücünüzü kullanarak hikayenizi yazın ve paylaşın.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-white/80 backdrop-blur-lg rounded-3xl p-8 border border-gray-200 hover:border-gray-300 transition-all duration-500 hover:bg-white/90 hover:scale-105 shadow-lg">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white text-4xl font-bold mx-auto mb-8 group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                    3
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Paylaşın</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Hikayenizi toplulukla paylaşın ve başkalarının devam etmesini bekleyin.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section - Modern Design */}
      <div className="relative py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-3xl blur-xl"></div>
            <div className="relative bg-gradient-to-r from-purple-600/10 to-pink-600/10 backdrop-blur-lg rounded-3xl p-16 border border-purple-500/30">
              <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8">
                Hikaye Yazma Macerasına Katılın!
              </h2>
              <p className="text-xl text-gray-700 mb-12 leading-relaxed max-w-3xl mx-auto">
                Binlerce yazarın katıldığı bu büyük hikaye topluluğuna siz de katılın. 
                Hayal gücünüzü paylaşın, başkalarının hikayelerini keşfedin.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link 
                  href={user ? "/themes" : "/register"} 
                  className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-500 shadow-2xl hover:shadow-purple-500/50 transform hover:scale-110 flex items-center gap-4 justify-center"
                >
                  <span>{user ? "Yeni Hikaye Yaz" : "Hemen Başla"}</span>
                  <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                </Link>
                <Link 
                  href="/how-it-works" 
                  className="bg-white/10 hover:bg-white/20 text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-500 border border-white/20 hover:border-white/40 backdrop-blur-sm hover:scale-105"
                >
                  Daha Fazla Bilgi
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
