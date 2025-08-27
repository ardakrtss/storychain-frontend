"use client";
import { useState } from "react";
import Link from "next/link";

export default function KaydolPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirm: "",
    invite: "",
    terms: false,
  });
  const [msg, setMsg] = useState({ type: "", text: "" });

  function onChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  }

  function validate() {
    if (form.username.trim().length < 3)
      return "Kullanıcı adı en az 3 karakter olmalı.";
    if (form.password.length < 6)
      return "Şifre en az 6 karakter olmalı.";
    if (form.password !== form.confirm)
      return "Şifreler eşleşmiyor.";
    if (!form.terms)
      return "Kullanım Şartları'nı kabul etmelisin.";
    return "";
  }

  async function onSubmit(e) {
    e.preventDefault();
    const err = validate();
    if (err) {
      setMsg({ type: "error", text: err });
      return;
    }
    // Backend bağlanınca burayı /api/register'a POST edeceğiz.
    console.log("REGISTER_PAYLOAD", {
      username: form.username,
      password: form.password,
      invite: form.invite || null,
    });
    setMsg({
      type: "success",
      text:
        "Hesap oluşturuldu (örnek). Backend eklendiğinde kayıt tamamlanacak.",
    });
  }

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-extrabold text-gray-900 text-center">
          StoryChain'e Katıl
        </h1>
        <p className="mt-1 text-center text-gray-600">
          E-posta yok. Sadece kullanıcı adı ve şifreyle kaydol.
        </p>

        {msg.text && (
          <div
            className={`mt-4 rounded-md p-3 text-sm ${
              msg.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {msg.text}
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Kullanıcı Adı
            </label>
            <input
              name="username"
              value={form.username}
              onChange={onChange}
              className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="ör. Tuna123"
              autoComplete="username"
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
              className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="••••••"
              autoComplete="new-password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Şifre (Tekrar)
            </label>
            <input
              type="password"
              name="confirm"
              value={form.confirm}
              onChange={onChange}
              className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="••••••"
              autoComplete="new-password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Davet Kodu (opsiyonel)
            </label>
            <input
              name="invite"
              value={form.invite}
              onChange={onChange}
              className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="(varsa)"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              name="terms"
              checked={form.terms}
              onChange={onChange}
              className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-400"
            />
            <span>
              <Link
                href="/kullanim-sartlari"
                className="underline text-purple-600 hover:text-purple-700"
              >
                Kullanım Şartları
              </Link>
              'nı kabul ediyorum.
            </span>
          </label>

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2.5 font-semibold shadow hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            Kaydol
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Zaten hesabın var mı?{" "}
          <Link
            href="/giris"
            className="font-semibold text-purple-600 hover:text-purple-700 underline"
          >
            Giriş Yap
          </Link>
        </p>
      </div>
    </main>
  );
}
