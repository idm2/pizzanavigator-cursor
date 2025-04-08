"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Clock, ChevronRight, Check, Trash2, ChevronLeft, CalendarDays } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { generatePizzaPlanRecipe } from "@/utils/pizza-plan-utils"
import { AddToMealPlannerDialog } from "@/components/add-to-meal-planner-dialog"

// Add this function at the top of the component, right after the imports
const getPizzaImage = (pizzaType: string) => {
  switch (pizzaType) {
    case "neapolitan":
      return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/white-garlic.jpg-JvqjEtz10rtwwgbhFaAJdLJYF9vL5h.jpeg" // white-garlic.jpg
    case "new-york":
      return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/spicy-sausage.jpg-XO7VZ41qQJEpDO6t7tcPRMq84tHzdI.jpeg" // spicy-sausage.jpg
    case "detroit":
      return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BBQ-Pulled-Pork-Detroit-Pizza.jpg-tTTecuMUReFrMNXEO0bzveLPjSH5WN.jpeg" // BBQ-Pulled-Pork-Detroit-Pizza.jpg
    case "sicilian":
      return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Veggie-Supreme-Detroit-Pizza.jpg-CfZE2Qnoa3OmYTN5owVED62BMwj1Gb.jpeg" // Veggie-Supreme-Detroit-Pizza.jpg
    case "chicago-deep-dish":
      return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Meat-Lovers-Delight-Detroit-Pizza.jpg-gt5g1B6Yr5zTKSvbuwXIdsUNTtrF9J.jpeg" // Meat-Lovers-Delight-Detroit-Pizza.jpg
    case "grandma":
      return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Greek-Style-Detroit-Pizza.jpg-bofzc64Yga2hLpbvhucLCbi3W4rEuL.jpeg" // Greek-Style-Detroit-Pizza.jpg
    case "california":
      return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/spinach-feta.jpg-ejQRco9mgpPB6A4UOprv1yUnfWGr36.jpeg" // spinach-feta.jpg
    case "st-louis":
      return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/buffaloChicken.jpg-rjiAVy5V1BX1psoaAYmQfQv5Le0M3p.jpeg" // buffaloChicken.jpg
    case "roman":
      return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/VeggieDelight.jpg-SvJCZUQufmd7Mexk88JKiEKbvv0hiv.jpeg" // VeggieDelight.jpg
    case "new-haven":
      return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BBQ-Chicken%20%281%29.jpg-pbcqV8ppF6VmQvSuOxhE4LJTXgbcRQ.jpeg" // BBQ-Chicken.jpg
    default:
      return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/VeggieDelight.jpg-SvJCZUQufmd7Mexk88JKiEKbvv0hiv.jpeg" // VeggieDelight.jpg
  }
}

interface PlanDetailProps {
  planId: string
}

