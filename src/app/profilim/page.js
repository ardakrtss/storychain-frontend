'use client';

import { useAuth } from '../../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProfilimPage() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    storyCount: 0,
    supportCount: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/giris');
      return;
    }

    // Kullanıcı istatistiklerini getir
    fetchUserStats();
  }, [user, router]);

  const fetchUserStats = async () => {
    try {
      // Kullanıcının hikayelerini getir
      const storiesResponse = await fetch(`/api/stories?type=author&authorId=${user.id}`);
      const storiesData = await storiesResponse.json();
      
      // Destek verdiği hikayeleri getir (beğeniler)
      const likesResponse = await fetch(`/api/stories?type=liked&userId=${user.id}`);
      const likesData = await likesResponse.json();

      setStats({
        storyCount: storiesData.stories?.length || 0,
        supportCount: likesData.stories?.length || 0
      });
    } catch (error) {
      console.error('İstatistikler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hoş geldin mesajı */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Merhaba {user?.nickname}!
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Hemen hikaye yazmaya başlayabilirsin
          </p>
          <Link
            href="/write"
            className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            ✍️ Hikaye Yazmaya Başla
          </Link>
        </div>

        {/* Profil kartı */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/50">
            {/* Kullanıcı bilgileri */}
            <div className="text-center mb-8">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                {user?.nickname?.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {user?.nickname}
              </h2>
              <p className="text-gray-600">
                Üye olma tarihi: {formatDate(user?.createdAt)}
              </p>
            </div>

            {/* İstatistikler */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl p-6 text-center border border-pink-200">
                <div className="text-3xl font-bold text-pink-600 mb-2">
                  {stats.storyCount}
                </div>
                <div className="text-gray-700 font-medium">
                  Yazdığım Hikaye
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl p-6 text-center border border-purple-200">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {stats.supportCount}
                </div>
                <div className="text-gray-700 font-medium">
                  Destek Verdiğim Hikaye
                </div>
              </div>
            </div>

            {/* Hızlı erişim */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <Link
                href="/stories"
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-2xl text-center font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                📚 Hikayeleri Görüntüle
              </Link>
              
              <Link
                href="/temalar"
                className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-2xl text-center font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                🎨 Temaları Keşfet
              </Link>
            </div>

            {/* Çıkış yap */}
            <div className="text-center">
              <button
                onClick={handleSignOut}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                🚪 Çıkış Yap
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
