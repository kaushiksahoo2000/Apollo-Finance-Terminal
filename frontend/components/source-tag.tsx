"use client"
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
    operation:
      "https://apollo-finance-terminal-router-258139619894.us-central1.run.app/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QB0kGcYBGuUATgJYAOKZESABAMIBKAmgAoAqA8gPoDKAVQBCfZgElOYrgDk6wHHUV0oEMkgIBDXAgEUwGlAjkKlihADdkKXMfqmlKAJ4UEJ%2B3WpQA1ghI35du6KFCQQYDBQKDxkYG5BIWRQroFBABZkAOapPABMACw8qXHuADYQAO65BUUp7glJPC4kSag8UKkZVYXFSgC%2BPf21dNoAjjDIDUjwPdSIuCgacBRxg4qDIL1AA",
  },
  connector: {
    title: "Polygon Apollo REST Connector",
    description:
      "Apollo Router connector for Polygon.io providing historical data on stocks & crypto.",
    protocol: "Apollo REST Connector",
    operation:
      "https://apollo-finance-terminal-router-258139619894.us-central1.run.app/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAOICiAKgPoUCSAwgNJkBKVtAcgGIDyLAsgEE6PDgAoAOkiIyiAEhQBLKAGt86IgGUUeRUgDmAQimz5AMzwQ4G7boPHpshRBs69Rk06WIAzgAcAQyRXOw9HAEoiYE8ZJVV8ABEEFADFABsfMTi1PA0FZRzI6MdTMAQfKF0-JQgkGNkACysEQP0EAFU8NPqZZVrO7pLZNMUfFASAlAQeojSIfQgBmbgAvDUUegC-GaQAxBmfBtWEejSAnx9NI7xynhgUMaCwdxns-FeIFLSyOD85ggQ5XqAF96gF9PobvpJggAEKrTJvXLyJEAGiIFiseUxcHRKBcKIgeMUvkCwRRJPKZKKrwK7yGMhuPhgaQeURmMigcx8CAACrooNMGY1FPoGuUUPzlELTKY5gB3CVSwUcogQPzIZUy2WxSmPX4zUFDI0yYEgVEgABuq0UAQARmlyhgQMUZBIQEj3Rp3RwAGoJQTu1Ged04r1Ed0AJgADJGACwAWmjAE4kwBGIMhj0QcNR2OJtPRhPxzOOd3eKlBXPgAIEd1SM3AoA",
  },
  gemini: {
    title: "Gemini REST Connector",
    description:
      "Apollo Router connector for Google Gemini API providing AI capabilities to the app.",
    protocol: "Apollo REST Connector",
    operation:
      "https://apollo-finance-terminal-router-258139619894.us-central1.run.app/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4RxighigSwiQAIBxAUQDkKAlAQQBUKB9egSRdooGUAFAPJUeFABQASQlADWCAE585EOAAcU6EjxRyCSAOYBCAJQlgAHVIkre5BwBiu3EigFcAGwDOAYWIpkKUSlZBSVVdRJJAhl5RWU1E3NLKysoJzACMHwED1MLZPySKF9-XKSCqxVcORQcxPLyvwAPFDz6qwBfVralNwQugs6y-IAzXQIPAAtaBFwPYn783TAERoXkj1xhhBQAT1p8XT1atfzUvz0IOR2T5JUlACNce4I3Al2bwbaXPEJiAFltrhMnhSm0Um8DsQeBAYHIoNlQWCrB48NV2EhlqshvVkGB0ZibvlYQRCclXvCkB4%2Btj8p96nTaWsYBsbAC8MDcIjync4ihGBBZEgfDBUDdUhiMlkPPzBcLRTSSCgIHg3DLkHKWtiGck4BBlm4AGryDxEJD9OntEAAGhAADcqq57r0PBgQHUSGYQEEYqE1J6NJ6qAaACL0T0WS3tIA",
  },
}

export function SourceTag({ type }: { type: keyof typeof sources }) {
  // @ts-ignore
  const { title, description, protocol, operation = "" } = sources[type] || {}

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
          <div className="space-y-1">
            <div className="flex items-center pt-2">
              <ServerIcon className="mr-2 h-4 w-4 opacity-70" />
              {protocol.toLowerCase() === "apollo rest con" && (
                <ServerIcon className="mr-2 h-4 w-4 opacity-70" />
              )}{" "}
              <span className="text-xs text-muted-foreground">
                {protocol.toUpperCase()}
              </span>
            </div>
            <h4 className="text-sm font-semibold">{title}</h4>
            <p className="mt-2 text-sm">{description}</p>

            {operation && (
              <Button
                variant="outline"
                className="mt-2 text-xs italic text-muted-foreground"
                onClick={() => window.open(operation, "_blank")}
              >
                Try operation
              </Button>
            )}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
