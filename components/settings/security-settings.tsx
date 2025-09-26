"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Shield, LogOut, Monitor, Smartphone, Globe, AlertTriangle } from "lucide-react"

interface Session {
  id: string
  device: string
  location: string
  lastActive: string
  current: boolean
  ip: string
}

const mockSessions: Session[] = [
  {
    id: "1",
    device: "Chrome on Windows",
    location: "New York, US",
    lastActive: "Active now",
    current: true,
    ip: "192.168.1.100",
  },
  {
    id: "2",
    device: "Safari on iPhone",
    location: "New York, US",
    lastActive: "2 hours ago",
    current: false,
    ip: "192.168.1.101",
  },
  {
    id: "3",
    device: "Firefox on MacOS",
    location: "San Francisco, US",
    lastActive: "1 day ago",
    current: false,
    ip: "10.0.0.50",
  },
]

export function SecuritySettings() {
  const [sessions, setSessions] = useState<Session[]>(mockSessions)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)

  const handleLogoutAll = () => {
    // Keep only current session
    setSessions((prev) => prev.filter((session) => session.current))
    setShowLogoutDialog(false)
  }

  const handleLogoutSession = (id: string) => {
    setSessions((prev) => prev.filter((session) => session.id !== id))
  }

  const getDeviceIcon = (device: string) => {
    if (device.includes("iPhone") || device.includes("Android")) {
      return <Smartphone className="h-4 w-4" />
    }
    return <Monitor className="h-4 w-4" />
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-green-500">Account Security</span>
              </div>
              <p className="text-xs text-muted-foreground">Two-factor authentication enabled</p>
            </div>

            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium text-blue-500">API Access</span>
              </div>
              <p className="text-xs text-muted-foreground">3 active API keys</p>
            </div>

            <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium text-yellow-500">Login Attempts</span>
              </div>
              <p className="text-xs text-muted-foreground">2 failed attempts this week</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Active Sessions</CardTitle>
            <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout All
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Logout All Sessions</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    This will log you out of all devices except this one. You'll need to sign in again on other devices.
                  </p>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowLogoutDialog(false)}>
                      Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleLogoutAll}>
                      Logout All Sessions
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Device</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getDeviceIcon(session.device)}
                      <span className="font-medium">{session.device}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{session.location}</TableCell>
                  <TableCell>
                    <code className="text-xs bg-muted px-2 py-1 rounded">{session.ip}</code>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{session.lastActive}</TableCell>
                  <TableCell>
                    {session.current ? (
                      <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                        Current
                      </Badge>
                    ) : (
                      <Badge variant="outline">Active</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {!session.current && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLogoutSession(session.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <LogOut className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
