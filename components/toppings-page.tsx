"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, Sparkles, Loader2, Plus, Utensils, Search } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

// Topping categories
const toppingCategories = [
  {
    id: "meats",
    name: "Meats",
    items: [
      {
        name: "Pepperoni",
        description: "Classic spicy Italian-American cured meat",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/spicy-sausage.jpg-XO7VZ41qQJEpDO6t7tcPRMq84tHzdI.jpeg", // spicy-sausage.jpg
      },
      {
        name: "Sausage",
        description: "Savory ground pork with Italian herbs and spices",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Meat-Lovers-Delight-Detroit-Pizza.jpg-gt5g1B6Yr5zTKSvbuwXIdsUNTtrF9J.jpeg", // Meat-Lovers-Delight-Detroit-Pizza.jpg
      },
      {
        name: "Bacon",
        description: "Smoky, crispy cured pork belly",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BBQ-Chicken%20%281%29.jpg-pbcqV8ppF6VmQvSuOxhE4LJTXgbcRQ.jpeg", // BBQ-Chicken.jpg
      },
      {
        name: "Ham",
        description: "Mild, slightly sweet cured pork",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/buffaloChicken.jpg-rjiAVy5V1BX1psoaAYmQfQv5Le0M3p.jpeg", // buffaloChicken.jpg
      },
      {
        name: "Prosciutto",
        description: "Thinly sliced, dry-cured Italian ham",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/white-garlic.jpg-JvqjEtz10rtwwgbhFaAJdLJYF9vL5h.jpeg", // white-garlic.jpg
      },
      {
        name: "Chicken",
        description: "Lean, versatile protein that pairs with many flavors",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BBQ-Chicken%20%281%29.jpg-pbcqV8ppF6VmQvSuOxhE4LJTXgbcRQ.jpeg", // BBQ-Chicken.jpg
      },
      {
        name: "Meatballs",
        description: "Seasoned ground meat formed into small balls",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Meat-Lovers-Delight-Detroit-Pizza.jpg-gt5g1B6Yr5zTKSvbuwXIdsUNTtrF9J.jpeg", // Meat-Lovers-Delight-Detroit-Pizza.jpg
      },
      {
        name: "Salami",
        description: "Cured sausage with a rich, complex flavor",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/spicy-sausage.jpg-XO7VZ41qQJEpDO6t7tcPRMq84tHzdI.jpeg", // spicy-sausage.jpg
      },
    ],
  },
  {
    id: "vegetables",
    name: "Vegetables",
    items: [
      {
        name: "Mushrooms",
        description: "Earthy, umami-rich fungi",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Veggie-Supreme-Detroit-Pizza.jpg-CfZE2Qnoa3OmYTN5owVED62BMwj1Gb.jpeg", // Veggie-Supreme-Detroit-Pizza.jpg
      },
      {
        name: "Bell Peppers",
        description: "Sweet, crunchy and colorful",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/VeggieDelight.jpg-SvJCZUQufmd7Mexk88JKiEKbvv0hiv.jpeg", // VeggieDelight.jpg
      },
      {
        name: "Onions",
        description: "Aromatic, sweet when caramelized",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Greek-Style-Detroit-Pizza.jpg-bofzc64Yga2hLpbvhucLCbi3W4rEuL.jpeg", // Greek-Style-Detroit-Pizza.jpg
      },
      {
        name: "Olives",
        description: "Briny, rich fruit with Mediterranean flavor",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Greek-Style-Detroit-Pizza.jpg-bofzc64Yga2hLpbvhucLCbi3W4rEuL.jpeg", // Greek-Style-Detroit-Pizza.jpg
      },
      {
        name: "Spinach",
        description: "Mild, leafy green that wilts beautifully",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/spinach-feta.jpg-ejQRco9mgpPB6A4UOprv1yUnfWGr36.jpeg", // spinach-feta.jpg
      },
      {
        name: "Artichokes",
        description: "Tender, slightly nutty vegetable hearts",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Veggie-Supreme-Detroit-Pizza.jpg-CfZE2Qnoa3OmYTN5owVED62BMwj1Gb.jpeg", // Veggie-Supreme-Detroit-Pizza.jpg
      },
      {
        name: "Tomatoes",
        description: "Fresh, bright and juicy",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/VeggieDelight.jpg-SvJCZUQufmd7Mexk88JKiEKbvv0hiv.jpeg", // VeggieDelight.jpg
      },
      {
        name: "Garlic",
        description: "Pungent, aromatic and flavorful",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/white-garlic.jpg-JvqjEtz10rtwwgbhFaAJdLJYF9vL5h.jpeg", // white-garlic.jpg
      },
    ],
  },
  {
    id: "cheeses",
    name: "Cheeses",
    items: [
      {
        name: "Mozzarella",
        description: "Mild, stretchy cheese that melts beautifully",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/white-garlic.jpg-JvqjEtz10rtwwgbhFaAJdLJYF9vL5h.jpeg", // white-garlic.jpg
      },
      {
        name: "Parmesan",
        description: "Aged, nutty, hard Italian cheese",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/VeggieDelight.jpg-SvJCZUQufmd7Mexk88JKiEKbvv0hiv.jpeg", // VeggieDelight.jpg
      },
      {
        name: "Gorgonzola",
        description: "Bold, creamy Italian blue cheese",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/spinach-feta.jpg-ejQRco9mgpPB6A4UOprv1yUnfWGr36.jpeg", // spinach-feta.jpg
      },
      {
        name: "Ricotta",
        description: "Creamy, mild fresh cheese",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/white-garlic.jpg-JvqjEtz10rtwwgbhFaAJdLJYF9vL5h.jpeg", // white-garlic.jpg
      },
      {
        name: "Provolone",
        description: "Semi-hard Italian cheese with mild flavor",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/VeggieDelight.jpg-SvJCZUQufmd7Mexk88JKiEKbvv0hiv.jpeg", // VeggieDelight.jpg
      },
      {
        name: "Feta",
        description: "Tangy, crumbly Greek cheese",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/spinach-feta.jpg-ejQRco9mgpPB6A4UOprv1yUnfWGr36.jpeg", // spinach-feta.jpg
      },
      {
        name: "Goat Cheese",
        description: "Tangy, creamy cheese with distinctive flavor",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Greek-Style-Detroit-Pizza.jpg-bofzc64Yga2hLpbvhucLCbi3W4rEuL.jpeg", // Greek-Style-Detroit-Pizza.jpg
      },
      {
        name: "Cheddar",
        description: "Sharp, versatile cheese that melts well",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/buffaloChicken.jpg-rjiAVy5V1BX1psoaAYmQfQv5Le0M3p.jpeg", // buffaloChicken.jpg
      },
    ],
  },
  {
    id: "herbs-spices",
    name: "Herbs & Spices",
    items: [
      {
        name: "Basil",
        description: "Aromatic herb with sweet, peppery flavor",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/VeggieDelight.jpg-SvJCZUQufmd7Mexk88JKiEKbvv0hiv.jpeg", // VeggieDelight.jpg
      },
      {
        name: "Oregano",
        description: "Earthy, slightly bitter Mediterranean herb",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/white-garlic.jpg-JvqjEtz10rtwwgbhFaAJdLJYF9vL5h.jpeg", // white-garlic.jpg
      },
      {
        name: "Red Pepper Flakes",
        description: "Adds heat and a touch of fruitiness",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/spicy-sausage.jpg-XO7VZ41qQJEpDO6t7tcPRMq84tHzdI.jpeg", // spicy-sausage.jpg
      },
      {
        name: "Rosemary",
        description: "Fragrant, pine-like woody herb",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/spinach-feta.jpg-ejQRco9mgpPB6A4UOprv1yUnfWGr36.jpeg", // spinach-feta.jpg
      },
      {
        name: "Thyme",
        description: "Earthy, slightly floral herb",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/white-garlic.jpg-JvqjEtz10rtwwgbhFaAJdLJYF9vL5h.jpeg", // white-garlic.jpg
      },
      {
        name: "Black Pepper",
        description: "Pungent, woody spice with mild heat",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/spicy-sausage.jpg-XO7VZ41qQJEpDO6t7tcPRMq84tHzdI.jpeg", // spicy-sausage.jpg
      },
      {
        name: "Garlic Powder",
        description: "Concentrated garlic flavor without the texture",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/white-garlic.jpg-JvqjEtz10rtwwgbhFaAJdLJYF9vL5h.jpeg", // white-garlic.jpg
      },
      {
        name: "Italian Seasoning",
        description: "Blend of Mediterranean herbs",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/VeggieDelight.jpg-SvJCZUQufmd7Mexk88JKiEKbvv0hiv.jpeg", // VeggieDelight.jpg
      },
    ],
  },
  {
    id: "specialty",
    name: "Specialty",
    items: [
      {
        name: "Pineapple",
        description: "Sweet, tropical fruit (controversially delicious)",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/buffaloChicken.jpg-rjiAVy5V1BX1psoaAYmQfQv5Le0M3p.jpeg", // buffaloChicken.jpg
      },
      {
        name: "Anchovies",
        description: "Small, intensely flavored salt-cured fish",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/white-garlic.jpg-JvqjEtz10rtwwgbhFaAJdLJYF9vL5h.jpeg", // white-garlic.jpg
      },
      {
        name: "Capers",
        description: "Briny, tangy flower buds",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Greek-Style-Detroit-Pizza.jpg-bofzc64Yga2hLpbvhucLCbi3W4rEuL.jpeg", // Greek-Style-Detroit-Pizza.jpg
      },
      {
        name: "Sun-dried Tomatoes",
        description: "Intensely flavored, chewy dried tomatoes",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/VeggieDelight.jpg-SvJCZUQufmd7Mexk88JKiEKbvv0hiv.jpeg", // VeggieDelight.jpg
      },
      {
        name: "Truffle Oil",
        description: "Luxurious oil with earthy, musky aroma",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/spinach-feta.jpg-ejQRco9mgpPB6A4UOprv1yUnfWGr36.jpeg", // spinach-feta.jpg
      },
      {
        name: "Hot Honey",
        description: "Sweet honey infused with chili peppers",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BBQ-Chicken%20%281%29.jpg-pbcqV8ppF6VmQvSuOxhE4LJTXgbcRQ.jpeg", // BBQ-Chicken.jpg
      },
      {
        name: "Arugula",
        description: "Peppery leafy green (added after baking)",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/spinach-feta.jpg-ejQRco9mgpPB6A4UOprv1yUnfWGr36.jpeg", // spinach-feta.jpg
      },
      {
        name: "Balsamic Glaze",
        description: "Sweet, tangy reduction of balsamic vinegar",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/buffaloChicken.jpg-rjiAVy5V1BX1psoaAYmQfQv5Le0M3p.jpeg", // buffaloChicken.jpg
      },
    ],
  },
]

