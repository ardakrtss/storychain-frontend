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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Giriş Yapmanız Gerekiyor</h2>
          <p className="text-gray-300 mb-6">Profilinizi görüntülemek için giriş yapın.</p>
          <Link 
            href="/nickname" 
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Giriş Yap
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-2xl text-white">Profil yükleniyor...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Hata</h2>
          <p className="text-gray-300 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            👤 Profilim
          </h1>
          <p className="text-xl text-gray-300">
            Hikaye yazma maceranızın özeti
          </p>
        </div>

        {/* User Info Card - Vuexy Style */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            {/* Avatar - Modern Design */}
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-2xl">
                {user.nickname?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-gray-900"></div>
            </div>
            
            {/* User Details */}
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-3xl font-bold text-white mb-2">
                {user.nickname || 'Anonim Yazar'}
              </h2>
              <p className="text-gray-400 mb-6">
                StoryChain'e katılım: {new Date(user.createdAt || Date.now()).toLocaleDateString('tr-TR')}
              </p>
              
              {/* Stats Grid - Vuexy Style */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300">
                  <div className="text-3xl font-bold text-purple-400 mb-2">{userStats.totalStories}</div>
                  <div className="text-sm text-gray-300">Hikaye</div>
                </div>
                <div className="bg-gradient-to-br from-pink-600/20 to-pink-800/20 backdrop-blur-sm rounded-xl p-6 border border-pink-500/30 hover:border-pink-400/50 transition-all duration-300">
                  <div className="text-3xl font-bold text-pink-400 mb-2">{userStats.totalLikes}</div>
                  <div className="text-sm text-gray-300">Beğeni</div>
                </div>
                <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300">
                  <div className="text-3xl font-bold text-blue-400 mb-2">{userStats.totalCharacters.toLocaleString()}</div>
                  <div className="text-sm text-gray-300">Karakter</div>
                </div>
                <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 backdrop-blur-sm rounded-xl p-6 border border-green-500/30 hover:border-green-400/50 transition-all duration-300">
                  <div className="text-3xl font-bold text-green-400 mb-2">{userStats.averageRating}</div>
                  <div className="text-sm text-gray-300">Ortalama</div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col gap-4">
              <Link 
                href="/themes" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span className="text-xl">✏️</span>
                <span>Yeni Hikaye Yaz</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 border border-white/20 hover:border-white/40"
              >
                Çıkış Yap
              </button>
            </div>
          </div>
        </div>

        {/* Tabs - Modern Design */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Tab Headers */}
          <div className="flex border-b border-white/20">
            <button
              onClick={() => setActiveTab('stories')}
              className={`flex-1 px-8 py-6 text-center font-semibold transition-all duration-300 ${
                activeTab === 'stories'
                  ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-white border-b-2 border-purple-400'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-xl mr-2">📚</span>
              Hikayelerim
            </button>
            <button
              onClick={() => setActiveTab('info')}
              className={`flex-1 px-8 py-6 text-center font-semibold transition-all duration-300 ${
                activeTab === 'info'
                  ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-white border-b-2 border-purple-400'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-xl mr-2">ℹ️</span>
              Kişisel Bilgiler
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'stories' && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-8">Tamamladığım Hikayeler</h3>
                
                {userStories.length > 0 ? (
                  <div className="space-y-6">
                    {userStories.map((story, index) => (
                      <div key={story.id || index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-3">
                              <h4 className="text-xl font-semibold text-white">
                                {story.title || `Hikaye ${index + 1}`}
                              </h4>
                              <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs px-3 py-1 rounded-full">
                                {story.theme || 'Genel'}
                              </span>
                            </div>
                            <p className="text-gray-300 mb-4 line-clamp-3">
                              {story.content || story.segments?.map(s => s.content).join(' ') || 'Hikaye içeriği...'}
                            </p>
                            <div className="flex items-center gap-6 text-sm text-gray-400">
                              <span className="flex items-center gap-1">
                                <span>📅</span>
                                {new Date(story.createdAt || Date.now()).toLocaleDateString('tr-TR')}
                              </span>
                              <span className="flex items-center gap-1">
                                <span>❤️</span>
                                {story.likes || 0} beğeni
                              </span>
                              <span className="flex items-center gap-1">
                                <span>⭐</span>
                                {story.rating || 0} puan
                              </span>
                              <span className="flex items-center gap-1">
                                <span>📝</span>
                                {story.content?.length || 0} karakter
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <Link 
                              href={`/stories/${story.id || index}`}
                              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 text-sm shadow-lg hover:shadow-xl"
                            >
                              Görüntüle
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="text-8xl mb-6">📝</div>
                    <h4 className="text-2xl font-semibold text-white mb-4">
                      Henüz Hikaye Yazmadınız
                    </h4>
                    <p className="text-gray-300 mb-8 text-lg">
                      İlk hikayenizi yazarak profil sayfanızı doldurun!
                    </p>
                    <Link 
                      href="/themes" 
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 inline-flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <span className="text-xl">✏️</span>
                      <span>İlk Hikayenizi Yazın</span>
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'info' && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-8">Kişisel Bilgiler</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Rumuz
                      </label>
                      <div className="bg-white/5 backdrop-blur-sm rounded-xl px-6 py-4 text-white border border-white/10">
                        {user.nickname || 'Belirtilmemiş'}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Katılım Tarihi
                      </label>
                      <div className="bg-white/5 backdrop-blur-sm rounded-xl px-6 py-4 text-white border border-white/10">
                        {new Date(user.createdAt || Date.now()).toLocaleDateString('tr-TR')}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Rol
                      </label>
                      <div className="bg-white/5 backdrop-blur-sm rounded-xl px-6 py-4 text-white border border-white/10">
                        {user.role === 'admin' ? '👑 Admin' : '✍️ Yazar'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Toplam Hikaye
                      </label>
                      <div className="bg-gradient-to-r from-purple-600/20 to-purple-800/20 backdrop-blur-sm rounded-xl px-6 py-4 text-purple-400 font-semibold border border-purple-500/30">
                        {userStats.totalStories} hikaye
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Toplam Beğeni
                      </label>
                      <div className="bg-gradient-to-r from-pink-600/20 to-pink-800/20 backdrop-blur-sm rounded-xl px-6 py-4 text-pink-400 font-semibold border border-pink-500/30">
                        {userStats.totalLikes} beğeni
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Toplam Karakter
                      </label>
                      <div className="bg-gradient-to-r from-blue-600/20 to-blue-800/20 backdrop-blur-sm rounded-xl px-6 py-4 text-blue-400 font-semibold border border-blue-500/30">
                        {userStats.totalCharacters.toLocaleString()} karakter
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Achievements Section - Modern Design */}
                <div className="mt-12 pt-8 border-t border-white/20">
                  <h4 className="text-xl font-bold text-white mb-6">Başarılar</h4>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className={`text-center p-6 rounded-xl transition-all duration-300 ${userStats.totalStories >= 1 ? 'bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 border border-yellow-500/30 text-yellow-400' : 'bg-white/5 border border-white/10 text-gray-500'}`}>
                      <div className="text-4xl mb-3">🎯</div>
                      <div className="font-semibold mb-2">İlk Hikaye</div>
                      <div className="text-sm">1 hikaye yaz</div>
                    </div>
                    <div className={`text-center p-6 rounded-xl transition-all duration-300 ${userStats.totalStories >= 5 ? 'bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-500/30 text-green-400' : 'bg-white/5 border border-white/10 text-gray-500'}`}>
                      <div className="text-4xl mb-3">📚</div>
                      <div className="font-semibold mb-2">Hikayeci</div>
                      <div className="text-sm">5 hikaye yaz</div>
                    </div>
                    <div className={`text-center p-6 rounded-xl transition-all duration-300 ${userStats.totalLikes >= 10 ? 'bg-gradient-to-br from-pink-600/20 to-pink-800/20 border border-pink-500/30 text-pink-400' : 'bg-white/5 border border-white/10 text-gray-500'}`}>
                      <div className="text-4xl mb-3">❤️</div>
                      <div className="font-semibold mb-2">Popüler</div>
                      <div className="text-sm">10 beğeni al</div>
                    </div>
                    <div className={`text-center p-6 rounded-xl transition-all duration-300 ${userStats.totalCharacters >= 10000 ? 'bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-500/30 text-purple-400' : 'bg-white/5 border border-white/10 text-gray-500'}`}>
                      <div className="text-4xl mb-3">✍️</div>
                      <div className="font-semibold mb-2">Yazar</div>
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
