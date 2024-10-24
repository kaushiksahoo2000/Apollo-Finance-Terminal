"use client"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

//TODO: make constomizable for individual user
//TODO: make rov hover card
//TODO: on ro
type WatchlistItem = {
  ticker: string
  title: string
}
type WatchlistProps = {
  watchlist: WatchlistItem[]
  onClick: (ticker: string) => void
}

export function Watchlist({ watchlist }: WatchlistProps) {
  return (
    <Table>
      <TableCaption>Your watchlist</TableCaption>
      {/* <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Ticker</TableHead>
          <TableHead>Title</TableHead>
        </TableRow>
      </TableHeader> */}
      <TableBody>
        {watchlist.map((ticker) => (
          <TableRow
            className="cursor-pointer"
            key={`watchlist-${ticker.ticker}`}
            onClick={() => {}}
          >
            <TableCell>{ticker.ticker}</TableCell>
            <TableCell>{ticker.title}</TableCell>
          </TableRow>
        ))}
        {/* {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))} */}
      </TableBody>
    </Table>
  )
}
