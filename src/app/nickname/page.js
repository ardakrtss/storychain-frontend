'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../lib/api';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [formData, setFormData] = useState({
    nickname: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nickname.trim()) {
      newErrors.nickname = 'Rumuz gereklidir';
    }

    if (!formData.password) {
      newErrors.password = 'Şifre gereklidir';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const result = await signIn(formData.nickname.trim().toLowerCase(), formData.password);
      if (result.success) {
        router.push('/profile');
      } else {
        setErrors({ general: result.error || 'Giriş yapılamadı' });
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response?.data?.error) {
        setErrors({ general: error.response.data.error });
      } else {
        setErrors({ general: 'Giriş yapılırken bir hata oluştu. Lütfen tekrar deneyin.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-purple-600/10"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-2xl">
            🔐
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Giriş Yap
          </h2>
          <p className="text-gray-700">
            StoryChain hesabınıza giriş yapın ve hikaye yazmaya devam edin!
          </p>
        </div>

        {/* Form Card - Vuexy Style */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General Error */}
            {errors.general && (
              <div className="bg-red-100 border border-red-300 rounded-xl p-4 text-red-700 text-sm">
                {errors.general}
              </div>
            )}

            {/* Nickname Field */}
            <div>
              <label htmlFor="nickname" className="block text-sm font-medium text-gray-900 mb-3">
                Rumuz
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-400 text-lg">👤</span>
                </div>
                                  <input
                    id="nickname"
                    name="nickname"
                    type="text"
                    value={formData.nickname}
                    onChange={handleChange}
                    style={{ color: '#000000 !important', backgroundColor: '#ffffff !important', paddingLeft: '3rem !important', textIndent: '0 !important' }}
                    className={`w-full pr-4 py-4 bg-white border rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                      errors.nickname 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    placeholder="Rumuzunuzu girin"
                  />
              </div>
              {errors.nickname && (
                <p className="mt-2 text-sm text-red-600">{errors.nickname}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-3">
                Şifre
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-400 text-lg">🔒</span>
                </div>
                                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    style={{ color: '#000000 !important', backgroundColor: '#ffffff !important', paddingLeft: '3rem !important', textIndent: '0 !important' }}
                    className={`w-full pr-12 py-4 bg-white border rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                      errors.password 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    placeholder="Şifrenizi girin"
                  />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Giriş Yapılıyor...</span>
                </>
              ) : (
                <>
                  <span className="text-xl">🚀</span>
                  <span>Giriş Yap</span>
                </>
              )}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-300">
              Hesabınız yok mu?{' '}
              <Link 
                href="/register" 
                className="text-purple-400 hover:text-purple-300 font-semibold transition-colors duration-300"
              >
                Hesap Oluşturun
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link 
            href="/" 
            className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <span>←</span>
            <span>Ana Sayfaya Dön</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
