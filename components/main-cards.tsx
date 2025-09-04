import { Play } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function MainCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* AUM Card */}
      <Card className="relative p-6">
        <Button
          variant="outline"
          size="sm"
          className="absolute top-4 right-4 text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
        >
          View Report
        </Button>
        <CardContent className="flex flex-col items-center p-0">
          <p className="text-sm text-gray-600 mb-1">Current</p>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold">AUM 12.19</span>
            <span className="text-lg text-gray-600">Cr</span>
          </div>
          <div className="flex items-center space-x-1 mt-2">
            <Play className="w-4 h-4 text-green-600 fill-green-600 rotate-270" />
            <span className="text-green-600 text-sm font-medium">+0.77% MoM</span>
          </div>
          <div className="flex items-center space-x-1 mt-2 absolute bottom-4 right-4">
            <div className="text-green-600">
              View Trend 
            </div>
            <Play className="w-4 h-4 text-green-600 fill-green-600 rotate-90" />
          </div>
        </CardContent>
      </Card>

      {/* SIP Card */}
      <Card className="relative p-6">
        <Button
          variant="outline"
          size="sm"
          className="absolute top-4 right-4 text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
        >
          View Report
        </Button>
        <CardContent className="flex flex-col items-center p-0">
          <p className="text-sm text-gray-600 mb-1">Current</p>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold">SIP 1.39</span>
            <span className="text-lg text-gray-600">Lakh</span>
          </div>
          <div className="flex items-center space-x-1 mt-2">
            <Play className="w-4 h-4 text-green-600 fill-green-600 rotate-270" />
            <span className="text-green-600 text-sm font-medium">+0% MoM</span>
          </div>
          <div className="flex items-center space-x-1 mt-2 absolute bottom-4 right-4">
            <div className="text-green-600">
              View Trend 
            </div>
            <Play className="w-4 h-4 text-green-600 fill-green-600 rotate-90" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
