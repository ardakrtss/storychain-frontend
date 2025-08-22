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
  const { user } = useAuth();
  const params = useParams();
  const router = useRouter();
  const storyId = params.id;

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await api.get(`/stories/${storyId}`);
        setStory(response.data);
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

  const handleLikeStory = async () => {
    if (!user) {
      alert('Beğenmek için giriş yapmanız gerekiyor!');
      return;
    }

    try {
      await api.post(`/stories/${storyId}/like`);
      // Refresh story data
      const response = await api.get(`/stories/${storyId}`);
      setStory(response.data);
    } catch (error) {
      console.error('Error liking story:', error);
      alert('Beğeni işlemi başarısız oldu');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-2xl text-gray-900">Hikaye yükleniyor...</div>
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Hata</h2>
          <p className="text-gray-600 mb-4">{error || 'Hikaye bulunamadı'}</p>
          <Link 
            href="/stories" 
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Hikayelere Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {story.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-gray-600">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
              {story.theme}
            </span>
            <span>👤 {story.segments && story.segments.length > 0 ? story.segments[0].author : 'Anonim'}</span>
            <span>📅 {new Date(story.createdAt).toLocaleDateString('tr-TR')}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          {!story.isCompleted && (
            <button
              onClick={handleContinueStory}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              ✏️ Hikayeye Devam Et
            </button>
          )}
          
          <button
            onClick={handleLikeStory}
            className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            ❤️ Beğen ({story.likeCount || 0})
          </button>
          
          <Link 
            href="/stories" 
            className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            📚 Tüm Hikayeler
          </Link>
        </div>

        {/* Story Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Hikaye İçeriği</h2>
          
          {story.segments && story.segments.length > 0 ? (
            <div className="space-y-6">
              {story.segments.map((segment, index) => (
                <div key={segment.id} className="border-l-4 border-purple-500 pl-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <span className="font-semibold text-gray-900">
                        {segment.author}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(segment.createdAt).toLocaleDateString('tr-TR')}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {segment.content}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Henüz İçerik Yok</h3>
              <p className="text-gray-600 mb-4">Bu hikayeye ilk katkıyı sen yap!</p>
              {user ? (
                <button
                  onClick={handleContinueStory}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold"
                >
                  İlk Bölümü Yaz
                </button>
              ) : (
                <Link 
                  href="/nickname" 
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold"
                >
                  Rumuz Gir ve Yaz
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Story Info */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Hikaye Bilgileri</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl mb-2">📝</div>
              <p className="font-semibold">Bölüm Sayısı</p>
              <p className="text-gray-600">{story.segments ? story.segments.length : 0}</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">❤️</div>
              <p className="font-semibold">Beğeni Sayısı</p>
              <p className="text-gray-600">{story.likeCount || 0}</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🏁</div>
              <p className="font-semibold">Durum</p>
              <p className="text-gray-600">
                {story.isCompleted ? 'Tamamlandı' : 'Devam Ediyor'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
