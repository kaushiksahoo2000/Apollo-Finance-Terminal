import { cn } from "@/lib/utils"
import { Badge } from "../ui/badge"
import { fetchSectorPerformance } from "@/lib/fmp"

interface Sector {
  sector: string
  changesPercentage: string
}

export async function SectorBadges() {
  const data = (await fetchSectorPerformance()) as Sector[]

  if (!data) {
    return null
  }

  const totalChangePercentage = data.reduce((total, sector) => {
    return total + parseFloat(sector.changesPercentage)
  }, 0)

  const averageChangePercentage =
    (totalChangePercentage / data.length).toFixed(2) + "%"

  const allSectors = {
    sector: "All sectors",
    changesPercentage: averageChangePercentage,
  }
  data.unshift(allSectors)

  return (
    <div className="flex flex-wrap gap-2">
      {data.map((sector: Sector) => (
        <Badge key={sector.sector} variant="outline" className="py-2">
          {sector.sector}
          <span
            className={cn(
              "w-[4rem] text-right transition-colors",
              parseFloat(sector.changesPercentage) > 0
                ? " text-green-800 dark:text-green-400"
                : " text-red-800 dark:text-red-500"
            )}
          >
            {parseFloat(sector.changesPercentage).toFixed(2) + "%"}
          </span>
        </Badge>
      ))}
    </div>
  )
}

export default async function SectorPerformance() {
  const data = (await fetchSectorPerformance()) as Sector[]

  if (!data) {
    return null
  }

  const totalChangePercentage = data.reduce((total, sector) => {
    return total + parseFloat(sector.changesPercentage)
  }, 0)

  const averageChangePercentage =
    (totalChangePercentage / data.length).toFixed(2) + "%"

  const allSectors = {
    sector: "All sectors",
    changesPercentage: averageChangePercentage,
  }
  data.unshift(allSectors)

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {data.map((sector: Sector) => (
        <div
          key={sector.sector}
          className="flex w-full flex-row items-center justify-between text-sm"
        >
          <span className="font-medium">{sector.sector}</span>
          <span
            className={cn(
              "w-[4rem] min-w-fit rounded-md px-2 py-0.5 text-right transition-colors",
              parseFloat(sector.changesPercentage) > 0
                ? "bg-gradient-to-l from-green-300 text-green-800 dark:from-green-950 dark:text-green-400"
                : "bg-gradient-to-l from-red-300 text-red-800 dark:from-red-950 dark:text-red-500"
            )}
          >
            {parseFloat(sector.changesPercentage).toFixed(2) + "%"}
          </span>
        </div>
      ))}
    </div>
  )
}