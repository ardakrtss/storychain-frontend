// StoryChain Veri Sıfırlama Script'i
// Bu script tüm localStorage verilerini temizler

console.log('🗑️ StoryChain Veri Sıfırlama Başlatılıyor...');

// Tüm localStorage'ı temizle
localStorage.clear();

console.log('✅ localStorage temizlendi!');

// Silinen verileri de temizle
localStorage.removeItem('deletedUsers');
localStorage.removeItem('deletedStories');
localStorage.removeItem('roleChanges');
localStorage.removeItem('storyLikes');
localStorage.removeItem('userLikes');

console.log('✅ Silinen veriler temizlendi!');

// Kullanıcı oturumunu da temizle
localStorage.removeItem('user');
localStorage.removeItem('token');

console.log('✅ Kullanıcı oturumu temizlendi!');

alert('🎉 Tüm veriler başarıyla sıfırlandı!\n\nŞimdi sayfayı yenileyin.');

console.log('🔄 Sayfa yenileniyor...');
window.location.reload();
