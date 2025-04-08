import { pizzaTypes } from "@/data/pizza-calculator-data";

// Define pizza shape types
export type PizzaShape = "round" | "pan";
export type OvenType = "conventional" | "pizza-stone" | "pizza-oven";

// Function to determine if a pizza is a pan pizza or round pizza
export function getPizzaShape(pizzaTypeId: string): PizzaShape {
  // Pan pizza styles include various square/rectangular options
  const panPizzaTypes = ["detroit", "sicilian", "roman", "grandma", "chicago-deep-dish"];
  return panPizzaTypes.includes(pizzaTypeId) ? "pan" : "round";
}

// Get cooking instructions based on pizza type and oven type
export function getCookingInstructions(pizzaTypeId: string, ovenType: OvenType) {
  const pizzaShape = getPizzaShape(pizzaTypeId);
  const pizzaTypeData = pizzaTypes.find(type => type.id === pizzaTypeId);
  
  // Get cooking times and temperatures based on oven type
  let temperature = "";
  let cookingTime = "";
  
  if (pizzaTypeData) {
    if (ovenType === "pizza-oven") {
      temperature = pizzaTypeData.pizzaOvenTemp;
      cookingTime = pizzaTypeData.pizzaOvenTime;
    } else {
      // For both conventional and pizza stone (same temperature, but different instructions)
      temperature = pizzaTypeData.homeOvenTemp;
      cookingTime = pizzaTypeData.homeOvenTime;
    }
  }
  
  return generateCookingSteps(pizzaShape, ovenType, temperature, cookingTime, pizzaTypeId);
}

