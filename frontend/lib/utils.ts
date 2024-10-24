import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Interval } from "@/types/yahoo-finance"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStartDate(interval: Interval) {
  const today = new Date()
  let subtractDays

  switch (interval) {
    case "1d":
    case "1m":
    case "2m":
    case "5m":
    case "15m":
    case "30m":
    case "60m":
    case "90m":
    case "1h":
      subtractDays = 1
      break
    case "5d":
      subtractDays = 5
      break
    case "1wk":
      subtractDays = 7
      break
    case "1mo":
      subtractDays = 30
      break
    case "3mo":
      subtractDays = 90
      break
    default:
      subtractDays = 0
  }

  today.setDate(today.getDate() - subtractDays)

  // Format the date in the 'YYYY-MM-DD' format
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0")
  const day = String(today.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

export function CalculateRange(range: string) {
  const currentDate = new Date()
  let from

  switch (range) {
    case "1d":
      currentDate.setDate(currentDate.getDate() - 1)
      break
    case "1w":
      currentDate.setDate(currentDate.getDate() - 7)
      break
    case "1m":
      currentDate.setMonth(currentDate.getMonth() - 1)
      break
    case "3m":
      currentDate.setMonth(currentDate.getMonth() - 3)
      break
    case "1y":
      currentDate.setFullYear(currentDate.getFullYear() - 1)
      break
    default:
      throw new Error(`Invalid range: ${range}`)
  }

  from = currentDate.toISOString().split("T")[0] // format date to 'YYYY-MM-DD'
  return from
}

export function calculateInterval(range: string) {
  let interval

  switch (range) {
    case "1d":
      interval = "15m" // 15 minutes
      break
    case "1w":
    case "1m":
      interval = "1h" // 1 hour
      break
    case "3m":
    case "1y":
      interval = "1d" // 1 day
      break
    default:
      throw new Error(`Invalid range: ${range}`)
  }

  return interval
}

export function formatNumber(num: number) {
  if (num >= 1e12) {
    return `${(num / 1e12).toFixed(2)}T`
  } else if (num >= 1e9) {
    return `${(num / 1e9).toFixed(2)}B`
  } else if (num >= 1e6) {
    return `${(num / 1e6).toFixed(2)}M`
  } else {
    return num.toString()
  }
}

export function getMarketSentiment(changePercentage: number | null = null) {
  if (changePercentage === null || changePercentage === undefined)
    return "neutral"
  if (changePercentage > 0.1) return "bullish"
  if (changePercentage < -0.1) return "bearish"

  return "neutral"
}

export function getSentimentColor(marketSentiment: string) {
  return marketSentiment === "bullish"
    ? "text-green-500"
    : marketSentiment === "bearish"
      ? "text-red-500"
      : "text-neutral-500"
}

export function getSentimentBackground(marketSentiment: string) {
  return marketSentiment === "bullish"
    ? "bg-green-500/10"
    : marketSentiment === "bearish"
      ? "bg-red-300/20 dark:bg-red-950/20"
      : "bg-neutral-500/10"
}

export function isMarketOpen() {
  const now = new Date()

  // Convert to New York time
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "America/New_York",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }
  const formatter = new Intl.DateTimeFormat([], options)

  const timeString = formatter.format(now)
  const [hour, minute] = timeString.split(":").map(Number)
  const timeInET = hour + minute / 60

  // Get the day of the week in New York time
  const dayInET = new Date(
    now.toLocaleString("en-US", { timeZone: "America/New_York" })
  ).getDay()

  // Check if the current time is between 9:30 AM and 4:00 PM ET on a weekday
  if (dayInET >= 1 && dayInET <= 5 && timeInET >= 9.5 && timeInET < 16) {
    return true
  } else {
    return false
  }
}
