"use client"

import { GENERATE_AI_RESPONSE } from "@/lib/graphql/queries"
import { SourceTag } from "@/components/source-tag"
import { Code } from "@/components/ui/code"
import { AI_RESPONSE_MOCK } from "@/lib/mocks"
import { useMutation } from "@apollo/client"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
// import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"
import BlurFade from "@/components/ui/blur-fade"
import ShimmerButton from "@/components/ui/shimmer-button"
import ShinyButton from "@/components/ui/shiny-button"
import { Separator } from "@/components/ui/separator"
import { TypingAnimation } from "@/components/ui/typing-animation"

export default function AIAnalysis({ ticker }: { ticker: string }) {
  const { toast } = useToast()
  const [generateAIResponse, { data, loading }] =
    useMutation(GENERATE_AI_RESPONSE)

  const handleGenerateAIResponse = () => {
    generateAIResponse({
      variables: {
        tickerPrompt: `Give me a short blurb about the financials of ${ticker}. Format using plain text  `,
      },
    })
    toast({
      title: "Analyzing Financials for " + ticker,
      description:
        "This may take a moment... In the meantime, you can treat yourself to a nice drind",
      // action: (
      //   <ToastAction altText="Goto schedule to undo">
      //     Undo
      //   </ToastAction>
      // ),
    })
  }

  return (
    <div className="mt-6 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="gap-2">
          <Sparkles className="size-6" /> Ask our AI
        </p>
      </div>
      <div className="flex flex-row gap-4">
        <div className="flex w-1/2  flex-col gap-2">
          {/* <p className="text-xl font-bold italic text-muted-foreground">
            Prompt
          </p>
          <p className="text-pretty text-sm">What is the price of {ticker}?</p>
          <Separator /> */}

          {data && (
            <TypingAnimation
              className="text-md text-pretty text-left"
              duration={5}
              text={
                data.genAIFinancialsContent.candidates[0].content.parts[0].text
              }
            />
          )}

          <div className="block gap-2">
            <ShinyButton
              className="rounded-full py-2"
              //@ts-ignore
              disabled={loading || data}
              onClick={handleGenerateAIResponse}
            >
              {data ? "Generating..." : "Generate AI Response"}
            </ShinyButton>
            <br />
            <SourceTag type="gemini" />
          </div>
        </div>

        {loading && <div>Loading...</div>}
        {data && (
          <BlurFade>
            <Code
              code={JSON.stringify(data || AI_RESPONSE_MOCK, null, 2) as string}
              language="json"
              filename="Operation Response"
              lightTheme="github-light"
              darkTheme="github-dark"
            />
          </BlurFade>
        )}
      </div>
    </div>
  )
}
