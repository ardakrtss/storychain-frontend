'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Link from 'next/link';
import api from '../../lib/api';

export default function StoriesPage() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await api.get('/stories/available');
        setStories(response.data);
      } catch (error) {
        console.error('Error fetching stories:', error);
        setError('Hikayeler yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-2xl text-gray-900">Hikayeler yükleniyor...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Hata</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Yazarlarımızın Hikayeleri
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Diğer yazarlarımızın birlikte yarattığı harika hikayeleri keşfet! 
            Beğendiğin hikayelere kalp ver ve yeni hikayeler yazmaya ilham al.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          {user ? (
            <Link 
              href="/themes" 
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              ✏️ Yeni Hikaye Yaz
            </Link>
          ) : (
            <Link 
              href="/nickname" 
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              ✏️ Hikaye Yazmaya Başla
            </Link>
          )}
          
          <Link 
            href="/leaderboard" 
            className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            🏆 Lider Tablosu
          </Link>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Henüz Hikaye Yok</h3>
              <p className="text-gray-600 mb-6">İlk hikayeyi sen yazarak başlat!</p>
              <Link 
                href="/themes" 
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold"
              >
                İlk Hikayeyi Yaz
              </Link>
            </div>
          ) : (
            stories.map((story) => (
              <div key={story.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
                {/* Story Header */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                      {story.theme}
                    </span>
                    <div className="flex items-center gap-1 text-gray-500">
                      <span>❤️</span>
                      <span className="text-sm">{story.likeCount || 0}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {story.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {story.segments && story.segments.length > 0 
                      ? story.segments[0].content 
                      : 'Hikaye içeriği yükleniyor...'}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>👤 {story.segments && story.segments.length > 0 ? story.segments[0].author : 'Anonim'}</span>
                    <span>{new Date(story.createdAt).toLocaleDateString('tr-TR')}</span>
                  </div>
                </div>
                
                {/* Story Footer */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {story.segments ? story.segments.length : 0} bölüm
                    </span>
                    <Link 
                      href={`/stories/${story.id}`}
                      className="text-purple-600 hover:text-purple-700 font-semibold text-sm"
                    >
                      Devamını Oku →
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
