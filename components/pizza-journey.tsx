import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function PizzaJourney() {
  return (
    <Card className="pizza-card dark-blue-card shadow-md">
      <CardContent className="p-4">
        <h3 className="font-medium mb-2 theme-text-primary">Pizza Master Progress</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="theme-text-primary">Neapolitan</span>
              <span className="theme-text-muted">3/5</span>
            </div>
            <Progress value={60} className="h-2 theme-progress-bg" indicatorClassName="bg-pizza-orange" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="theme-text-primary">New York Style</span>
              <span className="theme-text-muted">1/5</span>
            </div>
            <Progress value={20} className="h-2 theme-progress-bg" indicatorClassName="bg-pizza-orange" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="theme-text-primary">Detroit Style</span>
              <span className="theme-text-muted">2/5</span>
            </div>
            <Progress value={40} className="h-2 theme-progress-bg" indicatorClassName="bg-pizza-orange" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

