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
    <div>
      <BlurIn word="Learn how to build this" />

      <FileTreeDemo className="mx-auto" />

      <Separator />
      <div className="mx-auto mt-8 flex max-w-4xl flex-col gap-12">
        <section>
          <h2>Snippet</h2>
          <p>
            Snippet is a tool that allows you to create and share snippets of
            text.
          </p>
          <Button>Create Snippet</Button>
        </section>

        <CodeComparison
          beforeCode={beforeCode}
          afterCode={afterCode}
          language="tsx"
          filename="example.ts"
          lightTheme="github-light"
          darkTheme="github-dark"
        />

        <Code
          code={afterCode}
          language="tsx"
          filename="example.ts"
          lightTheme="github-light"
          darkTheme="github-dark"
        />
      </div>
    </div>
  )
}
