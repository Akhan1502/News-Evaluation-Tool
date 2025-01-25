import { Check } from 'lucide-react'

interface CriteriaCheckProps {
  criteria: {
    name: string
    met: boolean
    score: number
  }[]
}

export function CriteriaCheck({ criteria }: CriteriaCheckProps) {
  const getGradient = (score: number) => {
    // Define color stops based on score
    const red = '#ef4444'
    const yellow = '#eab308'
    const green = '#22c55e'
    
    if (score >= 70) {
      return `linear-gradient(135deg, ${green}20 0%, ${yellow}20 100%)`
    } else {
      return `linear-gradient(135deg, ${yellow}20 0%, ${red}20 100%)`
    }
  }

  return (
    <div className="bg-zinc-900/50 rounded-lg p-1.5 space-y-1">
      {criteria.map((item) => (
        <div 
          key={item.name}
          className="flex items-center justify-between p-2 rounded-md transition-all duration-300"
          style={{
            background: getGradient(item.score),
          }}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded flex items-center justify-center ${
                item.met 
                  ? 'bg-white/20 text-white' 
                  : 'bg-white/10 text-white/40'
              }`}>
                <Check className="w-3 h-3" />
              </div>
              <span className="text-xs font-medium text-white">{item.name}</span>
            </div>
            <span className="text-xs text-white/80 tabular-nums">{item.score}%</span>
          </div>
        </div>
      ))}
    </div>
  )
} 