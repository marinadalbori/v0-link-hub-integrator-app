"use client"

import { useState, useMemo } from "react"
import { LogFilters as LogFiltersComponent } from "@/components/logs/log-filters"
import { LogTable, type LogEntry } from "@/components/logs/log-table"
import type { DateRange } from "react-day-picker"

// Mock data
const mockLogs: LogEntry[] = [
  {
    id: "1",
    timestamp: "2024-01-20T10:30:00Z",
    provider: "HubSpot CRM",
    providerType: "crm",
    operation: "sync",
    status: "success",
    duration: "2.3s",
    recordsProcessed: 1247,
    details: {
      contactsUpdated: 1247,
      dealsUpdated: 89,
      companiesUpdated: 156,
    },
  },
  {
    id: "2",
    timestamp: "2024-01-20T10:25:00Z",
    provider: "Power BI Analytics",
    providerType: "analytics",
    operation: "export",
    status: "syncing",
    duration: "45.2s",
    recordsProcessed: 892,
  },
  {
    id: "3",
    timestamp: "2024-01-20T10:18:00Z",
    provider: "Microsoft Planner",
    providerType: "task-management",
    operation: "import",
    status: "success",
    duration: "1.8s",
    recordsProcessed: 89,
    details: {
      tasksImported: 89,
      bucketsCreated: 12,
    },
  },
  {
    id: "4",
    timestamp: "2024-01-20T10:12:00Z",
    provider: "Custom API",
    providerType: "custom",
    operation: "webhook",
    status: "error",
    duration: "0.5s",
    recordsProcessed: 0,
    errorMessage: "Connection timeout after 30 seconds",
    details: {
      endpoint: "https://api.example.com/webhook",
      statusCode: 408,
      retryCount: 3,
    },
  },
  {
    id: "5",
    timestamp: "2024-01-20T09:45:00Z",
    provider: "HubSpot CRM",
    providerType: "crm",
    operation: "sync",
    status: "success",
    duration: "3.1s",
    recordsProcessed: 2156,
  },
  {
    id: "6",
    timestamp: "2024-01-20T09:30:00Z",
    provider: "Power BI Analytics",
    providerType: "analytics",
    operation: "export",
    status: "success",
    duration: "12.7s",
    recordsProcessed: 1543,
  },
  {
    id: "7",
    timestamp: "2024-01-20T09:15:00Z",
    provider: "Custom API",
    providerType: "custom",
    operation: "sync",
    status: "pending",
    duration: "-",
    recordsProcessed: 0,
  },
]

interface LogFilters {
  search: string
  provider: string
  operation: string
  status: string
  dateRange: DateRange | undefined
}

export default function LogsPage() {
  const [filters, setFilters] = useState<LogFilters>({
    search: "",
    provider: "all",
    operation: "all",
    status: "all",
    dateRange: undefined,
  })

  const filteredLogs = useMemo(() => {
    return mockLogs.filter((log) => {
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase()
        const matchesSearch =
          log.provider.toLowerCase().includes(searchTerm) ||
          log.operation.toLowerCase().includes(searchTerm) ||
          log.status.toLowerCase().includes(searchTerm) ||
          (log.errorMessage && log.errorMessage.toLowerCase().includes(searchTerm))

        if (!matchesSearch) return false
      }

      // Provider filter
      if (filters.provider !== "all") {
        const providerMap: Record<string, string> = {
          hubspot: "HubSpot CRM",
          powerbi: "Power BI Analytics",
          planner: "Microsoft Planner",
          custom: "Custom API",
        }
        if (log.provider !== providerMap[filters.provider]) return false
      }

      // Operation filter
      if (filters.operation !== "all" && log.operation !== filters.operation) {
        return false
      }

      // Status filter
      if (filters.status !== "all" && log.status !== filters.status) {
        return false
      }

      // Date range filter
      if (filters.dateRange?.from) {
        const logDate = new Date(log.timestamp)
        if (logDate < filters.dateRange.from) return false
        if (filters.dateRange.to && logDate > filters.dateRange.to) return false
      }

      return true
    })
  }, [filters])

  const handleExport = () => {
    // Create CSV content
    const headers = ["Timestamp", "Provider", "Operation", "Status", "Duration", "Records", "Error"]
    const csvContent = [
      headers.join(","),
      ...filteredLogs.map((log) =>
        [
          log.timestamp,
          log.provider,
          log.operation,
          log.status,
          log.duration,
          log.recordsProcessed,
          log.errorMessage || "",
        ]
          .map((field) => `"${field}"`)
          .join(","),
      ),
    ].join("\n")

    // Download CSV
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `sync-logs-${new Date().toISOString().split("T")[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Sync Logs</h1>
        <p className="text-muted-foreground">Monitor synchronization operations and troubleshoot issues</p>
      </div>

      <LogFiltersComponent filters={filters} onFiltersChange={setFilters} onExport={handleExport} />

      <LogTable logs={filteredLogs} />
    </div>
  )
}
