"use client"

import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Clock, CalendarDays, Calendar } from "lucide-react"

interface PizzaTimingSelectorProps {
  selectedTiming: string
  onSelectTiming: (timing: string) => void
  onNext: () => void
}

export function PizzaTimingSelector({ selectedTiming, onSelectTiming, onNext }: PizzaTimingSelectorProps) {
  const timingOptions = [
    {
      id: "same-day",
      name: "Same Day",
      description: "Quick preparation, ready in a few hours",
      icon: Clock,
      detail: "4-6 hours total preparation time",
    },
    {
      id: "next-day",
      name: "Next Day",
      description: "Overnight fermentation for better flavor",
      icon: CalendarDays,
      detail: "24 hours total preparation time",
    },
    {
      id: "two-days",
      name: "In Two Days",
      description: "Professional-level fermentation for best results",
      icon: Calendar,
      detail: "48 hours total preparation time",
    },
  ]

  return (
    <div className="space-y-6 pb-20">
      <div className="text-center mb-4">
        <h3 className="text-lg font-medium text-white">When do you want your pizza?</h3>
        <p className="text-sm text-white/70">Longer fermentation times create better flavor and texture</p>
      </div>

      <RadioGroup value={selectedTiming} onValueChange={onSelectTiming} className="space-y-3">
        {timingOptions.map((option) => (
          <div key={option.id} className="relative">
            <RadioGroupItem value={option.id} id={option.id} className="peer sr-only" />
            <Label
              htmlFor={option.id}
              className="flex items-center gap-4 rounded-lg border border-pizza-orange/20 theme-card-bg p-4 hover:bg-gray-50 dark:hover:bg-[#1a202c]/70 hover:border-pizza-orange/30 peer-data-[state=checked]:border-pizza-orange peer-data-[state=checked]:bg-pizza-orange/20 transition-all cursor-pointer"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-[#1a202c]/70 peer-data-[state=checked]:bg-pizza-orange/10">
                <option.icon className="h-6 w-6 text-pizza-orange" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-white">{option.name}</h3>
                <p className="text-sm text-white/70">{option.description}</p>
                <p className="text-xs text-pizza-orange mt-1">{option.detail}</p>
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>

      {/* Sticky Continue Button */}
      <div className="fixed bottom-16 left-0 right-0 p-4 z-10">
        <div className="container mx-auto max-w-md">
          <Button
            onClick={onNext}
            disabled={!selectedTiming}
            className="w-full bright-orange-btn shadow-[0_-8px_30px_rgb(255,85,0,0.2)] hover:shadow-[0_-8px_20px_rgb(255,85,0,0.4)] transition-all"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}

