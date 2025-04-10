// Pizza type lookup table with all necessary values
export const pizzaTypes = [
  {
    id: "neapolitan",
    name: "Neapolitan",
    doughWeightCM: 0.34262591,
    doughWeightInch: 2.210485321,
    hydration: 65,
    salt: 2,
    oil: 0,
    sugar: 0,
    flourType: "Type 00",
    pizzaOvenTemp: "800-900°F (430-480°C)",
    pizzaOvenTime: "90 seconds - 2 mins",
    homeOvenTemp: "500°F (260°C) or as high as your oven goes",
    homeOvenTime: "8-10 minutes",
  },
  {
    id: "new-york",
    name: "New York",
    doughWeightCM: 0.3524152217,
    doughWeightInch: 2.273642044,
    hydration: 65,
    salt: 3,
    oil: 4,
    sugar: 2,
    flourType: "Bread Flour",
    pizzaOvenTemp: "650-700°F (340-370°C)",
    pizzaOvenTime: "4-5 minutes",
    homeOvenTemp: "475-500°F (245-260°C)",
    homeOvenTime: "12-15 minutes",
  },
  {
    id: "thin-n-crispy",
    name: "Thin n Crispy",
    doughWeightCM: 0.2478995328,
    doughWeightInch: 1.586042339,
    hydration: 50,
    salt: 2,
    oil: 5,
    sugar: 2,
    flourType: "Bread Flour",
    pizzaOvenTemp: "530-570°F (280-300°C)",
    pizzaOvenTime: "5 minutes",
    homeOvenTemp: "530-570°F (280-300°C)",
    homeOvenTime: "8 minutes",
  },
  {
    id: "detroit",
    name: "Detroit",
    doughWeightCM: 0.5923226132,
    doughWeightInch: 3.821428571,
    hydration: 75,
    salt: 2,
    oil: 5,
    sugar: 2,
    flourType: "Bread Flour",
    pizzaOvenTemp: "650°F (345°C)",
    pizzaOvenTime: "9-11 minutes (3 minutes for par-baking, followed by 6-8 minutes with toppings)",
    homeOvenTemp: "475-500°F (245-260°C)",
    homeOvenTime: "12-15 minutes",
  },
  {
    id: "chicago-deep-dish",
    name: "Chicago Deep-Dish",
    doughWeightCM: 0.8357026639,
    doughWeightInch: 5.391619307,
    hydration: 55,
    salt: 2,
    sugar: 2,
    oil: 6,
    butter: 6,
    cornmeal: 8,
    flourType: "All Purpose & Bread",
    pizzaOvenTemp: "500˚F (260˚C)",
    pizzaOvenTime: "25 mins (turning every 3-4 minutes)",
    homeOvenTemp: "425-450°F (220-230°C)",
    homeOvenTime: "25-35 minutes",
  },
  {
    id: "sicilian",
    name: "Sicilian",
    doughWeightCM: 0.6623944872,
    doughWeightInch: 4.273504274,
    hydration: 75,
    salt: 2,
    sugar: 2,
    oil: 4,
    flourType: "Bread Flour",
    pizzaOvenTemp: "500°F (260°C)",
    pizzaOvenTime: "15-20 minutes",
    homeOvenTemp: "450°F (230°C)",
    homeOvenTime: "20-25 minutes",
  },
  {
    id: "greek",
    name: "Greek Pizza",
    doughWeightCM: 0.4460167046,
    doughWeightInch: 2.877521371,
    hydration: 60,
    salt: 2,
    sugar: 2,
    oil: 6,
    flourType: "Bread Flour",
    pizzaOvenTemp: "500°F (260°C)",
    pizzaOvenTime: "12-15 minutes",
    homeOvenTemp: "450°F (230°C)",
    homeOvenTime: "15-20 minutes",
  },
  {
    id: "grandma",
    name: "Grandma Pizza",
    doughWeightCM: 0.4270416704,
    doughWeightInch: 2.755102041,
    hydration: 70,
    salt: 2,
    sugar: 2,
    oil: 4,
    flourType: "Bread Flour",
    pizzaOvenTemp: "500°F (260°C)",
    pizzaOvenTime: "12-15 minutes",
    homeOvenTemp: "450°F (230°C)",
    homeOvenTime: "15-20 minutes",
  },
  {
    id: "roman",
    name: "Roman Style Pizza",
    doughWeightCM: 0.439167545,
    doughWeightInch: 2.833333333,
    hydration: 80,
    salt: 2,
    oil: 5,
    sugar: 0,
    flourType: "Type 00 & Bread Flour",
    pizzaOvenTemp: "580°F (300°C)",
    pizzaOvenTime: "3-4 minutes",
    homeOvenTemp: "500°F (260°C)",
    homeOvenTime: "8-10 minutes",
  },
  {
    id: "california",
    name: "California Pizza",
    doughWeightCM: 0.411151092,
    doughWeightInch: 2.652582385,
    hydration: 60,
    salt: 2,
    oil: 3,
    sugar: 0,
    flourType: "Bread Flour",
    sourdoughStarter: 10,
    pizzaOvenTemp: "500°F (260°C)",
    pizzaOvenTime: "8-10 minutes",
    homeOvenTemp: "450°F (230°C)",
    homeOvenTime: "12-15 minutes",
  },
  {
    id: "st-louis",
    name: "St. Louis Style Pizza",
    doughWeightCM: 0.239838137,
    doughWeightInch: 1.547339725,
    hydration: 40,
    salt: 0,
    oil: 10,
    sugar: 0,
    flourType: "Self Raising Flour",
    pizzaOvenTemp: "500°F (260°C)",
    pizzaOvenTime: "8-10 minutes",
    homeOvenTemp: "450°F (230°C)",
    homeOvenTime: "10-12 minutes",
  },
  {
    id: "new-haven",
    name: "New Haven Style",
    doughWeightCM: 0.408,
    doughWeightInch: 2.63,
    hydration: 65,
    salt: 2,
    oil: 1,
    sugar: 0,
    flourType: "Bread Flour",
    pizzaOvenTemp: "650-700°F (340-370°C)",
    pizzaOvenTime: "4-6 minutes",
    homeOvenTemp: "500°F (260°C)",
    homeOvenTime: "10-12 minutes",
  },
  {
    id: "trenton-tomato-pie",
    name: "Trenton Tomato Pie",
    doughWeightCM: 0.282,
    doughWeightInch: 1.82,
    hydration: 60,
    salt: 2,
    oil: 2,
    sugar: 1,
    flourType: "Bread Flour",
    pizzaOvenTemp: "550°F (290°C)",
    pizzaOvenTime: "8-10 minutes",
    homeOvenTemp: "500°F (260°C)",
    homeOvenTime: "12-15 minutes",
  },
]

