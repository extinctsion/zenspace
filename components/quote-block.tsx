"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { Loader2, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

type Quote = { content: string; author: string }

/* simple API (fallback to local if offline) */
async function fetchQuote(): Promise<Quote> {
  try {
    const res = await fetch("https://api.quotable.io/random?tags=wisdom|inspire")
    const data = await res.json()
    return { content: data.content, author: data.author }
  } catch {
    const local = LOCAL_QUOTES[Math.floor(Math.random() * LOCAL_QUOTES.length)]
    return local
  }
}

const LOCAL_QUOTES: Quote[] = [
  {
    content: "The best way out is always through.",
    author: "Robert Frost",
  },
  {
    content: "Be where you are; otherwise you will miss your life.",
    author: "Buddha",
  },
  {
    content: "Simplicity is the soul of efficiency.",
    author: "Austin Freeman",
  },
]

export default function QuoteBlock({ className }: { className?: string }) {
  const [quote, setQuote] = useState<Quote | null>(null)
  const [loading, setLoading] = useState(false)

  const load = async () => {
    setLoading(true)
    const q = await fetchQuote()
    setQuote(q)
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <Card className={className}>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Inspiration</CardTitle>
        <Button size="icon" variant="ghost" onClick={load} disabled={loading} className="text-muted-foreground">
          {loading ? <Loader2 className="size-4 animate-spin" /> : <RefreshCcw className="size-4" />}
        </Button>
      </CardHeader>
      <CardContent className="space-y-2">
        {quote ? (
          <>
            <p className="text-lg italic leading-7">{"“" + quote.content + "”"}</p>
            <p className="text-right text-sm font-medium">— {quote.author}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </CardContent>
    </Card>
  )
}
