'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Link from 'next/link';
import api from '../../lib/api';

export default function ProfilePage() {
  const { user, signOut } = useAuth();
  const [userStories, setUserStories] = useState([]);
  const [userStats, setUserStats] = useState({
    totalStories: 0,
    totalLikes: 0,
    totalCharacters: 0,
    averageRating: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('stories');

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Kullanıcının hikayelerini getir
        const storiesResponse = await api.get(`/stories/user/${user.id || user.nickname}`);
        setUserStories(storiesResponse.data || []);
        
        // Kullanıcı istatistiklerini hesapla
        const stats = {
          totalStories: storiesResponse.data?.length || 0,
          totalLikes: storiesResponse.data?.reduce((sum, story) => sum + (story.likes || 0), 0) || 0,
          totalCharacters: storiesResponse.data?.reduce((sum, story) => sum + (story.content?.length || 0), 0) || 0,
          averageRating: storiesResponse.data?.length > 0 ? 
            (storiesResponse.data?.reduce((sum, story) => sum + (story.rating || 0), 0) / storiesResponse.data?.length).toFixed(1) : 0
        };
        
        setUserStats(stats);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Kullanıcı bilgileri yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const handleLogout = () => {
    signOut();
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Giriş Yapmanız Gerekiyor</h2>
          <p className="text-gray-600 mb-6">Profilinizi görüntülemek için giriş yapın.</p>
          <Link 
            href="/nickname" 
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Giriş Yap
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-2xl text-gray-900">Profil yükleniyor...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Hata</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            👤 Profilim
          </h1>
          <p className="text-xl text-gray-600">
            Hikaye yazma maceranızın özeti
          </p>
        </div>

        {/* User Info Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {user.nickname?.charAt(0).toUpperCase() || 'U'}
            </div>
            
            {/* User Details */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {user.nickname || 'Anonim Yazar'}
              </h2>
              <p className="text-gray-600 mb-4">
                StoryChain'e katılım: {new Date(user.createdAt || Date.now()).toLocaleDateString('tr-TR')}
              </p>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{userStats.totalStories}</div>
                  <div className="text-sm text-gray-600">Hikaye</div>
                </div>
                <div className="bg-pink-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-pink-600">{userStats.totalLikes}</div>
                  <div className="text-sm text-gray-600">Beğeni</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{userStats.totalCharacters.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Karakter</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{userStats.averageRating}</div>
                  <div className="text-sm text-gray-600">Ortalama</div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <Link 
                href="/themes" 
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                ✏️ Yeni Hikaye Yaz
              </Link>
              <button 
                onClick={handleLogout}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Çıkış Yap
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Tab Headers */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('stories')}
              className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                activeTab === 'stories'
                  ? 'bg-purple-50 text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              📚 Hikayelerim
            </button>
            <button
              onClick={() => setActiveTab('info')}
              className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                activeTab === 'info'
                  ? 'bg-purple-50 text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              ℹ️ Kişisel Bilgiler
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'stories' && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Tamamladığım Hikayeler</h3>
                
                {userStories.length > 0 ? (
                  <div className="space-y-6">
                    {userStories.map((story, index) => (
                      <div key={story.id || index} className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="text-lg font-semibold text-gray-900">
                                {story.title || `Hikaye ${index + 1}`}
                              </h4>
                              <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                                {story.theme || 'Genel'}
                              </span>
                            </div>
                            <p className="text-gray-600 mb-3 line-clamp-3">
                              {story.content || story.segments?.map(s => s.content).join(' ') || 'Hikaye içeriği...'}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>📅 {new Date(story.createdAt || Date.now()).toLocaleDateString('tr-TR')}</span>
                              <span>❤️ {story.likes || 0} beğeni</span>
                              <span>⭐ {story.rating || 0} puan</span>
                              <span>📝 {story.content?.length || 0} karakter</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Link 
                              href={`/stories/${story.id || index}`}
                              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm"
                            >
                              Görüntüle
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📝</div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      Henüz Hikaye Yazmadınız
                    </h4>
                    <p className="text-gray-600 mb-6">
                      İlk hikayenizi yazarak profil sayfanızı doldurun!
                    </p>
                    <Link 
                      href="/themes" 
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
                    >
                      ✏️ İlk Hikayenizi Yazın
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'info' && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Kişisel Bilgiler</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rumuz
                      </label>
                      <div className="bg-gray-50 rounded-lg px-4 py-3 text-gray-900">
                        {user.nickname || 'Belirtilmemiş'}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Katılım Tarihi
                      </label>
                      <div className="bg-gray-50 rounded-lg px-4 py-3 text-gray-900">
                        {new Date(user.createdAt || Date.now()).toLocaleDateString('tr-TR')}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rol
                      </label>
                      <div className="bg-gray-50 rounded-lg px-4 py-3 text-gray-900">
                        {user.role === 'admin' ? '👑 Admin' : '✍️ Yazar'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Toplam Hikaye
                      </label>
                      <div className="bg-purple-50 rounded-lg px-4 py-3 text-purple-900 font-semibold">
                        {userStats.totalStories} hikaye
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Toplam Beğeni
                      </label>
                      <div className="bg-pink-50 rounded-lg px-4 py-3 text-pink-900 font-semibold">
                        {userStats.totalLikes} beğeni
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Toplam Karakter
                      </label>
                      <div className="bg-blue-50 rounded-lg px-4 py-3 text-blue-900 font-semibold">
                        {userStats.totalCharacters.toLocaleString()} karakter
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Achievements Section */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Başarılar</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className={`text-center p-4 rounded-lg ${userStats.totalStories >= 1 ? 'bg-yellow-50 text-yellow-800' : 'bg-gray-50 text-gray-400'}`}>
                      <div className="text-2xl mb-2">🎯</div>
                      <div className="font-semibold">İlk Hikaye</div>
                      <div className="text-sm">1 hikaye yaz</div>
                    </div>
                    <div className={`text-center p-4 rounded-lg ${userStats.totalStories >= 5 ? 'bg-green-50 text-green-800' : 'bg-gray-50 text-gray-400'}`}>
                      <div className="text-2xl mb-2">📚</div>
                      <div className="font-semibold">Hikayeci</div>
                      <div className="text-sm">5 hikaye yaz</div>
                    </div>
                    <div className={`text-center p-4 rounded-lg ${userStats.totalLikes >= 10 ? 'bg-pink-50 text-pink-800' : 'bg-gray-50 text-gray-400'}`}>
                      <div className="text-2xl mb-2">❤️</div>
                      <div className="font-semibold">Popüler</div>
                      <div className="text-sm">10 beğeni al</div>
                    </div>
                    <div className={`text-center p-4 rounded-lg ${userStats.totalCharacters >= 10000 ? 'bg-purple-50 text-purple-800' : 'bg-gray-50 text-gray-400'}`}>
                      <div className="text-2xl mb-2">✍️</div>
                      <div className="font-semibold">Yazar</div>
                      <div className="text-sm">10K karakter yaz</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
