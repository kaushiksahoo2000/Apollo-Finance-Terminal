import { Separator } from "@radix-ui/react-separator"
import { Button } from "@/components/ui/button"
import { CodeComparison } from "@/components/ui/code-comparison"
import { Code } from "@/components/ui/code"
import { BlurIn } from "@/components/ui/blur-in"
import { FileTreeDemo } from "./components/project-structure"

const beforeCode = `
  import { useState } from "react"

  export default function App() {
    const [count, setCount] = useState(0)

    return <div>Hello World</div>
  }
`

const afterCode = `
  import { useState } from "react"

  export default function App() {
    const [count, setCount] = useState(0)

    const handleClick = () => {
      setCount(count + 1)
    }

    return (
      <div>
        Hello World {count}
        <button onClick={handleClick}>Increment</button>
      </div>
  }
`

export default function DeepDive() {
  return (
    <div className="mx-auto mt-36 flex max-w-2xl flex-col gap-12">
      <BlurIn
        className=" mt-68 text-pretty md:text-5xl"
        word="Learn how to build this"
      />
      <BlurIn
        className="text-pretty text-left text-muted-foreground md:text-2xl"
        word="We're excited to share that a detailed guide to building this app is on the way! Soon, you'll find code snippets, commands, and step-by-step instructions to help you build your very own version of an Apollo Finance Terminal. Stay tuned—more resources are coming to guide you through every step of the process!"
      />
      <BlurIn
        className="text-pretty text-left md:text-xl"
        word="- Kaushik, Ash"
      />
    </div>
  )
}
