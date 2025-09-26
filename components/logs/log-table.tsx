"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CheckCircle, XCircle, Clock, RefreshCw, Eye, Users, BarChart3, Calendar, Database } from "lucide-react"
import { cn } from "@/lib/utils"

export interface LogEntry {
  id: string
  timestamp: string
  provider: string
  providerType: "crm" | "analytics" | "task-management" | "custom"
  operation: string
  status: "success" | "error" | "pending" | "syncing"
  duration: string
  recordsProcessed: number
  errorMessage?: string
  details?: any
}

const providerIcons = {
  crm: Users,
  analytics: BarChart3,
  "task-management": Calendar,
  custom: Database,
}

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

interface LogTableProps {
  logs: LogEntry[]
  isLoading?: boolean
}

export function LogTable({ logs, isLoading }: LogTableProps) {
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null)

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-32">
            <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Sync Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Operation</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Records</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => {
                const ProviderIcon = providerIcons[log.providerType]
                const statusInfo = statusConfig[log.status]
                const StatusIcon = statusInfo.icon

                return (
                  <TableRow key={log.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-mono text-sm">{formatTimestamp(log.timestamp)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="p-1 rounded bg-muted">
                          <ProviderIcon className="h-3 w-3" />
                        </div>
                        <span className="font-medium">{log.provider}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {log.operation}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusInfo.badge}>
                        <StatusIcon className={cn("h-3 w-3 mr-1", log.status === "syncing" && "animate-spin")} />
                        {log.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm text-muted-foreground">{log.duration}</TableCell>
                    <TableCell className="font-mono text-sm">{log.recordsProcessed.toLocaleString()}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedLog(log)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>

          {logs.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No logs found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Log Details</DialogTitle>
          </DialogHeader>
          {selectedLog && (
            <ScrollArea className="max-h-[60vh]">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Timestamp</label>
                    <p className="font-mono text-sm">{formatTimestamp(selectedLog.timestamp)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Duration</label>
                    <p className="font-mono text-sm">{selectedLog.duration}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Provider</label>
                    <p className="font-medium">{selectedLog.provider}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Operation</label>
                    <p className="font-medium capitalize">{selectedLog.operation}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                    <Badge variant="outline" className={statusConfig[selectedLog.status].badge}>
                      {selectedLog.status}
                    </Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Records Processed</label>
                    <p className="font-mono text-sm">{selectedLog.recordsProcessed.toLocaleString()}</p>
                  </div>
                </div>

                {selectedLog.errorMessage && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Error Message</label>
                    <div className="mt-1 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <p className="text-sm text-red-500 font-mono">{selectedLog.errorMessage}</p>
                    </div>
                  </div>
                )}

                {selectedLog.details && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Details</label>
                    <div className="mt-1 p-3 bg-muted rounded-lg">
                      <pre className="text-xs text-muted-foreground overflow-x-auto">
                        {JSON.stringify(selectedLog.details, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
