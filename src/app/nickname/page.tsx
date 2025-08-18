'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function NicknamePage() {
  const [nickname, setNickname] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nickname.trim()) {
      setError('Lütfen bir rumuz girin!');
      return;
    }

    if (nickname.trim().length < 2) {
      setError('Rumuz en az 2 karakter olmalıdır!');
      return;
    }

    if (nickname.trim().length > 20) {
      setError('Rumuz en fazla 20 karakter olabilir!');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const result = await signIn(nickname.trim());
      if (result.success) {
        router.push('/themes');
      } else {
        setError(result.error || 'Bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } catch (error) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
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
            <span className="text-white text-3xl">✏️</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            StoryChain&apos;e Hoş Geldin!
          </h2>
          <p className="text-gray-600">
            Hikaye yazmaya başlamak için rumuzunu gir
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nickname Input */}
            <div>
              <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mb-2">
                Rumuzun
              </label>
              <input
                id="nickname"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                placeholder="Örn: Hikayeci_Ali"
                maxLength={20}
                disabled={isSubmitting}
              />
              <p className="text-sm text-gray-500 mt-1">
                {nickname.length}/20 karakter
              </p>
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
              disabled={isSubmitting || !nickname.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Giriş yapılıyor...
                </>
              ) : (
                <>
                  <span>🚀</span>
                  Hikaye Yazmaya Başla
                </>
              )}
            </button>
          </form>

          {/* Info Section */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs">💡</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Nasıl Çalışır?</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Rumuzunu gir ve hemen başla</li>
                    <li>• 6 farklı temadan birini seç</li>
                    <li>• 1000 karakterlik bölümler yaz</li>
                    <li>• 5 yazar birlikte hikaye tamamlar</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="mt-6 text-center">
            <Link 
              href="/how-it-works" 
              className="text-purple-600 hover:text-purple-700 font-semibold text-sm"
            >
              Detaylı bilgi için tıkla →
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-gray-500 text-sm">
            Rumuzunu girdiğinde, hikaye yazma macerana başlayabilirsin!
          </p>
        </div>
      </div>
    </div>
  );
}
