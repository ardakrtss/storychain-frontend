'use client';

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b border-white/40">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="h-6 w-6 rounded-full bg-gradient-to-br from-pink-500 via-orange-500 to-purple-600 block" />
          <span className="text-xl font-extrabold bg-gradient-to-r from-fuchsia-600 to-purple-600 bg-clip-text text-transparent">
            StoryChain
          </span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-gray-800 hover:text-gray-900">Ana Sayfa</Link>
          <Link href="/nasil-calisir" className="text-gray-800 hover:text-gray-900">
            Nasıl Çalışır?
          </Link>
          <Link href="/hakkimizda" className="text-gray-800 hover:text-gray-900">Hakkımızda</Link>
          <Link href="/iletisim" className="text-gray-800 hover:text-gray-900">İletişim</Link>
          <Link href="/giris" className="text-gray-700 hover:text-gray-900">Giriş Yap</Link>
          <Link
            href="/kaydol"
            className="rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 font-semibold shadow hover:opacity-90"
          >
            Kaydol
          </Link>
        </div>
      </nav>
    </header>
  );
}
