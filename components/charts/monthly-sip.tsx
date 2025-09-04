"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts"

const misData = [
  { month: "Jan", value1: 60, value2: 40, value3: 20 },
  { month: "Feb", value1: 50, value2: 30, value3: 10 },
  { month: "Mar", value1: 40, value2: 20, value3: 10 },
  { month: "Apr", value1: 30, value2: 10, value3: 40 },
  { month: "May", value1: 50, value2: 30, value3: 0 },
  { month: "Jun", value1: 60, value2: 40, value3: 20 },
]

const formatYAxis = (tick: number) => {
  return `${tick} CR`;
};

const formatTooltip = (value: number) => {
  return [`${value} CR`, 'Amount'];
};

export function MonthlyMisChart() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">MONTHLY SIP</CardTitle>
        <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent h-8">
          View Report
        </Button>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={misData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorValue1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorValue2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorValue3" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#666" }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#666" }}
                tickFormatter={formatYAxis}
              />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              {/* <Tooltip 
                formatter={formatTooltip}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.375rem',
                  padding: '0.5rem',
                  fontSize: '0.875rem',
                }}
              /> */}
              <Area 
                type="monotone" 
                dataKey="value1" 
                stroke="#10B981" 
                fillOpacity={1} 
                fill="url(#colorValue1)" 
                strokeWidth={2}
                // dot={{ fill: "#10B981", strokeWidth: 2, r: 3 }}
              />
              <Area 
                type="monotone" 
                dataKey="value2" 
                stroke="#F59E0B" 
                fillOpacity={1} 
                fill="url(#colorValue2)" 
                strokeWidth={2}
                // dot={{ fill: "#F59E0B", strokeWidth: 2, r: 3 }}
              />
              <Area 
                type="monotone" 
                dataKey="value3" 
                stroke="#3B82F6" 
                fillOpacity={1} 
                fill="url(#colorValue3)" 
                strokeWidth={2}
                // dot={{ fill: "#3B82F6", strokeWidth: 2, r: 3 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
