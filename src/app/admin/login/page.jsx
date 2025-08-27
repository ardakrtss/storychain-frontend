// 12) app/admin/login/page.jsx — admin giriş ekranı
"use client";
import { useState } from "react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      window.location.href = "/admin";
    } else {
      setErr("Kullanıcı adı veya şifre hatalı");
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50/40 to-pink-50/40 flex items-center">
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-6 shadow-xl ring-1 ring-black/5">
        <h1 className="text-2xl font-extrabold text-center">Admin Girişi</h1>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-semibold">Kullanıcı Adı</label>
            <input
              className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-purple-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Şifre</label>
            <input
              type="password"
              className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-purple-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          {err && <p className="text-sm text-rose-600">{err}</p>}
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 py-2.5 font-semibold text-white shadow hover:opacity-95"
          >
            Giriş Yap
          </button>
        </form>
      </div>
    </main>
  );
}
