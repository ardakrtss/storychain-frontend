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
        <div className="absolute inset-0 bg-[url('/images/hero-background.png')] bg-cover bg-center opacity-20"></div>
        
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
