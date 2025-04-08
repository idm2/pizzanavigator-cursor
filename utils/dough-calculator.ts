import { pizzaTypes, yeastPercentages, conversionFactors } from "@/data/pizza-calculator-data"

// Find pizza type data by ID
export function getPizzaTypeById(id: string) {
  return pizzaTypes.find((type) => type.id === id) || pizzaTypes[0]
}

// Update the calculateDoughWeight function to handle both circular and rectangular pizzas more accurately
export function calculateDoughWeight(
  pizzaTypeId: string,
  sizeType: string,
  diameter: number | null = null,
  length: number | null = null,
  width: number | null = null,
  unit: "cm" | "inch" = "inch",
): number {
  const pizzaType = getPizzaTypeById(pizzaTypeId)
  let area = 0
  const doughWeightPerArea = unit === "cm" ? pizzaType.doughWeightCM : pizzaType.doughWeightInch

  // For round pizzas
  if (diameter && (sizeType.includes("inch") || sizeType === "round")) {
    const radius = diameter / 2
    area = Math.PI * radius * radius
  }
  // For rectangular pizzas
  else if (length && width) {
    area = length * width
  }
  // Default to a 12" pizza if no valid inputs
  else {
    const defaultDiameter = 12
    const radius = defaultDiameter / 2
    area = Math.PI * radius * radius
  }

  return Math.round(area * doughWeightPerArea)
}

// Get yeast percentage based on temperature and fermentation time
export function getYeastPercentage(temperature: number, hours: number): number {
  // Try to find exact match
  const key = `${temperature}-${hours}` as keyof typeof yeastPercentages;
  if (yeastPercentages[key]) {
    return yeastPercentages[key];
  }

  // If no exact match, find closest temperature and time
  // This is a simplified approach - a real implementation would interpolate values
  const closestTemp = [20, 22, 24].reduce((prev, curr) =>
    Math.abs(curr - temperature) < Math.abs(prev - temperature) ? curr : prev,
  );

  const times = [1, 2, 3, 4, 5, 6, 8, 12, 16, 24, 36, 48, 72];
  const closestTime = times.reduce((prev, curr) => (Math.abs(curr - hours) < Math.abs(prev - hours) ? curr : prev));

  const fallbackKey = `${closestTemp}-${closestTime}` as keyof typeof yeastPercentages;
  return yeastPercentages[fallbackKey] || 0.1; // Default to 0.1% if no match
}

// Calculate total flour for basic recipe (no starter)
export function calculateTotalFlour(
  doughBallWeight: number,
  numberOfBalls: number,
  hydration: number,
  salt: number,
  sugar: number,
  oil: number,
  yeastPercentage: number,
  butter: number = 0,
  cornmeal: number = 0,
): number {
  return Math.round((doughBallWeight * numberOfBalls) / (1 + (hydration + salt + sugar + oil + yeastPercentage + butter + cornmeal) / 100))
}

// Calculate ingredients for basic recipe (no starter)
export function calculateBasicRecipe(
  doughBallWeight: number,
  numberOfBalls: number,
  hydration: number,
  salt: number,
  sugar: number,
  oil: number,
  temperature: number,
  fermentationTime: number,
  butter: number = 0,
  cornmeal: number = 0,
): { [key: string]: number } {
  const yeastPercentage = getYeastPercentage(temperature, fermentationTime)

  const totalFlour = calculateTotalFlour(
    doughBallWeight, 
    numberOfBalls, 
    hydration, 
    salt, 
    sugar, 
    oil, 
    yeastPercentage, 
    butter, 
    cornmeal
  )

  return {
    flour: totalFlour,
    water: Math.round(totalFlour * (hydration / 100)),
    yeast: Math.round(totalFlour * (yeastPercentage / 100) * 10) / 10, // Round to 1 decimal place
    salt: Math.round(totalFlour * (salt / 100)),
    sugar: sugar > 0 ? Math.round(totalFlour * (sugar / 100)) : 0,
    oil: oil > 0 ? Math.round(totalFlour * (oil / 100)) : 0,
    butter: butter > 0 ? Math.round(totalFlour * (butter / 100)) : 0,
    cornmeal: cornmeal > 0 ? Math.round(totalFlour * (cornmeal / 100)) : 0,
    total: doughBallWeight * numberOfBalls,
  }
}

