const API_BASE = 'http://localhost:8000';

export const api = {
  async getThemes() {
    const response = await fetch(`${API_BASE}/themes`);
    return response.json();
  },

  async getThemeDiffs(themeId: string) {
    const response = await fetch(`${API_BASE}/themes/${themeId}/diffs`);
    return response.json();
  },

  async createTheme(theme: Theme) {
    const response = await fetch(`${API_BASE}/themes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(theme),
    });
    return response.json();
  },

  async createDiff(diff: DiffItem) {
    const response = await fetch(`${API_BASE}/diffs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(diff),
    });
    return response.json();
  },
}; 