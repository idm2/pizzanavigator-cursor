"use client"

import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface PizzaTypeProps {
  selectedType: string
  onSelectType: (type: string) => void
  onNext: () => void
}

export function PizzaTypeSelector({ selectedType, onSelectType, onNext }: PizzaTypeProps) {
  const pizzaTypes = [
    {
      id: "neapolitan",
      name: "Neapolitan",
      description: "Traditional Italian style with a soft, thin base",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/white-garlic.jpg-JvqjEtz10rtwwgbhFaAJdLJYF9vL5h.jpeg", // white-garlic.jpg - traditional round Neapolitan style
    },
    {
      id: "new-york",
      name: "New York",
      description: "Large, foldable slices with a crispy outer crust",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/spicy-sausage.jpg-XO7VZ41qQJEpDO6t7tcPRMq84tHzdI.jpeg", // spicy-sausage.jpg - classic round NY style
    },
    {
      id: "detroit",
      name: "Detroit",
      description: "Rectangular pizza with a thick, crispy, and chewy crust",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BBQ-Pulled-Pork-Detroit-Pizza.jpg-tTTecuMUReFrMNXEO0bzveLPjSH5WN.jpeg", // BBQ-Pulled-Pork-Detroit-Pizza.jpg - authentic Detroit style
    },
    {
      id: "sicilian",
      name: "Sicilian",
      description: "Thick, rectangular pizza with a fluffy, focaccia-like crust",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Veggie-Supreme-Detroit-Pizza.jpg-CfZE2Qnoa3OmYTN5owVED62BMwj1Gb.jpeg", // Veggie-Supreme-Detroit-Pizza.jpg - works for Sicilian style
    },
    {
      id: "chicago-deep-dish",
      name: "Chicago Deep-Dish",
      description: "Deep, pie-like crust filled with cheese and toppings",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Meat-Lovers-Delight-Detroit-Pizza.jpg-gt5g1B6Yr5zTKSvbuwXIdsUNTtrF9J.jpeg", // Meat-Lovers-Delight-Detroit-Pizza.jpg - deep pan style
    },
    {
      id: "grandma",
      name: "Grandma Pizza",
      description: "Thin, square pizza with a crisp base and light toppings",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Greek-Style-Detroit-Pizza.jpg-bofzc64Yga2hLpbvhucLCbi3W4rEuL.jpeg", // Greek-Style-Detroit-Pizza.jpg - works for Grandma style
    },
    {
      id: "roman",
      name: "Roman Style",
      description: "Rectangular pizza with a crisp yet airy crust",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/VeggieDelight.jpg-SvJCZUQufmd7Mexk88JKiEKbvv0hiv.jpeg", // VeggieDelight.jpg - works for Roman style
    },
    {
      id: "st-louis",
      name: "St. Louis Style",
      description: "Ultra-thin, cracker-like crust cut into squares",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/buffaloChicken.jpg-rjiAVy5V1BX1psoaAYmQfQv5Le0M3p.jpeg", // buffaloChicken.jpg - works for St. Louis style
    },
    {
      id: "california",
      name: "California",
      description: "Creative toppings on a thin, artisanal crust",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/spinach-feta.jpg-ejQRco9mgpPB6A4UOprv1yUnfWGr36.jpeg", // spinach-feta.jpg - creative California style
    },
    {
      id: "new-haven",
      name: "New Haven Style",
      description: "Thin, charred crust with minimal toppings",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BBQ-Chicken%20%281%29.jpg-pbcqV8ppF6VmQvSuOxhE4LJTXgbcRQ.jpeg", // BBQ-Chicken.jpg - works for New Haven style
    },
    {
      id: "thin-n-crispy",
      name: "Thin n Crispy",
      description: "Extra thin, crispy crust with a cracker-like texture",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/spicy-sausage.jpg-XO7VZ41qQJEpDO6t7tcPRMq84tHzdI.jpeg", // spicy-sausage.jpg - works for thin crust
    },
    {
      id: "trenton-tomato-pie",
      name: "Trenton Tomato Pie",
      description: "Thin crust with sauce on top of the cheese",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/VeggieDelight.jpg-SvJCZUQufmd7Mexk88JKiEKbvv0hiv.jpeg", // VeggieDelight.jpg - works for tomato pie
    },
  ]

  return (
    <div className="space-y-6 pb-20">
      <RadioGroup value={selectedType} onValueChange={onSelectType}>
        <div className="space-y-3">
          {pizzaTypes.map((type) => (
            <div key={type.id} className="relative">
              <RadioGroupItem value={type.id} id={type.id} className="peer sr-only" />
              <Label
                htmlFor={type.id}
                className="flex items-center gap-4 rounded-lg border border-pizza-orange/20 theme-card-bg p-4 hover:bg-gray-50 dark:hover:bg-[#1a202c]/70 hover:border-pizza-orange/30 peer-data-[state=checked]:border-pizza-orange peer-data-[state=checked]:bg-pizza-orange/20 transition-all cursor-pointer"
              >
                <img
                  src={type.image || "/placeholder.svg?height=64&width=64"}
                  alt={type.name}
                  className="h-16 w-16 rounded-md object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium theme-text-primary">{type.name}</h3>
                  <p className="text-sm theme-text-secondary">{type.description}</p>
                </div>
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>

      {/* Improved sticky button with drop shadow and no background */}
      <div className="fixed bottom-16 left-0 right-0 p-4 z-10">
        <div className="container mx-auto max-w-md">
          <Button
            onClick={onNext}
            disabled={!selectedType}
            className="w-full bright-orange-btn shadow-[0_-8px_30px_rgb(255,85,0,0.2)] hover:shadow-[0_-8px_20px_rgb(255,85,0,0.4)] transition-all"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}

