import { API_CONFIG } from './constants';

const API_BASE = 'http://localhost:8000';

export interface TextAnalysis {
  id: string;
  title: string;
  rating: number;
  summary: string;
  content: string;
}

export interface ArticleData {
  title: string;
  content: string;
  url: string;
}

export interface AnalysisResponse {
  trustScore: number;
  confidence: number;
  sentiment: {
    score: number;
    label: string;
  };
  criteria: Array<{
    name: string;
    met: boolean;
    score: number;
  }>;
  analysisId: string;
  articleUrl: string;
}

export interface SentimentHistory {
  history: Array<{
    timestamp: string;
    value: number;
  }>;
}

export const api = {
  async getAnalyses(): Promise<TextAnalysis[]> {
    const response = await fetch(`${API_BASE}/analyses`);
    if (!response.ok) {
      throw new Error('Failed to fetch analyses');
    }
    return response.json();
  },

  async analyzeContent(data: ArticleData): Promise<AnalysisResponse> {
    console.log('Analyzing content:', data);

    if (!data.url || !data.title || !data.content) {
      throw new Error('Missing required fields: title, content, and url are required');
    }

    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API Error: ${response.statusText} - ${JSON.stringify(errorData)}`);
      }

      const result = await response.json();
      console.log('Analysis result:', result);
      return result;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
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

  async getSentimentHistory(url: string): Promise<SentimentHistory> {
    try {
      const response = await fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SENTIMENT_HISTORY}?url=${encodeURIComponent(url)}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API Error: ${response.statusText} - ${JSON.stringify(errorData)}`);
      }

      return response.json();
    } catch (error) {
      console.error('Sentiment history request failed:', error);
      throw error;
    }
  }
}; 