'use client';

import { useState } from 'react';
import Link from 'next/link';
import { resetPassword } from '../../lib/firebase-auth';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Email adresi gereklidir');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Geçerli bir email adresi giriniz');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const result = await resetPassword(email.trim().toLowerCase());
      if (result.success) {
        setMessage('Şifre sıfırlama emaili gönderildi. Lütfen email adresinizi kontrol edin.');
      } else {
        setError(result.error);
      }
    } catch (error) {
      console.error('Reset password error:', error);
      setError('Şifre sıfırlama işlemi başarısız oldu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-2xl">
            🔑
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Şifremi Unuttum
          </h2>
          <p className="text-gray-700">
            Email adresinizi girin, şifre sıfırlama bağlantısı gönderelim.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-100 border border-red-300 rounded-xl p-4 text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Success Message */}
            {message && (
              <div className="bg-green-100 border border-green-300 rounded-xl p-4 text-green-700 text-sm">
                {message}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ color: '#000000 !important', backgroundColor: '#ffffff !important', textIndent: '0 !important' }}
                  className="flex-1 py-4 px-4 bg-white border border-gray-300 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="Email adresinizi girin"
                />
              </div>
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
                  Gönderiliyor...
                </div>
              ) : (
                "Şifre Sıfırlama Emaili Gönder"
              )}
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 space-y-4 text-center">
            <p className="text-gray-600">
              <Link href="/nickname" className="text-purple-600 hover:text-purple-700 font-medium">
                ← Giriş sayfasına dön
              </Link>
            </p>
            <p className="text-gray-600">
              Hesabınız yok mu?{" "}
              <Link href="/kaydol" className="text-purple-600 hover:text-purple-700 font-medium">
                Kayıt Olun
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
