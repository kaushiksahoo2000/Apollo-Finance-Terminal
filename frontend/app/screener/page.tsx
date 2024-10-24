import type { Metadata } from "next"
import { columns } from "@/app/screener/components/columns"
import { DataTable } from "@/app/screener/components/data-table"
import { DEFAULT_SCREENER } from "@/lib/yahoo-finance/constants"
import { fetchScreenerStocks } from "@/lib/yahoo-finance/fetchScreenerStocks"

export const metadata: Metadata = {
  title: "Stock screener: Apollo Finance Terminal",
  description: "Screener for stocks",
}

type Props = { searchParams: Promise<{ screener?: string }> }
export default async function ScreenerPage({ searchParams }: Props) {
  const { screener = DEFAULT_SCREENER } = await searchParams
  const screenerDataResults = await fetchScreenerStocks(screener)

  return (
    <div>
      <DataTable columns={columns} data={screenerDataResults.quotes} />
    </div>
  )
}
