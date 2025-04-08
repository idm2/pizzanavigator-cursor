import { Card, CardContent } from "@/components/ui/card"
import { Clock, Flame } from "lucide-react"
import Link from "next/link"

export function FeaturedRecipe() {
  return (
    <Link href="/recipe/classic-neapolitan" className="no-underline">
      <Card className="pizza-card dark-blue-card shadow-md hover:shadow-lg transition-all">
        <div className="relative h-40">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/homemade-pizza-food-photography-recipe-idea.jpg-Jr1kjMyPuuBHUApFdieq8YEimY7viI.jpeg"
            alt="Classic Neapolitan Pizza"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
          <div className="absolute top-2 right-2 tomato-sauce-bg text-white text-xs font-medium px-2 py-1 rounded-full shadow-md">
            Featured
          </div>
        </div>
        <CardContent className="p-3">
          <h3 className="font-medium theme-text-primary">Classic Neapolitan</h3>
          <p className="text-sm theme-text-secondary line-clamp-2">
            Master the art of authentic Neapolitan pizza with our traditional recipe.
          </p>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center text-xs theme-text-muted">
              <Clock className="h-3 w-3 mr-1 text-pizza-orange" />
              <span>2-day prep</span>
            </div>
            <div className="flex items-center text-xs theme-text-muted">
              <Flame className="h-3 w-3 mr-1 text-pizza-red" />
              <span>450°C</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

