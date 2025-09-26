"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Key, Plus, MoreHorizontal, Copy, Eye, EyeOff, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ApiKey {
  id: string
  name: string
  key: string
  created: string
  lastUsed: string
  status: "active" | "inactive"
}

const mockApiKeys: ApiKey[] = [
  {
    id: "1",
    name: "Production API Key",
    key: "lhi_prod_1234567890abcdef",
    created: "2024-01-15",
    lastUsed: "2 hours ago",
    status: "active",
  },
  {
    id: "2",
    name: "Development API Key",
    key: "lhi_dev_abcdef1234567890",
    created: "2024-01-10",
    lastUsed: "1 day ago",
    status: "active",
  },
  {
    id: "3",
    name: "Legacy API Key",
    key: "lhi_legacy_fedcba0987654321",
    created: "2023-12-01",
    lastUsed: "30 days ago",
    status: "inactive",
  },
]

export function ApiKeysSettings() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(mockApiKeys)
  const [showNewKeyDialog, setShowNewKeyDialog] = useState(false)
  const [newKeyName, setNewKeyName] = useState("")
  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({})

  const toggleKeyVisibility = (id: string) => {
    setVisibleKeys((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  const handleCreateKey = () => {
    if (!newKeyName.trim()) return

    const newKey: ApiKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: `lhi_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 16)}`,
      created: new Date().toISOString().split("T")[0],
      lastUsed: "Never",
      status: "active",
    }

    setApiKeys((prev) => [newKey, ...prev])
    setNewKeyName("")
    setShowNewKeyDialog(false)
  }

  const handleDeleteKey = (id: string) => {
    setApiKeys((prev) => prev.filter((key) => key.id !== id))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              API Keys
            </CardTitle>
            <Dialog open={showNewKeyDialog} onOpenChange={setShowNewKeyDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create API Key
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New API Key</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="keyName">Key Name</Label>
                    <Input
                      id="keyName"
                      placeholder="e.g., Production API Key"
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowNewKeyDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateKey} disabled={!newKeyName.trim()}>
                      Create Key
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              API keys allow external applications to authenticate with LinkHub Integrator. Keep your keys secure and
              rotate them regularly.
            </p>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys.map((apiKey) => (
                <TableRow key={apiKey.id}>
                  <TableCell className="font-medium">{apiKey.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <code className="text-sm bg-muted px-2 py-1 rounded font-mono">
                        {visibleKeys[apiKey.id] ? apiKey.key : "•".repeat(20)}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleKeyVisibility(apiKey.id)}
                        className="h-6 w-6 p-0"
                      >
                        {visibleKeys[apiKey.id] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(apiKey.key)}
                        className="h-6 w-6 p-0"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        apiKey.status === "active"
                          ? "bg-green-500/10 text-green-500 border-green-500/20"
                          : "bg-gray-500/10 text-gray-500 border-gray-500/20",
                      )}
                    >
                      {apiKey.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{apiKey.created}</TableCell>
                  <TableCell className="text-muted-foreground">{apiKey.lastUsed}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => copyToClipboard(apiKey.key)}>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Key
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteKey(apiKey.id)} className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
