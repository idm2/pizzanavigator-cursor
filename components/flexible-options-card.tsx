import { Card, CardContent } from "@/components/ui/card"
import { ChefHat, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export function FlexibleOptionsCard() {
  return (
    <Card className="pizza-card dark-blue-card shadow-md hover:shadow-lg transition-all overflow-hidden border border-pizza-orange/10">
      <CardContent className="p-5">
        <h3 className="font-semibold mb-3 theme-text-primary text-lg">Flexible Pizza Making</h3>
        <p className="text-sm theme-text-secondary mb-4">Create your perfect pizza plan with our flexible options:</p>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
              <ChefHat className="h-6 w-6 text-pizza-orange" />
            </div>
            <div>
              <p className="text-sm font-medium theme-text-primary">Make your own dough</p>
              <p className="text-xs theme-text-secondary">Or use your own pre-made dough to save time</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
              <ShoppingBag className="h-6 w-6 text-pizza-orange" />
            </div>
            <div>
              <p className="text-sm font-medium theme-text-primary">Choose app toppings</p>
              <p className="text-xs theme-text-secondary">Or use your own favorite toppings</p>
            </div>
          </div>
        </div>
        <Link href="/create-plan" className="no-underline">
          <div className="mt-4 text-sm text-pizza-orange font-medium hover:underline cursor-pointer flex items-center">
            Create a custom pizza plan
            <ChevronRight className="h-4 w-4 ml-1" />
          </div>
        </Link>
      </CardContent>
    </Card>
  )
}

