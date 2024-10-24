import { unstable_noStore as noStore } from "next/cache"
import yahoo from "yahoo-finance2"
import { PredefinedScreenerModules } from "@/types/yahoo-finance"

const ITEMS_PER_PAGE = 40

export async function fetchScreenerStocks(
  query: string,
  count?: number
): Promise<any> {
  noStore()

  // PAGINATION IS HANDLED BY TENSTACK TABLE

  const queryOptions = {
    scrIds: query as PredefinedScreenerModules,
    count: count ? count : ITEMS_PER_PAGE,
    region: "US",
    lang: "en-US",
  }

  try {
    const response = await yahoo.screener(queryOptions, {
      validateResult: false,
    })

    return response
  } catch (error) {
    console.log("Failed to fetch screener stocks", error)
    return { quotes: [] }
    // throw new Error("Failed to fetch screener stocks.")
  }
}