// Standard pizza sizes
export const pizzaSizes = [
  { id: "10-inch", name: '10" / 25.5 cm', diameter: 10 },
  { id: "11-inch", name: '11" / 28 cm', diameter: 11 },
  { id: "12-inch", name: '12" / 30.5 cm', diameter: 12 },
  { id: "14-inch", name: '14" / 35.5 cm', diameter: 14 },
  { id: "16-inch", name: '16" / 40.5 cm', diameter: 16 },
  { id: "18-inch", name: '18" / 45.5 cm', diameter: 18 },
  { id: "20-inch", name: '20" / 51 cm', diameter: 20 },
  { id: "square-cm", name: "Square / Rectangle (cm)" },
  { id: "square-inch", name: "Square / Rectangle (inches)" },
]

// Starter types
export const starterTypes = [
  { id: "none", name: "None" },
  { id: "sourdough", name: "Sourdough" },
  { id: "poolish", name: "Poolish" },
  { id: "biga", name: "Biga" },
]

// Yeast types
export const yeastTypes = [
  { id: "fresh", name: "Fresh Yeast" },
  { id: "active", name: "Active Dry Yeast" },
  { id: "instant", name: "Instant Dry Yeast" },
]

// Unit display options
export const displayOptions = [
  { id: "weight", name: "Weight (gms)" },
  { id: "volume", name: "Volume (cups)" },
]

// Measurement systems
export const unitOptions = [
  { id: "metric", name: "Metric" },
  { id: "imperial", name: "Imperial" },
]

// Yeast percentage lookup table based on temperature and fermentation time
// This is a simplified version - the full table would be much larger
export const yeastPercentages = {
  // Format: "temperature-hours": percentage
  "22-1": 4.5,
  "22-2": 2.0,
  "22-3": 1.0,
  "22-4": 0.75,
  "22-5": 0.5,
  "22-6": 0.4,
  "22-8": 0.3,
  "22-12": 0.15,
  "22-16": 0.1,
  "22-24": 0.075,
  "22-36": 0.05,
  "22-48": 0.025,
  "22-72": 0.015,

  "20-1": 5.0,
  "20-2": 2.5,
  "20-3": 1.25,
  "20-4": 0.9,
  "20-5": 0.6,
  "20-6": 0.5,
  "20-8": 0.35,
  "20-12": 0.2,
  "20-16": 0.125,
  "20-24": 0.075,
  "20-36": 0.05,
  "20-48": 0.03,
  "20-72": 0.02,

  "24-1": 3.5,
  "24-2": 1.5,
  "24-3": 0.75,
  "24-4": 0.5,
  "24-5": 0.4,
  "24-6": 0.3,
  "24-8": 0.2,
  "24-12": 0.1,
  "24-16": 0.075,
  "24-24": 0.05,
  "24-36": 0.03,
  "24-48": 0.02,
  "24-72": 0.01,

  // Add more temperature-time combinations as needed
}

// Conversion factors for units
export const conversionFactors = {
  flourGramsToCups: 150, // 1 cup of flour = ~150g
  waterGramsToCups: 250, // 1 cup of water = ~250g
  yeastGramsToTsp: 3.5, // 1 tsp of yeast = ~3.5g
  saltGramsToTsp: 5.8, // 1 tsp of salt = ~5.8g
  sugarGramsToTsp: 4.25, // 1 tsp of sugar = ~4.25g
  oilGramsToTsp: 4.6, // 1 tsp of oil = ~4.6g
  gramsToOunces: 0.035274, // 1g = 0.035274oz
  metricToImperialCup: 1.05669, // Conversion factor for cups
}

