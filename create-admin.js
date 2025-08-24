const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

// MongoDB bağlantısı
mongoose.connect('mongodb://localhost:27017/storychain', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function createAdminUser() {
  try {
    // Admin kullanıcısı bilgileri
    const adminData = {
      nickname: 'admin',
      password: 'admin123',
      email: 'admin@storychain.com',
      role: 'admin',
      isActive: true,
      storiesWritten: 0,
      likedStories: [],
      totalLikes: 0
    };

    // Şifreyi hash'le
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(adminData.password, saltRounds);

    // Kullanıcıyı oluştur
    const adminUser = new User({
      ...adminData,
      password: hashedPassword
    });

    // Veritabanına kaydet
    await adminUser.save();

    console.log('✅ Admin kullanıcısı başarıyla oluşturuldu!');
    console.log('👤 Kullanıcı Adı: admin');
    console.log('🔑 Şifre: admin123');
    console.log('🎯 Rol: admin');
    console.log('📧 Email: admin@storychain.com');
    console.log('\n🚀 Şimdi bu bilgilerle giriş yapabilirsiniz!');

  } catch (error) {
    if (error.code === 11000) {
      console.log('⚠️  Admin kullanıcısı zaten mevcut!');
      console.log('👤 Kullanıcı Adı: admin');
      console.log('🔑 Şifre: admin123');
    } else {
      console.error('❌ Hata:', error.message);
    }
  } finally {
    mongoose.connection.close();
  }
}

createAdminUser();
