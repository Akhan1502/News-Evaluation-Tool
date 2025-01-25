export interface ScrapedData {
  title: string
  content: string
}

export interface SentimentData {
  score: number
  label: string
}

export interface CriteriaItem {
  name: string
  met: boolean
  score: number
}

export interface AnalysisState {
  trustScore: number | null
  confidence: number | null
  sentiment: SentimentData | null
  criteria: CriteriaItem[]
  analysisId: string | null
} 