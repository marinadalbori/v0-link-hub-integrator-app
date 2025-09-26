"use client"

import { useState } from "react"
import { ProviderCard, type Provider } from "@/components/dashboard/provider-card"
import { AddProviderCard } from "@/components/dashboard/add-provider-card"
import { QuickStats } from "@/components/dashboard/quick-stats"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { Button } from "@/components/ui/button"
import { Plus, RefreshCw } from "lucide-react"

// Mock data
const mockProviders: Provider[] = [
  {
    id: "1",
    name: "HubSpot CRM",
    type: "crm",
    status: "active",
    lastSync: "2 min ago",
    recordsProcessed: 1247,
    errorCount: 0,
    nextSync: "15 min",
  },
  {
    id: "2",
    name: "Power BI Analytics",
    type: "analytics",
    status: "syncing",
    lastSync: "5 min ago",
    recordsProcessed: 892,
    errorCount: 0,
    nextSync: "1 hour",
  },
  {
    id: "3",
    name: "Microsoft Planner",
    type: "task-management",
    status: "active",
    lastSync: "12 min ago",
    recordsProcessed: 89,
    errorCount: 0,
    nextSync: "30 min",
  },
  {
    id: "4",
    name: "Custom API",
    type: "custom",
    status: "error",
    lastSync: "18 min ago",
    recordsProcessed: 0,
    errorCount: 3,
  },
]

export default function DashboardPage() {
  const [providers, setProviders] = useState<Provider[]>(mockProviders)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  const handleAddProvider = () => {
    // Navigate to add provider wizard
    console.log("Add provider clicked")
  }

  const handleConfigure = (id: string) => {
    console.log("Configure provider:", id)
  }

  const handleTest = (id: string) => {
    console.log("Test provider:", id)
  }

  const handleDisconnect = (id: string) => {
    console.log("Disconnect provider:", id)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Monitor and manage your LinkHub integrations</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button onClick={handleAddProvider}>
            <Plus className="h-4 w-4 mr-2" />
            Add Provider
          </Button>
        </div>
      </div>

      <QuickStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-foreground mb-4">Connected Providers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {providers.map((provider) => (
              <ProviderCard
                key={provider.id}
                provider={provider}
                onConfigure={handleConfigure}
                onTest={handleTest}
                onDisconnect={handleDisconnect}
              />
            ))}
            <AddProviderCard onAdd={handleAddProvider} />
          </div>
        </div>

        <div className="lg:col-span-1">
          <RecentActivity />
        </div>
      </div>
    </div>
  )
}
