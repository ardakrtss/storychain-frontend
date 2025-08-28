'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const themes = [
  {
    id: 1,
    title: 'Macera',
    description: 'Heyecan dolu yolculuklar ve keşifler',
    image: '/images/adventure.png',
    color: 'bg-orange-500',
    hoverColor: 'hover:bg-orange-600',
    value: 'macera'
  },
  {
    id: 2,
    title: 'Gizem',
    description: 'Sırlarla dolu esrarengiz hikayeler',
    image: '/images/mystery.png',
    color: 'bg-purple-500',
    hoverColor: 'hover:bg-purple-600',
    value: 'gizem'
  },
  {
    id: 3,
    title: 'Fantastik',
    description: 'Büyülü dünyalar ve efsanevi yaratıklar',
    image: '/images/fantasy.png',
    color: 'bg-blue-400',
    hoverColor: 'hover:bg-blue-500',
    value: 'fantastik'
  },
  {
    id: 4,
    title: 'Bilim Kurgu',
    description: 'Gelecekte geçen teknolojik maceralar',
    image: '/images/scifi.png',
    color: 'bg-blue-600',
    hoverColor: 'hover:bg-blue-700',
    value: 'bilim-kurgu'
  },
  {
    id: 5,
    title: 'Sıfır Atık',
    description: 'Çevre dostu ve sürdürülebilir hikayeler',
    image: '/images/zerowaste.png',
    color: 'bg-green-500',
    hoverColor: 'hover:bg-green-600',
    value: 'sifir-atik'
  },
  {
    id: 6,
    title: 'İklim Değişikliği',
    description: 'Doğa ve çevre temalı hikayeler',
    image: '/images/climate.png',
    color: 'bg-blue-700',
    hoverColor: 'hover:bg-blue-800',
    value: 'iklim'
  }
];

export default function Themes({ onThemeSelect, selectedTheme, isSelectionMode = false }) {
  const handleThemeClick = (theme) => {
    if (isSelectionMode && onThemeSelect) {
      onThemeSelect(theme.value);
    }
  };

  return (
    <div className={isSelectionMode ? "" : "py-20 bg-white"}>
      <div className={isSelectionMode ? "" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"}>
        {!isSelectionMode && (
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
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {themes.map((theme, index) => (
            <motion.div
              key={theme.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`group cursor-pointer ${isSelectionMode ? 'max-w-sm mx-auto' : ''}`}
              onClick={() => handleThemeClick(theme)}
            >
              <div
                className={`
                  bg-white rounded-2xl shadow-lg overflow-hidden
                  transition-all duration-300 ease-out
                  hover:shadow-2xl hover:-translate-y-0.5
                  ${isSelectionMode ? 'max-w-sm mx-auto' : ''}
                  ${isSelectionMode && selectedTheme === theme.value ? 'ring-4 ring-purple-400' : ''}
                `}
              >
                {/* Görsel */}
                <div className="h-40 w-full overflow-hidden bg-gray-100">
                  <img
                    src={theme.image}
                    alt={theme.title}
                    className="
                      h-40 w-full object-cover
                      transition-transform duration-300 ease-out
                      hover:scale-105
                    "
                    loading="lazy"
                  />
                </div>

                {/* İçerik */}
                <div className="p-6">
                  <h3 className="text-2xl font-extrabold text-gray-900">{theme.title}</h3>
                  <p className="mt-2 text-gray-600">
                    {theme.description}
                  </p>

                  {isSelectionMode ? (
                    <button
                      className={`
                        mt-5 w-full rounded-xl px-6 py-3 font-semibold
                        text-white shadow-md transition-all duration-300
                        ${theme.color} ${theme.hoverColor}
                        focus:outline-none focus:ring-2 focus:ring-orange-300
                        ${selectedTheme === theme.value ? 'ring-2 ring-white' : ''}
                      `}
                    >
                      {selectedTheme === theme.value ? '✓ Seçildi' : 'Seç'}
                    </button>
                  ) : (
                    <Link href={`/themes/${theme.id}`}>
                      <button
                        className={`
                          mt-5 w-full rounded-xl px-6 py-3 font-semibold
                          text-white shadow-md transition-all duration-300
                          ${theme.color} ${theme.hoverColor}
                          focus:outline-none focus:ring-2 focus:ring-orange-300
                        `}
                      >
                        Keşfet →
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
