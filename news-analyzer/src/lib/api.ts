import { API_CONFIG } from './constants';

export interface ParagraphView {
  id: string;
  content: string;
  source: string;
  alternativeViews: Array<{
    content: string;
    source: string;
  }>;
}

export interface TextAnalysis {
  id: string;
  title: string;
  rating: number;
  summary: string;
  content: string;
  trust_score: number;
  source: string;
  url: string;
  paragraphs: ParagraphView[];
}

export interface ArticleData {
  title: string;
  content: string;
  url: string;
  paragraphs: Array<{
    content: string;
    source: string;
    alternativeViews?: Array<{
      content: string;
      source: string;
    }>;
  }>;
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
    const response = await fetch(`${API_CONFIG.BASE_URL}/api/news`);
    if (!response.ok) {
      throw new Error('Failed to fetch analyses');
    }
    const data = await response.json();
    
    // Transform the API response to ensure proper structure
    return data.map((item: any) => ({
      ...item,
      paragraphs: item.paragraphs?.map((p: any) => ({
        id: p.id?.toString() || Math.random().toString(36).substr(2, 9),
        content: p.content,
        source: p.source,
        alternativeViews: p.alternative_views?.map((av: any) => ({
          content: av.content,
          source: av.source
        })) || []
      })) || []
    }));
  },

  async analyzeContent(data: ArticleData): Promise<AnalysisResponse> {
    console.log('Analyzing content:', data);

    // Ensure all required fields are present
    if (!data.title || !data.content || !data.url) {
      throw new Error('Missing required fields: title, content, and url are required');
    }

    // Add source if not provided
    const enrichedData = {
      ...data,
      source: data.source || 'User Submission',
      paragraphs: data.paragraphs || [
        {
          content: data.content,
          source: data.source || 'User Submission',
          alternativeViews: []
        }
      ]
    };

    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/api/news/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(enrichedData),
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
    const response = await fetch(`${API_CONFIG.BASE_URL}/themes`);
    return response.json();
  },

  async getThemeDiffs(themeId: string) {
    const response = await fetch(`${API_CONFIG.BASE_URL}/themes/${themeId}/diffs`);
    return response.json();
  },

  async createTheme(theme: Theme) {
    const response = await fetch(`${API_CONFIG.BASE_URL}/themes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(theme),
    });
    return response.json();
  },

  async createDiff(diff: DiffItem) {
    const response = await fetch(`${API_CONFIG.BASE_URL}/diffs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(diff),
    });
    return response.json();
  },
};