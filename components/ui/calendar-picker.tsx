"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface CalendarPickerProps {
  selectedDate: Date | undefined
  onDateSelect: (date: Date) => void
  minDate?: Date
  className?: string
}

export function CalendarPicker({ selectedDate, onDateSelect, minDate = new Date(), className }: CalendarPickerProps) {
  // Initialize with the month of the selected date or current month
  const [currentMonth, setCurrentMonth] = useState(() => {
    return selectedDate
      ? new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
      : new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  })

  // Days of the week
  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

  // Format the current month and year for display
  const monthYearString = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })

  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  // Check if a date is selected
  const isDateSelected = (date: Date) => {
    if (!selectedDate) return false
    return date.toDateString() === selectedDate.toDateString()
  }

  // Check if a date is today
  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  // Check if a date is in the past
  const isDateInPast = (date: Date) => {
    if (!minDate) return false

    // Set both dates to midnight for comparison
    const dateToCheck = new Date(date)
    dateToCheck.setHours(0, 0, 0, 0)

    const minDateToCheck = new Date(minDate)
    minDateToCheck.setHours(0, 0, 0, 0)

    return dateToCheck < minDateToCheck
  }

  // Handle date selection
  const handleDateClick = (date: Date) => {
    if (isDateInPast(date)) return
    onDateSelect(date)
  }

  // Generate calendar days for the current month view
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
        isPast: isDateInPast(date),
      })
    }

    // Add days of current month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i)
      days.push({
        date,
        isCurrentMonth: true,
        isToday: isToday(date),
        isPast: isDateInPast(date),
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
        isPast: isDateInPast(date),
      })
    }

    return days
  }

  const calendarDays = generateCalendarDays()

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
      <div className="grid grid-cols-7 bg-[#141a24]">
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
          <button
            key={index}
            disabled={day.isPast}
            onClick={() => handleDateClick(day.date)}
            className={cn(
              "h-10 relative flex flex-col items-center justify-center text-sm transition-colors",
              !day.isCurrentMonth && "text-white/30 bg-[#0a0d12]",
              day.isCurrentMonth && "text-white",
              day.isPast && "text-white/30 cursor-not-allowed",
              day.isToday && "font-bold",
              isDateSelected(day.date) && "bg-pizza-orange/20 text-white",
              !day.isPast && day.isCurrentMonth && "hover:bg-pizza-orange/10",
              "focus:outline-none focus:ring-2 focus:ring-pizza-orange/50 focus:ring-inset",
            )}
          >
            {day.date.getDate()}
            {day.isToday && <div className="absolute bottom-1 w-1 h-1 rounded-full bg-pizza-orange"></div>}
          </button>
        ))}
      </div>
    </div>
  )
}