// Generate step-by-step cooking instructions
function generateCookingSteps(pizzaShape: PizzaShape, ovenType: OvenType, temperature: string, cookingTime: string, pizzaTypeId: string) {
  const steps = [];
  
  // Step 1: Preheat oven
  steps.push({
    id: "1",
    title: `Preheat your ${formatOvenName(ovenType)}`,
    description: getPreheatInstructions(ovenType, temperature, pizzaTypeId),
    time: ovenType === "conventional" ? "30-45 min" : "45-60 min",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/baking-pizza-wood-fired-oven.jpg-u8O9MAiXoKys1uV2257tvifDFnCMhz.jpeg",
  });
  
  // Step 2: Prepare dough
  if (pizzaShape === "pan") {
    steps.push({
      id: "2",
      title: "Take pan out of refrigerator",
      description: "Take the pan with dough out of the refrigerator 1-2 hours before baking to let it come to room temperature.",
      time: "1-2 hours",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/homemade-pizza-food-photography-recipe-idea.jpg-lcL048hSYQxzw4lOm673otr7ONW8s8.jpeg",
    });
  } else {
    steps.push({
      id: "2",
      title: "Remove dough balls from refrigerator",
      description: "Take the dough balls out of the refrigerator 1-2 hours before baking to let them come to room temperature.",
      time: "1-2 hours",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/homemade-pizza-food-photography-recipe-idea.jpg-lcL048hSYQxzw4lOm673otr7ONW8s8.jpeg",
    });
  }
  
  // For round pizzas, include work surface preparation
  if (pizzaShape === "round") {
    // Step 3: Prepare work surface
    steps.push({
      id: "3",
      title: "Prepare your work surface",
      description: "Dust your work surface and hands with flour to prevent sticking.",
      time: "2 min",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/top-view-fluffy-pizza-with-mushrooms.jpg-QWfalvqZ5hdqNmcY0k9ano5DN69zkn.jpeg",
    });
    
    // Step 4: Shape the dough (only for round pizzas)
    steps.push({
      id: "4",
      title: "Shape the dough",
      description: "Gently press the dough from the center outward, leaving a slightly thicker edge for the crust. Using your knuckles, stretch the dough to your desired size.",
      time: "5-10 min",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/top-view-fluffy-pizza-with-mushrooms.jpg-QWfalvqZ5hdqNmcY0k9ano5DN69zkn.jpeg",
    });
    
    // Step 5: Transfer to peel or baking sheet (only for round pizzas)
    if (ovenType !== "conventional") {
      steps.push({
        id: "5",
        title: "Transfer to pizza peel",
        description: "Transfer the shaped dough to a floured pizza peel, making sure it slides easily.",
        time: "1 min",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/top-view-fluffy-pizza-with-mushrooms.jpg-QWfalvqZ5hdqNmcY0k9ano5DN69zkn.jpeg",
      });
    } else {
      steps.push({
        id: "5",
        title: "Transfer to baking sheet",
        description: "Transfer the shaped dough to a lightly oiled baking sheet or parchment paper.",
        time: "1 min",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/top-view-fluffy-pizza-with-mushrooms.jpg-QWfalvqZ5hdqNmcY0k9ano5DN69zkn.jpeg",
      });
    }
  }
  
  // Add sauce and toppings step (for both types with different IDs based on previous steps)
  const nextId = pizzaShape === "round" ? "6" : "3";
  
  // Special sauce application for detroit-style and similar pizzas
  const needsSpecialSauceApplication = ["detroit", "chicago-deep-dish"].includes(pizzaTypeId);
  
  if (needsSpecialSauceApplication) {
    steps.push({
      id: nextId,
      title: "Add cheese and sauce",
      description: `For ${formatPizzaType(pizzaTypeId)} pizza, place cubed cheese (preferably a mix of mozzarella and cheddar) evenly across the dough, especially around the edges. Add sauce in stripes on top of the cheese.`,
      time: "2 min",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mixed-pizza-sausages-chicken-arugula-olives-cheese-pepper-top-view.jpg-rv7CVTUW049mp6Ht6fBkJBhFdWFzHI.jpeg",
    });
  } else {
    steps.push({
      id: nextId,
      title: "Add sauce",
      description: "Spread a thin layer of tomato sauce over the dough, leaving the edge bare for the crust.",
      time: "1 min",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mixed-pizza-sausages-chicken-arugula-olives-cheese-pepper-top-view.jpg-rv7CVTUW049mp6Ht6fBkJBhFdWFzHI.jpeg",
    });
  
    // Add cheese and toppings (for standard application pizzas)
    steps.push({
      id: (parseInt(nextId) + 1).toString(),
      title: "Add cheese and toppings",
      description: "Add mozzarella and your selected toppings, being careful not to overload the pizza.",
      time: "2 min",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mixed-pizza-sausages-chicken-arugula-olives-cheese-pepper-top-view.jpg-rv7CVTUW049mp6Ht6fBkJBhFdWFzHI.jpeg",
    });
  }
  
  // Bake the pizza (with ID adjusted based on previous steps)
  const bakeId = pizzaShape === "round" ? "8" : (needsSpecialSauceApplication ? "4" : "5");
  
  steps.push({
    id: bakeId,
    title: "Bake the pizza",
    description: getBakingInstructions(pizzaShape, ovenType, cookingTime, pizzaTypeId),
    time: ovenType === "pizza-oven" 
      ? (pizzaShape === "pan" ? "5-6 minutes" : "60-90 seconds") 
      : cookingTime.split(' ')[0],
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/side-view-chef-baking-delicious-pizza.jpg-jpo4QqmEVGIhejh97qKhRZWc9OOMfi.jpeg",
  });
  
  // Let it rest (with ID adjusted based on previous steps)
  const restId = pizzaShape === "round" ? "9" : (needsSpecialSauceApplication ? "5" : "6");
  
  steps.push({
    id: restId,
    title: "Let it rest briefly",
    description: getPizzaShape(pizzaTypeId) === "pan" 
      ? "Allow the pizza to cool in the pan for a few minutes before removing. This helps the cheese and toppings set."
      : "Remove from the oven and immediately add fresh basil leaves and a drizzle of olive oil if desired.",
    time: "1-2 min",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/close-up-pizza.jpg-4oaf8cBN7m18R9Kq4ILzxAKfPHFW6j.jpeg",
  });
  
  // Slice and serve (with ID adjusted based on previous steps)
  const sliceId = pizzaShape === "round" ? "10" : (needsSpecialSauceApplication ? "6" : "7");
  
  steps.push({
    id: sliceId,
    title: "Slice and serve",
    description: pizzaShape === "pan" 
      ? "Slice into squares and serve immediately while hot." 
      : "Slice into triangles and serve immediately while hot.",
    time: "1 min",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pizza-margarita-table.jpg-BPhVqWJtWoGWJcAPX3eFeOj6P4d3EV.jpeg",
  });
  
  return steps;
}

