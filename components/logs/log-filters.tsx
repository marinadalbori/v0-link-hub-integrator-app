"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X, Download } from "lucide-react"
import type { DateRange } from "react-day-picker"

interface LogFilters {
  search: string
  provider: string
  operation: string
  status: string
  dateRange: DateRange | undefined
}

interface LogFiltersProps {
  filters: LogFilters
  onFiltersChange: (filters: LogFilters) => void
  onExport?: () => void
}

export function LogFilters({ filters, onFiltersChange, onExport }: LogFiltersProps) {
  const [showFilters, setShowFilters] = useState(false)

  const updateFilter = (key: keyof LogFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const clearFilters = () => {
    onFiltersChange({
      search: "",
      provider: "all",
      operation: "all",
      status: "all",
      dateRange: undefined,
    })
  }

  const hasActiveFilters =
    filters.search ||
    filters.provider !== "all" ||
    filters.operation !== "all" ||
    filters.status !== "all" ||
    filters.dateRange

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search logs..."
                value={filters.search}
                onChange={(e) => updateFilter("search", e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 text-xs">
                  !
                </Badge>
              )}
            </Button>
          </div>

          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={onExport}>
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
          </div>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t">
            <div>
              <label className="text-sm font-medium mb-2 block">Provider</label>
              <Select value={filters.provider} onValueChange={(value) => updateFilter("provider", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Providers</SelectItem>
                  <SelectItem value="hubspot">HubSpot CRM</SelectItem>
                  <SelectItem value="powerbi">Power BI</SelectItem>
                  <SelectItem value="planner">Microsoft Planner</SelectItem>
                  <SelectItem value="custom">Custom API</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Operation</label>
              <Select value={filters.operation} onValueChange={(value) => updateFilter("operation", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Operations</SelectItem>
                  <SelectItem value="sync">Sync</SelectItem>
                  <SelectItem value="export">Export</SelectItem>
                  <SelectItem value="import">Import</SelectItem>
                  <SelectItem value="webhook">Webhook</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Status</label>
              <Select value={filters.status} onValueChange={(value) => updateFilter("status", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="syncing">Syncing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Date Range</label>
              <DatePickerWithRange
                date={filters.dateRange}
                onDateChange={(dateRange) => updateFilter("dateRange", dateRange)}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
