"use client"

import { useState } from "react"
import { ChevronLeft } from "lucide-react"
import { PizzaTypeSelector } from "@/components/pizza-type-selector"
import { PizzaSizeSelector } from "@/components/pizza-size-selector"
import { PizzaQuantitySelector } from "@/components/pizza-quantity-selector"
import { PizzaTimingSelector } from "@/components/pizza-timing-selector"
import { PizzaOvenSelector } from "@/components/pizza-oven-selector"
import { PizzaToppingsSelector } from "@/components/pizza-toppings-selector"
import { PizzaPlanSummary } from "@/components/pizza-plan-summary"
import { ThemeToggle } from "@/components/theme-toggle"
import { PizzaComponentsSelector } from "@/components/pizza-components-selector"

type Step = "type" | "size" | "components" | "quantity" | "timing" | "oven" | "toppings" | "summary"

export function CreatePizzaPlan() {
  const [currentStep, setCurrentStep] = useState<Step>("type")
  const [selectedType, setSelectedType] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [timing, setTiming] = useState("")
  const [oven, setOven] = useState("")
  const [toppings, setToppings] = useState<string[]>([])
  const [doughOption, setDoughOption] = useState("make-dough")
  const [toppingsOption, setToppingsOption] = useState("app-toppings")

  const goToNextStep = () => {
    switch (currentStep) {
      case "type":
        setCurrentStep("size")
        break
      case "size":
        setCurrentStep("components")
        break
      case "components":
        setCurrentStep("quantity")
        break
      case "quantity":
        setCurrentStep("timing")
        break
      case "timing":
        setCurrentStep("oven")
        break
      case "oven":
        // Skip toppings step if user chose to use their own toppings
        if (toppingsOption === "own-toppings") {
          setCurrentStep("summary")
        } else {
          setCurrentStep("toppings")
        }
        break
      case "toppings":
        setCurrentStep("summary")
        break
    }
  }

  const goToPreviousStep = () => {
    switch (currentStep) {
      case "size":
        setCurrentStep("type")
        break
      case "components":
        setCurrentStep("size")
        break
      case "quantity":
        setCurrentStep("components")
        break
      case "timing":
        setCurrentStep("quantity")
        break
      case "oven":
        setCurrentStep("timing")
        break
      case "toppings":
        setCurrentStep("oven")
        break
      case "summary":
        if (toppingsOption === "own-toppings") {
          setCurrentStep("oven")
        } else {
          setCurrentStep("toppings")
        }
        break
    }
  }

  return (
    <div className="flex flex-col min-h-screen slate-bg pb-16">
      <header className="sticky top-0 dark-blue-bg border-b border-pizza-orange/20 z-10">
        <div className="container px-4 py-3 mx-auto max-w-md flex items-center">
          {currentStep !== "type" && (
            <button onClick={goToPreviousStep} className="mr-2 text-white">
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
          <div className="flex items-center flex-1">
            <img src="/images/pizza-navigator-icon.png" alt="Pizza Navigator" className="h-6 w-6 mr-2" />
            <h1 className="text-lg font-semibold text-white">Create Pizza Plan</h1>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container px-4 py-6 mx-auto max-w-md">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-medium text-white/70">
                Step{" "}
                {currentStep === "type"
                  ? "1"
                  : currentStep === "size"
                    ? "2"
                    : currentStep === "components"
                      ? "3"
                      : currentStep === "quantity"
                        ? "4"
                        : currentStep === "timing"
                          ? "5"
                          : currentStep === "oven"
                            ? "6"
                            : currentStep === "toppings"
                              ? "7"
                              : "8"}{" "}
                of {toppingsOption === "own-toppings" ? "7" : "8"}
              </h2>
              <div className="text-sm font-medium text-white">
                {currentStep === "type"
                  ? "Select Pizza Type"
                  : currentStep === "size"
                    ? "Choose Size"
                    : currentStep === "components"
                      ? "What to Make"
                      : currentStep === "quantity"
                        ? "How Many?"
                        : currentStep === "timing"
                          ? "When Do You Want It?"
                          : currentStep === "oven"
                            ? "Select Oven Type"
                            : currentStep === "toppings"
                              ? "Choose Toppings"
                              : "Review Plan"}
              </div>
            </div>
            <div className="w-full bg-[#0f1216] rounded-full h-1.5">
              <div
                className="bg-pizza-orange h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    currentStep === "type"
                      ? "12.5%"
                      : currentStep === "size"
                        ? "25%"
                        : currentStep === "components"
                          ? "37.5%"
                          : currentStep === "quantity"
                            ? "50%"
                            : currentStep === "timing"
                              ? "62.5%"
                              : currentStep === "oven"
                                ? "75%"
                                : currentStep === "toppings"
                                  ? "87.5%"
                                  : "100%"
                  }`,
                }}
              ></div>
            </div>
          </div>

          {currentStep === "type" && (
            <PizzaTypeSelector selectedType={selectedType} onSelectType={setSelectedType} onNext={goToNextStep} />
          )}

          {currentStep === "size" && (
            <PizzaSizeSelector 
              selectedSize={selectedSize} 
              onSelectSize={setSelectedSize} 
              onNext={goToNextStep}
              pizzaType={selectedType}
            />
          )}

          {currentStep === "components" && (
            <PizzaComponentsSelector
              selectedDoughOption={doughOption}
              onSelectDoughOption={setDoughOption}
              selectedToppingsOption={toppingsOption}
              onSelectToppingsOption={setToppingsOption}
              onNext={goToNextStep}
            />
          )}

          {currentStep === "quantity" && (
            <PizzaQuantitySelector quantity={quantity} onChangeQuantity={setQuantity} onNext={goToNextStep} />
          )}

          {currentStep === "timing" && (
            <PizzaTimingSelector selectedTiming={timing} onSelectTiming={setTiming} onNext={goToNextStep} />
          )}

          {currentStep === "oven" && (
            <PizzaOvenSelector selectedOven={oven} onSelectOven={setOven} onNext={goToNextStep} />
          )}

          {currentStep === "toppings" && (
            <PizzaToppingsSelector
              selectedToppings={toppings}
              onSelectToppings={setToppings}
              pizzaCount={quantity}
              pizzaType={selectedType}
              onNext={goToNextStep}
            />
          )}

          {currentStep === "summary" && (
            <PizzaPlanSummary
              pizzaType={selectedType}
              pizzaSize={selectedSize}
              quantity={quantity}
              timing={timing}
              oven={oven}
              toppings={toppings}
              doughOption={doughOption}
              toppingsOption={toppingsOption}
            />
          )}
        </div>
      </main>
    </div>
  )
}

