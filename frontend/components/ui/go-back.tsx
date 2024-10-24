"use client"

import { useRouter } from "next/navigation"
import { Button } from "./button"
import { ChevronLeftIcon } from "@radix-ui/react-icons"
export default function GoBack() {
  const router = useRouter()

  return (
    <Button
      aria-label="Go Back"
      variant="ghost"
      size="sm"
      onClick={() => router.back()}
      className="rounded-full"
    >
      <ChevronLeftIcon />
      Back
    </Button>
  )
}
