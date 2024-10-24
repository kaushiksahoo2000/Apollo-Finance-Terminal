"use client"
import { cn } from "@/lib/utils"
import { useState } from "react"

export default function ReadMoreText({
  text,
  truncateLength,
  className,
}: {
  text: string
  truncateLength: number
  className?: string
}) {
  const [isReadMore, setIsReadMore] = useState(false)
  const truncateText = text.slice(0, truncateLength) + "..."

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <p>{isReadMore ? text : truncateText}</p>
      {text.length > truncateLength && (
        <button
          onClick={() => setIsReadMore(!isReadMore)}
          className="underline"
        >
          {isReadMore ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  )
}
