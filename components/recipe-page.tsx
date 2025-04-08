"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronLeft, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

// Update the getRecipeImage function to use the new images
// Replace the existing getRecipeImage function with this:

const getRecipeImage = (recipeType: string, stepId: string) => {
  // For dough steps
  if (recipeType === "dough") {
    if (stepId === "1" || stepId === "2" || stepId === "3")
      return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/homemade-pizza-food-photography-recipe-idea.jpg-lcL048hSYQxzw4lOm673otr7ONW8s8.jpeg" // homemade-pizza-food-photography-recipe-idea.jpg
    if (stepId === "4" || stepId === "5")
      return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/top-view-fluffy-pizza-with-mushrooms.jpg-QWfalvqZ5hdqNmcY0k9ano5DN69zkn.jpeg" // top-view-fluffy-pizza-with-mushrooms.jpg
    if (stepId === "6" || stepId === "7")
      return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mixed-pizza-sausages-chicken-arugula-olives-cheese-pepper-top-view.jpg-rv7CVTUW049mp6Ht6fBkJBhFdWFzHI.jpeg" // mixed-pizza-sausages-chicken-arugula-olives-cheese-pepper-top-view.jpg
    if (stepId === "8" || stepId === "9" || stepId === "10")
      return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pizza-margarita-table.jpg-BPhVqWJtWoGWJcAPX3eFeOj6P4d3EV.jpeg" // pizza-margarita-table.jpg
  }

  // For toppings steps
  if (recipeType === "toppings") {
    if (stepId === "1")
      return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/homemade-pizza-food-photography-recipe-idea.jpg-lcL048hSYQxzw4lOm673otr7ONW8s8.jpeg" // homemade-pizza-food-photography-recipe-idea.jpg
    if (stepId === "2")
      return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/top-view-fluffy-pizza-with-mushrooms.jpg-QWfalvqZ5hdqNmcY0k9ano5DN69zkn.jpeg" // top-view-fluffy-pizza-with-mushrooms.jpg
    if (stepId === "3")
      return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pizza-margarita-table.jpg-BPhVqWJtWoGWJcAPX3eFeOj6P4d3EV.jpeg" // pizza-margarita-table.jpg
    if (stepId.includes("topping"))
      return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mixed-pizza-sausages-chicken-arugula-olives-cheese-pepper-top-view.jpg-rv7CVTUW049mp6Ht6fBkJBhFdWFzHI.jpeg" // mixed-pizza-sausages-chicken-arugula-olives-cheese-pepper-top-view.jpg
    if (stepId === "organize")
      return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/top-view-fluffy-pizza-with-mushrooms.jpg-QWfalvqZ5hdqNmcY0k9ano5DN69zkn.jpeg" // top-view-fluffy-pizza-with-mushrooms.jpg
  }

  // For cooking steps
  if (recipeType === "cooking") {
    if (stepId === "1")
      return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/baking-pizza-wood-fired-oven.jpg-u8O9MAiXoKys1uV2257tvifDFnCMhz.jpeg" // baking-pizza-wood-fired-oven.jpg
    if (stepId === "2")
      return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/homemade-pizza-food-photography-recipe-idea.jpg-lcL048hSYQxzw4lOm673otr7ONW8s8.jpeg" // homemade-pizza-food-photography-recipe-idea.jpg
    if (stepId === "3" || stepId === "4" || stepId === "5")
      return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/top-view-fluffy-pizza-with-mushrooms.jpg-QWfalvqZ5hdqNmcY0k9ano5DN69zkn.jpeg" // top-view-fluffy-pizza-with-mushrooms.jpg
    if (stepId === "6" || stepId === "7")
      return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mixed-pizza-sausages-chicken-arugula-olives-cheese-pepper-top-view.jpg-rv7CVTUW049mp6Ht6fBkJBhFdWFzHI.jpeg" // mixed-pizza-sausages-chicken-arugula-olives-cheese-pepper-top-view.jpg
    if (stepId === "8")
      return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/side-view-chef-baking-delicious-pizza.jpg-jpo4QqmEVGIhejh97qKhRZWc9OOMfi.jpeg" // side-view-chef-baking-delicious-pizza.jpg
    if (stepId === "9")
      return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/close-up-pizza.jpg-4oaf8cBN7m18R9Kq4ILzxAKfPHFW6j.jpeg" // close-up-pizza.jpg
    if (stepId === "10")
      return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pizza-margarita-table.jpg-BPhVqWJtWoGWJcAPX3eFeOj6P4d3EV.jpeg" // pizza-margarita-table.jpg
  }

  // Default image if no specific match
  return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/homemade-pizza-food-photography-recipe-idea.jpg-lcL048hSYQxzw4lOm673otr7ONW8s8.jpeg" // homemade-pizza-food-photography-recipe-idea.jpg as default
}

