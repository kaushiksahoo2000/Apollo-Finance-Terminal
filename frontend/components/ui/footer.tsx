"use client"

export default function Footer() {
  return (
    <footer className="absolute bottom-0 left-0 right-0 py-6 md:px-8 md:py-0">
      <div className="flex flex-col items-center justify-center gap-2 md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built with Vibes ❤️
        </p>
      </div>
    </footer>
  )
}