// Calculate ingredients for poolish recipe
export function calculatePoolishRecipe(
  doughBallWeight: number,
  numberOfBalls: number,
  hydration: number,
  salt: number,
  sugar: number,
  oil: number,
  temperature: number,
  fermentationTime: number,
  poolishFlourPercentage: number,
): { [key: string]: any } {
  const yeastPercentage = getYeastPercentage(temperature, fermentationTime)

  const totalFlour = calculateTotalFlour(doughBallWeight, numberOfBalls, hydration, salt, sugar, oil, yeastPercentage)

  const poolishFlour = Math.round(totalFlour * (poolishFlourPercentage / 100))
  const poolishWater = poolishFlour // Poolish is 100% hydration
  const poolishYeast = Math.round(totalFlour * (yeastPercentage / 100) * 10) / 10

  const doughFlour = totalFlour - poolishFlour
  const totalWater = Math.round(totalFlour * (hydration / 100))
  const doughWater = totalWater - poolishWater
  const doughSalt = Math.round(totalFlour * (salt / 100))
  const doughSugar = sugar > 0 ? Math.round(totalFlour * (sugar / 100)) : 0
  const doughOil = oil > 0 ? Math.round(totalFlour * (oil / 100)) : 0
  const doughYeast = Math.round(doughFlour * (yeastPercentage / 3 / 100) * 10) / 10

  return {
    poolish: {
      flour: poolishFlour,
      water: poolishWater,
      yeast: poolishYeast,
    },
    dough: {
      flour: doughFlour,
      water: doughWater,
      salt: doughSalt,
      sugar: doughSugar,
      oil: doughOil,
      yeast: doughYeast,
    },
    total: doughBallWeight * numberOfBalls,
  }
}

// Calculate ingredients for biga recipe
export function calculateBigaRecipe(
  doughBallWeight: number,
  numberOfBalls: number,
  hydration: number,
  salt: number,
  sugar: number,
  oil: number,
  temperature: number,
  fermentationTime: number,
  bigaFlourPercentage: number,
): { [key: string]: any } {
  const yeastPercentage = getYeastPercentage(temperature, fermentationTime)

  const totalFlour = calculateTotalFlour(doughBallWeight, numberOfBalls, hydration, salt, sugar, oil, yeastPercentage)

  const bigaFlour = Math.round(totalFlour * (bigaFlourPercentage / 100))
  const bigaWater = Math.round(bigaFlour * 0.45) // Biga is 45% hydration
  const bigaYeast = Math.round(totalFlour * (yeastPercentage / 100) * 10) / 10

  const doughFlour = totalFlour - bigaFlour
  const totalWater = Math.round(totalFlour * (hydration / 100))
  const doughWater = totalWater - bigaWater
  const doughSalt = Math.round(totalFlour * (salt / 100))
  const doughSugar = sugar > 0 ? Math.round(totalFlour * (sugar / 100)) : 0
  const doughOil = oil > 0 ? Math.round(totalFlour * (oil / 100)) : 0
  const doughYeast = Math.round(doughFlour * (yeastPercentage / 3 / 100) * 10) / 10

  return {
    biga: {
      flour: bigaFlour,
      water: bigaWater,
      yeast: bigaYeast,
    },
    dough: {
      flour: doughFlour,
      water: doughWater,
      salt: doughSalt,
      sugar: doughSugar,
      oil: doughOil,
      yeast: doughYeast,
    },
    total: doughBallWeight * numberOfBalls,
  }
}

// Calculate ingredients for sourdough recipe
export function calculateSourdoughRecipe(
  doughBallWeight: number,
  numberOfBalls: number,
  hydration: number,
  salt: number,
  sugar: number,
  oil: number,
  sourdoughStarterPercentage: number,
): { [key: string]: number } {
  // Adjust hydration to account for starter hydration
  const adjustedHydration = hydration - ((100 - hydration) * (sourdoughStarterPercentage / 100)) / 2

  // Calculate sourdough flour
  const sourdoughFlour = Math.round(
    (doughBallWeight * numberOfBalls) / (adjustedHydration / 100 + salt / 100 + sourdoughStarterPercentage / 100 + 1),
  )

  const sourdoughWater = Math.round(sourdoughFlour * (adjustedHydration / 100))
  const sourdoughStarter = Math.round(sourdoughFlour * (sourdoughStarterPercentage / 100))
  const sourdoughSalt = Math.round((sourdoughStarter / 2 + sourdoughFlour) * (salt / 100))
  const sourdoughSugar = sugar > 0 ? Math.round(sourdoughFlour * (sugar / 100)) : 0
  const sourdoughOil = oil > 0 ? Math.round(sourdoughFlour * (oil / 100)) : 0

  return {
    flour: sourdoughFlour,
    water: sourdoughWater,
    starter: sourdoughStarter,
    salt: sourdoughSalt,
    sugar: sourdoughSugar,
    oil: sourdoughOil,
    total: doughBallWeight * numberOfBalls,
  }
}

