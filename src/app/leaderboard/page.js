'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Link from 'next/link';
import api from '../../lib/api';

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // Backend'de leaderboard endpoint'i yoksa mock data kullanacağız
        const mockLeaderboard = [
          {
            id: 1,
            nickname: 'Hikayeci_Ali',
            stories_written: 15,
            total_likes: 127,
            rank: 1
          },
          {
            id: 2,
            nickname: 'Yıldız_Yazar',
            stories_written: 12,
            total_likes: 98,
            rank: 2
          },
          {
            id: 3,
            nickname: 'Çevreci_Mert',
            stories_written: 8,
            total_likes: 76,
            rank: 3
          },
          {
            id: 4,
            nickname: 'Fantastik_Elif',
            stories_written: 10,
            total_likes: 65,
            rank: 4
          },
          {
            id: 5,
            nickname: 'Macera_Can',
            stories_written: 6,
            total_likes: 54,
            rank: 5
          },
          {
            id: 6,
            nickname: 'Gizem_Zeynep',
            stories_written: 9,
            total_likes: 43,
            rank: 6
          },
          {
            id: 7,
            nickname: 'Bilim_Ahmet',
            stories_written: 7,
            total_likes: 38,
            rank: 7
          },
          {
            id: 8,
            nickname: 'SıfırAtık_Leyla',
            stories_written: 5,
            total_likes: 32,
            rank: 8
          }
        ];

        setLeaderboard(mockLeaderboard);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setError('Lider tablosu yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `#${rank}`;
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 2:
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 3:
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-white text-gray-900 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-2xl text-gray-900">Lider tablosu yükleniyor...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Hata</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🏆 Lider Tablosu
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            En çok hikaye yazan ve en çok beğenilen yazarlarımızı keşfet!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          {user ? (
            <Link 
              href="/themes" 
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              ✏️ Yeni Hikaye Yaz
            </Link>
          ) : (
            <Link 
              href="/nickname" 
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              ✏️ Hikaye Yazmaya Başla
            </Link>
          )}
          
          <Link 
            href="/stories" 
            className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            📚 Hikayeleri Keşfet
          </Link>
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4">
            <div className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-1 text-center font-semibold">Sıra</div>
              <div className="col-span-4 font-semibold">Yazar</div>
              <div className="col-span-3 text-center font-semibold">Hikaye Sayısı</div>
              <div className="col-span-3 text-center font-semibold">Toplam Beğeni</div>
              <div className="col-span-1 text-center font-semibold">Puan</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {leaderboard.map((player, index) => (
              <div 
                key={player.id} 
                className={`px-6 py-4 hover:bg-gray-50 transition-colors ${getRankColor(player.rank)}`}
              >
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* Rank */}
                  <div className="col-span-1 text-center">
                    <span className="text-2xl font-bold">
                      {getRankIcon(player.rank)}
                    </span>
                  </div>

                  {/* Player Name */}
                  <div className="col-span-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                        {player.nickname.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {player.nickname}
                        </div>
                        {user && user.nickname === player.nickname && (
                          <div className="text-xs text-purple-600 font-medium">Sen!</div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Stories Written */}
                  <div className="col-span-3 text-center">
                    <div className="text-lg font-semibold text-gray-900">
                      {player.stories_written}
                    </div>
                    <div className="text-sm text-gray-500">hikaye</div>
                  </div>

                  {/* Total Likes */}
                  <div className="col-span-3 text-center">
                    <div className="text-lg font-semibold text-gray-900">
                      {player.total_likes}
                    </div>
                    <div className="text-sm text-gray-500">❤️ beğeni</div>
                  </div>

                  {/* Score */}
                  <div className="col-span-1 text-center">
                    <div className="text-lg font-bold text-purple-600">
                      {player.stories_written * 10 + player.total_likes}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Puan Hesaplama</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="text-center">
              <div className="text-2xl mb-2">📝</div>
              <p className="font-semibold">Hikaye Yazma</p>
              <p>Her hikaye: 10 puan</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">❤️</div>
              <p className="font-semibold">Beğeni Alma</p>
              <p>Her beğeni: 1 puan</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🏆</div>
              <p className="font-semibold">Toplam Puan</p>
              <p>Hikaye × 10 + Beğeni</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
