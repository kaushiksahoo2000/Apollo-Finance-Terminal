"use client"

import { Suspense, useState } from "react"
import { TrendingUp, TrendingDown } from "lucide-react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { useSuspenseQuery } from "@apollo/client"
import { GET_TICKER_DATA } from "@/lib/graphql/queries"
import { GET_TICKER_MOCK } from "@/lib/mocks"

// Mock data for different time periods
const mockData = {
  "1D": Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    high: 150 + Math.random() * 10,
    low: 150 + Math.random() * 10,
    open: 150 + Math.random() * 10,
    close: 150 + Math.random() * 10,
  })),
  "1W": Array.from({ length: 7 }, (_, i) => ({
    time: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i],
    high: 150 + Math.random() * 20,
    low: 150 + Math.random() * 20,
    open: 150 + Math.random() * 20,
    close: 150 + Math.random() * 20,
  })),
  "1M": Array.from({ length: 30 }, (_, i) => ({
    time: `Day ${i + 1}`,
    high: 150 + Math.random() * 30,
    low: 150 + Math.random() * 30,
    open: 150 + Math.random() * 30,
    close: 150 + Math.random() * 30,
  })),
  "3M": Array.from({ length: 12 }, (_, i) => ({
    time: `Week ${i + 1}`,
    high: 150 + Math.random() * 40,
    low: 150 + Math.random() * 40,
    open: 150 + Math.random() * 40,
    close: 150 + Math.random() * 40,
  })),
  "1Y": Array.from({ length: 12 }, (_, i) => ({
    time: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ][i],
    high: 150 + Math.random() * 50,
    low: 150 + Math.random() * 50,
    open: 150 + Math.random() * 50,
    close: 150 + Math.random() * 50,
  })),
  "5Y": Array.from({ length: 5 }, (_, i) => ({
    time: `${2020 + i}`,
    high: 150 + Math.random() * 100,
    low: 150 + Math.random() * 100,
    open: 150 + Math.random() * 100,
    close: 150 + Math.random() * 100,
  })),
}

const chartConfig = {
  price: {
    label: "Stock Price",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

const timePeriods = ["1D", "1W", "1M", "3M", "1Y", "5Y"] as const
type TimePeriod = (typeof timePeriods)[number]

type StockPerformanceChartProps = {
  symbol: string
  type: "stock" | "crypto"
}

// const CustomTooltip = ({ active, payload, label }: any) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="rounded-lg bg-background p-2 shadow-md">
//         <p className="font-semibold">{format(label, "MMM d, yyyy")}</p>
//         <p className="text-primary">Close: ${payload[2].value.toFixed(2)}</p>
//         <p className="text-green-500">High: ${payload[1].value.toFixed(2)}</p>
//         <p className="text-red-500">Low: ${payload[0].value.toFixed(2)}</p>
//       </div>
//     )
//   }
//   return null
// }

export function StockPerformanceChart({
  symbol = "AAPL",
  type = "stock",
}: StockPerformanceChartProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("1M")
  const chartData = mockData[selectedPeriod]

  const initialPrice = chartData[0].close
  const currentPrice = chartData[chartData.length - 1].close
  const priceChange = currentPrice - initialPrice
  const percentageChange = ((priceChange / initialPrice) * 100).toFixed(2)
  const isPositive = priceChange >= 0

  const { data, error } = useSuspenseQuery(GET_TICKER_DATA, {
    variables: {
      ticker: symbol,
      from: "2024-01-01",
      to: "2024-01-31",
      timespan: "day",
    },
  })

  if (error) {
    console.error(error)
  }

  console.log("data", data)

  return (
    <div>
      <div className="mb-4 mr-6 flex flex-wrap justify-end gap-2">
        {timePeriods.map((period) => (
          <Button
            key={period}
            variant={selectedPeriod === period ? "default" : "outline"}
            onClick={() => setSelectedPeriod(period)}
            size="sm"
          >
            {period}
          </Button>
        ))}
      </div>
      <ChartContainer config={chartConfig}>
        <AreaChart width={500} height={300} data={chartData}>
          <ChartTooltip content={<ChartTooltipContent />} />
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-price)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-price)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="close"
            stroke="var(--color-price)"
            fillOpacity={1}
            fill="url(#colorPrice)"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  )
}
