"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Settings, TestTube, Unplug, Users, BarChart3, Calendar, Database } from "lucide-react"
import type { Provider } from "@/components/dashboard/provider-card"

const providerIcons = {
  crm: Users,
  analytics: BarChart3,
  "task-management": Calendar,
  custom: Database,
}

const statusConfig = {
  active: {
    color: "text-green-500",
    badge: "bg-green-500/10 text-green-500 border-green-500/20",
  },
  error: {
    color: "text-red-500",
    badge: "bg-red-500/10 text-red-500 border-red-500/20",
  },
  inactive: {
    color: "text-gray-500",
    badge: "bg-gray-500/10 text-gray-500 border-gray-500/20",
  },
  syncing: {
    color: "text-blue-500",
    badge: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
}

interface ProviderListProps {
  providers: Provider[]
  onConfigure?: (id: string) => void
  onTest?: (id: string) => void
  onDisconnect?: (id: string) => void
}

export function ProviderList({ providers, onConfigure, onTest, onDisconnect }: ProviderListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")

  const filteredProviders = providers.filter((provider) => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || provider.status === statusFilter
    const matchesType = typeFilter === "all" || provider.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Providers</CardTitle>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search providers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="syncing">Syncing</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="crm">CRM</SelectItem>
                <SelectItem value="analytics">Analytics</SelectItem>
                <SelectItem value="task-management">Task Mgmt</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Provider</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Sync</TableHead>
              <TableHead>Records</TableHead>
              <TableHead>Errors</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProviders.map((provider) => {
              const ProviderIcon = providerIcons[provider.type]
              const statusInfo = statusConfig[provider.status]

              return (
                <TableRow key={provider.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-muted">
                        <ProviderIcon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{provider.name}</p>
                        {provider.nextSync && (
                          <p className="text-xs text-muted-foreground">Next: {provider.nextSync}</p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {provider.type.replace("-", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusInfo.badge}>
                      {provider.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{provider.lastSync}</TableCell>
                  <TableCell className="font-mono text-sm">{provider.recordsProcessed.toLocaleString()}</TableCell>
                  <TableCell>
                    {provider.errorCount > 0 ? (
                      <span className="text-red-500 font-medium">{provider.errorCount}</span>
                    ) : (
                      <span className="text-muted-foreground">0</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onConfigure?.(provider.id)}>
                          <Settings className="h-4 w-4 mr-2" />
                          Configure
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onTest?.(provider.id)}>
                          <TestTube className="h-4 w-4 mr-2" />
                          Test Connection
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDisconnect?.(provider.id)} className="text-red-600">
                          <Unplug className="h-4 w-4 mr-2" />
                          Disconnect
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>

        {filteredProviders.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No providers found matching your criteria.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
