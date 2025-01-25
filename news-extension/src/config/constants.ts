// TODO: When deploying to production, replace these URLs with:
// API: https://api.newsanalyzer.com/v1
// Dashboard: https://dashboard.newsanalyzer.com/analysis

export const CONFIG = {
  // Always use localhost during development
  API_BASE_URL: 'http://localhost:8000',
  ANALYSIS_DASHBOARD_URL: 'http://localhost:5173/analysis',
  ENDPOINTS: {
    ANALYZE: '/analyze',
    SENTIMENT_HISTORY: '/sentiment/history',
    CRITERIA_CHECK: '/criteria',
  }
} as const

// Log the current configuration
console.log('API URL:', CONFIG.API_BASE_URL)
console.log('Dashboard URL:', CONFIG.ANALYSIS_DASHBOARD_URL) 