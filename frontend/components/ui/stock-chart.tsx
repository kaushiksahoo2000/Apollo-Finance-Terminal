"use client"

import { TrendingDown, TrendingUp } from "lucide-react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  Tooltip,
  TooltipProps,
  ResponsiveContainer,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { GET_TICKER_MOCK } from "@/lib/mocks"
import { formatDate } from "date-fns"
import { Button } from "./button"
import { useState } from "react"
import { GET_TICKER_DATA } from "@/lib/graphql/queries"
import { useSuspenseQuery } from "@apollo/client"

const timePeriods = ["1D", "1W", "1M", "3M", "1Y", "5Y"] as const
type TimePeriod = (typeof timePeriods)[number]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg bg-background p-2 shadow-md">
        <p className="font-semibold">{formatDate(label, "MMM d, yyyy")}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    )
  }

  return null
}

export function TickerPerformanceChart({ ticker }: { ticker: string }) {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("1M")
  const { data, error } = useSuspenseQuery(GET_TICKER_DATA, {
    variables: {
      ticker,
      from: "2024-09-01",
      to: "2024-10-24",
      timespan: "day",
    },
    // errorPolicy: "ignore",
  })

  if (error) {
    console.error(error)
  }

  // @ts-ignore
  const chartData = data?.aggregateBars?.results || []

  const initialPrice = chartData[0].closePrice
  const currentPrice = chartData[chartData.length - 1].closePrice
  const priceChange = currentPrice - initialPrice
  const percentageChange = ((priceChange / initialPrice) * 100).toFixed(2)
  const isPositive = priceChange >= 0

  return (
    <Card className="w-full">
      {/* <CardHeader>
      {/* <CardTitle>{ticker || data.aggregateBars.ticker}</CardTitle> */}
      {/* <div className="flex flex-wrap justify-end gap-2">
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
      </CardHeader> */}
      <CardContent className="p-0">
        <ChartContainer config={chartConfig} className="p-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={700}
              height={400}
              data={chartData}
              margin={{
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
              }}
            >
              <XAxis
                dataKey="timestamp"
                axisLine={false}
                tickLine={false}
                tick={false}
                height={0}
              />
              <Tooltip content={<CustomTooltip />} />
              <defs>
                <linearGradient id="fillHigh" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-desktop)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-desktop)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillLow" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-mobile)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-mobile)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="highestPrice"
                stackId="1"
                stroke="var(--color-high)"
                fill="url(#fillHigh)"
              />
              <Area
                type="monotone"
                dataKey="lowestPrice"
                stackId="1"
                stroke="var(--color-low)"
                fill="url(#fillLow)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending {isPositive ? "up" : "down"} by {percentageChange}% this
              month {isPositive && <TrendingUp className="h-4 w-4" />}
              {!isPositive && <TrendingDown className="h-4 w-4" />}
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              {formatDate(chartData[0].timestamp, "MMM yyyy")} -{" "}
              {formatDate(
                chartData[chartData.length - 1].timestamp,
                "MMM yyyy"
              )}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
