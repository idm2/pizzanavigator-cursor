"use client"

import { RecipePage } from "@/components/recipe-page"
import { useSearchParams } from "next/navigation"
import { pizzaTypes } from "@/data/pizza-calculator-data"
import { getPizzaShape } from "@/utils/cooking-utils"

export default function DoughRecipePage() {
  const searchParams = useSearchParams()
  const planId = searchParams.get("planId") || "default"
  
  // Extract pizza type and timing from the plan ID
  // Plan ID format: pizzaType-pizzaSize-randomNumber
  const segments = planId.split("-")
  const pizzaType = segments[0]
  
  // Determine timing based on URL parameter or default to "next-day"
  let timing = "next-day"
  if (planId.includes("same-day")) {
    timing = "same-day"
  } else if (planId.includes("two-days")) {
    timing = "two-days"
  }
  
  // Get the appropriate dough recipe based on the pizza type (round vs pan)
  const doughSteps = getDoughRecipe(pizzaType, timing)

  return <RecipePage recipeType="dough" steps={doughSteps} returnUrl={`/plan/${planId}`} nextRecipeType="toppings" />
}

function getDoughRecipe(pizzaTypeId: string, timing: string) {
  const pizzaShape = getPizzaShape(pizzaTypeId)
  const pizzaTypeData = pizzaTypes.find(type => type.id === pizzaTypeId)
  
  // Get basic dough properties based on pizza type
  let flourType = "Bread Flour"
  let hydration = 65
  let salt = 2
  let oil = 0
  let sugar = 0
  let butter = 0
  let cornmeal = 0
  
  if (pizzaTypeData) {
    flourType = pizzaTypeData.flourType
    hydration = pizzaTypeData.hydration
    salt = pizzaTypeData.salt
    oil = pizzaTypeData.oil || 0
    sugar = pizzaTypeData.sugar || 0
    butter = pizzaTypeData.butter || 0
    cornmeal = pizzaTypeData.cornmeal || 0
  }
  
  // Special case for Chicago Deep-Dish
  const isChicagoDeepDish = pizzaTypeId === "chicago-deep-dish"
  
  if (pizzaShape === "pan") {
    // Pan-based pizza dough steps
    return [
      {
        id: "1",
        title: "Prepare the ingredients",
        description: `Measure out the required amount of ${flourType.toLowerCase()}, water (${hydration}% hydration), salt${sugar > 0 ? ", sugar" : ""}${cornmeal > 0 ? ", cornmeal" : ""}, and yeast${oil > 0 ? ", plus oil for the dough" : ""}${butter > 0 ? ", plus butter" : ""}${(oil > 0 || butter > 0) ? " and additional oil for the pan" : ""}.`,
        time: "5 min",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/homemade-pizza-food-photography-recipe-idea.jpg-lcL048hSYQxzw4lOm673otr7ONW8s8.jpeg",
      },
      {
        id: "2",
        title: "Mix water, yeast and sugar",
        description: `Mix your yeast${sugar > 0 ? " and sugar" : ""} with the water until all is dissolved.`,
        time: "5 min",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/homemade-pizza-food-photography-recipe-idea.jpg-lcL048hSYQxzw4lOm673otr7ONW8s8.jpeg",
      },
      // Special step for Chicago Deep-Dish with cornmeal
      ...(cornmeal > 0 ? [
        {
          id: "3",
          title: "Mix dry ingredients",
          description: `In a separate bowl, mix the flour${cornmeal > 0 ? " and cornmeal" : ""} until well combined.`,
          time: "2 min",
          image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/homemade-pizza-food-photography-recipe-idea.jpg-lcL048hSYQxzw4lOm673otr7ONW8s8.jpeg",
        }
      ] : []),
      {
        id: cornmeal > 0 ? "4" : "3",
        title: `Add ${butter > 0 ? "butter, " : ""}oil and flour`,
        description: `${butter > 0 ? "Melt the butter and mix with oil. " : ""}Now add your ${butter > 0 ? "butter/oil mixture" : "oil"} and ${cornmeal > 0 ? "flour/cornmeal mixture" : "flour"} and stir until it becomes a thick batter.`,
        time: "5 min",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/homemade-pizza-food-photography-recipe-idea.jpg-lcL048hSYQxzw4lOm673otr7ONW8s8.jpeg",
      },
      {
        id: "5",
        title: "Add salt and knead",
        description: "Lastly add your salt, then knead the dough until all ingredients have been mixed together well.",
        time: "5-10 min",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/top-view-fluffy-pizza-with-mushrooms.jpg-QWfalvqZ5hdqNmcY0k9ano5DN69zkn.jpeg",
      },
      {
        id: "6",
        title: "Initial rise",
        description: "Place your kneaded dough in a lightly oiled bowl and cover with a plastic cover or plastic wrap. Let your dough sit at room temperature for 2 hours or until it has almost doubled in size.",
        time: "2 hours",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mixed-pizza-sausages-chicken-arugula-olives-cheese-pepper-top-view.jpg-rv7CVTUW049mp6Ht6fBkJBhFdWFzHI.jpeg",
      },
      ...(timing !== "same-day" ? [
        {
          id: cornmeal > 0 ? "7" : "6",
          title: "Cold fermentation",
          description: timing === "two-days" 
            ? "Place your dough in a lightly oiled bowl and cover with plastic wrap. Place in the fridge for 40-48 hours. After 40-48 hours, remove from the fridge and let it come to room temperature (approx. 1-2 hours)."
            : "Place your dough in a lightly oiled bowl and cover with plastic wrap. Place in the fridge for 16-24 hours. After 16-24 hours, remove from the fridge and let it come to room temperature (approx. 1-2 hours).",
          time: timing === "two-days" ? "40-48 hours" : "16-24 hours",
          image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mixed-pizza-sausages-chicken-arugula-olives-cheese-pepper-top-view.jpg-rv7CVTUW049mp6Ht6fBkJBhFdWFzHI.jpeg",
        },
      ] : []),
      {
        id: timing !== "same-day" ? (cornmeal > 0 ? "8" : "7") : (cornmeal > 0 ? "7" : "6"),
        title: "Prepare your pan",
        description: "Grease your dish with oil or butter, or a combination of both.",
        time: "2 min",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pizza-margarita-table.jpg-BPhVqWJtWoGWJcAPX3eFeOj6P4d3EV.jpeg",
      },
      {
        id: timing !== "same-day" ? (cornmeal > 0 ? "9" : "8") : (cornmeal > 0 ? "8" : "7"),
        title: "Place dough in pan",
        description: "Place the dough into the dish and spread it almost to the edges. Let rest for 20 mins and gently press the dough into the corners of the pan and ensure even distribution.",
        time: "20 min",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pizza-margarita-table.jpg-BPhVqWJtWoGWJcAPX3eFeOj6P4d3EV.jpeg",
      },
      {
        id: timing !== "same-day" ? (cornmeal > 0 ? "10" : "9") : (cornmeal > 0 ? "9" : "8"),
        title: "Create dimples in dough",
        description: "Lightly oil the surface of your dough and using your finger, create a dimpled effect on the dough by pressing them into the surface.",
        time: "2 min",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pizza-margarita-table.jpg-BPhVqWJtWoGWJcAPX3eFeOj6P4d3EV.jpeg",
      },
      {
        id: timing !== "same-day" ? (cornmeal > 0 ? "11" : "10") : (cornmeal > 0 ? "10" : "9"),
        title: "Final rise",
        description: "Cover the dough and let it sit at room temperature for 2 hours.",
        time: "2 hours",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pizza-margarita-table.jpg-BPhVqWJtWoGWJcAPX3eFeOj6P4d3EV.jpeg",
      },
    ]
  } else {
    // Round pizza dough steps
    return [
      {
        id: "1",
        title: "Prepare the ingredients",
        description: `Measure out the required amount of ${flourType.toLowerCase()}, water (${hydration}% hydration), salt${sugar > 0 ? ", sugar" : ""}, and yeast${oil > 0 ? ", plus oil for the dough" : ""}.`,
        time: "5 min",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/homemade-pizza-food-photography-recipe-idea.jpg-lcL048hSYQxzw4lOm673otr7ONW8s8.jpeg",
      },
      {
        id: "2",
        title: "Mix water, yeast and sugar",
        description: `Mix your yeast${sugar > 0 ? " and sugar" : ""} with the water until all is dissolved.`,
        time: "5 min",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/homemade-pizza-food-photography-recipe-idea.jpg-lcL048hSYQxzw4lOm673otr7ONW8s8.jpeg",
      },
      {
        id: "3",
        title: "Add flour",
        description: "Now add your flour and stir mixture until it becomes a thick batter.",
        time: "5 min",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/homemade-pizza-food-photography-recipe-idea.jpg-lcL048hSYQxzw4lOm673otr7ONW8s8.jpeg",
      },
      {
        id: "4",
        title: "Add salt and knead",
        description: "Lastly add your salt, then knead the dough until all ingredients have been mixed together well.",
        time: "5-10 min",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/top-view-fluffy-pizza-with-mushrooms.jpg-QWfalvqZ5hdqNmcY0k9ano5DN69zkn.jpeg",
      },
      {
        id: "5",
        title: "Initial rise",
        description: "Place your kneaded dough in a lightly oiled bowl and cover with a plastic cover or plastic wrap. Let your dough sit at room temperature for 2 hours or until it has almost doubled in size.",
        time: "2 hours",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/top-view-fluffy-pizza-with-mushrooms.jpg-QWfalvqZ5hdqNmcY0k9ano5DN69zkn.jpeg",
      },
      ...(timing !== "same-day" ? [
        {
          id: cornmeal > 0 ? "6" : "5",
          title: "Cold fermentation",
          description: timing === "two-days" 
            ? "Place your dough in a lightly oiled bowl and cover with plastic wrap. Place in the fridge for 40-48 hours. After 40-48 hours, remove from the fridge and let it come to room temperature (approx. 1-2 hours)."
            : "Place your dough in a lightly oiled bowl and cover with plastic wrap. Place in the fridge for 16-24 hours. After 16-24 hours, remove from the fridge and let it come to room temperature (approx. 1-2 hours).",
          time: timing === "two-days" ? "40-48 hours" : "16-24 hours",
          image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mixed-pizza-sausages-chicken-arugula-olives-cheese-pepper-top-view.jpg-rv7CVTUW049mp6Ht6fBkJBhFdWFzHI.jpeg",
        },
      ] : []),
      {
        id: timing !== "same-day" ? "7" : "6",
        title: "Form dough ball",
        description: "Lightly dust your dough with flour. Form a dough ball by picking up your dough and gently folding it in under itself (pushing up under the middle so to push air into the dough ball).",
        time: "2 min",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mixed-pizza-sausages-chicken-arugula-olives-cheese-pepper-top-view.jpg-rv7CVTUW049mp6Ht6fBkJBhFdWFzHI.jpeg",
      },
      {
        id: timing !== "same-day" ? "8" : "7",
        title: "Final proof",
        description: "Place your ball into a lightly floured bowl, cover and let sit at room temperature for 2 hours.",
        time: "2 hours",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pizza-margarita-table.jpg-BPhVqWJtWoGWJcAPX3eFeOj6P4d3EV.jpeg",
      },
    ]
  }
}

