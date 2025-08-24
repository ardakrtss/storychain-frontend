'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';
import Link from 'next/link';
import api from '../../../lib/api';

export default function StoryDetailPage() {
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const { user } = useAuth();
  const params = useParams();
  const router = useRouter();
  const storyId = params.id;

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await api.get(`/stories/${storyId}`);
        let storyData = response.data;
        
        // localStorage'dan beğeni sayısını al
        const storyLikes = JSON.parse(localStorage.getItem('storyLikes') || '{}');
        const storyKey = `story_${storyId}`;
        storyData.likeCount = storyLikes[storyKey] || storyData.likeCount || 0;
        
        setStory(storyData);
      } catch (error) {
        console.error('Error fetching story:', error);
        setError('Hikaye yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    if (storyId) {
      fetchStory();
    }
  }, [storyId]);

  const handleContinueStory = () => {
    if (user) {
      router.push(`/write?storyId=${storyId}&mode=continue`);
    } else {
      router.push('/nickname');
    }
  };

  const handleLikeStory = () => {
    if (!user) {
      alert('Beğenmek için giriş yapmanız gerekiyor!');
      return;
    }

    // localStorage'dan beğeni verilerini al
    const storyLikes = JSON.parse(localStorage.getItem('storyLikes') || '{}');
    const userLikes = JSON.parse(localStorage.getItem('userLikes') || '{}');
    
    const storyKey = `story_${storyId}`;
    const userKey = `${user.id}_${storyId}`;
    
    // Kullanıcı daha önce beğenmiş mi kontrol et
    if (userLikes[userKey]) {
      // Beğeniyi geri al
      delete userLikes[userKey];
      storyLikes[storyKey] = (storyLikes[storyKey] || 1) - 1;
      alert('Beğeniniz geri alındı!');
    } else {
      // Beğeni ekle
      userLikes[userKey] = true;
      storyLikes[storyKey] = (storyLikes[storyKey] || 0) + 1;
      alert('Hikayeyi beğendiniz!');
    }
    
    // localStorage'a kaydet
    localStorage.setItem('storyLikes', JSON.stringify(storyLikes));
    localStorage.setItem('userLikes', JSON.stringify(userLikes));
    
    // Story state'ini güncelle
    setStory(prevStory => ({
      ...prevStory,
      likeCount: storyLikes[storyKey] || 0
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 flex items-center justify-center">
        <div className="text-2xl text-gray-900">Hikaye yükleniyor...</div>
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Hata</h2>
          <p className="text-gray-700 mb-4">{error || 'Hikaye bulunamadı'}</p>
          <Link 
            href="/stories" 
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
          >
            Hikayelere Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 py-12 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-pink-600/5 to-purple-600/5 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-bounce"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-full border border-purple-500/30 mb-8">
            <span className="text-purple-700 text-sm font-semibold">📖 Hikaye Detayı</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-black text-gray-900 mb-8 leading-tight">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              {story.title}
            </span>
          </h1>
          <div className="flex items-center justify-center gap-6 text-gray-700">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-700 border border-purple-500/30 backdrop-blur-sm">
              {story.theme}
            </span>
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

        {/* Action Buttons */}
        <div className={`flex flex-col sm:flex-row gap-6 justify-center mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {!story.isCompleted && (
            <button
              onClick={handleContinueStory}
              className="group relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-500 shadow-2xl hover:shadow-purple-500/50 transform hover:scale-110 flex items-center justify-center gap-4 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="text-2xl relative z-10">✏️</span>
              <span className="relative z-10">Hikayeye Devam Et</span>
            </button>
          )}
          
          {story.isCompleted && (
            <button
              onClick={handleLikeStory}
              className={`group relative text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-500 shadow-2xl transform hover:scale-110 flex items-center justify-center gap-4 overflow-hidden ${
                (() => {
                  const userLikes = JSON.parse(localStorage.getItem('userLikes') || '{}');
                  const userKey = `${user?.id}_${storyId}`;
                  return userLikes[userKey] 
                    ? 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 hover:shadow-red-500/50' 
                    : 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 hover:shadow-pink-500/50';
                })()
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="text-2xl relative z-10">
                {(() => {
                  const userLikes = JSON.parse(localStorage.getItem('userLikes') || '{}');
                  const userKey = `${user?.id}_${storyId}`;
                  return userLikes[userKey] ? '💖' : '❤️';
                })()}
              </span>
              <span className="relative z-10">
                {(() => {
                  const userLikes = JSON.parse(localStorage.getItem('userLikes') || '{}');
                  const userKey = `${user?.id}_${storyId}`;
                  return userLikes[userKey] ? 'Beğendiniz' : 'Beğen';
                })()} ({story.likeCount || 0})
              </span>
            </button>
          )}
          
          <Link 
            href="/stories" 
            className="group bg-gray-800 hover:bg-gray-700 text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-500 border-2 border-gray-600 hover:border-gray-500 backdrop-blur-sm flex items-center justify-center gap-4 hover:scale-105"
          >
            <span className="text-2xl">📚</span>
            <span>Tüm Hikayeler</span>
          </Link>
        </div>

        {/* Story Content */}
        <div className={`group relative mb-12 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
          <div className="relative bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-200 hover:border-gray-300 transition-all duration-500 p-10">
            <h2 className="text-3xl font-black text-gray-900 mb-8">Hikaye İçeriği</h2>
            
            {story.segments && story.segments.length > 0 ? (
              <div className="space-y-8">
                {story.segments.map((segment, index) => (
                  <div key={segment.id} className="group/item relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5 rounded-2xl blur-lg group-hover/item:blur-xl transition-all duration-500"></div>
                    <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 hover:border-gray-300 transition-all duration-500 hover:bg-white/90">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg group-hover/item:scale-110 transition-transform duration-500">
                            {index + 1}
                          </div>
                          <span className="font-bold text-gray-900 text-lg">
                            {segment.author}
                          </span>
                        </div>
                        <span className="text-gray-600 font-semibold">
                          {new Date(segment.createdAt).toLocaleDateString('tr-TR')}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {segment.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-9xl mb-8 animate-bounce">📝</div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Henüz İçerik Yok</h3>
                <p className="text-gray-700 mb-10 text-xl leading-relaxed">Bu hikayeye ilk katkıyı sen yap!</p>
                {user ? (
                  <button
                    onClick={handleContinueStory}
                    className="group relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-500 inline-flex items-center gap-4 shadow-2xl hover:shadow-purple-500/50 transform hover:scale-110 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <span className="text-2xl relative z-10">✏️</span>
                    <span className="relative z-10">İlk Bölümü Yaz</span>
                  </button>
                ) : (
                  <Link 
                    href="/nickname" 
                    className="group relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-500 inline-flex items-center gap-4 shadow-2xl hover:shadow-purple-500/50 transform hover:scale-110 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <span className="text-2xl relative z-10">🔑</span>
                    <span className="relative z-10">Giriş Yap ve Yaz</span>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Story Info */}
        <div className={`group relative transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
          <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 hover:border-white/40 transition-all duration-500 p-10">
            <h3 className="text-2xl font-black text-white mb-8 text-center">Hikaye Bilgileri</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group/item text-center">
                <div className="text-5xl mb-4 group-hover/item:scale-110 transition-transform duration-500">📝</div>
                <p className="font-bold text-white text-lg mb-2">Bölüm Sayısı</p>
                <p className="text-gray-300 font-semibold">{story.segments ? story.segments.length : 0}</p>
              </div>
              <div className="group/item text-center">
                <div className="text-5xl mb-4 group-hover/item:scale-110 transition-transform duration-500">❤️</div>
                <p className="font-bold text-white text-lg mb-2">Beğeni Sayısı</p>
                <p className="text-gray-300 font-semibold">{story.likeCount || 0}</p>
              </div>
              <div className="group/item text-center">
                <div className="text-5xl mb-4 group-hover/item:scale-110 transition-transform duration-500">🏁</div>
                <p className="font-bold text-white text-lg mb-2">Durum</p>
                <p className="text-gray-300 font-semibold">
                  {story.isCompleted ? 'Tamamlandı' : 'Devam Ediyor'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
