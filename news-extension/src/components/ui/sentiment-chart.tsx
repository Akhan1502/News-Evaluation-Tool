import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

interface SentimentChartProps {
  data: {
    time: string
    value: number
  }[]
}

export function SentimentChart({ data }: SentimentChartProps) {
  // Generate mock historical data for 2 years
  const historicalData = [
    { time: '2Y ago', value: 0.3 },
    { time: '18M ago', value: 0.4 },
    { time: '1Y ago', value: 0.6 },
    { time: '9M ago', value: 0.5 },
    { time: '6M ago', value: 0.7 },
    { time: '3M ago', value: 0.4 },
    { time: '1M ago', value: 0.8 },
    { time: 'Current', value: data[data.length - 1]?.value || 0 }
  ]

  return (
    <div className="h-32 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={historicalData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="sentiment" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="time" 
            tick={{ fontSize: 10, fill: '#71717a' }}
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 10, fill: '#71717a' }}
            tickLine={false}
            domain={[-1, 1]}
          />
          <Tooltip 
            contentStyle={{ 
              background: '#18181b',
              border: '1px solid #3f3f46',
              borderRadius: '6px'
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            fillOpacity={1}
            fill="url(#sentiment)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
} 