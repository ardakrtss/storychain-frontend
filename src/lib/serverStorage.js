// Server-side için ortak in-memory storage
// Bu dosya tüm API route'ları arasında paylaşılır

export const serverStorage = {
  // Kullanıcılar
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

  // Hikayeler
  stories: [],

  // Kullanıcı ekle
  addUser(user) {
    this.users.push(user);
    return user;
  },

  // Kullanıcı bul
  findUser(nickname) {
    return this.users.find(u => u.nickname.toLowerCase() === nickname.toLowerCase());
  },

  // Kullanıcı ID ile bul
  findUserById(id) {
    return this.users.find(u => u.id === id);
  },

  // Hikaye ekle
  addStory(story) {
    this.stories.push(story);
    return story;
  },

  // Hikayeleri getir
  getStories() {
    return this.stories;
  },

  // Tamamlanmış hikayeleri getir
  getCompletedStories() {
    return this.stories.filter(s => s.isCompleted && s.isActive);
  },

  // Popüler hikayeleri getir
  getPopularStories(limit = 10) {
    return this.stories
      .filter(s => s.isCompleted && s.isActive)
      .sort((a, b) => b.likeCount - a.likeCount)
      .slice(0, limit);
  }
};
