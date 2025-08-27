"use client";
import { useState } from "react";
import { Mail, MapPin, Instagram, Twitter, Facebook, Youtube, ShieldCheck, Heart, Handshake } from "lucide-react";

export default function IletisimPage() {
  const [message, setMessage] = useState("");
  const remaining = 500 - message.length;

  return (
    <main className="min-h-screen bg-white">

      {/* HERO */}
      <section className="relative bg-gradient-to-r from-pink-50 to-purple-50 rounded-b-3xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold">
            <span className="bg-gradient-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent">
              Bizimle İletişime Geç
            </span>
          </h1>
          <p className="mt-3 text-gray-700 max-w-3xl mx-auto">
            Sorularınız, önerileriniz veya hikaye yazma maceranızla ilgili her türlü konuda size yardımcı olmaktan mutluluk duyarız!
          </p>

          {/* Rozetler */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Badge icon={<ShieldCheck className="w-4 h-4 text-green-600" />} text="24 Saat İçinde Yanıt" />
            <Badge icon={<Handshake className="w-4 h-4 text-sky-600" />} text="Güvenli İletişim" />
            <Badge icon={<Heart className="w-4 h-4 text-pink-600" />} text="Dostça Yaklaşım" />
          </div>
        </div>
      </section>

      {/* FORM + İLETİŞİM */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* MESAJ GÖNDER */}
        <div className="rounded-2xl bg-white p-6 shadow">
          <h2 className="text-2xl font-extrabold">Mesaj Gönder</h2>
          <p className="text-gray-600 mt-1">Aklınızdaki her şeyi bizimle paylaşın!</p>

          <form className="mt-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                placeholder="Adın ve soyadın"
                className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <input
                type="email"
                placeholder="ornek@email.com"
                className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <select className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400">
              <option>Konu seçin</option>
              <option>Genel Soru</option>
              <option>Geri Bildirim</option>
              <option>Hata Bildirme</option>
              <option>İş Birliği</option>
            </select>

            <div>
              <textarea
                value={message}
                onChange={(e)=>setMessage(e.target.value.slice(0,500))}
                rows={6}
                placeholder="Mesajınızı buraya yazın..."
                className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <div className="text-right text-xs text-gray-500">{remaining}/500 karakter</div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white py-2.5 font-semibold shadow hover:opacity-95"
            >
              Mesajı Gönder
            </button>
          </form>
        </div>

        {/* İLETİŞİM BİLGİLERİ */}
        <aside className="rounded-2xl bg-gradient-to-b from-pink-50 to-purple-50 p-6 shadow">
          <h3 className="text-2xl font-extrabold text-center">İletişim Bilgileri</h3>

          <div className="mt-5 space-y-4">
            <InfoRow
              icon={<Mail className="text-sky-600" />}
              title="E-posta"
              value="storyychain@gmail.com"
              desc="Sorularınız için bize yazın"
            />
            <InfoRow
              icon={<MapPin className="text-purple-600" />}
              title="Adres"
              value="Uşak/Türkiye"
              desc="Merkez ofisimiz"
            />
          </div>

          {/* SOSYAL MEDYA */}
          <div className="mt-8">
            <div className="text-center font-semibold text-gray-800 mb-3">Sosyal Medya</div>
            <div className="flex justify-center gap-3">
              <Social icon={<Instagram className="w-5 h-5" />} />
              <Social icon={<Twitter className="w-5 h-5" />} />
              <Social icon={<Facebook className="w-5 h-5" />} />
              <Social icon={<Youtube className="w-5 h-5" />} />
            </div>
          </div>
        </aside>
      </section>

      {/* SSS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-12 mb-14">
        <div className="rounded-2xl bg-white p-6 shadow">
          <h3 className="text-xl font-extrabold mb-4">Sık Sorulan Sorular</h3>
          <div className="space-y-3">
            <Faq q="Platform ücretsiz mi?" a="Evet! StoryChain tamamen ücretsiz olarak kullanılabilir." />
            <Faq q="Kaç yaş için uygun?" a="Platform 6–12 yaş arası çocuklar için özel olarak tasarlandı." />
            <Faq q="Hikayeler güvenli mi?" a="Evet, tüm içerikler moderasyon sürecinden geçer." />
            <Faq q="Nasıl başlarım?" a="Kayıt olduktan sonra hemen hikaye yazmaya başlayabilirsin!" />
          </div>

          <div className="text-center mt-6">
            <button className="inline-flex items-center gap-2 rounded-full bg-purple-600 text-white px-5 py-2.5 font-semibold shadow hover:bg-purple-700">
              Bize Sorun
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---- Yardımcı Bileşenler ---- */
function Badge({ icon, text }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white shadow px-4 py-2 text-sm">
      {icon}
      <span className="text-gray-800">{text}</span>
    </span>
  );
}

function InfoRow({ icon, title, value, desc }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm">
      <div className="h-10 w-10 rounded-xl bg-white shadow flex items-center justify-center">{icon}</div>
      <div>
        <div className="font-semibold text-gray-800">{title}</div>
        <div className="text-sm text-gray-800">{value}</div>
        <div className="text-xs text-gray-500">{desc}</div>
      </div>
    </div>
  );
}

function Social({ icon }) {
  return (
    <button className="h-10 w-10 rounded-full bg-white shadow flex items-center justify-center hover:scale-105 transition">
      {icon}
    </button>
  );
}

function Faq({ q, a }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <div className="px-4 py-3 font-semibold text-gray-800">{q}</div>
      <div className="px-4 pb-3 text-gray-600 text-sm">{a}</div>
    </div>
  );
}
