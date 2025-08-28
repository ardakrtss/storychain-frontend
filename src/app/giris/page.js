"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function GirisPage() {
  const [form, setForm] = useState({ nickname: "", password: "" });
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // URL'den registered parametresini kontrol et
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('registered') === 'true') {
      setMsg({ 
        type: "success", 
        text: "Kayıt başarılı! Şimdi giriş yapabilirsin." 
      });
    }
  }, []);

  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function validate() {
    if (form.nickname.trim().length < 2)
      return "Kullanıcı adı en az 2 karakter olmalı.";
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

    try {
      setLoading(true);
      setMsg({ type: "", text: "" });

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickname: form.nickname.trim(),
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Giriş başarısız");
      }

      setMsg({ type: "success", text: "Giriş başarılı! Yönlendiriliyorsun..." });
      
      // Ana sayfaya yönlendir
      setTimeout(() => {
        router.push("/");
      }, 1000);

    } catch (error) {
      setMsg({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
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
              name="nickname"
              value={form.nickname}
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
            disabled={loading}
            className={`w-full rounded-xl py-2.5 font-semibold shadow focus:outline-none focus:ring-2 focus:ring-purple-400 ${
              loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:opacity-95"
            }`}
          >
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
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
