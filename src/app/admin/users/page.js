'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import api from '../../../lib/api';

export default function UserManagement() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    if (user?.role === 'admin') {
      loadUsers();
    }
  }, [user]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/users');
      setUsers(response.data.users);
    } catch (error) {
      console.error('Users load error:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    if (!confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz!')) {
      return;
    }

    try {
      await api.delete(`/admin/users/${userId}`);
      setUsers(users.filter(u => u.id !== userId));
      alert('Kullanıcı başarıyla silindi');
    } catch (error) {
      console.error('Delete user error:', error);
      alert('Kullanıcı silinirken hata oluştu');
    }
  };

  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      await api.put(`/admin/users/${userId}/status`, {
        isActive: !currentStatus
      });
      setUsers(users.map(u => 
        u.id === userId ? { ...u, isActive: !currentStatus } : u
      ));
      alert(`Kullanıcı ${!currentStatus ? 'aktif' : 'pasif'} hale getirildi`);
    } catch (error) {
      console.error('Toggle user status error:', error);
      alert('Kullanıcı durumu değiştirilirken hata oluştu');
    }
  };

  const changeUserRole = async (userId, newRole) => {
    try {
      await api.put(`/admin/users/${userId}/role`, {
        role: newRole
      });
      setUsers(users.map(u => 
        u.id === userId ? { ...u, role: newRole } : u
      ));
      alert(`Kullanıcı rolü ${newRole} olarak değiştirildi`);
    } catch (error) {
      console.error('Change user role error:', error);
      alert('Kullanıcı rolü değiştirilirken hata oluştu');
    }
  };

  // Filter and sort users
  const filteredUsers = users
    .filter(user => {
      const matchesSearch = user.nickname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = filterRole === 'all' || user.role === filterRole;
      return matchesSearch && matchesRole;
    })
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'createdAt') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 flex items-center justify-center">
        <div className="bg-red-100 backdrop-blur-sm rounded-3xl border border-red-300 p-12">
          <h1 className="text-3xl font-bold text-red-700 mb-6 flex items-center gap-3">
            <span className="text-4xl">🚫</span>
            <span>Erişim Reddedildi</span>
          </h1>
          <p className="text-red-600 text-lg">Bu sayfaya erişim yetkiniz bulunmamaktadır.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 p-12">
          <div className="text-3xl text-gray-700 flex items-center gap-4">
            <span className="animate-spin text-4xl">⏳</span>
            <span>Kullanıcılar yükleniyor...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200 p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <span className="text-4xl">👥</span>
                <span>Kullanıcı Yönetimi</span>
              </h1>
              <p className="text-gray-600">Toplam {users.length} kullanıcı kayıtlı</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-600">{users.length}</div>
              <div className="text-sm text-gray-500">Toplam Kullanıcı</div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
              <div className="text-3xl font-bold">{users.filter(u => u.role === 'user').length}</div>
              <div className="text-blue-100">Normal Kullanıcı</div>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
              <div className="text-3xl font-bold">{users.filter(u => u.role === 'admin').length}</div>
              <div className="text-purple-100">Admin</div>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
              <div className="text-3xl font-bold">{users.filter(u => u.isActive).length}</div>
              <div className="text-green-100">Aktif Kullanıcı</div>
            </div>
            <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white">
              <div className="text-3xl font-bold">{users.filter(u => !u.isActive).length}</div>
              <div className="text-red-100">Pasif Kullanıcı</div>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Kullanıcı ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">Tüm Roller</option>
              <option value="user">Normal Kullanıcı</option>
              <option value="admin">Admin</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="createdAt">Kayıt Tarihi</option>
              <option value="nickname">Kullanıcı Adı</option>
              <option value="role">Rol</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="desc">Azalan</option>
              <option value="asc">Artan</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Kullanıcı</th>
                  <th className="px-6 py-4 text-left font-semibold">Email</th>
                  <th className="px-6 py-4 text-left font-semibold">Rol</th>
                  <th className="px-6 py-4 text-left font-semibold">Durum</th>
                  <th className="px-6 py-4 text-left font-semibold">Kayıt Tarihi</th>
                  <th className="px-6 py-4 text-left font-semibold">Son Giriş</th>
                  <th className="px-6 py-4 text-left font-semibold">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((userItem) => (
                  <tr key={userItem.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {userItem.nickname?.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-4">
                          <div className="font-semibold text-gray-900">{userItem.nickname}</div>
                          <div className="text-sm text-gray-500">ID: {userItem.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{userItem.email || 'N/A'}</td>
                    <td className="px-6 py-4">
                      <select
                        value={userItem.role}
                        onChange={(e) => changeUserRole(userItem.id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          userItem.role === 'admin' 
                            ? 'bg-red-100 text-red-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        <option value="user">Kullanıcı</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleUserStatus(userItem.id, userItem.isActive)}
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          userItem.isActive 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {userItem.isActive ? 'Aktif' : 'Pasif'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {new Date(userItem.createdAt).toLocaleDateString('tr-TR')}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {userItem.lastLogin 
                        ? new Date(userItem.lastLogin).toLocaleDateString('tr-TR')
                        : 'Hiç giriş yapmamış'
                      }
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => deleteUser(userItem.id)}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                        >
                          🗑️ Sil
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
    </div>
  );
}
