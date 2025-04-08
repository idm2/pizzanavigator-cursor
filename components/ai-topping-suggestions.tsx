"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { generateToppingSuggestions, savePopularToppings } from "@/app/actions/ai-actions"
import { Sparkles, Loader2, ThumbsUp, Plus, Check } from "lucide-react"

interface ToppingSuggestion {
  name: string
  ingredients: string[]
  description: string
  cookingTip: string
}

// Update the onSelectToppings prop type to include the topping name
interface AIToppingSuggestionsProps {
  pizzaType: string
  onSelectToppings: (toppings: string[], toppingName: string) => void
  collapsed?: boolean
  onToggleCollapsed?: () => void
}

export function AIToppingSuggestions({ 
  pizzaType, 
  onSelectToppings,
  collapsed = false,
  onToggleCollapsed 
}: AIToppingSuggestionsProps) {
  const [preferences, setPreferences] = useState("")
  const [dietaryRestrictions, setDietaryRestrictions] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [suggestions, setSuggestions] = useState<ToppingSuggestion[]>([])
  const [error, setError] = useState<string | null>(null)
  const [selectedSuggestion, setSelectedSuggestion] = useState<number | null>(null)
  const [likedSuggestions, setLikedSuggestions] = useState<number[]>([])
  const [activeTab, setActiveTab] = useState("generate")

  const handleGenerate = async () => {
    setIsGenerating(true)
    setError(null)

    try {
      // Add a slight delay to simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const result = await generateToppingSuggestions(pizzaType, preferences, dietaryRestrictions)
      console.log("Generated suggestions:", result)

      if (result.success && result.data?.suggestions) {
        setSuggestions(result.data.suggestions)
        setSelectedSuggestion(null)
        // Switch to results tab after successful generation
        setActiveTab("results")
      } else {
        setError("Failed to generate suggestions. Please try again.")
      }
    } catch (err) {
      console.error("Error in handleGenerate:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  // And update the handleSelectSuggestion function to pass the topping name
  const handleSelectSuggestion = (index: number) => {
    setSelectedSuggestion(index)
    // Extract just the ingredient names for the pizza creation flow
    // And also pass the topping name
    onSelectToppings(suggestions[index].ingredients, suggestions[index].name)
  }

  const handleLikeSuggestion = async (index: number) => {
    if (!likedSuggestions.includes(index)) {
      setLikedSuggestions([...likedSuggestions, index])
      // Save this suggestion as popular for future reference
      await savePopularToppings(suggestions[index])
    }
  }

  const formatPizzaType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1).replace(/-/g, " ")
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <h3 className="text-lg font-medium text-white flex items-center justify-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-400" />
          AI Topping Suggestions
        </h3>
        <p className="text-sm text-white/70">Get creative topping ideas for your {formatPizzaType(pizzaType)} pizza</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4 bg-gray-100 dark:bg-[#1a202c]/50">
          <TabsTrigger value="generate" className="data-[state=active]:bg-pizza-orange data-[state=active]:text-white">
            Generate Ideas
          </TabsTrigger>
          <TabsTrigger
            value="results"
            className="data-[state=active]:bg-pizza-orange data-[state=active]:text-white"
            disabled={suggestions.length === 0}
          >
            Suggestions ({suggestions.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="preferences" className="text-white">
              Your Preferences (optional)
            </Label>
            <Textarea
              id="preferences"
              placeholder="E.g., I love spicy food, prefer vegetables, enjoy sweet and savory combinations..."
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              className="bg-pizza-charcoal border-pizza-orange/30 text-white resize-none h-24"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dietary-restrictions" className="text-white">
              Dietary Restrictions (optional)
            </Label>
            <Textarea
              id="dietary-restrictions"
              placeholder="E.g., vegetarian, vegan, gluten-free, no dairy, allergic to nuts..."
              value={dietaryRestrictions}
              onChange={(e) => setDietaryRestrictions(e.target.value)}
              className="bg-pizza-charcoal border-pizza-orange/30 text-white resize-none h-24"
            />
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-2.5"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating Suggestions...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Get AI Topping Ideas
              </>
            )}
          </Button>

          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          {suggestions.length > 0 ? (
            <div className="space-y-4">
              {suggestions.map((suggestion, index) => (
                <Card
                  key={index}
                  className={`theme-card-bg transition-all ${
                    selectedSuggestion === index
                      ? "border-pizza-orange ring-1 ring-pizza-orange"
                      : "border-pizza-orange/20"
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-white">{suggestion.name}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLikeSuggestion(index)}
                        disabled={likedSuggestions.includes(index)}
                        className="text-white/70 hover:text-white hover:bg-pizza-orange/20 h-8 w-8 p-0"
                      >
                        <ThumbsUp
                          className={`h-4 w-4 ${likedSuggestions.includes(index) ? "text-pizza-orange" : ""}`}
                        />
                      </Button>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-white/70 mb-1">Ingredients:</p>
                      <div className="flex flex-wrap gap-1">
                        {suggestion.ingredients.map((ingredient, i) => (
                          <span
                            key={i}
                            className="text-xs bg-pizza-orange/20 text-pizza-orange px-2 py-0.5 rounded-full"
                          >
                            {ingredient}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-sm text-white/70 mb-2">{suggestion.description}</p>

                    <div className="bg-[#1a202c]/50 p-2 rounded-md">
                      <p className="text-xs text-white/80 italic">
                        <span className="font-medium">Tip:</span> {suggestion.cookingTip}
                      </p>
                    </div>

                    <Button
                      onClick={() => handleSelectSuggestion(index)}
                      className={`w-full mt-3 ${
                        selectedSuggestion === index ? "bg-green-600 hover:bg-green-700" : "bright-orange-btn"
                      }`}
                    >
                      {selectedSuggestion === index ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Selected
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4 mr-2" />
                          Use These Toppings
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-white/70">Generate some topping suggestions to see results here.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

