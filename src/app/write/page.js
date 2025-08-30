"use client";

import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Themes from "../../components/Themes";
import { createStory } from "../../lib/firebase-stories";

export default function WritePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [authorName, setAuthorName] = useState(user?.nickname || user?.displayName || "");
  const [storyTitle, setStoryTitle] = useState("");
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [initialContent, setInitialContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Karakter sayacı
  const titleCharCount = storyTitle.length;
  const maxTitleChars = 100;
  const contentCharCount = initialContent.length;
  const maxContentChars = 500;

  const handleStartNewStory = async () => {
    if (!user) {
      setError("Hikaye yazmak için giriş yapmanız gerekiyor.");
      return;
    }

    if (!authorName.trim() || !storyTitle.trim() || !selectedTheme || !initialContent.trim()) {
      setError("Lütfen tüm alanları doldurun.");
      return;
    }

    if (initialContent.length < 50) {
      setError("İlk segment en az 50 karakter olmalıdır.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const storyData = {
        title: storyTitle.trim(),
        theme: selectedTheme,
        authorId: user.uid,
        authorName: authorName.trim(),
        initialContent: initialContent.trim()
      };

      const result = await createStory(storyData);
      
      if (result.success) {
        // Başarılı hikaye oluşturma sonrası hikaye detay sayfasına yönlendir
        router.push(`/stories/${result.storyId}`);
      } else {
        setError(result.error || "Hikaye oluşturulurken bir hata oluştu.");
      }
    } catch (error) {
      console.error('Create story error:', error);
      setError("Hikaye oluşturulurken beklenmeyen bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleContinueStory = () => {
    // Devam eden hikayeler sayfasına yönlendir
    router.push("/stories");
  };

  // Kullanıcı giriş yapmamışsa giriş sayfasına yönlendir
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-4 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">🔐</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Giriş Gerekli</h2>
          <p className="text-gray-600 mb-6">
            Hikaye yazmak için önce giriş yapmanız gerekiyor.
          </p>
          <div className="space-y-3">
            <Link
              href="/nickname"
              className="block w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-200"
            >
              Giriş Yap
            </Link>
            <Link
              href="/kaydol"
              className="block w-full bg-white text-gray-700 px-6 py-3 rounded-xl font-semibold border border-gray-300 hover:bg-gray-50 transition-all duration-200"
            >
              Kayıt Ol
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Başlık */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            İşbirlikçi Hikaye Yazma
          </h1>
          <p className="text-xl text-gray-600">
            Diğer yazarlarla birlikte büyüleyici hikayeler yarat
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Hata Mesajı */}
          {error && (
            <div className="bg-red-100 border border-red-300 rounded-xl p-4 text-red-700">
              {error}
            </div>
          )}

          {/* Yazar Adı Kartı */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
                <span className="text-white text-sm">👤</span>
              </div>
              <h2 className="text-xl font-bold text-gray-800">Yazar Adın</h2>
            </div>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Hikayelerinde görünmesini istediğin ad..."
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-2">
              Bu isim hikayelerinde yazar olarak görünecek. İstediğin zaman değiştirebilirsin.
            </p>
          </div>

          {/* Hikaye Başlığı Kartı */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Hikaye Başlığı</h2>
            <input
              type="text"
              value={storyTitle}
              onChange={(e) => setStoryTitle(e.target.value)}
              placeholder="Hikayene büyüleyici bir başlık ver..."
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              maxLength={maxTitleChars}
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm text-gray-500">
                {titleCharCount}/{maxTitleChars} karakter
              </p>
            </div>
          </div>

          {/* Tema Seç Kartı */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Tema Seç</h2>
            <div className="mb-4">
              <Themes 
                isSelectionMode={true}
                selectedTheme={selectedTheme}
                onThemeSelect={setSelectedTheme}
              />
            </div>
          </div>

          {/* İlk Segment Kartı */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Hikayenin İlk Bölümü</h2>
            <textarea
              value={initialContent}
              onChange={(e) => setInitialContent(e.target.value)}
              placeholder="Hikayenin başlangıcını yaz... (En az 50 karakter)"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent min-h-[120px] resize-none"
              maxLength={maxContentChars}
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm text-gray-500">
                {contentCharCount}/{maxContentChars} karakter
              </p>
              {contentCharCount < 50 && contentCharCount > 0 && (
                <p className="text-sm text-orange-600">
                  En az {50 - contentCharCount} karakter daha gerekli
                </p>
              )}
            </div>
          </div>

          {/* Aksiyon Butonları */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleStartNewStory}
              disabled={loading || !authorName.trim() || !storyTitle.trim() || !selectedTheme || !initialContent.trim() || initialContent.length < 50}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Hikaye Oluşturuluyor...
                </div>
              ) : (
                "Yeni Hikaye Başlat"
              )}
            </button>
            <button
              onClick={handleContinueStory}
              className="bg-white text-gray-700 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border border-gray-200"
            >
              Hikayeye Devam Et
            </button>
          </div>

          {/* Ana Sayfaya Dön Butonu */}
          <div className="text-center">
            <Link
              href="/"
              className="inline-block bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors duration-200"
            >
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
