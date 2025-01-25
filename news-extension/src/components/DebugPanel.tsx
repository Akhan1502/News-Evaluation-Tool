import { useEffect, useState } from 'react'
import { APIError, api } from '../lib/api'

export function DebugPanel() {
  const [errors, setErrors] = useState<APIError[]>([])
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const handleApiError = (event: CustomEvent<APIError>) => {
      setErrors(prev => [event.detail, ...prev])
    }

    // Listen for API errors
    window.addEventListener('api-error', handleApiError as EventListener)

    // Initial errors
    setErrors(api.getErrors())

    return () => {
      window.removeEventListener('api-error', handleApiError as EventListener)
    }
  }, [])

  if (errors.length === 0) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-red-900/90 text-white p-2 text-sm">
      <div className="flex items-center justify-between mb-2">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-white/90 hover:text-white flex items-center gap-2"
        >
          <span>{isExpanded ? '▼' : '▶'} Debug Panel ({errors.length} errors)</span>
        </button>
        <button 
          onClick={() => {
            api.clearErrors()
            setErrors([])
          }}
          className="text-white/70 hover:text-white text-xs"
        >
          Clear
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {errors.map((error, index) => (
            <div key={index} className="bg-red-950/50 p-2 rounded text-xs">
              <div className="font-medium">{error.message}</div>
              <div className="text-white/70 mt-1">
                <div>Endpoint: {error.endpoint}</div>
                <div>Time: {new Date(error.timestamp).toLocaleString()}</div>
                {error.details && (
                  <pre className="mt-1 text-white/50 overflow-x-auto">
                    {JSON.stringify(error.details, null, 2)}
                  </pre>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}