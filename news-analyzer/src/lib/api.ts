const API_BASE = 'http://localhost:8000';

export interface TextAnalysis {
  id: string;
  title: string;
  rating: number;
  summary: string;
  content: string;
}

export const api = {
  async getAnalyses(): Promise<TextAnalysis[]> {
    const response = await fetch(`${API_BASE}/analyses`);
    if (!response.ok) {
      throw new Error('Failed to fetch analyses');
    }
    return response.json();
  },

  async analyzeContent(data: { title: string; content: string; url: string }): Promise<TextAnalysis> {
    const response = await fetch(`${API_BASE}/analyses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Analysis request failed');
    }
    
    return response.json();
  },

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