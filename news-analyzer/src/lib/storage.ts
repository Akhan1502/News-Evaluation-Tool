export interface LocalStorage {
  themes: Theme[];
  diffs: DiffItem[];
}

export const storage = {
  save: (data: Partial<LocalStorage>) => {
    const existing = storage.load();
    const newData = {
      themes: [...(existing?.themes || []), ...(data.themes || [])],
      diffs: [...(existing?.diffs || []), ...(data.diffs || [])]
    };
    localStorage.setItem('news-analyzer', JSON.stringify(newData));
  },
  
  load: (): LocalStorage => {
    const data = localStorage.getItem('news-analyzer');
    return data ? JSON.parse(data) : { themes: [], diffs: [] };
  },
  
  clear: () => {
    localStorage.removeItem('news-analyzer');
  },

  // Helper methods
  getThemes: () => {
    const data = storage.load();
    return data.themes;
  },

  getDiffs: () => {
    const data = storage.load();
    return data.diffs;
  },

  getDiffsByTheme: (themeId: string) => {
    const data = storage.load();
    return data.diffs.filter(diff => diff.themeId === themeId);
  },

  saveTheme: (theme: Theme) => {
    const data = storage.load();
    data.themes.push(theme);
    storage.save(data);
  },

  saveDiff: (diff: DiffItem) => {
    const data = storage.load();
    data.diffs.push(diff);
    storage.save(data);
  }
}; 