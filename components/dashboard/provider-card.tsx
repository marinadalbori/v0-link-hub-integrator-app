"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  Settings,
  TestTube,
  Unplug,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Database,
  BarChart3,
  Calendar,
  Users,
} from "lucide-react"

export interface Provider {
  id: string
  name: string
  type: "crm" | "analytics" | "task-management" | "custom"
  status: "active" | "error" | "inactive" | "syncing"
  lastSync: string
  recordsProcessed: number
  errorCount: number
  nextSync?: string
}

const providerIcons = {
  crm: Users,
  analytics: BarChart3,
  "task-management": Calendar,
  custom: Database,
}

const statusConfig = {
  active: {
    icon: CheckCircle,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    badge: "bg-green-500/10 text-green-500 border-green-500/20",
  },
  error: {
    icon: XCircle,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    badge: "bg-red-500/10 text-red-500 border-red-500/20",
  },
  inactive: {
    icon: AlertCircle,
    color: "text-gray-500",
    bgColor: "bg-gray-500/10",
    badge: "bg-gray-500/10 text-gray-500 border-gray-500/20",
  },
  syncing: {
    icon: Clock,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    badge: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
}

interface ProviderCardProps {
  provider: Provider
  onConfigure?: (id: string) => void
  onTest?: (id: string) => void
  onDisconnect?: (id: string) => void
}

export function ProviderCard({ provider, onConfigure, onTest, onDisconnect }: ProviderCardProps) {
  const ProviderIcon = providerIcons[provider.type]
  const statusInfo = statusConfig[provider.status]
  const StatusIcon = statusInfo.icon

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 border-border/50 hover:border-border">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={cn("p-2 rounded-lg", statusInfo.bgColor)}>
              <ProviderIcon className="h-5 w-5 text-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{provider.name}</h3>
              <p className="text-sm text-muted-foreground capitalize">{provider.type.replace("-", " ")}</p>
            </div>
          </div>
          <Badge variant="outline" className={statusInfo.badge}>
            <StatusIcon className="h-3 w-3 mr-1" />
            {provider.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Last Sync</p>
            <p className="font-medium text-foreground">{provider.lastSync}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Records</p>
            <p className="font-medium text-foreground">{provider.recordsProcessed.toLocaleString()}</p>
          </div>
        </div>

        {provider.errorCount > 0 && (
          <div className="flex items-center gap-2 text-sm text-red-500">
            <XCircle className="h-4 w-4" />
            <span>{provider.errorCount} errors</span>
          </div>
        )}

        {provider.nextSync && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Next sync: {provider.nextSync}</span>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={() => onConfigure?.(provider.id)} className="flex-1">
            <Settings className="h-4 w-4 mr-1" />
            Configure
          </Button>
          <Button variant="outline" size="sm" onClick={() => onTest?.(provider.id)}>
            <TestTube className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDisconnect?.(provider.id)}
            className="text-red-500 hover:text-red-600"
          >
            <Unplug className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
