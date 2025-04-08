import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

interface PizzaPlanCardProps {
  title: string
  date: string
  pizzaCount: number
  image: string
}

export function PizzaPlanCard({ title, date, pizzaCount, image }: PizzaPlanCardProps) {
  return (
    <Link href={`/plan/${title.toLowerCase().replace(/\s+/g, "-")}`} className="no-underline">
      <Card className="pizza-card dark-blue-card shadow-md hover:shadow-lg transition-all">
        <CardContent className="p-0">
          <div className="flex items-center">
            <div className="h-20 w-20 flex-shrink-0 relative overflow-hidden">
              <img
                src={image || "/placeholder.svg?height=80&width=80"}
                alt={title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent"></div>
            </div>
            <div className="flex-1 p-3">
              <h3 className="font-medium theme-text-primary">{title}</h3>
              <p className="text-sm theme-text-muted">{date}</p>
              <div className="flex items-center mt-1">
                <span className="text-xs bg-pizza-orange/20 text-pizza-orange px-2 py-0.5 rounded-full">
                  {pizzaCount} {pizzaCount === 1 ? "pizza" : "pizzas"}
                </span>
              </div>
            </div>
            <div className="pr-2">
              <ChevronRight className="h-5 w-5 text-pizza-orange/70" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

