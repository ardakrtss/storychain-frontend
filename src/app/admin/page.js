'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../lib/api';
import Link from 'next/link';

export default function AdminPanel() {
  const { user } = useAuth();
  const [stories, setStories] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('stories');

  useEffect(() => {
    if (user?.role === 'admin') {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [storiesRes, usersRes, statsRes] = await Promise.all([
        api.get('/admin/stories'),
        api.get('/admin/users'),
        api.get('/admin/stats')
      ]);
      
      setStories(storiesRes.data.stories);
      setUsers(usersRes.data.users);
      setStats(statsRes.data.stats);
    } catch (error) {
      console.error('Admin data load error:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteStory = async (storyId) => {
    if (!confirm('Bu hikayeyi silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      await api.delete(`/admin/stories/${storyId}`);
      setStories(stories.filter(s => s.id !== storyId));
      alert('Hikaye başarıyla silindi');
    } catch (error) {
      console.error('Delete story error:', error);
      alert('Hikaye silinirken hata oluştu');
    }
  };

  const approveStory = async (storyId) => {
    try {
      await api.put(`/admin/stories/${storyId}/approve`);
      setStories(stories.map(s => 
        s.id === storyId ? { ...s, isApproved: true } : s
      ));
      alert('Hikaye onaylandı');
    } catch (error) {
      console.error('Approve story error:', error);
      alert('Hikaye onaylanırken hata oluştu');
    }
  };

  if (!user) {
    // Kullanıcı giriş yapmamışsa admin login sayfasına yönlendir
    if (typeof window !== 'undefined') {
      window.location.href = '/admin/login';
    }
    return null;
  }

  if (user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 flex items-center justify-center">
        <div className="bg-red-100 backdrop-blur-sm rounded-3xl border border-red-300 p-12 hover:bg-red-200 transition-all duration-300">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="text-4xl">🚫</span>
            <span>Erişim Reddedildi</span>
          </h1>
          <p className="text-gray-700 text-lg">Bu sayfaya erişim yetkiniz bulunmamaktadır. Sadece admin kullanıcıları erişebilir.</p>
          <div className="mt-6">
            <a 
              href="/admin/login" 
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 inline-flex items-center gap-2"
            >
              <span>🔐</span>
              <span>Admin Girişi</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 p-12 hover:bg-white/90 transition-all duration-300">
          <div className="text-3xl text-gray-900 flex items-center gap-4">
            <span className="animate-spin text-4xl">⏳</span>
            <span>Yükleniyor...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 overflow-hidden">
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

      <div className="relative z-10 max-w-7xl mx-auto py-12 px-4">
        <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-300">
          {/* Header */}
          <div className="border-b border-white/20 px-8 py-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-3xl">
                👑
              </div>
              <div>
                <h1 className="text-4xl font-black text-white">Admin Paneli</h1>
                <p className="text-xl text-gray-300 mt-2">Hoş geldiniz, <span className="text-purple-400 font-bold">{user.nickname}</span>!</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-white/20">
            <nav className="flex space-x-8 px-8">
              <button
                onClick={() => setActiveTab('stories')}
                className={`py-6 px-4 border-b-2 font-bold text-lg transition-all duration-300 flex items-center gap-3 ${
                  activeTab === 'stories'
                    ? 'border-purple-500 text-purple-400 bg-purple-500/10'
                    : 'border-transparent text-gray-400 hover:text-white hover:border-white/30'
                }`}
              >
                <span className="text-2xl">📚</span>
                <span>Hikayeler ({stories.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`py-6 px-4 border-b-2 font-bold text-lg transition-all duration-300 flex items-center gap-3 ${
                  activeTab === 'users'
                    ? 'border-purple-500 text-purple-400 bg-purple-500/10'
                    : 'border-transparent text-gray-400 hover:text-white hover:border-white/30'
                }`}
              >
                <span className="text-2xl">👥</span>
                <span>Kullanıcılar ({users.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('stats')}
                className={`py-6 px-4 border-b-2 font-bold text-lg transition-all duration-300 flex items-center gap-3 ${
                  activeTab === 'stats'
                    ? 'border-purple-500 text-purple-400 bg-purple-500/10'
                    : 'border-transparent text-gray-400 hover:text-white hover:border-white/30'
                }`}
              >
                <span className="text-2xl">📊</span>
                <span>İstatistikler</span>
              </button>
              <Link
                href="/admin/users"
                className="py-6 px-4 border-b-2 font-bold text-lg transition-all duration-300 flex items-center gap-3 border-transparent text-blue-400 hover:text-blue-300 hover:border-blue-400/30"
              >
                <span className="text-2xl">👥</span>
                <span>Kullanıcı Yönetimi</span>
              </Link>
            </nav>
          </div>

          {/* Content */}
          <div className="p-8">
            {activeTab === 'stories' && (
              <div>
                <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                  <span className="text-4xl">📚</span>
                  <span>Hikaye Yönetimi</span>
                </h2>
                <div className="overflow-x-auto">
                  <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden">
                    <table className="min-w-full divide-y divide-white/10">
                      <thead className="bg-white/10">
                        <tr>
                          <th className="px-8 py-6 text-left text-lg font-bold text-white uppercase tracking-wider">
                            Başlık
                          </th>
                          <th className="px-8 py-6 text-left text-lg font-bold text-white uppercase tracking-wider">
                            Tema
                          </th>
                          <th className="px-8 py-6 text-left text-lg font-bold text-white uppercase tracking-wider">
                            Segment
                          </th>
                          <th className="px-8 py-6 text-left text-lg font-bold text-white uppercase tracking-wider">
                            Durum
                          </th>
                          <th className="px-8 py-6 text-left text-lg font-bold text-white uppercase tracking-wider">
                            Tarih
                          </th>
                          <th className="px-8 py-6 text-left text-lg font-bold text-white uppercase tracking-wider">
                            İşlemler
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {stories.map((story) => (
                          <tr key={story.id} className="hover:bg-white/5 transition-all duration-300">
                            <td className="px-8 py-6 whitespace-nowrap">
                              <div className="text-lg font-bold text-white">{story.title}</div>
                            </td>
                            <td className="px-8 py-6 whitespace-nowrap">
                              <span className="inline-flex px-4 py-2 text-sm font-bold rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                                {story.theme}
                              </span>
                            </td>
                            <td className="px-8 py-6 whitespace-nowrap text-lg text-gray-300">
                              {story.segmentCount}/5
                            </td>
                            <td className="px-8 py-6 whitespace-nowrap">
                              <span className={`inline-flex px-4 py-2 text-sm font-bold rounded-full ${
                                story.isCompleted 
                                  ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                                  : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                              }`}>
                                {story.isCompleted ? '✅ Tamamlandı' : '⏳ Devam Ediyor'}
                              </span>
                            </td>
                            <td className="px-8 py-6 whitespace-nowrap text-lg text-gray-300">
                              {new Date(story.createdAt).toLocaleDateString('tr-TR')}
                            </td>
                            <td className="px-8 py-6 whitespace-nowrap text-lg font-bold">
                              <div className="flex space-x-4">
                                <button
                                  onClick={() => approveStory(story.id)}
                                  className="group bg-green-500/20 hover:bg-green-500/30 text-green-300 hover:text-green-200 px-4 py-2 rounded-xl border border-green-500/30 transition-all duration-300 hover:scale-105"
                                >
                                  <span className="flex items-center gap-2">
                                    <span className="text-xl">✅</span>
                                    <span>Onayla</span>
                                  </span>
                                </button>
                                <button
                                  onClick={() => deleteStory(story.id)}
                                  className="group bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 px-4 py-2 rounded-xl border border-red-500/30 transition-all duration-300 hover:scale-105"
                                >
                                  <span className="flex items-center gap-2">
                                    <span className="text-xl">🗑️</span>
                                    <span>Sil</span>
                                  </span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                  <span className="text-4xl">👥</span>
                  <span>Kullanıcı Yönetimi</span>
                </h2>
                <div className="overflow-x-auto">
                  <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden">
                    <table className="min-w-full divide-y divide-white/10">
                      <thead className="bg-white/10">
                        <tr>
                          <th className="px-8 py-6 text-left text-lg font-bold text-white uppercase tracking-wider">
                            Rumuz
                          </th>
                          <th className="px-8 py-6 text-left text-lg font-bold text-white uppercase tracking-wider">
                            Hikaye Sayısı
                          </th>
                          <th className="px-8 py-6 text-left text-lg font-bold text-white uppercase tracking-wider">
                            Toplam Beğeni
                          </th>
                          <th className="px-8 py-6 text-left text-lg font-bold text-white uppercase tracking-wider">
                            Kayıt Tarihi
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {users.map((user) => (
                          <tr key={user.id} className="hover:bg-white/5 transition-all duration-300">
                            <td className="px-8 py-6 whitespace-nowrap">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-xl font-bold text-white">
                                  {user.nickname.charAt(0).toUpperCase()}
                                </div>
                                <div className="text-lg font-bold text-white">{user.nickname}</div>
                              </div>
                            </td>
                            <td className="px-8 py-6 whitespace-nowrap">
                              <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 text-purple-300 rounded-xl border border-purple-500/30">
                                <span className="text-xl">📚</span>
                                <span className="text-lg font-bold">{user.storyCount}</span>
                              </span>
                            </td>
                            <td className="px-8 py-6 whitespace-nowrap">
                              <span className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/20 text-pink-300 rounded-xl border border-pink-500/30">
                                <span className="text-xl">❤️</span>
                                <span className="text-lg font-bold">{user.total_likes}</span>
                              </span>
                            </td>
                            <td className="px-8 py-6 whitespace-nowrap text-lg text-gray-300">
                              {user.createdAt ? new Date(user.createdAt).toLocaleDateString('tr-TR') : '-'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'stats' && stats && (
              <div>
                <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                  <span className="text-4xl">📊</span>
                  <span>Platform İstatistikleri</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="group bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-3xl border border-purple-500/30 p-8 hover:bg-purple-600/30 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-3xl">
                        📚
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Toplam Hikaye</h3>
                        <p className="text-5xl font-black text-purple-400">{stats.totalStories}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-sm rounded-3xl border border-green-500/30 p-8 hover:bg-green-600/30 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center text-3xl">
                        ✅
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Tamamlanan Hikaye</h3>
                        <p className="text-5xl font-black text-green-400">{stats.completedStories}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group bg-gradient-to-br from-yellow-600/20 to-orange-600/20 backdrop-blur-sm rounded-3xl border border-yellow-500/30 p-8 hover:bg-yellow-600/30 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-2xl flex items-center justify-center text-3xl">
                        ⏳
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Devam Eden Hikaye</h3>
                        <p className="text-5xl font-black text-yellow-400">{stats.ongoingStories}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-sm rounded-3xl border border-blue-500/30 p-8 hover:bg-blue-600/30 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center text-3xl">
                        👥
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Toplam Kullanıcı</h3>
                        <p className="text-5xl font-black text-blue-400">{stats.totalUsers}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group bg-gradient-to-br from-indigo-600/20 to-purple-600/20 backdrop-blur-sm rounded-3xl border border-indigo-500/30 p-8 hover:bg-indigo-600/30 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-3xl">
                        📝
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Toplam Segment</h3>
                        <p className="text-5xl font-black text-indigo-400">{stats.totalSegments}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group bg-gradient-to-br from-pink-600/20 to-rose-600/20 backdrop-blur-sm rounded-3xl border border-pink-500/30 p-8 hover:bg-pink-600/30 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl flex items-center justify-center text-3xl">
                        📊
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Ortalama Segment</h3>
                        <p className="text-5xl font-black text-pink-400">{stats.averageSegmentsPerStory}</p>
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
  );
}
