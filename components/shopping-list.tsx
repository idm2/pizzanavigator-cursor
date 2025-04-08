"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ChevronLeft, Plus, Trash2, Filter } from "lucide-react"
import Link from "next/link"

interface ShoppingItem {
  id: string
  name: string
  quantity: string
  category: string
  checked: boolean
  dateRange?: string
}

export function ShoppingList() {
  const [items, setItems] = useState<ShoppingItem[]>([
    { id: "1", name: "00 Flour", quantity: "1kg", category: "Dough", checked: false, dateRange: "This Week" },
    { id: "2", name: "Yeast", quantity: "7g", category: "Dough", checked: false, dateRange: "This Week" },
    { id: "3", name: "Salt", quantity: "20g", category: "Dough", checked: false, dateRange: "This Week" },
    {
      id: "4",
      name: "San Marzano Tomatoes",
      quantity: "1 can",
      category: "Sauce",
      checked: false,
      dateRange: "This Week",
    },
    { id: "5", name: "Fresh Mozzarella", quantity: "200g", category: "Cheese", checked: false, dateRange: "This Week" },
    { id: "6", name: "Basil", quantity: "1 bunch", category: "Herbs", checked: false, dateRange: "This Week" },
    { id: "7", name: "Olive Oil", quantity: "100ml", category: "Oils", checked: false, dateRange: "Next Week" },
    { id: "8", name: "Pepperoni", quantity: "100g", category: "Toppings", checked: false, dateRange: "Next Week" },
  ])

  const [newItemName, setNewItemName] = useState("")
  const [newItemQuantity, setNewItemQuantity] = useState("")
  const [newItemCategory, setNewItemCategory] = useState("Extras")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedDateRange, setSelectedDateRange] = useState("This Week")

  const toggleItem = (id: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)))
  }

  const clearCheckedItems = () => {
    setItems(items.filter((item) => !item.checked))
  }

  const addNewItem = () => {
    if (newItemName.trim() === "") return

    const newItem: ShoppingItem = {
      id: Date.now().toString(),
      name: newItemName,
      quantity: newItemQuantity || "As needed",
      category: newItemCategory,
      checked: false,
      dateRange: selectedDateRange,
    }

    setItems([...items, newItem])
    setNewItemName("")
    setNewItemQuantity("")
    setNewItemCategory("Extras")
    setIsDialogOpen(false)
  }

  // Filter items by selected date range
  const filteredItems =
    selectedDateRange === "All" ? items : items.filter((item) => item.dateRange === selectedDateRange)

  // Group items by category
  const groupedItems = filteredItems.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = []
      }
      acc[item.category].push(item)
      return acc
    },
    {} as Record<string, ShoppingItem[]>,
  )

  return (
    <div className="flex flex-col min-h-screen slate-bg pb-16">
      <header className="sticky top-0 dark-blue-bg border-b border-pizza-orange/20 z-10">
        <div className="container px-4 py-3 mx-auto max-w-md flex items-center">
          <Link href="/" className="mr-2">
            <ChevronLeft className="h-5 w-5 theme-text-primary" />
          </Link>
          <div className="flex items-center flex-1">
            <img src="/images/pizza-navigator-icon.png" alt="Pizza Navigator" className="h-6 w-6 mr-2" />
            <h1 className="text-lg font-semibold theme-text-primary">Shopping List</h1>
          </div>
          <div className="flex items-center gap-2">
            <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
              <SelectTrigger className="w-[130px] h-8 text-sm bg-transparent border-pizza-orange/30">
                <Filter className="h-3.5 w-3.5 mr-1 text-pizza-orange" />
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Items</SelectItem>
                <SelectItem value="This Week">This Week</SelectItem>
                <SelectItem value="Next Week">Next Week</SelectItem>
                <SelectItem value="This Month">This Month</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearCheckedItems}
              disabled={!filteredItems.some((item) => item.checked)}
              className="theme-text-primary hover:bg-pizza-orange/20"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container px-4 py-6 mx-auto max-w-md">
          {Object.keys(groupedItems).length === 0 ? (
            <div className="text-center py-8">
              <p className="theme-text-secondary mb-4">No items in your shopping list for this period.</p>
              <Button onClick={() => setIsDialogOpen(true)} className="bright-orange-btn">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>
          ) : (
            Object.entries(groupedItems).map(([category, categoryItems]) => (
              <div key={category} className="mb-6">
                <h2 className="text-sm font-medium theme-text-secondary mb-2">{category}</h2>
                <Card className="theme-card-bg">
                  <CardContent className="p-0">
                    {categoryItems.map((item, index) => (
                      <div
                        key={item.id}
                        className={`flex items-center p-3 ${
                          index !== categoryItems.length - 1 ? "border-b border-pizza-orange/10" : ""
                        }`}
                      >
                        <Checkbox
                          id={`item-${item.id}`}
                          checked={item.checked}
                          onCheckedChange={() => toggleItem(item.id)}
                          className="mr-3 border-pizza-orange/50 data-[state=checked]:bg-pizza-orange data-[state=checked]:text-white"
                        />
                        <label
                          htmlFor={`item-${item.id}`}
                          className={`flex-1 ${item.checked ? "line-through theme-text-secondary" : "theme-text-primary"}`}
                        >
                          {item.name}
                        </label>
                        <span className="text-sm theme-text-secondary">{item.quantity}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            ))
          )}

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full bright-orange-btn mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent className="theme-card-bg">
              <DialogHeader>
                <DialogTitle className="theme-text-primary">Add New Item</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="item-name" className="theme-text-primary">
                    Item Name
                  </Label>
                  <Input
                    id="item-name"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    placeholder="Enter item name"
                    className="theme-input-bg theme-text-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="item-quantity" className="theme-text-primary">
                    Quantity
                  </Label>
                  <Input
                    id="item-quantity"
                    value={newItemQuantity}
                    onChange={(e) => setNewItemQuantity(e.target.value)}
                    placeholder="e.g., 500g, 2 cans, etc."
                    className="theme-input-bg theme-text-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="item-category" className="theme-text-primary">
                    Category
                  </Label>
                  <Select value={newItemCategory} onValueChange={setNewItemCategory}>
                    <SelectTrigger id="item-category" className="theme-input-bg theme-text-primary">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="theme-card-bg">
                      <SelectItem value="Dough">Dough</SelectItem>
                      <SelectItem value="Sauce">Sauce</SelectItem>
                      <SelectItem value="Cheese">Cheese</SelectItem>
                      <SelectItem value="Toppings">Toppings</SelectItem>
                      <SelectItem value="Herbs">Herbs</SelectItem>
                      <SelectItem value="Oils">Oils</SelectItem>
                      <SelectItem value="Extras">Extras</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="item-date-range" className="theme-text-primary">
                    Date Range
                  </Label>
                  <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
                    <SelectTrigger id="item-date-range" className="theme-input-bg theme-text-primary">
                      <SelectValue placeholder="Select date range" />
                    </SelectTrigger>
                    <SelectContent className="theme-card-bg">
                      <SelectItem value="This Week">This Week</SelectItem>
                      <SelectItem value="Next Week">Next Week</SelectItem>
                      <SelectItem value="This Month">This Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="border-pizza-orange/50 theme-text-primary hover:bg-pizza-orange/20"
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button onClick={addNewItem} className="bright-orange-btn">
                  Add Item
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  )
}

