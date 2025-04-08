"use client"

import { RecipePage } from "@/components/recipe-page"
import { useSearchParams } from "next/navigation"

export default function ToppingsRecipePage() {
  const searchParams = useSearchParams()
  const planId = searchParams.get("planId") || "default"
  const toppingsParam = searchParams.get("toppings") || ""
  const selectedToppings = toppingsParam ? toppingsParam.split(",") : []

  // Base steps that are always included
  const baseSteps = [
    {
      id: "1",
      title: "Prepare tomato sauce",
      description: "Blend San Marzano tomatoes with a pinch of salt. Don't cook the sauce for Neapolitan style.",
      time: "10 min",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/homemade-pizza-food-photography-recipe-idea.jpg-lcL048hSYQxzw4lOm673otr7ONW8s8.jpeg", // homemade-pizza-food-photography-recipe-idea.jpg
    },
    {
      id: "2",
      title: "Prepare the cheese",
      description:
        "Slice fresh mozzarella into thin rounds and let it drain on paper towels to remove excess moisture.",
      time: "5 min",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/top-view-fluffy-pizza-with-mushrooms.jpg-QWfalvqZ5hdqNmcY0k9ano5DN69zkn.jpeg", // top-view-fluffy-pizza-with-mushrooms.jpg
    },
    {
      id: "3",
      title: "Prepare fresh basil",
      description: "Wash and dry fresh basil leaves. They'll be added after baking.",
      time: "2 min",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pizza-margarita-table.jpg-BPhVqWJtWoGWJcAPX3eFeOj6P4d3EV.jpeg", // pizza-margarita-table.jpg
    },
  ]

  // Generate steps for each selected topping
  const toppingSteps = selectedToppings.map((topping, index) => {
    return {
      id: `topping-${index + 1}`,
      title: `Prepare ${topping}`,
      description: getToppingDescription(topping),
      time: "5 min",
      image: getToppingImage(topping),
    }
  })

  // Combine base steps with topping-specific steps
  const allSteps = [
    ...baseSteps,
    ...toppingSteps,
    {
      id: "organize",
      title: "Organize your workspace",
      description: "Arrange all toppings in the order they'll be applied to make assembly easier.",
      time: "5 min",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pizza-margherita.jpeg-MQ00dpwUUHTzPms5htnDpbHGUSVR84.jpeg",
    },
  ]

  return <RecipePage recipeType="toppings" steps={allSteps} returnUrl={`/plan/${planId}`} nextRecipeType="cooking" />
}

// Helper function to get description based on topping type
function getToppingDescription(topping: string): string {
  const toppingMap: Record<string, string> = {
    Pepperoni: "Slice pepperoni thinly and set aside. For best results, use room temperature pepperoni.",
    Sausage: "Cook and crumble Italian sausage, drain excess fat, and let cool slightly.",
    Mushrooms: "Clean and slice mushrooms. For better flavor, sauté them lightly with a bit of olive oil.",
    "Bell Peppers": "Remove seeds and slice bell peppers into thin strips.",
    Onions: "Slice onions thinly. For a milder flavor, soak in cold water for 10 minutes.",
    Olives: "Slice or halve olives, depending on your preference.",
    Spinach: "Wash spinach thoroughly and pat dry. For cooked spinach, wilt it briefly with olive oil.",
    Artichokes: "Drain and quarter artichoke hearts.",
    Bacon: "Cook bacon until crispy, drain on paper towels, and crumble.",
    Ham: "Dice ham into small cubes.",
    Prosciutto: "Prosciutto will be added after baking. Simply separate the slices for easy application.",
    Chicken: "Cook and dice chicken. Season with Italian herbs for extra flavor.",
    Mozzarella: "Slice fresh mozzarella or shred if using low-moisture mozzarella.",
    Parmesan: "Grate Parmesan cheese finely.",
    Gorgonzola: "Crumble Gorgonzola cheese into small pieces.",
    Ricotta: "Drain excess liquid from ricotta and season with salt and pepper.",
    Provolone: "Slice or shred provolone cheese.",
    Feta: "Crumble feta cheese and set aside.",
  }

  return toppingMap[topping] || `Prepare ${topping} according to your preference.`
}

// Helper function to get image based on topping type
function getToppingImage(topping: string): string {
  // For meat toppings
  if (
    topping.includes("Pepperoni") ||
    topping.includes("Sausage") ||
    topping.includes("Bacon") ||
    topping.includes("Ham") ||
    topping.includes("Prosciutto") ||
    topping.includes("Chicken")
  ) {
    return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mixed-pizza-sausages-chicken-arugula-olives-cheese-pepper-top-view.jpg-rv7CVTUW049mp6Ht6fBkJBhFdWFzHI.jpeg" // mixed-pizza-sausages-chicken-arugula-olives-cheese-pepper-top-view.jpg
  }
  // For cheese toppings
  else if (
    topping.includes("Mozzarella") ||
    topping.includes("Parmesan") ||
    topping.includes("Gorgonzola") ||
    topping.includes("Ricotta") ||
    topping.includes("Provolone") ||
    topping.includes("Feta")
  ) {
    return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pizza-margarita-table.jpg-BPhVqWJtWoGWJcAPX3eFeOj6P4d3EV.jpeg" // pizza-margarita-table.jpg
  }
  // For vegetable toppings
  else {
    return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/top-view-fluffy-pizza-with-mushrooms.jpg-QWfalvqZ5hdqNmcY0k9ano5DN69zkn.jpeg" // top-view-fluffy-pizza-with-mushrooms.jpg
  }
}

