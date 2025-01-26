// Environment-specific configuration
const isDevelopment = import.meta.env.DEV;

export const CONFIG = {
  API_BASE_URL: 'http://localhost:8000', // Using localhost for all modes temporarily
  ANALYSIS_DASHBOARD_URL: 'http://localhost:8000/analysis', // Using full URL to ensure proper redirection
  ENDPOINTS: {
    ANALYZE: '/analyze',
    SENTIMENT_HISTORY: '/sentiment/history',
    CRITERIA_CHECK: '/criteria',
  }
} as const;

// Log the current configuration and environment
console.log('Environment:', isDevelopment ? 'Development' : 'Production');
console.log('API URL:', CONFIG.API_BASE_URL);
console.log('Dashboard URL:', CONFIG.ANALYSIS_DASHBOARD_URL);