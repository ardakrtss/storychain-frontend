"use client";
import Link from "next/link";
import {
  Heart, Users, Sparkles,
  ShieldCheck, Library, Smartphone, Target, BookOpen, PenLine
} from "lucide-react";

export default function HakkimizdaPage() {
  return (
    <main className="min-h-screen">

      {/* HERO */}
      <section
        className="relative rounded-xl overflow-hidden mx-3 sm:mx-6 mt-4"
        style={{
          backgroundImage: "url('/images/about-hero.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h1 className="text-4xl sm:text-5xl font-extrabold">
            <span className="bg-gradient-to-r from-fuchsia-600 to-purple-600 bg-clip-text text-transparent">
              HikayeZinciri Hakkında
            </span>
          </h1>
          <p className="mt-3 text-gray-700 max-w-3xl">
            Çocukların hayal gücünü keşfettiği, birlikte hikayeler yarattığı ve yaratıcılığın sınır tanımadığı büyülü bir platform
          </p>

          {/* Rozetler */}
          <div className="mt-5 flex flex-wrap gap-3">
            <Badge icon={<Heart className="w-4 h-4 text-rose-500" />} text="Sevgiyle Tasarlandı" />
            <Badge icon={<Users className="w-4 h-4 text-sky-600" />} text="İşbirliği Odaklı" />
            <Badge icon={<Sparkles className="w-4 h-4 text-violet-500" />} text="Hayal Gücü Dostu" />
          </div>
        </div>
      </section>

      {/* MİSYONUMUZ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-12">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Misyonumuz</h2>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-gray-700 leading-relaxed space-y-5">
            <p>
              StoryChain, çocukların eleştirel, yaratıcı, işbirlikli ve dijital yazma
              becerilerini geliştirmek için tasarlandı. Her çocuğun hayal gücünü
              güçlendirerek onu etkili bir hikâye anlatıcısına dönüştürmeyi hedefliyoruz.
              Platform, güvenli ve etkileşimli bir ortamda öğrencilerin birlikte ilham verici
              hikâyeler üretmelerine olanak tanıyor.
            </p>
            <p>
              Aynı zamanda, çocukların farklı bakış açılarını keşfetmelerini, empati
              kurmalarını ve ortak bir amaca yönelik üretim yapmalarını teşvik ediyoruz.
              Geleceğin yaratıcı ve eleştirel düşünen bireylerini yetiştirmeye katkı sunmayı amaçlıyoruz.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-2">
              <Stat value="1 Milyon+" label="Yazılması Hedeflenen Hikaye" />
              <Stat value="10 Bin+" label="Genç Yazar" />
            </div>
          </div>

          <div className="rounded-xl overflow-hidden shadow-md">
            <img
              src="/images/about-mission.png"
              alt="Misyon görseli"
              className="w-full h-[320px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* ÖZELLİKLER */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-16">
        <h2 className="text-3xl font-extrabold text-center">Platform Özellikleri</h2>
        <p className="text-center text-gray-600 mt-2">
          StoryChain'in çocuklar için özel olarak tasarlanmış özellikleriyle yaratıcı yazma deneyimini keşfedin
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Feature icon={<Users className="text-fuchsia-600" />} title="İşbirlikçi Yazma"
            desc="Arkadaşlarınla birlikte hikayeler yaz ve yaratıcılığını paylaş" tone="bg-fuchsia-50" />
          <Feature icon={<BookOpen className="text-sky-600" />} title="Tema Çeşitliliği"
            desc="Macera, gizem, fantastik ve bilim kurgu temalarından seç" tone="bg-sky-50" />
          <Feature icon={<ShieldCheck className="text-green-600" />} title="Güvenli Ortam"
            desc="Çocuklar için özel olarak tasarlanmış güvenli platform" tone="bg-green-50" />
          <Feature icon={<Target className="text-orange-600" />} title="İlerleme Takibi"
            desc="Yazma becerilerini geliştir ve rozet kazan" tone="bg-orange-50" />
          <Feature icon={<Library className="text-violet-600" />} title="Hikaye Kütüphanesi"
            desc="Yazılan tüm hikayeleri keşfet ve oku" tone="bg-violet-50" />
          <Feature icon={<Smartphone className="text-pink-600" />} title="Mobil Uyumlu"
            desc="Her cihazdan kolayca erişim ve kullanım" tone="bg-pink-50" />
        </div>
      </section>

      {/* EKİBİMİZ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-16">
        <h2 className="text-3xl font-extrabold text-center">Ekibimiz</h2>
        <p className="text-center text-gray-600 mt-2">
          Çocukların yaratıcı potansiyelini ortaya çıkarmak için tutkuyla çalışan deneyimli ekibimizle tanışın
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
          <TeamCard
            img="/images/team-arda.png"
            name="Arda Karataş"
            role="Kurucu & Proje Yöneticisi"
            bio={`Gündüzleri eğitimci, geceleri çocuk kitabı yazarı; arada da yenilikçi fikirlerin peşinde koşan bir öğrenme tasarımcısı. 
Akademik dünyada okuryazarlıklar üzerine kafa yorar, çocukların hayal gücüyle teknoloji arasında köprüler kurar.`}
          />
          <TeamCard
            img="/images/team-gamze.png"
            name="Gamze Karataş"
            role="Pedagojik Danışman & Hikâye Uygunluk Editörü"
            bio={`Çocuk terapisinde ve oyun terapisi alanlarında uzman; aynı bir karakterin başına gelenleri okuduğunda, 
"Bu çocuk biraz oyun terapisine ihtiyaç duyabilir" diyecek kadar işi ciddiye alır. 
Çocukların en iyi hâllerini ortaya çıkaran kişidir.`}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-16 mb-14">
        <div className="rounded-2xl bg-rose-50 p-8 text-center shadow">
          <h3 className="text-2xl font-extrabold">Bize Katılın!</h3>
          <p className="mt-2 text-gray-700">
            Çocukların hayal dünyasını geliştirmek için birlikte çalışalım
          </p>
          <Link
            href="/iletisim"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white px-6 py-3 font-semibold shadow hover:opacity-95"
          >
            <PenLine className="w-5 h-5" />
            İletişime Geç
          </Link>
        </div>
      </section>
    </main>
  );
}

/* --------- yardımcı bileşenler --------- */

function Badge({ icon, text }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white shadow px-4 py-2 text-sm">
      {icon}
      <span className="text-gray-800">{text}</span>
    </span>
  );
}

function Stat({ value, label }) {
  return (
    <div>
      <div className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-fuchsia-600 to-purple-600 bg-clip-text text-transparent">
        {value}
      </div>
      <div className="text-xs text-gray-500 mt-1">{label}</div>
    </div>
  );
}

function Feature({ icon, title, desc, tone }) {
  return (
    <div className={`rounded-2xl ${tone} p-6 shadow-sm`}>
      <div className="h-12 w-12 rounded-2xl bg-white shadow flex items-center justify-center">
        {icon}
      </div>
      <h4 className="mt-4 font-bold text-gray-900">{title}</h4>
      <p className="mt-2 text-gray-600 text-sm">{desc}</p>
    </div>
  );
}

function TeamCard({ img, name, role, bio }) {
  return (
    <div className="text-center">
      <div className="mx-auto w-64 h-64 rounded-2xl overflow-hidden shadow-md">
        <img src={img} alt={name} className="w-full h-full object-cover" />
      </div>
      <h5 className="mt-4 text-lg font-extrabold">{name}</h5>
      <div className="text-sm text-purple-600 font-semibold">{role}</div>
      <p className="mt-3 text-gray-700 leading-relaxed max-w-xl mx-auto whitespace-pre-line">{bio}</p>
    </div>
  );
}
