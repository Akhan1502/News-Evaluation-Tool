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

class APIService {
  private baseUrl: string

  constructor() {
    this.baseUrl = CONFIG.API_BASE_URL
    console.log('API Service initialized with base URL:', this.baseUrl)
  }

  private async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    console.log(`Making API request to: ${url}`, options?.body)
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('API Error:', errorText)
        throw new Error(`API Error: ${response.statusText} - ${errorText}`)
      }

      const data = await response.json()
      console.log('API Response:', data)
      return data
    } catch (error) {
      console.error('API Request failed:', error)
      throw error
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