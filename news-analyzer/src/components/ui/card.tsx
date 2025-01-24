import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border border-white/10 bg-[#121212] text-gray-200 shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

export { Card } 