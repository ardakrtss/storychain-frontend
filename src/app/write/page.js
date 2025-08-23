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

    if (content.trim().length < 50) {
      setError('Hikaye içeriği en az 50 karakter olmalıdır');
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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-12 hover:bg-white/10 transition-all duration-300">
            <h2 className="text-3xl font-bold text-white mb-6">Giriş Yapmanız Gerekiyor</h2>
            <Link href="/nickname" className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-2xl font-bold text-xl transition-all duration-500 shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 flex items-center gap-3 mx-auto w-fit">
              <span className="text-2xl">🔑</span>
              <span>Giriş Yap</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-12 hover:bg-white/10 transition-all duration-300">
          <div className="text-3xl text-white flex items-center gap-4">
            <span className="animate-spin text-4xl">⏳</span>
            <span>Sayfa yükleniyor...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || (!theme && !story)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-500/20 backdrop-blur-sm rounded-3xl border border-red-500/30 p-12 hover:bg-red-500/30 transition-all duration-300">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-4xl">⚠️</span>
              <span>Hata</span>
            </h2>
            <p className="text-gray-300 text-lg mb-8">{error || 'Gerekli bilgiler bulunamadı'}</p>
            <Link href="/themes" className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-2xl font-bold text-xl transition-all duration-500 shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 flex items-center gap-3 mx-auto w-fit">
              <span className="text-2xl">🏠</span>
              <span>Temalara Dön</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-purple-600/10 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-bounce"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-purple-400 rounded-full animate-ping opacity-75"></div>
      <div className="absolute top-40 right-20 w-3 h-3 bg-pink-400 rounded-full animate-bounce opacity-75"></div>
      <div className="absolute bottom-40 left-20 w-5 h-5 bg-blue-400 rounded-full animate-pulse opacity-75"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-full border border-purple-500/30 mb-8">
            <span className="text-purple-300 text-sm font-semibold">
              {mode === 'new' ? '✏️ Yeni Hikaye Yazma' : '📝 Hikayeye Devam Etme'}
            </span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-black text-white mb-6 leading-none">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              {mode === 'new' ? 'Yeni Hikaye' : 'Hikayeye Devam Et'}
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Merhaba <span className="font-bold text-purple-400">{user.nickname}</span>! 
            {mode === 'new' ? (
              <span className="font-semibold" style={{ color: theme?.color }}> {theme?.name}</span>
            ) : (
              <span> Sen bu hikayede <span className="font-bold text-purple-400">{story?.currentAuthorNumber}. yazar</span>sın!</span>
            )}
          </p>
        </div>

        {/* Story Info */}
        <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-8 mb-8 hover:bg-white/10 transition-all duration-300 hover:border-white/20">
          {mode === 'new' && theme ? (
            <div className="flex items-center mb-6">
              <div 
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-5xl mr-6 shadow-lg"
                style={{ backgroundColor: theme.color + '20', border: `2px solid ${theme.color}40` }}
              >
                {theme.icon}
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">{theme.name}</h2>
                <p className="text-gray-300 text-lg">{theme.description}</p>
              </div>
            </div>
          ) : mode === 'continue' && story ? (
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-white mb-3">{story.title}</h2>
              <div className="flex items-center gap-6 text-lg text-gray-300 mb-4">
                <span className="flex items-center gap-2">
                  <span className="text-2xl">👤</span>
                  <span>{story.currentAuthorNumber}. yazar (5 yazardan)</span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-2xl">📖</span>
                  <span>{story.lastSegment.author} yazdı</span>
                </span>
              </div>
            </div>
          ) : null}
          
          {theme && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="font-bold text-white text-xl mb-3 flex items-center gap-2">
                  <span className="text-2xl">🎭</span>
                  Karakterler
                </h3>
                <p className="text-gray-300 leading-relaxed">{theme.characters}</p>
              </div>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="font-bold text-white text-xl mb-3 flex items-center gap-2">
                  <span className="text-2xl">💡</span>
                  Hikaye İpuçları
                </h3>
                <p className="text-gray-300 leading-relaxed">{theme.plotHints}</p>
              </div>
            </div>
          )}
        </div>

        {/* Previous Content (for continue mode) */}
        {mode === 'continue' && story && (
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-3xl border border-blue-500/30 p-8 mb-8 hover:bg-blue-600/30 transition-all duration-300">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-3xl">📖</span>
              Bir Önceki Yazarın Yazdığı
            </h3>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <p className="text-gray-200 leading-relaxed text-lg">{story.lastSegment.content}</p>
              <div className="mt-4 text-gray-400 text-sm flex items-center gap-2">
                <span className="text-xl">✍️</span>
                <span>{story.lastSegment.author} tarafından yazıldı</span>
              </div>
            </div>
          </div>
        )}

        {/* Writing Form */}
        <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-8 hover:bg-white/10 transition-all duration-300">
          <form onSubmit={handleSubmit}>
            {/* Title Input (only for new stories) */}
            {mode === 'new' && (
              <div className="mb-8">
                <label htmlFor="title" className="block text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-2xl">📝</span>
                  Hikaye Başlığı
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400 text-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                  placeholder="Hikayenin başlığını yaz..."
                  maxLength={100}
                  disabled={submitting}
                />
                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm text-gray-400">
                    En az 3 karakter olmalıdır
                  </span>
                  <span className={`text-sm ${title.length > 80 ? 'text-red-400' : 'text-gray-400'}`}>
                    {title.length}/100
                  </span>
                </div>
              </div>
            )}

            {/* Content Textarea */}
            <div className="mb-8">
              <label htmlFor="content" className="block text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-2xl">✍️</span>
                {mode === 'new' ? 'Hikayeni Yaz' : 'Hikayeye Devam Et'} ({content.length}/1000 karakter)
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-80 px-6 py-4 bg-white/10 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400 text-lg resize-none backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                placeholder={mode === 'new' 
                  ? "Hikayenin başlangıcını yaz... Karakterleri tanıt, atmosferi yarat, heyecan başlat!"
                  : "Hikayenin devamını yaz... Bir önceki yazarın yazdığına uygun şekilde devam et!"
                }
                maxLength={1000}
                disabled={submitting}
              />
              <div className="flex justify-between items-center mt-3">
                <span className="text-sm text-gray-400">
                  En az 100 karakter yazman önerilir
                </span>
                <span className={`text-sm ${content.length > 900 ? 'text-red-400' : 'text-gray-400'}`}>
                  {content.length}/1000
                </span>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-8 bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-2xl p-4">
                <p className="text-red-300 text-lg flex items-center gap-2">
                  <span className="text-xl">⚠️</span>
                  {error}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6">
              <button
                type="submit"
                disabled={submitting || content.length < 50 || (mode === 'new' && (!title.trim() || title.trim().length < 3))}
                className="group flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 text-white py-4 px-8 rounded-2xl font-bold text-xl transition-all duration-500 shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 flex items-center justify-center gap-3 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                {submitting ? (
                  <>
                    <span className="animate-spin text-2xl relative z-10">⏳</span>
                    <span className="relative z-10">Gönderiliyor...</span>
                  </>
                ) : (
                  <>
                    <span className="text-2xl relative z-10">📝</span>
                    <span className="relative z-10">{mode === 'new' ? 'Hikayeyi Başlat' : 'Hikayeye Devam Et'}</span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300 relative z-10">→</span>
                  </>
                )}
              </button>
              
              <Link
                href="/themes"
                className="group flex-1 bg-white/10 hover:bg-white/20 text-white py-4 px-8 rounded-2xl font-bold text-xl transition-all duration-500 border-2 border-white/20 hover:border-white/40 backdrop-blur-sm flex items-center justify-center gap-3 hover:scale-105"
              >
                <span className="text-2xl">←</span>
                <span>Geri Dön</span>
              </Link>
            </div>
          </form>
        </div>

        {/* Tips */}
        <div className="mt-12 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-3xl border border-purple-500/30 p-8 hover:bg-purple-600/30 transition-all duration-300">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-3xl">💡</span>
            Yazma İpuçları
          </h3>
          <ul className="text-lg text-gray-300 space-y-3">
            {mode === 'new' ? (
              <>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 text-xl">✨</span>
                  <span>Güçlü bir başlangıç yap ve karakterleri tanıt</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 text-xl">🌟</span>
                  <span>Atmosferi yarat ve okuyucuyu içine çek</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 text-xl">🎯</span>
                  <span>Sonraki yazarlar için ilginç bir son bırak</span>
                </li>
              </>
            ) : (
              <>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 text-xl">🔄</span>
                  <span>Bir önceki yazarın yazdığına uygun şekilde devam et</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 text-xl">📈</span>
                  <span>Karakterleri ve olayları geliştir</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 text-xl">🎪</span>
                  <span>Hikayeyi ilginç bir yöne götür</span>
                </li>
              </>
            )}
            <li className="flex items-start gap-3">
              <span className="text-purple-400 text-xl">🎨</span>
              <span>Tema renklerini ve atmosferini koru</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-400 text-xl">📏</span>
              <span>1000 karakter sınırını aşma!</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function WritePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-12 hover:bg-white/10 transition-all duration-300">
          <div className="text-3xl text-white flex items-center gap-4">
            <span className="animate-spin text-4xl">⏳</span>
            <span>Sayfa yükleniyor...</span>
          </div>
        </div>
      </div>
    }>
      <WritePageContent />
    </Suspense>
  );
}
