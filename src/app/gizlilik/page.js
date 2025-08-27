"use client";
import { Shield, CheckCircle2, Mail } from "lucide-react";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50/40 to-blue-50/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* KART */}
        <div className="rounded-3xl bg-white shadow-xl ring-1 ring-black/5 p-6 sm:p-10">
          {/* Başlık */}
          <div className="flex flex-col items-center text-center">
            <div className="h-14 w-14 rounded-full bg-gradient-to-br from-green-500 to-teal-600 text-white flex items-center justify-center shadow-md">
              <Shield className="w-7 h-7" />
            </div>
            <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold">
              StoryChain – Gizlilik Politikası
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Son güncellenme: <span className="font-medium">12 Aralık 2024</span>
            </p>
          </div>

          {/* Bölümler */}
          <div className="mt-8 space-y-6">
            <Section
              no="1"
              title="Giriş"
              tone="bg-green-50 border-l-green-400"
              items={[
                `StoryChain, çocukların güvenli, eğlenceli ve öğretici bir dijital hikâye yazma deneyimi yaşamalarını sağlamak amacıyla oluşturulmuş bir platformdur.`,
                `Bu Gizlilik Politikası, platformumuzu kullanan tüm kullanıcıların (öğrenciler, veliler, öğretmenler ve ziyaretçiler) kişisel verilerinin nasıl toplandığını, kullanıldığını ve korunduğunu açıklar.`,
              ]}
            />

            <Section
              no="2"
              title="Topladığımız Bilgiler"
              tone="bg-sky-50 border-l-sky-400"
              items={[
                `Kayıt Bilgileri (ad-soyad veya takma ad, e-posta adresi, yaş bilgisi, şifre)`,
                `Veli Onayı Bilgileri (18 yaş altı kullanıcılar için veli adı, e-posta veya iletişim bilgisi)`,
                `Hikâye İçerikleri (çocuklara uygun olmalı)`,
                `Teknik Bilgiler (IP adresi, tarayıcı türü, cihaz bilgileri, çerez verileri)`,
              ]}
              listType="bullets"
            />

            <Section
              no="3"
              title="Bilgilerin Kullanım Amacı"
              tone="bg-purple-50 border-l-purple-400"
              items={[
                `Kullanıcı hesabı oluşturmak ve yönetmek`,
                `Hikâye yazma ve paylaşma işlevlerini sağlamak`,
                `İçeriklerin güvenliğini ve uygunluğunu denetlemek`,
                `Kullanıcı deneyimini geliştirmek`,
                `Yasal yükümlülükleri yerine getirmek`,
              ]}
              listType="bullets"
            />

            <Section
              no="4"
              title="Bilgilerin Paylaşımı"
              tone="bg-orange-50 border-l-orange-400"
              items={[
                `Yasal zorunluluk halinde yetkili kurumlarla`,
                `Hizmet sağlayıcılarımızla (barındırma, teknik destek vb.) yalnızca gerektiği ölçüde`,
                `Veli veya öğretmenin onayı ile okul/kurum yetkilileriyle`,
              ]}
              listType="bullets"
            />

            <Section
              no="5"
              title="Çocukların Güvenliği"
              tone="bg-rose-50 border-l-rose-400"
              iconType="shield"
              items={[
                `18 yaş altı kullanıcılar için veli onayı şarttır`,
                `Gerçek isim yerine takma ad kullanılması önerilir`,
                `Kişisel iletişim bilgileri (adres, telefon, sosyal medya vb.) paylaşılmamalıdır`,
                `Paylaşılan içerikler moderasyon ekibimizce denetlenir`,
              ]}
              listType="bullets"
            />

            <Section
              no="6"
              title="Çerezler (Cookies)"
              tone="bg-emerald-50 border-l-emerald-400"
              items={[
                `Kullanıcı deneyimini geliştirmek ve istatistiksel analiz yapmak için çerezler kullanılır.`,
                `Kullanıcılar tarayıcı ayarlarından çerezleri devre dışı bırakabilir, ancak bazı özellikler çalışmayabilir.`,
              ]}
            />

            <Section
              no="7"
              title="Veri Saklama Süresi"
              tone="bg-yellow-50 border-l-yellow-400"
              items={[
                `Kullanıcı verileri hesap aktif olduğu sürece saklanır.`,
                `Hesap silindiğinde, veriler 90 gün içinde sistemden tamamen kaldırılır.`,
              ]}
            />

            <Section
              no="8"
              title="Haklarınız"
              tone="bg-violet-50 border-l-violet-400"
              items={[
                `Erişim Hakkı – Kişisel verilere erişim talebi`,
                `Düzeltme Hakkı – Bilgilerin düzeltilmesini isteme`,
                `İtiraz Hakkı – Veri işleme faaliyetlerine itiraz etme`,
                `Silme Hakkı – Hesabın tamamen silinmesini talep etme`,
              ]}
              listType="bullets"
            />

            <Section
              no="9"
              title="Güvenlik Önlemleri"
              tone="bg-teal-50 border-l-teal-400"
              items={[
                `Veriler SSL şifrelemesi ile korunur.`,
                `Düzenli güvenlik denetimleri yapılır.`,
              ]}
            />

            <Section
              no="10"
              title="Değişiklikler"
              tone="bg-amber-50 border-l-amber-400"
              items={[
                `StoryChain, gizlilik politikasını zaman zaman güncelleyebilir. Güncel politika yayına alındığı tarihten itibaren geçerlidir.`,
              ]}
            />

            <Section
              no="11"
              title="İletişim"
              tone="bg-rose-50 border-l-rose-400"
              items={[
                `Her türlü soru, öneri ve talebiniz için:`,
                <>
                  <div className="mt-2 flex items-center gap-3 rounded-xl border border-rose-200 bg-white p-4">
                    <div className="h-10 w-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold">E-posta</div>
                      <div className="text-sm text-rose-700">storyychain@gmail.com</div>
                    </div>
                  </div>
                </>,
              ]}
            />

            {/* Alt Bilgi */}
            <div className="rounded-2xl border border-green-200 bg-green-50 p-5 mt-6">
              <div className="text-sm text-green-900 font-semibold">Güvenliğiniz Bizim İçin Önemli</div>
              <p className="mt-1 text-sm text-green-900/80">
                StoryChain olarak, çocukların dijital dünyada güvenle vakit geçirmelerini sağlamak en büyük önceliğimizdir.
                Herhangi bir sorunuz veya endişeniz varsa bizimle iletişime geçmekten çekinmeyin.
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                <a
                  href="/iletisim"
                  className="inline-flex items-center rounded-full bg-gradient-to-r from-teal-500 to-green-500 text-white px-4 py-2 text-sm font-semibold shadow hover:opacity-95"
                >
                  Bizimle İletişime Geçin
                </a>
                <a
                  href="/kullanim-sartlari"
                  className="inline-flex items-center rounded-full border border-green-300 bg-white text-green-700 px-4 py-2 text-sm font-semibold hover:bg-green-100"
                >
                  Kullanım Şartları
                </a>
              </div>
            </div>

            {/* Son Güncelleme */}
            <p className="text-center text-xs text-gray-500 pt-2">
              Bu Gizlilik Politikası <span className="font-medium">12 Ağustos 2025</span> tarihinde son kez güncellenmiştir.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ----------------- Bileşen ----------------- */
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
