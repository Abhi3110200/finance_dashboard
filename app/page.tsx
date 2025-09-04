import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { MainCards } from "@/components/main-cards"
import { TimeFilters } from "@/components/time-filters"
import { StatsCards } from "@/components/status-cards"
import { ChartsSection } from "@/components/charts-sections"
import { Card } from "@/components/ui/card"
import { DownloadReportButton } from "@/components/download-report"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-50">
        <Header />
        <Navigation />
      </div>
      <main className="container mx-auto px-4 py-6 space-y-6">
        <div id="report-section">
        <MainCards />
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Financial Report</h2>
              <DownloadReportButton targetId="report-section" fileName="financial-report.pdf" />
            </div>
            <TimeFilters />
            <StatsCards />
          </Card>
          <ChartsSection />
        </div>
      </main>
    </div>
  )
}
