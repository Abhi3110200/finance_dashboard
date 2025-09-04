"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

const timeRanges = ["3 Days", "7 Days", "10 Days", "30 Days"]

export function TimeFilters() {
  const [activeFilter, setActiveFilter] = useState("3 Days")

  return (
    <div className="flex items-center justify-between">
      <div className="flex space-x-2">
        {timeRanges.map((range) => (
          <Button
            key={range}
            variant={activeFilter === range ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter(range)}
            className={activeFilter === range ? "bg-red-600 hover:bg-red-700" : ""}
          >
            {range}
          </Button>
        ))}
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent">
          View Report
        </Button>
      </div>
    </div>
  )
}
