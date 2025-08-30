// localStorage'da saklanan kullanıcı verilerini kontrol et
console.log('=== localStorage Kontrolü ===');

// Tüm localStorage anahtarlarını listele
console.log('Tüm localStorage anahtarları:');
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  const value = localStorage.getItem(key);
  console.log(`${key}: ${value}`);
}

console.log('\n=== Özel Kontroller ===');

// Kullanıcı ile ilgili anahtarları kontrol et
const userKeys = ['user', 'adminUser', 'token', 'adminToken', 'nickname', 'rememberNickname'];

userKeys.forEach(key => {
  const value = localStorage.getItem(key);
  if (value) {
    console.log(`${key}: ${value}`);
    try {
      const parsed = JSON.parse(value);
      console.log(`${key} (parsed):`, parsed);
    } catch (e) {
      console.log(`${key} JSON parse edilemedi`);
    }
  } else {
    console.log(`${key}: bulunamadı`);
  }
});

console.log('\n=== SessionStorage Kontrolü ===');
for (let i = 0; i < sessionStorage.length; i++) {
  const key = sessionStorage.key(i);
  const value = sessionStorage.getItem(key);
  console.log(`${key}: ${value}`);
}
