import Link from "next/link";

// GÜVENLİK ÖNLEMİ: Eski footer devre dışı
export const __LEGACY_FOOTER_DISABLED__ = true;

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200 mt-16">
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4
                        flex flex-col sm:flex-row items-center justify-between gap-3
                        text-sm text-slate-400">
          <span>© {new Date().getFullYear()} StoryChain. Tüm hakları saklıdır.</span>

          {/* SAĞ ALTA SADECE BU İKİ LİNK */}
          <div className="flex gap-6">
            <Link href="/gizlilik" className="hover:underline">Gizlilik Politikası</Link>
            <Link href="/kullanim-sartlari" className="hover:underline">Kullanım Şartları</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
