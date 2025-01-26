export const API_CONFIG = {
  BASE_URL: 'http://localhost:8000',
  ENDPOINTS: {
    NEWS: '/api/news',
    NEWS_ANALYZE: '/api/news/analyze',
    SENTIMENT_HISTORY: '/sentiment/history'
  }
};

// For debugging
console.log('API Configuration:', API_CONFIG);