"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, Sparkles, Loader2, Copy, ShoppingBag, Clock } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface AIGeneratedRecipe {
  title: string
  description: string
  pizzaType: string
  servings: number
  prepTime: string
  cookTime: string
  totalTime: string
  ingredients: {
    dough?: string[]
    sauce?: string[]
    toppings: string[]
  }
  instructions: {
    dough?: string[]
    sauce?: string[]
    assembly: string[]
    cooking: string[]
  }
  tips: string[]
}

// Mock function for AI recipe generation
const generateRecipe = async (prompt: string): Promise<AIGeneratedRecipe> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Check  => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Check if the prompt mentions having dough already
  const hasDough =
    prompt.toLowerCase().includes("already have dough") ||
    prompt.toLowerCase().includes("have my own dough") ||
    prompt.toLowerCase().includes("using store-bought dough")

  // Parse the prompt for timing information
  const timeMatch = prompt.match(/(\d+)\s*hours?/i)
  const readyTime = timeMatch ? Number.parseInt(timeMatch[1]) : 6 // Default to 6 hours if not specified

  // Sample response (in a real app, this would come from an AI service)
  return {
    title: "Homemade Pepperoni Pan Pizza",
    description:
      "A delicious pan-style pizza with a crispy bottom, fluffy interior, and classic pepperoni topping. Perfect for a family dinner.",
    pizzaType: "Pan Pizza",
    servings: 4,
    prepTime: hasDough ? "20 minutes" : "30 minutes",
    cookTime: "15 minutes",
    totalTime: hasDough ? `${readyTime} hours 35 minutes` : `${readyTime} hours 45 minutes`,
    ingredients: {
      dough: hasDough
        ? undefined
        : ["500g bread flour", "325g water (65% hydration)", "10g salt (2%)", "3g instant yeast", "15g olive oil (3%)"],
      sauce: [
        "1 can (400g) San Marzano tomatoes",
        "2 cloves garlic, minced",
        "1 tbsp olive oil",
        "1 tsp dried oregano",
        "1/2 tsp salt",
      ],
      toppings: [
        "200g mozzarella cheese, shredded",
        "100g pepperoni slices",
        "2 tbsp olive oil (for the pan)",
        "Fresh basil leaves (optional)",
        "Grated parmesan for serving (optional)",
      ],
    },
    instructions: {
      dough: hasDough
        ? undefined
        : [
            "In a large bowl, combine flour and salt.",
            "In a separate container, mix water and yeast until dissolved.",
            "Pour the water mixture into the flour and mix until no dry flour remains.",
            "Cover and let rest for 20 minutes (autolyse).",
            "Add olive oil and knead for 5-10 minutes until smooth and elastic.",
            `Cover and let rise at room temperature for ${readyTime - 2} hours.`,
            "Divide into 4 equal portions and shape into balls.",
            "Place in a well-oiled pan, cover, and let rise for another 2 hours.",
          ],
      sauce: [
        "Crush tomatoes by hand or blend briefly for a smoother consistency.",
        "Mix with minced garlic, olive oil, oregano, and salt.",
        "Let sit for at least 30 minutes to develop flavor.",
      ],
      assembly: [
        "Preheat oven to 500°F (260°C) or as high as it will go.",
        "Gently press the dough to fill the pan, maintaining air in the dough.",
        "Spread a thin layer of sauce over the dough.",
        "Sprinkle with shredded mozzarella cheese.",
      ],
      cooking: [
        "Bake on the bottom rack for 12-15 minutes until the crust is golden and cheese is bubbly.",
        "Remove from oven and let rest for 5 minutes.",
        "Garnish with fresh basil and grated parmesan if desired.",
        "Slice and serve hot.",
      ],
    },
    tips: [
      "For extra flavor, add a drizzle of olive oil and a sprinkle of oregano on top before baking.",
      "If using store-bought dough, let it come to room temperature for at least 1 hour before using.",
      "For a crispier crust, preheat the pan in the oven before adding the dough.",
      "This recipe works well with any toppings - feel free to substitute with your favorites!",
    ],
  }
}

