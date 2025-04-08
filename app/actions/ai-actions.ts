"use server"

import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

// Mock data for fallback if API has issues
const MOCK_TOPPING_SUGGESTIONS = {
  suggestions: [
    {
      name: "Classic Margherita Plus",
      ingredients: ["Fresh Mozzarella", "San Marzano Tomatoes", "Fresh Basil", "Extra Virgin Olive Oil", "Sea Salt"],
      description: "The timeless Italian classic with premium ingredients for authentic flavor",
      cookingTip: "Drizzle olive oil after baking for the best flavor",
    },
    {
      name: "Veggie Supreme",
      ingredients: ["Bell Peppers", "Red Onions", "Mushrooms", "Black Olives", "Cherry Tomatoes", "Arugula"],
      description: "A colorful medley of fresh vegetables with a peppery finish",
      cookingTip: "Pre-roast the bell peppers and onions for extra sweetness",
    },
    {
      name: "Spicy Mediterranean",
      ingredients: ["Feta Cheese", "Kalamata Olives", "Sun-dried Tomatoes", "Red Chili Flakes", "Oregano"],
      description: "Bold Mediterranean flavors with a spicy kick",
      cookingTip: "Add the feta after baking to maintain its texture",
    },
    {
      name: "Rustic Mushroom",
      ingredients: ["Portobello Mushrooms", "Shiitake Mushrooms", "Thyme", "Garlic", "Truffle Oil"],
      description: "Earthy and aromatic with a luxurious truffle finish",
      cookingTip: "Sauté mushrooms with garlic before adding to pizza",
    },
    {
      name: "Sweet & Savory Delight",
      ingredients: ["Prosciutto", "Caramelized Pears", "Gorgonzola", "Walnuts", "Honey"],
      description: "A perfect balance of sweet fruit, salty meat, and tangy cheese",
      cookingTip: "Add honey as a light drizzle after baking",
    },
  ],
}

export async function generateToppingSuggestions(pizzaType: string, preferences: string, dietaryRestrictions = "") {
  console.log("Generating topping suggestions for:", pizzaType)

  try {
    // Check if API key is available
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      console.log("OpenAI API key not found, using mock data");
      return { success: true, data: MOCK_TOPPING_SUGGESTIONS };
    }
    
    // If API key exists, use the actual API
    const prompt = `
      As a pizza expert, suggest 5 creative topping combinations for a ${pizzaType} style pizza.
      ${preferences ? `The user has these preferences: ${preferences}.` : ""}
      ${dietaryRestrictions ? `Consider these dietary restrictions: ${dietaryRestrictions}.` : ""}
      
      For each suggestion, provide:
      1. A creative name for the topping combination
      2. A list of 4-6 ingredients
      3. A brief description of the flavor profile
      4. A suggested cooking tip
      
      IMPORTANT: Respond with ONLY raw JSON without any markdown formatting, code blocks, or explanations.
      Use this exact structure:
      {
        "suggestions": [
          {
            "name": "Name of combination",
            "ingredients": ["ingredient1", "ingredient2", "ingredient3", "ingredient4"],
            "description": "Brief description of flavors",
            "cookingTip": "A helpful cooking tip"
          }
        ]
      }
    `;

    try {
      const { text } = await generateText({
        model: openai('gpt-4o'),
        prompt,
        temperature: 0.7,
        maxTokens: 1500,
      });

      console.log("Raw AI response:", text);

      // Extract JSON from markdown code blocks if present
      let jsonContent = text;

      // Check if response contains markdown code blocks
      if (text.includes("```")) {
        // Extract content between code blocks
        const match = text.match(/```(?:json)?\s*([\s\S]*?)```/);
        if (match && match[1]) {
          jsonContent = match[1].trim();
        }
      }

      try {
        const parsedResponse = JSON.parse(jsonContent);
        console.log("Successfully parsed response:", parsedResponse);
        return { success: true, data: parsedResponse };
      } catch (parseError) {
        console.error("Failed to parse AI response:", parseError);
        console.error("Content that failed to parse:", jsonContent);
        // Fall back to mock data if parsing fails
        return { success: true, data: MOCK_TOPPING_SUGGESTIONS };
      }
    } catch (apiError) {
      console.error("API call failed:", apiError);
      return { success: true, data: MOCK_TOPPING_SUGGESTIONS };
    }
  } catch (error) {
    console.error("Error generating topping suggestions:", error)
    // Fall back to mock data if API call fails
    return { success: true, data: MOCK_TOPPING_SUGGESTIONS }
  }
}

// Function to save popular AI responses for future reference
export async function savePopularToppings(suggestion: any) {
  // In a real app, this would save to a database
  // For now, we'll just log it
  console.log("Saving popular topping suggestion:", suggestion)
  return { success: true }
}

