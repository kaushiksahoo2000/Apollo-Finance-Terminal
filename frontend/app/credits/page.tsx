import BlurIn from "@/components/ui/blur-in"

export default function Credits() {
  return (
    <div>
      <BlurIn className="mt-32" word="All thanks to Open-Source" />

      <div className="mx-auto mt-12 flex max-w-2xl flex-col gap-4 md:text-5xl">
        <BlurIn
          className="text-pretty text-left text-muted-foreground md:text-2xl"
          word="This app wouldn't be possible without the amazing open-source technologies that power it. We're incredibly grateful to the open-source community for providing the tools and frameworks that make development faster and more accessible. A huge shout out to:
Apollo Client
Apollo Server
Apollo Router
Rover
Next.js
Thank you to all the contributors who make these projects great!"
        />
        <BlurIn
          className="text-pretty text-left text-muted-foreground md:text-2xl"
          word="- Apollo Client"
        />
        <BlurIn
          className="text-pretty text-left text-muted-foreground md:text-2xl"
          word=" - Apollo Server"
        />
        <BlurIn
          className="text-pretty text-left text-muted-foreground md:text-2xl"
          word="- Apollo Router"
        />
        <BlurIn
          className="text-pretty text-left text-muted-foreground md:text-2xl"
          word="- Rover"
        />
        <BlurIn
          className="text-pretty text-left text-muted-foreground md:text-2xl"
          word="- Next.js"
        />

        <BlurIn
          className="text-pretty text-left text-muted-foreground md:text-2xl"
          word="Thank you to all the contributors who make these projects great!"
        />
        <BlurIn
          className="text-pretty text-left md:text-xl"
          word="- Kaushik, Ash"
        />
      </div>
    </div>
  )
}
