// Global storage sistemi - Tüm API route'ları arasında paylaşılır
// Node.js global değişkenleri kullanarak in-memory storage

// Global storage objesi
if (!global.storychainStorage) {
  global.storychainStorage = {
    users: [
      {
        id: '1',
        nickname: 'demo',
        password: 'password',
        createdAt: new Date().toISOString(),
        isActive: true,
        role: 'user'
      }
    ],
    stories: []
  };
}

// Storage işlemleri için helper fonksiyonlar
export const globalStorage = {
  // Kullanıcı işlemleri
  users: {
    // Tüm kullanıcıları getir
    getAll() {
      return global.storychainStorage.users;
    },

    // Kullanıcı ekle
    add(user) {
      global.storychainStorage.users.push(user);
      return user;
    },

    // Nickname ile kullanıcı bul
    findByNickname(nickname) {
      return global.storychainStorage.users.find(u => 
        u.nickname.toLowerCase() === nickname.toLowerCase()
      );
    },

    // ID ile kullanıcı bul
    findById(id) {
      return global.storychainStorage.users.find(u => u.id === id);
    },

    // Kullanıcı güncelle
    update(id, updates) {
      const userIndex = global.storychainStorage.users.findIndex(u => u.id === id);
      if (userIndex !== -1) {
        global.storychainStorage.users[userIndex] = {
          ...global.storychainStorage.users[userIndex],
          ...updates
        };
        return global.storychainStorage.users[userIndex];
      }
      return null;
    },

    // Kullanıcı sil
    delete(id) {
      const userIndex = global.storychainStorage.users.findIndex(u => u.id === id);
      if (userIndex !== -1) {
        return global.storychainStorage.users.splice(userIndex, 1)[0];
      }
      return null;
    }
  },

  // Hikaye işlemleri
  stories: {
    // Tüm hikayeleri getir
    getAll() {
      return global.storychainStorage.stories;
    },

    // Hikaye ekle
    add(story) {
      global.storychainStorage.stories.push(story);
      return story;
    },

    // ID ile hikaye bul
    findById(id) {
      return global.storychainStorage.stories.find(s => s.id === id);
    },

    // Hikaye güncelle
    update(id, updates) {
      const storyIndex = global.storychainStorage.stories.findIndex(s => s.id === id);
      if (storyIndex !== -1) {
        global.storychainStorage.stories[storyIndex] = {
          ...global.storychainStorage.stories[storyIndex],
          ...updates
        };
        return global.storychainStorage.stories[storyIndex];
      }
      return null;
    },

    // Hikaye sil
    delete(id) {
      const storyIndex = global.storychainStorage.stories.findIndex(s => s.id === id);
      if (storyIndex !== -1) {
        return global.storychainStorage.stories.splice(storyIndex, 1)[0];
      }
      return null;
    },

    // Tamamlanmış hikayeleri getir
    getCompleted() {
      return global.storychainStorage.stories.filter(s => s.isCompleted && s.isActive);
    },

    // Popüler hikayeleri getir
    getPopular(limit = 10) {
      return global.storychainStorage.stories
        .filter(s => s.isCompleted && s.isActive)
        .sort((a, b) => b.likeCount - a.likeCount)
        .slice(0, limit);
    }
  },

  // Storage durumunu getir (debug için)
  getStatus() {
    return {
      userCount: global.storychainStorage.users.length,
      storyCount: global.storychainStorage.stories.length,
      users: global.storychainStorage.users.map(u => ({ id: u.id, nickname: u.nickname })),
      stories: global.storychainStorage.stories.map(s => ({ id: s.id, title: s.title }))
    };
  },

  // Storage'ı temizle (test için)
  clear() {
    global.storychainStorage.users = [
      {
        id: '1',
        nickname: 'demo',
        password: 'password',
        createdAt: new Date().toISOString(),
        isActive: true,
        role: 'user'
      }
    ];
    global.storychainStorage.stories = [];
  }
};
