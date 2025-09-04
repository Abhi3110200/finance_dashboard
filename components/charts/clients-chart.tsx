"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

const clientsData = [
  { label: "Online", value: 60, color: "#FFA500" },
  { label: "New", value: 2, color: "#008000" },
  { label: "Active", value: 541, color: "#FF0000" },
  { label: "Inactive", value: 3824, color: "#DC143C" },
]

export function ClientsChart() {
  return (
    <Card className="w-full h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">CLIENTS</CardTitle>
        <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent h-8">
          <Download className="w-4 h-4 mr-2" />
          Download Report
        </Button>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="relative w-full h-56 flex items-center justify-center">
          {/* Bubble Chart */}
          <div className="relative w-full h-full">
            {/* Large bubble for Inactive */}
            <div
              className="absolute rounded-full flex flex-col items-center justify-center text-white font-bold"
              style={{
                width: "140px",
                height: "140px",
                backgroundColor: "rgba(220, 20, 60, 0.9)",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <span className="text-3xl">3,824</span>
              <span className="text-sm font-normal opacity-90">Inactive</span>
            </div>

            {/* Medium bubble for Active */}
            <div
              className="absolute rounded-full flex flex-col items-center justify-center text-white font-bold"
              style={{
                width: "100px",
                height: "100px",
                backgroundColor: "rgba(255, 0, 0, 0.9)",
                top: "30%",
                left: "30%",
                transform: "translate(-50%, -50%)",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <span className="text-2xl">541</span>
              <span className="text-xs font-normal opacity-90">Active</span>
            </div>

            {/* Small bubble for Online */}
            <div
              className="absolute rounded-full flex flex-col items-center justify-center text-white font-bold"
              style={{
                width: "70px",
                height: "70px",
                backgroundColor: "rgba(255, 165, 0, 0.9)",
                top: "20%",
                right: "20%",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <span className="text-lg">60</span>
              <span className="text-xs font-normal opacity-90">Online</span>
            </div>

            {/* Tiny bubble for New */}
            <div
              className="absolute rounded-full flex flex-col items-center justify-center text-white font-bold"
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: "rgba(0, 128, 0, 0.9)",
                bottom: "20%",
                left: "30%",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <span className="text-sm">2</span>
              <span className="text-xs font-normal opacity-90">New</span>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {clientsData.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-4 h-4 rounded-full" 
                style={{ 
                  backgroundColor: item.color,
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <span className="text-sm font-medium text-gray-700">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
