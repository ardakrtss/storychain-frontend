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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Sol açıklama */}
        <div>
          <div className="flex items-center gap-2 text-white text-2xl font-extrabold">
            <span>📝</span> StoryChain
          </div>
          <p className="mt-3 text-slate-300">
            İlkokul öğrencileri için tasarlanmış paylaşımlı hikaye yazma platformu.
            Hayal gücünü serbest bırak ve arkadaşlarınla birlikte harika hikayeler yarat!
          </p>
          <div className="mt-3 text-2xl">📚 🎨 ✨ 🚀</div>
        </div>

        {/* Hızlı Linkler */}
        <div>
          <h4 className="text-white text-xl font-bold">Hızlı Linkler</h4>
          <ul className="mt-3 space-y-3">
            <li><Link href="/" className="hover:underline">Ana Sayfa</Link></li>
            <li><Link href="/temalar" className="hover:underline">Temalar</Link></li>
            <li><Link href="/hikayeler" className="hover:underline">Hikayeler</Link></li>
            <li><Link href="/liderlik" className="hover:underline">Lider Tablosu</Link></li>
            <li><Link href="/nasil-calisir" className="hover:underline">Nasıl Çalışır</Link></li>
          </ul>
        </div>

        {/* Destek */}
        <div>
          <h4 className="text-white text-xl font-bold">Destek</h4>
          <ul className="mt-3 space-y-3">
            <li><Link href="/hakkimizda" className="hover:underline">Hakkımızda</Link></li>
            <li><Link href="/iletisim" className="hover:underline">İletişim</Link></li>
            <li><Link href="/kullanim-sartlari" className="hover:underline">Kullanım Şartları</Link></li>
            <li><Link href="/gizlilik" className="hover:underline">Gizlilik Politikası</Link></li>
          </ul>
        </div>
      </div>

      {/* Alt özellik kartları */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MiniCard emoji="👥" title="Paylaşımlı Yazım" desc="5 yazar birlikte" />
        <MiniCard emoji="🎯" title="6 Tema" desc="Farklı dünyalar" />
        <MiniCard emoji="📝" title="1000 Karakter" desc="Her bölüm için" />
        <MiniCard emoji="❤️" title="Beğeni Sistemi" desc="En iyi hikayeler" />
      </div>

      {/* Copy row */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between text-sm text-slate-400">
          <span>© {new Date().getFullYear()} StoryChain. Tüm hakları saklıdır.</span>
          <div className="flex gap-6">
            <span>Güvenli</span><span>Eğitici</span><span>Eğlenceli</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
