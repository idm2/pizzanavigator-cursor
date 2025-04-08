"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, ChevronRight, Check, CalendarDays, Save } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { generatePizzaPlanRecipe } from "@/utils/pizza-plan-utils"
import { getPizzaTypeById, calculateDoughWeight } from "@/utils/dough-calculator"
import { useToast } from "@/hooks/use-toast"
import { CalendarPicker } from "@/components/ui/calendar-picker"

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

interface PizzaPlanSummaryProps {
  pizzaType: string
  pizzaSize: string
  quantity: number
  timing: string
  oven: string
  toppings: string[]
  doughOption: string
  toppingsOption: string
}

export function PizzaPlanSummary({
  pizzaType,
  pizzaSize,
  quantity,
  timing,
  oven,
  toppings,
  doughOption,
  toppingsOption,
}: PizzaPlanSummaryProps) {
  const { toast } = useToast()
  const [reminderSet, setReminderSet] = useState(false)
  const [planTitle, setPlanTitle] = useState("")
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false)
  const [isAddToMealPlannerOpen, setIsAddToMealPlannerOpen] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [isAddedToMealPlanner, setIsAddedToMealPlanner] = useState(false)
  const [calculatedRecipe, setCalculatedRecipe] = useState<any>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState("18:00")
  const [selectedTitle, setSelectedTitle] = useState("")
  const router = useRouter()

  // Generate a unique ID for this plan based on the properties
  const planId = `${pizzaType}-${pizzaSize}-${Date.now().toString().slice(-6)}`

  // Calculate the recipe based on the selected options
  useEffect(() => {
    // Calculate dough weight based on pizza type and size
    const pizzaTypeData = getPizzaTypeById(pizzaType)
    let doughBallWeight = 0
    let diameter = null
    let length = null
    let width = null

    // Extract dimensions from size string
    if (pizzaSize.includes("inch")) {
      const sizeMatch = pizzaSize.match(/(\d+)/)
      if (sizeMatch) {
        diameter = Number.parseInt(sizeMatch[1], 10)
      }
    } else if (pizzaSize === "small") {
      diameter = 10
    } else if (pizzaSize === "medium") {
      diameter = 12
    } else if (pizzaSize === "large") {
      diameter = 16
    } else if (pizzaSize.includes("square")) {
      // Handle rectangular pizzas
      if (pizzaSize.includes("small")) {
        length = 8
        width = 8
      } else if (pizzaSize.includes("medium")) {
        length = 10
        width = 10
      } else if (pizzaSize.includes("large")) {
        length = 12
        width = 12
      }
    }

    // Calculate dough weight
    if (diameter) {
      doughBallWeight = calculateDoughWeight(pizzaType, "round", diameter)
    } else if (length && width) {
      doughBallWeight = calculateDoughWeight(pizzaType, "square-inch", null, length, width)
    } else {
      // Default to a standard size if dimensions can't be determined
      doughBallWeight = calculateDoughWeight(pizzaType, "round", 12)
    }

    // Store the calculated recipe in state
    const recipe = generatePizzaPlanRecipe(
      pizzaType,
      pizzaSize,
      quantity,
      timing,
      oven,
      doughOption,
      toppingsOption,
      doughBallWeight,
    )

    setCalculatedRecipe(recipe)

    // Store the recipe in sessionStorage to persist it during navigation
    sessionStorage.setItem("calculatedRecipe", JSON.stringify(recipe))
  }, [pizzaType, pizzaSize, quantity, timing, oven, doughOption, toppingsOption])

  // Load saved recipe from sessionStorage when component mounts
  useEffect(() => {
    const savedRecipe = sessionStorage.getItem("calculatedRecipe")
    if (savedRecipe) {
      setCalculatedRecipe(JSON.parse(savedRecipe))
    }
  }, [])

  const formatPizzaType = (type: string) => {
    switch (type) {
      case "neapolitan":
        return "Neapolitan"
      case "new-york":
        return "New York"
      case "detroit":
        return "Detroit"
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

  const handleSetReminder = () => {
    // In a real app, this would set up notifications
    setReminderSet(true)
    toast({
      title: "Reminder set",
      description: "You'll be notified when it's time to prepare your pizza.",
    })
  }

  const handleSavePlan = () => {
    try {
      // Get existing saved recipes
      const savedRecipesJson = localStorage.getItem("savedRecipes") || "[]"
      const savedRecipes = JSON.parse(savedRecipesJson)

      // Create new recipe entry
      const newRecipe = {
        id: planId,
        title: planTitle || `${formatPizzaType(pizzaType)} ${formatPizzaSize(pizzaSize).split(" ")[0]}`,
        type: pizzaType,
        size: pizzaSize,
        date: new Date().toLocaleDateString(),
        pizzaCount: quantity,
        isFavorite: false,
        image: getPizzaImage(pizzaType),
        details: {
          timing,
          oven,
          toppings,
          doughOption,
          toppingsOption,
          recipe: calculatedRecipe,
        },
      }

      // Add to saved recipes and save
      savedRecipes.push(newRecipe)
      localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes))

      setIsSaved(true)
      setIsSaveDialogOpen(false)

      toast({
        title: "Recipe saved",
        description: "Your pizza recipe has been saved successfully.",
      })

      // After a brief delay, navigate to the plan detail
      setTimeout(() => {
        router.push(`/plan/${planId}`)
      }, 1500)
    } catch (error) {
      console.error("Error saving recipe:", error)
      toast({
        title: "Error saving recipe",
        description: "There was a problem saving your recipe.",
        variant: "destructive",
      })
    }
  }

  const handleAddToMealPlanner = () => {
    if (!selectedDate) return

    try {
      // Get existing meal plans
      const mealPlansJson = localStorage.getItem("mealPlans") || "[]"
      const mealPlans = JSON.parse(mealPlansJson)

      // Create new meal plan entry
      const newMealPlan = {
        id: `${planId}-${Date.now()}`,
        recipeId: planId,
        title: selectedTitle || `${formatPizzaType(pizzaType)} ${formatPizzaSize(pizzaSize).split(" ")[0]}`,
        type: pizzaType,
        size: pizzaSize,
        pizzaCount: quantity,
        date: selectedDate.toISOString(),
        time: selectedTime,
        image: getPizzaImage(pizzaType),
      }

      // Add to meal plans and save
      mealPlans.push(newMealPlan)
      localStorage.setItem("mealPlans", JSON.stringify(mealPlans))

      // Also save the recipe if it's not already saved
      const savedRecipesJson = localStorage.getItem("savedRecipes") || "[]"
      const savedRecipes = JSON.parse(savedRecipesJson)

      if (!savedRecipes.some((recipe: { id: string }) => recipe.id === planId)) {
        const newRecipe = {
          id: planId,
          title: selectedTitle || `${formatPizzaType(pizzaType)} ${formatPizzaSize(pizzaSize).split(" ")[0]}`,
          type: pizzaType,
          size: pizzaSize,
          date: new Date().toLocaleDateString(),
          pizzaCount: quantity,
          isFavorite: false,
          image: getPizzaImage(pizzaType),
          details: {
            timing,
            oven,
            toppings,
            doughOption,
            toppingsOption,
            recipe: calculatedRecipe,
          },
        }

        savedRecipes.push(newRecipe)
        localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes))
      }

      setIsAddedToMealPlanner(true)

      // Calculate preparation date based on pizza type
      const mealDate = new Date(selectedDate)
      let prepDays = 0

      // Different pizza types have different preparation times
      switch (pizzaType) {
        case "neapolitan":
          prepDays = 2 // Neapolitan typically needs 2 days for fermentation
          break
        case "detroit":
        case "new-york":
        case "chicago-deep-dish":
        case "sicilian":
          prepDays = 1 // These styles typically need 1 day
          break
        default:
          prepDays = 1 // Default to 1 day
      }

      const prepDate = new Date(mealDate)
      prepDate.setDate(mealDate.getDate() - prepDays)

      const prepInfo = prepDays === 1 ? "1 day before" : `${prepDays} days before`

      toast({
        title: "Added to meal planner",
        description: `Your pizza has been added to your meal planner for ${selectedDate.toLocaleDateString()}. Preparation reminder set for ${prepDate.toLocaleDateString()} (${prepInfo}).`,
      })

      // Reset and close dialog after a delay
      setTimeout(() => {
        setIsAddToMealPlannerOpen(false)
        setIsAddedToMealPlanner(false)

        // Navigate to meal planner
        router.push("/meal-planner")
      }, 1500)
    } catch (error) {
      console.error("Error adding to meal planner:", error)
      toast({
        title: "Error adding to meal planner",
        description: "There was a problem adding this recipe to your meal planner.",
        variant: "destructive",
      })
    }
  }

  const suggestPlanTitle = () => {
    return `${formatPizzaType(pizzaType)} ${formatPizzaSize(pizzaSize).split(" ")[0]}`
  }

  // Add a function to format toppings for URL
  const getToppingsParam = () => {
    return toppings.join(",")
  }

  // Update the getNextRecipeUrl function to include toppings
  const nextRecipeType = "dough" // Example value, replace with actual logic if needed
  const returnUrl = `/plan/${planId}` // Example value, replace with actual logic if needed

  const getNextRecipeUrl = () => {
    if (!nextRecipeType) return ""

    const baseUrl = returnUrl.split("/plan/")[0]
    const planId = returnUrl.split("/plan/")[1]
    return `${baseUrl}/recipe/${nextRecipeType}?planId=${planId}&toppings=${getToppingsParam()}&recipeId=${encodeURIComponent(JSON.stringify(calculatedRecipe))}`
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold theme-text-primary">Your Pizza Plan</h2>
        <p className="text-sm theme-text-secondary">Ready to start your pizza journey!</p>
      </div>

      <Card className="theme-card-bg">
        <CardContent className="p-4">
          <h3 className="font-medium mb-3 theme-text-primary">Pizza Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="theme-text-secondary">Type:</span>
              <span className="font-medium theme-text-primary">{formatPizzaType(pizzaType)}</span>
            </div>
            <div className="flex justify-between">
              <span className="theme-text-secondary">Size:</span>
              <span className="font-medium theme-text-primary">{formatPizzaSize(pizzaSize)}</span>
            </div>
            <div className="flex justify-between">
              <span className="theme-text-secondary">Quantity:</span>
              <span className="font-medium theme-text-primary">
                {quantity} {quantity === 1 ? "pizza" : "pizzas"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="theme-text-secondary">Timing:</span>
              <span className="font-medium theme-text-primary">{formatTiming(timing)}</span>
            </div>
            <div className="flex justify-between">
              <span className="theme-text-secondary">Oven:</span>
              <span className="font-medium theme-text-primary">{formatOven(oven)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="theme-card-bg">
        <CardContent className="p-4">
          <h3 className="font-medium mb-3 theme-text-primary">Toppings</h3>
          {toppings.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {toppings.map((topping, index) => (
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

      <Card className="bg-orange-50 dark:bg-[#3c2a1f] border-pizza-orange/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-pizza-orange mr-2" />
              <div>
                <h3 className="font-medium dark:text-white text-gray-800">Set Preparation Reminders</h3>
                <p className="text-xs dark:text-white/70 text-gray-600">
                  We'll remind you when it's time for each step
                </p>
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
        <TabsList className="grid grid-cols-3 bg-gray-100 dark:bg-[#1a202c]/50">
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
          {doughOption === "make-dough" ? (
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
                      <span className="font-medium theme-text-primary">{calculatedRecipe?.recipe?.sugar || 0}g</span>
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

              <Link href={getNextRecipeUrl()} className="no-underline">
                <Button className="w-full btn-accent-action mt-4">
                  Start Cooking
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </>
          ) : (
            <div className="theme-card-bg rounded-lg p-4 shadow-sm border border-pizza-orange/20">
              <h3 className="font-medium mb-2 theme-text-primary">Store-Bought Dough</h3>
              <p className="text-sm theme-text-secondary">You've chosen to use store-bought dough for this recipe.</p>
              <div className="mt-3 space-y-2 text-sm">
                <h4 className="font-medium theme-text-primary">Tips for store-bought dough:</h4>
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
          {toppingsOption === "app-toppings" ? (
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
                  {toppings.map((topping, index) => (
                    <li key={index} className="flex justify-between">
                      <span className="theme-text-secondary">{topping}</span>
                      <span className="font-medium theme-text-primary">As needed</span>
                    </li>
                  ))}
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
              <p className="text-sm theme-text-secondary">You've chosen to use your own toppings for this recipe.</p>
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
              <li>Preheat your {formatOven(oven)} to the {oven === "pizza-oven" ? "proper temperature (400-460°C/750-860°F for pizza ovens)" : "highest temperature (usually 250°C/480°F for home ovens)"}</li>
              <li>{oven === "pizza-stone" ? "Place your pizza stone in the oven and let it heat thoroughly" : oven === "pizza-oven" ? "Let the pizza oven heat thoroughly" : "Place your pizza stone in the oven if using one"}</li>
              <li>Stretch your dough to desired size</li>
              <li>Add sauce and toppings</li>
              <li>Bake until crust is golden and cheese is bubbly {oven === "pizza-oven" ? "(60-90 seconds for round pizzas)" : "(5-7 minutes)"}</li>
            </ol>
          </div>

          <Link
            href={`/recipe/cooking?planId=${planId}&recipeId=${encodeURIComponent(JSON.stringify(calculatedRecipe))}`}
            className="no-underline"
          >
            <Button className="w-full btn-accent-action mt-4">
              Start Cooking
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </TabsContent>
      </Tabs>

      <div className="flex gap-3 mt-4">
        <Button
          variant="outline"
          className="flex-1 border-pizza-orange/50 theme-text-primary hover:bg-pizza-orange/20"
          onClick={() => setIsAddToMealPlannerOpen(true)}
        >
          <CalendarDays className="h-4 w-4 mr-2" />
          Add to Meal Planner
        </Button>
        <Button
          variant="outline"
          className="flex-1 border-pizza-orange/50 theme-text-primary hover:bg-pizza-orange/20"
          onClick={() => setIsSaveDialogOpen(true)}
        >
          <Save className="h-4 w-4 mr-2" />
          Save Recipe
        </Button>
      </div>

      <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
        <DialogContent className="bg-pizza-charcoal border-pizza-orange/20">
          <DialogHeader>
            <DialogTitle className="text-white">Save Your Pizza Plan</DialogTitle>
            <DialogDescription className="text-white/70">
              Give your pizza plan a name so you can easily find it later.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="plan-title" className="text-white">
              Plan Name
            </Label>
            <Input
              id="plan-title"
              value={planTitle || suggestPlanTitle()}
              onChange={(e) => setPlanTitle(e.target.value)}
              placeholder="Enter a name for your plan"
              className="bg-[#1a202c] border-pizza-orange/30 text-white mt-2"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsSaveDialogOpen(false)}
              className="border-pizza-orange/50 text-white hover:bg-pizza-orange/20"
            >
              Cancel
            </Button>
            <Button onClick={handleSavePlan} className="bright-orange-btn" disabled={isSaved}>
              {isSaved ? "Saved!" : "Save Recipe"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add to Meal Planner Dialog */}
      <Dialog open={isAddToMealPlannerOpen} onOpenChange={setIsAddToMealPlannerOpen}>
        <DialogContent className="bg-pizza-charcoal border-pizza-orange/20">
          <DialogHeader>
            <DialogTitle className="text-white">Add to Meal Planner</DialogTitle>
            <DialogDescription className="text-white/70">Select a date and time for your pizza meal.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="plan-title" className="text-white">
                Plan Title
              </Label>
              <Input
                id="plan-title"
                value={selectedTitle || suggestPlanTitle()}
                onChange={(e) => setSelectedTitle(e.target.value)}
                placeholder="Enter a title for this meal"
                className="bg-[#1a202c] border-pizza-orange/30 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Select Date</Label>
              <CalendarPicker
                selectedDate={selectedDate || undefined}
                onDateSelect={setSelectedDate}
                className="border border-gray-800"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="meal-time" className="text-white">
                Meal Time
              </Label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger id="meal-time" className="bg-[#1a202c] border-pizza-orange/30 text-white">
                  <Clock className="h-4 w-4 mr-2 text-pizza-orange" />
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a202c] border-pizza-orange/30 text-white">
                  <SelectItem value="12:00">12:00 PM (Lunch)</SelectItem>
                  <SelectItem value="18:00">6:00 PM (Dinner)</SelectItem>
                  <SelectItem value="19:00">7:00 PM (Dinner)</SelectItem>
                  <SelectItem value="20:00">8:00 PM (Dinner)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddToMealPlannerOpen(false)}
              className="border-pizza-orange/50 text-white hover:bg-pizza-orange/20"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddToMealPlanner}
              className="bright-orange-btn"
              disabled={isAddedToMealPlanner || !selectedDate}
            >
              {isAddedToMealPlanner ? "Added!" : "Add to Planner"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {isSaved && (
        <div className="mt-4 p-3 bg-green-600/20 border border-green-600/30 rounded-lg text-center">
          <p className="text-green-500 font-medium">Pizza plan saved successfully!</p>
          <p className="text-sm text-green-500/80">Redirecting to plan details...</p>
        </div>
      )}

      <Link href="/" className="no-underline">
        <Button
          variant="outline"
          className="w-full border-pizza-orange/50 theme-text-primary hover:bg-pizza-orange/20 mt-4"
        >
          Back to Home
        </Button>
      </Link>
    </div>
  )
}

