"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, ChevronLeft, ChevronRight, X, Sparkles } from "lucide-react"
import { AIToppingSuggestions } from "@/components/ai-topping-suggestions"
import {
  getAllToppingRecipes,
  getAllToppingCategories,
  getToppingRecipesByCategory,
  ToppingRecipe
} from "@/utils/toppings-utils"

interface PizzaToppingsSelectorProps {
  selectedToppings: string[]
  onSelectToppings: (toppings: string[]) => void
  pizzaCount: number
  pizzaType: string
  onNext: () => void
}

interface PizzaWithToppings {
  id: number
  toppings: string[]
}

export function PizzaToppingsSelector({
  selectedToppings,
  onSelectToppings,
  pizzaCount,
  pizzaType,
  onNext,
}: PizzaToppingsSelectorProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Initialize pizzas with empty toppings
  const [pizzas, setPizzas] = useState<PizzaWithToppings[]>([])
  const [currentPizzaIndex, setCurrentPizzaIndex] = useState(0)
  const [startIndex, setStartIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<string>("All")
  const pizzasPerPage = 3
  const [suggestionsCollapsed, setSuggestionsCollapsed] = useState(false)
  const [categories, setCategories] = useState<string[]>(["AI"])
  
  // Initialize category toppings mapping
  const [categoryToppings, setCategoryToppings] = useState<Record<string, string[]>>({})
  
  // Load categories and toppings when component mounts
  useEffect(() => {
    // Get all categories from the toppings data
    const toppingData = getAllToppingRecipes()
    const allCategories = getAllToppingCategories()
    
    // Add debug logging
    console.log(`Total topping recipes loaded: ${toppingData.length}`)
    console.log(`Total categories loaded: ${allCategories.length}`)
    
    setCategories(['AI', ...allCategories])
    
    // Initialize mapping of categories to toppings
    const mapping: Record<string, string[]> = {}
    
    // Special category for AI suggestions
    mapping["AI"] = []
    
    // Create an "All" category with all toppings
    mapping["All"] = toppingData.map((recipe: ToppingRecipe) => recipe.name)
    console.log(`"All" category toppings count: ${mapping["All"].length}`)
    
    // Create mappings for each category
    allCategories.forEach((category: string) => {
      const toppingsInCategory = getToppingRecipesByCategory(category)
      mapping[category] = toppingsInCategory.map((recipe: ToppingRecipe) => recipe.name)
    })
    
    setCategoryToppings(mapping)
  }, [])

  // Initialize pizzas when component mounts or pizzaCount changes
  useEffect(() => {
    const initialPizzas = Array.from({ length: pizzaCount }, (_, i) => ({
      id: i,
      toppings: [],
    }))
    setPizzas(initialPizzas)
  }, [pizzaCount])

  // Add custom CSS to hide scrollbar
  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      .hide-scrollbar::-webkit-scrollbar {
        display: none;
      }
      .hide-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  const toggleTopping = (topping: string) => {
    setPizzas((prevPizzas) => {
      const updatedPizzas = [...prevPizzas]
      const currentPizza = { ...updatedPizzas[currentPizzaIndex] }

      if (currentPizza.toppings.includes(topping)) {
        // Remove topping
        currentPizza.toppings = currentPizza.toppings.filter((t) => t !== topping)
      } else {
        // Add topping if less than 5
        if (currentPizza.toppings.length < 5) {
          currentPizza.toppings = [...currentPizza.toppings, topping]
        }
      }

      updatedPizzas[currentPizzaIndex] = currentPizza
      return updatedPizzas
    })
  }

  const removeTopping = (topping: string) => {
    setPizzas((prevPizzas) => {
      const updatedPizzas = [...prevPizzas]
      const currentPizza = { ...updatedPizzas[currentPizzaIndex] }
      currentPizza.toppings = currentPizza.toppings.filter((t) => t !== topping)
      updatedPizzas[currentPizzaIndex] = currentPizza
      return updatedPizzas
    })
  }

  const selectPizza = (index: number) => {
    setCurrentPizzaIndex(index)
  }

  const nextPage = () => {
    if (startIndex + pizzasPerPage < pizzaCount) {
      setStartIndex(startIndex + pizzasPerPage)
      setCurrentPizzaIndex(startIndex + pizzasPerPage)
    }
  }

  const prevPage = () => {
    if (startIndex - pizzasPerPage >= 0) {
      setStartIndex(startIndex - pizzasPerPage)
      setCurrentPizzaIndex(startIndex - pizzasPerPage)
    }
  }

  const handleFinish = () => {
    // Flatten all toppings from all pizzas
    const allToppings = pizzas.flatMap((pizza) => pizza.toppings)
    onSelectToppings(allToppings)
    onNext()
  }

  // Handle AI topping suggestions
  const handleAIToppings = (aiToppings: string[], toppingName: string) => {
    setPizzas((prevPizzas) => {
      const updatedPizzas = [...prevPizzas]
      const currentPizza = { ...updatedPizzas[currentPizzaIndex] }

      // Instead of replacing with individual ingredients, add the topping name
      currentPizza.toppings = [toppingName]

      updatedPizzas[currentPizzaIndex] = currentPizza
      return updatedPizzas
    })

    // Collapse suggestions after selection
    setSuggestionsCollapsed(true)
  }

  const toggleSuggestionsCollapsed = () => {
    setSuggestionsCollapsed(!suggestionsCollapsed)
  }

  const visiblePizzas = pizzas.slice(startIndex, startIndex + pizzasPerPage)
  const totalPages = Math.ceil(pizzaCount / pizzasPerPage)
  const currentPage = Math.floor(startIndex / pizzasPerPage) + 1

  // Get a background image based on pizza type
  const getPizzaBackgroundImage = () => {
    if (
      pizzaType === "detroit" ||
      pizzaType === "sicilian" ||
      pizzaType === "grandma" ||
      pizzaType === "chicago-deep-dish"
    ) {
      return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Meat-Lovers-Delight-Detroit-Pizza.jpg-gt5g1B6Yr5zTKSvbuwXIdsUNTtrF9J.jpeg"
    } else if (pizzaType === "new-york" || pizzaType === "thin-n-crispy") {
      return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/spicy-sausage.jpg-XO7VZ41qQJEpDO6t7tcPRMq84tHzdI.jpeg"
    } else if (pizzaType === "california") {
      return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/spinach-feta.jpg-ejQRco9mgpPB6A4UOprv1yUnfWGr36.jpeg"
    } else {
      return "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/VeggieDelight.jpg-SvJCZUQufmd7Mexk88JKiEKbvv0hiv.jpeg"
    }
  }

  return (
    <div className="space-y-6">
      {pizzaCount > 1 && (
        <div className="text-center mb-4">
          <h3 className="text-lg font-medium text-white">Select Toppings for Each Pizza</h3>
          <p className="text-sm text-white/70">
            {currentPage} of {totalPages} pages
          </p>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={prevPage}
          disabled={startIndex === 0}
          className="border-pizza-orange/50 text-white hover:bg-pizza-orange/20 bg-[#1a202c]/50"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex-1 flex justify-center space-x-4">
          {visiblePizzas.map((pizza, index) => (
            <div
              key={pizza.id}
              onClick={() => selectPizza(startIndex + index)}
              className={`
                w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-all
                ${startIndex + index === currentPizzaIndex ? "scale-110" : ""}
                ${
                  pizza.toppings.length > 0
                    ? "border-2 border-pizza-orange bg-pizza-orange/20"
                    : "border-2 border-dashed border-white/30 bg-[#1a202c]/50"
                }
              `}
              style={{
                backgroundImage: pizza.toppings.length > 0 ? `url(${getPizzaBackgroundImage()})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="text-center bg-black/50 rounded-full w-full h-full flex flex-col items-center justify-center">
                <div className="text-lg font-bold text-white">{pizza.id + 1}</div>
                {pizza.toppings.length > 0 && <div className="text-xs text-white/80">{pizza.toppings.length}/5</div>}
              </div>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={nextPage}
          disabled={startIndex + pizzasPerPage >= pizzaCount}
          className="border-pizza-orange/50 text-white hover:bg-pizza-orange/20 bg-[#1a202c]/50"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="bg-[#1a202c]/50 rounded-lg p-6">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-white">Pizza {currentPizzaIndex + 1}</h3>
          <p className="text-sm text-white/70">Select up to 5 toppings</p>
        </div>

        {pizzas[currentPizzaIndex]?.toppings.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {pizzas[currentPizzaIndex].toppings.map((topping, index) => (
              <div
                key={index}
                className="flex items-center space-x-1 px-3 py-1 rounded-full bg-pizza-orange/20 border border-pizza-orange/50 text-white"
                style={{ fontSize: '.8rem' }}
              >
                <span>{topping}</span>
                <button onClick={() => removeTopping(topping)} className="text-white/70 hover:text-white">
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -ml-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollBy({ left: -100, behavior: 'smooth' });
                }
              }}
              className="h-8 w-8 rounded-full bg-black/40 text-white hover:bg-black/60"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>

          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto py-2 hide-scrollbar px-8"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <div
              onClick={() => setActiveTab("All")}
              className={`flex-shrink-0 mx-1 px-4 py-2 rounded-md cursor-pointer ${
                activeTab === "All"
                  ? "bg-pizza-orange text-white"
                  : "bg-[#1a202c]/50 text-white/70 hover:bg-[#1a202c]/70"
              }`}
            >
              All
            </div>
            {categories.map((category) => (
              <div
                key={category}
                onClick={() => setActiveTab(category)}
                className={`flex-shrink-0 mx-1 px-4 py-2 rounded-md cursor-pointer ${
                  activeTab === category
                    ? "bg-pizza-orange text-white"
                    : "bg-[#1a202c]/50 text-white/70 hover:bg-[#1a202c]/70"
                }`}
              >
                {category === "AI" ? (
                  <div className="flex items-center space-x-1">
                    <Sparkles className="h-4 w-4" />
                    <span>AI</span>
                  </div>
                ) : (
                  category
                )}
              </div>
            ))}
          </div>
          
          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 -mr-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollBy({ left: 100, behavior: 'smooth' });
                }
              }}
              className="h-8 w-8 rounded-full bg-black/40 text-white hover:bg-black/60"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {activeTab === "AI" ? (
          <div className="mt-4">
            <AIToppingSuggestions
              pizzaType={pizzaType}
              onSelectToppings={handleAIToppings}
              collapsed={suggestionsCollapsed}
              onToggleCollapsed={toggleSuggestionsCollapsed}
            />
          </div>
        ) : (
          <>
            {/* Add count indicator and scrolling hint */}
            <div className="mt-2 mb-1 flex justify-between items-center">
              <p className="text-xs text-white/70">
                {categoryToppings[activeTab]?.length || 0} toppings available 
                {categoryToppings[activeTab]?.length > 8 ? " (scroll to see all)" : ""}
              </p>
            </div>
            
            {/* Increase the max height to show more toppings and add better scrolling */}
            <div className="mt-2 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-1 hide-scrollbar toppings-grid" style={{scrollbarWidth: 'thin'}}>
              {categoryToppings[activeTab]?.map((topping, index) => {
                const isSelected = pizzas[currentPizzaIndex]?.toppings.includes(topping)
                const disabled = !isSelected && pizzas[currentPizzaIndex]?.toppings.length >= 5
                
                return (
                  <div
                    key={index}
                    onClick={() => !disabled && toggleTopping(topping)}
                    className={`p-3 rounded-md cursor-pointer flex justify-between items-center relative group min-h-[40px] ${
                      isSelected
                        ? "bg-pizza-orange text-white"
                        : disabled
                        ? "bg-[#1a202c]/20 text-white/30 cursor-not-allowed"
                        : "bg-[#1a202c] text-white hover:bg-[#1a202c]/70"
                    }`}
                    title={topping}
                  >
                    <span className="truncate mr-2 leading-snug" style={{ fontSize: '.8rem' }}>{topping}</span>
                    {isSelected && <Check className="h-4 w-4 flex-shrink-0" />}
                    
                    {/* Custom tooltip */}
                    <div 
                      className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 backdrop-blur-sm text-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 pointer-events-none border border-gray-700" 
                      style={{ fontSize: '.8rem' }}
                    >
                      {topping}
                      {/* Small tooltip arrow */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80"></div>
                    </div>
                  </div>
                )
              })}
            </div>
            
            {/* Add extra CSS for smooth scrolling and tooltip */}
            <style jsx>{`
              .toppings-grid {
                scroll-behavior: smooth;
              }
              
              /* Hide tooltip on mobile devices to prevent clutter */
              @media (max-width: 640px) {
                .group:hover .opacity-0 {
                  opacity: 0 !important;
                }
              }
            `}</style>
          </>
        )}
      </div>

      <Button
        variant="default"
        onClick={handleFinish}
        className="w-full bg-pizza-orange hover:bg-pizza-orange/80"
      >
        Finish
      </Button>
    </div>
  )
}

