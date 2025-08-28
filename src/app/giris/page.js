"use client"; // önemli: bu sayfa/komponent yalnızca client'ta render olsun

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { safeStorage } from "../../lib/safeStorage.js";

export default function LoginPage() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [ready, setReady] = useState(false);

  // İstersen rumuzu hatırlat
  useEffect(() => {
    const last = safeStorage.get("lastNickname");
    if (last) setNickname(last);
    setReady(true);
  }, []);

  if (!ready) {
    // SSR hydration sorunlarını önlemek için kısa bekleme
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Giriş başarısız");
        return;
      }

      // Oturumu cookie tutuyor; localStorage gerekmez.
      safeStorage.set("lastNickname", nickname);
      router.push("/"); // anasayfa veya istediğin rota
    } catch (err) {
      setError(err?.message || "Sunucu hatası");
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      {error && <div className="mb-3 rounded-md bg-red-100 text-red-700 p-3">{error}</div>}

      <h1 className="text-2xl font-bold mb-6">Giriş Yap</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Kullanıcı Adı</label>
          <input
            className="w-full rounded-md border p-3"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="rumuz"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Şifre</label>
          <input
            className="w-full rounded-md border p-3"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="•••••••"
            required
          />
        </div>

        <button className="w-full rounded-md bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 font-semibold">
          Giriş Yap
        </button>
      </form>
    </div>
  );
}
