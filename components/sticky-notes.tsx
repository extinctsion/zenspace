"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Trash2, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

type Note = { id: string; text: string }

export default function StickyNotes({ className }: { className?: string }) {
  const [notes, setNotes] = useState<Note[]>([])

  /* load + persist */
  useEffect(() => {
    const stored = localStorage.getItem("zen-notes")
    if (stored) setNotes(JSON.parse(stored))
  }, [])
  useEffect(() => {
    localStorage.setItem("zen-notes", JSON.stringify(notes))
  }, [notes])

  const addNote = () => setNotes([...notes, { id: crypto.randomUUID(), text: "" }])

  const updateNote = (id: string, text: string) =>
    setNotes((n) => n.map((note) => (note.id === id ? { ...note, text } : note)))

  const deleteNote = (id: string) => setNotes((n) => n.filter((note) => note.id !== id))

  return (
    <Card className={cn(className)}>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Sticky Notes</CardTitle>
        <Button size="icon" variant="outline" onClick={addNote}>
          <Plus className="size-4" />
        </Button>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <div key={note.id} className="relative rounded-lg bg-muted/50 p-3 shadow-sm">
            <Textarea
              value={note.text}
              onChange={(e) => updateNote(note.id, e.target.value)}
              placeholder="Write something..."
              className="h-32 resize-none border-0 bg-transparent p-0 ring-0 focus-visible:ring-0"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-1 top-1 h-6 w-6 text-muted-foreground"
              onClick={() => deleteNote(note.id)}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        ))}
        {notes.length === 0 && (
          <p className="col-span-full text-center text-muted-foreground">No notes yet – click “+” to add one.</p>
        )}
      </CardContent>
    </Card>
  )
}
