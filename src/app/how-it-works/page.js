'use client';

import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';

export default function HowItWorksPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            StoryChain Nasıl Çalışır?
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Birlikte harika hikayeler yaratmanın eğlenceli yolunu keşfet!
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Step 1 */}
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-2xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Tema Seç</h3>
            <p className="text-gray-600 mb-6">
              6 farklı temadan birini seç: Fantastik, Bilim Kurgu, Gizem, İklim Değişikliği, Macera veya Sıfır Atık
            </p>
            <div className="text-4xl">🎨</div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-2xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Hikaye Yaz</h3>
            <p className="text-gray-600 mb-6">
              Hikayenin devamını yaz (en az 50, en fazla 1000 karakter). Yaratıcılığını kullan!
            </p>
            <div className="text-4xl">✏️</div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-2xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">5 Yazar Tamamlar</h3>
            <p className="text-gray-600 mb-6">
              5 farklı yazar sırayla hikayeye katkıda bulunur. Birlikte harika hikayeler yaratırız!
            </p>
            <div className="text-4xl">🤝</div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Özellikler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="text-2xl mr-4">🎯</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Kolay Kullanım</h3>
                <p className="text-gray-600">Sadece rumuz gir ve hemen yazmaya başla!</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="text-2xl mr-4">🚀</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Hızlı Yazma</h3>
                <p className="text-gray-600">Kısa sürede hikayeler oluştur ve paylaş!</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="text-2xl mr-4">💡</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Yaratıcılık</h3>
                <p className="text-gray-600">Farklı temalarla yaratıcılığını geliştir!</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="text-2xl mr-4">🏆</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Lider Tablosu</h3>
                <p className="text-gray-600">En çok beğenilen hikayeleri keşfet!</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Hemen Başla!
          </h2>
          <p className="text-gray-600 mb-8">
            İlk hikayeni yazarak maceraya katıl!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Link 
                href="/themes" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
              >
                ✏️ Hikaye Yazmaya Başla
              </Link>
            ) : (
              <Link 
                href="/nickname" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
              >
                🚀 Rumuz Gir ve Başla
              </Link>
            )}
            <Link 
              href="/stories" 
              className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              📚 Hikayeleri Keşfet
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
