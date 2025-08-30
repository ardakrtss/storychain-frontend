'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';
import Link from 'next/link';
import { getStory, addSegmentToStory, likeStory } from '../../../lib/firebase-stories';

export default function StoryDetailPage() {
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newSegment, setNewSegment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const { user } = useAuth();
  const params = useParams();
  const router = useRouter();
  const storyId = params.id;

  useEffect(() => {
    const fetchStory = async () => {
      try {
        setLoading(true);
        const result = await getStory(storyId);
        
        if (result.success) {
          setStory(result.story);
        } else {
          setError(result.error || 'Hikaye yüklenirken bir hata oluştu');
        }
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

  const handleAddSegment = async (e) => {
    e.preventDefault();
    
    if (!user) {
      setError('Hikayeye devam etmek için giriş yapmanız gerekiyor.');
      return;
    }

    if (!newSegment.trim()) {
      setError('Lütfen bir segment yazın.');
      return;
    }

    if (newSegment.length < 50) {
      setError('Segment en az 50 karakter olmalıdır.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const segmentData = {
        content: newSegment.trim(),
        authorId: user.uid,
        authorName: user.nickname || user.displayName
      };

      const result = await addSegmentToStory(storyId, segmentData);
      
      if (result.success) {
        // Hikayeyi yeniden yükle
        const storyResult = await getStory(storyId);
        if (storyResult.success) {
          setStory(storyResult.story);
        }
        setNewSegment('');
        
        if (result.isComplete) {
          alert('Tebrikler! Hikaye tamamlandı! 🎉');
        }
      } else {
        setError(result.error || 'Segment eklenirken bir hata oluştu.');
      }
    } catch (error) {
      console.error('Add segment error:', error);
      setError('Segment eklenirken beklenmeyen bir hata oluştu.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = async () => {
    if (!user) {
      setError('Beğenmek için giriş yapmanız gerekiyor.');
      return;
    }

    setLikeLoading(true);
    setError('');

    try {
      const result = await likeStory(storyId, user.uid);
      
      if (result.success) {
        setStory(prev => ({
          ...prev,
          likeCount: result.likeCount
        }));
      } else {
        setError(result.error || 'Hikaye beğenilirken bir hata oluştu.');
      }
    } catch (error) {
      console.error('Like error:', error);
      setError('Hikaye beğenilirken beklenmeyen bir hata oluştu.');
    } finally {
      setLikeLoading(false);
    }
  };

  const handleContinueStory = () => {
    if (user) {
      router.push(`/write?storyId=${storyId}&mode=continue`);
    } else {
      router.push('/nickname');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Hikaye yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error && !story) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-4 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">❌</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Hata</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            href="/stories"
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors duration-200"
          >
            Hikayelere Dön
          </Link>
        </div>
      </div>
    );
  }

  if (!story) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{story.title}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>👤 {story.authorName}</span>
                  <span>🎨 {story.theme}</span>
                  <span>📅 {story.createdAt?.toDate?.()?.toLocaleDateString('tr-TR') || 'Yakın zamanda'}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleLike}
                  disabled={likeLoading}
                  className="flex items-center gap-2 bg-pink-100 text-pink-700 px-4 py-2 rounded-lg hover:bg-pink-200 transition-colors duration-200 disabled:opacity-50"
                >
                  <span>❤️</span>
                  <span>{story.likeCount || 0}</span>
                </button>
                <Link
                  href="/stories"
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  ← Geri
                </Link>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>İlerleme</span>
                <span>{story.segments?.length || 0}/{story.maxSegments || 3} bölüm</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((story.segments?.length || 0) / (story.maxSegments || 3)) * 100}%` }}
                ></div>
              </div>
            </div>

            {story.isComplete && (
              <div className="bg-green-100 border border-green-300 rounded-lg p-4 text-green-700">
                🎉 Bu hikaye tamamlanmıştır!
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-300 rounded-xl p-4 text-red-700 mb-6">
              {error}
            </div>
          )}

          {/* Story Segments */}
          <div className="space-y-6 mb-8">
            {story.segments?.map((segment, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{segment.authorName}</h3>
                      <p className="text-sm text-gray-600">
                        {segment.createdAt?.toDate?.()?.toLocaleDateString('tr-TR') || 'Yakın zamanda'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="prose max-w-none">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{segment.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Add New Segment */}
          {!story.isComplete && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Hikayeye Devam Et</h2>
              <form onSubmit={handleAddSegment}>
                <textarea
                  value={newSegment}
                  onChange={(e) => setNewSegment(e.target.value)}
                  placeholder="Hikayenin devamını yazın... (En az 50 karakter)"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent min-h-[120px] resize-none mb-4"
                  maxLength={500}
                />
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-gray-500">
                    {newSegment.length}/500 karakter
                  </p>
                  {newSegment.length < 50 && newSegment.length > 0 && (
                    <p className="text-sm text-orange-600">
                      En az {50 - newSegment.length} karakter daha gerekli
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={submitting || !newSegment.trim() || newSegment.length < 50}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Ekleniyor...
                    </div>
                  ) : (
                    "Segment Ekle"
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <Link
              href="/stories"
              className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors duration-200"
            >
              Tüm Hikayeler
            </Link>
            <Link
              href="/write"
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-200"
            >
              Yeni Hikaye
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
