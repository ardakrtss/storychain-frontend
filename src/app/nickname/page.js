'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { user, signIn, loading: authLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');

  // Kullanıcı zaten giriş yapmışsa hikaye yazma sayfasına yönlendir
  useEffect(() => {
    if (user && !authLoading) {
      console.log('✅ Kullanıcı giriş yapmış, yönlendiriliyor...', user);
      router.push('/write');
    }
  }, [user, authLoading, router]);

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

    if (!formData.email.trim()) {
      newErrors.email = 'Email adresi gereklidir';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Geçerli bir email adresi giriniz';
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
    setDebugInfo('');

    try {
      console.log('🔄 Giriş işlemi başlatılıyor...', { email: formData.email });
      setDebugInfo('Giriş işlemi başlatılıyor...');
      
      const result = await signIn(formData.email.trim().toLowerCase(), formData.password);
      
      console.log('📋 Giriş sonucu:', result);
      setDebugInfo(`Giriş sonucu: ${JSON.stringify(result, null, 2)}`);
      
      if (result.success) {
        console.log('✅ Giriş başarılı! AuthContext güncellenecek...');
        setDebugInfo('✅ Giriş başarılı! Yönlendiriliyor...');
        // Başarılı giriş - AuthContext state'i güncellenecek ve useEffect tetiklenecek
      } else {
        console.log('❌ Giriş başarısız:', result.error);
        setErrors({ general: result.error || 'Giriş yapılamadı' });
        setDebugInfo(`❌ Giriş başarısız: ${result.error}`);
      }
    } catch (error) {
      console.error('❌ Giriş hatası:', error);
      setErrors({ general: 'Giriş yapılırken bir hata oluştu' });
      setDebugInfo(`❌ Hata: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Auth yükleniyorsa loading göster
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Auth yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Kullanıcı zaten giriş yapmışsa loading göster
  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Hikaye yazma sayfasına yönlendiriliyor...</p>
          <p className="text-sm text-gray-500 mt-2">Kullanıcı: {user.email || user.nickname}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
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

            {/* Debug Info */}
            {debugInfo && (
              <div className="bg-blue-100 border border-blue-300 rounded-xl p-4 text-blue-700 text-xs font-mono">
                <strong>Debug:</strong> {debugInfo}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-3">
                Email Adresi
              </label>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-gray-600 text-lg">📧</span>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{ color: '#000000 !important', backgroundColor: '#ffffff !important', textIndent: '0 !important' }}
                  className={`flex-1 py-4 px-4 bg-white border rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                    errors.email 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300'
                  }`}
                  placeholder="Email adresinizi girin"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-3">
                Şifre
              </label>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-gray-600 text-lg">🔒</span>
                </div>
                <div className="flex-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    style={{ color: '#000000 !important', backgroundColor: '#ffffff !important', textIndent: '0 !important' }}
                    className={`w-full py-4 px-4 pr-12 bg-white border rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                      errors.password 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300'
                    }`}
                    placeholder="Şifrenizi girin"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Giriş Yapılıyor...
                </div>
              ) : (
                "Giriş Yap"
              )}
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 space-y-4 text-center">
            <p className="text-gray-600">
              Hesabınız yok mu?{" "}
              <Link href="/kaydol" className="text-purple-600 hover:text-purple-700 font-medium">
                Kayıt Olun
              </Link>
            </p>
            <p className="text-gray-600">
              <Link href="/forgot-password" className="text-purple-600 hover:text-purple-700 font-medium">
                Şifremi Unuttum
              </Link>
            </p>
            <p className="text-gray-600">
              <Link href="/debug" className="text-orange-600 hover:text-orange-700 font-medium">
                🔧 Debug Sayfası
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
