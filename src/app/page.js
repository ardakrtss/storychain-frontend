'use client';

import Hero from '../components/Hero';
import Themes from '../components/Themes';
import Stories from '../components/Stories';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      {/* Demo Uyarısı */}
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm">
              <strong>Demo Versiyonu:</strong> Bu demo versiyonunda kullanıcı verileri geçici olarak saklanır. 
              Server yeniden başlatıldığında veriler kaybolabilir. 
              <a href="/kaydol" className="font-medium underline hover:text-yellow-600 ml-1">
                Hemen kayıt ol ve test et!
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Mevcut içerik */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">StoryChain</h1>
        <p className="text-center text-lg mb-8">
          Birlikte hikayeler yazın, hayal gücünüzü paylaşın!
        </p>
        
        <div className="flex justify-center space-x-4">
          <Link 
            href="/kaydol" 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Kayıt Ol
          </Link>
          <Link 
            href="/giris" 
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Giriş Yap
          </Link>
        </div>
      </div>
    </div>
  );
}