// Mock function for AI-generated topping combinations
const generateToppingCombinations = async (preferences: string) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  return [
    {
      name: "Classic Italian",
      toppings: ["Fresh Mozzarella", "Basil", "San Marzano Tomatoes", "Extra Virgin Olive Oil"],
      description: "The timeless combination that celebrates simplicity and quality ingredients.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/white-garlic.jpg-JvqjEtz10rtwwgbhFaAJdLJYF9vL5h.jpeg", // white-garlic.jpg
    },
    {
      name: "Savory Umami Bomb",
      toppings: ["Mushrooms", "Caramelized Onions", "Truffle Oil", "Parmesan", "Thyme"],
      description: "A rich, earthy blend that highlights deep umami flavors.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/spinach-feta.jpg-ejQRco9mgpPB6A4UOprv1yUnfWGr36.jpeg", // spinach-feta.jpg
    },
    {
      name: "Mediterranean Dream",
      toppings: ["Feta", "Olives", "Sun-dried Tomatoes", "Artichokes", "Oregano"],
      description: "Bright, briny flavors inspired by Mediterranean cuisine.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Greek-Style-Detroit-Pizza.jpg-bofzc64Yga2hLpbvhucLCbi3W4rEuL.jpeg", // Greek-Style-Detroit-Pizza.jpg
    },
    {
      name: "Spicy Carnivore",
      toppings: ["Pepperoni", "Spicy Sausage", "Red Pepper Flakes", "Mozzarella", "Hot Honey"],
      description: "A meat lover's delight with a kick of heat balanced by sweet honey.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/spicy-sausage.jpg-XO7VZ41qQJEpDO6t7tcPRMq84tHzdI.jpeg", // spicy-sausage.jpg
    },
    {
      name: "Sweet & Savory Fusion",
      toppings: ["Prosciutto", "Arugula", "Balsamic Glaze", "Goat Cheese", "Fig Jam"],
      description: "A sophisticated blend of sweet and savory elements with contrasting textures.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/buffaloChicken.jpg-rjiAVy5V1BX1psoaAYmQfQv5Le0M3p.jpeg", // buffaloChicken.jpg
    },
  ]
}

