"use client";
import { useEffect, useMemo, useState } from "react";
import { PenLine, Clock, BookOpen, History, Sparkles, AlertTriangle } from "lucide-react";
import { moderateStory } from "../../lib/moderation";

// Yardımcı
const countWords = (t) =>
  (t || "").trim().replace(/\s+/g, " ").split(" ").filter(Boolean).length;

const WORD_LIMIT = 150;
const START_SECONDS = 5 * 60; // 05:00

export default function WritePage() {
  // Sekmeler
  const [tab, setTab] = useState("continue"); // "new" | "continue"

  // Timer
  const [secondsLeft, setSecondsLeft] = useState(START_SECONDS);
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setInterval(() => setSecondsLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [secondsLeft]);
  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  // Yeni hikâye
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("fantastik");
  const [opening, setOpening] = useState("");

  // Devam
  const [lastSentence, setLastSentence] = useState(
    "Köprünün altından mırıldanan nehir, gizli bir sırrı fısıldıyordu."
  );
  const [previousPart, setPreviousPart] = useState("");
  const [yourPart, setYourPart] = useState("");

  const newWords = useMemo(() => countWords(opening), [opening]);
  const contWords = useMemo(() => countWords(yourPart), [yourPart]);

  const canSubmit =
    secondsLeft > 0 &&
    (tab === "new"
      ? title.trim() && opening.trim() && newWords <= WORD_LIMIT
      : yourPart.trim() && contWords <= WORD_LIMIT);

  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    if (!canSubmit) return;
    setLoading(true);

    try {
      // Moderasyon kontrolü
      const storyData = tab === "new" 
        ? { title, content: opening }
        : { title: "Hikaye Devamı", content: yourPart };
      
      const moderationResult = moderateStory(storyData);
      
      if (!moderationResult.ok) {
        alert(`Moderasyon Hatası: ${moderationResult.reason}`);
        setLoading(false);
        return;
      }

      /* === KENDİ İŞ MANTIĞINI BURAYA KOY ======================================
         - Burada var olan kayıt/submit API isteğini çağır.
         - Örn:
         await fetch("/api/story/submit", {
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify(
             tab === "new"
               ? { mode: "new", title, theme, opening }
               : { mode: "continue", lastSentence, previousPart, yourPart }
           ),
         });
      ========================================================================= */

      // Demo
      await new Promise((r) => setTimeout(r, 500));
      alert("Metnin gönderildi! (Demo)");
    } catch (error) {
      alert("Bir hata oluştu: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50/40 to-pink-50/40">
      {/* HERO */}
      <section className="rounded-b-3xl bg-gradient-to-r from-sky-50 to-purple-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white shadow">
            <PenLine className="h-7 w-7" />
          </div>
          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold">
            Hikâyeyi Birlikte Yazalım
          </h1>
          <p className="mt-2 text-gray-700">
            Maceraya katıl: Yeni bir hikâye başlat ya da var olanı kendi
            cümlenle sürdür.
          </p>

          {/* Sekmeler */}
          <div className="mx-auto mt-6 max-w-3xl grid grid-cols-2 gap-3">
            <button
              onClick={() => setTab("new")}
              className={`rounded-xl px-4 py-2 font-semibold shadow ${
                tab === "new"
                  ? "bg-white text-purple-700 ring-2 ring-purple-300"
                  : "bg-white/70 text-gray-700 hover:bg-white"
              }`}
            >
              Yeni Hikâye Başlat
            </button>
            <button
              onClick={() => setTab("continue")}
              className={`rounded-xl px-4 py-2 font-semibold shadow ${
                tab === "continue"
                  ? "bg-white text-purple-700 ring-2 ring-purple-300"
                  : "bg-white/70 text-gray-700 hover:bg-white"
              }`}
            >
              Hikâyeyi Sürdür
            </button>
          </div>
        </div>
      </section>

      {/* İÇERİK */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        {/* Sayaç & Limit */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Stat icon={<Clock />} label="Kalan Süre" value={`${mm}:${ss}`} />
          <Stat icon={<BookOpen />} label="Kelime Limiti" value={`${WORD_LIMIT}`} />
          <Stat
            icon={<History />}
            label="Mod"
            value={tab === "new" ? "Yeni Hikâye" : "Devam"}
          />
        </div>

        {/* FORM */}
        {tab === "new" ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 card">
                <Label>Başlık</Label>
                <input
                  className="input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Hikâyenin başlığı"
                />
              </div>
              <div className="card">
                <Label>Tema</Label>
                <select
                  className="input"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                >
                  <option value="fantastik">Fantastik</option>
                  <option value="gizem">Gizem</option>
                  <option value="macera">Macera</option>
                  <option value="bilim-kurgu">Bilim Kurgu</option>
                  <option value="sifir-atik">Sıfır Atık</option>
                  <option value="iklim">İklim Değişikliği</option>
                </select>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <Label>Açılış Bölümü (Senin kısmın)</Label>
                <small
                  className={`text-xs ${
                    newWords > WORD_LIMIT ? "text-rose-600" : "text-gray-500"
                  }`}
                >
                  {newWords}/{WORD_LIMIT} kelime
                </small>
              </div>
              <textarea
                className="input min-h-[160px]"
                value={opening}
                onChange={(e) => setOpening(e.target.value)}
                placeholder="Hikâyeyi başlat..."
              />
              {newWords > WORD_LIMIT && (
                <p className="mt-2 text-sm text-rose-600">
                  Kelime limiti aşıldı. Lütfen kısaltın.
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="card">
              <Label>Son Cümle</Label>
              <input
                className="input"
                value={lastSentence}
                onChange={(e) => setLastSentence(e.target.value)}
              />
            </div>

            <div className="card">
              <Label>Önceki Bölüm</Label>
              <textarea
                className="input min-h-[140px]"
                value={previousPart}
                onChange={(e) => setPreviousPart(e.target.value)}
                placeholder="Önceki bölümün özetini gör / yapıştır"
              />
              <p className="mt-2 text-xs text-gray-500">
                *Referans amaçlıdır; istersen düzenleyebilirsin.
              </p>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <Label>Senin Bölümün</Label>
                <small
                  className={`text-xs ${
                    contWords > WORD_LIMIT ? "text-rose-600" : "text-gray-500"
                  }`}
                >
                  {contWords}/{WORD_LIMIT} kelime
                </small>
              </div>
              <textarea
                className="input min-h-[160px]"
                value={yourPart}
                onChange={(e) => setYourPart(e.target.value)}
                placeholder="Hikâyeyi sürdür..."
              />
              {contWords > WORD_LIMIT && (
                <p className="mt-2 text-sm text-rose-600">
                  Kelime limiti aşıldı. Lütfen kısaltın.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Gönder */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-gray-600">
            <Sparkles className="h-4 w-4 text-purple-600" />
            <span className="text-sm">Süre dolmadan, limiti aşmadan gönder.</span>
          </div>
          <button
            disabled={!canSubmit || loading}
            onClick={onSubmit}
            className={`rounded-xl px-5 py-2.5 font-semibold text-white shadow transition
            ${!canSubmit || loading ? "bg-gray-300 cursor-not-allowed"
            : "bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:opacity-95"}`}
          >
            {loading ? "Gönderiliyor..." : "Gönder"}
          </button>
        </div>
      </section>
    </main>
  );
}

/* ——— Küçük yardımcı bileşen/utility sınıfları ——— */
function Stat({ icon, label, value }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow ring-1 ring-black/5">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-700">
          {icon}
        </div>
        <div>
          <div className="text-sm text-gray-600">{label}</div>
          <div className="text-xl font-extrabold">{value}</div>
        </div>
      </div>
    </div>
  );
}
function Label({ children }) {
  return <label className="block text-sm font-semibold text-gray-800">{children}</label>;
}

/* Global utility class set (temayla uyum) */
const base =
  "mt-2 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400";
const card = "rounded-2xl bg-white p-5 shadow ring-1 ring-black/5";
export const styles = {};
// eslint-disable-next-line no-unused-vars
const _inject = (() => {
  if (typeof document === "undefined") return;
  const css = `
    .input { ${base.replaceAll('"', '\\"')} }
    .card { ${card.replaceAll('"', '\\"')} }
  `;
  const style = document.createElement("style");
  style.innerHTML = css;
  document.head.appendChild(style);
})();
