'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo ve Telif Hakkı */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center space-x-2 mb-6 md:mb-0"
          >
            <div className="w-6 h-6 bg-gradient-to-r from-pink-500 via-orange-500 to-purple-500 rounded-full"></div>
            <span className="text-lg font-bold">
              <span className="text-purple-800">Story</span>
              <span className="text-purple-500">Chain</span>
            </span>
            <span className="text-gray-500 text-sm">© {currentYear}</span>
          </motion.div>

          {/* Footer Linkleri */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center md:justify-end space-x-6 text-gray-600"
          >
            <Link
              href="/terms"
              className="hover:text-gray-900 transition-colors duration-300"
            >
              Kullanım Şartları
            </Link>
            <Link
              href="/privacy"
              className="hover:text-gray-900 transition-colors duration-300"
            >
              Gizlilik Politikası
            </Link>
            <Link
              href="/contact"
              className="hover:text-gray-900 transition-colors duration-300"
            >
              İletişim
            </Link>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