export function ToppingsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("browse")
  const [searchQuery, setSearchQuery] = useState("")
  const [aiPreferences, setAiPreferences] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [aiSuggestions, setAiSuggestions] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState("meats")

  // Filter toppings based on search query
  const filteredToppings = toppingCategories.flatMap((category) =>
    category.items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  )

  // Handle AI generation
  const handleGenerateToppings = async () => {
    setIsGenerating(true)
    try {
      const suggestions = await generateToppingCombinations(aiPreferences)
      setAiSuggestions(suggestions)
    } catch (error) {
      toast({
        title: "Error generating suggestions",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  // Add to shopping list
  const addToShoppingList = (items: string[]) => {
    toast({
      title: "Added to shopping list",
      description: `${items.length} items added to your shopping list.`,
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
            <h1 className="text-lg font-semibold text-white">Toppings</h1>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container px-4 py-6 mx-auto max-w-md">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger
                value="browse"
                className="data-[state=active]:bg-pizza-orange data-[state=active]:text-white"
              >
                <Utensils className="h-4 w-4 mr-2" />
                Browse Toppings
              </TabsTrigger>
              <TabsTrigger value="ai" className="data-[state=active]:bg-pizza-orange data-[state=active]:text-white">
                <Sparkles className="h-4 w-4 mr-2" />
                AI Combinations
              </TabsTrigger>
            </TabsList>

            <TabsContent value="browse" className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search toppings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-pizza-charcoal border-pizza-orange/30 text-white"
                />
              </div>

              {searchQuery ? (
                <div className="space-y-4">
                  <h2 className="text-lg font-medium text-white">Search Results</h2>
                  {filteredToppings.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3">
                      {filteredToppings.map((topping, index) => (
                        <Card
                          key={index}
                          className="overflow-hidden bg-pizza-charcoal/80 border-pizza-orange/20 hover:border-pizza-orange/50 transition-all"
                        >
                          <div className="h-24 relative">
                            <img
                              src={topping.image || "/placeholder.svg?height=96&width=100"}
                              alt={topping.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-2 left-2 right-2">
                              <h3 className="text-white font-medium text-sm">{topping.name}</h3>
                            </div>
                          </div>
                          <CardContent className="p-3">
                            <p className="text-xs text-white/70 line-clamp-2">{topping.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-white/70">No toppings found matching "{searchQuery}"</p>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className="flex overflow-x-auto pb-2 hide-scrollbar">
                    <div className="flex space-x-2">
                      {toppingCategories.map((category) => (
                        <Button
                          key={category.id}
                          variant={selectedCategory === category.id ? "default" : "outline"}
                          onClick={() => setSelectedCategory(category.id)}
                          className={
                            selectedCategory === category.id
                              ? "bg-pizza-orange text-white whitespace-nowrap"
                              : "border-pizza-orange/30 text-white hover:bg-pizza-orange/20 whitespace-nowrap"
                          }
                        >
                          {category.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-lg font-medium text-white">
                      {toppingCategories.find((c) => c.id === selectedCategory)?.name}
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                      {toppingCategories
                        .find((c) => c.id === selectedCategory)
                        ?.items.map((topping, index) => (
                          <Card
                            key={index}
                            className="overflow-hidden bg-pizza-charcoal/80 border-pizza-orange/20 hover:border-pizza-orange/50 transition-all"
                          >
                            <div className="h-24 relative">
                              <img
                                src={topping.image || "/placeholder.svg?height=96&width=100"}
                                alt={topping.name}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                              <div className="absolute bottom-2 left-2 right-2">
                                <h3 className="text-white font-medium text-sm">{topping.name}</h3>
                              </div>
                            </div>
                            <CardContent className="p-3">
                              <p className="text-xs text-white/70 line-clamp-2">{topping.description}</p>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </div>
                </>
              )}
            </TabsContent>

            <TabsContent value="ai" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ai-preferences" className="text-white">
                    Tell us your preferences
                  </Label>
                  <Textarea
                    id="ai-preferences"
                    placeholder="E.g., I like spicy food, prefer vegetables, want something with mushrooms..."
                    value={aiPreferences}
                    onChange={(e) => setAiPreferences(e.target.value)}
                    className="bg-pizza-charcoal border-pizza-orange/30 text-white resize-none h-24"
                  />
                </div>

                <Button
                  onClick={handleGenerateToppings}
                  disabled={isGenerating || !aiPreferences.trim()}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-2.5"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating Combinations...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Topping Combinations
                    </>
                  )}
                </Button>
              </div>

              {aiSuggestions.length > 0 && (
                <div className="space-y-4 mt-6">
                  <h2 className="text-lg font-medium text-white">AI Suggested Combinations</h2>

                  {aiSuggestions.map((suggestion, index) => (
                    <Card key={index} className="bg-pizza-charcoal/80 border-pizza-orange/20 overflow-hidden">
                      <div className="h-32 relative">
                        <img
                          src={suggestion.image || "/placeholder.svg?height=128&width=100"}
                          alt={suggestion.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div className="absolute bottom-3 left-4 right-4">
                          <h3 className="font-medium text-white text-lg">{suggestion.name}</h3>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <p className="text-sm text-white/70 mb-3">{suggestion.description}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {suggestion.toppings.map((topping: string, i: number) => (
                            <span
                              key={i}
                              className="bg-pizza-orange/20 text-pizza-orange px-2 py-1 rounded-full text-xs"
                            >
                              {topping}
                            </span>
                          ))}
                        </div>

                        <div className="flex justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addToShoppingList(suggestion.toppings)}
                            className="border-pizza-orange/50 text-white hover:bg-pizza-orange/20"
                          >
                            <Plus className="h-3.5 w-3.5 mr-1.5" />
                            Add to Shopping List
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

