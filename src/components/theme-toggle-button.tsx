"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export function ThemeToggleButton() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Avoid hydration mismatch by rendering a placeholder or null
    // You can also return a Skeleton component here if you have one
    return <Button variant="ghost" size="icon" disabled className="h-9 w-9 animate-pulse bg-muted rounded-md"></Button>;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-9 w-9" // Standard icon button size
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      {theme === "light" ? (
        <Icons.Moon className="h-5 w-5" />
      ) : (
        <Icons.Sun className="h-5 w-5" />
      )}
    </Button>
  )
}