interface RecipeStep {
  id: string
  title: string
  description: string
  time?: string
  image?: string
}

interface RecipePageProps {
  recipeType: "dough" | "toppings" | "cooking"
  steps: RecipeStep[]
  returnUrl: string
  nextRecipeType?: "toppings" | "cooking" | null
}

export function RecipePage({ recipeType, steps, returnUrl, nextRecipeType }: RecipePageProps) {
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [recipeData, setRecipeData] = useState<any>(null)
  const [updatedSteps, setUpdatedSteps] = useState(steps)
  const [planId, setPlanId] = useState<string | null>(null)

  // Extract planId from returnUrl and load recipe data
  useEffect(() => {
    // Extract planId from returnUrl
    const planIdMatch = returnUrl.match(/\/plan\/([^/]+)/)
    const extractedPlanId = planIdMatch ? planIdMatch[1] : null
    setPlanId(extractedPlanId)

    if (extractedPlanId) {
      loadRecipeData(extractedPlanId)
    }
  }, [returnUrl])

  const loadRecipeData = (planId: string) => {
    // First try to get from URL
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)
      const recipeParam = urlParams.get("recipeId")

      if (recipeParam) {
        try {
          const decodedRecipe = JSON.parse(decodeURIComponent(recipeParam))
          setRecipeData(decodedRecipe)
          updateStepsWithRecipeData(decodedRecipe)

          // Save to localStorage to ensure persistence
          localStorage.setItem(`pizza-recipe-${planId}`, JSON.stringify(decodedRecipe))
          return
        } catch (e) {
          console.error("Failed to parse recipe data from URL:", e)
        }
      }
    }

    // Then try localStorage
    const savedRecipe = localStorage.getItem(`pizza-recipe-${planId}`)
    if (savedRecipe) {
      try {
        const parsedRecipe = JSON.parse(savedRecipe)
        setRecipeData(parsedRecipe)
        updateStepsWithRecipeData(parsedRecipe)
      } catch (e) {
        console.error("Failed to parse saved recipe data:", e)
      }
    }
  }

  // Update steps with calculated measurements
  const updateStepsWithRecipeData = (recipeData: any) => {
    if (!recipeData || !recipeData.recipe) return

    const newSteps = steps.map((step) => {
      if (recipeType === "dough" && step.id === "1") {
        // Update the first step with the calculated measurements
        const flour = recipeData.recipe.flour || 500
        const water = recipeData.recipe.water || 325
        const salt = recipeData.recipe.salt || 10
        const yeast = recipeData.recipe.yeast || 1
        const hydration = recipeData.recipe.hydration || 65

        return {
          ...step,
          description: `Measure out ${flour}g of flour, ${water}g of water (${hydration}% hydration), ${salt}g of salt, and ${yeast}g of yeast.`,
        }
      }
      return step
    })

    setUpdatedSteps(newSteps)
  }

  const toggleStep = (id: string) => {
    if (completedSteps.includes(id)) {
      setCompletedSteps(completedSteps.filter((stepId) => stepId !== id))
    } else {
      setCompletedSteps([...completedSteps, id])
    }
  }

  const allStepsCompleted = updatedSteps.length > 0 && completedSteps.length === updatedSteps.length

  const getRecipeTitle = () => {
    switch (recipeType) {
      case "dough":
        return "Dough Recipe"
      case "toppings":
        return "Toppings Recipe"
      case "cooking":
        return "Cooking Instructions"
    }
  }

  const getNextRecipeUrl = () => {
    if (!nextRecipeType || nextRecipeType === null || !planId) return ""

    const baseUrl = returnUrl.split("/plan/")[0]

    // Include the recipe data in the URL
    let url = `${baseUrl}/recipe/${nextRecipeType}?planId=${planId}`

    // Add toppings parameter if available
    const urlParams = new URLSearchParams(window.location.search)
    const toppingsParam = urlParams.get("toppings")
    if (toppingsParam) {
      url += `&toppings=${toppingsParam}`
    }

    // Add recipe data if available
    if (recipeData) {
      url += `&recipeId=${encodeURIComponent(JSON.stringify(recipeData))}`
    }

    return url
  }

  return (
    <div className="flex flex-col min-h-screen slate-bg pb-16">
      <header className="sticky top-0 dark-blue-bg border-b border-pizza-orange/20 z-10">
        <div className="container px-4 py-3 mx-auto max-w-md flex items-center">
          <Link href={returnUrl} className="mr-2">
            <ChevronLeft className="h-5 w-5 theme-text-primary" />
          </Link>
          <div className="flex items-center flex-1">
            <img src="/images/pizza-navigator-icon.png" alt="Pizza Navigator" className="h-6 w-6 mr-2" />
            <h1 className="text-lg font-semibold theme-text-primary">{getRecipeTitle()}</h1>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container px-4 py-6 mx-auto max-w-md space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold theme-text-primary">Step-by-Step Guide</h2>
            <div className="text-sm theme-text-secondary">
              {completedSteps.length}/{updatedSteps.length} completed
            </div>
          </div>

          <div className="space-y-4">
            {updatedSteps.map((step, index) => (
              <Card
                key={step.id}
                className={`theme-card-bg ${completedSteps.includes(step.id) ? "border-pizza-orange/50" : ""}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <Checkbox
                        id={`step-${step.id}`}
                        checked={completedSteps.includes(step.id)}
                        onCheckedChange={() => toggleStep(step.id)}
                        className="data-[state=checked]:bg-pizza-orange data-[state=checked]:text-white"
                      />
                    </div>
                    <div className="flex-1">
                      <label
                        htmlFor={`step-${step.id}`}
                        className={`flex flex-col cursor-pointer ${completedSteps.includes(step.id) ? "opacity-70" : ""}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium theme-text-primary">
                            {index + 1}. {step.title}
                          </span>
                          {step.time && (
                            <span className="text-xs flex items-center theme-text-secondary">
                              <Clock className="h-3 w-3 mr-1 text-pizza-orange" />
                              {step.time}
                            </span>
                          )}
                        </div>
                        <p
                          className={`text-sm mt-1 theme-text-secondary ${completedSteps.includes(step.id) ? "line-through" : ""}`}
                        >
                          {step.description}
                        </p>
                      </label>
                    </div>
                  </div>

                  {step.image && (
                    <div className="mt-3 rounded-md overflow-hidden">
                      <img
                        src={step.image || "/placeholder.svg"}
                        alt={step.title}
                        className="w-full h-40 object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg?height=160&width=320"
                        }}
                      />
                    </div>
                  )}
                  {!step.image && (
                    <div className="mt-3 rounded-md overflow-hidden">
                      <img
                        src={getRecipeImage(recipeType, step.id) || "/placeholder.svg"}
                        alt={step.title}
                        className="w-full h-40 object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg?height=160&width=320"
                        }}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-3 mt-8">
            {allStepsCompleted && nextRecipeType && nextRecipeType !== null && (
              <Link href={getNextRecipeUrl()} className="no-underline">
                <Button className="w-full bright-orange-btn mt-4">
                  Continue to {nextRecipeType === "toppings" ? "Toppings" : "Cooking"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}

            <Link href={returnUrl} className="no-underline">
              <Button
                variant="outline"
                className="w-full border-pizza-orange/50 theme-text-primary hover:bg-pizza-orange/20 mt-4"
              >
                Back to Pizza Plan
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

