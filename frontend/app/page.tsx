import { DataTable } from "@/components/stocks/markets/data-table"
import yahooFinance from "yahoo-finance2"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DEFAULT_INTERVAL, DEFAULT_RANGE } from "@/lib/yahoo-finance/constants"
import { Interval } from "@/types/yahoo-finance"
import { Suspense } from "react"
import Link from "next/link"
import { columns } from "@/components/stocks/markets/columns"
import SectorPerformance, {
  SectorBadges,
} from "@/components/stocks/SectorPerformance"
import {
  validateInterval,
  validateRange,
} from "@/lib/yahoo-finance/fetchChartData"
import { fetchStockSearch } from "@/lib/yahoo-finance/fetchStockSearch"
import { Separator } from "@radix-ui/react-separator"
import {
  getMarketSentiment,
  getSentimentBackground,
  getSentimentColor,
  isMarketOpen,
} from "@/lib/utils"
import { StockPerformanceChart } from "@/components/components-stock-performance-chart"
import { BitcoinTicker } from "@/components/btc-ticker"
import { Watchlist } from "@/components/watchlist"
import tickers from "@/data/tickers.json"

const watchlist = tickers.slice(0, 10)

const tickersFutures = [
  { symbol: "ES=F", shortName: "S&P 500 Futures" },
  { symbol: "NQ=F", shortName: "NASDAQ Futures" },
  { symbol: "YM=F", shortName: "Dow Jones Futures" },
  { symbol: "RTY=F", shortName: "Russell 2000 Futures" },
  { symbol: "CL=F", shortName: "Crude Oil" },
  { symbol: "GC=F", shortName: "Gold" },
  { symbol: "SI=F", shortName: "Silver" },
  { symbol: "EURUSD=X", shortName: "EUR/USD" },
  { symbol: "^TNX", shortName: "10 Year Bond" },
  { symbol: "BTC-USD", shortName: "Bitcoin" },
]

const tickerAfterOpen = [
  { symbol: "^GSPC", shortName: "S&P 500" },
  { symbol: "^IXIC", shortName: "NASDAQ" },
  { symbol: "^DJI", shortName: "Dow Jones" },
  { symbol: "^RUT", shortName: "Russell 2000" },
  { symbol: "CL=F", shortName: "Crude Oil" },
  { symbol: "GC=F", shortName: "Gold" },
  { symbol: "SI=F", shortName: "Silver" },
  { symbol: "EURUSD=X", shortName: "EUR/USD" },
  { symbol: "^TNX", shortName: "10 Year Bond" },
  { symbol: "BTC-USD", shortName: "Bitcoin" },
]

type HomeSearchParams = {
  ticker?: string
  range?: string
  interval?: string
}
type Props = { searchParams: Promise<HomeSearchParams> }

export default async function Home({ searchParams }: Props) {
  const tickers = isMarketOpen() ? tickerAfterOpen : tickersFutures
  const params = await searchParams

  const ticker = params?.ticker || tickers[0].symbol
  const range = validateRange(params?.range || DEFAULT_RANGE)
  const interval = validateInterval(
    range,
    (params?.interval as Interval) || DEFAULT_INTERVAL
  )
  const news = await fetchStockSearch(ticker, 1)
  const headline = news.news[0]

  // const promises = tickers.map(({ symbol }) => yahooFinance.quoteCombine(symbol))
  const results: any[] = [] //await Promise.all(promises)q
  const resultsWithTitles = results.map((result, index) => ({
    ...result,
    shortName: tickers[index].shortName,
  }))

  const marketSentiment = getMarketSentiment(
    resultsWithTitles[0]?.regularMarketChangePercent || null
  )

  const sentimentColor = getSentimentColor(marketSentiment)
  const sentimentBackground = getSentimentBackground(marketSentiment)

  return (
    <div className="flex flex-col items-center justify-center gap-4 align-middle">
      <div className="flex flex-col gap-4 lg:flex-row">
        <BitcoinTicker ticker="btc-usd" />
        <BitcoinTicker ticker="eth-usd" />
        <BitcoinTicker ticker="sol-usd" />
        <BitcoinTicker ticker="doge-usd" />
      </div>
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="w-full lg:w-1/2">
          <Card className="relative flex h-full min-h-[15rem] flex-col justify-between overflow-hidden">
            <CardHeader>
              <CardTitle className="z-50 w-fit rounded-full font-medium dark:bg-neutral-100/5">
                Market vibes are{" "}
                <strong className={sentimentColor}>{marketSentiment}</strong>
              </CardTitle>
              <CardDescription className="text-xs italic text-muted-foreground">
                via Yahoo! Finance
              </CardDescription>
            </CardHeader>
            {headline && headline.title && (
              <CardFooter className="flex-col items-start">
                <p className="mb-2 text-sm font-semibold text-neutral-500 dark:text-neutral-500">
                  What you need to know today
                </p>
                <Link
                  prefetch={false}
                  href={headline.link}
                  className="text-lg font-extrabold"
                >
                  {headline.title}
                </Link>
              </CardFooter>
            )}
            <div
              className={`pointer-events-none absolute inset-0 z-0 h-[65%] w-[65%] -translate-x-[10%] -translate-y-[30%] rounded-full blur-3xl ${sentimentBackground}`}
            />
          </Card>
        </div>
        <div className="flex w-full flex-col justify-between lg:w-1/2">
          <div>
            <h3 className="text-lg font-semibold">Sector Performance</h3>
            <p className="mb-4 text-xs italic text-muted-foreground">
              via Financial Modeling Prep
            </p>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <SectorBadges />
          </Suspense>
        </div>
      </div>

      {/* <div>
        <h2 className="py-4 text-xl font-medium">Markets</h2>
        <Card className="flex flex-col gap-4 p-6 lg:flex-row">
          <div className="w-full lg:w-1/2">
            <Suspense fallback={<div>Loading...</div>}>
              <Watchlist watchlist={watchlist} />
            </Suspense>
          </div>
        </Card>
      </div> */}
    </div>
  )
}
