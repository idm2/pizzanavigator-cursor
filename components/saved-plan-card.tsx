"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, StarOff, CalendarDays, Trash2 } from "lucide-react"

interface SavedPlanProps {
  plan: {
    id: string
    title: string
    type: string
    size: string
    date: string
    pizzaCount: number
    isFavorite?: boolean
    image?: string
  }
  onFavoriteToggle?: () => void
  onAddToPlanner?: () => void
  onDelete?: () => void
}

export function SavedPlanCard({ plan, onFavoriteToggle, onAddToPlanner, onDelete }: SavedPlanProps) {
  // Function to get emoji based on pizza type
  const getPizzaEmoji = () => {
    switch (plan.type) {
      case "neapolitan":
        return "🇮🇹"
      case "new-york":
        return "🗽"
      case "detroit":
        return "🏙️"
      case "sicilian":
        return "🇮🇹"
      case "grandma":
        return "👵"
      default:
        return "🍕"
    }
  }

  return (
    <Card className="pizza-card dark-blue-card shadow-md hover:shadow-lg transition-all overflow-hidden">
      <CardContent className="p-0">
        <div className="flex items-center">
          <div className="h-16 w-16 flex-shrink-0 relative overflow-hidden flex items-center justify-center text-pizza-orange">
            {plan.image ? (
              <img src={plan.image || "/placeholder.svg"} alt={plan.title} className="h-full w-full object-cover" />
            ) : (
              <div className="rounded-full h-12 w-12 flex items-center justify-center">
                <span className="text-2xl" role="img" aria-label={`${plan.type} pizza`}>
                  {getPizzaEmoji()}
                </span>
              </div>
            )}
          </div>
          <div className="flex-1 p-3">
            <h3 className="font-medium theme-text-primary">{plan.title}</h3>
            <p className="text-sm theme-text-muted">{plan.date}</p>
            <div className="flex items-center mt-1 gap-2">
              <span className="text-xs bg-pizza-orange/20 text-pizza-orange px-2 py-0.5 rounded-full">
                {plan.pizzaCount} {plan.pizzaCount === 1 ? "pizza" : "pizzas"}
              </span>
              <span className="text-xs bg-pizza-orange/10 text-pizza-orange px-2 py-0.5 rounded-full">
                {plan.type.charAt(0).toUpperCase() + plan.type.slice(1)}
              </span>
            </div>
          </div>
          <div className="pr-3 flex flex-col gap-2">
            {onFavoriteToggle && (
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onFavoriteToggle()
                }}
                className="h-8 w-8 rounded-full hover:bg-pizza-orange/10"
              >
                {plan.isFavorite ? (
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ) : (
                  <StarOff className="h-4 w-4 text-pizza-orange/70" />
                )}
              </Button>
            )}

            {onAddToPlanner && (
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onAddToPlanner()
                }}
                className="h-8 w-8 rounded-full hover:bg-pizza-orange/10"
              >
                <CalendarDays className="h-4 w-4 text-pizza-orange/70" />
              </Button>
            )}

            {onDelete && (
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onDelete()
                }}
                className="h-8 w-8 rounded-full hover:bg-red-500/10"
              >
                <Trash2 className="h-4 w-4 text-red-500/70" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

