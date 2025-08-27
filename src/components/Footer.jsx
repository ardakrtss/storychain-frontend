import Link from "next/link";

function MiniCard({ emoji, title, desc }) {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-5 text-center shadow-sm">
      <div className="text-2xl">{emoji}</div>
      <div className="mt-2 font-semibold text-white">{title}</div>
      <div className="text-sm text-slate-300">{desc}</div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200 mt-16">
      {/* Orta özellik kartları */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MiniCard emoji="👥" title="Paylaşımlı Yazım" desc="5 yazar birlikte" />
        <MiniCard emoji="🎯" title="6 Tema" desc="Farklı dünyalar" />
        <MiniCard emoji="📝" title="1000 Karakter" desc="Her bölüm için" />
        <MiniCard emoji="❤️" title="Beğeni Sistemi" desc="En iyi hikayeler" />
      </div>

      {/* Alt satır */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between text-sm text-slate-400">
          <span>© {new Date().getFullYear()} StoryChain. Tüm hakları saklıdır.</span>
          <div className="flex gap-6">
            <Link href="/gizlilik" className="hover:underline">Gizlilik Politikası</Link>
            <Link href="/kullanim-sartlari" className="hover:underline">Kullanım Şartları</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
