'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/lib/api';

interface Story {
  id: string;
  title: string;
  theme: string;
  segments: Array<{
    id: string;
    author: string;
    content: string;
    order: number;
    createdAt: string;
  }>;
  isCompleted: boolean;
  likeCount: number;
  createdAt: string;
  segmentCount: number;
  lastActivity: string;
}

interface User {
  id: string;
  nickname: string;
  stories_written: number;
  total_likes: number;
  storyCount: number;
  createdAt?: string;
}

interface Stats {
  totalStories: number;
  completedStories: number;
  ongoingStories: number;
  totalUsers: number;
  totalSegments: number;
  averageSegmentsPerStory: string;
}

export default function AdminPanel() {
  const { user } = useAuth();
  const [stories, setStories] = useState<Story[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'stories' | 'users' | 'stats'>('stories');

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

  const deleteStory = async (storyId: string) => {
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

  const approveStory = async (storyId: string) => {
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

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Erişim Reddedildi</h1>
          <p className="text-gray-600">Bu sayfaya erişim yetkiniz bulunmamaktadır.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-md">
          {/* Header */}
          <div className="border-b border-gray-200 px-6 py-4">
            <h1 className="text-3xl font-bold text-gray-900">Admin Paneli</h1>
            <p className="text-gray-600 mt-2">Hoş geldiniz, {user.nickname}!</p>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('stories')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'stories'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Hikayeler ({stories.length})
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'users'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Kullanıcılar ({users.length})
              </button>
              <button
                onClick={() => setActiveTab('stats')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'stats'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                İstatistikler
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'stories' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Hikaye Yönetimi</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Başlık
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tema
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Segment
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Durum
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tarih
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          İşlemler
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {stories.map((story) => (
                        <tr key={story.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{story.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                              {story.theme}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {story.segmentCount}/5
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              story.isCompleted 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {story.isCompleted ? 'Tamamlandı' : 'Devam Ediyor'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(story.createdAt).toLocaleDateString('tr-TR')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => approveStory(story.id)}
                                className="text-green-600 hover:text-green-900"
                              >
                                Onayla
                              </button>
                              <button
                                onClick={() => deleteStory(story.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Sil
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Kullanıcı Yönetimi</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rumuz
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Hikaye Sayısı
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Toplam Beğeni
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Kayıt Tarihi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{user.nickname}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.storyCount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.total_likes}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString('tr-TR') : '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'stats' && stats && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Platform İstatistikleri</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-purple-900">Toplam Hikaye</h3>
                    <p className="text-3xl font-bold text-purple-600">{stats.totalStories}</p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-900">Tamamlanan Hikaye</h3>
                    <p className="text-3xl font-bold text-green-600">{stats.completedStories}</p>
                  </div>
                  <div className="bg-yellow-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-yellow-900">Devam Eden Hikaye</h3>
                    <p className="text-3xl font-bold text-yellow-600">{stats.ongoingStories}</p>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-900">Toplam Kullanıcı</h3>
                    <p className="text-3xl font-bold text-blue-600">{stats.totalUsers}</p>
                  </div>
                  <div className="bg-indigo-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-indigo-900">Toplam Segment</h3>
                    <p className="text-3xl font-bold text-indigo-600">{stats.totalSegments}</p>
                  </div>
                  <div className="bg-pink-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-pink-900">Ortalama Segment</h3>
                    <p className="text-3xl font-bold text-pink-600">{stats.averageSegmentsPerStory}</p>
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
