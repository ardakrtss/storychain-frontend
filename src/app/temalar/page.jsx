// app/temalar/page.jsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";

// Ana sayfada kullandığın görsellerle birebir aynı dosya adlarını koy.
// public/images/ içine:
// adventure.svg, mystery.svg, fantasy.svg, scifi.svg, zero-waste.svg, climate.svg
const THEMES = [
  { key: "macera",       title: "Macera",            img: "/images/adventure.svg" },
  { key: "gizem",        title: "Gizem",             img: "/images/mystery.svg" },
  { key: "fantastik",    title: "Fantastik",         img: "/images/fantasy.svg" },
  { key: "bilim-kurgu",  title: "Bilim Kurgu",       img: "/images/scifi.svg" },
  { key: "sifir-atik",   title: "Sıfır Atık",        img: "/images/zero-waste.svg" },
  { key: "iklim",        title: "İklim Değişikliği", img: "/images/climate.svg" },
];

export default function TemalarPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50/40 to-pink-50/40">
      {/* HERO (diğer sayfalarla aynı dil) */}
      <section className="rounded-b-3xl bg-gradient-to-r from-sky-50 to-purple-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white shadow">
            <Sparkles className="h-7 w-7" />
          </div>
          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold">Temanı Seç</h1>
          <p className="mt-2 text-gray-700">
            Ana sayfadaki tema kartlarıyla birebir aynı görünümler. Birini seç ve yazmaya başla!
          </p>
        </div>
      </section>

      {/* TEMA KARTLARI */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {THEMES.map((t) => (
            <ThemeCard key={t.key} theme={t} />
          ))}
        </div>
      </section>
    </main>
  );
}

/* ---------- Ana sayfadaki kartlarla aynı stil/etkileşim ---------- */
function ThemeCard({ theme }) {
  const href = `/hikaye-yaz?tema=${encodeURIComponent(theme.key)}`;
  return (
    <Link
      href={href}
      className="group block rounded-2xl overflow-hidden bg-white shadow-lg ring-1 ring-black/5
                 hover:shadow-2xl transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-300"
    >
      <div className="relative h-48 sm:h-56">
        <Image
          src={theme.img}
          alt={`${theme.title} teması`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority={false}
        />
        {/* Yazıyı öne çıkaran gradient örtü (anasayfadaki gibi) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="text-white drop-shadow text-xl font-extrabold">{theme.title}</h3>
          <p className="text-white/90 text-xs">Seç ve yazmaya başla</p>
        </div>
      </div>

      <div className="p-4 flex items-center justify-between">
        <span className="inline-flex items-center rounded-full bg-slate-50 text-slate-700 text-xs font-semibold px-3 py-1 ring-1 ring-black/5">
          {prettyKey(theme.key)}
        </span>
        <span className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-3 py-2 text-sm font-semibold text-white shadow group-hover:opacity-95">
          Seç ve Yaz
        </span>
      </div>
    </Link>
  );
}

function prettyKey(key) {
  // Ana sayfadaki başlıklarla aynı metin
  switch (key) {
    case "macera": return "Macera";
    case "gizem": return "Gizem";
    case "fantastik": return "Fantastik";
    case "bilim-kurgu": return "Bilim Kurgu";
    case "sifir-atik": return "Sıfır Atık";
    case "iklim": return "İklim Değişikliği";
    default: return key;
  }
}
