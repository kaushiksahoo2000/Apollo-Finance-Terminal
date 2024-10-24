import BlurIn from "@/components/ui/blur-in"

export default function Credits() {
  return (
    <div className="container mt-16">
      <BlurIn word="All thanks to Open-Source" />

      <div className="mx-auto mt-8 flex max-w-4xl flex-col gap-12">
        <section>
          <h2>Contributors</h2>
          <p>
            The Apollo Finance Terminal is built on top of a number of
            open-source projects.
          </p>
        </section>
      </div>
    </div>
  )
}
