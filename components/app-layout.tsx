"use client"

import type React from "react"

import { useState } from "react"
import { MainNavigation } from "@/components/main-navigation"

interface AppLayoutProps {
  children: React.ReactNode
  initialActiveTab?: string
}

export function AppLayout({ children, initialActiveTab = "home" }: AppLayoutProps) {
  const [activeTab, setActiveTab] = useState(initialActiveTab)

  return (
    <div className="flex flex-col min-h-screen slate-bg">
      <main className="flex-1 pb-16">{children}</main>
      <MainNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}

