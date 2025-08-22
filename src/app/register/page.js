'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import Link from 'next/link';
import api from '../../lib/api';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    nickname: '',
    password: '',
    confirmPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { signIn } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.nickname.trim()) {
      setError('Lütfen bir rumuz girin!');
      return;
    }

    if (formData.nickname.trim().length < 2) {
      setError('Rumuz en az 2 karakter olmalıdır!');
      return;
    }

    if (formData.nickname.trim().length > 20) {
      setError('Rumuz en fazla 20 karakter olabilir!');
      return;
    }

    if (!formData.password) {
      setError('Lütfen bir şifre girin!');
      return;
    }

    if (formData.password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır!');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor!');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Kayıt ol
      const registerResponse = await api.post('/auth/register', {
        nickname: formData.nickname.trim(),
        password: formData.password
      });

      if (registerResponse.data.success) {
        // Kayıt başarılı, otomatik giriş yap
        const loginResult = await signIn(formData.nickname.trim());
        if (loginResult.success) {
          router.push('/themes');
        } else {
          setError('Kayıt başarılı ama giriş yapılamadı. Lütfen giriş sayfasından tekrar deneyin.');
        }
      } else {
        setError(registerResponse.data.error || 'Kayıt yapılamadı. Lütfen tekrar deneyin.');
      }
    } catch (error) {
      console.error('Register error:', error);
      if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else {
        setError('Kayıt yapılırken bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-3xl">📝</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            StoryChain&apos;e Katıl
          </h2>
          <p className="text-gray-600">
            Hikaye yazma macerasına başlamak için hesap oluştur
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nickname Input */}
            <div>
              <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mb-2">
                Rumuz
              </label>
              <input
                id="nickname"
                name="nickname"
                type="text"
                value={formData.nickname}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                placeholder="Örn: Hikayeci_Ali"
                maxLength={20}
                disabled={isSubmitting}
              />
              <p className="text-sm text-gray-500 mt-1">
                {formData.nickname.length}/20 karakter
              </p>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Şifre
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                placeholder="En az 6 karakter"
                disabled={isSubmitting}
              />
            </div>

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Şifre Tekrar
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                placeholder="Şifrenizi tekrar girin"
                disabled={isSubmitting}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !formData.nickname.trim() || !formData.password || !formData.confirmPassword}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Hesap oluşturuluyor...
                </>
              ) : (
                <>
                  <span>🚀</span>
                  Hesap Oluştur
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">veya</span>
              </div>
            </div>
          </div>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Zaten hesabın var mı?{' '}
              <Link 
                href="/nickname" 
                className="text-purple-600 hover:text-purple-700 font-semibold"
              >
                Giriş Yap
              </Link>
            </p>
          </div>

          {/* Info Section */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs">💡</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Neden Hesap Oluşturmalıyım?</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Hikayelerinizi kaydedin</li>
                    <li>• Lider tablosunda yer alın</li>
                    <li>• Beğenilerinizi takip edin</li>
                    <li>• Güvenli giriş yapın</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-gray-500 text-sm">
            Hesabınızı oluşturduktan sonra hemen hikaye yazmaya başlayabilirsiniz!
          </p>
        </div>
      </div>
    </div>
  );
}
