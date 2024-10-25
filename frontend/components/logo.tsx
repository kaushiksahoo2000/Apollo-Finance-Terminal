import { cn } from "@/lib/utils"
import Image from "next/image"

import { useTheme } from "next-themes"

export const Logo = ({ className }: { className?: string }) => {
  const theme = useTheme()
  return (
    <Image
      priority
      src={theme.theme === "dark" ? "/logo.png" : "/logo.dark.png"}
      width={32}
      height={32}
      alt="Apollo Logo"
      className={cn("size-8", className)}
    />
  )
}
