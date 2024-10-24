import { fetchStockSearch } from "@/lib/yahoo-finance/fetchStockSearch"
import Link from "next/link"
import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
} from "date-fns"
import { Article } from "@/components/atricle-card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

function timeAgo(publishTime: string) {
  const publishDate = new Date(publishTime)
  const now = new Date()

  const diffInMinutes = differenceInMinutes(now, publishDate)
  const diffInHours = differenceInHours(now, publishDate)
  const diffInDays = differenceInDays(now, publishDate)

  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`
  } else if (diffInHours < 24) {
    return `${diffInHours} hours ago`
  } else {
    return `${diffInDays} days ago`
  }
}

export default async function News({ ticker }: { ticker: string }) {
  const newsData = await fetchStockSearch(ticker)
  const url = `https://uk.finance.yahoo.com/quote/${ticker}`

  return (
    <div>
      <div className="flex flex-1 gap-4">
        <ScrollArea className="flex w-full flex-row">
          <div className="flex w-full flex-row gap-4 overflow-hidden">
            {newsData.news.length > 0 &&
              newsData.news.map((article) => (
                <Article
                  key={article.uuid}
                  title={article.title}
                  publishedDate={article.providerPublishTime.toISOString()}
                  site={article.publisher}
                  text={article.title}
                  url={article.link}
                  image={article.thumbnail?.resolutions[0]?.url}
                />
              ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  )
}
