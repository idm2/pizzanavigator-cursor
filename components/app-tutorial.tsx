"use client"

import { useState, useEffect, useRef, useLayoutEffect } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface TutorialStep {
  element: string
  title: string
  description: string
  position?: "top" | "bottom" | "left" | "right"
}

interface AppTutorialProps {
  steps: TutorialStep[]
  onComplete?: () => void
  isOpen?: boolean
}

export function AppTutorial({ steps, onComplete, isOpen = false }: AppTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [showTutorial, setShowTutorial] = useState(isOpen)
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  // Fix 1: Add dependency array to prevent infinite loop
  useEffect(() => {
    if (showTutorial && steps.length > 0) {
      const element = document.querySelector(steps[currentStep].element)
      setTargetElement(element as HTMLElement)
    }
  }, [showTutorial, steps, currentStep]) // Add proper dependencies

  // Fix 2: Use useLayoutEffect for positioning to run synchronously
  // and add proper dependency array
  useLayoutEffect(() => {
    if (targetElement && tooltipRef.current) {
      positionTooltip()
    }

    // Fix 3: Add window resize listener for responsive positioning
    const handleResize = () => {
      if (targetElement && tooltipRef.current) {
        positionTooltip()
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [targetElement, currentStep]) // Add proper dependencies

  const positionTooltip = () => {
    if (!targetElement || !tooltipRef.current) return

    const targetRect = targetElement.getBoundingClientRect()
    const tooltipRect = tooltipRef.current.getBoundingClientRect()
    const position = steps[currentStep]?.position || "bottom"

    let top, left

    switch (position) {
      case "top":
        top = targetRect.top - tooltipRect.height - 10
        left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2
        break
      case "bottom":
        top = targetRect.bottom + 10
        left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2
        break
      case "left":
        top = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2
        left = targetRect.left - tooltipRect.width - 10
        break
      case "right":
        top = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2
        left = targetRect.right + 10
        break
      default:
        top = targetRect.bottom + 10
        left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2
    }

    // Fix 4: Add boundary checks to keep tooltip on screen
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    // Adjust horizontal position if needed
    if (left < 10) left = 10
    if (left + tooltipRect.width > viewportWidth - 10) {
      left = viewportWidth - tooltipRect.width - 10
    }

    // Adjust vertical position if needed
    if (top < 10) top = 10
    if (top + tooltipRect.height > viewportHeight - 10) {
      top = viewportHeight - tooltipRect.height - 10
    }

    tooltipRef.current.style.top = `${top}px`
    tooltipRef.current.style.left = `${left}px`
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowTutorial(false)
      if (onComplete) onComplete()
    }
  }

  const skipTutorial = () => {
    setShowTutorial(false)
    if (onComplete) onComplete()
  }

  if (!showTutorial || steps.length === 0) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 pointer-events-none">
      {targetElement && (
        <div className="absolute z-50 bg-white rounded-lg shadow-lg p-4 max-w-xs pointer-events-auto" ref={tooltipRef}>
          <button
            onClick={skipTutorial}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            aria-label="Close tutorial"
          >
            <X size={16} />
          </button>
          <h3 className="font-bold text-lg mb-2">{steps[currentStep].title}</h3>
          <p className="text-gray-700 mb-4">{steps[currentStep].description}</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {currentStep + 1} of {steps.length}
            </span>
            <Button onClick={nextStep}>{currentStep < steps.length - 1 ? "Next" : "Finish"}</Button>
          </div>
        </div>
      )}
      {targetElement && (
        <div
          className="absolute pointer-events-none"
          style={{
            top: `${targetElement.getBoundingClientRect().top - 4}px`,
            left: `${targetElement.getBoundingClientRect().left - 4}px`,
            width: `${targetElement.getBoundingClientRect().width + 8}px`,
            height: `${targetElement.getBoundingClientRect().height + 8}px`,
            border: "2px solid #3b82f6",
            borderRadius: "4px",
            boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.5)",
            zIndex: 40,
          }}
        />
      )}
    </div>
  )
}

