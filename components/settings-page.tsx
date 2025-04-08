"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ChevronLeft } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"

export function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [units, setUnits] = useState("metric")
  const [volumeUnits, setVolumeUnits] = useState("grams")
  const [language, setLanguage] = useState("english")
  const [location, setLocation] = useState("united-states")

  return (
    <div className="flex flex-col min-h-screen slate-bg pb-16">
      <header className="sticky top-0 dark-blue-bg border-b border-pizza-orange/20 z-10">
        <div className="container px-4 py-3 mx-auto max-w-md flex items-center">
          <Link href="/" className="mr-2">
            <ChevronLeft className="h-5 w-5 theme-text-primary" />
          </Link>
          <div className="flex items-center flex-1">
            <img src="/images/pizza-navigator-icon.png" alt="Pizza Navigator" className="h-6 w-6 mr-2" />
            <h1 className="text-lg font-semibold theme-text-primary">Settings</h1>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container px-4 py-6 mx-auto max-w-md space-y-6">
          <Card className="theme-card-bg">
            <CardContent className="p-4 space-y-4">
              <h2 className="text-lg font-medium theme-text-primary">Appearance</h2>

              <div className="space-y-2">
                <Label htmlFor="theme" className="theme-text-primary">
                  Theme
                </Label>
                <RadioGroup value={theme} onValueChange={setTheme} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="light" />
                    <Label htmlFor="light" className="theme-text-secondary">
                      Light
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="dark" />
                    <Label htmlFor="dark" className="theme-text-secondary">
                      Dark
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="system" id="system" />
                    <Label htmlFor="system" className="theme-text-secondary">
                      System
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          <Card className="theme-card-bg">
            <CardContent className="p-4 space-y-4">
              <h2 className="text-lg font-medium theme-text-primary">Measurement Units</h2>

              <div className="space-y-2">
                <Label htmlFor="units" className="theme-text-primary">
                  Units System
                </Label>
                <RadioGroup value={units} onValueChange={setUnits} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="metric" id="metric" />
                    <Label htmlFor="metric" className="theme-text-secondary">
                      Metric (g, ml)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="imperial" id="imperial" />
                    <Label htmlFor="imperial" className="theme-text-secondary">
                      Imperial (oz, lb)
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="volume-units" className="theme-text-primary">
                  Volume Units
                </Label>
                <RadioGroup value={volumeUnits} onValueChange={setVolumeUnits} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="grams" id="grams" />
                    <Label htmlFor="grams" className="theme-text-secondary">
                      Weight (g, oz)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="volume" id="volume" />
                    <Label htmlFor="volume" className="theme-text-secondary">
                      Volume (cups, tsp)
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          <Card className="theme-card-bg">
            <CardContent className="p-4 space-y-4">
              <h2 className="text-lg font-medium theme-text-primary">Regional Settings</h2>

              <div className="space-y-2">
                <Label htmlFor="language" className="theme-text-primary">
                  Language
                </Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger id="language" className="theme-input-bg theme-text-primary">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent className="theme-card-bg">
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="italian">Italian</SelectItem>
                    <SelectItem value="german">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="theme-text-primary">
                  Location
                </Label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger id="location" className="theme-input-bg theme-text-primary">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent className="theme-card-bg">
                    <SelectItem value="united-states">United States</SelectItem>
                    <SelectItem value="united-kingdom">United Kingdom</SelectItem>
                    <SelectItem value="canada">Canada</SelectItem>
                    <SelectItem value="australia">Australia</SelectItem>
                    <SelectItem value="italy">Italy</SelectItem>
                    <SelectItem value="france">France</SelectItem>
                    <SelectItem value="germany">Germany</SelectItem>
                    <SelectItem value="spain">Spain</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="theme-card-bg">
            <CardContent className="p-4 space-y-4">
              <h2 className="text-lg font-medium theme-text-primary">Notifications</h2>

              <div className="flex items-center justify-between">
                <Label htmlFor="prep-reminders" className="theme-text-primary">
                  Preparation Reminders
                </Label>
                <Switch id="prep-reminders" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="tips-notifications" className="theme-text-primary">
                  Pizza Tips & Tricks
                </Label>
                <Switch id="tips-notifications" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="new-recipes" className="theme-text-primary">
                  New Recipes
                </Label>
                <Switch id="new-recipes" defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Button className="w-full bright-orange-btn mt-4">Save Settings</Button>
        </div>
      </main>
    </div>
  )
}

