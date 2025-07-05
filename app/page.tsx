"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Sun,
  Moon,
  Palette,
  Bell,
  Search,
  Plus,
  Calendar,
  Clock,
  Target,
  Zap,
  Brain,
  Heart,
  Star,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  Activity,
  CheckCircle2,
  Circle,
  Filter,
  SortDesc,
  ArrowUp,
  ArrowDown,
  Minus,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Types
type Theme = "light" | "dark" | "zen"
type Priority = "high" | "medium" | "low"
type TaskStatus = "todo" | "in-progress" | "completed"

interface Task {
  id: string
  title: string
  description?: string
  priority: Priority
  status: TaskStatus
  dueDate?: string
  tags: string[]
  progress: number
}

interface Note {
  id: string
  title: string
  content: string
  color: string
  timestamp: number
  pinned: boolean
}

interface Metric {
  label: string
  value: string
  change: number
  trend: "up" | "down" | "stable"
}

// Sample data
const sampleTasks: Task[] = [
  {
    id: "1",
    title: "Complete Q4 Strategy Review",
    description: "Finalize strategic planning documents for next quarter",
    priority: "high",
    status: "in-progress",
    dueDate: "2024-01-15",
    tags: ["Strategy", "Planning"],
    progress: 75,
  },
  {
    id: "2",
    title: "Team Performance Reviews",
    priority: "medium",
    status: "todo",
    dueDate: "2024-01-20",
    tags: ["HR", "Management"],
    progress: 0,
  },
  {
    id: "3",
    title: "Product Launch Preparation",
    description: "Coordinate with marketing and engineering teams",
    priority: "high",
    status: "in-progress",
    tags: ["Product", "Launch"],
    progress: 60,
  },
]

const sampleMetrics: Metric[] = [
  { label: "Productivity Score", value: "94%", change: 12, trend: "up" },
  { label: "Focus Time", value: "6.2h", change: 8, trend: "up" },
  { label: "Tasks Completed", value: "23", change: -3, trend: "down" },
  { label: "Team Collaboration", value: "87%", change: 5, trend: "up" },
]

const inspirationalQuotes = [
  "Excellence is never an accident. It is always the result of high intention, sincere effort, and intelligent execution. - Aristotle",
  "The way to get started is to quit talking and begin doing. - Walt Disney",
  "Innovation distinguishes between a leader and a follower. - Steve Jobs",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
  "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
]

