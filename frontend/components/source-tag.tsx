import { ServerIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

const sources = {
  yahoo: {
    title: "Yahoo! Finance",
    description: "The latest news and headlines from the world of finance.",
    protocol: "HTTP",
  },
  fmp: {
    title: "Financial Modeling Prep",
    description: "High performance financial data.",
    protocol: "HTTP",
  },
  subscription: {
    title: "Apollo Router (Subscription)",
    description: "Coinbase GraphQL subgraph  WebSocket",
    protocol: "Apollo Router Subscriptions",
  },
  connector: {
    title: "Polygon Apollo REST Connector",
    description:
      "Apollo Router connector for Polygon.io providing historical data on stocks & crypto.",
    protocol: "Apollo REST Connector",
  },
}

export function SourceTag({ type }: { type: keyof typeof sources }) {
  const { title, description, protocol } = sources[type] || {}

  if (!title)
    return <p className="text-xs text-muted-foreground">via Unknown source</p>

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          variant="link"
          className="mt-0 p-0 text-xs italic text-muted-foreground"
        >
          via {title}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          {/* <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar> */}
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{title}</h4>
            <p className="text-sm">{description}</p>
            <div className="flex items-center pt-2">
              <ServerIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                {protocol.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
