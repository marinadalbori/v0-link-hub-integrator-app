"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Activity, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

interface Stat {
  title: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  icon: React.ComponentType<{ className?: string }>
}

const stats: Stat[] = [
  {
    title: "Total Syncs",
    value: "2,847",
    change: "+12%",
    trend: "up",
    icon: Activity,
  },
  {
    title: "Success Rate",
    value: "98.2%",
    change: "+0.5%",
    trend: "up",
    icon: TrendingUp,
  },
  {
    title: "Active Providers",
    value: "8",
    change: "+2",
    trend: "up",
    icon: Activity,
  },
  {
    title: "Errors (24h)",
    value: "3",
    change: "-67%",
    trend: "down",
    icon: AlertTriangle,
  },
]

export function QuickStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title} className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center text-xs">
                <span
                  className={cn(
                    "flex items-center",
                    stat.trend === "up" && "text-green-500",
                    stat.trend === "down" && "text-red-500",
                    stat.trend === "neutral" && "text-muted-foreground",
                  )}
                >
                  {stat.trend === "up" && <TrendingUp className="h-3 w-3 mr-1" />}
                  {stat.trend === "down" && <TrendingDown className="h-3 w-3 mr-1" />}
                  {stat.change}
                </span>
                <span className="text-muted-foreground ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
