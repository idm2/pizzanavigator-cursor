"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarPicker } from "@/components/ui/calendar-picker"
import { Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { calculatePrepDate } from "@/utils/meal-planner-utils"

interface AddToMealPlannerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  recipeId: string
  recipeTitle: string
  recipeType: string
  pizzaCount: number
  imageUrl?: string
}

export function AddToMealPlannerDialog({
  open,
  onOpenChange,
  recipeId,
  recipeTitle,
  recipeType,
  pizzaCount,
  imageUrl,
}: AddToMealPlannerDialogProps) {
  const { toast } = useToast()
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedTime, setSelectedTime] = useState("18:00")
  const [selectedTitle, setSelectedTitle] = useState("")
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToMealPlanner = () => {
    if (!selectedDate) return

    try {
      // Get existing meal plans
      const mealPlansJson = localStorage.getItem("mealPlans") || "[]"
      const mealPlans = JSON.parse(mealPlansJson)

      // Create new meal plan entry
      const newMealPlan = {
        id: `${recipeId}-${Date.now()}`,
        recipeId: recipeId,
        title: selectedTitle || recipeTitle,
        type: recipeType,
        pizzaCount: pizzaCount,
        date: selectedDate.toISOString(),
        time: selectedTime,
        image: imageUrl,
      }

      // Add to meal plans and save
      mealPlans.push(newMealPlan)
      localStorage.setItem("mealPlans", JSON.stringify(mealPlans))

      // Create prep reminder
      const { date: prepDate, days: prepDays } = calculatePrepDate(selectedDate, recipeType)

      // Get existing prep reminders
      const prepRemindersJson = localStorage.getItem("prepReminders") || "[]"
      const prepReminders = JSON.parse(prepRemindersJson)

      // Create new prep reminder
      const newPrepReminder = {
        id: `prep-${recipeId}-${Date.now()}`,
        mealPlanId: newMealPlan.id,
        recipeId: recipeId,
        title: `Prep: ${selectedTitle || recipeTitle}`,
        type: recipeType,
        date: prepDate.toISOString(),
        mealDate: selectedDate.toISOString(),
      }

      // Add to prep reminders and save
      prepReminders.push(newPrepReminder)
      localStorage.setItem("prepReminders", JSON.stringify(prepReminders))

      setIsAdded(true)

      const prepInfo = prepDays === 1 ? "1 day before" : `${prepDays} days before`

      toast({
        title: "Added to meal planner",
        description: `Your pizza has been added to your meal planner for ${selectedDate.toLocaleDateString()}. Preparation reminder set for ${prepDate.toLocaleDateString()} (${prepInfo}).`,
      })

      // Reset and close dialog after a delay
      setTimeout(() => {
        onOpenChange(false)
        setIsAdded(false)
        setSelectedTitle("")

        // Navigate to meal planner
        router.push("/meal-planner")
      }, 1500)
    } catch (error) {
      console.error("Error adding to meal planner:", error)
      toast({
        title: "Error adding to meal planner",
        description: "There was a problem adding this recipe to your meal planner.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-pizza-charcoal border-pizza-orange/20">
        <DialogHeader>
          <DialogTitle className="text-white">Add to Meal Planner</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="plan-title" className="text-white">
              Plan Title
            </Label>
            <Input
              id="plan-title"
              value={selectedTitle || recipeTitle}
              onChange={(e) => setSelectedTitle(e.target.value)}
              placeholder="Enter a title for this meal"
              className="bg-[#1a202c] border-pizza-orange/30 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Select Date</Label>
            <CalendarPicker
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              className="border border-gray-800"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="meal-time" className="text-white">
              Meal Time
            </Label>
            <Select value={selectedTime} onValueChange={setSelectedTime}>
              <SelectTrigger id="meal-time" className="bg-[#1a202c] border-pizza-orange/30 text-white">
                <Clock className="h-4 w-4 mr-2 text-pizza-orange" />
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a202c] border-pizza-orange/30 text-white">
                <SelectItem value="12:00">12:00 PM (Lunch)</SelectItem>
                <SelectItem value="18:00">6:00 PM (Dinner)</SelectItem>
                <SelectItem value="19:00">7:00 PM (Dinner)</SelectItem>
                <SelectItem value="20:00">8:00 PM (Dinner)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-pizza-orange/50 text-white hover:bg-pizza-orange/20"
          >
            Cancel
          </Button>
          <Button onClick={handleAddToMealPlanner} className="bright-orange-btn" disabled={isAdded || !selectedDate}>
            {isAdded ? "Added!" : "Add to Planner"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

