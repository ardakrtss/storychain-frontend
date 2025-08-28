// SSR'de window yokken patlamaması için güvenli sarmalayıcı
export const safeStorage = {
  get(key) {
    if (typeof window === "undefined") return null;
    try { 
      return window.localStorage.getItem(key); 
    } catch { 
      return null; 
    }
  },
  set(key, value) {
    if (typeof window === "undefined") return;
    try { 
      window.localStorage.setItem(key, value); 
    } catch {}
  },
  remove(key) {
    if (typeof window === "undefined") return;
    try { 
      window.localStorage.removeItem(key); 
    } catch {}
  },
};
