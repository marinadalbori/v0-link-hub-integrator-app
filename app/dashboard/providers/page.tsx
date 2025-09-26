"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ProviderList } from "@/components/providers/provider-list"
import { ProviderSetupWizard } from "@/components/providers/provider-setup-wizard"
import { Plus } from "lucide-react"
import type { Provider } from "@/components/dashboard/provider-card"

// Mock data - same as dashboard
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
  {
    id: "5",
    name: "Salesforce CRM",
    type: "crm",
    status: "inactive",
    lastSync: "2 days ago",
    recordsProcessed: 2156,
    errorCount: 0,
  },
]

export default function ProvidersPage() {
  const [providers, setProviders] = useState<Provider[]>(mockProviders)
  const [showWizard, setShowWizard] = useState(false)

  const handleAddProvider = () => {
    setShowWizard(true)
  }

  const handleWizardComplete = (newProvider: any) => {
    // Add new provider to list
    const provider: Provider = {
      id: Date.now().toString(),
      name: newProvider.name,
      type: newProvider.type,
      status: "active",
      lastSync: "Just now",
      recordsProcessed: 0,
      errorCount: 0,
      nextSync: "5 min",
    }
    setProviders((prev) => [...prev, provider])
    setShowWizard(false)
  }

  const handleConfigure = (id: string) => {
    console.log("Configure provider:", id)
  }

  const handleTest = (id: string) => {
    console.log("Test provider:", id)
  }

  const handleDisconnect = (id: string) => {
    setProviders((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Providers</h1>
          <p className="text-muted-foreground">Manage your LinkHub integrations</p>
        </div>

        <Button onClick={handleAddProvider}>
          <Plus className="h-4 w-4 mr-2" />
          Add Provider
        </Button>
      </div>

      <ProviderList
        providers={providers}
        onConfigure={handleConfigure}
        onTest={handleTest}
        onDisconnect={handleDisconnect}
      />

      <Dialog open={showWizard} onOpenChange={setShowWizard}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Integration</DialogTitle>
          </DialogHeader>
          <ProviderSetupWizard onComplete={handleWizardComplete} onCancel={() => setShowWizard(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
