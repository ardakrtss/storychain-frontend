"use client";
import Link from "next/link";
import { BookOpen, Star, Users, Trophy, Clock, UserPlus, Gift, PenLine } from "lucide-react";

export default function NasilCalisirPage() {
  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section
        className="relative min-h-[60vh] flex items-center justify-center text-center"
        style={{
          backgroundImage: "url('/images/how-hero.jpg')", // buraya sonra kendi görselini koyacaksın
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/35"></div>
        <div className="relative z-10 max-w-3xl px-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
            Hikaye Yazmak
            <br />
            <span className="text-yellow-400">Çok Kolay!</span>
          </h1>
          <p className="mt-4 text-white/90">
            Sadece 4 basit adımda arkadaşlarınla birlikte muhteşem hikayeler yaratabilirsin
          </p>
          <div className="mt-6">
            <Link
              href="/kaydol"
              className="inline-flex items-center gap-2 rounded-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 font-semibold shadow"
            >
              <PenLine className="w-5 h-5" />
              Hemen Başla
            </Link>
          </div>
        </div>
      </section>

      {/* 4 ADIM */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 -mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StepCard
            number="1"
            icon={<BookOpen className="w-6 h-6 text-purple-600" />}
            title="Tema Seç"
            desc="Macera, Bilim Kurgu, Sıfır Atık, İklim Değişikliği gibi temalardan birini seç"
            tone="bg-purple-50"
          />
          <StepCard
            number="2"
            icon={<Star className="w-6 h-6 text-blue-600" />}
            title="Hikayeyi Başlat"
            desc="AI yardımcısından karakter ve olay örgüsü fikirleri al, sonra ilk bölümü yaz"
            tone="bg-blue-50"
          />
          <StepCard
            number="3"
            icon={<Users className="w-6 h-6 text-green-600" />}
            title="Arkadaşların Katılsın"
            desc="Diğer yazarlar sırayla hikayeyi devam ettirsin. Toplam 5 farklı yazar!"
            tone="bg-green-50"
          />
          <StepCard
            number="4"
            icon={<Trophy className="w-6 h-6 text-orange-600" />}
            title="Hikayeyi Tamamla"
            desc="Son bölüm yazıldığında harika bir ortak hikaye ortaya çıkar"
            tone="bg-orange-50"
          />
        </div>
      </section>

      {/* ÖRNEK HİKAYE SÜRECİ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-14">
        <h2 className="text-3xl font-extrabold text-center">Örnek Hikaye Süreci</h2>
        <p className="text-center text-gray-600 mt-2">
          İşte 5 farklı yazarın birlikte yarattığı bir hikaye örneği:
        </p>

        <div className="mt-8 rounded-2xl bg-purple-50 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          {/* Sol liste */}
          <div>
            <h3 className="font-extrabold text-xl">✨ "Büyülü Ormanın Sırrı" Hikayesi</h3>
            <ul className="mt-4 space-y-3">
              {[
                { no: 1, name: "Elif (9 yaş)", text: '"Bir zamanlar büyülü bir ormanda..."', color: "bg-purple-500" },
                { no: 2, name: "Ahmet (8 yaş)", text: '"Ağaçlar konuşmaya başladı..."', color: "bg-blue-500" },
                { no: 3, name: "Zeynep (10 yaş)", text: '"Bir ejder ortaya çıktı ama o kötü değildi..."', color: "bg-green-500" },
                { no: 4, name: "Can (9 yaş)", text: '"Ejder onlara gizli bir harita verdi..."', color: "bg-orange-500" },
                { no: 5, name: "Ayşe (8 yaş)", text: '"Ve mutlu son geldi..."', color: "bg-rose-500" },
              ].map((i) => (
                <li key={i.no} className="flex items-start gap-3">
                  <span className={`mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full text-white text-sm ${i.color}`}>
                    {i.no}
                  </span>
                  <div className="text-sm sm:text-base">
                    <span className="font-semibold">{i.name}</span>: <span className="text-gray-700">{i.text}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Sağ görsel placeholder — buraya sonra görsel yükleyeceksin */}
          <div className="rounded-xl overflow-hidden">
            <img
              src="/images/how-example.jpg" // SONRA kendi görselini aynı isimle koyabilirsin
              alt="Örnek hikaye görseli"
              className="w-full h-[280px] sm:h-[360px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* 3 ÖZELLİK + CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Clock className="w-6 h-6 text-blue-600" />}
            title="Hızlı & Eğlenceli"
            desc="Her bölüm sadece 2-3 cümle. Kısa ve eğlenceli!"
            tone="bg-blue-50"
          />
          <FeatureCard
            icon={<UserPlus className="w-6 h-6 text-green-600" />}
            title="İşbirlikçi"
            desc="5 farklı hayal gücü bir araya geliyor"
            tone="bg-green-50"
          />
          <FeatureCard
            icon={<Gift className="w-6 h-6 text-purple-600" />}
            title="Sürprizli"
            desc="Hikayenin nasıl biteceğini kimse bilmiyor!"
            tone="bg-purple-50"
          />
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/kaydol"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white px-6 py-3 font-semibold shadow hover:opacity-95"
          >
            <PenLine className="w-5 h-5" />
            Sen de Hikaye Yaz!
          </Link>
        </div>
      </section>

      <div className="h-12" />
    </main>
  );
}

/* ------- küçük yardımcı kart bileşenleri ------- */
function StepCard({ number, icon, title, desc, tone }) {
  return (
    <div className="relative">
      <div className={`rounded-2xl ${tone} shadow-sm p-6`}>
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-white shadow">{icon}</div>
        <h3 className="mt-4 font-bold text-lg">{title}</h3>
        <p className="mt-2 text-sm text-gray-600">{desc}</p>
      </div>
      <div className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-gray-900 text-white text-sm flex items-center justify-center">
        {number}
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc, tone }) {
  return (
    <div className={`rounded-2xl ${tone} p-6 text-center`}>
      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow">{icon}</div>
      <h4 className="font-bold">{title}</h4>
      <p className="mt-2 text-gray-600 text-sm">{desc}</p>
    </div>
  );
}
