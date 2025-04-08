import { getPizzaTypeById, calculateDoughWeight, calculateBasicRecipe } from "@/utils/dough-calculator"

// Generate a recipe for a pizza plan
export function generatePizzaPlanRecipe(
  pizzaType: string,
  pizzaSize: string,
  quantity: number,
  timing: string,
  oven: string,
  doughOption: string,
  toppingsOption: string,
  customDoughBallWeight?: number,
) {
  // Get pizza type data
  const pizzaTypeData = getPizzaTypeById(pizzaType)

  // Determine fermentation time based on timing selection
  let fermentationTime = 4 // Default
  if (timing === "same-day") {
    fermentationTime = 4
  } else if (timing === "next-day") {
    fermentationTime = 24
  } else if (timing === "two-days") {
    fermentationTime = 48
  }

  // Calculate dough weight based on size
  let doughBallWeight = customDoughBallWeight || 250 // Use provided weight or default
  let diameter = null

  // Extract diameter from size string if not provided with custom weight
  if (!customDoughBallWeight) {
    // Extract diameter from size string if it's a round pizza
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
    }

    if (diameter) {
      doughBallWeight = calculateDoughWeight(pizzaType, "round", diameter)
    } else if (pizzaSize.includes("square")) {
      // Handle rectangular pizzas
      let length = null
      let width = null

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

      if (length && width) {
        doughBallWeight = calculateDoughWeight(pizzaType, "square-inch", null, length, width)
      }
    }
  }

  // Calculate recipe based on dough option
  let recipe
  const roomTemperature = 22 // Default room temperature

  if (doughOption === "make-dough") {
    if (pizzaTypeData) {
      recipe = calculateBasicRecipe(
        doughBallWeight,
        quantity,
        pizzaTypeData.hydration,
        pizzaTypeData.salt,
        pizzaTypeData.sugar || 0,
        pizzaTypeData.oil || 0,
        roomTemperature,
        fermentationTime,
        pizzaTypeData.butter || 0,
        pizzaTypeData.cornmeal || 0,
      )
    } else {
      // Fallback to default values if pizza type not found
      recipe = calculateBasicRecipe(
        doughBallWeight,
        quantity,
        65, // Default hydration
        2, // Default salt
        0, // Default sugar
        0, // Default oil
        roomTemperature,
        fermentationTime,
      )
    }
  } else {
    // For store-bought dough, we don't need to calculate a recipe
    recipe = {
      storeBought: true,
      doughBallWeight,
      quantity,
    }
  }

  return {
    recipe,
    doughBallWeight,
    totalWeight: doughBallWeight * quantity,
  }
}

