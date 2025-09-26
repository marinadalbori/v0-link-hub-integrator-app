"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CheckCircle, XCircle, Clock, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

interface Activity {
  id: string
  provider: string
  operation: string
  status: "success" | "error" | "pending" | "syncing"
  timestamp: string
  details?: string
}

const activities: Activity[] = [
  {
    id: "1",
    provider: "HubSpot CRM",
    operation: "Contact Sync",
    status: "success",
    timestamp: "2 minutes ago",
    details: "1,247 contacts synchronized",
  },
  {
    id: "2",
    provider: "Power BI",
    operation: "Data Export",
    status: "syncing",
    timestamp: "5 minutes ago",
    details: "Processing analytics data",
  },
  {
    id: "3",
    provider: "Microsoft Planner",
    operation: "Task Import",
    status: "success",
    timestamp: "12 minutes ago",
    details: "89 tasks imported",
  },
  {
    id: "4",
    provider: "Custom API",
    operation: "Webhook Delivery",
    status: "error",
    timestamp: "18 minutes ago",
    details: "Connection timeout",
  },
  {
    id: "5",
    provider: "HubSpot CRM",
    operation: "Deal Update",
    status: "success",
    timestamp: "25 minutes ago",
    details: "34 deals updated",
  },
]

const statusConfig = {
  success: {
    icon: CheckCircle,
    color: "text-green-500",
    badge: "bg-green-500/10 text-green-500 border-green-500/20",
  },
  error: {
    icon: XCircle,
    color: "text-red-500",
    badge: "bg-red-500/10 text-red-500 border-red-500/20",
  },
  pending: {
    icon: Clock,
    color: "text-yellow-500",
    badge: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  },
  syncing: {
    icon: RefreshCw,
    color: "text-blue-500",
    badge: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
}

export function RecentActivity() {
  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {activities.map((activity) => {
              const statusInfo = statusConfig[activity.status]
              const StatusIcon = statusInfo.icon

              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors"
                >
                  <div className={cn("p-1 rounded-full", statusInfo.color)}>
                    <StatusIcon className={cn("h-4 w-4", activity.status === "syncing" && "animate-spin")} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-foreground truncate">{activity.provider}</p>
                      <Badge variant="outline" className={cn("text-xs", statusInfo.badge)}>
                        {activity.status}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground mb-1">{activity.operation}</p>

                    {activity.details && <p className="text-xs text-muted-foreground mb-2">{activity.details}</p>}

                    <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
