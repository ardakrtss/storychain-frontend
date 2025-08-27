"use client";
import { useState } from "react";
import Link from "next/link";

export default function GirisPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [msg, setMsg] = useState({ type: "", text: "" });

  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function validate() {
    if (form.username.trim().length < 3)
      return "Kullanıcı adı en az 3 karakter olmalı.";
    if (form.password.length < 6)
      return "Şifre en az 6 karakter olmalı.";
    return "";
  }

  async function onSubmit(e) {
    e.preventDefault();
    const err = validate();
    if (err) {
      setMsg({ type: "error", text: err });
      return;
    }
    // Backend bağlanınca buraya login isteği atılacak.
    console.log("LOGIN_PAYLOAD", form);
    setMsg({
      type: "success",
      text: "Giriş başarılı (örnek). Backend eklendiğinde doğrulama yapılacak.",
    });
  }

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-extrabold text-gray-900 text-center">
          Giriş Yap
        </h1>
        <p className="mt-1 text-center text-gray-600">
          Kullanıcı adın ve şifrenle giriş yap.
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
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2.5 font-semibold shadow hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            Giriş Yap
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Hesabın yok mu?{" "}
          <Link
            href="/kaydol"
            className="font-semibold text-purple-600 hover:text-purple-700 underline"
          >
            Kaydol
          </Link>
        </p>
      </div>
    </main>
  );
}
