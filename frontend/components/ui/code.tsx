"use client"

import { FileIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { codeToHtml } from "shiki"
import { ScrollArea } from "./scroll-area"

interface CodeProps {
  code: string
  language: string
  filename: string
  lightTheme: string
  darkTheme: string
}

export function Code({
  code,
  language,
  filename,
  lightTheme,
  darkTheme,
}: CodeProps) {
  const { theme, systemTheme } = useTheme()
  const [highlighted, setHighlighted] = useState("")

  useEffect(() => {
    const currentTheme = theme === "system" ? systemTheme : theme
    const selectedTheme = currentTheme === "dark" ? darkTheme : lightTheme

    async function highlightCode() {
      const highlighted = await codeToHtml(code, {
        lang: language,
        theme: selectedTheme,
      })
      setHighlighted(highlighted)
    }

    highlightCode()
  }, [theme, systemTheme, code, language, lightTheme, darkTheme])

  const renderCode = (code: string, highlighted: string) => {
    if (highlighted) {
      return (
        <div
          className="h-full overflow-auto bg-background font-mono text-xs [&>pre]:h-full [&>pre]:!bg-transparent [&>pre]:p-4 [&_code]:break-all"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      )
    } else {
      return (
        <pre className="h-full overflow-auto break-all bg-background p-4 font-mono text-xs text-foreground">
          {code}
        </pre>
      )
    }
  }

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="relative w-full overflow-hidden rounded-xl border border-border">
        <div className="relative grid md:grid-cols-1 md:divide-x md:divide-border">
          <div>
            <div className="flex items-center bg-accent p-2 text-sm text-foreground">
              <FileIcon className="mr-2 h-4 w-4" />
              {filename}
              {/* <span className="ml-auto">before</span> */}
            </div>
            <ScrollArea>{renderCode(code, highlighted)}</ScrollArea>
          </div>
          {/* <div>
            <div className="flex items-center bg-accent p-2 text-sm text-foreground">
              <FileIcon className="mr-2 h-4 w-4" />
              {filename}
              <span className="ml-auto">after</span>
            </div>
            {renderCode(afterCode, highlightedAfter)}
          </div> */}
        </div>
        {/* <div className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-md bg-accent text-xs text-foreground">
          VS
        </div> */}
      </div>
    </div>
  )
}
