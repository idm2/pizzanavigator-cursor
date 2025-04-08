"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ChevronLeft, CalendarDays, Search, Filter, Star, StarOff, Plus } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { SavedPlanCard } from "@/components/saved-plan-card"
import { AddToMealPlannerDialog } from "@/components/add-to-meal-planner-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Types for saved recipes
interface SavedRecipe {
  id: string
  title: string
  type: string
  size: string
  date: string
  pizzaCount: number
  isFavorite: boolean
  image?: string
}

export function SavedRecipesPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [isAddToMealPlannerOpen, setIsAddToMealPlannerOpen] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState<SavedRecipe | null>(null)
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>([])

  // Load saved recipes from localStorage on component mount
  useEffect(() => {
    const loadSavedRecipes = () => {
      try {
        const savedRecipesJson = localStorage.getItem("savedRecipes")
        if (savedRecipesJson) {
          const parsedRecipes = JSON.parse(savedRecipesJson)
          setSavedRecipes(parsedRecipes)
        } else {
          // If no saved recipes exist, initialize with mock data
          const mockRecipes: SavedRecipe[] = [
            {
              id: "neapolitan-medium-123456",
              title: "Weekend Neapolitan",
              type: "neapolitan",
              size: "medium",
              date: "2 days ago",
              pizzaCount: 2,
              isFavorite: true,
              image:
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/white-garlic.jpg-JvqjEtz10rtwwgbhFaAJdLJYF9vL5h.jpeg",
            },
            {
              id: "detroit-large-789012",
              title: "Detroit Party",
              type: "detroit",
              size: "large",
              date: "1 week ago",
              pizzaCount: 4,
              isFavorite: false,
              image:
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BBQ-Pulled-Pork-Detroit-Pizza.jpg-tTTecuMUReFrMNXEO0bzveLPjSH5WN.jpeg",
            },
            {
              id: "new-york-medium-345678",
              title: "NY Style Dinner",
              type: "new-york",
              size: "medium",
              date: "2 weeks ago",
              pizzaCount: 2,
              isFavorite: true,
              image:
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/spicy-sausage.jpg-XO7VZ41qQJEpDO6t7tcPRMq84tHzdI.jpeg",
            },
            {
              id: "sicilian-large-901234",
              title: "Sicilian Family Feast",
              type: "sicilian",
              size: "large",
              date: "3 weeks ago",
              pizzaCount: 3,
              isFavorite: false,
              image:
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Veggie-Supreme-Detroit-Pizza.jpg-CfZE2Qnoa3OmYTN5owVED62BMwj1Gb.jpeg",
            },
          ]
          setSavedRecipes(mockRecipes)
          localStorage.setItem("savedRecipes", JSON.stringify(mockRecipes))
        }
      } catch (error) {
        console.error("Error loading saved recipes:", error)
        toast({
          title: "Error loading saved recipes",
          description: "There was a problem loading your saved recipes.",
          variant: "destructive",
        })
      }
    }

    loadSavedRecipes()
  }, [toast])

  // Filter recipes based on search query and filter type
  const filteredRecipes = savedRecipes.filter((recipe) => {
    const matchesSearch =
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.type.toLowerCase().includes(searchQuery.toLowerCase())

    if (filterType === "all") return matchesSearch
    if (filterType === "favorites") return matchesSearch && recipe.isFavorite
    if (filterType === "neapolitan") return matchesSearch && recipe.type === "neapolitan"
    if (filterType === "detroit") return matchesSearch && recipe.type === "detroit"
    if (filterType === "new-york") return matchesSearch && recipe.type === "new-york"

    return matchesSearch
  })

  // Toggle favorite status
  const toggleFavorite = (id: string) => {
    const updatedRecipes = savedRecipes.map((recipe) =>
      recipe.id === id ? { ...recipe, isFavorite: !recipe.isFavorite } : recipe,
    )
    setSavedRecipes(updatedRecipes)
    localStorage.setItem("savedRecipes", JSON.stringify(updatedRecipes))

    toast({
      title: updatedRecipes.find((r) => r.id === id)?.isFavorite ? "Added to favorites" : "Removed from favorites",
      description: "Your favorites have been updated.",
    })
  }

  // Open add to meal planner dialog
  const openAddToMealPlanner = (recipe: SavedRecipe) => {
    setSelectedRecipe(recipe)
    setIsAddToMealPlannerOpen(true)
  }

  // Delete a saved recipe
  const deleteRecipe = (id: string) => {
    const updatedRecipes = savedRecipes.filter((recipe) => recipe.id !== id)
    setSavedRecipes(updatedRecipes)
    localStorage.setItem("savedRecipes", JSON.stringify(updatedRecipes))

    toast({
      title: "Recipe deleted",
      description: "The recipe has been removed from your saved recipes.",
    })
  }

  return (
    <div className="flex flex-col min-h-screen slate-bg pb-16">
      <header className="sticky top-0 dark-blue-bg border-b border-pizza-orange/20 z-10">
        <div className="container px-4 py-3 mx-auto max-w-md flex items-center">
          <Link href="/" className="mr-2">
            <ChevronLeft className="h-5 w-5 theme-text-primary" />
          </Link>
          <div className="flex items-center flex-1">
            <img src="/images/pizza-navigator-icon.png" alt="Pizza Navigator" className="h-6 w-6 mr-2" />
            <h1 className="text-lg font-semibold theme-text-primary">Saved Recipes</h1>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container px-4 py-6 mx-auto max-w-md">
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-pizza-charcoal border-pizza-orange/30 text-white"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[130px] h-10 bg-pizza-charcoal border-pizza-orange/30 text-white">
                <Filter className="h-4 w-4 mr-2 text-pizza-orange" />
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent className="bg-pizza-charcoal border-pizza-orange/30 text-white">
                <SelectItem value="all">All Recipes</SelectItem>
                <SelectItem value="favorites">Favorites</SelectItem>
                <SelectItem value="neapolitan">Neapolitan</SelectItem>
                <SelectItem value="detroit">Detroit</SelectItem>
                <SelectItem value="new-york">New York</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="grid" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4 bg-pizza-charcoal">
              <TabsTrigger value="grid" className="data-[state=active]:bg-pizza-orange data-[state=active]:text-white">
                Grid View
              </TabsTrigger>
              <TabsTrigger value="list" className="data-[state=active]:bg-pizza-orange data-[state=active]:text-white">
                List View
              </TabsTrigger>
            </TabsList>

            <TabsContent value="grid" className="mt-0">
              {filteredRecipes.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {filteredRecipes.map((recipe) => (
                    <Card
                      key={recipe.id}
                      className="overflow-hidden bg-pizza-charcoal/80 border-pizza-orange/20 hover:border-pizza-orange/50 transition-all"
                    >
                      <div className="h-32 relative">
                        <img
                          src={recipe.image || "/placeholder.svg?height=128&width=100"}
                          alt={recipe.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div className="absolute top-2 right-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleFavorite(recipe.id)}
                            className="h-8 w-8 rounded-full bg-black/40 text-white hover:bg-black/60"
                          >
                            {recipe.isFavorite ? (
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ) : (
                              <StarOff className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                        <div className="absolute bottom-3 left-3 right-3">
                          <h3 className="font-medium text-white text-sm line-clamp-1">{recipe.title}</h3>
                          <div className="flex items-center mt-1 gap-1">
                            <span className="text-xs bg-pizza-orange/20 text-pizza-orange px-1.5 py-0.5 rounded-full">
                              {recipe.type.charAt(0).toUpperCase() + recipe.type.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-2">
                        <div className="flex justify-between items-center">
                          <Link href={`/plan/${recipe.id}`} className="text-xs text-pizza-orange hover:underline">
                            View Details
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openAddToMealPlanner(recipe)}
                            className="h-7 text-xs text-white hover:bg-pizza-orange/20 p-1"
                          >
                            <CalendarDays className="h-3.5 w-3.5 mr-1" />
                            Plan
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-white/70 mb-4">No saved recipes found</p>
                  <Link href="/create-plan">
                    <Button className="bright-orange-btn">
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Recipe
                    </Button>
                  </Link>
                </div>
              )}
            </TabsContent>

            <TabsContent value="list" className="mt-0">
              {filteredRecipes.length > 0 ? (
                <div className="space-y-3">
                  {filteredRecipes.map((recipe) => (
                    <SavedPlanCard
                      key={recipe.id}
                      plan={recipe}
                      onFavoriteToggle={() => toggleFavorite(recipe.id)}
                      onAddToPlanner={() => openAddToMealPlanner(recipe)}
                      onDelete={() => deleteRecipe(recipe.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-white/70 mb-4">No saved recipes found</p>
                  <Link href="/create-plan">
                    <Button className="bright-orange-btn">
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Recipe
                    </Button>
                  </Link>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Add to Meal Planner Dialog */}
      {selectedRecipe && (
        <AddToMealPlannerDialog
          open={isAddToMealPlannerOpen}
          onOpenChange={setIsAddToMealPlannerOpen}
          recipeId={selectedRecipe.id}
          recipeTitle={selectedRecipe.title}
          recipeType={selectedRecipe.type}
          pizzaCount={selectedRecipe.pizzaCount}
          imageUrl={selectedRecipe.image}
        />
      )}
    </div>
  )
}

