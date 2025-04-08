"use client"

import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ChefHat, ShoppingBag } from "lucide-react"

interface PizzaComponentsSelectorProps {
  selectedDoughOption: string
  onSelectDoughOption: (option: string) => void
  selectedToppingsOption: string
  onSelectToppingsOption: (option: string) => void
  onNext: () => void
}

export function PizzaComponentsSelector({
  selectedDoughOption,
  onSelectDoughOption,
  selectedToppingsOption,
  onSelectToppingsOption,
  onNext,
}: PizzaComponentsSelectorProps) {
  const doughOptions = [
    {
      id: "make-dough",
      name: "Make my own dough",
      description: "I want to make pizza dough from scratch",
      icon: ChefHat,
    },
    {
      id: "store-bought",
      name: "Use my own dough",
      description: "I already have dough or will buy it",
      icon: ShoppingBag,
    },
  ]

  const toppingsOptions = [
    {
      id: "app-toppings",
      name: "Choose toppings from app",
      description: "I want to select toppings from the app's suggestions",
      icon: ChefHat,
    },
    {
      id: "own-toppings",
      name: "Use my own toppings",
      description: "I have my own toppings in mind",
      icon: ShoppingBag,
    },
  ]

  return (
    <div className="space-y-6 pb-20">
      <div className="text-center mb-4">
        <h3 className="text-lg font-medium text-white">What would you like to make?</h3>
        <p className="text-sm text-white/70">Choose which components you want to prepare</p>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-white">Dough</h4>
        <RadioGroup value={selectedDoughOption} onValueChange={onSelectDoughOption} className="space-y-3">
          {doughOptions.map((option) => (
            <div key={option.id} className="relative">
              <RadioGroupItem value={option.id} id={`dough-${option.id}`} className="peer sr-only" />
              <Label
                htmlFor={`dough-${option.id}`}
                className="flex items-center gap-4 rounded-lg border border-pizza-orange/20 theme-card-bg p-4 hover:bg-gray-50 dark:hover:bg-[#1a202c]/70 hover:border-pizza-orange/30 peer-data-[state=checked]:border-pizza-orange peer-data-[state=checked]:bg-pizza-orange/20 transition-all cursor-pointer"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-[#1a202c]/70 peer-data-[state=checked]:bg-pizza-orange/10">
                  <option.icon className="h-6 w-6 text-pizza-orange" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-white">{option.name}</h3>
                  <p className="text-sm text-white/70">{option.description}</p>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-white">Toppings</h4>
        <RadioGroup value={selectedToppingsOption} onValueChange={onSelectToppingsOption} className="space-y-3">
          {toppingsOptions.map((option) => (
            <div key={option.id} className="relative">
              <RadioGroupItem value={option.id} id={`toppings-${option.id}`} className="peer sr-only" />
              <Label
                htmlFor={`toppings-${option.id}`}
                className="flex items-center gap-4 rounded-lg border border-pizza-orange/20 theme-card-bg p-4 hover:bg-gray-50 dark:hover:bg-[#1a202c]/70 hover:border-pizza-orange/30 peer-data-[state=checked]:border-pizza-orange peer-data-[state=checked]:bg-pizza-orange/20 transition-all cursor-pointer"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-[#1a202c]/70 peer-data-[state=checked]:bg-pizza-orange/10">
                  <option.icon className="h-6 w-6 text-pizza-orange" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-white">{option.name}</h3>
                  <p className="text-sm text-white/70">{option.description}</p>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Sticky Continue Button */}
      <div className="fixed bottom-16 left-0 right-0 p-4 z-10">
        <div className="container mx-auto max-w-md">
          <Button
            onClick={onNext}
            disabled={!selectedDoughOption || !selectedToppingsOption}
            className="w-full bright-orange-btn shadow-[0_-8px_30px_rgb(255,85,0,0.2)] hover:shadow-[0_-8px_20px_rgb(255,85,0,0.4)] transition-all"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}

