'use client';

import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

export default function MagicalHero() {
  const { user } = useAuth();

  return (
    <section className="relative bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700 text-white py-20 overflow-hidden min-h-screen flex items-center">
      {/* Arka plan illüstrasyonu */}
      <div className="absolute inset-0">
        {/* Masalsı Kale İllüstrasyonu - Detaylı versiyon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <div className="relative w-full h-full max-w-6xl">
            {/* Gökkuşağı */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-96 h-8 bg-gradient-to-r from-red-400 via-yellow-400 to-purple-400 rounded-full opacity-60"></div>
            
            {/* Fantastik Kale - Daha büyük ve detaylı */}
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-9xl">🏰</div>
            
            {/* Yüzen Bulutlar - Daha fazla */}
            <div className="absolute top-16 left-8 text-white text-5xl opacity-30">☁️</div>
            <div className="absolute top-28 right-16 text-white text-4xl opacity-30">☁️</div>
            <div className="absolute top-12 right-1/3 text-white text-3xl opacity-30">☁️</div>
            <div className="absolute top-24 left-1/4 text-white text-2xl opacity-30">☁️</div>
            <div className="absolute top-8 right-1/4 text-white text-xl opacity-30">☁️</div>
            
            {/* Kuşlar - Daha fazla çeşitlilik */}
            <div className="absolute top-6 right-16 text-white text-3xl">🕊️</div>
            <div className="absolute top-10 right-32 text-white text-2xl">🕊️</div>
            <div className="absolute top-20 left-1/4 text-white text-xl">🕊️</div>
            <div className="absolute top-14 right-1/2 text-white text-lg">🕊️</div>
            <div className="absolute top-16 left-1/3 text-white text-sm">🕊️</div>
            
            {/* Yıldızlar - Daha fazla */}
            <div className="absolute top-8 left-16 w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
            <div className="absolute top-16 right-24 w-1 h-1 bg-yellow-300 rounded-full animate-pulse"></div>
            <div className="absolute top-24 left-1/3 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse"></div>
            <div className="absolute top-12 right-1/4 w-1 h-1 bg-yellow-300 rounded-full animate-pulse"></div>
            <div className="absolute top-20 left-1/2 w-1 h-1 bg-yellow-300 rounded-full animate-pulse"></div>
            <div className="absolute top-28 right-1/3 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse"></div>
            <div className="absolute top-6 left-1/2 w-1 h-1 bg-yellow-300 rounded-full animate-pulse"></div>
            <div className="absolute top-32 left-1/4 w-1 h-1 bg-yellow-300 rounded-full animate-pulse"></div>
            
            {/* Fantastik Yaratıklar - Daha fazla çeşitlilik */}
            <div className="absolute bottom-28 left-1/4 text-white text-4xl opacity-50">🦄</div>
            <div className="absolute bottom-24 right-1/3 text-white text-3xl opacity-50">🦄</div>
            <div className="absolute bottom-20 left-1/3 text-white text-2xl opacity-50">🦄</div>
            <div className="absolute bottom-32 right-1/4 text-white text-xl opacity-50">🦄</div>
            <div className="absolute bottom-16 left-1/2 text-white text-lg opacity-50">🦄</div>
            
            {/* Çiçekler - Daha fazla çeşitlilik */}
            <div className="absolute bottom-8 left-8 text-white text-3xl">🌸</div>
            <div className="absolute bottom-6 right-16 text-white text-2xl">🌺</div>
            <div className="absolute bottom-12 right-1/3 text-white text-xl">🌼</div>
            <div className="absolute bottom-10 left-1/3 text-white text-lg">🌻</div>
            <div className="absolute bottom-14 right-1/4 text-white text-sm">🌹</div>
            
            {/* Köprü ve Karakterler */}
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white text-5xl opacity-40">👦</div>
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 ml-10 text-white text-5xl opacity-40">👸</div>
            
            {/* Yüzen Adalar */}
            <div className="absolute bottom-8 left-8 w-36 h-20 bg-green-400 rounded-full opacity-25"></div>
            <div className="absolute bottom-6 right-16 w-28 h-16 bg-green-400 rounded-full opacity-25"></div>
            <div className="absolute bottom-12 right-1/3 w-24 h-12 bg-green-400 rounded-full opacity-25"></div>
            <div className="absolute bottom-10 left-1/3 w-20 h-10 bg-green-400 rounded-full opacity-25"></div>
            
            {/* Ek fantastik elementler */}
            <div className="absolute bottom-20 left-1/4 text-white text-2xl opacity-40">🦋</div>
            <div className="absolute bottom-18 right-1/3 text-white text-xl opacity-40">🦋</div>
            <div className="absolute bottom-16 left-1/2 text-white text-lg opacity-40">🦋</div>
            
            {/* Büyülü ışıklar */}
            <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-pink-300 rounded-full animate-pulse opacity-60"></div>
            <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-blue-300 rounded-full animate-pulse opacity-60"></div>
            <div className="absolute top-1/2 left-1/3 w-2.5 h-2.5 bg-yellow-300 rounded-full animate-pulse opacity-60"></div>
          </div>
        </div>
      </div>

      {/* İçerik */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Hayal Gücünü{' '}
          <span className="text-yellow-300 animate-pulse">Serbest Bırak!</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto leading-relaxed">
          Arkadaşlarınla birlikte sürükleyici hikâyeler yaz, kelime sınırını zorla, eğlenceli sürprizlerle hikâyeni tamamla!
        </p>
        
        {/* Animasyonlu elementler */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          {user ? (
            <Link 
              href="/themes" 
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              <span className="text-2xl">✏️</span>
              <span>Yazmaya Başla</span>
            </Link>
          ) : (
            <>
              <Link 
                href="/nickname" 
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <span className="text-2xl">✏️</span>
                <span>Yazmaya Başla</span>
              </Link>
              <Link 
                href="/how-it-works" 
                className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <span className="text-2xl">❓</span>
                <span>Nasıl Çalışır?</span>
              </Link>
            </>
          )}
        </div>
        
        {/* Ek animasyonlu elementler */}
        <div className="flex justify-center items-center gap-8 text-4xl opacity-60">
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
  );
}
