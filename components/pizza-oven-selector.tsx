"use client"

import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface PizzaOvenSelectorProps {
  selectedOven: string
  onSelectOven: (oven: string) => void
  onNext: () => void
}

export function PizzaOvenSelector({ selectedOven, onSelectOven, onNext }: PizzaOvenSelectorProps) {
  const ovenOptions = [
    {
      id: "conventional",
      name: "Conventional Oven",
      description: "Standard home oven",
      maxTemp: "250°C / 480°F",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/close-up-person-cooking.jpg-MQ00dpwUUHTzPms5htnDpbHGUSVR84.jpeg",
    },
    {
      id: "pizza-stone",
      name: "Conventional with Pizza Stone",
      description: "Home oven with a pizza stone",
      maxTemp: "250°C / 480°F",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/homemade-pizza-food-photography-recipe-idea.jpg-Jr1kjMyPuuBHUApFdieq8YEimY7viI.jpeg",
    },
    {
      id: "pizza-oven",
      name: "Pizza Oven",
      description: "Dedicated pizza oven",
      maxTemp: "450°C+ / 850°F+",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/delicious-vegan-pizza-social-post.jpg-9Ps1rliUTCZbRwlxPBJDZPgYEjiH36.jpeg",
    },
  ]

  return (
    <div className="space-y-6 pb-20">
      <div className="text-center mb-4">
        <h3 className="text-lg font-medium text-white">What will you use to cook?</h3>
        <p className="text-sm text-white/70">We'll adjust cooking instructions based on your equipment</p>
      </div>

      <RadioGroup value={selectedOven} onValueChange={onSelectOven} className="space-y-3">
        {ovenOptions.map((option) => (
          <div key={option.id} className="relative">
            <RadioGroupItem value={option.id} id={option.id} className="peer sr-only" />
            <Label
              htmlFor={option.id}
              className="flex items-center gap-4 rounded-lg border border-pizza-orange/20 theme-card-bg p-4 hover:bg-gray-50 dark:hover:bg-[#1a202c]/70 hover:border-pizza-orange/30 peer-data-[state=checked]:border-pizza-orange peer-data-[state=checked]:bg-pizza-orange/20 transition-all cursor-pointer"
            >
              <img
                src={option.image || "/placeholder.svg"}
                alt={option.name}
                className="h-14 w-14 object-cover rounded-full"
              />
              <div className="flex-1">
                <h3 className="font-medium text-white">{option.name}</h3>
                <p className="text-sm text-white/70">{option.description}</p>
                <p className="text-xs text-pizza-orange mt-1">Max temp: {option.maxTemp}</p>
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
            disabled={!selectedOven}
            className="w-full bright-orange-btn shadow-[0_-8px_30px_rgb(255,85,0,0.2)] hover:shadow-[0_-8px_20px_rgb(255,85,0,0.4)] transition-all"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}

