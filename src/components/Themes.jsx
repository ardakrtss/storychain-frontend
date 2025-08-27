'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const themes = [
  {
    id: 1,
    title: 'Macera',
    description: 'Heyecan dolu yolculuklar ve keşifler',
    image: '/images/adventure.jpg',
    color: 'bg-orange-500',
    icon: '🗺️'
  },
  {
    id: 2,
    title: 'Gizem',
    description: 'Sırlarla dolu esrarengiz hikayeler',
    image: '/images/mystery.jpg',
    color: 'bg-purple-500',
    icon: '🔍'
  },
  {
    id: 3,
    title: 'Fantastik',
    description: 'Büyülü dünyalar ve efsanevi yaratıklar',
    image: '/images/fantasy.jpg',
    color: 'bg-blue-400',
    icon: '🐉'
  },
  {
    id: 4,
    title: 'Bilim Kurgu',
    description: 'Gelecekte geçen teknolojik maceralar',
    image: '/images/scifi.jpg',
    color: 'bg-blue-600',
    icon: '🚀'
  },
  {
    id: 5,
    title: 'Sıfır Atık',
    description: 'Çevre dostu ve sürdürülebilir hikayeler',
    image: '/images/zerowaste.jpg',
    color: 'bg-green-500',
    icon: '🌱'
  },
  {
    id: 6,
    title: 'İklim Değişikliği',
    description: 'Doğa ve çevre temalı hikayeler',
    image: '/images/climate.jpg',
    color: 'bg-blue-700',
    icon: '🌍'
  }
];

export default function Themes() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Tema Keşfet
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hangi dünyada hikâye yazmak istiyorsun? Sevdiğin temayı seç ve maceraya başla!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {themes.map((theme, index) => (
            <motion.div
              key={theme.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300">
                {/* Tema Görseli */}
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-6xl">
                    {theme.icon}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Tema İçeriği */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {theme.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {theme.description}
                  </p>

                  {/* Keşfet Butonu */}
                  <Link href={`/themes/${theme.id}`}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full text-center py-4 rounded-xl text-white font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl ${theme.color}`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <span>Keşfet</span>
                        <ArrowRight size={20} />
                      </div>
                    </motion.div>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
