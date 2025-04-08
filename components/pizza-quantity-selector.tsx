"use client"

import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"

interface PizzaQuantitySelectorProps {
  quantity: number
  onChangeQuantity: (quantity: number) => void
  onNext: () => void
}

export function PizzaQuantitySelector({ quantity, onChangeQuantity, onNext }: PizzaQuantitySelectorProps) {
  const decreaseQuantity = () => {
    if (quantity > 1) {
      onChangeQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    if (quantity < 10) {
      onChangeQuantity(quantity + 1)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center py-8">
        <h3 className="text-lg font-medium mb-6 text-white">How many pizzas?</h3>

        <div className="flex items-center justify-center">
          <Button
            variant="outline"
            size="icon"
            onClick={decreaseQuantity}
            disabled={quantity <= 1}
            className="h-12 w-12 rounded-full border-2 border-gray-200 dark:border-white/20 bg-white dark:bg-[#1a202c]/50 theme-text-primary hover:bg-gray-50 dark:hover:bg-[#1a202c]/70 hover:border-pizza-orange/30"
          >
            <Minus className="h-6 w-6" />
            <span className="sr-only">Decrease quantity</span>
          </Button>

          <div className="mx-6 w-16 text-center">
            <div className="text-4xl font-bold text-white">{quantity}</div>
            <div className="text-xs text-white/70 mt-1">{quantity === 1 ? "pizza" : "pizzas"}</div>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={increaseQuantity}
            disabled={quantity >= 10}
            className="h-12 w-12 rounded-full border-2 border-gray-200 dark:border-white/20 bg-white dark:bg-[#1a202c]/50 theme-text-primary hover:bg-gray-50 dark:hover:bg-[#1a202c]/70 hover:border-pizza-orange/30"
          >
            <Plus className="h-6 w-6" />
            <span className="sr-only">Increase quantity</span>
          </Button>
        </div>

        <div className="mt-6 text-sm text-center text-white/70">
          {quantity === 1
            ? "Perfect for a personal treat!"
            : quantity <= 3
              ? "Great for a small gathering!"
              : quantity <= 6
                ? "Perfect for a family dinner!"
                : "Time for a pizza party!"}
        </div>
      </div>

      <Button onClick={onNext} className="w-full bright-orange-btn">
        Continue
      </Button>
    </div>
  )
}

