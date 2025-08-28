// LocalStorage tabanlı veri saklama sistemi
import { safeStorage } from './safeStorage.js';

const STORAGE_KEYS = {
  USER: 'storychain_user',
  STORIES: 'storychain_stories',
  THEMES: 'storychain_themes',
  LEADERBOARD: 'storychain_leaderboard'
};

// Kullanıcı verileri
export const userStorage = {
  save: (user) => {
    safeStorage.set(STORAGE_KEYS.USER, JSON.stringify(user));
  },
  
  get: () => {
    const user = safeStorage.get(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  },
  
  remove: () => {
    safeStorage.remove(STORAGE_KEYS.USER);
  },
  
  update: (updates) => {
    const user = userStorage.get();
    if (user) {
      const updatedUser = { ...user, ...updates };
      userStorage.save(updatedUser);
      return updatedUser;
    }
    return null;
  },
  
  // Case-insensitive kullanıcı adı kontrolü
  isNicknameTaken: (nickname) => {
    const users = JSON.parse(safeStorage.get('storychain_users') || '[]');
    const normalizedNickname = nickname.toLowerCase().trim();
    return users.some(user => user.nickname.toLowerCase() === normalizedNickname);
  },
  
  // Kullanıcı kaydetme (case-insensitive kontrol ile)
  registerUser: (userData) => {
    const users = JSON.parse(safeStorage.get('storychain_users') || '[]');
    const normalizedNickname = userData.nickname.toLowerCase().trim();
    
    // Kullanıcı adı zaten var mı kontrol et
    if (users.some(user => user.nickname.toLowerCase() === normalizedNickname)) {
      return { success: false, error: 'Bu kullanıcı adı zaten kullanılıyor.' };
    }
    
    // Yeni kullanıcıyı kaydet
    const newUser = {
      ...userData,
      nickname: userData.nickname.trim(), // Orijinal yazımı koru
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    safeStorage.set('storychain_users', JSON.stringify(users));
    
    return { success: true, user: newUser };
  }
};

// Hikaye verileri
export const storyStorage = {
  save: (stories) => {
    safeStorage.set(STORAGE_KEYS.STORIES, JSON.stringify(stories));
  },
  
  get: () => {
    const stories = safeStorage.get(STORAGE_KEYS.STORIES);
    return stories ? JSON.parse(stories) : [];
  },
  
  add: (story) => {
    const stories = storyStorage.get();
    const newStory = {
      ...story,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      likes: [],
      likeCount: 0
    };
    stories.unshift(newStory);
    storyStorage.save(stories);
    return newStory;
  },
  
  update: (storyId, updates) => {
    const stories = storyStorage.get();
    const index = stories.findIndex(s => s.id === storyId);
    if (index !== -1) {
      stories[index] = { ...stories[index], ...updates };
      storyStorage.save(stories);
      return stories[index];
    }
    return null;
  },
  
  like: (storyId, userId) => {
    const stories = storyStorage.get();
    const story = stories.find(s => s.id === storyId);
    if (story) {
      const likeIndex = story.likes.indexOf(userId);
      if (likeIndex > -1) {
        story.likes.splice(likeIndex, 1);
      } else {
        story.likes.push(userId);
      }
      story.likeCount = story.likes.length;
      storyStorage.save(stories);
      return story;
    }
    return null;
  },
  
  getByTheme: (theme) => {
    const stories = storyStorage.get();
    return stories.filter(s => s.theme === theme && s.isCompleted);
  },
  
  getCompleted: () => {
    const stories = storyStorage.get();
    return stories.filter(s => s.isCompleted);
  },
  
  getPopular: () => {
    const stories = storyStorage.get();
    return stories
      .filter(s => s.isCompleted)
      .sort((a, b) => b.likeCount - a.likeCount)
      .slice(0, 10);
  }
};

// Tema verileri
export const themeStorage = {
  save: (themes) => {
    safeStorage.set(STORAGE_KEYS.THEMES, JSON.stringify(themes));
  },
  
  get: () => {
    const themes = safeStorage.get(STORAGE_KEYS.THEMES);
    if (themes) {
      return JSON.parse(themes);
    }
    
    // Varsayılan temalar
    const defaultThemes = [
      {
        id: 'fantastik',
        name: 'Fantastik',
        description: 'Büyülü dünyalar, sihirli yaratıklar ve olağanüstü maceralar',
        icon: '🧙‍♂️',
        color: '#8B5CF6',
        characters: 'Sihirbaz, Ejderha, Peri, Büyülü Hayvanlar',
        plotHints: 'Kayıp bir büyü kitabı, gizli bir orman, unutulmuş bir krallık'
      },
      {
        id: 'gizem',
        name: 'Gizem',
        description: 'Gizemli olaylar, ipuçları ve heyecan verici keşifler',
        icon: '🔍',
        color: '#3B82F6',
        characters: 'Dedektif, Gizemli Yabancı, Şüpheli Karakterler',
        plotHints: 'Kayıp bir hazine haritası, gizli geçitler, şifreli mesajlar'
      },
      {
        id: 'bilim-kurgu',
        name: 'Bilim Kurgu',
        description: 'Gelecekteki teknolojiler, uzay yolculukları ve robotlar',
        icon: '🚀',
        color: '#06B6D4',
        characters: 'Astronot, Robot, Uzaylı, Bilim İnsanı',
        plotHints: 'Yeni bir gezegen keşfi, zaman makinesi, yapay zeka'
      },
      {
        id: 'macera',
        name: 'Macera',
        description: 'Tehlikeli yolculuklar, cesur kahramanlar ve büyük zorluklar',
        icon: '🗺️',
        color: '#10B981',
        characters: 'Kaşif, Savaşçı, Rehber, Yerli Halk',
        plotHints: 'Bilinmeyen bir ada, antik tapınak, tehlikeli orman'
      },
      {
        id: 'sifir-atik',
        name: 'Sıfır Atık',
        description: 'Çevre dostu yaşam, geri dönüşüm ve doğa sevgisi',
        icon: '♻️',
        color: '#059669',
        characters: 'Çevreci Çocuk, Geri Dönüşüm Ustası, Doğa Koruyucusu',
        plotHints: 'Çöplerden yapılan sanat, organik bahçe, temiz enerji'
      },
      {
        id: 'iklim-degisikligi',
        name: 'İklim Değişikliği',
        description: 'İklim sorunları, çözümler ve gelecek için umut',
        icon: '🌍',
        color: '#0D9488',
        characters: 'İklim Aktivisti, Bilim İnsanı, Gelecek Çocuğu',
        plotHints: 'Yenilenebilir enerji, karbon ayak izi, yeşil teknoloji'
      }
    ];
    
    themeStorage.save(defaultThemes);
    return defaultThemes;
  },
  
  getById: (id) => {
    const themes = themeStorage.get();
    return themes.find(t => t.id === id);
  }
};

// Lider tablosu verileri
export const leaderboardStorage = {
  save: (data) => {
    safeStorage.set(STORAGE_KEYS.LEADERBOARD, JSON.stringify(data));
  },
  
  get: () => {
    const data = safeStorage.get(STORAGE_KEYS.LEADERBOARD);
    return data ? JSON.parse(data) : { writers: [], stories: [] };
  },
  
  updateWriters: (writers) => {
    const data = leaderboardStorage.get();
    data.writers = writers;
    leaderboardStorage.save(data);
  },
  
  updateStories: (stories) => {
    const data = leaderboardStorage.get();
    data.stories = stories;
    leaderboardStorage.save(data);
  }
};

// Tüm verileri temizle
export const clearAllData = () => {
  Object.values(STORAGE_KEYS).forEach(key => {
    safeStorage.remove(key);
  });
};
