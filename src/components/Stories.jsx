'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Trophy } from 'lucide-react';

export default function Stories() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            En Çok Beğenilen Hikâyeler
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Diğer yazarlarımızın birlikte yarattığı harika hikâyeleri keşfet!
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/stories"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3"
              >
                <span>Tüm Hikâyeleri Gör</span>
                <ArrowRight size={24} />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/leaderboard"
                className="text-purple-600 hover:text-purple-700 font-semibold text-lg transition-all duration-300 flex items-center gap-2 underline decoration-2 underline-offset-4"
              >
                <Trophy size={20} />
                <span>Liderlik Tablosunu Gör</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