// Helper functions
function formatOvenName(ovenType: OvenType): string {
  switch (ovenType) {
    case "conventional":
      return "conventional oven";
    case "pizza-stone":
      return "oven with pizza stone";
    case "pizza-oven":
      return "pizza oven";
    default:
      return "oven";
  }
}

function getPreheatInstructions(ovenType: OvenType, temperature: string, pizzaTypeId: string): string {
  const pizzaTypeData = pizzaTypes.find(type => type.id === pizzaTypeId);
  
  switch (ovenType) {
    case "conventional":
      return `Preheat your oven to ${temperature}.`;
    case "pizza-stone":
      return `Place your pizza stone on the lowest rack of your oven and preheat to ${temperature}. Allow at least 45-60 minutes for the stone to fully heat up.`;
    case "pizza-oven":
      // Use temperature range of 400-460°C for pizza ovens
      return `Preheat your pizza oven to at least 400°C (750°F). For best results, aim for 400-460°C (750-860°F) if your oven can reach these temperatures. Use an infrared thermometer to verify the cooking surface temperature if available.`;
    default:
      return `Preheat your oven to ${temperature}.`;
  }
}

function getBakingInstructions(pizzaShape: PizzaShape, ovenType: OvenType, cookingTime: string, pizzaTypeId: string): string {
  const pizzaTypeData = pizzaTypes.find(type => type.id === pizzaTypeId);
  // For conventional and pizza stone, get the time from the data
  let timeInfo = cookingTime;
  
  // Make sure we have valid time info for conventional ovens
  if (pizzaTypeData && ovenType !== "pizza-oven") {
    timeInfo = pizzaTypeData.homeOvenTime;
  }
  
  if (pizzaShape === "pan") {
    switch (ovenType) {
      case "pizza-oven":
        // Always use about 5 minutes for pizza ovens with pan pizzas
        return `Place the pan in your pizza oven and bake for about 5-6 minutes. Turn the pan halfway through cooking for even browning. The high heat of the pizza oven will cook the pizza much faster than a conventional oven.`;
      case "pizza-stone":
        return `Place the pan directly on the preheated pizza stone and bake for ${timeInfo}. Rotate halfway through for even cooking.`;
      default:
        return `Place the pan on the bottom rack of your oven and bake for ${timeInfo}. Rotate halfway through for even cooking.`;
    }
  } else { // Round pizza
    switch (ovenType) {
      case "pizza-oven":
        // Always use 60-90 seconds for regular pizzas in pizza ovens
        return `Slide the pizza off the peel and into your pizza oven. Turn the pizza every 20-30 seconds to ensure even baking. Cook for about 60-90 seconds until the crust is charred in spots and the cheese is bubbly. The extremely high heat will cook the pizza very quickly.`;
      case "pizza-stone":
        return `Slide the pizza off the peel onto the preheated stone. Bake for ${timeInfo}, or until the crust is golden and the cheese is bubbly.`;
      default:
        return `Place the pizza in the middle rack of your oven and bake for ${timeInfo}, or until the crust is golden and the cheese is bubbly.`;
    }
  }
}

// Helper function to format the pizza type name for display
function formatPizzaType(type: string): string {
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
    case "roman":
      return "Roman"
    case "chicago-deep-dish":
      return "Chicago Deep-Dish"
    case "thin-n-crispy":
      return "Thin & Crispy"
    case "california":
      return "California"
    case "greek":
      return "Greek"
    case "st-louis":
      return "St. Louis"
    case "new-haven":
      return "New Haven"
    case "trenton-tomato-pie":
      return "Trenton Tomato Pie"
    default:
      // Capitalize first letter and replace hyphens with spaces for any other pizza types
      return type.charAt(0).toUpperCase() + type.slice(1).replace(/-/g, " ")
  }
} 