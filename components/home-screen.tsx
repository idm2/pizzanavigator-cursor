"use client"

import { Button } from "@/components/ui/button"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import {
  PlusCircle,
  Calculator,
  Calendar,
  ShoppingBag,
  ChevronRight,
  Utensils,
  Sparkles,
  BookMarked,
  HelpCircle,
} from "lucide-react"
import Link from "next/link"
import { SavedPlanCard } from "@/components/saved-plan-card"
import { AppTutorial } from "@/components/app-tutorial"

export function HomeScreen() {
  const [activeTab, setActiveTab] = useState("home")
  const [savedRecipes, setSavedRecipes] = useState<any[]>([])
  const [upcomingMeals, setUpcomingMeals] = useState<any[]>([])

  // Load saved recipes and upcoming meals from localStorage on component mount
  useEffect(() => {
    try {
      // Load saved recipes
      const savedRecipesJson = localStorage.getItem("savedRecipes")
      if (savedRecipesJson) {
        const parsedRecipes = JSON.parse(savedRecipesJson)
        setSavedRecipes(parsedRecipes)
      }

      // Load upcoming meals
      const mealPlansJson = localStorage.getItem("mealPlans")
      if (mealPlansJson) {
        const parsedMeals = JSON.parse(mealPlansJson)
        // Sort by date and get only future meals
        const today = new Date()
        const upcoming = parsedMeals
          .filter((meal: any) => new Date(meal.date) >= today)
          .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .slice(0, 3) // Get only the next 3 upcoming meals

        setUpcomingMeals(upcoming)
      }
    } catch (error) {
      console.error("Error loading data:", error)
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen slate-bg">
      <main className="flex-1">
        <div className="container px-4 pt-2 mx-auto max-w-md">
          <div className="flex justify-between items-center mb-2">
            <div className="flex-1"></div>
          </div>

          <div className="mb-6"></div>

          <Tabs defaultValue="home" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsContent value="home" className="mt-0">
              <div>
                <div className="relative rounded-xl overflow-hidden shadow-xl mb-6">
                  <div className="absolute inset-0 black-gradient-overlay z-10"></div>
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/delicious-vegan-pizza-social-post.jpg-9Ps1rliUTCZbRwlxPBJDZPgYEjiH36.jpeg"
                    alt="Delicious homemade pizza"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/app-black-background-1-lbdWu0GKf7uyrfL7t1mVTTFF7KcWjj.png"
                      alt="Pizza Navigator"
                      width={150}
                      height={150}
                      className="drop-shadow-lg mb-1"
                    />
                    <p className="text-white/90 mt-1 italic text-xs">Master the art of pizza making</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-5">
                  <Link href="/create-plan" className="no-underline">
                    <Card
                      className="pizza-card dark-blue-card shadow-md hover:shadow-lg transition-all overflow-hidden border-2 border-transparent hover:border-pizza-orange/30 h-[100px]"
                      data-tutorial="pizza-creator"
                    >
                      <CardContent className="p-2 flex flex-col items-center justify-center text-center h-full">
                        <div className="relative w-10 h-10 flex items-center justify-center mb-1">
                          <PlusCircle className="h-7 w-7 text-pizza-orange" />
                        </div>
                        <h3 className="font-medium theme-text-primary text-sm">Pizza Creator</h3>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/dough-calculator" className="no-underline">
                    <Card
                      className="pizza-card dark-blue-card shadow-md hover:shadow-lg transition-all overflow-hidden border-2 border-transparent hover:border-pizza-orange/30 h-[100px]"
                      data-tutorial="dough-calculator"
                    >
                      <CardContent className="p-2 flex flex-col items-center justify-center text-center h-full">
                        <div className="relative w-10 h-10 flex items-center justify-center mb-1">
                          <Calculator className="h-7 w-7 text-pizza-orange" />
                        </div>
                        <h3 className="font-medium theme-text-primary text-sm">Dough Calculator</h3>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/toppings" className="no-underline">
                    <Card
                      className="pizza-card dark-blue-card shadow-md hover:shadow-lg transition-all overflow-hidden border-2 border-transparent hover:border-pizza-orange/30 h-[100px]"
                      data-tutorial="toppings"
                    >
                      <CardContent className="p-2 flex flex-col items-center justify-center text-center h-full">
                        <div className="relative w-10 h-10 flex items-center justify-center mb-1">
                          <Utensils className="h-7 w-7 text-pizza-orange" />
                        </div>
                        <h3 className="font-medium theme-text-primary text-sm">Toppings</h3>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/create-with-ai" className="no-underline">
                    <Card
                      className="pizza-card dark-blue-card shadow-md hover:shadow-lg transition-all overflow-hidden border-2 border-transparent hover:border-pizza-orange/30 h-[100px]"
                      data-tutorial="create-with-ai"
                    >
                      <CardContent className="p-2 flex flex-col items-center justify-center text-center h-full">
                        <div className="relative w-10 h-10 flex items-center justify-center mb-1">
                          <Sparkles className="h-7 w-7 text-pizza-orange" />
                        </div>
                        <h3 className="font-medium theme-text-primary text-sm">Create with AI</h3>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/shopping-list" className="no-underline">
                    <Card
                      className="pizza-card dark-blue-card shadow-md hover:shadow-lg transition-all overflow-hidden border-2 border-transparent hover:border-pizza-orange/30 h-[100px]"
                      data-tutorial="shopping-list"
                    >
                      <CardContent className="p-2 flex flex-col items-center justify-center text-center h-full">
                        <div className="relative w-10 h-10 flex items-center justify-center mb-1">
                          <ShoppingBag className="h-7 w-7 text-pizza-orange" />
                        </div>
                        <h3 className="font-medium theme-text-primary text-sm">Shopping List</h3>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/meal-planner" className="no-underline">
                    <Card
                      className="pizza-card dark-blue-card shadow-md hover:shadow-lg transition-all overflow-hidden border-2 border-transparent hover:border-pizza-orange/30 h-[100px]"
                      data-tutorial="meal-planner"
                    >
                      <CardContent className="p-2 flex flex-col items-center justify-center text-center h-full">
                        <div className="relative w-10 h-10 flex items-center justify-center mb-1">
                          <Calendar className="h-7 w-7 text-pizza-orange" />
                        </div>
                        <h3 className="font-medium theme-text-primary text-sm">Meal Planner</h3>
                      </CardContent>
                    </Card>
                  </Link>
                </div>

                {/* Help link */}
                <Link
                  href="/help"
                  className="flex items-center justify-center gap-2 mb-6 text-pizza-orange hover:text-pizza-orange/80 no-underline"
                >
                  <HelpCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">How to use the app</span>
                </Link>

                {/* Saved Recipes Section */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-lg font-semibold theme-text-primary flex items-center">
                      <div className="w-1.5 h-5 bg-pizza-orange rounded-full mr-2"></div>
                      Saved Recipes
                    </h2>
                    <Link href="/favorites" className="text-sm text-pizza-orange hover:underline flex items-center">
                      <span>View All</span>
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>

                  <div className="space-y-3">
                    {savedRecipes.length > 0 ? (
                      savedRecipes.slice(0, 2).map((recipe) => (
                        <Link href={`/plan/${recipe.id}`} key={recipe.id} className="no-underline">
                          <SavedPlanCard plan={recipe} />
                        </Link>
                      ))
                    ) : (
                      <div className="text-center py-4 bg-pizza-charcoal/30 rounded-lg border border-pizza-orange/10">
                        <BookMarked className="h-8 w-8 text-pizza-orange/50 mx-auto mb-2" />
                        <p className="text-sm theme-text-secondary mb-2">No saved recipes yet</p>
                        <Link href="/create-plan">
                          <Button className="bg-pizza-orange hover:bg-pizza-orange/80 text-white text-sm py-1 h-8">
                            Create Your First Recipe
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                {/* Upcoming Meals Section */}
                {upcomingMeals.length > 0 && (
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <h2 className="text-lg font-semibold theme-text-primary flex items-center">
                        <div className="w-1.5 h-5 bg-pizza-orange rounded-full mr-2"></div>
                        Upcoming Meals
                      </h2>
                      <Link
                        href="/meal-planner"
                        className="text-sm text-pizza-orange hover:underline flex items-center"
                      >
                        <span>View Calendar</span>
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>

                    <div className="space-y-3">
                      {upcomingMeals.map((meal) => (
                        <Card key={meal.id} className="pizza-card dark-blue-card shadow-md overflow-hidden">
                          <CardContent className="p-3">
                            <div className="flex items-center">
                              <div className="h-12 w-12 flex-shrink-0 mr-3 rounded-md overflow-hidden">
                                {meal.image ? (
                                  <img
                                    src={meal.image || "/placeholder.svg"}
                                    alt={meal.title}
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <div className="h-full w-full bg-pizza-orange/20 flex items-center justify-center">
                                    <span className="text-xl">🍕</span>
                                  </div>
                                )}
                              </div>
                              <div className="flex-1">
                                <h3 className="font-medium theme-text-primary">{meal.title}</h3>
                                <p className="text-xs theme-text-muted">
                                  {new Date(meal.date).toLocaleDateString("en-US", {
                                    weekday: "short",
                                    month: "short",
                                    day: "numeric",
                                  })}{" "}
                                  at {meal.time.split(":")[0]}:{meal.time.split(":")[1]}
                                  {Number.parseInt(meal.time.split(":")[0]) >= 12 ? "PM" : "AM"}
                                </p>
                              </div>
                              <Link href={`/plan/${meal.recipeId}`}>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 rounded-full hover:bg-pizza-orange/10"
                                >
                                  <ChevronRight className="h-4 w-4 text-pizza-orange" />
                                </Button>
                              </Link>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Interactive Tutorial */}
      <AppTutorial />
    </div>
  )
}

