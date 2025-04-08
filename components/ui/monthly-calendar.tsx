"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface CalendarEvent {
  id: string
  date: Date
  title: string
  type: "meal" | "prep"
  recipeId?: string
}

interface MonthlyCalendarProps {
  events: CalendarEvent[]
  onDateSelect?: (date: Date) => void
  className?: string
}

export function MonthlyCalendar({ events, onDateSelect, className }: MonthlyCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [calendarDays, setCalendarDays] = useState<
    Array<{
      date: Date | null
      isCurrentMonth: boolean
      isToday: boolean
      events: CalendarEvent[]
    }>
  >([])

  // Format the current month and year for display
  const monthYearString = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })

  // Days of the week
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
  }

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
  }

  // Check if a date is today
  const isToday = useCallback((date: Date | null) => {
    if (!date) return false
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }, [])

  // Get events for a specific date
  const getEventsForDate = useCallback(
    (date: Date | null) => {
      if (!date) return []
      return events.filter((event) => {
        const eventDate = new Date(event.date)
        return eventDate.toDateString() === date.toDateString()
      })
    },
    [events],
  )

  // Handle date selection
  const handleDateClick = (date: Date | null) => {
    if (!date || !onDateSelect) return
    onDateSelect(date)
  }

  // Generate calendar days for the current month view
  useEffect(() => {
    const generateCalendarDays = () => {
      const year = currentMonth.getFullYear()
      const month = currentMonth.getMonth()

      // First day of the month
      const firstDayOfMonth = new Date(year, month, 1)
      const dayOfWeek = firstDayOfMonth.getDay()

      // Last day of the month
      const lastDayOfMonth = new Date(year, month + 1, 0)
      const daysInMonth = lastDayOfMonth.getDate()

      // Last day of previous month
      const lastDayOfPrevMonth = new Date(year, month, 0)
      const daysInPrevMonth = lastDayOfPrevMonth.getDate()

      const days = []

      // Add days from previous month to fill the first row
      for (let i = 0; i < dayOfWeek; i++) {
        const date = new Date(year, month - 1, daysInPrevMonth - (dayOfWeek - i - 1))
        days.push({
          date,
          isCurrentMonth: false,
          isToday: isToday(date),
          events: getEventsForDate(date),
        })
      }

      // Add days of current month
      for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, month, i)
        days.push({
          date,
          isCurrentMonth: true,
          isToday: isToday(date),
          events: getEventsForDate(date),
        })
      }

      // Add days from next month to complete the last row
      const remainingDays = 42 - days.length // 6 rows of 7 days
      for (let i = 1; i <= remainingDays; i++) {
        const date = new Date(year, month + 1, i)
        days.push({
          date,
          isCurrentMonth: false,
          isToday: isToday(date),
          events: getEventsForDate(date),
        })
      }

      return days
    }

    setCalendarDays(generateCalendarDays())
  }, [currentMonth, isToday, getEventsForDate])

  return (
    <div className={cn("w-full rounded-md overflow-hidden", className)}>
      {/* Calendar header */}
      <div className="flex items-center justify-between p-3 bg-[#141a24] border-b border-gray-800">
        <button
          onClick={goToPreviousMonth}
          className="p-1 rounded-full hover:bg-gray-700 text-white/70 hover:text-white transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <h2 className="text-white font-medium text-base">{monthYearString}</h2>

        <button
          onClick={goToNextMonth}
          className="p-1 rounded-full hover:bg-gray-700 text-white/70 hover:text-white transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Days of week header */}
      <div className="grid grid-cols-7 bg-[#0d1117]">
        {daysOfWeek.map((day, index) => (
          <div
            key={day}
            className={cn(
              "h-8 flex items-center justify-center text-xs font-medium",
              index === 0 || index === 6 ? "text-pizza-orange/80" : "text-white/60",
            )}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 bg-[#0d1117]">
        {calendarDays.map((day, index) => (
          <div
            key={index}
            onClick={() => day.date && handleDateClick(day.date)}
            className={cn(
              "min-h-[80px] p-1 border-r border-b border-gray-800 relative flex flex-col",
              !day.isCurrentMonth && "bg-[#0a0d12]",
              day.isToday && "bg-gray-800/30",
              day.isCurrentMonth ? "text-white" : "text-white/30",
              "hover:bg-gray-800/20 cursor-pointer",
            )}
          >
            <div className="text-sm font-medium p-1">{day.date?.getDate()}</div>

            <div className="flex flex-col gap-1 mt-1">
              {day.events.length > 0 &&
                day.events.map((event, eventIndex) => {
                  // Determine if this is a meal or prep day
                  const isMealDay = event.type === "meal"

                  return (
                    <Link
                      key={`${event.id}-${eventIndex}`}
                      href={event.recipeId ? `/plan/${event.recipeId}` : "#"}
                      className={cn(
                        "text-xs px-1 py-0.5 rounded truncate",
                        isMealDay
                          ? "bg-pizza-orange text-white"
                          : "bg-transparent border border-pizza-orange text-pizza-orange",
                      )}
                    >
                      {!isMealDay && "Prep: "}
                      {event.title.length > 15 ? `${event.title.substring(0, 15)}...` : event.title}
                    </Link>
                  )
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

