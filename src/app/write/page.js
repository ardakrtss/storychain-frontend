'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import Link from 'next/link';
import api from '../../lib/api';

function WritePageContent() {
  const [theme, setTheme] = useState(null);
  const [story, setStory] = useState(null);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState('new');
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const themeId = searchParams.get('theme');
  const storyId = searchParams.get('storyId');
  const writeMode = searchParams.get('mode');

  useEffect(() => {
    const initializePage = async () => {
      if (!user) {
        router.push('/nickname');
        return;
      }

      try {
        if (writeMode === 'continue' && storyId) {
          // Mevcut hikayeye devam etme modu
          setMode('continue');
          const response = await api.get(`/stories/random?authorId=${user.id}`);
          const { story } = response.data;
          setStory(story);
          
          // Tema bilgisini de al
          const themeResponse = await api.get(`/themes/${story.theme}`);
          setTheme(themeResponse.data);
        } else if (writeMode === 'new' && themeId) {
          // Yeni hikaye modu
          setMode('new');
          const response = await api.get(`/themes/${themeId}`);
          setTheme(response.data);
        } else {
          // Geçersiz parametreler
          router.push('/themes');
          return;
        }
      } catch (error) {
        console.error('Error initializing page:', error);
        setError('Sayfa yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    initializePage();
  }, [themeId, storyId, writeMode, user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setError('Lütfen hikaye içeriği yazın');
      return;
    }

    if (content.length > 1000) {
      setError('Hikaye en fazla 1000 karakter olabilir');
      return;
    }

    if (mode === 'new' && !title.trim()) {
      setError('Lütfen hikaye başlığı girin');
      return;
    }

    if (mode === 'new' && title.trim().length < 3) {
      setError('Hikaye başlığı en az 3 karakter olmalıdır');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      if (mode === 'new') {
        // Yeni hikaye oluştur
        await api.post('/stories', {
          title: title.trim(),
          theme: theme?.id,
          content: content.trim(),
          authorId: user?.id,
          authorNickname: user?.nickname
        });
        alert('Yeni hikaye başarıyla oluşturuldu! Diğer yazarların katkılarını bekleyin.');
      } else {
        // Mevcut hikayeye devam et
        await api.post(`/stories/${story?.id}/continue`, {
          content: content.trim(),
          authorId: user?.id,
          authorNickname: user?.nickname
        });
        alert('Hikaye başarıyla devam ettirildi!');
      }
      
      router.push('/stories');
    } catch (error) {
      console.error('Error submitting story:', error);
      const errorMessage = error instanceof Error ? error.message : 'Hikaye gönderilirken bir hata oluştu';
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Giriş Yapmanız Gerekiyor</h2>
          <Link href="/nickname" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold">
            Rumuz Gir
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-2xl text-gray-900">Sayfa yükleniyor...</div>
      </div>
    );
  }

  if (error || (!theme && !story)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Hata</h2>
          <p className="text-gray-600 mb-4">{error || 'Gerekli bilgiler bulunamadı'}</p>
          <Link href="/themes" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold">
            Temalara Dön
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {mode === 'new' ? 'Yeni Hikaye Yazma' : 'Hikayeye Devam Etme'}
          </h1>
          <p className="text-lg text-gray-600">
            Merhaba <span className="font-semibold text-purple-600">{user.nickname}</span>! 
            {mode === 'new' ? (
              <span className="font-semibold" style={{ color: theme?.color }}> {theme?.name}</span>
            ) : (
              <span> Sen bu hikayede <span className="font-bold text-purple-600">{story?.currentAuthorNumber}. yazar</span>sın!</span>
            )}
          </p>
        </div>

        {/* Story Info */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          {mode === 'new' && theme ? (
            <div className="flex items-center mb-4">
              <div 
                className="w-16 h-16 rounded-lg flex items-center justify-center text-4xl mr-4"
                style={{ backgroundColor: theme.color + '20' }}
              >
                {theme.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{theme.name}</h2>
                <p className="text-gray-600">{theme.description}</p>
              </div>
            </div>
          ) : mode === 'continue' && story ? (
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{story.title}</h2>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span>👤 {story.currentAuthorNumber}. yazar (5 yazardan)</span>
                <span>📖 {story.lastSegment.author} yazdı</span>
              </div>
            </div>
          ) : null}
          
          {theme && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Karakterler:</h3>
                <p className="text-sm text-gray-600">{theme.characters}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Hikaye İpuçları:</h3>
                <p className="text-sm text-gray-600">{theme.plotHints}</p>
              </div>
            </div>
          )}
        </div>

        {/* Previous Content (for continue mode) */}
        {mode === 'continue' && story && (
          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              📖 Bir Önceki Yazarın Yazdığı:
            </h3>
            <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
              <p className="text-gray-700 leading-relaxed">{story.lastSegment.content}</p>
              <div className="mt-3 text-sm text-gray-500">
                — {story.lastSegment.author} tarafından yazıldı
              </div>
            </div>
          </div>
        )}

        {/* Writing Form */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <form onSubmit={handleSubmit}>
            {/* Title Input (only for new stories) */}
            {mode === 'new' && (
              <div className="mb-6">
                <label htmlFor="title" className="block text-lg font-semibold text-gray-900 mb-3">
                  Hikaye Başlığı
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  placeholder="Hikayenin başlığını yaz..."
                  maxLength={100}
                  disabled={submitting}
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-500">
                    En az 3 karakter olmalıdır
                  </span>
                  <span className={`text-sm ${title.length > 80 ? 'text-red-500' : 'text-gray-500'}`}>
                    {title.length}/100
                  </span>
                </div>
              </div>
            )}

            {/* Content Textarea */}
            <div className="mb-6">
              <label htmlFor="content" className="block text-lg font-semibold text-gray-900 mb-3">
                {mode === 'new' ? 'Hikayeni Yaz' : 'Hikayeye Devam Et'} ({content.length}/1000 karakter)
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-500"
                placeholder={mode === 'new' 
                  ? "Hikayenin başlangıcını yaz... Karakterleri tanıt, atmosferi yarat, heyecan başlat!"
                  : "Hikayenin devamını yaz... Bir önceki yazarın yazdığına uygun şekilde devam et!"
                }
                maxLength={1000}
                disabled={submitting}
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-500">
                  En az 100 karakter yazman önerilir
                </span>
                <span className={`text-sm ${content.length > 900 ? 'text-red-500' : 'text-gray-500'}`}>
                  {content.length}/1000
                </span>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={submitting || content.length < 50 || (mode === 'new' && (!title.trim() || title.trim().length < 3))}
                className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    Gönderiliyor...
                  </>
                ) : (
                  <>
                    <span>📝</span>
                    {mode === 'new' ? 'Hikayeyi Başlat' : 'Hikayeye Devam Et'}
                  </>
                )}
              </button>
              
              <Link
                href="/themes"
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors text-center"
              >
                Geri Dön
              </Link>
            </div>
          </form>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">💡 Yazma İpuçları:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            {mode === 'new' ? (
              <>
                <li>• Güçlü bir başlangıç yap ve karakterleri tanıt</li>
                <li>• Atmosferi yarat ve okuyucuyu içine çek</li>
                <li>• Sonraki yazarlar için ilginç bir son bırak</li>
              </>
            ) : (
              <>
                <li>• Bir önceki yazarın yazdığına uygun şekilde devam et</li>
                <li>• Karakterleri ve olayları geliştir</li>
                <li>• Hikayeyi ilginç bir yöne götür</li>
              </>
            )}
            <li>• Tema renklerini ve atmosferini koru</li>
            <li>• 1000 karakter sınırını aşma!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function WritePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-2xl text-gray-900">Sayfa yükleniyor...</div>
      </div>
    }>
      <WritePageContent />
    </Suspense>
  );
}
