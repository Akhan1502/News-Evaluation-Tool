import { useState, useEffect, useCallback } from 'react'

interface TextAnalysis {
  id: string
  title: string
  original_text: Array<{
    line_number: number
    content: string
  }>
  rating: number
}

export function AnalyzerPage() {
  const [analyses, setAnalyses] = useState<TextAnalysis[]>([])
  const [selectedAnalysis, setSelectedAnalysis] = useState<TextAnalysis | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Memoize the fetch function to prevent unnecessary rerenders
  const fetchAnalyses = useCallback(async () => {
    if (isLoading) return; // Prevent multiple simultaneous requests
    
    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:8000/analyses')
      const data = await response.json()
      
      // Only update if data has changed
      if (JSON.stringify(data) !== JSON.stringify(analyses)) {
        setAnalyses(data)
        
        // Update selected analysis only if necessary
        if (selectedAnalysis) {
          const updated = data.find(a => a.id === selectedAnalysis.id)
          if (updated && JSON.stringify(updated) !== JSON.stringify(selectedAnalysis)) {
            setSelectedAnalysis(updated)
          }
        } else if (data.length > 0) {
          setSelectedAnalysis(data[0])
        }
      }
    } catch (error) {
      console.error('Failed to fetch analyses:', error)
    } finally {
      setIsLoading(false)
    }
  }, [analyses, selectedAnalysis, isLoading])

  // Initial fetch
  useEffect(() => {
    fetchAnalyses()
  }, [fetchAnalyses])

  // Polling setup
  useEffect(() => {
    const interval = setInterval(fetchAnalyses, 5000)
    return () => clearInterval(interval)
  }, [fetchAnalyses])

  // Handle analysis selection
  const handleAnalysisSelect = useCallback((analysis: TextAnalysis) => {
    if (analysis.id !== selectedAnalysis?.id) {
      setSelectedAnalysis(analysis)
    }
  }, [selectedAnalysis])

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="h-12 border-b border-white/10 flex items-center justify-between px-4">
        <span className="text-sm font-medium text-white/90">News Analyzer</span>
        {isLoading && (
          <span className="text-xs text-white/50 animate-fade-in">Updating...</span>
        )}
      </div>

      <div className="flex h-[calc(100vh-48px)]">
        {/* Analyses Sidebar */}
        <div className="w-64 border-r border-white/10 overflow-y-auto">
          <div className="p-2">
            <div className="space-y-1">
              {analyses.map(analysis => (
                <button
                  key={analysis.id}
                  onClick={() => handleAnalysisSelect(analysis)}
                  className={`w-full text-left p-2 rounded text-sm transition-colors ${
                    selectedAnalysis?.id === analysis.id 
                      ? 'bg-[#1a1a1a] border border-white/10' 
                      : 'hover:bg-[#161616]'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-gray-200 truncate">{analysis.title}</span>
                    <span className="text-xs text-gray-400 ml-2">{analysis.rating}%</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {selectedAnalysis ? (
            <div className="p-2">
              <div className="mb-4 text-xs">
                <div className="flex items-center justify-between bg-[#161616] px-3 py-1.5 border border-white/10 rounded-t">
                  <span className="text-gray-400">{selectedAnalysis.title}</span>
                  <span className="text-xs text-gray-400">{selectedAnalysis.rating}%</span>
                </div>

                <div className="border border-t-0 border-white/10 rounded-b font-mono">
                  {selectedAnalysis.original_text.map((line) => (
                    <div key={line.line_number} className="group relative">
                      <div className="flex">
                        <span className="w-8 text-right pr-2 text-gray-500 select-none border-r border-white/10 py-1">
                          {line.line_number}
                        </span>
                        <span className="px-2 py-1 text-gray-200 whitespace-pre-wrap">
                          {line.content}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 text-sm">
              Select an analysis to view details
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 