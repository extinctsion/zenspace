"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"
import { Play, Pause } from "lucide-react"
import { cn } from "@/lib/utils"

const CYCLE_MS = 12_000 // 4s inhale, 4s hold, 4s exhale

export default function BreathingWidget({
  className,
}: {
  className?: string
}) {
  const [running, setRunning] = useState(false)
  const circleRef = useRef<SVGCircleElement>(null)

  useEffect(() => {
    let id: number | undefined
    if (running && circleRef.current) {
      const circle = circleRef.current
      const animate = () => {
        circle.animate([{ r: "40" }, { r: "80", offset: 0.33 }, { r: "80", offset: 0.67 }, { r: "40" }], {
          duration: CYCLE_MS,
          easing: "ease-in-out",
          iterations: Number.POSITIVE_INFINITY,
        })
      }
      animate()
    } else {
      circleRef.current?.getAnimations().forEach((a) => a.cancel())
    }
    return () => {
      if (id) cancelAnimationFrame(id)
    }
  }, [running])

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Breathing Exercise</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <svg width="220" height="220" viewBox="0 0 220 220">
          <circle
            ref={circleRef}
            cx="110"
            cy="110"
            r="40"
            fill="hsl(var(--foreground)/0.05)"
            stroke="hsl(var(--foreground)/0.4)"
            strokeWidth="4"
          />
        </svg>
        <Button variant="outline" onClick={() => setRunning((prev) => !prev)} className="w-32">
          {running ? (
            <>
              <Pause className="mr-2 size-4" /> Stop
            </>
          ) : (
            <>
              <Play className="mr-2 size-4" /> Start
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
