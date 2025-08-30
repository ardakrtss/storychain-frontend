'use client';

import { useAuth } from '../contexts/AuthContext';
import MagicalHero from '../components/MagicalHero';
import Themes from '../components/Themes';
import Stories from '../components/Stories';

export default function HomePage() {
  const { user, loading } = useAuth();

  // Loading durumunda basit loading göster
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <MagicalHero />
      {user && <Themes />}
      <Stories />
    </div>
  );
}
