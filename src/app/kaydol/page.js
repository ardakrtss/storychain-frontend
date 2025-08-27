"use client";
import { useEffect, useState } from "react";

/* -------------------------------------------------------
   Basit Modal bileşeni (Tailwind ile)
------------------------------------------------------- */
function Modal({ open, title, children, onClose }) {
  useEffect(() => {
    // ESC ile kapat
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
    >
      {/* arka plan */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* kart */}
      <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-white shadow-xl ring-1 ring-black/10">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h3 className="text-lg font-bold">{title}</h3>
          <button
            className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100"
            onClick={onClose}
            aria-label="Kapat"
          >
            ✕
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto px-5 py-4 text-sm leading-relaxed text-gray-800">
          {children}
        </div>
        <div className="flex justify-end gap-2 border-t px-5 py-3">
          <button
            className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium hover:bg-gray-200"
            onClick={onClose}
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------
   Sayfa
------------------------------------------------------- */
export default function KaydolPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    terms: false, // Kullanım Şartları
    privacy: false, // Gizlilik Politikası
    kvkk: false, // KVKK
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // modal state
  const [modal, setModal] = useState({ open: false, type: null });

  const allAccepted = form.terms && form.privacy && form.kvkk;

  function onChange(e) {
    const { name, type, value, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  }

  function openModal(type) {
    setModal({ open: true, type });
  }
  function closeModal() {
    setModal({ open: false, type: null });
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    if (!allAccepted) {
      setError(
        "Kayıt için Kullanım Şartları, Gizlilik Politikası ve KVKK onaylarını kabul etmelisiniz."
      );
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/register", { 
        method: "POST", 
        body: JSON.stringify({ ...form }), 
        headers: { "Content-Type": "application/json" }
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Kayıt başarısız");
      }
      
      // Başarılı kayıt sonrası yönlendirme
      window.location.href = "/giris?registered=true";
    } catch (err) {
      setError(err.message || "Beklenmeyen bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50/40 to-pink-50/40">
      <div className="mx-auto max-w-md px-4 sm:px-6 py-12">
        <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-xl ring-1 ring-black/5">
          <h1 className="text-center text-3xl font-extrabold">Kaydol</h1>
          <p className="mt-2 text-center text-gray-600">
            Hemen hesabını oluştur.
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ad Soyad
              </label>
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                placeholder="Adın ve soyadın"
                className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                E-posta
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                placeholder="ornek@email.com"
                className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Şifre
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={onChange}
                placeholder="••••••••"
                className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                minLength={6}
                required
              />
            </div>

            {/* Zorunlu Onaylar */}
            <div className="mt-4 space-y-3">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="terms"
                  checked={form.terms}
                  onChange={onChange}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  required
                />
                <span className="text-sm text-gray-700">
                  <button
                    type="button"
                    className="font-semibold text-purple-700 underline underline-offset-2"
                    onClick={() => openModal("terms")}
                  >
                    Kullanım Şartları
                  </button>
                  'nı okudum, anladım ve kabul ediyorum.
                </span>
              </label>

              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="privacy"
                  checked={form.privacy}
                  onChange={onChange}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  required
                />
                <span className="text-sm text-gray-700">
                  <button
                    type="button"
                    className="font-semibold text-purple-700 underline underline-offset-2"
                    onClick={() => openModal("privacy")}
                  >
                    Gizlilik Politikası
                  </button>
                  'nı okudum ve kişisel verilerimin bu kapsamda işlenmesini kabul
                  ediyorum.
                </span>
              </label>

              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="kvkk"
                  checked={form.kvkk}
                  onChange={onChange}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  required
                />
                <span className="text-sm text-gray-700">
                  <button
                    type="button"
                    className="font-semibold text-purple-700 underline underline-offset-2"
                    onClick={() => openModal("kvkk")}
                  >
                    KVKK Aydınlatma Metni
                  </button>
                  'ni okudum; kişisel verilerimin 6698 sayılı KVKK kapsamında
                  belirtilen amaçlarla işlenmesine <b>açık rıza</b> veriyorum.
                </span>
              </label>

              {!allAccepted && (
                <p className="text-xs text-rose-600">
                  * Kayıt için üç onayı da işaretlemeniz gerekir.
                </p>
              )}
            </div>

            {error && (
              <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={!allAccepted || loading}
              className={`w-full rounded-xl py-2.5 font-semibold text-white shadow ${
                !allAccepted || loading
                  ? "cursor-not-allowed bg-gray-300"
                  : "bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:opacity-95"
              }`}
            >
              {loading ? "Kaydediliyor..." : "Kaydol"}
            </button>
          </form>
        </div>
      </div>

      {/* ---------- Modal İçerikleri ---------- */}
      <Modal
        open={modal.open && modal.type === "privacy"}
        onClose={closeModal}
        title="Gizlilik Politikası (Özet)"
      >
        <p>
          StoryChain, kullanıcıların kişisel verilerini yalnızca hizmeti sunmak,
          güvenliği sağlamak ve yasal yükümlülükleri yerine getirmek için
          işler. 18 yaş altı kullanıcılar için veli onayı esastır. Gerçek isim
          yerine takma ad kullanılması önerilir ve kişisel iletişim
          bilgilerinin (adres, telefon, sosyal medya vb.) paylaşılması
          yasaktır.
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>Toplanan veriler: ad/eposta, yaş bilgisi, teknik veriler, içerikler.</li>
          <li>Çerezler deneyimi iyileştirmek için kullanılır.</li>
          <li>Veriler, hesap silme talebinden sonra 90 gün içinde kalıcı olarak silinir.</li>
          <li>Veri güvenliği: SSL, erişim kontrolleri ve düzenli denetim.</li>
        </ul>
        <p className="mt-3">
          Tam metin için <a className="underline text-purple-700" href="/gizlilik">/gizlilik</a>{' '}
          sayfasını ziyaret edebilirsiniz.
        </p>
      </Modal>

      <Modal
        open={modal.open && modal.type === "terms"}
        onClose={closeModal}
        title="Kullanım Şartları (Özet)"
      >
        <p>
          StoryChain; çocuklara uygun, güvenli ve işbirlikçi bir yazma ortamıdır.
          Kullanıcılar yalnızca kendilerine ait ya da hak sahibi oldukları
          içerikleri paylaşabilir, yasa dışı/zararlı içerik yayımlayamaz.
          Hesaplar devredilemez ve kullanıcı adı-şifre güvenliğinden kullanıcı
          sorumludur.
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>İçerikler moderasyon ekibi tarafından incelenebilir.</li>
          <li>Telif haklarına saygı esastır; intihal yasaktır.</li>
          <li>Kurallara aykırı davranışlarda hesap askıya alınabilir.</li>
        </ul>
        <p className="mt-3">
          Tam metin için <a className="underline text-purple-700" href="/kullanim-sartlari">/kullanim-sartlari</a>{' '}
          sayfasına bakın.
        </p>
      </Modal>

      <Modal
        open={modal.open && modal.type === "kvkk"}
        onClose={closeModal}
        title="KVKK Aydınlatma Metni (Özet)"
      >
        <p>
          6698 sayılı KVKK uyarınca; kimlik ve iletişim bilgileri, veli onayı
          bilgisi, kullanım/işlem kayıtları ve paylaşılan içerikler; hizmetin
          sunulması, güvenliğin sağlanması ve yasal yükümlülüklerin yerine
          getirilmesi amaçlarıyla işlenir.
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>Hukuki dayanak: KVKK md. 5/1 (açık rıza) ve ilgili mevzuat.</li>
          <li>Veri saklama süresi: hesap aktifliği + silme talebinden sonra 90 gün.</li>
          <li>Haklarınız: erişim, düzeltme, silme, itiraz (KVKK md. 11).</li>
          <li>İletişim: <a href="mailto:storyychain@gmail.com" className="underline">storyychain@gmail.com</a></li>
        </ul>
        <p className="mt-3">
          Detaylar için <a className="underline text-purple-700" href="/kvkk">/kvkk</a> sayfasını ziyaret edebilirsiniz.
        </p>
      </Modal>
    </main>
  );
}
