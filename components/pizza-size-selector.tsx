"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronDown, Circle, Square } from "lucide-react"
import { getPizzaShape } from "@/utils/cooking-utils"

interface PizzaSizeSelectorProps {
  selectedSize: string
  onSelectSize: (size: string) => void
  onNext: () => void
  pizzaType?: string
}

export function PizzaSizeSelector({ selectedSize, onSelectSize, onNext, pizzaType }: PizzaSizeSelectorProps) {
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [shapeType, setShapeType] = useState("circle")
  const [sizeUnit, setSizeUnit] = useState("inches")
  const [circleSize, setCircleSize] = useState("")
  const [squareLength, setSquareLength] = useState("")
  const [squareWidth, setSquareWidth] = useState("")

  useEffect(() => {
    if (pizzaType) {
      const shape = getPizzaShape(pizzaType)
      if (shape === "pan") {
        setShapeType("square")
        if (!selectedSize) {
          onSelectSize("medium-square")
        }
      } else {
        setShapeType("circle")
        if (!selectedSize) {
          onSelectSize("medium")
        }
      }
    }
  }, [pizzaType, selectedSize, onSelectSize])

  const standardCircleSizes = [
    {
      id: "small",
      name: "Small",
      description: '8-10" (20-25 cm)',
      servings: "1-2 people",
    },
    {
      id: "medium",
      name: "Medium",
      description: '12" (30 cm)',
      servings: "2-3 people",
    },
    {
      id: "large",
      name: "Large",
      description: '14-16" (35-40 cm)',
      servings: "3-4 people",
    },
  ]

  const standardSquareSizes = [
    {
      id: "small-square",
      name: "Small Square",
      description: '8×8" (20×20 cm)',
      servings: "1-2 people",
    },
    {
      id: "medium-square",
      name: "Medium Square",
      description: '10×10" (25×25 cm)',
      servings: "2-3 people",
    },
    {
      id: "large-square",
      name: "Large Square",
      description: '12×12" (30×30 cm)',
      servings: "3-4 people",
    },
  ]

  const circleSizes = [
    { value: "8", label: '8" (20 cm)' },
    { value: "10", label: '10" (25 cm)' },
    { value: "12", label: '12" (30 cm)' },
    { value: "14", label: '14" (35 cm)' },
    { value: "16", label: '16" (40 cm)' },
    { value: "18", label: '18" (45 cm)' },
    { value: "20", label: '20" (50 cm)' },
    { value: "24", label: '24" (60 cm)' },
  ]

  const handleCircleSizeSelect = (size: string) => {
    setCircleSize(size)
    onSelectSize(`circle-${size}-inches`)
  }

  const handleSquareSizeChange = () => {
    if (squareLength && squareWidth) {
      onSelectSize(`square-${squareLength}x${squareWidth}-${sizeUnit}`)
    }
  }

  const handleSizeUnitChange = (unit: string) => {
    setSizeUnit(unit)
    if (shapeType === "square" && squareLength && squareWidth) {
      onSelectSize(`square-${squareLength}x${squareWidth}-${unit}`)
    }
  }

  const renderCircleVisuals = () => (
    <div className="inline-flex items-center justify-center">
      <div className="relative">
        <div
          className={`rounded-full ${selectedSize === "small" ? "bg-pizza-orange/20 border-2 border-pizza-orange" : "bg-gray-100 dark:bg-[#1a202c]/50"} h-20 w-20 flex items-center justify-center transition-all cursor-pointer`}
          onClick={() => onSelectSize("small")}
        >
          <div className="rounded-full bg-pizza-orange/10 h-16 w-16 flex items-center justify-center">
            <div className="rounded-full bg-pizza-orange/20 h-12 w-12"></div>
          </div>
        </div>
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-white dark:bg-[#1a202c] px-2 rounded-full text-xs font-medium theme-text-primary">
          Small
        </div>
      </div>

      <div className="relative mx-4">
        <div
          className={`rounded-full ${selectedSize === "medium" ? "bg-pizza-orange/20 border-2 border-pizza-orange" : "bg-gray-100 dark:bg-[#1a202c]/50"} h-24 w-24 flex items-center justify-center transition-all cursor-pointer`}
          onClick={() => onSelectSize("medium")}
        >
          <div className="rounded-full bg-pizza-orange/10 h-20 w-20 flex items-center justify-center">
            <div className="rounded-full bg-pizza-orange/20 h-16 w-16"></div>
          </div>
        </div>
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-white dark:bg-[#1a202c] px-2 rounded-full text-xs font-medium theme-text-primary">
          Medium
        </div>
      </div>

      <div className="relative">
        <div
          className={`rounded-full ${selectedSize === "large" ? "bg-pizza-orange/20 border-2 border-pizza-orange" : "bg-gray-100 dark:bg-[#1a202c]/50"} h-28 w-28 flex items-center justify-center transition-all cursor-pointer`}
          onClick={() => onSelectSize("large")}
        >
          <div className="rounded-full bg-pizza-orange/10 h-24 w-24 flex items-center justify-center">
            <div className="rounded-full bg-pizza-orange/20 h-20 w-20"></div>
          </div>
        </div>
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-white dark:bg-[#1a202c] px-2 rounded-full text-xs font-medium theme-text-primary">
          Large
        </div>
      </div>
    </div>
  )

  const renderSquareVisuals = () => (
    <div className="inline-flex items-center justify-center">
      <div className="relative">
        <div
          className={`rounded-md ${selectedSize === "small-square" ? "bg-pizza-orange/20 border-2 border-pizza-orange" : "bg-gray-100 dark:bg-[#1a202c]/50"} h-20 w-20 flex items-center justify-center transition-all cursor-pointer`}
          onClick={() => onSelectSize("small-square")}
        >
          <div className="rounded-md bg-pizza-orange/10 h-16 w-16 flex items-center justify-center">
            <div className="rounded-md bg-pizza-orange/20 h-12 w-12"></div>
          </div>
        </div>
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-white dark:bg-[#1a202c] px-2 rounded-full text-xs font-medium theme-text-primary">
          Small
        </div>
      </div>

      <div className="relative mx-4">
        <div
          className={`rounded-md ${selectedSize === "medium-square" ? "bg-pizza-orange/20 border-2 border-pizza-orange" : "bg-gray-100 dark:bg-[#1a202c]/50"} h-24 w-24 flex items-center justify-center transition-all cursor-pointer`}
          onClick={() => onSelectSize("medium-square")}
        >
          <div className="rounded-md bg-pizza-orange/10 h-20 w-20 flex items-center justify-center">
            <div className="rounded-md bg-pizza-orange/20 h-16 w-16"></div>
          </div>
        </div>
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-white dark:bg-[#1a202c] px-2 rounded-full text-xs font-medium theme-text-primary">
          Medium
        </div>
      </div>

      <div className="relative">
        <div
          className={`rounded-md ${selectedSize === "large-square" ? "bg-pizza-orange/20 border-2 border-pizza-orange" : "bg-gray-100 dark:bg-[#1a202c]/50"} h-28 w-28 flex items-center justify-center transition-all cursor-pointer`}
          onClick={() => onSelectSize("large-square")}
        >
          <div className="rounded-md bg-pizza-orange/10 h-24 w-24 flex items-center justify-center">
            <div className="rounded-md bg-pizza-orange/20 h-20 w-20"></div>
          </div>
        </div>
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-white dark:bg-[#1a202c] px-2 rounded-full text-xs font-medium theme-text-primary">
          Large
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6 pb-20">
      {!showAdvanced ? (
        <>
          <div className="text-center mb-4">
            <Tabs defaultValue={shapeType} value={shapeType} onValueChange={setShapeType} className="w-full mb-4">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger
                  value="circle"
                  className="data-[state=active]:bg-pizza-orange data-[state=active]:text-white"
                  onClick={() => setShapeType("circle")}
                  disabled={pizzaType ? getPizzaShape(pizzaType) === "pan" : false}
                >
                  <Circle className="h-4 w-4 mr-2" />
                  Circle
                </TabsTrigger>
                <TabsTrigger
                  value="square"
                  className="data-[state=active]:bg-pizza-orange data-[state=active]:text-white"
                  onClick={() => setShapeType("square")}
                >
                  <Square className="h-4 w-4 mr-2" />
                  Square
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {shapeType === "circle" ? renderCircleVisuals() : renderSquareVisuals()}
          </div>

          <RadioGroup value={selectedSize} onValueChange={onSelectSize} className="space-y-3">
            {shapeType === "circle"
              ? standardCircleSizes.map((size) => (
                  <div key={size.id} className="relative">
                    <RadioGroupItem value={size.id} id={size.id} className="peer sr-only" />
                    <Label
                      htmlFor={size.id}
                      className="flex flex-col rounded-lg border border-pizza-orange/20 theme-card-bg p-4 hover:bg-gray-50 dark:hover:bg-[#1a202c]/70 hover:border-pizza-orange/30 peer-data-[state=checked]:border-pizza-orange peer-data-[state=checked]:bg-pizza-orange/20 transition-all cursor-pointer"
                    >
                      <span className="font-medium text-white">{size.name}</span>
                      <span className="text-sm text-white/70">{size.description}</span>
                      <span className="text-xs text-white/70 mt-1">Serves {size.servings}</span>
                    </Label>
                  </div>
                ))
              : standardSquareSizes.map((size) => (
                  <div key={size.id} className="relative">
                    <RadioGroupItem value={size.id} id={size.id} className="peer sr-only" />
                    <Label
                      htmlFor={size.id}
                      className="flex flex-col rounded-lg border border-pizza-orange/20 theme-card-bg p-4 hover:bg-gray-50 dark:hover:bg-[#1a202c]/70 hover:border-pizza-orange/30 peer-data-[state=checked]:border-pizza-orange peer-data-[state=checked]:bg-pizza-orange/20 transition-all cursor-pointer"
                    >
                      <span className="font-medium text-white">{size.name}</span>
                      <span className="text-sm text-white/70">{size.description}</span>
                      <span className="text-xs text-white/70 mt-1">Serves {size.servings}</span>
                    </Label>
                  </div>
                ))}
          </RadioGroup>

          <Button
            variant="outline"
            onClick={() => setShowAdvanced(true)}
            className="w-full border-pizza-orange/50 text-white hover:bg-pizza-orange/20 flex items-center justify-center"
          >
            <ChevronDown className="h-4 w-4 mr-2" />
            Show Advanced Options
          </Button>
        </>
      ) : (
        <div className="space-y-6">
          <div className="text-center mb-4">
            <h3 className="text-lg font-medium text-white">Advanced Size Options</h3>
            <p className="text-sm text-white/70">Customize your pizza dimensions</p>
          </div>

          <Tabs defaultValue="circle" value={shapeType} onValueChange={setShapeType} className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger
                value="circle"
                className="data-[state=active]:bg-pizza-orange data-[state=active]:text-white"
                onClick={() => setShapeType("circle")}
              >
                <Circle className="h-4 w-4 mr-2" />
                Circle
              </TabsTrigger>
              <TabsTrigger
                value="square"
                className="data-[state=active]:bg-pizza-orange data-[state=active]:text-white"
                onClick={() => setShapeType("square")}
              >
                <Square className="h-4 w-4 mr-2" />
                Square/Rectangle
              </TabsTrigger>
            </TabsList>

            <TabsContent value="circle" className="mt-0">
              <div className="space-y-4">
                <Label htmlFor="circle-size" className="text-white mb-2 block">
                  Diameter
                </Label>
                <Select value={circleSize} onValueChange={handleCircleSizeSelect}>
                  <SelectTrigger id="circle-size" className="bg-pizza-charcoal border-pizza-orange/30 text-white">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent className="bg-pizza-charcoal border-pizza-orange/30 text-white">
                    {circleSizes.map((size) => (
                      <SelectItem key={size.value} value={size.value}>
                        {size.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="square" className="mt-0">
              <div className="space-y-4">
                <div className="mb-4">
                  <Label htmlFor="size-unit" className="text-white mb-2 block">
                    Unit
                  </Label>
                  <Select value={sizeUnit} onValueChange={handleSizeUnitChange}>
                    <SelectTrigger id="size-unit" className="bg-pizza-charcoal border-pizza-orange/30 text-white">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent className="bg-pizza-charcoal border-pizza-orange/30 text-white">
                      <SelectItem value="inches">Inches</SelectItem>
                      <SelectItem value="cm">Centimeters</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="square-length" className="text-white mb-2 block">
                      Length
                    </Label>
                    <div className="flex items-center">
                      <Input
                        id="square-length"
                        type="number"
                        value={squareLength}
                        onChange={(e) => {
                          setSquareLength(e.target.value)
                          if (e.target.value && squareWidth) {
                            handleSquareSizeChange()
                          }
                        }}
                        className="bg-pizza-charcoal border-pizza-orange/30 text-white"
                        placeholder={sizeUnit === "inches" ? "e.g., 14" : "e.g., 35"}
                      />
                      <span className="ml-2 text-white">{sizeUnit}</span>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="square-width" className="text-white mb-2 block">
                      Width
                    </Label>
                    <div className="flex items-center">
                      <Input
                        id="square-width"
                        type="number"
                        value={squareWidth}
                        onChange={(e) => {
                          setSquareWidth(e.target.value)
                          if (e.target.value && squareLength) {
                            handleSquareSizeChange()
                          }
                        }}
                        className="bg-pizza-charcoal border-pizza-orange/30 text-white"
                        placeholder={sizeUnit === "inches" ? "e.g., 14" : "e.g., 35"}
                      />
                      <span className="ml-2 text-white">{sizeUnit}</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <Button
            variant="outline"
            onClick={() => setShowAdvanced(false)}
            className="w-full border-pizza-orange/50 text-white hover:bg-pizza-orange/20"
          >
            Back to Standard Sizes
          </Button>
        </div>
      )}

      {/* Sticky Continue Button */}
      <div className="fixed bottom-16 left-0 right-0 p-4 z-10">
        <div className="container mx-auto max-w-md">
          <Button
            onClick={onNext}
            disabled={!selectedSize}
            className="w-full bright-orange-btn shadow-[0_-8px_30px_rgb(255,85,0,0.2)] hover:shadow-[0_-8px_20px_rgb(255,85,0,0.4)] transition-all"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}

