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

function timeAgo(iso) {
  const d = new Date(iso);
  const diff = (Date.now() - d.getTime()) / 1000;
  if (diff < 60) return "az önce";
  if (diff < 3600) return `${Math.floor(diff / 60)} dk önce`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} sa önce`;
  return d.toLocaleDateString("tr-TR");
}

/* ====== Sayfa ====== */
export default function StoriesPage() {
  // filtreler
  const [q, setQ] = useState("");
  const [theme, setTheme] = useState("hepsi");
  const [sort, setSort] = useState("latest"); // latest | liked | parts
  const [page, setPage] = useState(1);
  const pageSize = 9;

  // veri
  const [loading, setLoading] = useState(true);
  const [stories, setStories] = useState([]);

  /* === DEMO VERİ ===
     → Burayı kendi API'nle değiştir (ör. fetch("/api/stories?...")) */
  useEffect(() => {
    setLoading(true);
    const sample = Array.from({ length: 28 }).map((_, i) => ({
      id: String(i + 1),
      title: [
        "Gökkuşağı Köprüsünün Sırrı",
        "Zamanda Kayıp Not Defteri",
        "Ormanın Fısıltısı",
        "Mars'taki İlk Kamp",
        "Deniz Feneri ve Minik Ejder",
      ][i % 5],
      excerpt:
        [
          "Köprünün taşlarında parıldayan işaretler bir anda canlandı...",
          "Notların arasında açılan minik kapı başka bir güne işaret ediyordu...",
          "Rüzgâr her yaprağa bambaşka bir hikâye anlattı...",
          "Ufuk çizgisi turuncuya dönerken kamp ateşi garip bir ses çıkardı...",
          "Fenerin ışığı, gökyüzündeki minik ejderin pullarında dans etti...",
        ][i % 5] + " Devamını birlikte yazalım!",
      theme: THEMES[(i % (THEMES.length - 1)) + 1].key,
      likes: 25 + (i * 7) % 200,
      parts: 3 + (i % 10),
      words: 800 + ((i * 97) % 1200),
      updatedAt: new Date(Date.now() - i * 2 * 3600_000).toISOString(),
      emoji: ["🌈", "📓", "🌲", "🚀", "🐉"][i % 5],
      author: ["Elif", "Deniz", "Arda", "Zeynep", "Can"][i % 5],
    }));
    const t = setTimeout(() => {
      setStories(sample);
      setLoading(false);
    }, 350);
    return () => clearTimeout(t);
  }, []);

  // filtreleme + arama + sıralama
  const filtered = useMemo(() => {
    let arr = [...stories];
    if (theme !== "hepsi") arr = arr.filter((s) => s.theme === theme);
    if (q.trim()) {
      const needle = q.trim().toLowerCase();
      arr = arr.filter(
        (s) =>
          s.title.toLowerCase().includes(needle) ||
          s.author.toLowerCase().includes(needle) ||
          s.excerpt.toLowerCase().includes(needle)
      );
    }
    if (sort === "latest") arr.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    if (sort === "liked") arr.sort((a, b) => b.likes - a.likes);
    if (sort === "parts") arr.sort((a, b) => b.parts - a.parts);
    return arr;
  }, [stories, q, theme, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  useEffect(() => setPage(1), [q, theme, sort]); // filtre değişince başa dön

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50/40 to-pink-50/40">
      {/* HERO */}
      <section className="rounded-b-3xl bg-gradient-to-r from-sky-50 to-purple-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white shadow">
            <BookOpen className="h-7 w-7" />
          </div>
          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold">Hikayeler</h1>
          <p className="mt-2 text-gray-700">
            Tüm hikayeleri keşfet, filtrele ve sevdiğini devam ettir. Hayal gücü burada büyür!
          </p>

          {/* Filtre Çubuğu */}
          <div className="mx-auto mt-6 max-w-5xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Başlık, yazar veya özetten ara..."
                  className="w-full rounded-xl border border-gray-300 bg-white/90 px-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
              </div>

              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="rounded-xl border border-gray-300 bg-white/90 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-300"
              >
                {THEMES.map((t) => (
                  <option key={t.key} value={t.key}>
                    {t.label}
                  </option>
                ))}
              </select>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-xl border border-gray-300 bg-white/90 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-300"
              >
                <option value="latest">En Yeni</option>
                <option value="liked">En Beğenilen</option>
                <option value="parts">En Çok Bölüm</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* LİSTE */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        {loading ? (
          <LoadingGrid />
        ) : filtered.length === 0 ? (
          <EmptyState query={q} />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {current.map((s) => (
                <StoryCard key={s.id} s={s} />
              ))}
            </div>

            {/* Sayfalama */}
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className={`flex items-center gap-1 rounded-xl px-3 py-2 text-sm ring-1 ring-black/10 shadow-sm ${
                  page === 1 ? "bg-gray-200 text-gray-500" : "bg-white hover:bg-slate-50"
                }`}
              >
                <ChevronLeft className="h-4 w-4" />
                Geri
              </button>
              <span className="text-sm text-gray-600">
                Sayfa <b>{page}</b> / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className={`flex items-center gap-1 rounded-xl px-3 py-2 text-sm ring-1 ring-black/10 shadow-sm ${
                  page === totalPages
                    ? "bg-gray-200 text-gray-500"
                    : "bg-white hover:bg-slate-50"
                }`}
              >
                İleri <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

/* ====== Kart Bileşenleri ====== */
function StoryCard({ s }) {
  const badge = THEME_COLORS[s.theme] || THEME_COLORS.hepsi;

  return (
    <article className="group rounded-2xl bg-white p-5 shadow-lg ring-1 ring-black/5 hover:shadow-xl transition">
      <div className="flex items-start justify-between">
        <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${badge}`}>
          <span>{s.emoji}</span>
          {labelOf(s.theme)}
        </div>
        <span className="inline-flex items-center gap-1 text-sm text-pink-600">
          <Heart className="h-4 w-4" />
          {s.likes}
        </span>
      </div>

      <h3 className="mt-3 line-clamp-2 text-xl font-extrabold text-gray-900">
        {s.title}
      </h3>
      <p className="mt-2 line-clamp-3 text-sm text-gray-700">{s.excerpt}</p>

      <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <Sparkles className="h-4 w-4 text-fuchsia-600" />
          {s.parts} bölüm
        </div>
        <div className="flex items-center gap-1">
          <Timer className="h-4 w-4 text-indigo-600" />
          {s.words.toLocaleString("tr-TR")} kelime
        </div>
        <div className="flex items-center gap-1 justify-end">
          <Calendar className="h-4 w-4 text-emerald-600" />
          {timeAgo(s.updatedAt)}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="text-xs text-gray-500">Yazar: <b>{s.author}</b></div>
        <div className="flex gap-2">
          <a
            href={`/hikaye/${s.id}`}
            className="rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-3 py-2 text-sm font-semibold text-white shadow hover:opacity-95"
          >
            Oku / Devam Et
          </a>
          <a
            href={`/hikaye/${s.id}#paylas`}
            className="rounded-xl ring-1 ring-black/10 bg-white px-3 py-2 text-sm font-semibold hover:bg-slate-50"
          >
            Paylaş
          </a>
        </div>
      </div>
    </article>
  );
}

function labelOf(key) {
  const t = THEMES.find((x) => x.key === key);
  return t ? t.label : "Tema";
}

/* ====== Yardımcı Bileşenler ====== */
function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          className="h-48 rounded-2xl bg-white shadow ring-1 ring-black/5 animate-pulse"
        />
      ))}
    </div>
  );
}

function EmptyState({ query }) {
  return (
    <div className="rounded-2xl bg-white p-10 text-center shadow ring-1 ring-black/5">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white shadow">
        <Search className="h-7 w-7" />
      </div>
      <h3 className="mt-4 text-xl font-extrabold">Sonuç bulunamadı</h3>
      <p className="mt-2 text-gray-600">
        {query
          ? `"${query}" için eşleşen hikaye yok. Farklı bir arama deneyebilirsin.`
          : "Henüz burada listelenecek hikaye yok gibi görünüyor."}
      </p>
      <div className="mt-4">
        <a
          href="/hikaye-yaz"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow hover:opacity-95"
        >
          <Sparkles className="h-4 w-4" />
          İlk hikayeyi sen başlat!
        </a>
      </div>
    </div>
  );
}
