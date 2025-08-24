'use client';

import { useState } from 'react';
import api from '../../lib/api';

export default function CreateAdminPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const createAdmin = async () => {
    setLoading(true);
    try {
      // Admin kullanıcısı oluştur
      const response = await api.post('/auth/create-admin', {
        nickname: 'admin',
        password: 'admin123'
      });

      if (response.data.success) {
        setMessage(`✅ ${response.data.message}! Kullanıcı adı: admin, Şifre: admin123`);
      }
    } catch (error) {
      setMessage('❌ Hata: ' + error.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 flex items-center justify-center">
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200 p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Admin Kullanıcısı Oluştur
        </h1>
        
        <button
          onClick={createAdmin}
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
        >
          {loading ? 'Oluşturuluyor...' : 'Admin Kullanıcısı Oluştur'}
        </button>

        {message && (
          <div className="mt-6 p-4 rounded-xl text-center">
            <p className="text-sm">{message}</p>
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-100 rounded-xl">
          <h3 className="font-bold text-gray-900 mb-2">Admin Bilgileri:</h3>
          <p className="text-sm text-gray-700">
            <strong>Kullanıcı Adı:</strong> admin<br/>
            <strong>Şifre:</strong> admin123<br/>
            <strong>Rol:</strong> admin
          </p>
        </div>
      </div>
    </div>
  );
}
