"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarDays, List, Plus, ChevronLeft } from "lucide-react"
import Link from "next/link"
import { MonthlyCalendar } from "@/components/ui/monthly-calendar"
import { useToast } from "@/hooks/use-toast"
import { syncPrepReminders } from "@/utils/meal-planner-utils"

interface MealPlan {
  id: string
  recipeId: string
  title: string
  type: string
  size: string
  pizzaCount: number
  date: string
  time: string
  image?: string
}

interface PrepReminder {
  id: string
  mealPlanId: string
  recipeId: string
  title: string
  type: string
  date: string
  mealDate: string
}

export function MealPlanner() {
  const { toast } = useToast()
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar")
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([])
  const [prepReminders, setPrepReminders] = useState<PrepReminder[]>([])
  const [showPizzaDays, setShowPizzaDays] = useState(true)
  const [showPrepDays, setShowPrepDays] = useState(true)

  // Load meal plans and prep reminders from localStorage
  useEffect(() => {
    try {
      // Load meal plans
      const mealPlansJson = localStorage.getItem("mealPlans")
      if (mealPlansJson) {
        setMealPlans(JSON.parse(mealPlansJson))
      } else {
        // If no meal plans exist, initialize with empty array
        setMealPlans([])
        localStorage.setItem("mealPlans", JSON.stringify([]))
      }

      // Load prep reminders
      const prepRemindersJson = localStorage.getItem("prepReminders")
      if (prepRemindersJson) {
        setPrepReminders(JSON.parse(prepRemindersJson))
      } else {
        // If no prep reminders exist, initialize with empty array
        setPrepReminders([])
        localStorage.setItem("prepReminders", JSON.stringify([]))
      }
    } catch (error) {
      console.error("Error loading meal plans:", error)
      toast({
        title: "Error loading meal plans",
        description: "There was a problem loading your meal plans.",
        variant: "destructive",
      })
    }
  }, [toast])

  // Add a useEffect to sync prep reminders when the component mounts
  // Add this after the existing useEffect that loads meal plans
  useEffect(() => {
    // Sync prep reminders to ensure all meal plans have corresponding prep days
    const updatedPrepReminders = syncPrepReminders()
    if (updatedPrepReminders.length > 0) {
      setPrepReminders(updatedPrepReminders)
    }
  }, [mealPlans]) // Run this effect when mealPlans changes

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
  }

  // Format time for display
  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":")
    const hour = Number.parseInt(hours, 10)
    const ampm = hour >= 12 ? "PM" : "AM"
    const hour12 = hour % 12 || 12
    return `${hour12}:${minutes} ${ampm}`
  }

  // Check if a date is today
  const isToday = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  // Check if a date is in the past
  const isPast = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  // Get upcoming meal plans (not in the past)
  const upcomingMealPlans = mealPlans
    .filter((plan) => !isPast(plan.date))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  // Get upcoming prep reminders (not in the past)
  const upcomingPrepReminders = prepReminders
    .filter((reminder) => !isPast(reminder.date))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  // Format calendar events
  const calendarEvents = [
    ...(showPizzaDays
      ? mealPlans.map((plan) => ({
          id: plan.id,
          date: new Date(plan.date),
          title: plan.title,
          type: "meal" as const,
          recipeId: plan.recipeId,
        }))
      : []),
    ...(showPrepDays
      ? prepReminders.map((reminder) => ({
          id: reminder.id,
          date: new Date(reminder.date),
          title: reminder.title.includes("Prep:") ? reminder.title : `Prep: ${reminder.title}`,
          type: "prep" as const,
          recipeId: reminder.recipeId,
        }))
      : []),
  ]

  // Toggle pizza days visibility
  const togglePizzaDays = () => {
    setShowPizzaDays(!showPizzaDays)
  }

  // Toggle prep days visibility
  const togglePrepDays = () => {
    setShowPrepDays(!showPrepDays)
  }

  return (
    <div className="flex flex-col min-h-screen slate-bg pb-16">
      <header className="sticky top-0 dark-blue-bg border-b border-pizza-orange/20 z-10">
        <div className="container px-4 py-3 mx-auto max-w-md flex items-center">
          <Link href="/" className="mr-2">
            <ChevronLeft className="h-5 w-5 theme-text-primary" />
          </Link>
          <div className="flex items-center flex-1">
            <img src="/images/pizza-navigator-icon.png" alt="Pizza Navigator" className="h-6 w-6 mr-2" />
            <h1 className="text-lg font-semibold theme-text-primary">Meal Planner</h1>
          </div>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode("calendar")}
              className={viewMode === "calendar" ? "bg-pizza-orange/20 text-pizza-orange" : "text-white/70"}
              aria-label="Calendar View"
            >
              <CalendarDays className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-pizza-orange/20 text-pizza-orange" : "text-white/70"}
              aria-label="List View"
            >
              <List className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container px-4 py-6 mx-auto max-w-md space-y-6">
          {viewMode === "calendar" ? (
            <div className="space-y-4">
              <h2 className="text-xl font-bold theme-text-primary flex items-center">
                <CalendarDays className="h-5 w-5 mr-2 text-pizza-orange" />
                Pizza Calendar
              </h2>

              <MonthlyCalendar events={calendarEvents} className="border border-gray-800 rounded-md overflow-hidden" />

              {/* Updated toggle buttons with consistent styling */}
              <div className="flex flex-col gap-4 mt-6">
                <div className="flex items-center justify-center gap-6">
                  <button
                    onClick={togglePizzaDays}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors border ${
                      showPizzaDays
                        ? "border-pizza-orange bg-transparent text-pizza-orange"
                        : "border-pizza-orange/50 bg-transparent text-pizza-orange/70"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full ${
                        showPizzaDays
                          ? "bg-pizza-orange border-pizza-orange"
                          : "bg-transparent border border-pizza-orange/50"
                      }`}
                    ></div>
                    <span className="font-medium">Pizza Day</span>
                  </button>

                  <button
                    onClick={togglePrepDays}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors border ${
                      showPrepDays
                        ? "border-pizza-orange bg-transparent text-pizza-orange"
                        : "border-pizza-orange/50 bg-transparent text-pizza-orange/70"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full ${
                        showPrepDays
                          ? "bg-pizza-orange border-pizza-orange"
                          : "bg-transparent border border-pizza-orange/50"
                      }`}
                    ></div>
                    <span className="font-medium">Prep Day</span>
                  </button>
                </div>

                <Link href="/create-plan" className="no-underline mt-6">
                  <Button className="w-full bright-orange-btn">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Pizza Plan
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-xl font-bold theme-text-primary flex items-center">
                <CalendarDays className="h-5 w-5 mr-2 text-pizza-orange" />
                Upcoming Preparations
              </h2>

              {upcomingPrepReminders.length > 0 || upcomingMealPlans.length > 0 ? (
                <div className="space-y-3">
                  {upcomingPrepReminders.map((reminder) => {
                    const mealPlan = mealPlans.find((plan) => plan.id === reminder.mealPlanId)
                    return (
                      <Card key={reminder.id} className="bg-[#1a202c] border-pizza-orange/20">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-white">{reminder.title}</h3>
                              <p className="text-sm text-white/70">
                                Meal: {formatDate(reminder.mealDate)} at {mealPlan ? formatTime(mealPlan.time) : "TBD"}
                              </p>
                              <p className="text-sm text-pizza-orange">
                                Start prep: {isToday(reminder.date) ? "Today" : formatDate(reminder.date)}
                              </p>
                            </div>
                            <Link href={`/plan/${reminder.recipeId}`}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-white border-pizza-orange/30 hover:bg-pizza-orange/20"
                              >
                                View Recipe
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}

                  {upcomingMealPlans.map((plan) => {
                    // Only show meal plans that don't have a prep reminder today
                    const hasPrepToday = upcomingPrepReminders.some(
                      (reminder) => reminder.mealPlanId === plan.id && isToday(reminder.date),
                    )
                    if (hasPrepToday) return null

                    return (
                      <Card key={plan.id} className="bg-[#1a202c] border-pizza-orange/20">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-white">{plan.title}</h3>
                              <p className="text-sm text-white/70">
                                Meal: {formatDate(plan.date)} at {formatTime(plan.time)}
                              </p>
                              {isToday(plan.date) && <p className="text-sm text-green-500">Today's dinner!</p>}
                            </div>
                            <Link href={`/plan/${plan.recipeId}`}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-white border-pizza-orange/30 hover:bg-pizza-orange/20"
                              >
                                View Recipe
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-white/70 mb-4">No upcoming preparations</p>
                  <p className="text-sm text-white/50 mb-6">Add a pizza plan to your meal planner to see it here</p>
                </div>
              )}

              <Link href="/create-plan" className="no-underline">
                <Button className="w-full bright-orange-btn">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Pizza Plan
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