export function CreateWithAI() {
  const { toast } = useToast()
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [recipe, setRecipe] = useState<AIGeneratedRecipe | null>(null)
  const [activeTab, setActiveTab] = useState("ingredients")

  const handleGenerateRecipe = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a description",
        description: "Tell us what kind of pizza you'd like to make.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    try {
      const generatedRecipe = await generateRecipe(prompt)
      setRecipe(generatedRecipe)
      setActiveTab("ingredients")
    } catch (error) {
      toast({
        title: "Error generating recipe",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  // Handle copy to clipboard
  const handleCopy = () => {
    if (!recipe) return

    let recipeText = `${recipe.title}\n\n`
    recipeText += `${recipe.description}\n\n`
    recipeText += `Servings: ${recipe.servings}\n`
    recipeText += `Prep Time: ${recipe.prepTime}\n`
    recipeText += `Cook Time: ${recipe.cookTime}\n`
    recipeText += `Total Time: ${recipe.totalTime}\n\n`

    recipeText += "INGREDIENTS:\n"
    if (recipe.ingredients.dough) {
      recipeText += "Dough:\n"
      recipe.ingredients.dough.forEach((item) => {
        recipeText += `- ${item}\n`
      })
      recipeText += "\n"
    }

    if (recipe.ingredients.sauce) {
      recipeText += "Sauce:\n"
      recipe.ingredients.sauce.forEach((item) => {
        recipeText += `- ${item}\n`
      })
      recipeText += "\n"
    }

    recipeText += "Toppings:\n"
    recipe.ingredients.toppings.forEach((item) => {
      recipeText += `- ${item}\n`
    })
    recipeText += "\n"

    recipeText += "INSTRUCTIONS:\n"
    if (recipe.instructions.dough) {
      recipeText += "Dough:\n"
      recipe.instructions.dough.forEach((step, index) => {
        recipeText += `${index + 1}. ${step}\n`
      })
      recipeText += "\n"
    }

    if (recipe.instructions.sauce) {
      recipeText += "Sauce:\n"
      recipe.instructions.sauce.forEach((step, index) => {
        recipeText += `${index + 1}. ${step}\n`
      })
      recipeText += "\n"
    }

    recipeText += "Assembly:\n"
    recipe.instructions.assembly.forEach((step, index) => {
      recipeText += `${index + 1}. ${step}\n`
    })
    recipeText += "\n"

    recipeText += "Cooking:\n"
    recipe.instructions.cooking.forEach((step, index) => {
      recipeText += `${index + 1}. ${step}\n`
    })
    recipeText += "\n"

    recipeText += "TIPS:\n"
    recipe.tips.forEach((tip, index) => {
      recipeText += `- ${tip}\n`
    })

    navigator.clipboard.writeText(recipeText)
    toast({
      title: "Recipe copied to clipboard",
      description: "You can now paste it anywhere you need.",
    })
  }

  // Add to shopping list
  const addToShoppingList = () => {
    if (!recipe) return

    const allIngredients = [
      ...(recipe.ingredients.dough || []),
      ...(recipe.ingredients.sauce || []),
      ...recipe.ingredients.toppings,
    ]

    toast({
      title: "Added to shopping list",
      description: `${allIngredients.length} items added to your shopping list.`,
    })
  }

  return (
    <div className="flex flex-col min-h-screen slate-bg pb-16">
      <header className="sticky top-0 bg-pizza-charcoal border-b border-pizza-orange/20 z-10">
        <div className="container px-4 py-3 mx-auto max-w-md flex items-center">
          <Link href="/" className="mr-2">
            <ChevronLeft className="h-5 w-5 text-white" />
          </Link>
          <div className="flex items-center flex-1">
            <img src="/images/pizza-navigator-icon.png" alt="Pizza Navigator" className="h-6 w-6 mr-2" />
            <h1 className="text-lg font-semibold text-white">Create with AI</h1>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container px-4 py-6 mx-auto max-w-md">
          <Card className="mb-6 bg-pizza-charcoal/80 border-pizza-orange/20">
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <label htmlFor="recipe-prompt" className="block text-white font-medium">
                  Describe the pizza you want to make
                </label>
                <Textarea
                  id="recipe-prompt"
                  placeholder="E.g., Create a pan based pizza for 4 people with a pepperoni type topping. I would like the pizza to be ready within 6 hours."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="bg-pizza-charcoal border-pizza-orange/30 text-white resize-none h-32"
                />
                <p className="text-xs text-white/60">
                  Tip: Include details like pizza style, number of people, toppings, and time constraints. Mention if
                  you already have dough. Perhaps also mention the oven you will be using for better results.
                </p>
              </div>

              <Button
                onClick={handleGenerateRecipe}
                disabled={isGenerating || !prompt.trim()}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-2.5"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating Recipe...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Pizza Recipe
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {recipe && (
            <div className="space-y-6">
              <Card className="bg-pizza-charcoal/80 border-pizza-orange/20">
                <CardContent className="p-4">
                  <h2 className="text-xl font-bold text-white mb-1">{recipe.title}</h2>
                  <p className="text-sm text-white/70 mb-4">{recipe.description}</p>

                  <div className="flex flex-wrap gap-3 mb-4">
                    <div className="bg-pizza-orange/10 px-3 py-1.5 rounded-full flex items-center">
                      <Clock className="h-3.5 w-3.5 text-pizza-orange mr-1.5" />
                      <span className="text-xs text-white">{recipe.totalTime}</span>
                    </div>
                    <div className="bg-pizza-orange/10 px-3 py-1.5 rounded-full flex items-center">
                      <span className="text-xs text-white">Serves {recipe.servings}</span>
                    </div>
                    <div className="bg-pizza-orange/10 px-3 py-1.5 rounded-full flex items-center">
                      <span className="text-xs text-white">{recipe.pizzaType}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1 border-pizza-orange/50 text-white hover:bg-pizza-orange/20"
                      onClick={handleCopy}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Recipe
                    </Button>
                    <Button
                      className="flex-1 bg-pizza-orange hover:bg-pizza-orange/80 text-white"
                      onClick={addToShoppingList}
                    >
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Add to Shopping List
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger
                    value="ingredients"
                    className="data-[state=active]:bg-pizza-orange data-[state=active]:text-white"
                  >
                    Ingredients
                  </TabsTrigger>
                  <TabsTrigger
                    value="instructions"
                    className="data-[state=active]:bg-pizza-orange data-[state=active]:text-white"
                  >
                    Instructions
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="ingredients" className="space-y-4">
                  {recipe.ingredients.dough && (
                    <Card className="bg-pizza-charcoal/80 border-pizza-orange/20">
                      <CardContent className="p-4">
                        <h3 className="font-medium text-white mb-3">Dough</h3>
                        <ul className="space-y-2">
                          {recipe.ingredients.dough.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-pizza-orange mr-2">•</span>
                              <span className="text-sm text-white/80">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {recipe.ingredients.sauce && (
                    <Card className="bg-pizza-charcoal/80 border-pizza-orange/20">
                      <CardContent className="p-4">
                        <h3 className="font-medium text-white mb-3">Sauce</h3>
                        <ul className="space-y-2">
                          {recipe.ingredients.sauce.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-pizza-orange mr-2">•</span>
                              <span className="text-sm text-white/80">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  <Card className="bg-pizza-charcoal/80 border-pizza-orange/20">
                    <CardContent className="p-4">
                      <h3 className="font-medium text-white mb-3">Toppings</h3>
                      <ul className="space-y-2">
                        {recipe.ingredients.toppings.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-pizza-orange mr-2">•</span>
                            <span className="text-sm text-white/80">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="instructions" className="space-y-4">
                  {recipe.instructions.dough && (
                    <Card className="bg-pizza-charcoal/80 border-pizza-orange/20">
                      <CardContent className="p-4">
                        <h3 className="font-medium text-white mb-3">Dough</h3>
                        <ol className="space-y-3">
                          {recipe.instructions.dough.map((step, index) => (
                            <li key={index} className="flex">
                              <span className="text-pizza-orange font-medium mr-2">{index + 1}.</span>
                              <span className="text-sm text-white/80">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </CardContent>
                    </Card>
                  )}

                  {recipe.instructions.sauce && (
                    <Card className="bg-pizza-charcoal/80 border-pizza-orange/20">
                      <CardContent className="p-4">
                        <h3 className="font-medium text-white mb-3">Sauce</h3>
                        <ol className="space-y-3">
                          {recipe.instructions.sauce.map((step, index) => (
                            <li key={index} className="flex">
                              <span className="text-pizza-orange font-medium mr-2">{index + 1}.</span>
                              <span className="text-sm text-white/80">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </CardContent>
                    </Card>
                  )}

                  <Card className="bg-pizza-charcoal/80 border-pizza-orange/20">
                    <CardContent className="p-4">
                      <h3 className="font-medium text-white mb-3">Assembly</h3>
                      <ol className="space-y-3">
                        {recipe.instructions.assembly.map((step, index) => (
                          <li key={index} className="flex">
                            <span className="text-pizza-orange font-medium mr-2">{index + 1}.</span>
                            <span className="text-sm text-white/80">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </CardContent>
                  </Card>

                  <Card className="bg-pizza-charcoal/80 border-pizza-orange/20">
                    <CardContent className="p-4">
                      <h3 className="font-medium text-white mb-3">Cooking</h3>
                      <ol className="space-y-3">
                        {recipe.instructions.cooking.map((step, index) => (
                          <li key={index} className="flex">
                            <span className="text-pizza-orange font-medium mr-2">{index + 1}.</span>
                            <span className="text-sm text-white/80">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </CardContent>
                  </Card>

                  <Card className="bg-pizza-charcoal/80 border-pizza-orange/20">
                    <CardContent className="p-4">
                      <h3 className="font-medium text-white mb-3">Tips</h3>
                      <ul className="space-y-2">
                        {recipe.tips.map((tip, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-pizza-orange mr-2">•</span>
                            <span className="text-sm text-white/80">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

