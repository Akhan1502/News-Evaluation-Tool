import { openDB, DBSchema } from 'idb';

interface NewsAnalyzerDB extends DBSchema {
  themes: {
    key: string;
    value: Theme;
  };
  diffs: {
    key: string;
    value: DiffItem;
    indexes: { 'by-theme': string };
  };
}

export const db = {
  async init() {
    return openDB<NewsAnalyzerDB>('news-analyzer', 1, {
      upgrade(db) {
        const themeStore = db.createObjectStore('themes', { keyPath: 'id' });
        const diffStore = db.createObjectStore('diffs', { keyPath: 'id' });
        diffStore.createIndex('by-theme', 'themeId');
      },
    });
  },

  async saveTheme(theme: Theme) {
    const database = await this.init();
    return database.put('themes', theme);
  },

  async saveThemes(themes: Theme[]) {
    const database = await this.init();
    const tx = database.transaction('themes', 'readwrite');
    await Promise.all([
      ...themes.map(theme => tx.store.put(theme)),
      tx.done,
    ]);
  },

  async saveDiff(diff: DiffItem) {
    const database = await this.init();
    return database.put('diffs', diff);
  },

  async saveDiffs(diffs: DiffItem[]) {
    const database = await this.init();
    const tx = database.transaction('diffs', 'readwrite');
    await Promise.all([
      ...diffs.map(diff => tx.store.put(diff)),
      tx.done,
    ]);
  },

  async getThemes(): Promise<Theme[]> {
    const database = await this.init();
    return database.getAll('themes');
  },

  async getDiffs(): Promise<DiffItem[]> {
    const database = await this.init();
    return database.getAll('diffs');
  },

  async getDiffsByTheme(themeId: string): Promise<DiffItem[]> {
    const database = await this.init();
    const index = database.transaction('diffs').store.index('by-theme');
    return index.getAll(themeId);
  }
}; 