export function PlanDetail({ planId }: PlanDetailProps) {
  const router = useRouter()
  const [reminderSet, setReminderSet] = useState(false)
  const [isAddToMealPlannerOpen, setIsAddToMealPlannerOpen] = useState(false)
  const [calculatedRecipe, setCalculatedRecipe] = useState<any>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  // In a real app, this would fetch the plan details from an API or local storage
  const planDetails = {
    id: planId,
    title: planId
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
    date: "Created 2 days ago",
    pizzaType: planId.split("-")[0] || "neapolitan",
    pizzaSize: planId.split("-")[1] || "medium",
    quantity: planId.includes("2-pizzas") ? 2 : 1,
    timing: planId.includes("next-day") ? "next-day" : planId.includes("two-days") ? "two-days" : "same-day",
    oven: planId.includes("pizza-stone")
      ? "pizza-stone"
      : planId.includes("pizza-oven")
        ? "pizza-oven"
        : "conventional",
    toppings: ["Mozzarella", "Basil", "San Marzano Tomatoes"],
    doughOption: "make-dough", // Default value
    toppingsOption: "app-toppings", // Default value
  }

  // Load recipe data when component mounts
  useEffect(() => {
    // Try to load from localStorage first
    const storageKey = `pizza-recipe-${planId}`
    const savedRecipe = localStorage.getItem(storageKey)

    if (savedRecipe) {
      try {
        const parsedRecipe = JSON.parse(savedRecipe)
        setCalculatedRecipe(parsedRecipe)
        setIsInitialized(true)
      } catch (e) {
        console.error("Failed to parse saved recipe:", e)
        calculateNewRecipe()
      }
    } else {
      calculateNewRecipe()
    }
  }, [planId])

  // Calculate a new recipe based on plan details
  const calculateNewRecipe = () => {
    // Extract size information
    let diameter = null
    if (planDetails.pizzaSize === "small") {
      diameter = 10
    } else if (planDetails.pizzaSize === "medium") {
      diameter = 12
    } else if (planDetails.pizzaSize === "large") {
      diameter = 16
    } else if (planDetails.pizzaSize.includes("circle")) {
      // Try to extract from string like "circle-14-inches" or "circle 14"
      const sizeMatch = planDetails.pizzaSize.match(/(\d+)/)
      if (sizeMatch) {
        diameter = Number.parseInt(sizeMatch[1], 10)
      } else {
        diameter = 14 // Default if we can't extract
      }
    }

    // Generate recipe
    const recipe = generatePizzaPlanRecipe(
      planDetails.pizzaType,
      diameter ? `${diameter}-inch` : planDetails.pizzaSize,
      planDetails.quantity,
      planDetails.timing,
      planDetails.oven,
      planDetails.doughOption,
      planDetails.toppingsOption,
    )

    setCalculatedRecipe(recipe)
    setIsInitialized(true)

    // Save to localStorage for persistence
    const storageKey = `pizza-recipe-${planId}`
    localStorage.setItem(storageKey, JSON.stringify(recipe))
  }

  const handleSetReminder = () => {
    setReminderSet(true)
  }

  const handleDeletePlan = () => {
    // In a real app, this would delete the plan from storage
    localStorage.removeItem(`pizza-recipe-${planId}`)
    router.push("/")
  }

  const formatPizzaType = (type: string) => {
    switch (type) {
      case "neapolitan":
        return "Neapolitan"
      case "new-york":
        return "New York"
      case "detroit":
        return "Pan-Based Pizza"
      case "sicilian":
        return "Sicilian"
      case "grandma":
        return "Grandma"
      default:
        return type.charAt(0).toUpperCase() + type.slice(1).replace(/-/g, " ")
    }
  }

  const formatPizzaSize = (size: string) => {
    switch (size) {
      case "small":
        return 'Small (8-10")'
      case "medium":
        return 'Medium (12")'
      case "large":
        return 'Large (14-16")'
      default:
        if (size.includes("circle")) {
          const sizeMatch = size.match(/(\d+)/)
          if (sizeMatch) {
            return `${sizeMatch[1]}" Circle`
          }
        }
        return size.replace(/-/g, " ").replace(/inch/g, '"')
    }
  }

  const formatTiming = (time: string) => {
    switch (time) {
      case "same-day":
        return "Same Day (4-6 hours)"
      case "next-day":
        return "Next Day (24 hours)"
      case "two-days":
        return "Two Days (48 hours)"
      default:
        return time
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
    }
  }

  const formatOven = (ovenType: string) => {
    switch (ovenType) {
      case "conventional":
        return "Conventional Oven"
      case "pizza-stone":
        return "Conventional with Pizza Stone"
      case "pizza-oven":
        return "Pizza Oven"
      default:
        return ovenType
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
    }
  }

  // Add a function to format toppings for URL
  const getToppingsParam = () => {
    return planDetails.toppings.join(",")
  }

  // Update the links to recipe pages to include recipe data
  const getRecipeUrl = (recipeType: string) => {
    // Only include recipe data if it's been initialized
    const recipeData = isInitialized && calculatedRecipe ? encodeURIComponent(JSON.stringify(calculatedRecipe)) : ""

    return `/recipe/${recipeType}?planId=${planId}&toppings=${getToppingsParam()}${recipeData ? `&recipeId=${recipeData}` : ""}`
  }

  // If recipe data is still loading, show a loading state
  if (!isInitialized) {
    return (
      <div className="flex flex-col min-h-screen slate-bg pb-16 items-center justify-center">
        <div className="text-white">Loading recipe data...</div>
      </div>
    )
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
            <h1 className="text-lg font-semibold theme-text-primary">{planDetails.title}</h1>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-100/10">
                <Trash2 className="h-5 w-5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="theme-card-bg">
              <AlertDialogHeader>
                <AlertDialogTitle className="theme-text-primary">Delete Pizza Plan</AlertDialogTitle>
                <AlertDialogDescription className="theme-text-secondary">
                  Are you sure you want to delete this pizza plan? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="theme-text-primary border-pizza-orange/30 hover:bg-pizza-orange/10">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={handleDeletePlan} className="bg-red-500 text-white hover:bg-red-600">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </header>

      <main className="flex-1">
        <div className="container px-4 py-6 mx-auto max-w-md space-y-6">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold theme-text-primary">{planDetails.title}</h2>
            <p className="text-sm theme-text-secondary">{planDetails.date}</p>
          </div>

          <Card className="theme-card-bg">
            <CardContent className="p-4">
              <h3 className="font-medium mb-3 theme-text-primary">Pizza Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="theme-text-secondary">Type:</span>
                  <span className="font-medium theme-text-primary">{formatPizzaType(planDetails.pizzaType)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="theme-text-secondary">Size:</span>
                  <span className="font-medium theme-text-primary">{formatPizzaSize(planDetails.pizzaSize)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="theme-text-secondary">Quantity:</span>
                  <span className="font-medium theme-text-primary">
                    {planDetails.quantity} {planDetails.quantity === 1 ? "pizza" : "pizzas"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="theme-text-secondary">Timing:</span>
                  <span className="font-medium theme-text-primary">{formatTiming(planDetails.timing)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="theme-text-secondary">Oven:</span>
                  <span className="font-medium theme-text-primary">{formatOven(planDetails.oven)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="theme-card-bg">
            <CardContent className="p-4">
              <h3 className="font-medium mb-3 theme-text-primary">Toppings</h3>
              {planDetails.toppings.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {planDetails.toppings.map((topping, index) => (
                    <div key={index} className="bg-pizza-orange/20 rounded-full px-3 py-1 text-sm text-pizza-orange">
                      {topping}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm theme-text-secondary">No toppings selected</p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-[#3c2a1f] dark:bg-[#3c2a1f] border-pizza-orange/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-pizza-orange mr-2" />
                  <div>
                    <h3 className="font-medium text-white">Set Preparation Reminders</h3>
                    <p className="text-xs text-white/70">We'll remind you when it's time for each step</p>
                  </div>
                </div>
                <Button
                  variant={reminderSet ? "outline" : "default"}
                  size="sm"
                  onClick={handleSetReminder}
                  className={reminderSet ? "bg-[#1a202c] border-pizza-orange text-white" : "bright-orange-btn"}
                >
                  {reminderSet ? (
                    <span className="flex items-center">
                      <Check className="h-4 w-4 mr-1" />
                      Set
                    </span>
                  ) : (
                    "Set Reminder"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="dough" className="text-white">
            <TabsList className="grid grid-cols-3 bg-[#1a202c]/50 dark:bg-[#1a202c]/50 light:bg-gray-100">
              <TabsTrigger
                value="dough"
                className="data-[state=active]:bg-pizza-orange data-[state=active]:text-white theme-text-primary"
              >
                Dough
              </TabsTrigger>
              <TabsTrigger
                value="toppings"
                className="data-[state=active]:bg-pizza-orange data-[state=active]:text-white theme-text-primary"
              >
                Toppings
              </TabsTrigger>
              <TabsTrigger
                value="cooking"
                className="data-[state=active]:bg-pizza-orange data-[state=active]:text-white theme-text-primary"
              >
                Cooking
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dough" className="space-y-4 mt-4">
              {planDetails.doughOption === "make-dough" ? (
                <>
                  <div className="theme-card-bg rounded-lg p-4 shadow-sm border border-pizza-orange/20">
                    <h3 className="font-medium mb-2 theme-text-primary">Dough Ingredients</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span className="theme-text-secondary">Flour (00 or bread flour)</span>
                        <span className="font-medium theme-text-primary">{calculatedRecipe?.recipe?.flour || 0}g</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="theme-text-secondary">Water</span>
                        <span className="font-medium theme-text-primary">{calculatedRecipe?.recipe?.water || 0}g</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="theme-text-secondary">Salt</span>
                        <span className="font-medium theme-text-primary">{calculatedRecipe?.recipe?.salt || 0}g</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="theme-text-secondary">Yeast</span>
                        <span className="font-medium theme-text-primary">{calculatedRecipe?.recipe?.yeast || 0}g</span>
                      </li>
                      {calculatedRecipe?.recipe?.sugar > 0 && (
                        <li className="flex justify-between">
                          <span className="theme-text-secondary">Sugar</span>
                          <span className="font-medium theme-text-primary">
                            {calculatedRecipe?.recipe?.sugar || 0}g
                          </span>
                        </li>
                      )}
                      {calculatedRecipe?.recipe?.oil > 0 && (
                        <li className="flex justify-between">
                          <span className="theme-text-secondary">Oil</span>
                          <span className="font-medium theme-text-primary">{calculatedRecipe?.recipe?.oil || 0}g</span>
                        </li>
                      )}
                    </ul>
                  </div>

                  <Link href={getRecipeUrl("dough")} className="no-underline">
                    <Button className="w-full btn-accent-action mt-4">
                      Start Cooking
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </>
              ) : (
                <div className="theme-card-bg rounded-lg p-4 shadow-sm border border-pizza-orange/20">
                  <h3 className="font-medium mb-2 theme-text-primary">My Own Dough</h3>
                  <p className="text-sm theme-text-secondary">
                    You've chosen to use my own dough for this recipe.
                  </p>
                  <div className="mt-3 space-y-2 text-sm">
                    <h4 className="font-medium theme-text-primary">Tips for my own dough:</h4>
                    <ul className="list-disc pl-5 theme-text-secondary">
                      <li>Let refrigerated dough come to room temperature (1-2 hours) before using</li>
                      <li>Dust with flour to prevent sticking</li>
                      <li>For best results, use within the expiration date</li>
                      <li>Look for dough specifically made for pizza for best results</li>
                    </ul>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="toppings" className="space-y-4 mt-4">
              {planDetails.toppingsOption === "app-toppings" ? (
                <>
                  <div className="theme-card-bg rounded-lg p-4 shadow-sm border border-pizza-orange/20">
                    <h3 className="font-medium mb-2 theme-text-primary">Sauce</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span className="theme-text-secondary">San Marzano tomatoes</span>
                        <span className="font-medium theme-text-primary">400g</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="theme-text-secondary">Salt</span>
                        <span className="font-medium theme-text-primary">5g</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="theme-text-secondary">Fresh basil</span>
                        <span className="font-medium theme-text-primary">A few leaves</span>
                      </li>
                    </ul>
                  </div>

                  <div className="theme-card-bg rounded-lg p-4 shadow-sm border border-pizza-orange/20">
                    <h3 className="font-medium mb-2 theme-text-primary">Cheese & Toppings</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span className="theme-text-secondary">Fresh mozzarella</span>
                        <span className="font-medium theme-text-primary">200g</span>
                      </li>
                      {planDetails.toppings.map((topping, index) => {
                        // Check if this is an AI-generated topping (contains specific keywords)
                        const isAITopping =
                          topping.includes("Classic") ||
                          topping.includes("Supreme") ||
                          topping.includes("Mediterranean") ||
                          topping.includes("Rustic") ||
                          topping.includes("Sweet & Savory") ||
                          topping.includes("Spicy")

                        // If it's an AI topping, display it differently
                        if (isAITopping) {
                          return (
                            <li key={index} className="flex justify-between">
                              <span className="theme-text-secondary">{topping} (AI Topping)</span>
                              <span className="font-medium theme-text-primary">As needed</span>
                            </li>
                          )
                        }

                        // Otherwise display as a regular topping
                        return (
                          <li key={index} className="flex justify-between">
                            <span className="theme-text-secondary">{topping}</span>
                            <span className="font-medium theme-text-primary">As needed</span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>

                  <Link
                    href={`/recipe/toppings-detail?planId=${planId}&toppings=${getToppingsParam()}&recipeId=${encodeURIComponent(JSON.stringify(calculatedRecipe))}`}
                    className="no-underline"
                  >
                    <Button className="w-full btn-accent-action mt-4">
                      Start Cooking
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </>
              ) : (
                <div className="theme-card-bg rounded-lg p-4 shadow-sm border border-pizza-orange/20">
                  <h3 className="font-medium mb-2 theme-text-primary">Your Own Toppings</h3>
                  <p className="text-sm theme-text-secondary">
                    You've chosen to use your own toppings for this recipe.
                  </p>
                  <div className="mt-3 space-y-2 text-sm">
                    <h4 className="font-medium theme-text-primary">Tips for toppings:</h4>
                    <ul className="list-disc pl-5 theme-text-secondary">
                      <li>Less is more - don't overload your pizza</li>
                      <li>Pre-cook vegetables that release a lot of moisture</li>
                      <li>Slice toppings thinly for even cooking</li>
                      <li>For best results, use fresh, high-quality ingredients</li>
                    </ul>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="cooking" className="space-y-4 mt-4">
              <div className="theme-card-bg rounded-lg p-4 shadow-sm border border-pizza-orange/20">
                <h3 className="font-medium mb-2 theme-text-primary">Cooking Instructions</h3>
                <ol className="space-y-2 text-sm list-decimal pl-4 theme-text-secondary">
                  <li>
                    {"Preheat your "}{formatOven(planDetails.oven)}{" to the "}{planDetails.oven === "pizza-oven" ? 
                    "proper temperature (400-460°C/750-860°F for pizza ovens)" : 
                    "highest temperature (usually 250°C/480°F for home ovens)"}
                  </li>
                  <li>
                    {planDetails.oven === "pizza-stone" ? 
                    "Place your pizza stone in the oven and let it heat thoroughly" : 
                    planDetails.oven === "pizza-oven" ? 
                    "Let the pizza oven heat thoroughly" : 
                    "Place your pizza stone in the oven if using one"}
                  </li>
                  <li>Stretch your dough to desired size</li>
                  <li>Add sauce and toppings</li>
                  <li>
                    Bake until crust is golden and cheese is bubbly 
                    {planDetails.oven === "pizza-oven" ? 
                    "(60-90 seconds for round pizzas)" : 
                    "(5-7 minutes)"}
                  </li>
                </ol>
              </div>

              <Link href={getRecipeUrl("cooking")} className="no-underline">
                <Button className="w-full btn-accent-action mt-4">
                  Start Cooking
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </TabsContent>
          </Tabs>

          <div className="flex gap-3 mt-4">
            <Link href="/shopping-list" className="flex-1 no-underline">
              <Button
                variant="outline"
                className="w-full border-pizza-orange/50 theme-text-primary hover:bg-pizza-orange/20"
              >
                Shopping List
              </Button>
            </Link>
            <Button
              variant="outline"
              className="flex-1 border-pizza-orange/50 theme-text-primary hover:bg-pizza-orange/20"
              onClick={() => setIsAddToMealPlannerOpen(true)}
            >
              <CalendarDays className="h-4 w-4 mr-2" />
              Add to Meal Planner
            </Button>
          </div>

          <Link href="/" className="no-underline">
            <Button className="w-full bright-orange-btn mt-4">Back to Home</Button>
          </Link>
        </div>
      </main>

      {/* Add to Meal Planner Dialog */}
      <AddToMealPlannerDialog
        open={isAddToMealPlannerOpen}
        onOpenChange={setIsAddToMealPlannerOpen}
        recipeId={planId}
        recipeTitle={planDetails.title}
        recipeType={planDetails.pizzaType}
        pizzaCount={planDetails.quantity}
        imageUrl={getPizzaImage(planDetails.pizzaType)}
      />
    </div>
  )
}

