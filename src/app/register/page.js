'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../lib/api';

export default function RegisterPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [formData, setFormData] = useState({
    nickname: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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
    } else if (formData.nickname.trim().length < 2) {
      newErrors.nickname = 'Rumuz en az 2 karakter olmalıdır';
    }

    if (!formData.password) {
      newErrors.password = 'Şifre gereklidir';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Şifre en az 6 karakter olmalıdır';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Şifre tekrarı gereklidir';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Şifreler eşleşmiyor';
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
      const response = await api.post('/auth/register', {
        nickname: formData.nickname.trim(),
        password: formData.password
      });

      if (response.data.success) {
        setSuccess(true);
        
        // Auto login after successful registration
        try {
          await signIn(formData.nickname.trim(), formData.password);
          router.push('/profile');
        } catch (loginError) {
          console.error('Auto login failed:', loginError);
          router.push('/nickname');
        }
      }
    } catch (error) {
      console.error('Register error:', error);
      if (error.response?.data?.error) {
        setErrors({ general: error.response.data.error });
      } else {
        setErrors({ general: 'Kayıt olurken bir hata oluştu. Lütfen tekrar deneyin.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-purple-600/10"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-2xl">
            ✨
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Hesap Oluştur
          </h2>
          <p className="text-gray-300">
            StoryChain'e katılın ve hikaye yazma macerasına başlayın!
          </p>
        </div>

        {/* Form Card - Vuexy Style */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
          {success ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-400 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                ✓
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Hesap Başarıyla Oluşturuldu!
              </h3>
              <p className="text-gray-300 mb-6">
                Otomatik olarak giriş yapılıyor...
              </p>
              <div className="animate-spin w-8 h-8 border-4 border-purple-400 border-t-transparent rounded-full mx-auto"></div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* General Error */}
              {errors.general && (
                <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm">
                  {errors.general}
                </div>
              )}

              {/* Nickname Field */}
              <div>
                <label htmlFor="nickname" className="block text-sm font-medium text-gray-300 mb-3">
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
                    className={`w-full pl-12 pr-4 py-4 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                      errors.nickname 
                        ? 'border-red-500/50 focus:ring-red-500' 
                        : 'border-white/20 hover:border-white/40'
                    }`}
                    placeholder="Rumuzunuzu girin"
                  />
                </div>
                {errors.nickname && (
                  <p className="mt-2 text-sm text-red-400">{errors.nickname}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-3">
                  Şifre
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-gray-400 text-lg">🔒</span>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-4 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                      errors.password 
                        ? 'border-red-500/50 focus:ring-red-500' 
                        : 'border-white/20 hover:border-white/40'
                    }`}
                    placeholder="Şifrenizi girin"
                  />
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-400">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-3">
                  Şifre Tekrarı
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-gray-400 text-lg">🔐</span>
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-4 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                      errors.confirmPassword 
                        ? 'border-red-500/50 focus:ring-red-500' 
                        : 'border-white/20 hover:border-white/40'
                    }`}
                    placeholder="Şifrenizi tekrar girin"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-400">{errors.confirmPassword}</p>
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
                    <span>Hesap Oluşturuluyor...</span>
                  </>
                ) : (
                  <>
                    <span className="text-xl">✨</span>
                    <span>Hesap Oluştur</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-300">
              Zaten hesabınız var mı?{' '}
              <Link 
                href="/nickname" 
                className="text-purple-400 hover:text-purple-300 font-semibold transition-colors duration-300"
              >
                Giriş Yapın
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
