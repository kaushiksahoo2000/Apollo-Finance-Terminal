"use client"

import { useEffect, useState } from "react"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { Button } from "./button"
import tickers from "@/data/tickers.json"
import { useRouter } from "next/navigation"
import {
  EnvelopeClosedIcon,
  GearIcon,
  HomeIcon,
  PersonIcon,
} from "@radix-ui/react-icons"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover"
import {
  BarChart,
  BitcoinIcon,
  ChartBarIcon,
  HelpCircleIcon,
} from "lucide-react"

const SUGGESTIONS = [
  { ticker: "AAPL", title: "Apple Inc." },
  { ticker: "NFLX", title: "Netflix, Inc." },
  { ticker: "TSLA", title: "Tesla Inc." },
  { ticker: "NVDA", title: "NVIDIA Corporation" },
]

const CRYPTO_SUGGESTIONS = [
  { ticker: "X:BTCUSD", title: "Bitcoin" },
  { ticker: "X:ETHUSD", title: "Ethereum" },
  { ticker: "X:SOLUSD", title: "Solana" },
  { ticker: "X:DOGEUSD", title: "Dogecoin" },
]

const NAVIGATION = [
  { path: "/", title: "Home", icon: HomeIcon },
  { path: "/screener", title: "Stocks", icon: BarChart },
  { path: "/guide", title: "Guide", icon: HelpCircleIcon },
]

export default function CommandMenu() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <div className="w-2/3">
      <Button onClick={() => setOpen(true)} variant="outline" className="group">
        <p className="flex gap-10 text-sm text-muted-foreground group-hover:text-foreground">
          Search for stocks or crypto...
          <kbd className="pointer-events-none ml-12 hidden h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 group-hover:text-foreground sm:inline-flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </p>
      </Button>
      <Command>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput
            placeholder="Search by symbols or companies..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            <CommandGroup heading="Menu">
              {search.length === 0 &&
                NAVIGATION.map((item) => (
                  <CommandItem
                    key={item.path}
                    value={item.path}
                    className="gap-2"
                    onSelect={() => {
                      setOpen(false)
                      router.push(item.path)
                    }}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                    {/* <CommandShortcut>⌘k</CommandShortcut> */}
                  </CommandItem>
                ))}

              {search.length > 0 &&
                NAVIGATION.filter((item) =>
                  item.title.toLowerCase().includes(search.toLowerCase())
                ).map((item) => (
                  <CommandItem key={item.path} value={item.path} />
                ))}
            </CommandGroup>

            <CommandGroup heading="Stocks">
              {search.length === 0 &&
                SUGGESTIONS.map((suggestion) => (
                  <CommandItem
                    key={suggestion.ticker}
                    value={suggestion.ticker + "\n \n" + suggestion.title}
                    onSelect={() => {
                      setOpen(false)
                      setSearch("")
                      router.push(`/stocks/${suggestion.ticker}`)
                    }}
                  >
                    <p className="mr-2 font-semibold">{suggestion.ticker}</p>
                    <p className="text-sm text-muted-foreground">
                      {suggestion.title}
                    </p>
                  </CommandItem>
                ))}

              {search.length > 0 &&
                tickers
                  .filter(
                    (ticker) =>
                      ticker.ticker
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                      ticker.title.toLowerCase().includes(search.toLowerCase())
                  )
                  .slice(0, 10)
                  .map((ticker) => (
                    <CommandItem
                      key={ticker.id}
                      value={ticker.ticker + "\n \n" + ticker.title}
                      onSelect={() => {
                        setOpen(false)
                        setSearch("")
                        router.push(`/stocks/${ticker.ticker}`)
                      }}
                    >
                      <p className="mr-2 font-semibold">{ticker.ticker}</p>
                      <p className="text-sm text-muted-foreground">
                        {ticker.title}
                      </p>
                    </CommandItem>
                  ))}
            </CommandGroup>

            <CommandGroup heading="Crypto">
              {search.length === 0 &&
                CRYPTO_SUGGESTIONS.map((suggestion) => (
                  <CommandItem
                    key={suggestion.ticker}
                    value={suggestion.ticker + "\n \n" + suggestion.title}
                    onSelect={() => {
                      setOpen(false)
                      setSearch("")
                      router.push(`/crypto/${suggestion.ticker}`)
                    }}
                  >
                    <p className="mr-2 font-semibold">{suggestion.ticker}</p>
                    <p className="text-sm text-muted-foreground">
                      {suggestion.title}
                    </p>
                  </CommandItem>
                ))}

              {search.length > 0 &&
                tickers
                  .filter(
                    (ticker) =>
                      ticker.ticker
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                      ticker.title.toLowerCase().includes(search.toLowerCase())
                  )
                  .slice(0, 10)
                  .map((ticker) => (
                    <CommandItem
                      key={ticker.id}
                      value={ticker.ticker + "\n \n" + ticker.title}
                      onSelect={() => {
                        setOpen(false)
                        setSearch("")
                        router.push(`/crypto/${ticker.ticker}`)
                      }}
                    >
                      <p className="mr-2 font-semibold">{ticker.ticker}</p>
                      <p className="text-sm text-muted-foreground">
                        {ticker.title}
                      </p>
                    </CommandItem>
                  ))}
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </Command>
    </div>
  )
}
