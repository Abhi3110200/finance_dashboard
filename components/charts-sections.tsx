"use client"

import { ClientsChart } from "./charts/clients-chart"
import { SipBusinessChart } from "./charts/sip-business"
import { MonthlyMisChart } from "./charts/monthly-sip"

export function ChartsSection() {

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ClientsChart />
        <SipBusinessChart />
        <MonthlyMisChart />
      </div>
    </div>
  )
}