// Convert weight to volume
export function convertToVolume(ingredients: { [key: string]: number }): { [key: string]: string } {
  const result: { [key: string]: string } = {}

  // Convert flour from grams to cups
  if (ingredients.flour) {
    const cups = ingredients.flour / conversionFactors.flourGramsToCups
    result.flour = `${Math.floor(cups)} ${cups % 1 >= 0.75 ? "3/4" : cups % 1 >= 0.5 ? "1/2" : cups % 1 >= 0.25 ? "1/4" : ""} cups`
  }

  // Convert water from grams to cups
  if (ingredients.water) {
    const cups = ingredients.water / conversionFactors.waterGramsToCups
    result.water = `${Math.floor(cups)} ${cups % 1 >= 0.75 ? "3/4" : cups % 1 >= 0.5 ? "1/2" : cups % 1 >= 0.25 ? "1/4" : ""} cups`
  }

  // Convert yeast from grams to teaspoons
  if (ingredients.yeast) {
    const tsp = ingredients.yeast / conversionFactors.yeastGramsToTsp
    if (tsp < 0.125) {
      result.yeast = "Pinch"
    } else {
      result.yeast = `${tsp >= 1 ? Math.floor(tsp) : ""} ${tsp % 1 >= 0.75 ? "3/4" : tsp % 1 >= 0.5 ? "1/2" : tsp % 1 >= 0.25 ? "1/4" : tsp < 1 ? "1/8" : ""} tsp`
    }
  }

  // Convert salt from grams to teaspoons
  if (ingredients.salt) {
    const tsp = ingredients.salt / conversionFactors.saltGramsToTsp
    result.salt = `${tsp >= 1 ? Math.floor(tsp) : ""} ${tsp % 1 >= 0.75 ? "3/4" : tsp % 1 >= 0.5 ? "1/2" : tsp % 1 >= 0.25 ? "1/4" : tsp < 1 ? "1/8" : ""} tsp`
  }

  // Convert sugar from grams to teaspoons
  if (ingredients.sugar) {
    const tsp = ingredients.sugar / conversionFactors.sugarGramsToTsp
    result.sugar = `${tsp >= 1 ? Math.floor(tsp) : ""} ${tsp % 1 >= 0.75 ? "3/4" : tsp % 1 >= 0.5 ? "1/2" : tsp % 1 >= 0.25 ? "1/4" : tsp < 1 ? "1/8" : ""} tsp`
  }

  // Convert oil from grams to teaspoons
  if (ingredients.oil) {
    const tsp = ingredients.oil / conversionFactors.oilGramsToTsp
    if (tsp >= 3) {
      const tbsp = tsp / 3
      result.oil = `${Math.floor(tbsp)} ${tbsp % 1 >= 0.75 ? "3/4" : tbsp % 1 >= 0.5 ? "1/2" : tbsp % 1 >= 0.25 ? "1/4" : ""} Tbsp`
    } else {
      result.oil = `${tsp >= 1 ? Math.floor(tsp) : ""} ${tsp % 1 >= 0.75 ? "3/4" : tsp % 1 >= 0.5 ? "1/2" : tsp % 1 >= 0.25 ? "1/4" : tsp < 1 ? "1/8" : ""} tsp`
    }
  }

  // Convert starter from grams to cups
  if (ingredients.starter) {
    const cups = ingredients.starter / conversionFactors.flourGramsToCups
    result.starter = `${Math.floor(cups)} ${cups % 1 >= 0.75 ? "3/4" : cups % 1 >= 0.5 ? "1/2" : cups % 1 >= 0.25 ? "1/4" : ""} cups`
  }

  // Convert total from grams to ounces
  if (ingredients.total) {
    result.total = `${Math.round(ingredients.total * conversionFactors.gramsToOunces * 10) / 10} oz`
  }

  return result
}

// Convert weight to imperial
export function convertToImperial(ingredients: { [key: string]: number }): { [key: string]: string } {
  const result: { [key: string]: string } = {}

  // Convert all weights from grams to ounces
  for (const [key, value] of Object.entries(ingredients)) {
    if (key === "yeast" && value < 0.1) {
      result[key] = "Trace"
    } else {
      result[key] = `${Math.round(value * conversionFactors.gramsToOunces * 10) / 10} oz`
    }
  }

  return result
}

