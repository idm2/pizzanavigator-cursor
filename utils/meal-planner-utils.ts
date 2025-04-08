// Helper functions for meal planner

/**
 * Calculates the preparation date based on pizza type
 */
export function calculatePrepDate(mealDate: Date, pizzaType: string) {
  let prepDays = 0

  // Different pizza types have different preparation times
  switch (pizzaType.toLowerCase()) {
    case "neapolitan":
      prepDays = 2 // Neapolitan typically needs 2 days for fermentation
      break
    case "detroit":
    case "new-york":
    case "chicago-deep-dish":
    case "sicilian":
      prepDays = 1 // These styles typically need 1 day
      break
    default:
      prepDays = 1 // Default to 1 day
  }

  const prepDate = new Date(mealDate)
  prepDate.setDate(mealDate.getDate() - prepDays)

  return {
    date: prepDate,
    days: prepDays,
  }
}

/**
 * Creates a prep reminder for a meal plan
 */
export function createPrepReminder(mealPlan: any) {
  const mealDate = new Date(mealPlan.date)
  const { date: prepDate } = calculatePrepDate(mealDate, mealPlan.type)

  return {
    id: `prep-${mealPlan.recipeId}-${Date.now()}`,
    mealPlanId: mealPlan.id,
    recipeId: mealPlan.recipeId,
    title: `Prep: ${mealPlan.title}`,
    type: mealPlan.type,
    date: prepDate.toISOString(),
    mealDate: mealDate.toISOString(),
  }
}

/**
 * Ensures all meal plans have corresponding prep reminders
 */
export function syncPrepReminders() {
  try {
    // Get existing meal plans and prep reminders
    const mealPlansJson = localStorage.getItem("mealPlans") || "[]"
    const prepRemindersJson = localStorage.getItem("prepReminders") || "[]"

    const mealPlans = JSON.parse(mealPlansJson)
    const prepReminders = JSON.parse(prepRemindersJson)

    // Check each meal plan to ensure it has a prep reminder
    const newPrepReminders = [...prepReminders]
    let remindersAdded = false

    mealPlans.forEach((mealPlan) => {
      // Check if this meal plan already has a prep reminder
      const hasReminder = prepReminders.some((reminder: any) => reminder.mealPlanId === mealPlan.id)

      if (!hasReminder) {
        // Create a new prep reminder for this meal plan
        const newReminder = createPrepReminder(mealPlan)
        newPrepReminders.push(newReminder)
        remindersAdded = true
      }
    })

    // Save updated prep reminders if any were added
    if (remindersAdded) {
      localStorage.setItem("prepReminders", JSON.stringify(newPrepReminders))
    }

    return newPrepReminders
  } catch (error) {
    console.error("Error syncing prep reminders:", error)
    return []
  }
}

