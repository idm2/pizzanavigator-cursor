"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ChevronLeft, Calculator, Copy, ShoppingBag } from "lucide-react"
import Link from "next/link"
import {
  pizzaTypes,
  pizzaSizes,
  starterTypes,
  yeastTypes,
  displayOptions,
  unitOptions,
} from "@/data/pizza-calculator-data"
import {
  getPizzaTypeById,
  calculateDoughWeight,
  calculateBasicRecipe,
  calculatePoolishRecipe,
  calculateBigaRecipe,
  calculateSourdoughRecipe,
  convertToVolume,
  convertToImperial,
} from "@/utils/dough-calculator"
import { useToast } from "@/hooks/use-toast"

export function DoughCalculator() {
  const { toast } = useToast()
  const [pizzaType, setPizzaType] = useState(pizzaTypes[0].id)
  const [pizzaSize, setPizzaSize] = useState(pizzaSizes[2].id) // Default to 12"
  const [quantity, setQuantity] = useState(1)
  const [doughBallWeight, setDoughBallWeight] = useState(250)
  const [hydration, setHydration] = useState(65)
  const [rtTime, setRtTime] = useState(4)
  const [ctTime, setCtTime] = useState(24)
  const [yeastType, setYeastType] = useState(yeastTypes[2].id)
  const [starter, setStarter] = useState(starterTypes[0].id)
  const [poolishFlour, setPoolishFlour] = useState(30)
  const [bigaFlour, setBigaFlour] = useState(35)
  const [sourdoughStarter, setSourdoughStarter] = useState(25)
  const [salt, setSalt] = useState(2)
  const [sugar, setSugar] = useState(0)
  const [oil, setOil] = useState(0)
  const [displayIn, setDisplayIn] = useState(displayOptions[0].id)
  const [units, setUnits] = useState(unitOptions[0].id)
  const [temperature, setTemperature] = useState(22)
  const [length, setLength] = useState(30)
  const [width, setWidth] = useState(40)
  const [lengthInches, setLengthInches] = useState(12)
  const [widthInches, setWidthInches] = useState(16)

  // Recipe calculation results
  const [recipe, setRecipe] = useState<any>(null)

  // Find selected pizza type
  const selectedPizzaType = getPizzaTypeById(pizzaType)

  // Update defaults when pizza type changes
  useEffect(() => {
    if (selectedPizzaType) {
      setHydration(selectedPizzaType.hydration)
      setSalt(selectedPizzaType.salt)
      setOil(selectedPizzaType.oil)
      setSugar(selectedPizzaType.sugar)

      // Calculate default dough weight based on pizza size
      updateDoughWeight()
    }
  }, [selectedPizzaType, pizzaType, pizzaSize, length, width, lengthInches, widthInches])

  // Update dough weight based on pizza size
  const updateDoughWeight = () => {
    let diameter = null
    const selectedSize = pizzaSizes.find((size) => size.id === pizzaSize)

    if (selectedSize && selectedSize.diameter) {
      diameter = selectedSize.diameter
    }

    let calculatedWeight = 0

    if (pizzaSize === "square-cm") {
      calculatedWeight = calculateDoughWeight(pizzaType, pizzaSize, null, length, width, "cm")
    } else if (pizzaSize === "square-inch") {
      calculatedWeight = calculateDoughWeight(pizzaType, pizzaSize, null, lengthInches, widthInches, "inch")
    } else if (diameter) {
      calculatedWeight = calculateDoughWeight(pizzaType, pizzaSize, diameter)
    }

    setDoughBallWeight(calculatedWeight)
  }

  // Calculate recipe based on current inputs
  const calculateRecipe = () => {
    let result

    if (starter === "none") {
      result = calculateBasicRecipe(
        doughBallWeight,
        quantity,
        hydration,
        salt,
        sugar,
        oil,
        temperature,
        rtTime + ctTime,
      )
    } else if (starter === "poolish") {
      result = calculatePoolishRecipe(
        doughBallWeight,
        quantity,
        hydration,
        salt,
        sugar,
        oil,
        temperature,
        rtTime + ctTime,
        poolishFlour,
      )
    } else if (starter === "biga") {
      result = calculateBigaRecipe(
        doughBallWeight,
        quantity,
        hydration,
        salt,
        sugar,
        oil,
        temperature,
        rtTime + ctTime,
        bigaFlour,
      )
    } else if (starter === "sourdough") {
      result = calculateSourdoughRecipe(doughBallWeight, quantity, hydration, salt, sugar, oil, sourdoughStarter)
    }

    // Convert to volume or imperial if needed
    if (displayIn === "volume") {
      if (starter === "none" || starter === "sourdough") {
        result.volumeUnits = convertToVolume(result)
      } else {
        result.poolish.volumeUnits = convertToVolume(result.poolish)
        result.dough.volumeUnits = convertToVolume(result.dough)
      }
    }

    if (units === "imperial") {
      if (starter === "none" || starter === "sourdough") {
        result.imperialUnits = convertToImperial(result)
      } else {
        result.poolish.imperialUnits = convertToImperial(result.poolish)
        result.dough.imperialUnits = convertToImperial(result.dough)
      }
    }

    setRecipe(result)
  }

  // Handle copy to clipboard
  const handleCopy = () => {
    let recipeText = ""

    if (starter === "none") {
      recipeText = `Pizza Navigator Recipe\n\n`
      recipeText += `${selectedPizzaType.name} Pizza\n`
      recipeText += `${quantity} x ${doughBallWeight}g dough balls\n\n`
      recipeText += `Flour: ${recipe.flour}g\n`
      recipeText += `Water: ${recipe.water}g (${hydration}%)\n`
      recipeText += `Salt: ${recipe.salt}g (${salt}%)\n`
      if (sugar > 0) recipeText += `Sugar: ${recipe.sugar}g (${sugar}%)\n`
      if (oil > 0) recipeText += `Oil: ${recipe.oil}g (${oil}%)\n`
      recipeText += `Yeast: ${recipe.yeast}g\n`
      recipeText += `Total: ${recipe.total}g\n`
    } else if (starter === "poolish" || starter === "biga") {
      const starterName = starter.charAt(0).toUpperCase() + starter.slice(1)
      recipeText = `Pizza Navigator Recipe with ${starterName}\n\n`
      recipeText += `${selectedPizzaType.name} Pizza\n`
      recipeText += `${quantity} x ${doughBallWeight}g dough balls\n\n`
      recipeText += `${starterName}:\n`
      recipeText += `Flour: ${recipe[starter].flour}g\n`
      recipeText += `Water: ${recipe[starter].water}g\n`
      recipeText += `Yeast: ${recipe[starter].yeast}g\n\n`
      recipeText += `Main Dough:\n`
      recipeText += `Flour: ${recipe.dough.flour}g\n`
      recipeText += `Water: ${recipe.dough.water}g\n`
      recipeText += `Salt: ${recipe.dough.salt}g (${salt}%)\n`
      if (sugar > 0) recipeText += `Sugar: ${recipe.dough.sugar}g (${sugar}%)\n`
      if (oil > 0) recipeText += `Oil: ${recipe.dough.oil}g (${oil}%)\n`
      recipeText += `Yeast: ${recipe.dough.yeast}g\n`
      recipeText += `Total: ${recipe.total}g\n`
    } else if (starter === "sourdough") {
      recipeText = `Pizza Navigator Recipe with Sourdough\n\n`
      recipeText += `${selectedPizzaType.name} Pizza\n`
      recipeText += `${quantity} x ${doughBallWeight}g dough balls\n\n`
      recipeText += `Flour: ${recipe.flour}g\n`
      recipeText += `Water: ${recipe.water}g (${hydration}%)\n`
      recipeText += `Sourdough Starter: ${recipe.starter}g (${sourdoughStarter}%)\n`
      recipeText += `Salt: ${recipe.salt}g (${salt}%)\n`
      if (sugar > 0) recipeText += `Sugar: ${recipe.sugar}g (${sugar}%)\n`
      if (oil > 0) recipeText += `Oil: ${recipe.oil}g (${oil}%)\n`
      recipeText += `Total: ${recipe.total}g\n`
    }

    navigator.clipboard.writeText(recipeText)
    toast({
      title: "Recipe copied to clipboard",
      description: "You can now paste it anywhere you need.",
    })
  }

  // Add to shopping list
  const addToShoppingList = () => {
    // In a real app, this would add the ingredients to a shopping list
    toast({
      title: "Added to shopping list",
      description: "Ingredients have been added to your shopping list.",
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
            <h1 className="text-lg font-semibold text-white">Dough Calculator</h1>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container px-4 py-6 mx-auto max-w-md">
          <Card className="mb-6 bg-pizza-charcoal/80 border-pizza-orange/20">
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pizza-type" className="text-white">
                  Pizza Type
                </Label>
                <Select value={pizzaType} onValueChange={setPizzaType}>
                  <SelectTrigger id="pizza-type" className="bg-pizza-charcoal border-pizza-orange/30 text-white">
                    <SelectValue placeholder="Select pizza type" />
                  </SelectTrigger>
                  <SelectContent className="bg-pizza-charcoal border-pizza-orange/30 text-white">
                    {pizzaTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pizza-size" className="text-white">
                  Pizza Size
                </Label>
                <Select value={pizzaSize} onValueChange={setPizzaSize}>
                  <SelectTrigger id="pizza-size" className="bg-pizza-charcoal border-pizza-orange/30 text-white">
                    <SelectValue placeholder="Select pizza size" />
                  </SelectTrigger>
                  <SelectContent className="bg-pizza-charcoal border-pizza-orange/30 text-white">
                    {pizzaSizes.map((size) => (
                      <SelectItem key={size.id} value={size.id}>
                        {size.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {pizzaSize === "square-cm" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="length" className="text-white">
                      Length (cm)
                    </Label>
                    <Input
                      id="length"
                      type="number"
                      min={10}
                      max={100}
                      value={length}
                      onChange={(e) => setLength(Number(e.target.value))}
                      className="bg-pizza-charcoal border-pizza-orange/30 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="width" className="text-white">
                      Width (cm)
                    </Label>
                    <Input
                      id="width"
                      type="number"
                      min={10}
                      max={100}
                      value={width}
                      onChange={(e) => setWidth(Number(e.target.value))}
                      className="bg-pizza-charcoal border-pizza-orange/30 text-white"
                    />
                  </div>
                </>
              )}

              {pizzaSize === "square-inch" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="length-inches" className="text-white">
                      Length (inches)
                    </Label>
                    <Input
                      id="length-inches"
                      type="number"
                      min={4}
                      max={40}
                      value={lengthInches}
                      onChange={(e) => setLengthInches(Number(e.target.value))}
                      className="bg-pizza-charcoal border-pizza-orange/30 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="width-inches" className="text-white">
                      Width (inches)
                    </Label>
                    <Input
                      id="width-inches"
                      type="number"
                      min={4}
                      max={40}
                      value={widthInches}
                      onChange={(e) => setWidthInches(Number(e.target.value))}
                      className="bg-pizza-charcoal border-pizza-orange/30 text-white"
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="quantity" className="text-white">
                  Number of Pizzas
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  min={1}
                  max={10}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value) || 1)}
                  className="bg-pizza-charcoal border-pizza-orange/30 text-white"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="dough-ball-weight" className="text-white">
                    Dough Ball Weight (g)
                  </Label>
                  <span className="text-sm text-white/70">{doughBallWeight}g</span>
                </div>
                <Slider
                  id="dough-ball-weight"
                  min={180}
                  max={350}
                  step={5}
                  value={[doughBallWeight]}
                  onValueChange={(value) => setDoughBallWeight(value[0])}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-white/70">
                  <span>Thin</span>
                  <span>Medium</span>
                  <span>Thick</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="hydration" className="text-white">
                    Hydration (%)
                  </Label>
                  <span className="text-sm text-white/70">{hydration}%</span>
                </div>
                <Slider
                  id="hydration"
                  min={55}
                  max={80}
                  step={1}
                  value={[hydration]}
                  onValueChange={(value) => setHydration(value[0])}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-white/70">
                  <span>Firm</span>
                  <span>Standard</span>
                  <span>Wet</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="temperature" className="text-white">
                  Room Temperature (°C)
                </Label>
                <Select value={temperature.toString()} onValueChange={(value) => setTemperature(Number(value))}>
                  <SelectTrigger id="temperature" className="bg-pizza-charcoal border-pizza-orange/30 text-white">
                    <SelectValue placeholder="Select temperature" />
                  </SelectTrigger>
                  <SelectContent className="bg-pizza-charcoal border-pizza-orange/30 text-white">
                    {Array.from({ length: 17 }, (_, i) => i + 11).map((temp) => (
                      <SelectItem key={temp} value={temp.toString()}>
                        {temp}°C
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="rt-time" className="text-white">
                    Room Temp Fermentation (hours)
                  </Label>
                  <span className="text-sm text-white/70">{rtTime}h</span>
                </div>
                <Slider
                  id="rt-time"
                  min={1}
                  max={24}
                  step={1}
                  value={[rtTime]}
                  onValueChange={(value) => setRtTime(value[0])}
                  className="mt-2"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="ct-time" className="text-white">
                    Cold Fermentation (hours)
                  </Label>
                  <span className="text-sm text-white/70">{ctTime}h</span>
                </div>
                <Slider
                  id="ct-time"
                  min={0}
                  max={72}
                  step={1}
                  value={[ctTime]}
                  onValueChange={(value) => setCtTime(value[0])}
                  className="mt-2"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="starter" className="text-white">
                  Starter Type
                </Label>
                <Select value={starter} onValueChange={setStarter}>
                  <SelectTrigger id="starter" className="bg-pizza-charcoal border-pizza-orange/30 text-white">
                    <SelectValue placeholder="Select starter" />
                  </SelectTrigger>
                  <SelectContent className="bg-pizza-charcoal border-pizza-orange/30 text-white">
                    {starterTypes.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {starter === "poolish" && (
                <div className="space-y-2">
                  <Label htmlFor="poolish-flour" className="text-white">
                    Poolish Flour (%)
                  </Label>
                  <Input
                    id="poolish-flour"
                    type="number"
                    min={0}
                    max={100}
                    value={poolishFlour}
                    onChange={(e) => setPoolishFlour(Number(e.target.value) || 0)}
                    className="bg-pizza-charcoal border-pizza-orange/30 text-white"
                  />
                </div>
              )}

              {starter === "biga" && (
                <div className="space-y-2">
                  <Label htmlFor="biga-flour" className="text-white">
                    Biga Flour (%)
                  </Label>
                  <Input
                    id="biga-flour"
                    type="number"
                    min={0}
                    max={100}
                    value={bigaFlour}
                    onChange={(e) => setBigaFlour(Number(e.target.value) || 0)}
                    className="bg-pizza-charcoal border-pizza-orange/30 text-white"
                  />
                </div>
              )}

              {starter === "sourdough" && (
                <div className="space-y-2">
                  <Label htmlFor="sourdough-starter" className="text-white">
                    Sourdough Starter (%)
                  </Label>
                  <Input
                    id="sourdough-starter"
                    type="number"
                    min={0}
                    max={100}
                    value={sourdoughStarter}
                    onChange={(e) => setSourdoughStarter(Number(e.target.value) || 0)}
                    className="bg-pizza-charcoal border-pizza-orange/30 text-white"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="yeast-type" className="text-white">
                  Yeast Type
                </Label>
                <Select value={yeastType} onValueChange={setYeastType}>
                  <SelectTrigger id="yeast-type" className="bg-pizza-charcoal border-pizza-orange/30 text-white">
                    <SelectValue placeholder="Select yeast type" />
                  </SelectTrigger>
                  <SelectContent className="bg-pizza-charcoal border-pizza-orange/30 text-white">
                    {yeastTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="salt" className="text-white">
                  Salt (%)
                </Label>
                <Input
                  id="salt"
                  type="number"
                  min={0}
                  max={10}
                  value={salt}
                  onChange={(e) => setSalt(Number(e.target.value) || 0)}
                  className="bg-pizza-charcoal border-pizza-orange/30 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sugar" className="text-white">
                  Sugar (%)
                </Label>
                <Input
                  id="sugar"
                  type="number"
                  min={0}
                  max={10}
                  value={sugar}
                  onChange={(e) => setSugar(Number(e.target.value) || 0)}
                  className="bg-pizza-charcoal border-pizza-orange/30 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="oil" className="text-white">
                  Oil (%)
                </Label>
                <Input
                  id="oil"
                  type="number"
                  min={0}
                  max={10}
                  value={oil}
                  onChange={(e) => setOil(Number(e.target.value) || 0)}
                  className="bg-pizza-charcoal border-pizza-orange/30 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="display-in" className="text-white">
                  Display In
                </Label>
                <RadioGroup value={displayIn} onValueChange={setDisplayIn} className="flex gap-4">
                  {displayOptions.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.id} id={option.id} />
                      <Label htmlFor={option.id} className="text-white">
                        {option.name}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="units" className="text-white">
                  Units
                </Label>
                <RadioGroup value={units} onValueChange={setUnits} className="flex gap-4">
                  {unitOptions.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.id} id={option.id} />
                      <Label htmlFor={option.id} className="text-white">
                        {option.name}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <Button onClick={calculateRecipe} className="w-full bg-pizza-orange hover:bg-pizza-orange/80 text-white">
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Recipe
              </Button>
            </CardContent>
          </Card>

          {recipe && (
            <Card className="bg-pizza-brown/30 border-pizza-orange/20">
              <CardContent className="p-4">
                <div className="flex items-center mb-4">
                  <Calculator className="h-5 w-5 text-pizza-orange mr-2" />
                  <h2 className="text-lg font-semibold text-white">Calculated Ingredients</h2>
                </div>

                {starter === "none" && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white">Flour</span>
                      <span className="font-medium text-white">
                        {displayIn === "weight" ? `${recipe.flour}g` : recipe.volumeUnits.flour}
                        {units === "imperial" && ` (${recipe.imperialUnits.flour})`}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white">Water</span>
                      <span className="font-medium text-white">
                        {displayIn === "weight" ? `${recipe.water}g` : recipe.volumeUnits.water}
                        {units === "imperial" && ` (${recipe.imperialUnits.water})`}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white">Salt</span>
                      <span className="font-medium text-white">
                        {displayIn === "weight" ? `${recipe.salt}g` : recipe.volumeUnits.salt}
                        {units === "imperial" && ` (${recipe.imperialUnits.salt})`}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white">Yeast</span>
                      <span className="font-medium text-white">
                        {displayIn === "weight" ? `${recipe.yeast}g` : recipe.volumeUnits.yeast}
                        {units === "imperial" && ` (${recipe.imperialUnits.yeast})`}
                      </span>
                    </div>
                    {sugar > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-white">Sugar</span>
                        <span className="font-medium text-white">
                          {displayIn === "weight" ? `${recipe.sugar}g` : recipe.volumeUnits.sugar}
                          {units === "imperial" && ` (${recipe.imperialUnits.sugar})`}
                        </span>
                      </div>
                    )}
                    {oil > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-white">Olive Oil</span>
                        <span className="font-medium text-white">
                          {displayIn === "weight" ? `${recipe.oil}g` : recipe.volumeUnits.oil}
                          {units === "imperial" && ` (${recipe.imperialUnits.oil})`}
                        </span>
                      </div>
                    )}
                    <div className="border-t border-white/20 pt-2 mt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-white font-medium">Total</span>
                        <span className="font-medium text-white">
                          {displayIn === "weight" ? `${recipe.total}g` : ""}
                          {units === "imperial" && ` (${recipe.imperialUnits.total})`}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {(starter === "poolish" || starter === "biga") && recipe.poolish && (
                  <div className="space-y-3">
                    <h3 className="font-medium text-white border-b border-white/20 pb-1 mb-2">
                      {starter.charAt(0).toUpperCase() + starter.slice(1)}
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className="text-white">Flour</span>
                      <span className="font-medium text-white">
                        {displayIn === "weight" ? `${recipe[starter].flour}g` : recipe[starter].volumeUnits.flour}
                        {units === "imperial" && ` (${recipe[starter].imperialUnits.flour})`}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white">Water</span>
                      <span className="font-medium text-white">
                        {displayIn === "weight" ? `${recipe[starter].water}g` : recipe[starter].volumeUnits.water}
                        {units === "imperial" && ` (${recipe[starter].imperialUnits.water})`}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white">Yeast</span>
                      <span className="font-medium text-white">
                        {displayIn === "weight" ? `${recipe[starter].yeast}g` : recipe[starter].volumeUnits.yeast}
                        {units === "imperial" && ` (${recipe[starter].imperialUnits.yeast})`}
                      </span>
                    </div>

                    <h3 className="font-medium text-white border-b border-white/20 pb-1 mb-2 mt-4">Main Dough</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-white">Flour</span>
                      <span className="font-medium text-white">
                        {displayIn === "weight" ? `${recipe.dough.flour}g` : recipe.dough.volumeUnits.flour}
                        {units === "imperial" && ` (${recipe.dough.imperialUnits.flour})`}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white">Water</span>
                      <span className="font-medium text-white">
                        {displayIn === "weight" ? `${recipe.dough.water}g` : recipe.dough.volumeUnits.water}
                        {units === "imperial" && ` (${recipe.dough.imperialUnits.water})`}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white">Salt</span>
                      <span className="font-medium text-white">
                        {displayIn === "weight" ? `${recipe.dough.salt}g` : recipe.dough.volumeUnits.salt}
                        {units === "imperial" && ` (${recipe.dough.imperialUnits.salt})`}
                      </span>
                    </div>
                    {sugar > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-white">Sugar</span>
                        <span className="font-medium text-white">
                          {displayIn === "weight" ? `${recipe.dough.sugar}g` : recipe.dough.volumeUnits.sugar}
                          {units === "imperial" && ` (${recipe.dough.imperialUnits.sugar})`}
                        </span>
                      </div>
                    )}
                    {oil > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-white">Olive Oil</span>
                        <span className="font-medium text-white">
                          {displayIn === "weight" ? `${recipe.dough.oil}g` : recipe.dough.volumeUnits.oil}
                          {units === "imperial" && ` (${recipe.dough.imperialUnits.oil})`}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-white">Yeast</span>
                      <span className="font-medium text-white">
                        {displayIn === "weight" ? `${recipe.dough.yeast}g` : recipe.dough.volumeUnits.yeast}
                        {units === "imperial" && ` (${recipe.dough.imperialUnits.yeast})`}
                      </span>
                    </div>

                    <div className="border-t border-white/20 pt-2 mt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-white font-medium">Total</span>
                        <span className="font-medium text-white">
                          {displayIn === "weight" ? `${recipe.total}g` : ""}
                          {units === "imperial" && ` (${recipe.imperialUnits.total})`}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {starter === "sourdough" && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white">Flour</span>
                      <span className="font-medium text-white">
                        {displayIn === "weight" ? `${recipe.flour}g` : recipe.volumeUnits.flour}
                        {units === "imperial" && ` (${recipe.imperialUnits.flour})`}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white">Water</span>
                      <span className="font-medium text-white">
                        {displayIn === "weight" ? `${recipe.water}g` : recipe.volumeUnits.water}
                        {units === "imperial" && ` (${recipe.imperialUnits.water})`}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white">Sourdough Starter</span>
                      <span className="font-medium text-white">
                        {displayIn === "weight" ? `${recipe.starter}g` : recipe.volumeUnits.starter}
                        {units === "imperial" && ` (${recipe.imperialUnits.starter})`}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white">Salt</span>
                      <span className="font-medium text-white">
                        {displayIn === "weight" ? `${recipe.salt}g` : recipe.volumeUnits.salt}
                        {units === "imperial" && ` (${recipe.imperialUnits.salt})`}
                      </span>
                    </div>
                    {sugar > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-white">Sugar</span>
                        <span className="font-medium text-white">
                          {displayIn === "weight" ? `${recipe.sugar}g` : recipe.volumeUnits.sugar}
                          {units === "imperial" && ` (${recipe.imperialUnits.sugar})`}
                        </span>
                      </div>
                    )}
                    {oil > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-white">Olive Oil</span>
                        <span className="font-medium text-white">
                          {displayIn === "weight" ? `${recipe.oil}g` : recipe.volumeUnits.oil}
                          {units === "imperial" && ` (${recipe.imperialUnits.oil})`}
                        </span>
                      </div>
                    )}
                    <div className="border-t border-white/20 pt-2 mt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-white font-medium">Total</span>
                        <span className="font-medium text-white">
                          {displayIn === "weight" ? `${recipe.total}g` : ""}
                          {units === "imperial" && ` (${recipe.imperialUnits.total})`}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 mt-6">
                  <Button
                    variant="outline"
                    className="flex-1 bg-pizza-charcoal border-pizza-orange/50 text-white hover:bg-pizza-orange/20"
                    onClick={handleCopy}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
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
          )}
        </div>
      </main>
    </div>
  )
}

