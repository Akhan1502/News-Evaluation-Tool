import { cn } from "../../lib/utils"
import { useEffect, useState } from "react"

interface GaugeProps {
  value: number
  label?: string
  size?: "sm" | "md" | "lg"
  type?: "trust" | "confidence" | "sentiment"
}

export function Gauge({ 
  value, 
  label,
  size = "md",
  type = "trust"
}: GaugeProps) {
  const [currentValue, setCurrentValue] = useState(0)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentValue(value)
    }, 100)
    return () => clearTimeout(timer)
  }, [value])

  const getColor = (type: string) => {
    switch (type) {
      case "trust":
        return "#22c55e" // green-500
      case "confidence":
        return "#3b82f6" // blue-500
      case "sentiment":
        return "#8b5cf6" // violet-500
      default:
        return "#ef4444" // red-500
    }
  }

  const sizeClasses = {
    sm: "w-20",
    md: "w-24",
    lg: "w-28"
  }

  // Calculate the stroke dash array and offset
  const radius = 35
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = `${circumference} ${circumference}`
  const progress = (currentValue / 100) * circumference
  const strokeDashoffset = circumference - progress

  return (
    <div className={cn("flex flex-col items-center w-full", sizeClasses[size])}>
      <div className="relative w-full pt-[100%]">
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/80 rounded-lg">
          {/* Background Track */}
          <svg className="absolute w-full h-full -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              fill="transparent"
              stroke="#27272A" // zinc-800
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={circumference / 2} // Only show half circle
              className="transform origin-center"
            />
            {/* Progress Arc */}
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              fill="transparent"
              stroke={getColor(type)}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset + (circumference / 2)} // Adjust for half circle
              className="transform origin-center transition-all duration-700 ease-out"
            />
          </svg>
          
          {/* Value Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={cn(
              "font-mono font-bold",
              size === "sm" && "text-xl",
              size === "md" && "text-2xl",
              size === "lg" && "text-3xl"
            )}>
              {Math.round(currentValue)}%
            </span>
          </div>
        </div>
      </div>
      {label && (
        <span className="mt-2 text-sm font-medium text-zinc-400">{label}</span>
      )}
    </div>
  )
} 