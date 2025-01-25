import { CONFIG } from '../config/constants'

export interface AnalysisResponse {
  trustScore: number
  confidence: number
  sentiment: {
    score: number
    label: string
  }
  criteria: {
    name: string
    met: boolean
    score: number
  }[]
  analysisId: string
}

export interface SentimentHistoryResponse {
  history: Array<{
    timestamp: string
    value: number
  }>
}

export interface APIError {
  message: string
  timestamp: string
  endpoint: string
  details?: any
}

class APIService {
  private baseUrl: string
  private errors: APIError[] = []
  private maxErrors = 50 // Keep last 50 errors

  constructor() {
    this.baseUrl = CONFIG.API_BASE_URL
    console.log('API Service initialized with base URL:', this.baseUrl)
  }

  private addError(error: APIError) {
    this.errors.unshift(error)
    if (this.errors.length > this.maxErrors) {
      this.errors.pop()
    }
    // Dispatch error event for debug panel
    window.dispatchEvent(new CustomEvent('api-error', { detail: error }))
  }

  getErrors(): APIError[] {
    return [...this.errors]
  }

  clearErrors() {
    this.errors = []
  }

  private async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    console.log(`Making API request to: ${url}`, options?.body)
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Origin': window.location.origin,
          ...options?.headers,
        },
        credentials: 'include', // Include credentials for CORS
      })

      if (!response.ok) {
        let errorMessage = ''
        try {
          const errorData = await response.json()
          errorMessage = errorData.detail || response.statusText
        } catch {
          errorMessage = await response.text()
        }

        const apiError: APIError = {
          message: `API Error: ${errorMessage}`,
          timestamp: new Date().toISOString(),
          endpoint,
          details: {
            status: response.status,
            statusText: response.statusText
          }
        }
        this.addError(apiError)
        throw apiError
      }

      return response.json()
    } catch (error) {
      const apiError: APIError = {
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        endpoint
      }
      this.addError(apiError)
      throw apiError
    }
  }

  async analyzeContent(data: { title: string; content: string; url?: string }): Promise<AnalysisResponse> {
    return this.fetch<AnalysisResponse>(CONFIG.ENDPOINTS.ANALYZE, {
      method: 'POST',
      body: JSON.stringify({
        ...data,
        url: data.url || window.location.href
      }),
    })
  }

  async getSentimentHistory(url: string): Promise<SentimentHistoryResponse> {
    return this.fetch<SentimentHistoryResponse>(`${CONFIG.ENDPOINTS.SENTIMENT_HISTORY}?url=${encodeURIComponent(url)}`)
  }
}

export const api = new APIService()