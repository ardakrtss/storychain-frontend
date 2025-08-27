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
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Clean Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>

      {/* Hero Section - SaaS Website Kit Style */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                  {/* Main Content */}
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Main Title */}
          <h1 className="text-6xl lg:text-8xl font-black text-black mb-6 leading-none">
            <span style={{ fontFamily: 'Osnabruck, sans-serif' }}>
              Hayal Gücünü
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-5xl lg:text-6xl text-yellow-500 mb-8 max-w-4xl mx-auto leading-relaxed font-bold">
            Serbest Bırak!
          </p>

          {/* Description */}
          <p className="text-xl text-black mb-16 max-w-3xl mx-auto leading-relaxed font-medium">
            Arkadaşlarınla birlikte sürükleyici hikâyeler yaz, kelime sınırını zorla, eğlenceli sürprizlerle hikâyeni tamamla!
          </p>
            
                          {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-20">
                {user ? (
                  <Link 
                    href="/themes" 
                    className="group relative bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-16 py-8 rounded-3xl font-bold text-2xl transition-all duration-500 shadow-2xl hover:shadow-blue-500/50 transform hover:scale-110 flex items-center gap-4 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <span className="text-3xl relative z-10">✏️</span>
                    <span className="relative z-10">Yazmaya Başla</span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300 relative z-10 text-3xl">→</span>
                  </Link>
                ) : (
                  <Link 
                    href="/register" 
                    className="group relative bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-16 py-8 rounded-3xl font-bold text-2xl transition-all duration-500 shadow-2xl hover:shadow-blue-500/50 transform hover:scale-110 flex items-center gap-4 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <span className="text-3xl relative z-10">✏️</span>
                    <span className="relative z-10">Yazmaya Başla</span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300 relative z-10 text-3xl">→</span>
                  </Link>
                )}
                
                <Link 
                  href="/how-it-works" 
                  className="group bg-white hover:bg-gray-50 text-black px-16 py-8 rounded-3xl font-bold text-2xl transition-all duration-500 border-2 border-gray-200 hover:border-gray-300 flex items-center gap-4 hover:scale-105 shadow-lg"
                >
                  <span className="text-3xl">❓</span>
                  <span>Nasıl Çalışır?</span>
                  <span className="group-hover:translate-x-2 transition-transform duration-300 text-3xl">→</span>
                </Link>
              </div>

                          {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-24">
                <div className="bg-white rounded-3xl p-8 border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:bg-gray-50 shadow-lg hover:shadow-xl">
                  <div className="text-4xl font-bold text-purple-600 mb-3">1000+</div>
                  <div className="text-black font-medium text-lg">Aktif Yazar</div>
                </div>
                <div className="bg-white rounded-3xl p-8 border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:bg-gray-50 shadow-lg hover:shadow-xl">
                  <div className="text-4xl font-bold text-pink-600 mb-3">5000+</div>
                  <div className="text-black font-medium text-lg">Tamamlanan Hikaye</div>
                </div>
                <div className="bg-white rounded-3xl p-8 border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:bg-gray-50 shadow-lg hover:shadow-xl">
                  <div className="text-4xl font-bold text-blue-600 mb-3">50+</div>
                  <div className="text-black font-medium text-lg">Farklı Tema</div>
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
