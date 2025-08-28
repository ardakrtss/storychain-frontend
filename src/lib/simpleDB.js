// Basit localStorage tabanlı veritabanı (geçici çözüm)
// Gerçek projede Firebase/Database kullanılacak

// Kullanıcı işlemleri
export const userDB = {
  // Kullanıcı oluşturma
  createUser: async (userData) => {
    try {
      const { nickname, password } = userData;
      
      // Mevcut kullanıcıları al
      const users = JSON.parse(localStorage.getItem('storychain_users') || '[]');
      
      // Kullanıcı adı zaten var mı kontrol et (case-insensitive)
      const existingUser = users.find(u => 
        u.nickname.toLowerCase() === nickname.toLowerCase()
      );
      
      if (existingUser) {
        return { success: false, error: 'Bu kullanıcı adı zaten kullanılıyor' };
      }

      // Yeni kullanıcı oluştur
      const newUser = {
        id: Date.now().toString(),
        nickname: nickname.trim(),
        password: password, // Gerçek projede hash'lenecek
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true,
        role: 'user'
      };

      // Kullanıcıyı kaydet
      users.push(newUser);
      localStorage.setItem('storychain_users', JSON.stringify(users));

      // Şifreyi çıkar ve döndür
      const { password: _, ...userWithoutPassword } = newUser;
      return { success: true, user: userWithoutPassword };

    } catch (error) {
      console.error('Kullanıcı oluşturma hatası:', error);
      return { success: false, error: 'Kullanıcı oluşturulamadı' };
    }
  },

  // Kullanıcı adına göre kullanıcı getirme
  getUserByNickname: async (nickname) => {
    try {
      const users = JSON.parse(localStorage.getItem('storychain_users') || '[]');
      const user = users.find(u => 
        u.nickname.toLowerCase() === nickname.toLowerCase()
      );
      
      return user || null;

    } catch (error) {
      console.error('Kullanıcı getirme hatası:', error);
      return null;
    }
  },

  // Kullanıcı ID'sine göre kullanıcı getirme
  getUserById: async (userId) => {
    try {
      const users = JSON.parse(localStorage.getItem('storychain_users') || '[]');
      const user = users.find(u => u.id === userId);
      
      return user || null;

    } catch (error) {
      console.error('Kullanıcı getirme hatası:', error);
      return null;
    }
  },

  // Kullanıcı doğrulama
  authenticateUser: async (nickname, password) => {
    try {
      const user = await userDB.getUserByNickname(nickname);
      
      if (!user) {
        return { success: false, error: 'Kullanıcı bulunamadı' };
      }

      // Şifreyi kontrol et (gerçek projede hash karşılaştırması yapılacak)
      if (user.password !== password) {
        return { success: false, error: 'Geçersiz şifre' };
      }

      // Şifreyi çıkar ve döndür
      const { password: _, ...userWithoutPassword } = user;
      return { success: true, user: userWithoutPassword };

    } catch (error) {
      console.error('Kullanıcı doğrulama hatası:', error);
      return { success: false, error: 'Doğrulama hatası' };
    }
  }
};

// Hikaye işlemleri
export const storyDB = {
  // Hikaye oluşturma
  createStory: async (storyData) => {
    try {
      const { title, content, theme, authorId, authorNickname } = storyData;

      const newStory = {
        id: Date.now().toString(),
        title: title.trim(),
        content: content.trim(),
        theme: theme,
        authorId: authorId,
        authorNickname: authorNickname,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isCompleted: false,
        likes: [],
        likeCount: 0,
        views: 0,
        isActive: true
      };

      // Mevcut hikayeleri al
      const stories = JSON.parse(localStorage.getItem('storychain_stories') || '[]');
      
      // Hikayeyi kaydet
      stories.push(newStory);
      localStorage.setItem('storychain_stories', JSON.stringify(stories));

      return { success: true, story: newStory };

    } catch (error) {
      console.error('Hikaye oluşturma hatası:', error);
      return { success: false, error: 'Hikaye oluşturulamadı' };
    }
  },

  // Hikaye getirme (ID ile)
  getStoryById: async (storyId) => {
    try {
      const stories = JSON.parse(localStorage.getItem('storychain_stories') || '[]');
      const story = stories.find(s => s.id === storyId);
      
      return story || null;

    } catch (error) {
      console.error('Hikaye getirme hatası:', error);
      return null;
    }
  },

  // Tamamlanmış hikayeleri getirme
  getCompletedStories: async () => {
    try {
      const stories = JSON.parse(localStorage.getItem('storychain_stories') || '[]');
      const completedStories = stories.filter(s => 
        s.isCompleted && s.isActive
      ).slice(0, 50);

      return { success: true, stories: completedStories };

    } catch (error) {
      console.error('Tamamlanmış hikayeler getirme hatası:', error);
      return { success: false, error: 'Hikayeler getirilemedi' };
    }
  },

  // Popüler hikayeleri getirme
  getPopularStories: async (limit = 10) => {
    try {
      const stories = JSON.parse(localStorage.getItem('storychain_stories') || '[]');
      const popularStories = stories
        .filter(s => s.isCompleted && s.isActive)
        .sort((a, b) => b.likeCount - a.likeCount)
        .slice(0, limit);

      return { success: true, stories: popularStories };

    } catch (error) {
      console.error('Popüler hikayeler getirme hatası:', error);
      return { success: false, error: 'Hikayeler getirilemedi' };
    }
  }
};
