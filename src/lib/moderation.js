// Basit ama etkili kural tabanlı moderasyon (TR odaklı).
// Not: Üretimde ek olarak harici bir mod API (örn. OpenAI Moderation/Google) bağlamak iyi olur.
// Korku unsurlarını (ghost, vampire, karanlık vs.) serbest bırakıyoruz; gore ve küfür yasak.

const RE = (arr) => new RegExp(`\\b(?:${arr.join("|")})\\b`, "i");

// ——— Yasak/Kısıtlı kategoriler (örnek, genişletebilirsin) ——— //
const PROFANITIES = [
  // yaygın küfür/argo (TR). Listeyi gerektiğinde genişlet.
  "kahpe", "orospu", "orospuçocuğu", "piç", "ibne", "aptal", "salak",
  "s...ktir", "siktir", "ananı", "o..spu", "pezevenk"
];

const HATE_SLURS = [
  // nefret söylemi/ırkçı hakaret. (Temsili; gerektiğinde güncelle)
  "çingene", "yobaz", "yamyam", "hain sürüsü"
];

const SEX_EXPLICIT = [
  // açık cinsel eylemler ve pornografik betimler (çocuk platformunda yasak).
  "porno", "pornograf", "meme ucu", "ereksiyon", "vajina", "penis", "sper*m", "an*l seks",
  "tecavüz", "ensest"
];

const VIOLENT_GORE = [
  // grafik şiddet, kanlı organ/gore betimleri
  "bağırsak", "iç organ", "kafa kop", "dekapit", "kan gölü", "parçala", "işkence"
];

// ——— Korku ALLOWLIST (özellikle izin verilen temasal kelimeler) ——— //
const HORROR_ALLOW = [
  "korku", "karanlık", "zindan", "hayalet", "ruh", "cin", "peri",
  "vampir", "zombi", "kurtadam", "lanet", "uğultu", "çığlık", "dehşet", "gerilim"
];

// RE'ler
const RX = {
  PROF: RE(PROFANITIES.map(escapeRE)),
  HATE: RE(HATE_SLURS.map(escapeRE)),
  SEX:  RE(SEX_EXPLICIT.map(escapeRE)),
  GORE: RE(VIOLENT_GORE.map(escapeRE)),
  // kan kelimesini tek başına yasaklamak istemeyebiliriz; "kan gölü" gibi kalıpları yukarıda yakalıyoruz.
};

function escapeRE(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

export function moderateText(text) {
  const t = (text || "").toLowerCase();

  // Korku allowlist bilgilendirme: (bilerek engellemiyoruz; sadece not)
  const hasHorror = HORROR_ALLOW.some((w) => t.includes(w));

  // Yasak kategoriler:
  if (RX.PROF.test(t))   return deny("Küfür/argo kullanılmamalı.");
  if (RX.HATE.test(t))   return deny("Nefret söylemi tespit edildi.");
  if (RX.SEX.test(t))    return deny("Cinsel açıdan uygunsuz içerik yasaktır.");
  if (RX.GORE.test(t))   return deny("Grafik şiddet/gore içeriklerine izin verilmiyor.");

  // Aşırı tehdit / kişiye yönelik saldırı tespiti (basit hedeften bağımsız kalıp):
  if (/\b(seni|ona|onları)\b.*\b(öldür|yarala|vur|bıçakla)\b/.test(t))
    return deny("Şiddet çağrısı/tehdide izin verilmiyor.");

  return { ok: true, hasHorror };
}

function deny(reason) {
  return { ok: false, reason };
}

// Hikaye moderasyonu için özel fonksiyon
export function moderateStory(story) {
  const { title, content } = story;
  
  // Başlık kontrolü
  const titleCheck = moderateText(title);
  if (!titleCheck.ok) {
    return { ok: false, reason: `Başlık: ${titleCheck.reason}` };
  }
  
  // İçerik kontrolü
  const contentCheck = moderateText(content);
  if (!contentCheck.ok) {
    return { ok: false, reason: `İçerik: ${contentCheck.reason}` };
  }
  
  return { 
    ok: true, 
    hasHorror: titleCheck.hasHorror || contentCheck.hasHorror 
  };
}

// Kullanıcı adı moderasyonu
export function moderateNickname(nickname) {
  const check = moderateText(nickname);
  if (!check.ok) {
    return { ok: false, reason: `Kullanıcı adı: ${check.reason}` };
  }
  
  // Kullanıcı adı için ek kurallar
  if (nickname.length < 2) {
    return { ok: false, reason: "Kullanıcı adı en az 2 karakter olmalıdır." };
  }
  
  if (nickname.length > 20) {
    return { ok: false, reason: "Kullanıcı adı en fazla 20 karakter olabilir." };
  }
  
  return { ok: true };
}
