'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Trophy, BookOpen, Heart, Users } from 'lucide-react';
import { getPopularStories } from '../lib/firebase-stories';

export default function Stories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const popularStories = await getPopularStories(3); // En popüler 3 hikaye
        setStories(popularStories);
      } catch (error) {
        console.error('Hikayeler yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            En Çok Beğenilen Hikâyeler
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Diğer yazarlarımızın birlikte yarattığı harika hikâyeleri keşfet!
          </p>
        </motion.div>

        {/* Hikaye Kartları */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : stories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {stories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-2">
                      {story.title}
                    </h3>
                    <div className="flex items-center gap-1 text-purple-600">
                      <Heart size={16} />
                      <span className="text-sm font-medium">{story.likes || 0}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {story.segments && story.segments.length > 0 
                      ? story.segments[0].content 
                      : 'Hikaye içeriği yükleniyor...'}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <Users size={14} />
                      <span>{story.segments?.length || 0} katkı</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen size={14} />
                      <span>{story.status === 'completed' ? 'Tamamlandı' : 'Devam Ediyor'}</span>
                    </div>
                  </div>
                  
                  <Link
                    href={`/stories/${story.id}`}
                    className="block w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                  >
                    Hikayeyi Oku
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Henüz Hikaye Yok</h3>
            <p className="text-gray-600 mb-6">İlk hikayeyi sen yazarak başlat!</p>
            <Link
              href="/write"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
            >
              <span>İlk Hikayeyi Yaz</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        )}

        {/* Aksiyon Butonları */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/stories"
              className="!bg-orange-500 hover:!bg-orange-600 !text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3"
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
              href="/write"
              className="text-orange-600 hover:text-orange-700 font-semibold text-lg transition-all duration-300 flex items-center gap-2 underline decoration-2 underline-offset-4"
            >
              <span>✏️</span>
              <span>Hikaye Yaz</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
