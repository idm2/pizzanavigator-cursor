"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ChevronLeft,
  Info,
  Calculator,
  Utensils,
  Sparkles,
  ShoppingBag,
  CalendarDays,
  BookOpen,
  Lightbulb,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import Link from "next/link"

export function HelpPage() {
  const [activeTab, setActiveTab] = useState("pizza-creator")
  const [tocOpen, setTocOpen] = useState(false)
  const mainRef = useRef<HTMLDivElement>(null)

  const scrollToSection = (sectionId: string) => {
    // Only update state if the section is changing
    if (activeTab !== sectionId) {
      setActiveTab(sectionId)
    }
    setTocOpen(false)

    // Scroll to top of content area with smooth behavior
    if (mainRef.current) {
      mainRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }

    // Focus on the content for accessibility
    setTimeout(() => {
      const contentElement = document.getElementById(`content-${sectionId}`)
      if (contentElement) {
        contentElement.focus()
      }
    }, 100)
  }

  useEffect(() => {
    // Focus on the content when activeTab changes
    const contentElement = document.getElementById(`content-${activeTab}`)
    if (contentElement) {
      contentElement.focus()
    }
  }, [activeTab])

  return (
    <div className="flex flex-col min-h-screen slate-bg pb-16">
      <header className="sticky top-0 dark-blue-bg border-b border-pizza-orange/20 z-10">
        <div className="container px-4 py-3 mx-auto max-w-4xl flex items-center">
          <Link href="/" className="mr-2">
            <ChevronLeft className="h-5 w-5 theme-text-primary" />
          </Link>
          <div className="flex items-center flex-1">
            <img src="/images/pizza-navigator-icon.png" alt="Pizza Navigator" className="h-6 w-6 mr-2" />
            <h1 className="text-lg font-semibold theme-text-primary">Help & About</h1>
          </div>
        </div>
      </header>

      <main className="flex-1" ref={mainRef}>
        {/* Sticky Mobile TOC */}
        <div className="sticky top-0 z-20 md:hidden">
          <div className="bg-pizza-charcoal border-b border-pizza-orange/20 px-4 py-3">
            <button
              onClick={() => setTocOpen(!tocOpen)}
              className="flex items-center justify-between w-full text-white"
              aria-expanded={tocOpen}
              aria-controls="mobile-toc"
            >
              <span className="font-medium">
                {activeTab === "pizza-creator"
                  ? "Pizza Creator"
                  : activeTab === "dough-calculator"
                    ? "Dough Calculator"
                    : activeTab === "toppings"
                      ? "Toppings"
                      : activeTab.startsWith("create-with-ai")
                        ? "Create with AI"
                        : activeTab === "shopping-list"
                          ? "Shopping List"
                          : activeTab === "meal-planner"
                            ? "Meal Planner"
                            : activeTab === "saved-recipes"
                              ? "Saved Recipes"
                              : activeTab === "tips-tricks"
                                ? "Tips & Tricks"
                                : "Contents"}
              </span>
              {tocOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>

          {/* Expandable TOC */}
          {tocOpen && (
            <div
              id="mobile-toc"
              className="bg-pizza-charcoal border-b border-pizza-orange/20 shadow-lg max-h-[70vh] overflow-y-auto"
            >
              <div className="p-4">
                <h2 className="text-lg font-bold text-white mb-4">Contents</h2>
                <nav className="space-y-2">
                  <button
                    className={`w-full text-left py-2 px-3 rounded ${
                      activeTab === "pizza-creator" ? "bg-pizza-orange/20 text-pizza-orange" : "text-white"
                    }`}
                    onClick={() => scrollToSection("pizza-creator")}
                  >
                    Pizza Creator
                  </button>
                  <button
                    className={`w-full text-left py-2 px-3 rounded ${
                      activeTab === "dough-calculator" ? "bg-pizza-orange/20 text-pizza-orange" : "text-white"
                    }`}
                    onClick={() => scrollToSection("dough-calculator")}
                  >
                    Dough Calculator
                  </button>
                  <button
                    className={`w-full text-left py-2 px-3 rounded ${
                      activeTab === "toppings" ? "bg-pizza-orange/20 text-pizza-orange" : "text-white"
                    }`}
                    onClick={() => scrollToSection("toppings")}
                  >
                    Toppings
                  </button>

                  {/* Create with AI with nested items */}
                  <div className="space-y-1">
                    <button
                      className={`w-full text-left py-2 px-3 rounded ${
                        activeTab.startsWith("create-with-ai") ? "bg-pizza-orange/20 text-pizza-orange" : "text-white"
                      }`}
                      onClick={() => scrollToSection("create-with-ai-overview")}
                    >
                      Create with AI
                    </button>

                    {/* Nested items */}
                    <div className="pl-4 space-y-1 mt-1">
                      <button
                        className={`w-full text-left py-1 px-3 rounded text-sm ${
                          activeTab === "create-with-ai-overview" ? "text-pizza-orange" : "text-white/70"
                        }`}
                        onClick={() => scrollToSection("create-with-ai-overview")}
                      >
                        Overview
                      </button>
                      <button
                        className={`w-full text-left py-1 px-3 rounded text-sm ${
                          activeTab === "create-with-ai-prompts" ? "text-pizza-orange" : "text-white/70"
                        }`}
                        onClick={() => scrollToSection("create-with-ai-prompts")}
                      >
                        Writing Effective Prompts
                      </button>
                      <button
                        className={`w-full text-left py-1 px-3 rounded text-sm ${
                          activeTab === "create-with-ai-components" ? "text-pizza-orange" : "text-white/70"
                        }`}
                        onClick={() => scrollToSection("create-with-ai-components")}
                      >
                        Recipe Components
                      </button>
                      <button
                        className={`w-full text-left py-1 px-3 rounded text-sm ${
                          activeTab === "create-with-ai-customizing" ? "text-pizza-orange" : "text-white/70"
                        }`}
                        onClick={() => scrollToSection("create-with-ai-customizing")}
                      >
                        Customizing Results
                      </button>
                      <button
                        className={`w-full text-left py-1 px-3 rounded text-sm ${
                          activeTab === "create-with-ai-saving" ? "text-pizza-orange" : "text-white/70"
                        }`}
                        onClick={() => scrollToSection("create-with-ai-saving")}
                      >
                        Saving & Using AI Recipes
                      </button>
                    </div>
                  </div>

                  <button
                    className={`w-full text-left py-2 px-3 rounded ${
                      activeTab === "shopping-list" ? "bg-pizza-orange/20 text-pizza-orange" : "text-white"
                    }`}
                    onClick={() => scrollToSection("shopping-list")}
                  >
                    Shopping List
                  </button>
                  <button
                    className={`w-full text-left py-2 px-3 rounded ${
                      activeTab === "meal-planner" ? "bg-pizza-orange/20 text-pizza-orange" : "text-white"
                    }`}
                    onClick={() => scrollToSection("meal-planner")}
                  >
                    Meal Planner
                  </button>
                  <button
                    className={`w-full text-left py-2 px-3 rounded ${
                      activeTab === "saved-recipes" ? "bg-pizza-orange/20 text-pizza-orange" : "text-white"
                    }`}
                    onClick={() => scrollToSection("saved-recipes")}
                  >
                    Saved Recipes
                  </button>
                  <button
                    className={`w-full text-left py-2 px-3 rounded ${
                      activeTab === "tips-tricks" ? "bg-pizza-orange/20 text-pizza-orange" : "text-white"
                    }`}
                    onClick={() => scrollToSection("tips-tricks")}
                  >
                    Tips & Tricks
                  </button>
                </nav>
              </div>
            </div>
          )}
        </div>

        <div className="container px-4 py-6 mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-64 shrink-0">
              <Card className="bg-pizza-charcoal border-pizza-orange/20 sticky top-20 hidden md:block">
                <CardContent className="p-4">
                  <h2 className="text-lg font-bold text-white mb-4">Contents</h2>
                  <nav className="space-y-1">
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${
                        activeTab === "pizza-creator" ? "bg-pizza-orange/20 text-pizza-orange" : "text-white"
                      }`}
                      onClick={() => scrollToSection("pizza-creator")}
                    >
                      <Info className="h-4 w-4 mr-2" />
                      Pizza Creator
                    </Button>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${
                        activeTab === "dough-calculator" ? "bg-pizza-orange/20 text-pizza-orange" : "text-white"
                      }`}
                      onClick={() => scrollToSection("dough-calculator")}
                    >
                      <Calculator className="h-4 w-4 mr-2" />
                      Dough Calculator
                    </Button>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${
                        activeTab === "toppings" ? "bg-pizza-orange/20 text-pizza-orange" : "text-white"
                      }`}
                      onClick={() => scrollToSection("toppings")}
                    >
                      <Utensils className="h-4 w-4 mr-2" />
                      Toppings
                    </Button>

                    {/* Create with AI section with nested items */}
                    <div className="pl-0">
                      <Button
                        variant="ghost"
                        className={`w-full justify-start ${
                          activeTab.startsWith("create-with-ai") ? "bg-pizza-orange/20 text-pizza-orange" : "text-white"
                        }`}
                        onClick={() => scrollToSection("create-with-ai-overview")}
                      >
                        <Sparkles className="h-4 w-4 mr-2" />
                        Create with AI
                      </Button>

                      {/* Nested items */}
                      <div className="pl-6 space-y-1 mt-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`w-full justify-start text-sm ${
                            activeTab === "create-with-ai-overview" ? "text-pizza-orange" : "text-white/70"
                          }`}
                          onClick={() => scrollToSection("create-with-ai-overview")}
                        >
                          Overview
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`w-full justify-start text-sm ${
                            activeTab === "create-with-ai-prompts" ? "text-pizza-orange" : "text-white/70"
                          }`}
                          onClick={() => scrollToSection("create-with-ai-prompts")}
                        >
                          Writing Effective Prompts
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`w-full justify-start text-sm ${
                            activeTab === "create-with-ai-components" ? "text-pizza-orange" : "text-white/70"
                          }`}
                          onClick={() => scrollToSection("create-with-ai-components")}
                        >
                          Recipe Components
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`w-full justify-start text-sm ${
                            activeTab === "create-with-ai-customizing" ? "text-pizza-orange" : "text-white/70"
                          }`}
                          onClick={() => scrollToSection("create-with-ai-customizing")}
                        >
                          Customizing Results
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`w-full justify-start text-sm ${
                            activeTab === "create-with-ai-saving" ? "text-pizza-orange" : "text-white/70"
                          }`}
                          onClick={() => scrollToSection("create-with-ai-saving")}
                        >
                          Saving & Using AI Recipes
                        </Button>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${
                        activeTab === "shopping-list" ? "bg-pizza-orange/20 text-pizza-orange" : "text-white"
                      }`}
                      onClick={() => scrollToSection("shopping-list")}
                    >
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Shopping List
                    </Button>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${
                        activeTab === "meal-planner" ? "bg-pizza-orange/20 text-pizza-orange" : "text-white"
                      }`}
                      onClick={() => scrollToSection("meal-planner")}
                    >
                      <CalendarDays className="h-4 w-4 mr-2" />
                      Meal Planner
                    </Button>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${
                        activeTab === "saved-recipes" ? "bg-pizza-orange/20 text-pizza-orange" : "text-white"
                      }`}
                      onClick={() => scrollToSection("saved-recipes")}
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Saved Recipes
                    </Button>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${
                        activeTab === "tips-tricks" ? "bg-pizza-orange/20 text-pizza-orange" : "text-white"
                      }`}
                      onClick={() => scrollToSection("tips-tricks")}
                    >
                      <Lightbulb className="h-4 w-4 mr-2" />
                      Tips & Tricks
                    </Button>
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Content Area */}
            <div className="flex-1">
              <Card className="bg-pizza-charcoal border-pizza-orange/20">
                <CardContent className="p-6">
                  {/* Pizza Creator */}
                  {activeTab === "pizza-creator" && (
                    <div id="content-pizza-creator" tabIndex={-1} className="space-y-6 outline-none">
                      <h2 className="text-2xl font-bold text-white">Pizza Creator</h2>
                      <p className="text-white/80">
                        Tap the <span className="text-pizza-orange font-medium">Pizza Creator</span> tile on the home
                        screen to start designing your perfect pizza.
                      </p>

                      <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-white">The Pizza Creation Process</h3>
                        <p className="text-white/80">
                          Creating a pizza plan involves 8 simple steps. Each step builds upon the previous one to
                          create a comprehensive pizza plan tailored to your preferences.
                        </p>

                        <div className="space-y-4">
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pizza-orange flex items-center justify-center text-white font-bold">
                              1
                            </div>
                            <div>
                              <h4 className="text-lg font-medium text-white">Select Pizza Type</h4>
                              <p className="text-white/70">
                                Choose from various styles like Neapolitan, New York, Detroit, and more
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pizza-orange flex items-center justify-center text-white font-bold">
                              2
                            </div>
                            <div>
                              <h4 className="text-lg font-medium text-white">Choose Size</h4>
                              <p className="text-white/70">Select from standard sizes or specify custom dimensions</p>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pizza-orange flex items-center justify-center text-white font-bold">
                              3
                            </div>
                            <div>
                              <h4 className="text-lg font-medium text-white">What to Make</h4>
                              <p className="text-white/70">
                                Decide on making your own dough or using store-bought, and topping preferences
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pizza-orange flex items-center justify-center text-white font-bold">
                              4
                            </div>
                            <div>
                              <h4 className="text-lg font-medium text-white">How Many Pizzas</h4>
                              <p className="text-white/70">Specify the quantity of pizzas you want to make</p>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pizza-orange flex items-center justify-center text-white font-bold">
                              5
                            </div>
                            <div>
                              <h4 className="text-lg font-medium text-white">Timing</h4>
                              <p className="text-white/70">Choose when you want your pizza ready</p>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pizza-orange flex items-center justify-center text-white font-bold">
                              6
                            </div>
                            <div>
                              <h4 className="text-lg font-medium text-white">Oven Type</h4>
                              <p className="text-white/70">Select your cooking equipment</p>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pizza-orange flex items-center justify-center text-white font-bold">
                              7
                            </div>
                            <div>
                              <h4 className="text-lg font-medium text-white">Toppings</h4>
                              <p className="text-white/70">Choose toppings from categories or use AI suggestions</p>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pizza-orange flex items-center justify-center text-white font-bold">
                              8
                            </div>
                            <div>
                              <h4 className="text-lg font-medium text-white">Summary</h4>
                              <p className="text-white/70">
                                Review your plan, save it, and add it to your meal planner
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Pizza Type Selection</h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-pizza-orange">
                            <Info className="h-5 w-5" />
                            <span className="font-medium">Step 1 of 8</span>
                          </div>
                          <p className="text-white/80">
                            This is the first step in creating your pizza plan. The type of pizza you select will
                            determine the dough characteristics, cooking method, and overall style of your pizza.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Dough Calculator */}
                  {activeTab === "dough-calculator" && (
                    <div id="content-dough-calculator" tabIndex={-1} className="space-y-6 outline-none">
                      <h2 className="text-2xl font-bold text-white">Dough Calculator</h2>
                      <p className="text-white/80">
                        The Dough Calculator helps you determine the exact ingredients needed for your pizza dough based
                        on your preferences and requirements.
                      </p>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">How to Use the Dough Calculator</h3>
                        <p className="text-white/80">
                          Our dough calculator takes the guesswork out of pizza dough preparation. Follow these steps to
                          get precise measurements for your perfect dough:
                        </p>

                        <div className="space-y-4">
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pizza-orange flex items-center justify-center text-white font-bold">
                              1
                            </div>
                            <div>
                              <h4 className="text-lg font-medium text-white">Select Pizza Style</h4>
                              <p className="text-white/70">
                                Choose from Neapolitan, New York, Detroit, Sicilian, Chicago, or other styles. Each
                                style has different hydration levels and ingredient ratios.
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pizza-orange flex items-center justify-center text-white font-bold">
                              2
                            </div>
                            <div>
                              <h4 className="text-lg font-medium text-white">Enter Number of Pizzas</h4>
                              <p className="text-white/70">Specify how many pizzas you plan to make.</p>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pizza-orange flex items-center justify-center text-white font-bold">
                              3
                            </div>
                            <div>
                              <h4 className="text-lg font-medium text-white">Choose Dough Ball Size</h4>
                              <p className="text-white/70">
                                Select the weight of each dough ball based on your pizza size (small, medium, large, or
                                custom).
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pizza-orange flex items-center justify-center text-white font-bold">
                              4
                            </div>
                            <div>
                              <h4 className="text-lg font-medium text-white">Adjust Hydration (Optional)</h4>
                              <p className="text-white/70">
                                Fine-tune the water percentage for your dough. Higher hydration creates a more open,
                                airy crumb structure.
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pizza-orange flex items-center justify-center text-white font-bold">
                              5
                            </div>
                            <div>
                              <h4 className="text-lg font-medium text-white">Get Your Recipe</h4>
                              <p className="text-white/70">
                                The calculator will provide exact measurements for flour, water, salt, and yeast based
                                on your inputs.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Understanding Dough Hydration</h3>
                        <p className="text-white/80">
                          Hydration refers to the ratio of water to flour in your dough, expressed as a percentage.
                          Different pizza styles have different ideal hydration levels:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-white/80">
                          <li>
                            <span className="text-pizza-orange font-medium">Neapolitan:</span> 55-65% hydration -
                            creates a light, airy crust with a crisp exterior
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">New York:</span> 60-65% hydration - slightly
                            more chewy with good structure
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Detroit:</span> 65-75% hydration - higher
                            hydration for a light, airy pan pizza
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Sicilian:</span> 70-80% hydration - very
                            high hydration for a focaccia-like texture
                          </li>
                        </ul>
                        <p className="text-white/80">
                          Higher hydration doughs are typically more difficult to handle but can produce a more open
                          crumb structure with larger air pockets.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Saving Your Calculations</h3>
                        <p className="text-white/80">
                          After calculating your dough recipe, you can save it to your profile for future reference. You
                          can also add the ingredients directly to your shopping list with a single tap.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Toppings */}
                  {activeTab === "toppings" && (
                    <div id="content-toppings" tabIndex={-1} className="space-y-6 outline-none">
                      <h2 className="text-2xl font-bold text-white">Toppings</h2>
                      <p className="text-white/80">
                        Explore our extensive collection of pizza toppings, organized by category, to find the perfect
                        combinations for your homemade pizzas.
                      </p>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Browsing Toppings</h3>
                        <p className="text-white/80">
                          Our toppings section is organized into five main categories to help you find exactly what
                          you're looking for:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-white/80">
                          <li>
                            <span className="text-pizza-orange font-medium">Meats:</span> Pepperoni, sausage, bacon,
                            ham, prosciutto, chicken, meatballs, salami, and more
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Vegetables:</span> Mushrooms, bell peppers,
                            onions, olives, spinach, artichokes, tomatoes, garlic, and more
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Cheeses:</span> Mozzarella, parmesan,
                            gorgonzola, ricotta, provolone, feta, goat cheese, cheddar, and more
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Herbs & Spices:</span> Basil, oregano, red
                            pepper flakes, rosemary, thyme, black pepper, garlic powder, Italian seasoning, and more
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Specialty:</span> Pineapple, anchovies,
                            capers, sun-dried tomatoes, truffle oil, hot honey, arugula, balsamic glaze, and more
                          </li>
                        </ul>
                        <p className="text-white/80">
                          Each topping includes a description of its flavor profile and characteristics to help you make
                          informed choices.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Searching for Toppings</h3>
                        <p className="text-white/80">
                          Use the search bar at the top of the Toppings page to quickly find specific ingredients. You
                          can search by name or by flavor profile (e.g., "spicy" or "sweet").
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Classic Topping Combinations</h3>
                        <p className="text-white/80">
                          Here are some classic pizza topping combinations to inspire your creations:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-white/80">
                          <li>
                            <span className="text-pizza-orange font-medium">Margherita:</span> San Marzano tomatoes,
                            fresh mozzarella, basil, olive oil, salt
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Quattro Formaggi (Four Cheese):</span>{" "}
                            Mozzarella, gorgonzola, parmesan, ricotta
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Pepperoni:</span> Tomato sauce, mozzarella,
                            pepperoni
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Supreme:</span> Tomato sauce, mozzarella,
                            pepperoni, sausage, bell peppers, onions, olives, mushrooms
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Hawaiian:</span> Tomato sauce, mozzarella,
                            ham, pineapple
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Vegetarian:</span> Tomato sauce, mozzarella,
                            bell peppers, onions, mushrooms, spinach
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">BBQ Chicken:</span> BBQ sauce, mozzarella,
                            chicken, red onions, cilantro
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">White Pizza:</span> Olive oil, garlic,
                            ricotta, mozzarella, spinach
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Adding Toppings to Shopping List</h3>
                        <p className="text-white/80">
                          When browsing toppings, you can add any ingredient directly to your shopping list with a
                          single tap. This makes it easy to prepare for your next pizza-making session.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Create with AI - Overview */}
                  {activeTab === "create-with-ai-overview" && (
                    <div id="content-create-with-ai-overview" tabIndex={-1} className="space-y-6 outline-none">
                      <h2 className="text-2xl font-bold text-white">Create with AI - Overview</h2>
                      <p className="text-white/80">
                        The Create with AI feature uses artificial intelligence to help you design unique pizza recipes
                        based on your preferences, dietary restrictions, and available ingredients.
                      </p>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">What Can AI Do For Your Pizza Making?</h3>
                        <p className="text-white/80">Our AI assistant can help you in several ways:</p>
                        <ul className="list-disc pl-5 space-y-2 text-white/80">
                          <li>
                            <span className="text-pizza-orange font-medium">Generate unique recipes:</span> Create
                            custom pizza recipes based on your preferences
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Suggest topping combinations:</span> Get
                            creative topping ideas that work well together
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Adapt to dietary needs:</span> Find
                            alternatives for allergies or dietary restrictions
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Work with what you have:</span> Create
                            recipes using ingredients you already have
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Provide detailed instructions:</span> Get
                            step-by-step guidance for any pizza style
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Getting Started with AI</h3>
                        <p className="text-white/80">To start using the AI feature:</p>
                        <ol className="list-decimal pl-5 space-y-2 text-white/80">
                          <li>Tap the "Create with AI" tile on the home screen</li>
                          <li>Enter your preferences, restrictions, or specific requests in the prompt field</li>
                          <li>Tap "Generate Recipe" to have the AI create a custom recipe for you</li>
                          <li>Review the results and customize as needed</li>
                          <li>Save your creation to your recipe collection</li>
                        </ol>
                        <p className="text-white/80">
                          The more specific your prompt, the more tailored your results will be. Check out the "Writing
                          Effective Prompts" section for tips on getting the best results.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Create with AI - Writing Effective Prompts */}
                  {activeTab === "create-with-ai-prompts" && (
                    <div id="content-create-with-ai-prompts" tabIndex={-1} className="space-y-6 outline-none">
                      <h2 className="text-2xl font-bold text-white">Create with AI - Writing Effective Prompts</h2>
                      <p className="text-white/80">
                        The quality of your AI-generated pizza recipes depends largely on how well you communicate your
                        needs and preferences to the AI. Here's how to write effective prompts.
                      </p>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Prompt Structure</h3>
                        <p className="text-white/80">A good AI prompt typically includes:</p>
                        <ul className="list-disc pl-5 space-y-2 text-white/80">
                          <li>
                            <span className="text-pizza-orange font-medium">Pizza style:</span> Specify the type of
                            pizza you want (Neapolitan, New York, Detroit, etc.)
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Flavor profile:</span> Describe the flavors
                            you're looking for (spicy, savory, sweet, etc.)
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Key ingredients:</span> List any must-have
                            ingredients
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Dietary restrictions:</span> Mention any
                            allergies or dietary preferences
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Cooking method:</span> Specify your oven
                            type or cooking equipment
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Example Prompts</h3>
                        <p className="text-white/80">Here are some examples of effective prompts:</p>
                        <div className="bg-black/30 p-4 rounded-md space-y-3">
                          <p className="text-white/90 italic">
                            "Create a Neapolitan pizza recipe with a spicy flavor profile. I have fresh mozzarella,
                            basil, and San Marzano tomatoes. I'm cooking in a home oven with a pizza stone."
                          </p>
                          <p className="text-white/90 italic">
                            "I need a vegetarian Detroit-style pizza that's kid-friendly. No mushrooms please. I have a
                            rectangular pan and a conventional oven."
                          </p>
                          <p className="text-white/90 italic">
                            "Design a gluten-free thin crust pizza with Mediterranean flavors. I love feta cheese and
                            olives. I'll be cooking on a pizza steel."
                          </p>
                          <p className="text-white/90 italic">
                            "I have leftover chicken, bell peppers, and red onions. Can you suggest a BBQ-inspired pizza
                            that uses these ingredients? I'll be cooking in a regular home oven."
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Tips for Better Results</h3>
                        <ul className="list-disc pl-5 space-y-2 text-white/80">
                          <li>
                            <span className="text-pizza-orange font-medium">Be specific:</span> The more details you
                            provide, the more tailored your recipe will be
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Mention constraints:</span> If you have
                            limited ingredients or equipment, make that clear
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Ask for variations:</span> Request multiple
                            options to choose from
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Specify skill level:</span> Let the AI know
                            if you're a beginner or experienced pizza maker
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Request specific details:</span> Ask for
                            cooking temperatures, times, or techniques if needed
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">What to Avoid</h3>
                        <ul className="list-disc pl-5 space-y-2 text-white/80">
                          <li>
                            <span className="text-pizza-orange font-medium">Vague requests:</span> "Make me a good
                            pizza" doesn't give the AI enough information
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Contradictory requirements:</span> Asking
                            for both authentic Neapolitan and deep dish characteristics
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Unrealistic expectations:</span> Requesting
                            ingredients or techniques that aren't compatible
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Create with AI - Recipe Components */}
                  {activeTab === "create-with-ai-components" && (
                    <div id="content-create-with-ai-components" tabIndex={-1} className="space-y-6 outline-none">
                      <h2 className="text-2xl font-bold text-white">Create with AI - Recipe Components</h2>
                      <p className="text-white/80">
                        Understanding the different components of an AI-generated pizza recipe will help you get the
                        most out of this feature.
                      </p>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Recipe Structure</h3>
                        <p className="text-white/80">AI-generated recipes typically include these key components:</p>
                        <ul className="list-disc pl-5 space-y-2 text-white/80">
                          <li>
                            <span className="text-pizza-orange font-medium">Recipe Name:</span> A descriptive title for
                            your pizza creation
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Description:</span> A brief overview of the
                            pizza's flavor profile and characteristics
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Dough Ingredients:</span> List of
                            ingredients needed for the pizza base
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Sauce Ingredients:</span> Components for the
                            sauce or base spread
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Toppings:</span> All ingredients that go on
                            top of the sauce
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Equipment Needed:</span> Tools and cookware
                            required
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Preparation Instructions:</span>{" "}
                            Step-by-step directions for making the dough and sauce
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Assembly Instructions:</span> How to build
                            your pizza
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Cooking Instructions:</span> Temperature,
                            time, and techniques for baking
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Serving Suggestions:</span> Recommendations
                            for garnishes, sides, or pairings
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Customizable Elements</h3>
                        <p className="text-white/80">
                          After generating a recipe, you can customize any of these components:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-white/80">
                          <li>
                            <span className="text-pizza-orange font-medium">Dough:</span> Adjust hydration levels, flour
                            types, or rising times
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Sauce:</span> Modify ingredients, cooking
                            methods, or consistency
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Toppings:</span> Add, remove, or substitute
                            ingredients
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Cooking Method:</span> Adapt for different
                            ovens or cooking equipment
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Portion Size:</span> Scale the recipe up or
                            down for different numbers of pizzas
                          </li>
                        </ul>
                        <p className="text-white/80">
                          Use the edit button next to each section to make your changes. The AI will help ensure your
                          modifications work well together.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Advanced Recipe Features</h3>
                        <p className="text-white/80">
                          Our AI can also provide these additional components upon request:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-white/80">
                          <li>
                            <span className="text-pizza-orange font-medium">Nutritional Information:</span> Estimated
                            calories and macronutrients
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Make-Ahead Tips:</span> How to prepare
                            components in advance
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Troubleshooting Guide:</span> Solutions for
                            common pizza-making problems
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Variations:</span> Alternative versions of
                            the same basic recipe
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Storage Instructions:</span> How to store
                            leftovers properly
                          </li>
                        </ul>
                        <p className="text-white/80">
                          To get these additional components, simply ask for them specifically in your prompt or use the
                          "Add Section" button after generating your initial recipe.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Create with AI - Customizing Results */}
                  {activeTab === "create-with-ai-customizing" && (
                    <div id="content-create-with-ai-customizing" tabIndex={-1} className="space-y-6 outline-none">
                      <h2 className="text-2xl font-bold text-white">Create with AI - Customizing Results</h2>
                      <p className="text-white/80">
                        After generating an AI recipe, you can refine and customize it to perfectly match your
                        preferences and needs.
                      </p>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Editing Your Recipe</h3>
                        <p className="text-white/80">There are several ways to customize your AI-generated recipe:</p>
                        <ul className="list-disc pl-5 space-y-2 text-white/80">
                          <li>
                            <span className="text-pizza-orange font-medium">Direct Editing:</span> Tap the edit icon
                            next to any section to modify text directly
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Follow-up Prompts:</span> Ask the AI to make
                            specific changes to the recipe
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Regenerate Sections:</span> Request a new
                            version of just one part of the recipe
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Add/Remove Sections:</span> Customize the
                            structure of your recipe
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Customization Examples</h3>
                        <p className="text-white/80">Here are some examples of how to request customizations:</p>
                        <div className="bg-black/30 p-4 rounded-md space-y-3">
                          <p className="text-white/90 italic">"Make the sauce spicier by adding red pepper flakes."</p>
                          <p className="text-white/90 italic">"Replace the mushrooms with artichokes."</p>
                          <p className="text-white/90 italic">"Adjust the recipe for a thinner crust."</p>
                          <p className="text-white/90 italic">
                            "Add instructions for preparing the dough a day ahead."
                          </p>
                          <p className="text-white/90 italic">
                            "Modify the cooking temperature for a conventional oven instead of a pizza oven."
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Fine-Tuning Ingredients</h3>
                        <p className="text-white/80">
                          You can make precise adjustments to ingredients in several ways:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-white/80">
                          <li>
                            <span className="text-pizza-orange font-medium">Adjust Quantities:</span> Change the amount
                            of any ingredient
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Substitute Ingredients:</span> Replace items
                            with alternatives
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Add New Ingredients:</span> Incorporate
                            additional components
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Remove Ingredients:</span> Take out items
                            you don't want to use
                          </li>
                        </ul>
                        <p className="text-white/80">
                          The AI will automatically adjust related instructions when you modify ingredients.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Adapting Cooking Methods</h3>
                        <p className="text-white/80">
                          You can customize the cooking instructions based on your equipment:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-white/80">
                          <li>
                            <span className="text-pizza-orange font-medium">Oven Type:</span> Home oven, pizza oven,
                            outdoor grill, etc.
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Cooking Surface:</span> Pizza stone, steel,
                            pan, or directly on the rack
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Temperature Adjustments:</span> Modify for
                            your specific equipment
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Cooking Techniques:</span> Par-baking,
                            broiling, or other special methods
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Testing and Iterating</h3>
                        <p className="text-white/80">
                          The best recipes often come from experimentation and refinement:
                        </p>
                        <ol className="list-decimal pl-5 space-y-2 text-white/80">
                          <li>Start with the AI-generated recipe as a base</li>
                          <li>Make your customizations based on preferences and available ingredients</li>
                          <li>Try making the pizza and note what works well and what could be improved</li>
                          <li>Return to the AI with specific feedback to refine the recipe</li>
                          <li>Save different versions to compare and combine the best elements</li>
                        </ol>
                      </div>
                    </div>
                  )}

                  {/* Create with AI - Saving & Using AI Recipes */}
                  {activeTab === "create-with-ai-saving" && (
                    <div id="content-create-with-ai-saving" tabIndex={-1} className="space-y-6 outline-none">
                      <h2 className="text-2xl font-bold text-white">Create with AI - Saving & Using AI Recipes</h2>
                      <p className="text-white/80">
                        Once you've created and customized your perfect AI-generated pizza recipe, you can save it and
                        integrate it with other app features.
                      </p>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Saving Your Recipes</h3>
                        <p className="text-white/80">To save an AI-generated recipe:</p>
                        <ol className="list-decimal pl-5 space-y-2 text-white/80">
                          <li>Tap the "Save Recipe" button at the bottom of your generated recipe</li>
                          <li>Give your recipe a name (or keep the AI-suggested name)</li>
                          <li>Add tags if desired for easier searching later</li>
                          <li>Choose a category or create a new one</li>
                          <li>Tap "Save" to add it to your saved recipes</li>
                        </ol>
                        <p className="text-white/80">
                          All saved recipes can be accessed from the "Saved Recipes" section of the app.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Adding to Meal Planner</h3>
                        <p className="text-white/80">You can schedule your AI-created pizzas in your meal planner:</p>
                        <ol className="list-decimal pl-5 space-y-2 text-white/80">
                          <li>From the recipe view, tap "Add to Meal Planner"</li>
                          <li>Select a date and time for your pizza meal</li>
                          <li>Choose how many pizzas you'll be making</li>
                          <li>Optionally set up prep reminders</li>
                          <li>Tap "Add to Calendar" to schedule it</li>
                        </ol>
                        <p className="text-white/80">
                          The app will automatically calculate when you need to start preparing the dough based on the
                          recipe's requirements.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Creating Shopping Lists</h3>
                        <p className="text-white/80">Turn your AI recipe into a shopping list with one tap:</p>
                        <ol className="list-decimal pl-5 space-y-2 text-white/80">
                          <li>From the recipe view, tap "Add to Shopping List"</li>
                          <li>Select which components you need (dough ingredients, sauce, toppings)</li>
                          <li>Deselect any items you already have</li>
                          <li>Choose when you plan to shop (This Week, Next Week, etc.)</li>
                          <li>Tap "Add Selected Items" to update your shopping list</li>
                        </ol>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Sharing Your AI Creations</h3>
                        <p className="text-white/80">Share your custom AI recipes with friends and family:</p>
                        <ul className="list-disc pl-5 space-y-2 text-white/80">
                          <li>
                            <span className="text-pizza-orange font-medium">Export as PDF:</span> Create a printable
                            version of your recipe
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Share Link:</span> Generate a link that
                            others can use to view and import your recipe
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Social Media:</span> Post directly to your
                            social platforms
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Email/Message:</span> Send via your
                            preferred messaging app
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Editing Saved AI Recipes</h3>
                        <p className="text-white/80">You can continue to refine your saved recipes:</p>
                        <ol className="list-decimal pl-5 space-y-2 text-white/80">
                          <li>Go to "Saved Recipes" and select the AI recipe you want to modify</li>
                          <li>Tap "Edit Recipe" to make changes</li>
                          <li>You can edit manually or tap "AI Assist" to get help with specific modifications</li>
                          <li>Save your changes as a new version or update the existing recipe</li>
                        </ol>
                        <p className="text-white/80">
                          The app keeps a history of your recipe versions, so you can always go back to previous
                          iterations.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Shopping List */}
                  {activeTab === "shopping-list" && (
                    <div id="content-shopping-list" tabIndex={-1} className="space-y-6 outline-none">
                      <h2 className="text-2xl font-bold text-white">Shopping List</h2>
                      <p className="text-white/80">
                        The Shopping List feature helps you organize and track all the ingredients you need for your
                        pizza-making adventures.
                      </p>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Managing Your Shopping List</h3>
                        <p className="text-white/80">
                          The Shopping List organizes ingredients by category and allows you to:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-white/80">
                          <li>
                            <span className="text-pizza-orange font-medium">Add items manually:</span> Enter custom
                            ingredients with quantities
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Import from recipes:</span> Add all
                            ingredients from a saved recipe
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Check off items:</span> Mark ingredients as
                            purchased
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Filter by date range:</span> View items
                            needed for specific time periods
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Delete checked items:</span> Remove
                            purchased ingredients from your list
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Ingredient Categories</h3>
                        <p className="text-white/80">
                          Your shopping list automatically organizes ingredients into these categories:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-white/80">
                          <li>
                            <span className="text-pizza-orange font-medium">Dough:</span> Flour, yeast, salt, etc.
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Sauce:</span> Tomatoes, herbs, spices for
                            sauce
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Cheese:</span> Mozzarella and other cheeses
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Toppings:</span> Meats, vegetables, and
                            other toppings
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Herbs:</span> Fresh and dried herbs
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Oils:</span> Olive oil and other oils
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Extras:</span> Additional items and
                            miscellaneous ingredients
                          </li>
                        </ul>
                        <p className="text-white/80">
                          This organization makes it easier to shop efficiently at the grocery store.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Date Ranges</h3>
                        <p className="text-white/80">
                          The Shopping List allows you to organize items by when you'll need them:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-white/80">
                          <li>
                            <span className="text-pizza-orange font-medium">This Week:</span> Items needed for immediate
                            pizza plans
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Next Week:</span> Ingredients for upcoming
                            pizza sessions
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">This Month:</span> Longer-term planning
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">All:</span> View your complete shopping list
                          </li>
                        </ul>
                        <p className="text-white/80">
                          This feature is especially useful when planning multiple pizza nights or when some ingredients
                          need to be purchased in advance.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Adding Items to Your List</h3>
                        <p className="text-white/80">There are several ways to add items to your shopping list:</p>
                        <ol className="list-decimal pl-5 space-y-2 text-white/80">
                          <li>Tap the "+" button to add individual items manually</li>
                          <li>From a recipe page, tap "Add to Shopping List" to import all ingredients</li>
                          <li>From the Toppings browser, tap the "+" on any ingredient to add it</li>
                          <li>
                            From the Meal Planner, select a planned pizza and tap "Add Ingredients to Shopping List"
                          </li>
                        </ol>
                        <p className="text-white/80">
                          When adding items manually, you can specify the name, quantity, category, and date range.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Shopping List Tips</h3>
                        <ul className="list-disc pl-5 space-y-2 text-white/80">
                          <li>
                            <span className="text-pizza-orange font-medium">Regular cleanup:</span> Use the trash icon
                            to remove checked items and keep your list manageable
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Check for duplicates:</span> The app will
                            warn you about potential duplicate items
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Use date filters:</span> Shop efficiently by
                            focusing on what you need for specific time periods
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Add notes:</span> Long-press on an item to
                            add notes (like specific brands or alternatives)
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Meal Planner */}
                  {activeTab === "meal-planner" && (
                    <div id="content-meal-planner" tabIndex={-1} className="space-y-6 outline-none">
                      <h2 className="text-2xl font-bold text-white">Meal Planner</h2>
                      <p className="text-white/80">
                        The Meal Planner helps you schedule your pizza-making sessions and ensures you're prepared with
                        timely reminders for dough preparation.
                      </p>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Calendar View</h3>
                        <p className="text-white/80">
                          The calendar view provides a visual representation of your pizza plans:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-white/80">
                          <li>
                            <span className="text-pizza-orange font-medium">Pizza Days:</span> Days when you plan to
                            make and enjoy pizza
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Prep Days:</span> Days when you need to
                            start preparing dough or other components
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Toggle visibility:</span> Show/hide pizza
                            days or prep days as needed
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Month navigation:</span> Easily move between
                            months to plan ahead
                          </li>
                        </ul>
                        <p className="text-white/80">
                          Tap on any day in the calendar to see details or add a new pizza plan.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">List View</h3>
                        <p className="text-white/80">
                          The list view shows your upcoming pizza plans and prep reminders in chronological order:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-white/80">
                          <li>
                            <span className="text-pizza-orange font-medium">Upcoming preparations:</span> What you need
                            to start preparing soon
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Scheduled pizza meals:</span> Your planned
                            pizza dinners
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Quick access:</span> Tap any item to view
                            the associated recipe
                          </li>
                        </ul>
                        <p className="text-white/80">
                          The list view is particularly useful for seeing what you need to do in the next few days.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Adding Pizza Plans</h3>
                        <p className="text-white/80">To add a new pizza plan to your calendar:</p>
                        <ol className="list-decimal pl-5 space-y-2 text-white/80">
                          <li>From a saved recipe, tap "Add to Meal Planner"</li>
                          <li>Select the date and time when you want to enjoy your pizza</li>
                          <li>Specify how many pizzas you'll be making</li>
                          <li>Choose whether to enable prep reminders</li>
                          <li>Tap "Add to Calendar" to schedule it</li>
                        </ol>
                        <p className="text-white/80">
                          You can also add a plan directly from the Meal Planner by tapping on a date and selecting "Add
                          Pizza Plan."
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Prep Reminders</h3>
                        <p className="text-white/80">
                          One of the most valuable features of the Meal Planner is automatic prep reminders:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-white/80">
                          <li>
                            <span className="text-pizza-orange font-medium">Automatic calculation:</span> The app
                            determines when you need to start preparing dough based on the recipe's fermentation time
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Custom reminders:</span> Set additional
                            reminders for shopping or other preparations
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Notifications:</span> Receive alerts when
                            it's time to start prepping
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Prep instructions:</span> Access the
                            specific preparation steps directly from the reminder
                          </li>
                        </ul>
                        <p className="text-white/80">
                          For example, if you're making a Neapolitan pizza with a 24-hour fermentation, the app will
                          remind you to make the dough a day before your scheduled pizza night.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Managing Your Schedule</h3>
                        <p className="text-white/80">To manage your pizza schedule effectively:</p>
                        <ul className="list-disc pl-5 space-y-2 text-white/80">
                          <li>
                            <span className="text-pizza-orange font-medium">Edit plans:</span> Tap on any scheduled plan
                            to modify date, time, or recipe
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Delete plans:</span> Remove plans you no
                            longer want to keep
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Recurring plans:</span> Set up weekly or
                            monthly pizza nights
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Sync with calendar:</span> Optionally
                            integrate with your device's calendar app
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Saved Recipes */}
                  {activeTab === "saved-recipes" && (
                    <div id="content-saved-recipes" tabIndex={-1} className="space-y-6 outline-none">
                      <h2 className="text-2xl font-bold text-white">Saved Recipes</h2>
                      <p className="text-white/80">
                        The Saved Recipes section is your personal pizza recipe collection, where you can store,
                        organize, and access all your favorite pizza creations.
                      </p>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Viewing Your Recipes</h3>
                        <p className="text-white/80">You can view your saved recipes in two formats:</p>
                        <ul className="list-disc pl-5 space-y-2 text-white/80">
                          <li>
                            <span className="text-pizza-orange font-medium">Grid View:</span> Visual display with images
                            of your pizzas
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">List View:</span> Detailed list with more
                            information about each recipe
                          </li>
                        </ul>
                        <p className="text-white/80">
                          Both views allow you to quickly access your saved recipes and perform actions like adding to
                          the meal planner or marking as favorites.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Organizing Your Collection</h3>
                        <p className="text-white/80">Keep your recipe collection organized with these features:</p>
                        <ul className="list-disc pl-5 space-y-2 text-white/80">
                          <li>
                            <span className="text-pizza-orange font-medium">Search:</span> Find recipes by name, type,
                            or ingredients
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Filter:</span> Sort by pizza type,
                            favorites, or date created
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Favorites:</span> Mark your best recipes
                            with a star for quick access
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Tags:</span> Add custom tags to categorize
                            your recipes
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Sort:</span> Arrange recipes by name, date,
                            or most frequently used
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Recipe Actions</h3>
                        <p className="text-white/80">Each saved recipe offers several actions you can take:</p>
                        <ul className="list-disc pl-5 space-y-2 text-white/80">
                          <li>
                            <span className="text-pizza-orange font-medium">View Details:</span> See the complete recipe
                            with all instructionsns
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Edit:</span> Modify any aspect of the recipe
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Delete:</span> Remove recipes you no longer
                            want
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Duplicate:</span> Create a copy to use as a
                            starting point for variations
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Add to Meal Planner:</span> Schedule this
                            recipe in your calendar
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Add to Shopping List:</span> Add ingredients
                            to your shopping list
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Share:</span> Send the recipe to friends or
                            family
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Recipe Details</h3>
                        <p className="text-white/80">
                          When viewing a saved recipe, you'll see comprehensive information:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-white/80">
                          <li>
                            <span className="text-pizza-orange font-medium">Recipe Name:</span> The title of your pizza
                            creation
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Pizza Type:</span> Style (Neapolitan,
                            Detroit, etc.)
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Size:</span> Dimensions or diameter
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Ingredients:</span> Complete list with
                            measurements
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Instructions:</span> Step-by-step
                            preparation and cooking directions
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Notes:</span> Any additional information or
                            tips you've added
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Creation Date:</span> When the recipe was
                            saved
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Last Made:</span> When you last used this
                            recipe (if tracked)
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Recipe Versioning</h3>
                        <p className="text-white/80">The app keeps track of changes to your recipes:</p>
                        <ul className="list-disc pl-5 space-y-2 text-white/80">
                          <li>
                            <span className="text-pizza-orange font-medium">Version History:</span> See previous
                            iterations of your recipes
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Restore Versions:</span> Go back to earlier
                            versions if needed
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Compare Versions:</span> See what changed
                            between iterations
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Notes:</span> Add comments about why you
                            made certain changes
                          </li>
                        </ul>
                        <p className="text-white/80">
                          This feature is particularly useful as you refine your recipes over time.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Tips & Tricks */}
                  {activeTab === "tips-tricks" && (
                    <div id="content-tips-tricks" tabIndex={-1} className="space-y-6 outline-none">
                      <h2 className="text-2xl font-bold text-white">Tips & Tricks</h2>
                      <p className="text-white/80">
                        Elevate your pizza-making skills with these expert tips and tricks for every aspect of the
                        pizza-making process.
                      </p>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Dough Preparation</h3>
                        <ul className="list-disc pl-5 space-y-2 text-white/80">
                          <li>
                            <span className="text-pizza-orange font-medium">Use cold water:</span> For longer
                            fermentation, use cold water to slow yeast activity
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Weigh ingredients:</span> For consistent
                            results, use a scale instead of volume measurements
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Autolyse:</span> Mix flour and water first,
                            let rest for 30 minutes before adding salt and yeast
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Cold fermentation:</span> Develop flavor by
                            refrigerating dough for 24-72 hours
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Proper kneading:</span> Develop gluten by
                            kneading until the dough passes the "windowpane test"
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Room temperature finish:</span> Remove dough
                            from refrigerator 1-2 hours before shaping
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Shaping Techniques</h3>
                        <ul className="list-disc pl-5 space-y-2 text-white/80">
                          <li>
                            <span className="text-pizza-orange font-medium">Gentle handling:</span> Preserve gas bubbles
                            by handling dough gently
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Flour management:</span> Use just enough
                            flour to prevent sticking
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Edge preservation:</span> Work from the
                            center outward, leaving the edge untouched for a good crust
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Gravity technique:</span> Use gravity to
                            help stretch the dough by draping it over your knuckles
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Rest periods:</span> If dough springs back
                            too much, let it rest for 5-10 minutes
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Docking:</span> For certain styles, use a
                            fork to prick the dough to prevent large bubbles
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Sauce Secrets</h3>
                        <ul className="list-disc pl-5 space-y-2 text-white/80">
                          <li>
                            <span className="text-pizza-orange font-medium">Less is more:</span> Apply sauce sparingly
                            to prevent soggy pizza
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">San Marzano tomatoes:</span> Use these for
                            authentic Neapolitan flavor
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">No-cook sauce:</span> For Neapolitan pizza,
                            simply blend quality tomatoes with salt
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Cooked sauce:</span> For New York style,
                            cook sauce to reduce water content and concentrate flavor
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Layered flavors:</span> Add herbs at
                            different stages for complex flavor
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Sauce temperature:</span> Apply room
                            temperature or cool sauce to prevent warming the dough
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Topping Techniques</h3>
                        <ul className="list-disc pl-5 space-y-2 text-white/80">
                          <li>
                            <span className="text-pizza-orange font-medium">Balance:</span> Aim for balance between
                            flavors, textures, and amounts
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Less is more:</span> Avoid overloading with
                            toppings, which can prevent proper cooking
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Moisture control:</span> Pre-cook watery
                            vegetables like mushrooms or zucchini
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Cheese application:</span> For even melting,
                            grate or slice cheese thinly and distribute evenly
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Layering order:</span> Place ingredients
                            that need more cooking closer to the sauce
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Post-bake toppings:</span> Add delicate
                            items like fresh basil, arugula, or prosciutto after baking
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Cooking Perfection</h3>
                        <ul className="list-disc pl-5 space-y-2 text-white/80">
                          <li>
                            <span className="text-pizza-orange font-medium">Preheat thoroughly:</span> Heat your stone,
                            steel, or oven for at least 45-60 minutes
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Maximum temperature:</span> Use the highest
                            setting your oven allows
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Position matters:</span> Place stone/steel
                            in upper third of oven for better top heat
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Broiler method:</span> Switch to broiler for
                            last minute to char toppings
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Rotation:</span> Turn pizza halfway through
                            for even cooking
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Steam release:</span> Crack oven door
                            slightly with wooden spoon to release steam for crispier crust
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Resting period:</span> Let pizza rest for
                            1-2 minutes before cutting to set the cheese
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Equipment Hacks</h3>
                        <ul className="list-disc pl-5 space-y-2 text-white/80">
                          <li>
                            <span className="text-pizza-orange font-medium">DIY pizza stone:</span> Use unglazed ceramic
                            tiles as an affordable alternative
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Parchment paper:</span> Use for easy
                            transfer to hot stone (trim edges to prevent burning)
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Cast iron skillet:</span> Perfect for deep
                            dish or pan pizzas
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Grill conversion:</span> Turn your outdoor
                            grill into a pizza oven with a stone
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Dual stone method:</span> Place one stone
                            above and below for more even cooking
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Cooling rack:</span> Place hot pizza on a
                            cooling rack after baking to prevent soggy bottom
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Troubleshooting Common Problems</h3>
                        <ul className="list-disc pl-5 space-y-2 text-white/80">
                          <li>
                            <span className="text-pizza-orange font-medium">Soggy center:</span> Use less sauce,
                            pre-cook watery toppings, ensure oven is hot enough
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Burnt crust/undercooked top:</span> Lower
                            oven position, use pizza stone
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Dough too elastic:</span> Let rest longer
                            before shaping
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Dough tears easily:</span> Insufficient
                            gluten development, knead more or use higher protein flour
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Pale crust:</span> Higher oven temperature,
                            longer preheat, add sugar to dough
                          </li>
                          <li>
                            <span className="text-pizza-orange font-medium">Cheese burns before crust is done:</span>{" "}
                            Start with partially baked crust, add cheese later
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