export default function ZenflowWorkspace() {
  // State management
  const [theme, setTheme] = useState<Theme>("light")
  const [currentTime, setCurrentTime] = useState(new Date())
  const [tasks, setTasks] = useState<Task[]>(sampleTasks)
  const [notes, setNotes] = useState<Note[]>([])
  const [currentQuote, setCurrentQuote] = useState("")
  const [dailyFocus, setDailyFocus] = useState("")
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60)
  const [isPomodoroActive, setIsPomodoroActive] = useState(false)
  const [pomodoroSessions, setPomodoroSessions] = useState(0)
  const [isBreathing, setIsBreathing] = useState(false)
  const [breathingPhase, setBreathingPhase] = useState<"inhale" | "hold" | "exhale">("inhale")
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showNewTask, setShowNewTask] = useState(false)
  const [showNewNote, setShowNewNote] = useState(false)

  // Load data from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("zenflow-theme") as Theme
    const savedFocus = localStorage.getItem("zenflow-daily-focus")
    const savedNotes = localStorage.getItem("zenflow-notes")
    const savedTasks = localStorage.getItem("zenflow-tasks")
    const savedSessions = localStorage.getItem("zenflow-pomodoro-sessions")

    if (savedTheme) setTheme(savedTheme)
    if (savedFocus) setDailyFocus(savedFocus)
    if (savedNotes) setNotes(JSON.parse(savedNotes))
    if (savedTasks) setTasks(JSON.parse(savedTasks))
    if (savedSessions) setPomodoroSessions(Number.parseInt(savedSessions))

    // Set initial quote
    setCurrentQuote(inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)])

    // Update time every minute
    const timeInterval = setInterval(() => setCurrentTime(new Date()), 60000)

    // Rotate quotes every 2 minutes
    const quoteInterval = setInterval(() => {
      setCurrentQuote(inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)])
    }, 120000)

    return () => {
      clearInterval(timeInterval)
      clearInterval(quoteInterval)
    }
  }, [])

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem("zenflow-theme", theme)
    document.documentElement.className = theme
  }, [theme])

  useEffect(() => {
    localStorage.setItem("zenflow-daily-focus", dailyFocus)
  }, [dailyFocus])

  useEffect(() => {
    localStorage.setItem("zenflow-notes", JSON.stringify(notes))
  }, [notes])

  useEffect(() => {
    localStorage.setItem("zenflow-tasks", JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem("zenflow-pomodoro-sessions", pomodoroSessions.toString())
  }, [pomodoroSessions])

  // Pomodoro timer logic
  useEffect(() => {
    if (!isPomodoroActive || pomodoroTime <= 0) return

    const timer = setInterval(() => {
      setPomodoroTime((prev) => {
        if (prev <= 1) {
          setIsPomodoroActive(false)
          setPomodoroSessions((s) => s + 1)
          if (soundEnabled) {
            // Simple audio notification
            const audio = new Audio(
              "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
            )
            audio.play().catch(() => {})
          }
          alert("🎉 Pomodoro session complete! Time for a break.")
          return 25 * 60
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isPomodoroActive, pomodoroTime, soundEnabled])

  // Breathing animation logic
  useEffect(() => {
    if (!isBreathing) return

    const breathingCycle = () => {
      setBreathingPhase("inhale")
      setTimeout(() => {
        setBreathingPhase("hold")
        setTimeout(() => {
          setBreathingPhase("exhale")
          setTimeout(() => {
            if (isBreathing) breathingCycle()
          }, 6000)
        }, 4000)
      }, 4000)
    }

    breathingCycle()
  }, [isBreathing])

  // Helper functions
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return "Good Morning"
    if (hour < 17) return "Good Afternoon"
    return "Good Evening"
  }

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
    }
  }

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-4 h-4 text-green-600" />
      case "in-progress":
        return <Clock className="w-4 h-4 text-blue-600" />
      case "todo":
        return <Circle className="w-4 h-4 text-gray-400" />
    }
  }

  const addTask = (title: string, priority: Priority = "medium") => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      priority,
      status: "todo",
      tags: [],
      progress: 0,
    }
    setTasks((prev) => [newTask, ...prev])
  }

  const toggleTaskStatus = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          const newStatus =
            task.status === "todo" ? "in-progress" : task.status === "in-progress" ? "completed" : "todo"
          return { ...task, status: newStatus, progress: newStatus === "completed" ? 100 : task.progress }
        }
        return task
      }),
    )
  }

  const addNote = (title: string, content: string, color = "yellow") => {
    const newNote: Note = {
      id: Date.now().toString(),
      title,
      content,
      color,
      timestamp: Date.now(),
      pinned: false,
    }
    setNotes((prev) => [newNote, ...prev])
  }

  const deleteNote = (noteId: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== noteId))
  }

  return (
    <div
      className={cn(
        "min-h-screen transition-all duration-700",
        theme === "light" && "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100",
        theme === "dark" && "bg-gradient-to-br from-gray-900 via-slate-900 to-black",
        theme === "zen" && "bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100",
      )}
    >
      {/* Header */}
      <header
        className={cn(
          "sticky top-0 z-50 backdrop-blur-xl border-b transition-all duration-300",
          theme === "light" && "bg-white/80 border-slate-200/50",
          theme === "dark" && "bg-gray-900/80 border-gray-700/50",
          theme === "zen" && "bg-emerald-50/80 border-emerald-200/50",
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shadow-lg",
                  theme === "light" && "bg-gradient-to-br from-indigo-500 to-purple-600",
                  theme === "dark" && "bg-gradient-to-br from-blue-500 to-cyan-600",
                  theme === "zen" && "bg-gradient-to-br from-emerald-500 to-teal-600",
                )}
              >
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1
                  className={cn(
                    "text-xl font-bold tracking-tight",
                    theme === "light" && "text-gray-900",
                    theme === "dark" && "text-white",
                    theme === "zen" && "text-emerald-900",
                  )}
                >
                  Zenflow Workspace
                </h1>
                <p
                  className={cn(
                    "text-xs",
                    theme === "light" && "text-gray-500",
                    theme === "dark" && "text-gray-400",
                    theme === "zen" && "text-emerald-600",
                  )}
                >
                  Premium Productivity Suite
                </p>
              </div>
            </div>

            {/* Search */}
            <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search
                  className={cn(
                    "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4",
                    theme === "light" && "text-gray-400",
                    theme === "dark" && "text-gray-500",
                    theme === "zen" && "text-emerald-500",
                  )}
                />
                <input
                  type="text"
                  placeholder="Search tasks, notes, or ask AI..."
                  className={cn(
                    "w-full pl-10 pr-4 py-2 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-offset-0",
                    theme === "light" &&
                      "bg-white/70 border-slate-200 focus:ring-indigo-500 text-gray-900 placeholder-gray-500",
                    theme === "dark" &&
                      "bg-gray-800/70 border-gray-600 focus:ring-blue-500 text-white placeholder-gray-400",
                    theme === "zen" &&
                      "bg-emerald-50/70 border-emerald-200 focus:ring-emerald-500 text-emerald-900 placeholder-emerald-600",
                  )}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              {/* Theme Toggle */}
              <div className="flex items-center space-x-1 p-1 rounded-lg bg-black/5 dark:bg-white/5">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTheme("light")}
                  className={cn(
                    "p-2 rounded-md transition-all duration-200",
                    theme === "light" && "bg-white shadow-sm",
                  )}
                >
                  <Sun className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTheme("dark")}
                  className={cn(
                    "p-2 rounded-md transition-all duration-200",
                    theme === "dark" && "bg-gray-800 shadow-sm",
                  )}
                >
                  <Moon className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTheme("zen")}
                  className={cn(
                    "p-2 rounded-md transition-all duration-200",
                    theme === "zen" && "bg-emerald-100 shadow-sm",
                  )}
                >
                  <Palette className="w-4 h-4" />
                </Button>
              </div>

              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                  3
                </span>
              </Button>

              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-sm font-semibold">
                  JD
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2
                className={cn(
                  "text-3xl font-bold mb-2",
                  theme === "light" && "text-gray-900",
                  theme === "dark" && "text-white",
                  theme === "zen" && "text-emerald-900",
                )}
              >
                {getGreeting()}, John
              </h2>
              <p
                className={cn(
                  "text-lg",
                  theme === "light" && "text-gray-600",
                  theme === "dark" && "text-gray-400",
                  theme === "zen" && "text-emerald-700",
                )}
              >
                {currentTime.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="text-right">
              <div
                className={cn(
                  "text-2xl font-mono font-bold",
                  theme === "light" && "text-gray-900",
                  theme === "dark" && "text-white",
                  theme === "zen" && "text-emerald-900",
                )}
              >
                {currentTime.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="secondary" className="text-xs">
                  <Zap className="w-3 h-3 mr-1" />
                  {pomodoroSessions} sessions today
                </Badge>
              </div>
            </div>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {sampleMetrics.map((metric, index) => (
              <Card
                key={index}
                className={cn(
                  "transition-all duration-300 hover:shadow-lg border-0",
                  theme === "light" && "bg-white/70 backdrop-blur-sm",
                  theme === "dark" && "bg-gray-800/70 backdrop-blur-sm",
                  theme === "zen" && "bg-emerald-50/70 backdrop-blur-sm",
                )}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={cn(
                        "text-sm font-medium",
                        theme === "light" && "text-gray-600",
                        theme === "dark" && "text-gray-400",
                        theme === "zen" && "text-emerald-700",
                      )}
                    >
                      {metric.label}
                    </span>
                    <div
                      className={cn(
                        "flex items-center text-xs",
                        metric.trend === "up" && "text-green-600",
                        metric.trend === "down" && "text-red-600",
                        metric.trend === "stable" && "text-gray-500",
                      )}
                    >
                      {metric.trend === "up" && <ArrowUp className="w-3 h-3 mr-1" />}
                      {metric.trend === "down" && <ArrowDown className="w-3 h-3 mr-1" />}
                      {metric.trend === "stable" && <Minus className="w-3 h-3 mr-1" />}
                      {Math.abs(metric.change)}%
                    </div>
                  </div>
                  <div
                    className={cn(
                      "text-2xl font-bold",
                      theme === "light" && "text-gray-900",
                      theme === "dark" && "text-white",
                      theme === "zen" && "text-emerald-900",
                    )}
                  >
                    {metric.value}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Daily Focus */}
            <Card
              className={cn(
                "transition-all duration-300 hover:shadow-xl border-0",
                theme === "light" && "bg-white/70 backdrop-blur-sm",
                theme === "dark" && "bg-gray-800/70 backdrop-blur-sm",
                theme === "zen" && "bg-emerald-50/70 backdrop-blur-sm",
              )}
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>Today's Focus</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  value={dailyFocus}
                  onChange={(e) => setDailyFocus(e.target.value)}
                  placeholder="What's your primary goal for today? Set your intention and make it happen..."
                  className={cn(
                    "w-full h-24 p-4 rounded-xl border-0 resize-none focus:ring-2 transition-all duration-200 text-lg",
                    theme === "light" && "bg-slate-50 focus:ring-indigo-500 text-gray-900 placeholder-gray-500",
                    theme === "dark" && "bg-gray-700 focus:ring-blue-500 text-white placeholder-gray-400",
                    theme === "zen" && "bg-emerald-100 focus:ring-emerald-500 text-emerald-900 placeholder-emerald-600",
                  )}
                />
              </CardContent>
            </Card>

            {/* Tasks */}
            <Card
              className={cn(
                "transition-all duration-300 hover:shadow-xl border-0",
                theme === "light" && "bg-white/70 backdrop-blur-sm",
                theme === "dark" && "bg-gray-800/70 backdrop-blur-sm",
                theme === "zen" && "bg-emerald-50/70 backdrop-blur-sm",
              )}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Smart Tasks</span>
                    <Badge variant="secondary" className="ml-2">
                      {tasks.filter((t) => t.status !== "completed").length} active
                    </Badge>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Filter className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <SortDesc className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setShowNewTask(!showNewTask)}
                      className={cn(
                        theme === "light" && "bg-indigo-500 hover:bg-indigo-600 text-white",
                        theme === "dark" && "bg-blue-500 hover:bg-blue-600 text-white",
                        theme === "zen" && "bg-emerald-500 hover:bg-emerald-600 text-white",
                      )}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Task
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {showNewTask && (
                  <div
                    className={cn(
                      "p-4 rounded-xl border-2 border-dashed",
                      theme === "light" && "border-indigo-200 bg-indigo-50",
                      theme === "dark" && "border-blue-600 bg-blue-900/20",
                      theme === "zen" && "border-emerald-200 bg-emerald-50",
                    )}
                  >
                    <input
                      type="text"
                      placeholder="Enter task title..."
                      className={cn(
                        "w-full p-2 rounded-lg border-0 focus:ring-2 transition-all duration-200",
                        theme === "light" && "bg-white focus:ring-indigo-500 text-gray-900",
                        theme === "dark" && "bg-gray-700 focus:ring-blue-500 text-white",
                        theme === "zen" && "bg-white focus:ring-emerald-500 text-emerald-900",
                      )}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && e.currentTarget.value.trim()) {
                          addTask(e.currentTarget.value.trim())
                          e.currentTarget.value = ""
                          setShowNewTask(false)
                        }
                      }}
                    />
                  </div>
                )}

                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={cn(
                      "p-4 rounded-xl border transition-all duration-200 hover:shadow-md",
                      theme === "light" && "bg-white border-slate-200",
                      theme === "dark" && "bg-gray-700 border-gray-600",
                      theme === "zen" && "bg-white border-emerald-200",
                      task.status === "completed" && "opacity-60",
                    )}
                  >
                    <div className="flex items-start space-x-3">
                      <button
                        onClick={() => toggleTaskStatus(task.id)}
                        className="mt-1 transition-all duration-200 hover:scale-110"
                      >
                        {getStatusIcon(task.status)}
                      </button>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h4
                            className={cn(
                              "font-semibold",
                              theme === "light" && "text-gray-900",
                              theme === "dark" && "text-white",
                              theme === "zen" && "text-emerald-900",
                              task.status === "completed" && "line-through",
                            )}
                          >
                            {task.title}
                          </h4>
                          <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                        </div>
                        {task.description && (
                          <p
                            className={cn(
                              "text-sm mb-3",
                              theme === "light" && "text-gray-600",
                              theme === "dark" && "text-gray-400",
                              theme === "zen" && "text-emerald-700",
                            )}
                          >
                            {task.description}
                          </p>
                        )}
                        {task.progress > 0 && (
                          <div className="mb-3">
                            <div className="flex items-center justify-between mb-1">
                              <span
                                className={cn(
                                  "text-xs font-medium",
                                  theme === "light" && "text-gray-600",
                                  theme === "dark" && "text-gray-400",
                                  theme === "zen" && "text-emerald-700",
                                )}
                              >
                                Progress
                              </span>
                              <span
                                className={cn(
                                  "text-xs font-medium",
                                  theme === "light" && "text-gray-900",
                                  theme === "dark" && "text-white",
                                  theme === "zen" && "text-emerald-900",
                                )}
                              >
                                {task.progress}%
                              </span>
                            </div>
                            <Progress value={task.progress} className="h-2" />
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {task.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          {task.dueDate && (
                            <span
                              className={cn(
                                "text-xs flex items-center",
                                theme === "light" && "text-gray-500",
                                theme === "dark" && "text-gray-400",
                                theme === "zen" && "text-emerald-600",
                              )}
                            >
                              <Calendar className="w-3 h-3 mr-1" />
                              {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Pomodoro Timer */}
            <Card
              className={cn(
                "transition-all duration-300 hover:shadow-xl border-0",
                theme === "light" && "bg-white/70 backdrop-blur-sm",
                theme === "dark" && "bg-gray-800/70 backdrop-blur-sm",
                theme === "zen" && "bg-emerald-50/70 backdrop-blur-sm",
              )}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>Focus Timer</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setSoundEnabled(!soundEnabled)}>
                    {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div
                  className={cn(
                    "text-4xl font-mono font-bold mb-6",
                    theme === "light" && "text-gray-900",
                    theme === "dark" && "text-white",
                    theme === "zen" && "text-emerald-900",
                  )}
                >
                  {formatTime(pomodoroTime)}
                </div>
                <div className="flex justify-center space-x-3 mb-4">
                  <Button
                    onClick={() => setIsPomodoroActive(!isPomodoroActive)}
                    className={cn(
                      "px-6",
                      theme === "light" && "bg-indigo-500 hover:bg-indigo-600 text-white",
                      theme === "dark" && "bg-blue-500 hover:bg-blue-600 text-white",
                      theme === "zen" && "bg-emerald-500 hover:bg-emerald-600 text-white",
                    )}
                  >
                    {isPomodoroActive ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                    {isPomodoroActive ? "Pause" : "Start"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsPomodoroActive(false)
                      setPomodoroTime(25 * 60)
                    }}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
                <div
                  className={cn(
                    "text-sm",
                    theme === "light" && "text-gray-600",
                    theme === "dark" && "text-gray-400",
                    theme === "zen" && "text-emerald-700",
                  )}
                >
                  Sessions completed today: <span className="font-semibold">{pomodoroSessions}</span>
                </div>
              </CardContent>
            </Card>

            {/* Breathing Exercise */}
            <Card
              className={cn(
                "transition-all duration-300 hover:shadow-xl border-0",
                theme === "light" && "bg-white/70 backdrop-blur-sm",
                theme === "dark" && "bg-gray-800/70 backdrop-blur-sm",
                theme === "zen" && "bg-emerald-50/70 backdrop-blur-sm",
              )}
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="w-5 h-5" />
                  <span>Mindful Breathing</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="relative mb-6">
                  <div
                    className={cn(
                      "w-32 h-32 mx-auto rounded-full border-4 transition-all duration-1000 flex items-center justify-center",
                      theme === "light" && "border-indigo-300 bg-indigo-50",
                      theme === "dark" && "border-blue-400 bg-blue-900/20",
                      theme === "zen" && "border-emerald-300 bg-emerald-50",
                      isBreathing && breathingPhase === "inhale" && "scale-125 opacity-80",
                      isBreathing && breathingPhase === "hold" && "scale-125 opacity-80",
                      isBreathing && breathingPhase === "exhale" && "scale-100 opacity-40",
                    )}
                  >
                    <Brain
                      className={cn(
                        "w-8 h-8",
                        theme === "light" && "text-indigo-600",
                        theme === "dark" && "text-blue-400",
                        theme === "zen" && "text-emerald-600",
                      )}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <p
                    className={cn(
                      "text-lg font-medium mb-2",
                      theme === "light" && "text-gray-900",
                      theme === "dark" && "text-white",
                      theme === "zen" && "text-emerald-900",
                    )}
                  >
                    {isBreathing
                      ? breathingPhase === "inhale"
                        ? "Breathe in slowly..."
                        : breathingPhase === "hold"
                          ? "Hold your breath..."
                          : "Breathe out gently..."
                      : "Ready to center yourself?"}
                  </p>
                  <Button onClick={() => setIsBreathing(!isBreathing)} variant="outline" className="px-6">
                    {isBreathing ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                    {isBreathing ? "Stop" : "Begin"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Inspiration */}
            <Card
              className={cn(
                "transition-all duration-300 hover:shadow-xl border-0",
                theme === "light" && "bg-white/70 backdrop-blur-sm",
                theme === "dark" && "bg-gray-800/70 backdrop-blur-sm",
                theme === "zen" && "bg-emerald-50/70 backdrop-blur-sm",
              )}
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="w-5 h-5" />
                  <span>Daily Inspiration</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <blockquote
                  className={cn(
                    "text-sm italic leading-relaxed",
                    theme === "light" && "text-gray-700",
                    theme === "dark" && "text-gray-300",
                    theme === "zen" && "text-emerald-800",
                  )}
                >
                  "{currentQuote}"
                </blockquote>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card
              className={cn(
                "transition-all duration-300 hover:shadow-xl border-0",
                theme === "light" && "bg-white/70 backdrop-blur-sm",
                theme === "dark" && "bg-gray-800/70 backdrop-blur-sm",
                theme === "zen" && "bg-emerald-50/70 backdrop-blur-sm",
              )}
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5" />
                  <span>Today's Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "text-sm",
                      theme === "light" && "text-gray-600",
                      theme === "dark" && "text-gray-400",
                      theme === "zen" && "text-emerald-700",
                    )}
                  >
                    Tasks Completed
                  </span>
                  <span
                    className={cn(
                      "font-semibold",
                      theme === "light" && "text-gray-900",
                      theme === "dark" && "text-white",
                      theme === "zen" && "text-emerald-900",
                    )}
                  >
                    {tasks.filter((t) => t.status === "completed").length}/{tasks.length}
                  </span>
                </div>
                <Progress
                  value={(tasks.filter((t) => t.status === "completed").length / tasks.length) * 100}
                  className="h-2"
                />
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "text-sm",
                      theme === "light" && "text-gray-600",
                      theme === "dark" && "text-gray-400",
                      theme === "zen" && "text-emerald-700",
                    )}
                  >
                    Focus Sessions
                  </span>
                  <span
                    className={cn(
                      "font-semibold",
                      theme === "light" && "text-gray-900",
                      theme === "dark" && "text-white",
                      theme === "zen" && "text-emerald-900",
                    )}
                  >
                    {pomodoroSessions}/8
                  </span>
                </div>
                <Progress value={(pomodoroSessions / 8) * 100} className="h-2" />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
