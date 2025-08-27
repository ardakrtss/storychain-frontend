"use client";
import { useState } from "react";
import Link from "next/link";

export default function KaydolPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    terms: false,     // Kullanım Şartları
    privacy: false,   // Gizlilik Politikası
    kvkk: false,      // KVKK Aydınlatma/Onay
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const allAccepted = form.terms && form.privacy && form.kvkk;

  function onChange(e) {
    const { name, type, value, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    if (!allAccepted) {
      setError("Kayıt için Kullanım Şartları, Gizlilik Politikası ve KVKK onaylarını kabul etmelisiniz.");
      return;
    }

    try {
      setLoading(true);
      // Backend'in varsa buraya POST et:
      // const res = await fetch("/api/register", { method: "POST", body: JSON.stringify({ ...form }), headers:{ "Content-Type":"application/json" }});
      // if (!res.ok) throw new Error((await res.json()).message || "Kayıt başarısız");
      // window.location.href = "/"; // veya yönlendirmek istediğin sayfa
      alert("Demo: Onaylar alındı, kayıt akışı burada backend'e gönderilecek.");
    } catch (err) {
      setError(err.message || "Beklenmeyen bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50/40 to-pink-50/40">
      <div className="max-w-md mx-auto px-4 sm:px-6 py-12">
        <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-xl ring-1 ring-black/5">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-center">Kaydol</h1>
          <p className="text-center text-gray-600 mt-2">Hemen hesabını oluştur.</p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Ad Soyad</label>
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
              <label className="block text-sm font-medium text-gray-700">E-posta</label>
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
              <label className="block text-sm font-medium text-gray-700">Şifre</label>
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

            {/* ZORUNLU ONAYLAR */}
            <div className="mt-4 space-y-3">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="terms"
                  checked={form.terms}
                  onChange={onChange}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  aria-describedby="terms-help"
                  required
                />
                <span className="text-sm text-gray-700" id="terms-help">
                  <Link href="/kullanim-sartlari" className="font-semibold text-purple-700 underline">Kullanım Şartları</Link>'nı okudum ve kabul ediyorum.
                </span>
              </label>

              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="privacy"
                  checked={form.privacy}
                  onChange={onChange}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  aria-describedby="privacy-help"
                  required
                />
                <span className="text-sm text-gray-700" id="privacy-help">
                  <Link href="/gizlilik" className="font-semibold text-purple-700 underline">Gizlilik Politikası</Link>'nı okudum ve kabul ediyorum.
                </span>
              </label>

              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="kvkk"
                  checked={form.kvkk}
                  onChange={onChange}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  aria-describedby="kvkk-help"
                  required
                />
                <span className="text-sm text-gray-700" id="kvkk-help">
                  <Link href="/kvkk" className="font-semibold text-purple-700 underline">KVKK Aydınlatma Metni</Link>'ni okudum; kişisel verilerimin işlenmesine <b>açık rıza</b> veriyorum.
                </span>
              </label>

              {!allAccepted && (
                <p className="text-xs text-rose-600">
                  * Kayıt işlemi için tüm onay kutularını işaretlemeniz gerekir.
                </p>
              )}
            </div>

            {/* HATA */}
            {error && (
              <div className="rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-sm p-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={!allAccepted || loading}
              className={`w-full rounded-xl py-2.5 font-semibold text-white shadow
                          ${!allAccepted || loading
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:opacity-95"}`}
              aria-disabled={!allAccepted || loading}
            >
              {loading ? "Kaydediliyor..." : "Kaydol"}
            </button>

            <p className="text-center text-sm text-gray-600">
              Zaten hesabın var mı?{" "}
              <Link href="/giris" className="font-semibold text-purple-700 underline">Giriş Yap</Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
