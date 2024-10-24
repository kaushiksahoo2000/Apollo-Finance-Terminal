import { DEFAULT_INTERVAL, DEFAULT_RANGE } from "@/lib/yahoo-finance/constants"
import {
  validateInterval,
  validateRange,
} from "@/lib/yahoo-finance/fetchChartData"
import { Interval } from "@/types/yahoo-finance"
import { Suspense } from "react"
import type { Metadata } from "next"
import { fetchQuote } from "@/lib/yahoo-finance/fetchQuote"
import BlurIn from "@/components/ui/blur-in"
import { StockPerformanceChart } from "@/components/components-stock-performance-chart"
import BlurFade from "@/components/ui/blur-fade"
import { getClient, PreloadQuery, query } from "@/lib/graphql"
import { GET_TICKER_DETAILS } from "@/lib/graphql/queries"
import { TickerPerformanceChart } from "@/components/ui/stock-chart"
import Link from "next/link"
import { Button } from "@/components/ui/button"

type Props = {
  params: Promise<{
    ticker: string
  }>
  searchParams?: Promise<{
    ticker?: string
    range?: string
    interval?: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ticker } = await params

  return {
    title: `${ticker}: Apollo Finance Terminal`,
    description: `Crypto page for ${ticker}`,
    keywords: [ticker, "crypto"],
  }
}

export default async function CryptoPage({ params, searchParams }: Props) {
  const { ticker } = await params
  const search = await searchParams
  const range = validateRange(search?.range || DEFAULT_RANGE)
  const interval = validateInterval(
    range,
    (search?.interval as Interval) || DEFAULT_INTERVAL
  )

  const { data, error } = await getClient().query({
    query: GET_TICKER_DETAILS,
    variables: { ticker: decodeURIComponent(ticker) },
    errorPolicy: "ignore",
  })

  if (error) {
    console.error(error)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold">{data?.tickerDetails?.ticker}</h2>
        <div className="flex flex-row items-center gap-2">
          <p className="text-sm text-muted-foreground">
            {data?.tickerDetails?.name}
          </p>
          <Link
            href={data?.tickerDetails?.homepageUrl}
            target="_blank"
            className="text-sm text-muted-foreground"
          >
            <Button variant="outline" size="sm" className="rounded-full">
              {data?.tickerDetails?.homepageUrl}
            </Button>
          </Link>
        </div>
      </div>

      <BlurFade className="flex flex-row gap-4">
        <Suspense fallback={<div>Loading...</div>}>
          <TickerPerformanceChart ticker={data?.tickerDetails?.ticker} />
        </Suspense>
      </BlurFade>
    </div>
  )
}
