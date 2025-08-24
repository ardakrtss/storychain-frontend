'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../lib/api';
import { Eye, EyeOff } from 'lucide-react';

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [nicknameSuggestions, setNicknameSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

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
    
    // Generate nickname suggestions when typing
    if (name === 'nickname' && value.trim().length > 0) {
      generateNicknameSuggestions(value.trim());
    } else {
      setShowSuggestions(false);
    }
  };

  const generateNicknameSuggestions = (baseNickname) => {
    const suggestions = [];
    const base = baseNickname.toLowerCase();
    
    // Add numbers
    for (let i = 1; i <= 5; i++) {
      suggestions.push(`${base}${i}`);
    }
    
    // Add common suffixes
    const suffixes = ['_', '.', 'x', 'pro', '2024', 'real', 'official', 'tr'];
    suffixes.forEach(suffix => {
      suggestions.push(`${base}${suffix}`);
    });
    
    // Add random combinations
    const randomWords = ['cool', 'awesome', 'super', 'mega', 'ultra', 'star', 'king', 'queen'];
    randomWords.forEach(word => {
      suggestions.push(`${base}_${word}`);
    });
    
    // Shuffle and take first 8
    const shuffled = suggestions.sort(() => 0.5 - Math.random());
    setNicknameSuggestions(shuffled.slice(0, 8));
    setShowSuggestions(true);
  };

  const selectSuggestion = (suggestion) => {
    setFormData(prev => ({
      ...prev,
      nickname: suggestion
    }));
    setShowSuggestions(false);
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
        nickname: formData.nickname.trim().toLowerCase(), // Case insensitive
        password: formData.password
      });

      if (response.data.success) {
        setSuccess(true);
        
        // Auto login after successful registration
        try {
          await signIn(formData.nickname.trim().toLowerCase(), formData.password);
          router.push('/profile');
        } catch (loginError) {
          console.error('Auto login failed:', loginError);
          router.push('/nickname');
        }
      }
    } catch (error) {
      console.error('Register error:', error);
      if (error.response?.data?.error) {
        const errorMessage = error.response.data.error;
        
        // Check if it's a duplicate nickname error
        if (errorMessage.includes('nickname') || errorMessage.includes('kullanıcı adı') || errorMessage.includes('rumuz')) {
          setErrors({ 
            nickname: 'Bu kullanıcı adı zaten kullanılıyor. Aşağıdaki önerilerden birini seçebilirsiniz:',
            suggestions: nicknameSuggestions 
          });
          setShowSuggestions(true);
        } else {
          setErrors({ general: errorMessage });
        }
      } else {
        setErrors({ general: 'Kayıt olurken bir hata oluştu. Lütfen tekrar deneyin.' });
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
            ✨
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Hesap Oluştur
          </h2>
          <p className="text-gray-700">
            StoryChain'e katılın ve hikaye yazma macerasına başlayın!
          </p>
        </div>

        {/* Form Card - Vuexy Style */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200 p-8">
          {success ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-400 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                ✓
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Hesap Başarıyla Oluşturuldu!
              </h3>
              <p className="text-gray-700 mb-6">
                Otomatik olarak giriş yapılıyor...
              </p>
              <div className="animate-spin w-8 h-8 border-4 border-purple-400 border-t-transparent rounded-full mx-auto"></div>
            </div>
          ) : (
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
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-600 text-lg">👤</span>
                  </div>
                  <input
                    id="nickname"
                    name="nickname"
                    type="text"
                    value={formData.nickname}
                    onChange={handleChange}
                    style={{ color: '#000000 !important', backgroundColor: '#ffffff !important', textIndent: '0 !important' }}
                    className={`flex-1 py-4 px-4 bg-white border rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
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
              
              {/* Nickname Suggestions */}
              {showSuggestions && nicknameSuggestions.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">💡 Benzer kullanıcı adı önerileri:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {nicknameSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => selectSuggestion(suggestion)}
                        className="px-3 py-2 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors border border-purple-200 hover:border-purple-300"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
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
                  <div className="relative flex-1">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      style={{ color: '#000000 !important', backgroundColor: '#ffffff !important', textIndent: '0 !important' }}
                      className={`w-full pr-12 py-4 px-4 bg-white border rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
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
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900 mb-3">
                  Şifre Tekrarı
                </label>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-600 text-lg">🔐</span>
                  </div>
                  <div className="relative flex-1">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      style={{ color: '#000000 !important', backgroundColor: '#ffffff !important', textIndent: '0 !important' }}
                      className={`w-full pr-12 py-4 px-4 bg-white border rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                        errors.confirmPassword 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      placeholder="Şifrenizi tekrar girin"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
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
            <p className="text-gray-700">
              Zaten hesabınız var mı?{' '}
              <Link 
                href="/nickname" 
                className="text-purple-600 hover:text-purple-700 font-semibold transition-colors duration-300"
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
            className="text-gray-600 hover:text-gray-900 transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <span>←</span>
            <span>Ana Sayfaya Dön</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
