'use client';

import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Kullanım Şartları
            </span>
          </h1>
          <p className="text-xl text-gray-300">
            StoryChain platform kullanım şartları
          </p>
        </div>

        {/* Content */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 mb-8">
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-white mb-6">Genel Kurallar</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              StoryChain platformunu kullanarak aşağıdaki kuralları kabul etmiş sayılırsınız.
            </p>
            
            <h3 className="text-xl font-bold text-white mb-4">1. İçerik Kuralları</h3>
            <ul className="text-gray-300 mb-6 space-y-2">
              <li>• Uygunsuz, zararlı veya yasadışı içerik paylaşmayın</li>
              <li>• Telif hakkı ihlali yapmayın</li>
              <li>• Başkalarının haklarına saygı gösterin</li>
              <li>• Spam veya reklam içerikli yazılar yazmayın</li>
            </ul>
            
            <h3 className="text-xl font-bold text-white mb-4">2. Topluluk Kuralları</h3>
            <ul className="text-gray-300 mb-6 space-y-2">
              <li>• Diğer kullanıcılara saygılı olun</li>
              <li>• Taciz, hakaret veya ayrımcılık yapmayın</li>
              <li>• Yapıcı eleştiriler yapın</li>
              <li>• Topluluk kurallarına uyun</li>
            </ul>
            
            <h3 className="text-xl font-bold text-white mb-4">3. Hesap Güvenliği</h3>
            <ul className="text-gray-300 mb-6 space-y-2">
              <li>• Hesap bilgilerinizi güvende tutun</li>
              <li>• Şifrenizi kimseyle paylaşmayın</li>
              <li>• Şüpheli aktiviteleri bildirin</li>
            </ul>
            
            <h3 className="text-xl font-bold text-white mb-4">4. Sorumluluk Reddi</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              StoryChain, kullanıcıların paylaştığı içeriklerden sorumlu değildir. 
              Her kullanıcı kendi içeriğinden sorumludur.
            </p>
            
            <h3 className="text-xl font-bold text-white mb-4">5. Değişiklikler</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Bu kullanım şartları önceden haber verilmeksizin değiştirilebilir. 
              Güncel şartları takip etmek kullanıcının sorumluluğundadır.
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link 
            href="/" 
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
}
