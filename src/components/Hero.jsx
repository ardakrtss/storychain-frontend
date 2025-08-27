'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { PenTool, Info } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fantastik Arka Plan İllüstrasyonu */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-purple-800 to-pink-700">
        {/* Yıldızlı Gökyüzü */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-40 w-1 h-1 bg-white rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-60 left-1/3 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-2000"></div>
          <div className="absolute top-80 right-1/4 w-1 h-1 bg-white rounded-full animate-pulse delay-3000"></div>
          <div className="absolute top-32 left-2/3 w-2 h-2 bg-white rounded-full animate-pulse delay-1500"></div>
          <div className="absolute top-16 right-1/3 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-2500"></div>
        </div>

        {/* Gökkuşağı */}
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-96 h-32">
          <div className="w-full h-full rounded-full border-8 border-red-400"></div>
          <div className="absolute top-2 left-2 w-full h-full rounded-full border-8 border-orange-400"></div>
          <div className="absolute top-4 left-4 w-full h-full rounded-full border-8 border-yellow-400"></div>
          <div className="absolute top-6 left-6 w-full h-full rounded-full border-8 border-green-400"></div>
          <div className="absolute top-8 left-8 w-full h-full rounded-full border-8 border-blue-400"></div>
          <div className="absolute top-10 left-10 w-full h-full rounded-full border-8 border-indigo-400"></div>
          <div className="absolute top-12 left-12 w-full h-full rounded-full border-8 border-purple-400"></div>
        </div>

        {/* Kuşlar */}
        <div className="absolute top-20 left-20 text-white text-4xl animate-bounce">🕊️</div>
        <div className="absolute top-16 right-32 text-white text-3xl animate-bounce delay-1000">🕊️</div>
        <div className="absolute top-28 left-1/3 text-white text-3xl animate-bounce delay-2000">🕊️</div>
        <div className="absolute top-24 right-1/4 text-white text-4xl animate-bounce delay-1500">🕊️</div>

        {/* Yüzen Kale */}
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            {/* Kale Ana Yapısı */}
            <div className="w-48 h-32 bg-gray-200 rounded-lg relative">
              {/* Kuleler */}
              <div className="absolute -top-8 left-4 w-8 h-8 bg-gray-300 rounded-full"></div>
              <div className="absolute -top-8 right-4 w-8 h-8 bg-gray-300 rounded-full"></div>
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gray-300 rounded-full"></div>
              {/* Bayraklar */}
              <div className="absolute -top-12 left-4 w-1 h-4 bg-red-500"></div>
              <div className="absolute -top-12 right-4 w-1 h-4 bg-red-500"></div>
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-red-500"></div>
            </div>
            {/* Bulut Temeli */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-56 h-8 bg-white/80 rounded-full blur-sm"></div>
          </div>
        </div>

        {/* Yüzen Adalar */}
        <div className="absolute bottom-1/3 left-20">
          <div className="relative">
            <div className="w-32 h-20 bg-purple-600 rounded-lg relative">
              <div className="absolute top-2 left-2 w-8 h-8 bg-orange-400 rounded-full"></div>
              <div className="absolute top-4 right-4 w-6 h-6 bg-orange-400 rounded-full"></div>
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-36 h-4 bg-white/60 rounded-full blur-sm"></div>
          </div>
        </div>

        <div className="absolute bottom-1/4 right-32">
          <div className="relative">
            <div className="w-40 h-24 bg-purple-600 rounded-lg relative">
              <div className="absolute top-2 left-4 w-10 h-10 bg-orange-400 rounded-full"></div>
              <div className="absolute top-6 right-6 w-8 h-8 bg-orange-400 rounded-full"></div>
              <div className="absolute top-8 left-8 w-6 h-6 bg-orange-400 rounded-full"></div>
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-44 h-4 bg-white/60 rounded-full blur-sm"></div>
          </div>
        </div>

        {/* Köprü */}
        <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 w-64 h-4 bg-gray-400 rounded-full"></div>

        {/* Nehir */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-blue-300/60"></div>

        {/* Bulutlar */}
        <div className="absolute top-1/4 left-10 w-24 h-12 bg-white/80 rounded-full blur-sm"></div>
        <div className="absolute top-1/3 right-20 w-20 h-10 bg-white/80 rounded-full blur-sm"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-8 bg-white/80 rounded-full blur-sm"></div>
        <div className="absolute top-2/3 right-1/3 w-28 h-14 bg-white/80 rounded-full blur-sm"></div>
      </div>

      {/* Ana İçerik */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Ana Başlık */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl lg:text-8xl font-black text-white mb-6 leading-none"
          >
            <span className="block">Hayal Gücünü</span>
            <span className="block text-yellow-400">Serbest Bırak!</span>
          </motion.h1>

          {/* Açıklama */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            Arkadaşlarınla birlikte sürükleyici hikâyeler yaz, kelime sınırını zorla, eğlenceli sürprizlerle hikâyeni tamamla!
          </motion.p>

          {/* CTA Butonları */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/themes" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3"
              >
                <PenTool size={24} />
                <span>Yazmaya Başla</span>
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/nasil-calisir" 
                className="bg-white hover:bg-gray-50 text-black px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 border-2 border-gray-200 hover:border-gray-300 flex items-center gap-3 shadow-lg hover:shadow-xl"
              >
                <Info size={24} />
                <span>Nasıl Çalışır?</span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
