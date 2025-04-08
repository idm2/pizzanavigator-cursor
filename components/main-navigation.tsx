"use client"

import { Home, Settings, Calculator, BookMarked, ShoppingBag } from "lucide-react"
import Link from "next/link"

interface MainNavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function MainNavigation({ activeTab, setActiveTab }: MainNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 w-full dark-blue-bg border-t border-pizza-orange/20 py-2 px-4 shadow-lg z-50">
      <div className="flex justify-between items-center max-w-md mx-auto">
        <Link href="/" className="no-underline">
          <button
            onClick={() => setActiveTab("home")}
            className={`flex flex-col items-center p-2 ${activeTab === "home" ? "text-pizza-orange" : "theme-text-muted"}`}
          >
            <Home className={`h-6 w-6 ${activeTab === "home" ? "animate-pulse-subtle" : ""}`} />
            <span className="text-xs mt-1">Home</span>
          </button>
        </Link>

        <Link href="/meal-planner" className="no-underline">
          <button
            onClick={() => setActiveTab("planner")}
            className={`flex flex-col items-center p-2 ${activeTab === "planner" ? "text-pizza-orange" : "theme-text-muted"}`}
          >
            <Calculator className={`h-6 w-6 ${activeTab === "planner" ? "animate-pulse-subtle" : ""}`} />
            <span className="text-xs mt-1">Planner</span>
          </button>
        </Link>

        <Link href="/shopping-list" className="no-underline">
          <button
            onClick={() => setActiveTab("shopping")}
            className={`flex flex-col items-center p-2 ${activeTab === "shopping" ? "text-pizza-orange" : "theme-text-muted"}`}
          >
            <ShoppingBag className={`h-6 w-6 ${activeTab === "shopping" ? "animate-pulse-subtle" : ""}`} />
            <span className="text-xs mt-1">Shopping</span>
          </button>
        </Link>

        <Link href="/favorites" className="no-underline">
          <button
            onClick={() => setActiveTab("favorites")}
            className={`flex flex-col items-center p-2 ${activeTab === "favorites" ? "text-pizza-orange" : "theme-text-muted"}`}
          >
            <BookMarked className={`h-6 w-6 ${activeTab === "favorites" ? "animate-pulse-subtle" : ""}`} />
            <span className="text-xs mt-1">Saved</span>
          </button>
        </Link>

        <Link href="/settings" className="no-underline">
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex flex-col items-center p-2 ${activeTab === "settings" ? "text-pizza-orange" : "theme-text-muted"}`}
          >
            <Settings className={`h-6 w-6 ${activeTab === "settings" ? "animate-pulse-subtle" : ""}`} />
            <span className="text-xs mt-1">Settings</span>
          </button>
        </Link>
      </div>
    </div>
  )
}

