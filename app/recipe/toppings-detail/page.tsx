"use client"

import { ToppingsDetailPage } from "@/components/toppings-detail-page"
import { Suspense } from "react"

export default function ToppingsDetail() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <ToppingsDetailPage />
    </Suspense>
  )
}

