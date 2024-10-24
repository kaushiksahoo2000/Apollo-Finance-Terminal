import Image from "next/image"
import { Card, CardContent } from "../../../../components/ui/card"
import ReadMoreText from "../../../../components/ui/read-more-text"
import Link from "next/link"
import { GET_TICKER_DETAILS_MOCK } from "@/lib/mocks"
import { formatNumber } from "@/lib/utils"

type Props = { ticker: string }
export default async function CompanySummaryCard({ ticker }: Props) {
  const { data } = GET_TICKER_DETAILS_MOCK

  const {
    iconUrl,
    logoUrl,
    listDate,
    name,
    shareClassSharesOutstanding,
    marketCap,
    totalEmployees,
    homepageUrl,
    description,
  } = data.tickerDetails

  return (
    <Card className="group relative min-h-max overflow-hidden">
      <div className="absolute z-0 h-full w-full bg-gradient-to-t from-neutral-50 via-neutral-200 to-neutral-50 bg-size-200 bg-pos-0 blur-2xl transition-all duration-500 group-hover:bg-pos-100 dark:from-black dark:via-blue-950/20 dark:to-black" />

      <CardContent className="z-50 flex h-full w-full flex-col items-start justify-center gap-6 py-10 text-sm lg:flex-row">
        <div className="z-50 max-w-2xl text-pretty font-medium">
          <ReadMoreText text={description ?? ""} truncateLength={500} />
        </div>
        {totalEmployees && homepageUrl && (
          <div className="z-50 min-w-fit font-medium text-muted-foreground">
            <div>
              Market Cap:{" "}
              <span className="text-foreground ">
                {formatNumber(marketCap)}
              </span>
            </div>
            <div>
              Shares:{" "}
              <span className="text-foreground ">
                {formatNumber(shareClassSharesOutstanding)}
              </span>
            </div>
            <div>
              List Date: <span className="text-foreground ">{listDate}</span>
            </div>
            <div>
              Employees:{" "}
              <span className="text-foreground ">
                {totalEmployees?.toLocaleString("en-US")}
              </span>
            </div>
            <div>
              Website:{" "}
              <span className="text-foreground ">
                {homepageUrl && (
                  <Link
                    href={homepageUrl}
                    className="text-blue-600 hover:underline dark:text-blue-500"
                  >
                    {homepageUrl}
                  </Link>
                )}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
