import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  "HOME",
  "CRM",
  "UTILITIES",
  { name: "INSURANCE", hasDropdown: true },
  { name: "ASSETS", hasDropdown: true },
  "MUTUAL",
  "RESEARCH",
  "TRANSACT ONLINE",
  "GOAL GPS",
  "FINANCIAL PLANNING",
  "WEALTH REPORT",
  { name: "OTHER", hasDropdown: true },
]

export function Navigation() {
  return (
    <nav className="bg-red-600 px-4 py-2">
      <div className="relative
        flex items-center 
        overflow-x-auto 
        pb-2 
        scrollbar-hide 
        -mx-4 px-4
        md:mx-0 md:px-0
        space-x-1
        whitespace-nowrap
      ">
        {navItems.map((item, index) => {
          const itemName = typeof item === "string" ? item : item.name
          const hasDropdown = typeof item === "object" && item.hasDropdown

          return (
            <div key={index} className="flex-shrink-0">
              <Button
                variant="ghost"
                className="text-white hover:bg-red-700 text-sm font-medium px-3 py-2 h-auto whitespace-nowrap"
              >
                {itemName}
                {hasDropdown && <ChevronDown className="ml-1 w-3 h-3 flex-shrink-0" />}
              </Button>
            </div>
          )
        })}
      </div>
    </nav>
  )
}
