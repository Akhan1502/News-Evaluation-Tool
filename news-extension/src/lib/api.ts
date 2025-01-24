const API_BASE = 'http://localhost:8000';

interface AnalyzeRequest {
  title: string;
  content: string;
  url: string;
}

interface AnalyzeResponse {
  id: string;
  rating: number;
  title: string;
  summary: string;
}

export const api = {
  async analyzeContent(data: AnalyzeRequest): Promise<AnalyzeResponse> {
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
  }
}; 