// Environment-specific configuration
const isDevelopment = import.meta.env.DEV;

export const CONFIG = {
  API_BASE_URL: isDevelopment
    ? 'http://localhost:8000'
    : 'http://localhost:8000', // Keep localhost for now, change in production
  ANALYSIS_DASHBOARD_URL: isDevelopment
    ? 'http://localhost:5173/analysis'
    : 'http://localhost:5173/analysis', // Keep localhost for now, change in production
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