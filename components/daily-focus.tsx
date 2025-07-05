"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export default function DailyFocus({
  className,
}: {
  className?: string
}) {
  const [focus, setFocus] = useState("")

  useEffect(() => {
    const stored = localStorage.getItem("zen-focus") ?? ""
    setFocus(stored)
  }, [])

  const handleBlur = () => {
    localStorage.setItem("zen-focus", focus.trim())
  }

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Daily Focus</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="What's your main goal today?"
          value={focus}
          onChange={(e) => setFocus(e.target.value)}
          onBlur={handleBlur}
          className="resize-none bg-muted/50 ring-0 focus-visible:ring-2"
          rows={3}
        />
      </CardContent>
    </Card>
  )
}
