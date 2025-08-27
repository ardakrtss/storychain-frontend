// 13) app/admin/page.jsx — admin paneli (kullanıcılar & hikayeler)
// pastel/oval/gradient temaya uyumlu
"use client";
import { useEffect, useState } from "react";
import { User, Trash2, BookOpen, LogOut } from "lucide-react";

export default function AdminPanel() {
  const [tab, setTab] = useState("users");
  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50/40 to-pink-50/40">
      <section className="rounded-b-3xl bg-gradient-to-r from-sky-50 to-purple-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold">Yönetim Paneli</h1>
            <p className="text-gray-700 mt-1">Kullanıcıları ve hikâyeleri yönetin.</p>
          </div>
          <form action="/api/admin/logout" method="POST">
            <button className="rounded-xl ring-1 ring-black/10 bg-white px-3 py-2 text-sm font-semibold hover:bg-slate-50 inline-flex items-center gap-2">
              <LogOut className="h-4 w-4" /> Çıkış
            </button>
          </form>
        </div>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-6">
          <div className="grid grid-cols-2 gap-3 max-w-md">
            <button
              onClick={() => setTab("users")}
              className={`rounded-xl px-4 py-2 font-semibold shadow ${tab==="users"?"bg-white text-purple-700 ring-2 ring-purple-300":"bg-white/70 text-gray-700 hover:bg-white"}`}
            >
              Kullanıcılar
            </button>
            <button
              onClick={() => setTab("stories")}
              className={`rounded-xl px-4 py-2 font-semibold shadow ${tab==="stories"?"bg-white text-purple-700 ring-2 ring-purple-300":"bg-white/70 text-gray-700 hover:bg-white"}`}
            >
              Hikâyeler
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
        {tab === "users" ? <UsersTable /> : <StoriesTable />}
      </section>
    </main>
  );
}

function UsersTable() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    setRows(data);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function onDelete(id) {
    if (!confirm("Bu kullanıcı ve ona ait hikâyeler kalıcı olarak silinecek. Emin misiniz?")) return;
    const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
    if (res.ok) load();
  }

  return (
    <div className="rounded-2xl bg-white p-5 shadow ring-1 ring-black/5">
      <div className="flex items-center gap-2 text-lg font-extrabold">
        <User className="h-5 w-5" /> Kullanıcılar
      </div>
      {loading ? (
        <p className="mt-4 text-gray-500">Yükleniyor…</p>
      ) : rows.length === 0 ? (
        <p className="mt-4 text-gray-500">Kayıtlı kullanıcı yok.</p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="py-2">Ad</th>
                <th className="py-2">E-posta</th>
                <th className="py-2">Hikâye Sayısı</th>
                <th className="py-2">Kayıt</th>
                <th className="py-2 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((u) => (
                <tr key={u.id} className="border-t">
                  <td className="py-2">{u.name}</td>
                  <td className="py-2">{u.email}</td>
                  <td className="py-2">{u._count?.stories ?? 0}</td>
                  <td className="py-2">{new Date(u.createdAt).toLocaleString("tr-TR")}</td>
                  <td className="py-2 text-right">
                    <button
                      onClick={() => onDelete(u.id)}
                      className="inline-flex items-center gap-1 rounded-xl bg-rose-50 px-3 py-1.5 text-rose-700 ring-1 ring-rose-200 hover:bg-rose-100"
                    >
                      <Trash2 className="h-4 w-4" /> Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function StoriesTable() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/stories");
    const data = await res.json();
    setRows(data);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function onDelete(id) {
    if (!confirm("Bu hikâye kalıcı olarak silinecek. Emin misiniz?")) return;
    const res = await fetch(`/api/admin/stories/${id}`, { method: "DELETE" });
    if (res.ok) load();
  }

  return (
    <div className="rounded-2xl bg-white p-5 shadow ring-1 ring-black/5">
      <div className="flex items-center gap-2 text-lg font-extrabold">
        <BookOpen className="h-5 w-5" /> Hikâyeler
      </div>
      {loading ? (
        <p className="mt-4 text-gray-500">Yükleniyor…</p>
      ) : rows.length === 0 ? (
        <p className="mt-4 text-gray-500">Kayıtlı hikâye yok.</p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="py-2">Başlık</th>
                <th className="py-2">Yazar</th>
                <th className="py-2">Oluşturma</th>
                <th className="py-2 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((s) => (
                <tr key={s.id} className="border-t">
                  <td className="py-2">{s.title}</td>
                  <td className="py-2">{s.author ? `${s.author.name} (${s.author.email})` : "—"}</td>
                  <td className="py-2">{new Date(s.createdAt).toLocaleString("tr-TR")}</td>
                  <td className="py-2 text-right">
                    <button
                      onClick={() => onDelete(s.id)}
                      className="inline-flex items-center gap-1 rounded-xl bg-rose-50 px-3 py-1.5 text-rose-700 ring-1 ring-rose-200 hover:bg-rose-100"
                    >
                      <Trash2 className="h-4 w-4" /> Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
