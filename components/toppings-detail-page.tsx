"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronLeft, ChevronRight, Clock } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { 
  getAllToppingRecipes, 
  getToppingRecipeByName, 
  ToppingRecipe, 
  ToppingIngredient, 
  ToppingMethod, 
  removeDuplicateToppings 
} from "@/utils/toppings-utils"

// Extended ToppingMethod interface with optional time property
interface ExtendedToppingMethod extends ToppingMethod {
  time?: string;
}

export function ToppingsDetailPage() {
  const searchParams = useSearchParams()
  const planId = searchParams.get("planId") || "default"
  const toppingsParam = searchParams.get("toppings") || ""

  // Parse toppings from URL parameter and remove duplicates
  const allToppingsWithDuplicates = toppingsParam ? toppingsParam.split(",") : []
  // Use Set to remove duplicates and convert back to array
  const allToppings = removeDuplicateToppings(allToppingsWithDuplicates)

  const [currentToppingIndex, setCurrentToppingIndex] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<Record<string, number[]>>({})
  const [toppingRecipes, setToppingRecipes] = useState<ToppingRecipe[]>([])
  const [isInitialized, setIsInitialized] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Load topping recipes from the data file
  useEffect(() => {
    if (!isInitialized && allToppings.length > 0) {
      const recipes: ToppingRecipe[] = []
      
      allToppings.forEach(toppingName => {
        const recipe = getToppingRecipeByName(toppingName)
        if (recipe) {
          recipes.push(recipe)
        } else {
          // Fallback for toppings not in our database
          const aiRecipe = generateAIToppingRecipe(toppingName)
          recipes.push(aiRecipe)
        }
      })

      setToppingRecipes(recipes)

      // Initialize completed steps for each topping
      const initialCompletedSteps: Record<string, number[]> = {}
      recipes.forEach((recipe) => {
        initialCompletedSteps[recipe.id] = []
      })
      setCompletedSteps(initialCompletedSteps)
      setIsInitialized(true)
    }
  }, [isInitialized, allToppings]) // Run when not initialized or toppings change

  const currentTopping = toppingRecipes.length > 0 ? toppingRecipes[currentToppingIndex] : null

  const toggleStep = (toppingId: string, stepIndex: number) => {
    setCompletedSteps((prev) => {
      const toppingSteps = [...(prev[toppingId] || [])]

      if (toppingSteps.includes(stepIndex)) {
        return {
          ...prev,
          [toppingId]: toppingSteps.filter((idx) => idx !== stepIndex),
        }
      } else {
        return {
          ...prev,
          [toppingId]: [...toppingSteps, stepIndex],
        }
      }
    })
  }

  const navigateToTopping = (index: number) => {
    if (index >= 0 && index < toppingRecipes.length) {
      setCurrentToppingIndex(index)

      // Scroll to the selected tab
      if (scrollRef.current) {
        const tabElements = scrollRef.current.querySelectorAll(".topping-tab")
        if (tabElements[index]) {
          tabElements[index].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
        }
      }
    }
  }

  const nextTopping = () => {
    navigateToTopping(currentToppingIndex + 1)
  }

  const prevTopping = () => {
    navigateToTopping(currentToppingIndex - 1)
  }

  // If still loading or no toppings, show loading state
  if (!isInitialized || !currentTopping) {
    return (
      <div className="flex flex-col min-h-screen slate-bg pb-16 items-center justify-center">
        <div className="text-white">Loading topping recipes...</div>
      </div>
    )
  }

  const completedStepsCount = completedSteps[currentTopping.id]?.length || 0
  const totalStepsCount = currentTopping.method.length

  return (
    <div className="flex flex-col min-h-screen slate-bg pb-16">
      <header className="sticky top-0 dark-blue-bg border-b border-pizza-orange/20 z-10">
        <div className="container px-4 py-3 mx-auto max-w-md flex items-center">
          <Link href={`/plan/${planId}`} className="mr-2">
            <ChevronLeft className="h-5 w-5 theme-text-primary" />
          </Link>
          <div className="flex items-center flex-1">
            <img src="/images/pizza-navigator-icon.png" alt="Pizza Navigator" className="h-6 w-6 mr-2" />
            <h1 className="text-lg font-semibold theme-text-primary">Toppings Recipe</h1>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container px-4 py-6 mx-auto max-w-md space-y-6">
          {/* Topping Tabs Carousel */}
          <div className="relative">
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center"
              style={{ display: currentToppingIndex === 0 ? "none" : "flex" }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={prevTopping}
                className="h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>

            <div
              ref={scrollRef}
              className="flex overflow-x-auto pb-2 hide-scrollbar px-5"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {toppingRecipes.map((topping, index) => (
                <div
                  key={topping.id}
                  onClick={() => navigateToTopping(index)}
                  className={`topping-tab flex-shrink-0 mx-1 px-4 py-2 rounded-md cursor-pointer transition-all ${
                    index === currentToppingIndex
                      ? "bg-pizza-orange text-white"
                      : "bg-[#1a202c]/50 text-white/70 hover:bg-[#1a202c]/70"
                  }`}
                >
                  {topping.name}
                </div>
              ))}
            </div>

            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center"
              style={{ display: currentToppingIndex === toppingRecipes.length - 1 ? "none" : "flex" }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={nextTopping}
                className="h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="w-full bg-[#1a202c]/50 h-1 rounded-full">
            <div
              className="bg-pizza-orange h-1 rounded-full transition-all duration-300"
              style={{
                width: `${((currentToppingIndex + 1) / toppingRecipes.length) * 100}%`,
              }}
            ></div>
          </div>

          {/* Topping Ingredients */}
          <Card className="theme-card-bg">
            <CardContent className="p-4">
              <h3 className="font-medium mb-3 theme-text-primary text-xl">Topping Ingredients</h3>
              <div className="space-y-2">
                {currentTopping.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="theme-text-primary">{ingredient.name}</span>
                    <span className="font-medium theme-text-primary">
                      {ingredient.amount && `${ingredient.amount} ${ingredient.unit || ''}`}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Step-by-Step Guide */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold theme-text-primary">Step-by-Step Guide</h2>
              <div className="text-sm theme-text-secondary">
                {completedStepsCount}/{totalStepsCount} completed
              </div>
            </div>

            <div className="space-y-4">
              {currentTopping.method.map((step, index) => (
                <Card
                  key={index}
                  className={`theme-card-bg ${
                    completedSteps[currentTopping.id]?.includes(index) ? "border-pizza-orange/50" : ""
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <Checkbox
                          id={`step-${currentTopping.id}-${index}`}
                          checked={completedSteps[currentTopping.id]?.includes(index) || false}
                          onCheckedChange={() => toggleStep(currentTopping.id, index)}
                          className="data-[state=checked]:bg-pizza-orange data-[state=checked]:text-white"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-white">Step {index + 1}</span>
                          </div>
                        <p className="text-sm text-white/70">{step}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Link href={`/plan/${planId}`} className="no-underline">
            <Button
              variant="outline"
              className="w-full border-pizza-orange/50 theme-text-primary hover:bg-pizza-orange/20 mt-4"
            >
              Back to Pizza Plan
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

// Fallback function for toppings not found in the database
function generateAIToppingRecipe(toppingName: string): ToppingRecipe {
  // Create a unique ID from the name
  const id = toppingName.toLowerCase().replace(/\s+/g, "-");

  return {
    id,
    name: toppingName,
    tags: ["AI"],
    ingredients: [
      { name: "tomato sauce", amount: "1/2", unit: "cup" },
      { name: "shredded mozzarella", amount: "1 1/2", unit: "cups" },
      { name: "olive oil", amount: "1", unit: "tbsp" },
      { name: "salt and pepper", amount: "to taste", unit: "" }
    ],
    method: [
      "Spread tomato sauce evenly on the pizza base.",
      "Sprinkle mozzarella cheese over the sauce.",
      "Drizzle with olive oil before baking."
    ]
  };
}

