'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Link from 'next/link';

interface Story {
  id: string;
  title: string;
  theme: string;
  content: string;
  author: string;
  likeCount: number;
  createdAt: string;
}

export default function StoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // Mock data for now
    const mockStories: Story[] = [
      {
        id: '1',
        title: 'Büyülü Ormanın Sırrı',
        theme: 'Fantastik',
        content: 'Bir zamanlar, hiç kimsenin gitmeye cesaret edemediği büyülü bir orman vardı. Bu ormanda yaşayan küçük peri Luna, her gün aynı şeyi yapardı...',
        author: 'Hikayeci_Ali',
        likeCount: 15,
        createdAt: '2024-01-15'
      },
      {
        id: '2',
        title: 'Uzaylı Arkadaşım',
        theme: 'Bilim Kurgu',
        content: 'Gece yarısı odamın penceresinden mavi bir ışık geldi. Korkuyla yatağımdan kalktım ve pencereden baktığımda...',
        author: 'Yıldız_Yazar',
        likeCount: 23,
        createdAt: '2024-01-14'
      },
      {
        id: '3',
        title: 'Geri Dönüşüm Kahramanları',
        theme: 'Sıfır Atık',
        content: 'Mahallemizdeki çocuklar bir gün toplandı ve çevre kirliliğine karşı savaşmaya karar verdiler. İlk işleri...',
        author: 'Çevreci_Mert',
        likeCount: 8,
        createdAt: '2024-01-13'
      }
    ];

    setStories(mockStories);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-2xl text-gray-900">Hikayeler yükleniyor...</div>
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
          {stories.map((story) => (
            <div key={story.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
              {/* Story Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900 line-clamp-2">
                    {story.title}
                  </h3>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {story.theme}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>👤 {story.author}</span>
                  <span>📅 {new Date(story.createdAt).toLocaleDateString('tr-TR')}</span>
                </div>
              </div>

              {/* Story Content */}
              <div className="p-6">
                <p className="text-gray-600 mb-4 line-clamp-4 leading-relaxed">
                  {story.content}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-500">
                    <span className="text-lg">❤️</span>
                    <span className="font-semibold">{story.likeCount}</span>
                  </div>
                  
                  <button className="text-purple-600 hover:text-purple-700 font-semibold text-sm">
                    Devamını Oku →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {stories.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Henüz Hikaye Yok</h3>
            <p className="text-gray-600 mb-6">
              İlk hikayeyi sen yazarak başlatabilirsin!
            </p>
            {user ? (
              <Link 
                href="/themes" 
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                İlk Hikayeyi Yaz
              </Link>
            ) : (
              <Link 
                href="/nickname" 
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Rumuz Gir ve Başla
              </Link>
            )}
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Nasıl Çalışır?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="text-center">
              <div className="text-3xl mb-2">1️⃣</div>
              <p className="font-semibold">Tema Seç</p>
              <p>6 farklı temadan birini seç</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">2️⃣</div>
              <p className="font-semibold">1000 Karakter Yaz</p>
              <p>Hikayenin devamını yaz</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">3️⃣</div>
              <p className="font-semibold">5 Yazar Tamamlar</p>
              <p>Birlikte harika hikayeler yarat</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
