"use client";
import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  Heart,
  Search,
  Sparkles,
  Calendar,
  Timer,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getAllStories, getCompletedStories, getOngoingStories } from "../../lib/firebase-stories";
import { useAuth } from "../../contexts/AuthContext";

/* ====== Tema / Yardımcılar ====== */
const THEMES = [
  { key: "hepsi", label: "Tümü" },
  { key: "macera", label: "Macera" },
  { key: "gizem", label: "Gizem" },
  { key: "fantastik", label: "Fantastik" },
  { key: "bilim-kurgu", label: "Bilim Kurgu" },
  { key: "sifir-atik", label: "Sıfır Atık" },
  { key: "iklim", label: "İklim Değişikliği" },
];

const THEME_COLORS = {
  macera: "bg-orange-100 text-orange-800 ring-orange-200",
  gizem: "bg-violet-100 text-violet-800 ring-violet-200",
  fantastik: "bg-pink-100 text-pink-800 ring-pink-200",
  "bilim-kurgu": "bg-sky-100 text-sky-800 ring-sky-200",
  "sifir-atik": "bg-emerald-100 text-emerald-800 ring-emerald-200",
  iklim: "bg-lime-100 text-lime-800 ring-lime-200",
  hepsi: "bg-slate-100 text-slate-800 ring-slate-200",
};

