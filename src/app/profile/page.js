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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Tüm hikayeleri getir ve kullanıcının hikayelerini filtrele
        let userStories = [];
        try {
          const storiesResponse = await api.get('/stories/available');
          const allStories = storiesResponse.data || [];
          
          // Kullanıcının hikayelerini filtrele
          userStories = allStories.filter(story => {
            // Ana hikaye objesinde author kontrolü
            if (story.author === user.nickname || 
                story.authorId === user.id ||
                story.authorNickname === user.nickname) {
              return true;
            }
            
            // Segments içinde author kontrolü
            if (story.segments && story.segments.length > 0) {
              return story.segments.some(segment => 
                segment.author === user.nickname || 
                segment.authorId === user.id
              );
            }
            
            return false;
          });
          
          setUserStories(userStories);
        } catch (storiesError) {
          console.error('Stories API Error:', storiesError);
          // API hatası durumunda boş array kullan
          setUserStories([]);
        }
        
        // Kullanıcı istatistiklerini hesapla
        const stats = {
          totalStories: userStories.length,
          totalLikes: userStories.reduce((sum, story) => sum + (story.likeCount || story.likes || 0), 0),
          totalCharacters: userStories.reduce((sum, story) => {
            // Hikaye içeriğini hesapla (segments varsa segments'lerden, yoksa content'ten)
            let contentLength = 0;
            if (story.segments && story.segments.length > 0) {
              // Sadece kullanıcının yazdığı segmentleri say
              const userSegments = story.segments.filter(segment => 
                segment.author === user.nickname || 
                segment.authorId === user.id
              );
              contentLength = userSegments.reduce((segSum, segment) => 
                segSum + (segment.content?.length || 0), 0
              );
            } else if (story.content) {
              contentLength = story.content.length;
            }
            return sum + contentLength;
          }, 0),
          averageRating: userStories.length > 0 ? 
            (userStories.reduce((sum, story) => sum + (story.rating || 0), 0) / userStories.length).toFixed(1) : 0
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Giriş Yapmanız Gerekiyor</h2>
          <p className="text-gray-700 mb-6">Profilinizi görüntülemek için giriş yapın.</p>
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 flex items-center justify-center">
        <div className="text-2xl text-gray-900">Profil yükleniyor...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Hata</h2>
          <p className="text-gray-700 mb-4">{error}</p>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 py-8 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-pink-600/5 to-purple-600/5 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-bounce"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-full border border-purple-500/30 mb-8">
            <span className="text-purple-700 text-sm font-semibold">👤 Kullanıcı Profili</span>
          </div>
          <h1 className="text-6xl lg:text-7xl font-black text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          <p className="text-xl text-gray-700">
            Hikaye yazma maceranızın detaylı özeti
          </p>
        </div>

        {/* User Info Card - SaaS Website Kit Style */}
        <div className={`group relative mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
          <div className="relative bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-200 p-8 hover:border-gray-300 transition-all duration-500">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
              {/* Avatar - Modern Design */}
              <div className="relative">
                <div className="w-40 h-40 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-3xl flex items-center justify-center text-white text-6xl font-black shadow-2xl group-hover:scale-110 transition-transform duration-500">
                  {user.nickname?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-gray-900 animate-pulse"></div>
                <div className="absolute -top-2 -left-2 w-6 h-6 bg-purple-400 rounded-full animate-ping opacity-75"></div>
              </div>
              
              {/* User Details */}
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-4xl font-black text-gray-900 mb-3">
                  {user.nickname || 'Anonim Yazar'}
                </h2>
                <p className="text-gray-600 mb-8 text-lg">
                  StoryChain'e katılım: {new Date(user.createdAt || Date.now()).toLocaleDateString('tr-TR')}
                </p>
                
                {/* Stats Grid - SaaS Website Kit Style */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-purple-800/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                    <div className="relative bg-gradient-to-br from-purple-600/20 to-purple-800/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-500 hover:scale-105">
                      <div className="text-4xl font-black text-purple-400 mb-2">{userStats.totalStories}</div>
                      <div className="text-sm text-gray-700 font-semibold">Hikaye</div>
                    </div>
                  </div>
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 to-pink-800/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                    <div className="relative bg-gradient-to-br from-pink-600/20 to-pink-800/20 backdrop-blur-sm rounded-2xl p-6 border border-pink-500/30 hover:border-pink-400/50 transition-all duration-500 hover:scale-105">
                      <div className="text-4xl font-black text-pink-400 mb-2">{userStats.totalLikes}</div>
                      <div className="text-sm text-gray-700 font-semibold">Beğeni</div>
                    </div>
                  </div>
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-800/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                    <div className="relative bg-gradient-to-br from-blue-600/20 to-blue-800/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-500 hover:scale-105">
                      <div className="text-4xl font-black text-blue-400 mb-2">{userStats.totalCharacters.toLocaleString()}</div>
                      <div className="text-sm text-gray-700 font-semibold">Karakter</div>
                    </div>
                  </div>
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-green-800/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                    <div className="relative bg-gradient-to-br from-green-600/20 to-green-800/20 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30 hover:border-green-400/50 transition-all duration-500 hover:scale-105">
                      <div className="text-4xl font-black text-green-400 mb-2">{userStats.averageRating}</div>
                      <div className="text-sm text-gray-700 font-semibold">Ortalama</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col gap-4">
                <Link 
                  href="/themes" 
                  className="group relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-500 flex items-center gap-3 shadow-2xl hover:shadow-purple-500/50 transform hover:scale-110 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <span className="text-2xl relative z-10">✏️</span>
                  <span className="relative z-10">Yeni Hikaye Yaz</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="bg-gray-800 hover:bg-red-600 text-white hover:text-red-100 px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-500 border border-gray-600 hover:border-red-500 backdrop-blur-sm hover:scale-105"
                >
                  🚪 Çıkış Yap
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs - SaaS Website Kit Style */}
        <div className={`group relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
          <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden hover:border-white/40 transition-all duration-500">
            {/* Tab Headers */}
            <div className="flex border-b border-white/20">
              <button
                onClick={() => setActiveTab('stories')}
                className={`flex-1 px-10 py-8 text-center font-bold text-lg transition-all duration-500 ${
                  activeTab === 'stories'
                    ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-white border-b-2 border-purple-400'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="text-2xl mr-3">📚</span>
                Hikayelerim
              </button>
              <button
                onClick={() => setActiveTab('info')}
                className={`flex-1 px-10 py-8 text-center font-bold text-lg transition-all duration-500 ${
                  activeTab === 'info'
                    ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-white border-b-2 border-purple-400'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="text-2xl mr-3">ℹ️</span>
                Kişisel Bilgiler
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-10">
              {activeTab === 'stories' && (
                <div>
                  <h3 className="text-3xl font-black text-white mb-10">Tamamladığım Hikayeler</h3>
                  
                  {userStories.length > 0 ? (
                    <div className="space-y-8">
                      {userStories.map((story, index) => (
                        <div key={story.id || index} className="group relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                          <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/30 transition-all duration-500 hover:bg-white/10 hover:scale-105">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                              <div className="flex-1">
                                <div className="flex items-center gap-4 mb-4">
                                  <h4 className="text-2xl font-bold text-white">
                                    {story.title || `Hikaye ${index + 1}`}
                                  </h4>
                                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm px-4 py-2 rounded-full font-semibold">
                                    {story.theme || 'Genel'}
                                  </span>
                                </div>
                                <p className="text-gray-300 mb-6 line-clamp-3 text-lg leading-relaxed">
                                  {(() => {
                                    if (story.segments && story.segments.length > 0) {
                                      return story.segments.map(s => s.content).join(' ');
                                    } else if (story.content) {
                                      return story.content;
                                    } else {
                                      return 'Hikaye içeriği...';
                                    }
                                  })()}
                                </p>
                                <div className="flex items-center gap-8 text-sm text-gray-400">
                                  <span className="flex items-center gap-2">
                                    <span className="text-lg">📅</span>
                                    {new Date(story.createdAt || Date.now()).toLocaleDateString('tr-TR')}
                                  </span>
                                  <span className="flex items-center gap-2">
                                    <span className="text-lg">❤️</span>
                                    {story.likeCount || story.likes || 0} beğeni
                                  </span>
                                  <span className="flex items-center gap-2">
                                    <span className="text-lg">⭐</span>
                                    {story.rating || 0} puan
                                  </span>
                                  <span className="flex items-center gap-2">
                                    <span className="text-lg">📝</span>
                                    {(() => {
                                      if (story.segments && story.segments.length > 0) {
                                        return story.segments.reduce((sum, segment) => sum + (segment.content?.length || 0), 0);
                                      } else if (story.content) {
                                        return story.content.length;
                                      } else {
                                        return 0;
                                      }
                                    })()} karakter
                                  </span>
                                </div>
                              </div>
                              <div className="flex gap-4">
                                <Link 
                                  href={`/stories/${story.id || index}`}
                                  className="group relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-bold transition-all duration-500 shadow-lg hover:shadow-xl transform hover:scale-110 overflow-hidden"
                                >
                                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                  <span className="relative z-10">Görüntüle</span>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20">
                      <div className="text-9xl mb-8 animate-bounce">📝</div>
                      <h4 className="text-3xl font-bold text-white mb-6">
                        Henüz Hikaye Yazmadınız
                      </h4>
                      <p className="text-gray-300 mb-10 text-xl leading-relaxed">
                        İlk hikayenizi yazarak profil sayfanızı doldurun!
                      </p>
                      <Link 
                        href="/themes" 
                        className="group relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-500 inline-flex items-center gap-4 shadow-2xl hover:shadow-purple-500/50 transform hover:scale-110 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        <span className="text-2xl relative z-10">✏️</span>
                        <span className="relative z-10">İlk Hikayenizi Yazın</span>
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'info' && (
                <div>
                  <h3 className="text-3xl font-black text-white mb-10">Kişisel Bilgiler</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="space-y-8">
                      <div>
                        <label className="block text-lg font-bold text-gray-300 mb-4">
                          Rumuz
                        </label>
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl px-8 py-6 text-white border border-white/10 text-lg font-semibold">
                          {user.nickname || 'Belirtilmemiş'}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-lg font-bold text-gray-300 mb-4">
                          Katılım Tarihi
                        </label>
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl px-8 py-6 text-white border border-white/10 text-lg font-semibold">
                          {new Date(user.createdAt || Date.now()).toLocaleDateString('tr-TR')}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-lg font-bold text-gray-300 mb-4">
                          Rol
                        </label>
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl px-8 py-6 text-white border border-white/10 text-lg font-semibold">
                          {user.role === 'admin' ? '👑 Admin' : '✍️ Yazar'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-8">
                      <div>
                        <label className="block text-lg font-bold text-gray-300 mb-4">
                          Toplam Hikaye
                        </label>
                        <div className="bg-gradient-to-r from-purple-600/20 to-purple-800/20 backdrop-blur-sm rounded-2xl px-8 py-6 text-purple-400 font-bold text-lg border border-purple-500/30">
                          {userStats.totalStories} hikaye
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-lg font-bold text-gray-300 mb-4">
                          Toplam Beğeni
                        </label>
                        <div className="bg-gradient-to-r from-pink-600/20 to-pink-800/20 backdrop-blur-sm rounded-2xl px-8 py-6 text-pink-400 font-bold text-lg border border-pink-500/30">
                          {userStats.totalLikes} beğeni
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-lg font-bold text-gray-300 mb-4">
                          Toplam Karakter
                        </label>
                        <div className="bg-gradient-to-r from-blue-600/20 to-blue-800/20 backdrop-blur-sm rounded-2xl px-8 py-6 text-blue-400 font-bold text-lg border border-blue-500/30">
                          {userStats.totalCharacters.toLocaleString()} karakter
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Achievements Section - SaaS Website Kit Style */}
                  <div className="mt-16 pt-12 border-t border-white/20">
                    <h4 className="text-2xl font-black text-white mb-10">Başarılar</h4>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                      <div className={`group relative text-center p-8 rounded-2xl transition-all duration-500 hover:scale-105 ${userStats.totalStories >= 1 ? 'bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 border border-yellow-500/30 text-yellow-400' : 'bg-white/5 border border-white/10 text-gray-500'}`}>
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/10 to-yellow-800/10 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                        <div className="relative">
                          <div className="text-6xl mb-4">🎯</div>
                          <div className="font-bold mb-3 text-lg">İlk Hikaye</div>
                          <div className="text-sm">1 hikaye yaz</div>
                        </div>
                      </div>
                      <div className={`group relative text-center p-8 rounded-2xl transition-all duration-500 hover:scale-105 ${userStats.totalStories >= 5 ? 'bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-500/30 text-green-400' : 'bg-white/5 border border-white/10 text-gray-500'}`}>
                        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-green-800/10 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                        <div className="relative">
                          <div className="text-6xl mb-4">📚</div>
                          <div className="font-bold mb-3 text-lg">Hikayeci</div>
                          <div className="text-sm">5 hikaye yaz</div>
                        </div>
                      </div>
                      <div className={`group relative text-center p-8 rounded-2xl transition-all duration-500 hover:scale-105 ${userStats.totalLikes >= 10 ? 'bg-gradient-to-br from-pink-600/20 to-pink-800/20 border border-pink-500/30 text-pink-400' : 'bg-white/5 border border-white/10 text-gray-500'}`}>
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-600/10 to-pink-800/10 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                        <div className="relative">
                          <div className="text-6xl mb-4">❤️</div>
                          <div className="font-bold mb-3 text-lg">Popüler</div>
                          <div className="text-sm">10 beğeni al</div>
                        </div>
                      </div>
                      <div className={`group relative text-center p-8 rounded-2xl transition-all duration-500 hover:scale-105 ${userStats.totalCharacters >= 10000 ? 'bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-500/30 text-purple-400' : 'bg-white/5 border border-white/10 text-gray-500'}`}>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-purple-800/10 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                        <div className="relative">
                          <div className="text-6xl mb-4">✍️</div>
                          <div className="font-bold mb-3 text-lg">Yazar</div>
                          <div className="text-sm">10K karakter yaz</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
