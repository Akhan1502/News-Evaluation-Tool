const API_BASE = 'http://localhost:8000';

export const api = {
  async analyzeContent(data: { title: string; content: string }) {
    const response = await fetch(`${API_BASE}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
}; 