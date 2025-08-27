"use client";
import { Shield, CheckCircle2, Mail, Database } from "lucide-react";

export default function KvkkPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50/40 to-blue-50/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* KART */}
        <div className="rounded-3xl bg-white shadow-xl ring-1 ring-black/5 p-6 sm:p-10">
          {/* Başlık */}
          <div className="flex flex-col items-center text-center">
            <div className="h-14 w-14 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-md">
              <Shield className="w-7 h-7" />
            </div>
            <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold">
              KVKK Aydınlatma Metni
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Son güncellenme: <span className="font-medium">12 Ağustos 2025</span>
            </p>
          </div>

          {/* Bölümler */}
          <div className="mt-8 space-y-6">
            <Section
              no="1"
              title="Giriş"
              tone="bg-green-50 border-l-green-400"
              items={[
                `Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında StoryChain platformu tarafından işlenen kişisel verilere ilişkin kullanıcıların (öğrenci, veli/öğretmen ve ziyaretçiler) bilgilendirilmesi amacıyla hazırlanmıştır.`,
                `Çocukların güvenliği ve mahremiyeti birincil önceliğimizdir. 18 yaş altı kullanıcılar için veli onayı şarttır.`,
              ]}
            />

            <Section
              no="2"
              title="Veri Sorumlusu ve İletişim"
              tone="bg-emerald-50 border-l-emerald-400"
              items={[
                `Veri Sorumlusu: StoryChain Platformu`,
                `Adres: Uşak / Türkiye`,
                <>
                  İletişim:{" "}
                  <a className="underline text-teal-700" href="mailto:storyychain@gmail.com">
                    storyychain@gmail.com
                  </a>
                </>,
              ]}
            />

            <Section
              no="3"
              title="İşlenen Kişisel Veriler"
              tone="bg-sky-50 border-l-sky-400"
              listType="bullets"
              items={[
                `Kimlik ve Profil: Ad–soyad veya takma ad, yaş bilgisi, profil görseli (ops.).`,
                `İletişim: E-posta adresi, veli/öğretmen iletişim bilgisi.`,
                `İşlem Güvenliği / Kayıtlar: Oturum ve güvenlik logları, IP, cihaz ve tarayıcı bilgileri.`,
                `İçerik Verileri: Platformda paylaşılan hikâye metinleri ve ekleri (çocuklara uygun olmalıdır).`,
                `Talep/Şikâyet Verileri: Destek ve iletişim kanallarında paylaşılan bilgiler.`,
              ]}
            />

            <Section
              no="4"
              title="Veri İşleme Amaçları"
              tone="bg-purple-50 border-l-purple-400"
              listType="bullets"
              items={[
                `Üyelik kaydı ve hesabın yönetimi`,
                `Hizmetlerin sunulması ve kişiselleştirilmesi`,
                `İçerik güvenliği ve moderasyon süreçlerinin yürütülmesi`,
                `Kullanıcı iletişimi, bildirim ve destek taleplerinin yanıtlanması`,
                `Hukuki yükümlülüklerin yerine getirilmesi`,
                `Platformun geliştirilmesi için istatistiksel/analitik çalışmaların anonim olarak yapılması`,
              ]}
            />

            <Section
              no="5"
              title="Hukuki Sebepler (KVKK md. 5) ve Açık Rıza"
              tone="bg-indigo-50 border-l-indigo-400"
              items={[
                `Sözleşmenin kurulması/ifası (md.5/2-c) ve hukuki yükümlülük (md.5/2-ç) kapsamında zorunlu veri işleme faaliyetleri yürütülür.`,
                `Meşru menfaat (md.5/2-f) dengesi gözetilerek güvenlik, dolandırıcılık önleme ve performans ölçümü yapılabilir.`,
                `Açık rıza (md.5/1) gerektiren durumlar; ör. profil görseli kullanımı, pazarlama/analitik çerezleri, yarışma/etkinlik iletişimleri gibi opsiyonel alanlardır. Açık rıza verilmemesi hizmetin temel işleyişini engellemez.`,
              ]}
            />

            <Section
              no="6"
              title="Toplama Yöntemleri"
              tone="bg-cyan-50 border-l-cyan-400"
              listType="bullets"
              items={[
                `Web ve mobil arayüzler üzerinden doldurulan formlar`,
                `Destek e-postaları ve iletişim formları`,
                `Çerezler, SDK'lar ve sistem log kayıtları`,
                `Hikâye oluşturma/katılım akışında kullanıcı tarafından sağlanan içerikler`,
              ]}
            />

            <Section
              no="7"
              title="Saklama Süresi ve İmha"
              tone="bg-yellow-50 border-l-yellow-400"
              items={[
                `Kişisel veriler, hesabın aktif olduğu süre boyunca saklanır.`,
                `Hesap kapatma/ silme talebinden sonra veriler en geç 90 gün içinde silinir veya anonimleştirilir; mevzuatta öngörülen daha uzun saklama zorunlulukları saklıdır.`,
              ]}
            />

            <Section
              no="8"
              title="Veri Aktarımı"
              tone="bg-orange-50 border-l-orange-400"
              items={[
                `Hizmet sağlayıcılarımıza (barındırma, e-posta, teknik destek vb.) yalnızca gerekli olduğu ölçüde ve sözleşmesel güvencelerle aktarım yapılabilir.`,
                `Yurt dışına aktarım, KVKK md.9 kapsamındaki şartlar sağlanmadan veya açık rıza alınmadan gerçekleştirilmez.`,
              ]}
            />

            <Section
              no="9"
              title="Çocukların Korunması"
              tone="bg-rose-50 border-l-rose-400"
              items={[
                `18 yaş altı kullanıcılar için veli onayı alınır.`,
                `Gerçek isim yerine takma ad kullanımı teşvik edilir; kişisel iletişim bilgileri hikâye ve profillerde paylaşılmamalıdır.`,
                `İçerikler çocuk güvenliği ilkelerine göre moderasyon ekibi tarafından denetlenir.`,
              ]}
            />

            <Section
              no="10"
              title="KVKK md.11 Kapsamındaki Haklarınız"
              tone="bg-violet-50 border-l-violet-400"
              listType="bullets"
              items={[
                `Kişisel verilerinizin işlenip işlenmediğini öğrenme ve bilgi talep etme`,
                `Amaç, kapsam ve alıcıları öğrenme`,
                `Eksik veya yanlış işlenmişse düzeltilmesini isteme`,
                `Silinmesini/yok edilmesini ve bu işlemlerin aktarıldığı kişilere bildirilmesini isteme`,
                `İşleme faaliyetlerine itiraz etme; zararın giderilmesini talep etme`,
                <>
                  Başvurular için:{" "}
                  <a href="mailto:storyychain@gmail.com" className="underline text-violet-700">
                    storyychain@gmail.com
                  </a>
                </>,
              ]}
            />

            <Section
              no="11"
              title="Güvenlik Önlemleri"
              tone="bg-teal-50 border-l-teal-400"
              items={[
                `Veriler SSL ile şifrelenmiş bağlantılar üzerinden iletilir.`,
                `Erişim kontrolü, loglama ve gerekli hallerde şifreleme uygulanır; personel farkındalık eğitimleri yürütülür.`,
              ]}
            />

            <Section
              no="12"
              title="Çerezler"
              tone="bg-lime-50 border-l-lime-400"
              items={[
                `Zorunlu çerezler temel işlevler için kullanılır; tercihe bağlı performans/analitik çerezleri açık rızayla çalışır.`,
                `Tarayıcınızdan çerez tercihlerini değiştirebilirsiniz; bazı özellikler devre dışı kalabilir.`,
              ]}
            />

            <Section
              no="13"
              title="Yürürlük ve Değişiklikler"
              tone="bg-slate-50 border-l-slate-400"
              items={[
                `Bu metin gerektiğinde güncellenebilir; güncel sürüm yayınlandığı tarihte yürürlüğe girer.`,
                <>
                  İlgili belgeler:{" "}
                  <a href="/gizlilik" className="underline text-slate-700">
                    Gizlilik Politikası
                  </a>{" "}
                  ve{" "}
                  <a href="/kullanim-sartlari" className="underline text-slate-700">
                    Kullanım Şartları
                  </a>
                  .
                </>,
              ]}
            />

            {/* CTA */}
            <div className="rounded-2xl border border-teal-200 bg-teal-50 p-5 mt-6">
              <div className="text-sm text-teal-900 font-semibold">
                Sorunuz mu var? Bize yazın.
              </div>
              <p className="mt-1 text-sm text-teal-900/80">
                KVKK kapsamındaki talepleriniz için aşağıdaki iletişim kanalını kullanabilirsiniz.
              </p>
              <div className="mt-3 flex items-center gap-3 rounded-xl border border-teal-200 bg-white p-4">
                <div className="h-10 w-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold">E-posta</div>
                  <div className="text-sm text-teal-700">storyychain@gmail.com</div>
                </div>
              </div>
            </div>

            {/* Son bilgi */}
            <p className="text-center text-xs text-gray-500 pt-2">
              Bu Aydınlatma Metni <span className="font-medium">12 Ağustos 2025</span> tarihinde son kez güncellenmiştir.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

/* --------------- Bölüm Bileşeni --------------- */
function Section({ no, title, items, tone, listType = "checks" }) {
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
              <CheckCircle2 className="mt-0.5 w-4 h-4 text-emerald-600" />
              <p className="text-sm text-gray-800">{it}</p>
            </div>
          )
        )}
      </div>
    </section>
  );
}
