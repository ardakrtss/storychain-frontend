'use client';

import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Gizlilik Politikası
            </span>
          </h1>
          <p className="text-xl text-gray-300">
            Kişisel verilerinizin korunması
          </p>
        </div>

        {/* Content */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 mb-8">
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-white mb-6">Veri Toplama</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              StoryChain, hizmet kalitesini artırmak için sınırlı kişisel veri toplar.
            </p>
            
            <h3 className="text-xl font-bold text-white mb-4">Toplanan Veriler</h3>
            <ul className="text-gray-300 mb-6 space-y-2">
              <li>• Hesap bilgileri (rumuz, e-posta)</li>
              <li>• Yazdığınız hikaye içerikleri</li>
              <li>• Platform kullanım istatistikleri</li>
              <li>• Teknik veriler (IP adresi, tarayıcı bilgisi)</li>
            </ul>
            
            <h3 className="text-xl font-bold text-white mb-4">Veri Kullanımı</h3>
            <ul className="text-gray-300 mb-6 space-y-2">
              <li>• Hesap yönetimi ve güvenlik</li>
              <li>• Platform iyileştirmeleri</li>
              <li>• Kullanıcı deneyimi optimizasyonu</li>
              <li>• Yasal yükümlülüklerin yerine getirilmesi</li>
            </ul>
            
            <h3 className="text-xl font-bold text-white mb-4">Veri Güvenliği</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Kişisel verileriniz güvenli sunucularda saklanır ve şifrelenir. 
              Üçüncü taraflarla paylaşılmaz.
            </p>
            
            <h3 className="text-xl font-bold text-white mb-4">Çerezler</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Platform deneyimini iyileştirmek için çerezler kullanılır. 
              Tarayıcı ayarlarından çerezleri kontrol edebilirsiniz.
            </p>
            
            <h3 className="text-xl font-bold text-white mb-4">Haklarınız</h3>
            <ul className="text-gray-300 mb-6 space-y-2">
              <li>• Verilerinize erişim hakkı</li>
              <li>• Veri düzeltme hakkı</li>
              <li>• Veri silme hakkı</li>
              <li>• Veri işlemeye itiraz hakkı</li>
            </ul>
            
            <h3 className="text-xl font-bold text-white mb-4">İletişim</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Gizlilik ile ilgili sorularınız için: privacy@storychain.com.tr
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
