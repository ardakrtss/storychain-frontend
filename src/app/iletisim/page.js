'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8">
            İletişim
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Bu sayfa yakında güncellenecek. Bizimle iletişime geçmek için gerekli bilgileri burada bulacaksınız.
          </p>
          
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <ArrowLeft size={20} />
            <span>Ana Sayfaya Dön</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
