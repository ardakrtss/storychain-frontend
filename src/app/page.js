'use client';

import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';
import MagicalHero from '../components/MagicalHero';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Modern Header */}
      <div className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-purple-600/10"></div>
        
        {/* Masalsı Arka Plan Görseli */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%221200%22%20height%3D%22800%22%20viewBox%3D%220%200%201200%20800%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22sky%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%220%25%22%20y2%3D%22100%25%22%3E%3Cstop%20offset%3D%220%25%22%20style%3D%22stop-color%3A%23e0f2fe%3Bstop-opacity%3A0.1%22%20/%3E%3Cstop%20offset%3D%2250%25%22%20style%3D%22stop-color%3A%23fce7f3%3Bstop-opacity%3A0.1%22%20/%3E%3Cstop%20offset%3D%22100%25%22%20style%3D%22stop-color%3A%23f3e8ff%3Bstop-opacity%3A0.1%22%20/%3E%3C/linearGradient%3E%3CradialGradient%20id%3D%22rainbow%22%20cx%3D%2250%25%22%20cy%3D%2220%25%22%20r%3D%2240%25%22%3E%3Cstop%20offset%3D%220%25%22%20style%3D%22stop-color%3A%23ff6b6b%3Bstop-opacity%3A0.3%22%20/%3E%3Cstop%20offset%3D%2216.66%25%22%20style%3D%22stop-color%3A%23ffd93d%3Bstop-opacity%3A0.3%22%20/%3E%3Cstop%20offset%3D%2233.33%25%22%20style%3D%22stop-color%3A%236bcf7f%3Bstop-opacity%3A0.3%22%20/%3E%3Cstop%20offset%3D%2250%25%22%20style%3D%22stop-color%3A%234ecdc4%3Bstop-opacity%3A0.3%22%20/%3E%3Cstop%20offset%3D%2266.66%25%22%20style%3D%22stop-color%3A%2345b7d1%3Bstop-opacity%3A0.3%22%20/%3E%3Cstop%20offset%3D%2283.33%25%22%20style%3D%22stop-color%3A%2396ceb4%3Bstop-opacity%3A0.3%22%20/%3E%3Cstop%20offset%3D%22100%25%22%20style%3D%22stop-color%3A%23feca57%3Bstop-opacity%3A0.3%22%20/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect%20width%3D%221200%22%20height%3D%22800%22%20fill%3D%22url%28%23sky%29%22%20/%3E%3Cellipse%20cx%3D%22600%22%20cy%3D%22160%22%20rx%3D%22400%22%20ry%3D%2280%22%20fill%3D%22url%28%23rainbow%29%22%20/%3E%3Ccircle%20cx%3D%22600%22%20cy%3D%22300%22%20r%3D%2280%22%20fill%3D%22%23ffb3d9%22%20opacity%3D%220.2%22%20/%3E%3Ccircle%20cx%3D%22580%22%20cy%3D%22280%22%20r%3D%2215%22%20fill%3D%22%23ffb3d9%22%20opacity%3D%220.15%22%20/%3E%3Ccircle%20cx%3D%22620%22%20cy%3D%22280%22%20r%3D%2215%22%20fill%3D%22%23ffb3d9%22%20opacity%3D%220.15%22%20/%3E%3Ccircle%20cx%3D%22600%22%20cy%3D%22320%22%20r%3D%2220%22%20fill%3D%22%23ffb3d9%22%20opacity%3D%220.15%22%20/%3E%3Crect%20x%3D%22550%22%20y%3D%22380%22%20width%3D%22100%22%20height%3D%22120%22%20fill%3D%22%23a8e6cf%22%20opacity%3D%220.1%22%20/%3E%3Crect%20x%3D%22540%22%20y%3D%22370%22%20width%3D%22120%22%20height%3D%2220%22%20fill%3D%22%23a8e6cf%22%20opacity%3D%220.1%22%20/%3E%3Crect%20x%3D%22530%22%20y%3D%22360%22%20width%3D%22140%22%20height%3D%2220%22%20fill%3D%22%23a8e6cf%22%20opacity%3D%220.1%22%20/%3E%3Crect%20x%3D%22520%22%20y%3D%22350%22%20width%3D%22160%22%20height%3D%2220%22%20fill%3D%22%23a8e6cf%22%20opacity%3D%220.1%22%20/%3E%3Ccircle%20cx%3D%22400%22%20cy%3D%22200%22%20r%3D%223%22%20fill%3D%22%23ffd93d%22%20opacity%3D%220.4%22%20/%3E%3Ccircle%20cx%3D%22800%22%20cy%3D%22150%22%20r%3D%222%22%20fill%3D%22%23ffd93d%22%20opacity%3D%220.3%22%20/%3E%3Ccircle%20cx%3D%22500%22%20cy%3D%22120%22%20r%3D%222.5%22%20fill%3D%22%23ffd93d%22%20opacity%3D%220.35%22%20/%3E%3Ccircle%20cx%3D%22700%22%20cy%3D%22180%22%20r%3D%221.5%22%20fill%3D%22%23ffd93d%22%20opacity%3D%220.25%22%20/%3E%3Ccircle%20cx%3D%22450%22%20cy%3D%22160%22%20r%3D%221%22%20fill%3D%22%23ffd93d%22%20opacity%3D%220.3%22%20/%3E%3Ccircle%20cx%3D%22750%22%20cy%3D%22140%22%20r%3D%222%22%20fill%3D%22%23ffd93d%22%20opacity%3D%220.35%22%20/%3E%3Ccircle%20cx%3D%22350%22%20cy%3D%22180%22%20r%3D%221.5%22%20fill%3D%22%23ffd93d%22%20opacity%3D%220.25%22%20/%3E%3Ccircle%20cx%3D%22850%22%20cy%3D%22170%22%20r%3D%221%22%20fill%3D%22%23ffd93d%22%20opacity%3D%220.3%22%20/%3E%3Ctext%20x%3D%22200%22%20y%3D%22100%22%20font-size%3D%2260%22%20fill%3D%22white%22%20opacity%3D%220.15%22%3E☁️%3C/text%3E%3Ctext%20x%3D%22900%22%20y%3D%22120%22%20font-size%3D%2250%22%20fill%3D%22white%22%20opacity%3D%220.1%22%3E☁️%3C/text%3E%3Ctext%20x%3D%22300%22%20y%3D%2280%22%20font-size%3D%2240%22%20fill%3D%22white%22%20opacity%3D%220.125%22%3E☁️%3C/text%3E%3Ctext%20x%3D%22800%22%20y%3D%2290%22%20font-size%3D%2245%22%20fill%3D%22white%22%20opacity%3D%220.075%22%3E☁️%3C/text%3E%3Ctext%20x%3D%22150%22%20y%3D%22150%22%20font-size%3D%2235%22%20fill%3D%22white%22%20opacity%3D%220.15%22%3E🕊️%3C/text%3E%3Ctext%20x%3D%22950%22%20y%3D%22110%22%20font-size%3D%2230%22%20fill%3D%22white%22%20opacity%3D%220.125%22%3E🕊️%3C/text%3E%3Ctext%20x%3D%22250%22%20y%3D%22120%22%20font-size%3D%2225%22%20fill%3D%22white%22%20opacity%3D%220.175%22%3E🕊️%3C/text%3E%3Ctext%20x%3D%22850%22%20y%3D%22130%22%20font-size%3D%2220%22%20fill%3D%22white%22%20opacity%3D%220.15%22%3E🕊️%3C/text%3E%3Ctext%20x%3D%22350%22%20y%3D%22140%22%20font-size%3D%2228%22%20fill%3D%22white%22%20opacity%3D%220.2%22%3E🦄%3C/text%3E%3Ctext%20x%3D%22750%22%20y%3D%22160%22%20font-size%3D%2235%22%20fill%3D%22white%22%20opacity%3D%220.125%22%3E🦄%3C/text%3E%3Ctext%20x%3D%22450%22%20y%3D%22180%22%20font-size%3D%2222%22%20fill%3D%22white%22%20opacity%3D%220.15%22%3E🦄%3C/text%3E%3Ctext%20x%3D%22650%22%20y%3D%22170%22%20font-size%3D%2218%22%20fill%3D%22white%22%20opacity%3D%220.1%22%3E🦄%3C/text%3E%3Ctext%20x%3D%22200%22%20y%3D%22700%22%20font-size%3D%2240%22%20fill%3D%22white%22%20opacity%3D%220.2%22%3E🌸%3C/text%3E%3Ctext%20x%3D%22950%22%20y%3D%22720%22%20font-size%3D%2235%22%20fill%3D%22white%22%20opacity%3D%220.175%22%3E🌺%3C/text%3E%3Ctext%20x%3D%22300%22%20y%3D%22680%22%20font-size%3D%2230%22%20fill%3D%22white%22%20opacity%3D%220.15%22%3E🌼%3C/text%3E%3Ctext%20x%3D%22850%22%20y%3D%22690%22%20font-size%3D%2225%22%20fill%3D%22white%22%20opacity%3D%220.125%22%3E🌻%3C/text%3E%3Ctext%20x%3D%22400%22%20y%3D%22710%22%20font-size%3D%2220%22%20fill%3D%22white%22%20opacity%3D%220.15%22%3E🌹%3C/text%3E%3Ccircle%20cx%3D%22300%22%20cy%3D%22250%22%20r%3D%224%22%20fill%3D%22%23f9a8d4%22%20opacity%3D%220.3%22%20/%3E%3Ccircle%20cx%3D%22750%22%20cy%3D%22200%22%20r%3D%223%22%20fill%3D%22%2393c5fd%22%20opacity%3D%220.25%22%20/%3E%3Ccircle%20cx%3D%22500%22%20cy%3D%22300%22%20r%3D%223.5%22%20fill%3D%22%23fde047%22%20opacity%3D%220.35%22%20/%3E%3C/svg%3E')] bg-cover bg-center opacity-20"></div>
        
        {/* Masalsı elementler */}
        <div className="absolute inset-0">
          {/* Yıldızlar */}
          <div className="absolute top-20 left-20 w-2 h-2 bg-yellow-300 rounded-full animate-pulse opacity-80"></div>
          <div className="absolute top-32 right-32 w-1 h-1 bg-yellow-300 rounded-full animate-pulse opacity-60"></div>
          <div className="absolute top-16 left-1/2 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse opacity-70"></div>
          <div className="absolute top-40 right-1/4 w-1 h-1 bg-yellow-300 rounded-full animate-pulse opacity-50"></div>
          <div className="absolute top-24 left-1/3 w-1 h-1 bg-yellow-300 rounded-full animate-pulse opacity-80"></div>
          
          {/* Büyülü ışıklar */}
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-pink-300 rounded-full animate-pulse opacity-60"></div>
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-blue-300 rounded-full animate-pulse opacity-50"></div>
          <div className="absolute top-1/2 left-1/3 w-3.5 h-3.5 bg-yellow-300 rounded-full animate-pulse opacity-70"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            {/* Main Title - Vuexy Style */}
            <h1 className="text-6xl lg:text-8xl font-bold text-white mb-8 leading-tight">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                StoryChain
              </span>
            </h1>
            
            {/* Subtitle - Eski güzel yazı geri getirildi */}
            <p className="text-2xl lg:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Hayal Gücünü{' '}
              <span className="text-yellow-300 animate-pulse drop-shadow-lg font-bold">Serbest Bırak!</span>
            </p>
            
            {/* CTA Buttons - Modern Design ve Ortalandı */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              {user ? (
                <Link 
                  href="/themes" 
                  className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 flex items-center gap-4"
                >
                  <span className="text-2xl">✏️</span>
                  <span>Hikaye Yazmaya Başla</span>
                  <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                </Link>
              ) : (
                <Link 
                  href="/register" 
                  className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 flex items-center gap-4"
                >
                  <span className="text-2xl">🚀</span>
                  <span>Hazır mısın?</span>
                  <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                </Link>
              )}
              
              <Link 
                href="/stories" 
                className="group bg-white/10 hover:bg-white/20 text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 border-2 border-white/20 hover:border-white/40 backdrop-blur-sm flex items-center gap-4"
              >
                <span className="text-2xl">📖</span>
                <span>Hikayeleri Keşfet</span>
                <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - Modern Design */}
      <div className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Nasıl Çalışır?
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              StoryChain ile hikaye yazma deneyimi çok kolay. Sadece 3 adımda başlayın!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300 hover:bg-white/15 group">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  1
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Tema Seçin</h3>
                <p className="text-gray-300 leading-relaxed">
                  İlham verici temalar arasından seçim yapın ve hikayenizi başlatın.
                </p>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300 hover:bg-white/15 group">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  2
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Hikaye Yazın</h3>
                <p className="text-gray-300 leading-relaxed">
                  Hayal gücünüzü kullanarak hikayenizi yazın ve paylaşın.
                </p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300 hover:bg-white/15 group">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  3
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Paylaşın</h3>
                <p className="text-gray-300 leading-relaxed">
                  Hikayenizi toplulukla paylaşın ve başkalarının devam etmesini bekleyin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section - Modern Design */}
      <div className="relative py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-3xl p-12 border border-purple-500/30">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Hikaye Yazma Macerasına Katılın!
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Binlerce yazarın katıldığı bu büyük hikaye topluluğuna siz de katılın. 
              Hayal gücünüzü paylaşın, başkalarının hikayelerini keşfedin.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                href={user ? "/themes" : "/register"} 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {user ? "Yeni Hikaye Yaz" : "Hemen Başla"}
              </Link>
              <Link 
                href="/how-it-works" 
                className="bg-white/10 hover:bg-white/20 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 border border-white/20 hover:border-white/40"
              >
                Daha Fazla Bilgi
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
