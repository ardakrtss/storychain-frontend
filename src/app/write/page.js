"use client";

import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Themes from "../../components/Themes";

export default function WritePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [authorName, setAuthorName] = useState(user?.nickname || "");
  const [storyTitle, setStoryTitle] = useState("");
  const [selectedTheme, setSelectedTheme] = useState(null);

  // Karakter sayacı
  const titleCharCount = storyTitle.length;
  const maxTitleChars = 100;

  const handleStartNewStory = () => {
    if (!authorName.trim() || !storyTitle.trim() || !selectedTheme) {
      alert("Lütfen tüm alanları doldurun ve bir tema seçin.");
      return;
    }
    
    // Hikaye oluşturma sayfasına yönlendir
    router.push(`/write/new?author=${encodeURIComponent(authorName)}&title=${encodeURIComponent(storyTitle)}&theme=${selectedTheme}`);
  };

  const handleContinueStory = () => {
    // Devam eden hikayeler sayfasına yönlendir
    router.push("/stories");
  };

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

          {/* Aksiyon Butonları */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleStartNewStory}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Yeni Hikaye Başlat
            </button>
            <button
              onClick={handleContinueStory}
              className="bg-white text-gray-700 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border border-gray-200"
            >
              Hikayeye Devam Et
            </button>
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
