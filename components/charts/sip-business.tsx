"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bar, Line, XAxis, YAxis, ResponsiveContainer, ComposedChart, CartesianGrid, Tooltip } from "recharts"

const sipData = [
  { month: "Mar", bar: 1.6, line: 2.2 },
  { month: "Apr", bar: 1.6, line: 0.2 },
  { month: "May", bar: 1.6, line: 0.1 },
  { month: "Jun", bar: 1.6, line: 0.1 },
]

export function SipBusinessChart() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">SIP BUSINESS CHART</CardTitle>
        <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent">
          View Report
        </Button>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={sipData} margin={{ top: 30}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#666" }} />
              <YAxis
                yAxisId="left"
                domain={[0, 2.4]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#666" }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[0, 2.4]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#666" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
              <Bar yAxisId="left" dataKey="bar" fill="#3B82F6" radius={[10, 10, 0, 0]} maxBarSize={10} />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="line"
                stroke="#EF4444"
                strokeWidth={3}
                dot={{ fill: "#EF4444", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#EF4444", strokeWidth: 2 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
