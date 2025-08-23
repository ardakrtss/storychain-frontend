'use client';

import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Hakkımızda
            </span>
          </h1>
          <p className="text-xl text-gray-300">
            StoryChain'in hikayesi ve vizyonu
          </p>
        </div>

        {/* Content */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 mb-8">
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-white mb-6">StoryChain Nedir?</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              StoryChain, yazarların birlikte hikaye yazabileceği yenilikçi bir platformdur. 
              Her yazar, hikayenin bir bölümünü yazarak kolektif bir yaratım sürecine katılır.
            </p>
            
            <h3 className="text-xl font-bold text-white mb-4">Misyonumuz</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Hayal gücünü serbest bırakarak, yazarları bir araya getirmek ve 
              birlikte benzersiz hikayeler yaratmak için çalışıyoruz.
            </p>
            
            <h3 className="text-xl font-bold text-white mb-4">Vizyonumuz</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Dünyanın en büyük kolektif hikaye yazma topluluğu olmak ve 
              herkesin yaratıcılığını keşfetmesine yardımcı olmak.
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
