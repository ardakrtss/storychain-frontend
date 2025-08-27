'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { PenTool, Info } from 'lucide-react';

export default function Hero() {
  return (
    <div 
      className="relative min-h-screen flex items-center justify-center text-center text-white"
      style={{ 
        backgroundImage: "url('/images/hero-background.png')", 
        backgroundSize: "cover", 
        backgroundPosition: "center" 
      }}
    >
      {/* Yarı saydam overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Ana İçerik */}
      <div className="relative z-10 max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
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
            className="text-4xl lg:text-7xl font-extrabold leading-tight text-black"
          >
            <span className="block">Hayal Gücünü</span>
            <span className="block">Serbest Bırak!</span>
          </motion.h1>

          {/* Alt Başlık */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-base lg:text-lg text-black"
          >
            Arkadaşlarınla birlikte sürükleyici hikâyeler yaz, kelime sınırını zorla, eğlenceli sürprizlerle hikâyeni tamamla!
          </motion.p>

          {/* CTA Butonları */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 flex justify-center flex-wrap gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/themes" 
                className="px-6 py-3 rounded-full !bg-orange-500 hover:!bg-orange-600 !text-white font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all duration-300 flex items-center gap-2"
              >
                <PenTool size={20} />
                <span>Yazmaya Başla</span>
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/nasil-calisir" 
                className="px-6 py-3 rounded-full border-2 !border-orange-500 !text-orange-600 hover:!bg-orange-500 hover:!text-white font-semibold focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all duration-300 flex items-center gap-2 !bg-transparent"
              >
                <Info size={20} />
                <span>Nasıl Çalışır?</span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