function timeAgo(timestamp) {
  if (!timestamp) return "az önce";
  
  const d = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  const diff = (Date.now() - d.getTime()) / 1000;
  if (diff < 60) return "az önce";
  if (diff < 3600) return `${Math.floor(diff / 60)} dk önce`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} sa önce`;
  return d.toLocaleDateString("tr-TR");
}

/* ====== Sayfa ====== */
export default function StoriesPage() {
  const { user } = useAuth();
  
  // filtreler
  const [q, setQ] = useState("");
  const [theme, setTheme] = useState("hepsi");
  const [sort, setSort] = useState("latest"); // latest | liked | parts
  const [filter, setFilter] = useState("all"); // all | completed | ongoing
  const [page, setPage] = useState(1);
  const pageSize = 9;

  // veri
  const [loading, setLoading] = useState(true);
  const [stories, setStories] = useState([]);
  const [error, setError] = useState("");

  // Hikayeleri yükle
  useEffect(() => {
    const loadStories = async () => {
      try {
        setLoading(true);
        setError("");
        
        let result;
        switch (filter) {
          case "completed":
            result = await getCompletedStories();
            break;
          case "ongoing":
            result = await getOngoingStories();
            break;
          default:
            result = await getAllStories();
        }
        
        if (result.success) {
          setStories(result.stories);
        } else {
          setError(result.error || "Hikayeler yüklenirken bir hata oluştu");
        }
      } catch (error) {
        console.error('Load stories error:', error);
        setError("Hikayeler yüklenirken beklenmeyen bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    loadStories();
  }, [filter]);

  // filtreleme + arama + sıralama
  const filtered = useMemo(() => {
    let arr = [...stories];
    
    // Tema filtresi
    if (theme !== "hepsi") {
      arr = arr.filter((s) => s.theme === theme);
    }
    
    // Arama filtresi
    if (q.trim()) {
      const needle = q.trim().toLowerCase();
      arr = arr.filter(
        (s) =>
          s.title.toLowerCase().includes(needle) ||
          s.authorName?.toLowerCase().includes(needle) ||
          (s.segments && s.segments[0]?.content?.toLowerCase().includes(needle))
      );
    }
    
    // Sıralama
    switch (sort) {
      case "liked":
        arr.sort((a, b) => (b.likeCount || 0) - (a.likeCount || 0));
        break;
      case "parts":
        arr.sort((a, b) => (b.segments?.length || 0) - (a.segments?.length || 0));
        break;
      case "latest":
      default:
        arr.sort((a, b) => {
          const aTime = a.updatedAt?.toDate?.() || a.updatedAt || a.createdAt?.toDate?.() || a.createdAt;
          const bTime = b.updatedAt?.toDate?.() || b.updatedAt || b.createdAt?.toDate?.() || b.createdAt;
          return new Date(bTime) - new Date(aTime);
        });
    }
    
    return arr;
  }, [stories, q, theme, sort]);

  // sayfalama
  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  const totalPages = Math.ceil(filtered.length / pageSize);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Hikaye Koleksiyonu
          </h1>
          <p className="text-xl text-gray-600">
            Diğer yazarların hikayelerini keşfet ve katkıda bulun
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-300 rounded-xl p-4 text-red-700 mb-6">
            {error}
          </div>
        )}

        {/* Filtreler */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Arama */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Hikaye ara..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Tema Filtresi */}
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {THEMES.map((t) => (
                <option key={t.key} value={t.key}>
                  {t.label}
                </option>
              ))}
            </select>

            {/* Durum Filtresi */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">Tüm Hikayeler</option>
              <option value="ongoing">Devam Eden</option>
              <option value="completed">Tamamlanan</option>
            </select>

            {/* Sıralama */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="latest">En Yeni</option>
              <option value="liked">En Beğenilen</option>
              <option value="parts">En Çok Bölüm</option>
            </select>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Hikayeler yükleniyor...</p>
          </div>
        )}

        {/* Hikaye Listesi */}
        {!loading && (
          <>
            {paginated.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Hikaye Bulunamadı</h3>
                <p className="text-gray-600 mb-6">
                  {q.trim() || theme !== "hepsi" || filter !== "all"
                    ? "Arama kriterlerinize uygun hikaye bulunamadı."
                    : "Henüz hiç hikaye yok. İlk hikayeyi sen yaz!"}
                </p>
                <a
                  href="/write"
                  className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-200"
                >
                  Hikaye Yazmaya Başla
                </a>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {paginated.map((story) => (
                    <div
                      key={story.id}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      {/* Header */}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${
                              THEME_COLORS[story.theme] || THEME_COLORS.hepsi
                            }`}
                          >
                            {THEMES.find(t => t.key === story.theme)?.label || story.theme}
                          </span>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Heart className="h-4 w-4" />
                            <span>{story.likeCount || 0}</span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                          {story.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {story.segments && story.segments.length > 0
                            ? story.segments[0].content.substring(0, 150) + "..."
                            : "Henüz içerik yok..."}
                        </p>

                        {/* Stats */}
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <BookOpen className="h-4 w-4" />
                              {story.segments?.length || 0}/{story.maxSegments || 3}
                            </span>
                            <span className="flex items-center gap-1">
                              <Sparkles className="h-4 w-4" />
                              {story.segments?.reduce((total, seg) => total + (seg.content?.length || 0), 0) || 0} karakter
                            </span>
                          </div>
                        </div>

                        {/* Author & Time */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                              {story.authorName?.charAt(0) || "?"}
                            </div>
                            <span className="text-sm font-medium text-gray-900">
                              {story.authorName || "Anonim"}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Calendar className="h-3 w-3" />
                            <span>{timeAgo(story.updatedAt || story.createdAt)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <span className={`text-sm font-medium ${
                            story.isComplete ? 'text-green-600' : 'text-orange-600'
                          }`}>
                            {story.isComplete ? '✅ Tamamlandı' : '⏳ Devam Ediyor'}
                          </span>
                          <a
                            href={`/stories/${story.id}`}
                            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-200"
                          >
                            {story.isComplete ? 'Oku' : 'Devam Et'}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    
                    <span className="px-4 py-2 text-sm text-gray-600">
                      Sayfa {page} / {totalPages}
                    </span>
                    
                    <button
                      onClick={() => setPage(Math.min(totalPages, page + 1))}
                      disabled={page === totalPages}
                      className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="/write"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Sparkles className="h-5 w-5" />
            Yeni Hikaye Başlat
          </a>
        </div>
      </div>
    </div>
  );
}
