import { Badge } from "@/components/ui/badge"
import ReadMoreText from "@/components/ui/read-more-text"
import { query } from "@/lib/graphql"
import { GET_TICKER_DETAILS } from "@/lib/graphql/queries"
import { fetchQuoteSummary } from "@/lib/yahoo-finance/fetchQuoteSummary"

function formatNumber(num: number) {
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
const keysToDisplay = [
  {
    key: "open",
    title: "Open",
  },
  { key: "dayHigh", title: "High" },
  { key: "dayLow", title: "Low" },
  { key: "volume", title: "Volume", format: formatNumber },
  { key: "trailingPE", title: "P/E" },
  { key: "marketCap", title: "Market Cap", format: formatNumber },
  { key: "fiftyTwoWeekHigh", title: "52W High" },
  { key: "fiftyTwoWeekLow", title: "52W Low" },
  { key: "averageVolume", title: "Avg. Volume", format: formatNumber },
  {
    key: "dividendYield",
    title: "Div yield",
    format: (data: number) => `${(data * 100).toFixed(2)}%`,
  },
  { key: "beta", title: "Beta" },
  { key: "trailingEps", title: "EPS", section: "defaultKeyStatistics" },
]

export default async function FinanceSummary({ ticker }: { ticker: string }) {
  const { data } = await query({
    query: GET_TICKER_DETAILS,
    variables: { ticker: decodeURIComponent(ticker) },
  })

  const financeSummaryData = await fetchQuoteSummary(ticker)

  return (
    <div className="flex flex-col gap-4">
      <ReadMoreText
        text={data.tickerDetails.description ?? ""}
        truncateLength={500}
        className="text-md inline text-muted-foreground"
      />
      <div className="flex flex-row flex-wrap gap-2">
        {keysToDisplay.map((item) => {
          const section = item.section || "summaryDetail"
          const data = financeSummaryData?.[section]?.[item.key] ?? undefined
          let formattedData = "N/A"

          if (data !== undefined && !isNaN(data)) {
            formattedData = item.format ? item.format(data) : data
          }
          return (
            <Badge key={item.key} variant="outline" className="gap-4 text-sm">
              <span className="text-muted-foreground">{item.title}</span>
              <span>{formattedData}</span>
            </Badge>
          )
        })}
      </div>
      <p className="text-xs italic text-muted-foreground">
        via Financial Modeling Prep
      </p>
    </div>
  )
}
