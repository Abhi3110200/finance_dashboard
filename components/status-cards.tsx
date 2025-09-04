import { ShoppingCart, RotateCcw, AlertTriangle, XCircle, Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const statsData = [
  {
    title: "Purchases",
    value: "0",
    amount: "0.00 INR",
    icon: ShoppingCart,
    color: "text-blue-600",
  },
  {
    title: "Redemptions",
    value: "0",
    amount: "0.00 INR",
    icon: RotateCcw,
    color: "text-orange-600",
  },
  {
    title: "Rej Transactions",
    value: "0",
    amount: "0.00 INR",
    icon: AlertTriangle,
    color: "text-red-600",
  },
  {
    title: "SIP Rejections",
    value: "0",
    amount: "0.00 INR",
    icon: XCircle,
    color: "text-red-600",
  },
  {
    title: "New SIP",
    value: "0",
    amount: "0.00 INR",
    icon: Plus,
    color: "text-green-600",
  },
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {statsData.map((stat, index) => {
        const IconComponent = stat.icon
        return (
          <Card key={index} className="p-4">
            <CardContent className="p-0">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg bg-gray-100 ${stat.color}`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-lg font-bold">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-xs text-gray-500">{stat.amount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
