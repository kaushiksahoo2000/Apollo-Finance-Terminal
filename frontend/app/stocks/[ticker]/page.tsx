import FinanceSummary from "@/app/stocks/[ticker]/components/FinanceSummary"
import News from "@/app/stocks/[ticker]/components/News"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DEFAULT_INTERVAL, DEFAULT_RANGE } from "@/lib/yahoo-finance/constants"
import {
  validateInterval,
  validateRange,
} from "@/lib/yahoo-finance/fetchChartData"
import { Interval } from "@/types/yahoo-finance"
import { Suspense } from "react"
import type { Metadata } from "next"
import BlurIn from "@/components/ui/blur-in"
import { StockPerformanceChart } from "@/components/components-stock-performance-chart"
import BlurFade from "@/components/ui/blur-fade"
import { PreloadQuery, query } from "@/lib/graphql"
import { GET_TICKER_DATA, GET_TICKER_DETAILS } from "@/lib/graphql/queries"
import { TickerPerformanceChart } from "@/components/ui/stock-chart"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { SourceTag } from "@/components/source-tag"

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
    description: `Stocks page for ${ticker}`,
    keywords: [ticker, "stocks"],
  }
}

export default async function StocksPage({ params, searchParams }: Props) {
  const { ticker } = await params
  const search = await searchParams
  const range = validateRange(search?.range || DEFAULT_RANGE)
  const interval = validateInterval(
    range,
    (search?.interval as Interval) || DEFAULT_INTERVAL
  )

  const { data } = await query({
    query: GET_TICKER_DETAILS,
    variables: { ticker: decodeURIComponent(ticker) },
  })

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
      <section className="flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          <PreloadQuery
            query={GET_TICKER_DATA}
            variables={{
              ticker: decodeURIComponent(ticker),
              from: "2024-09-01",
              to: "2024-10-23",
              timespan: "day",
            }}
          >
            <Suspense fallback={<div>Loading...</div>}>
              <TickerPerformanceChart ticker={decodeURIComponent(ticker)} />
            </Suspense>
          </PreloadQuery>

          <div className="flex w-1/2 flex-col gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-xl">{data?.tickerDetails?.name}</p>
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

            <PreloadQuery
              query={GET_TICKER_DETAILS}
              variables={{ ticker: decodeURIComponent(ticker) }}
            >
              <Suspense
                fallback={
                  <div className="flex h-[10rem] items-center justify-center text-muted-foreground ">
                    Loading...
                  </div>
                }
              >
                <FinanceSummary ticker={decodeURIComponent(ticker)} />
              </Suspense>
            </PreloadQuery>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>News</CardTitle>
            <CardDescription className="text-xs italic text-muted-foreground">
              <SourceTag type="yahoo" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense
              fallback={
                <div className="flex h-[20rem] items-center justify-center text-muted-foreground ">
                  Loading...
                </div>
              }
            >
              <News ticker={ticker} />
            </Suspense>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
