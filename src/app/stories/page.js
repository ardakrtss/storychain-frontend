'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Link from 'next/link';
import api from '../../lib/api';

export default function StoriesPage() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 flex items-center justify-center">
        <div className="text-2xl text-gray-900">Hikayeler yükleniyor...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Hata</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 py-12 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-pink-600/5 to-purple-600/5 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-bounce"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-full border border-purple-500/30 mb-8">
            <span className="text-purple-700 text-sm font-semibold">📚 Hikaye Koleksiyonu</span>
          </div>
          <h1 className="text-6xl lg:text-7xl font-black text-gray-900 mb-8">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              Hikayeler
            </span>
          </h1>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Diğer yazarlarımızın birlikte yarattığı harika hikayeleri keşfet! 
            Beğendiğin hikayelere kalp ver ve yeni hikayeler yazmaya ilham al.
          </p>
        </div>

        {/* Action Buttons */}
        <div className={`flex flex-col sm:flex-row gap-6 justify-center mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {user ? (
            <Link 
              href="/themes" 
              className="group relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-500 shadow-2xl hover:shadow-purple-500/50 transform hover:scale-110 flex items-center justify-center gap-4 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="text-2xl relative z-10">✏️</span>
              <span className="relative z-10">Yeni Hikaye Yaz</span>
            </Link>
          ) : (
            <Link 
              href="/nickname" 
              className="group relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-500 shadow-2xl hover:shadow-purple-500/50 transform hover:scale-110 flex items-center justify-center gap-4 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="text-2xl relative z-10">✏️</span>
              <span className="relative z-10">Hikaye Yazmaya Başla</span>
            </Link>
          )}
          
          <Link 
            href="/leaderboard" 
            className="group bg-gray-800 hover:bg-gray-700 text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-500 border-2 border-gray-600 hover:border-gray-500 backdrop-blur-sm flex items-center justify-center gap-4 hover:scale-105"
          >
            <span className="text-2xl">🏆</span>
            <span>Lider Tablosu</span>
          </Link>
        </div>

        {/* Stories Grid */}
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {stories.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-9xl mb-8 animate-bounce">📚</div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Henüz Hikaye Yok</h3>
              <p className="text-gray-700 mb-10 text-xl leading-relaxed">İlk hikayeyi sen yazarak başlat!</p>
              <Link 
                href="/themes" 
                className="group relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-500 inline-flex items-center gap-4 shadow-2xl hover:shadow-purple-500/50 transform hover:scale-110 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="text-2xl relative z-10">✏️</span>
                <span className="relative z-10">İlk Hikayeyi Yaz</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {stories.map((story, index) => (
                <div 
                  key={story.id} 
                  className={`group relative transition-all duration-1000 delay-${index * 100}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-200 hover:border-gray-300 transition-all duration-500 hover:bg-white/90 hover:scale-105 overflow-hidden">
                    {/* Story Header */}
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-4">
                        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-700 border border-purple-500/30 backdrop-blur-sm">
                          {story.theme}
                        </span>
                        <div className="flex items-center gap-2 text-pink-400">
                          <span className="text-xl">❤️</span>
                          <span className="text-lg font-bold">{story.likeCount || 0}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 line-clamp-2 leading-tight">
                        {story.title}
                      </h3>
                      
                      <p className="text-gray-700 text-base mb-6 line-clamp-3 leading-relaxed">
                        {story.segments && story.segments.length > 0 
                          ? story.segments[0].content 
                          : 'Hikaye içeriği yükleniyor...'}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
                        <span className="flex items-center gap-2">
                          <span className="text-lg">👤</span>
                          <span className="font-semibold">{story.segments && story.segments.length > 0 ? story.segments[0].author : 'Anonim'}</span>
                        </span>
                        <span className="flex items-center gap-2">
                          <span className="text-lg">📅</span>
                          <span>{new Date(story.createdAt).toLocaleDateString('tr-TR')}</span>
                        </span>
                      </div>
                    </div>
                    
                    {/* Story Footer */}
                    <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 font-semibold flex items-center gap-2">
                          <span className="text-lg">📖</span>
                          {story.segments ? story.segments.length : 0} bölüm
                        </span>
                        {story.segments && story.segments.length < 3 ? (
                          <button 
                            onClick={() => {
                              const messages = [
                                "Oops! Hikaye bitmeden okuma ki heyecanı kaçmasın! 😄",
                                "Hey! Hikaye henüz tamamlanmadı, sabırlı ol! 🎭",
                                "Hikaye devam ediyor... Biraz daha bekle! ⏳",
                                "Heyecan dorukta! Hikaye henüz bitmedi! 🎪",
                                "Hikaye tamamlanana kadar beklemek zorundasın! 🎯"
                              ];
                              const randomMessage = messages[Math.floor(Math.random() * messages.length)];
                              alert(randomMessage);
                            }}
                            className="group relative bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-bold transition-all duration-500 shadow-lg hover:shadow-xl transform hover:scale-110 overflow-hidden"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                            <span className="relative z-10">Devamını Oku →</span>
                          </button>
                        ) : (
                          <Link 
                            href={`/stories/${story.id}`}
                            className="group relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-500 shadow-lg hover:shadow-xl transform hover:scale-110 overflow-hidden"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                            <span className="relative z-10">Devamını Oku →</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
