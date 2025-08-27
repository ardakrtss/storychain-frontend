"use client";
import Link from "next/link";
import { FileText, CheckCircle2, Shield, AlertTriangle, Mail } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50/30 to-pink-50/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* KART */}
        <div className="rounded-3xl bg-white shadow-xl ring-1 ring-black/5 p-6 sm:p-10">
          {/* Başlık */}
          <div className="flex flex-col items-center text-center">
            <div className="h-14 w-14 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white flex items-center justify-center shadow-md">
              <FileText className="w-7 h-7" />
            </div>
            <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold">
              StoryChain – Kullanım Şartları
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Son güncellenme: <span className="font-medium">12 Ağustos 2025</span>
            </p>
          </div>

          {/* Bölümler */}
          <div className="mt-8 space-y-6">
            <Section
              no="1"
              title="Amaç ve Kapsam"
              tone="bg-purple-50 border-l-purple-400"
              items={[
                `StoryChain, ilkokul öğrencilerinin güvenli ve eğlenceli bir ortamda yaratıcı, işbirlikli ve dijital yazma becerilerini geliştirmelerini amaçlayan bir dijital hikâye yazma platformudur.`,
                `Bu Kullanım Şartları, platformun tüm kullanıcıları (öğrenciler, veliler, öğretmenler ve diğer ziyaretçiler) için geçerlidir.`,
              ]}
            />

            <Section
              no="2"
              title="Kayıt ve Hesap Kullanımı"
              tone="bg-sky-50 border-l-sky-400"
              items={[
                `StoryChain'e kayıt olmak için 18 yaşından küçük kullanıcıların veli onayı gerekir.`,
                `Kullanıcılar, kayıt sırasında doğru ve güncel bilgiler vermekle yükümlüdür.`,
                `Kullanıcı adı ve şifre güvenliğinden kullanıcı sorumludur.`,
                `Hesaplar devredilemez, başkalarına kullandırılamaz.`,
              ]}
            />

            <Section
              no="3"
              title="İçerik Kuralları"
              tone="bg-green-50 border-l-green-400"
              iconType="check"
              items={[
                `Kullanıcılar yalnızca kendilerine ait veya kullanım hakkı elde ettikleri metinleri paylaşabilir.`,
                `Platformda paylaşılan içerikler çocuklara uygun olmalıdır; şiddet, hakaret, ayrımcılık, müstehcenlik, siyasi propaganda veya reklam içeremez.`,
                `Hikâyeler, yalnızca ilgili hikâye zincirinde ve bir önceki bölüme uygun şekilde yazılmalıdır.`,
                `Platformda üretilen tüm içerikler moderasyon ekibimiz tarafından incelenebilir.`,
              ]}
            />

            <Section
              no="4"
              title="Telif Hakları"
              tone="bg-orange-50 border-l-orange-400"
              items={[
                `Kullanıcılar, yükledikleri içeriklerin telif haklarının kendilerine ait olduğunu kabul eder.`,
                `StoryChain, kullanıcıların oluşturduğu içerikleri platform tanıtımında, eğitim materyallerinde veya proje raporlarında kaynak belirterek kullanma hakkına sahiptir.`,
                `Kullanıcılar, kendi içeriklerinin başkaları tarafından hikâye zincirinde devam ettirilebileceğini kabul eder.`,
              ]}
            />

            <Section
              no="5"
              title="Güvenlik ve Gizlilik"
              tone="bg-rose-50 border-l-rose-400"
              iconType="shield"
              items={[
                <>
                  Kullanıcıların kişisel bilgileri, <Link href="/gizlilik" className="underline">
                    Gizlilik Politikası
                  </Link> kapsamında korunur.
                </>,
                `Çocukların güvenliği için gerçek isim yerine takma ad kullanılması önerilir.`,
                `Kişisel iletişim bilgileri (telefon, e-posta, adres vb.) hikâye metinlerinde veya profil açıklamalarında paylaşılmamalıdır.`,
              ]}
            />

            <Section
              no="6"
              title="Yasaklı Kullanımlar"
              tone="bg-red-50 border-l-red-400"
              iconType="alert"
              items={[
                `Başkalarının kimliğine bürünmek`,
                `Başkalarının telif hakkı veya gizlilik haklarını ihlal etmek`,
                `Platformu yasa dışı amaçlar için kullanmak`,
                `Spam, reklam veya zararlı yazılım yaymak`,
              ]}
              listType="bullets"
            />

            <Section
              no="7"
              title="Hesap Kapatma"
              tone="bg-amber-50 border-l-amber-400"
              items={[
                `Kullanıcılar istedikleri zaman hesaplarının kapatılma talebinde bulunabilir.`,
                `Kullanım şartlarının ihlali durumunda, StoryChain hesabı askıya alma veya tamamen kapatma hakkına sahiptir.`,
              ]}
            />

            <Section
              no="8"
              title="Sorumluluk Reddi"
              tone="bg-slate-50 border-l-slate-400"
              items={[
                `StoryChain, kullanıcıların ürettiği içeriklerden sorumlu değildir.`,
                `Platform teknik arızalar, bakım çalışmaları veya mücbir sebepler nedeniyle geçici olarak erişilemez hâle gelebilir.`,
              ]}
            />

            <Section
              no="9"
              title="Değişiklikler"
              tone="bg-indigo-50 border-l-indigo-400"
              items={[
                `StoryChain, kullanım şartlarını zaman zaman güncelleyebilir. Güncel şartlar, yürürlüğe girdikleri tarihten itibaren geçerli olur.`,
              ]}
            />

            <Section
              no="10"
              title="İletişim"
              tone="bg-teal-50 border-l-teal-400"
              items={[
                `Her türlü soru ve bildirim için bizimle şu yolla iletişime geçebilirsiniz:`,
                <>
                  <div className="mt-2 flex items-center gap-3 rounded-xl border border-teal-200 bg-white p-4">
                    <div className="h-10 w-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold">E-posta</div>
                      <div className="text-sm text-teal-700">storyychain@gmail.com</div>
                    </div>
                  </div>
                </>,
              ]}
            />

            {/* Önemli Bilgilendirme */}
            <div className="rounded-2xl border border-pink-200 bg-pink-50 p-5">
              <div className="text-sm text-pink-900 font-semibold">Önemli Bilgilendirme</div>
              <p className="mt-1 text-sm text-pink-900/80">
                Bu Kullanım Şartları herhangi bir zamanda güncellenebilir. Önemli değişiklikler kullanıcılara bildirilecektir.
                Platformu kullanmaya devam ederek bu şartları kabul etmiş sayılırsınız.
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                <Link
                  href="/iletisim"
                  className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white px-4 py-2 text-sm font-semibold shadow hover:opacity-95"
                >
                  Sorularınız mı var? İletişime geçin
                </Link>
                <Link
                  href="/gizlilik"
                  className="inline-flex items-center rounded-full border border-pink-300 bg-white text-pink-700 px-4 py-2 text-sm font-semibold hover:bg-pink-100"
                >
                  Gizlilik Politikası
                </Link>
              </div>
            </div>

            {/* Alt not */}
            <p className="text-center text-xs text-gray-500 pt-2">
              Bu Kullanım Şartları <span className="font-medium">12 Aralık 2024</span> tarihinde son kez güncellenmiştir.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ----------------- Bileşenler ----------------- */
function Section({ no, title, items, tone, iconType, listType = "checks" }) {
  return (
    <section className={`rounded-2xl border-l-8 ${tone} p-5`}>
      <div className="flex items-center gap-3">
        <span className="h-7 w-7 rounded-full bg-white/80 text-gray-800 text-sm font-bold flex items-center justify-center shadow">
          {no}
        </span>
        <h2 className="text-lg sm:text-xl font-extrabold text-gray-900">{title}</h2>
      </div>

      <div className="mt-3 space-y-2">
        {items.map((it, idx) =>
          listType === "bullets" ? (
            <div key={idx} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-700" />
              <p className="text-sm text-gray-800">{it}</p>
            </div>
          ) : (
            <div key={idx} className="flex items-start gap-3">
              <span className="mt-0.5">
                {iconType === "shield" ? (
                  <Shield className="w-4 h-4 text-rose-500" />
                ) : iconType === "alert" ? (
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                )}
              </span>
              <p className="text-sm text-gray-800">{it}</p>
            </div>
          )
        )}
      </div>
    </section>
  );
}
