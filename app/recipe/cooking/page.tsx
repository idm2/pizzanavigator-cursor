"use client"

import { RecipePage } from "@/components/recipe-page"
import { useSearchParams } from "next/navigation"
import { getCookingInstructions } from "@/utils/cooking-utils"
import { OvenType } from "@/utils/cooking-utils"

export default function CookingRecipePage() {
  const searchParams = useSearchParams()
  const planId = searchParams.get("planId") || "default"
  
  // Extract pizza type and oven type from the plan ID
  // Plan ID format: pizzaType-pizzaSize-randomNumber
  // Example: neapolitan-12-inch-123456
  const segments = planId.split("-")
  const pizzaType = segments[0]
  
  // Determine oven type from the plan ID
  // Plan ID will contain oven type string like 'pizza-oven', 'pizza-stone', or default to 'conventional'
  let ovenType: OvenType = "conventional"
  if (planId.includes("pizza-stone")) {
    ovenType = "pizza-stone"
  } else if (planId.includes("pizza-oven")) {
    ovenType = "pizza-oven"
  }
  
  // Get dynamic cooking instructions based on the pizza type and oven type
  const cookingSteps = getCookingInstructions(pizzaType, ovenType)

  return <RecipePage recipeType="cooking" steps={cookingSteps} returnUrl={`/plan/${planId}`} nextRecipeType={null} />
}

