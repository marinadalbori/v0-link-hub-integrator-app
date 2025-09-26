"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Mail, MessageSquare, Save } from "lucide-react"

interface NotificationSettings {
  email: {
    syncSuccess: boolean
    syncErrors: boolean
    providerDisconnected: boolean
    weeklyReports: boolean
  }
  inApp: {
    syncSuccess: boolean
    syncErrors: boolean
    providerDisconnected: boolean
  }
  frequency: "immediate" | "hourly" | "daily"
}

export function NotificationsSettings() {
  const [settings, setSettings] = useState<NotificationSettings>({
    email: {
      syncSuccess: false,
      syncErrors: true,
      providerDisconnected: true,
      weeklyReports: true,
    },
    inApp: {
      syncSuccess: true,
      syncErrors: true,
      providerDisconnected: true,
    },
    frequency: "immediate",
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleEmailToggle = (key: keyof NotificationSettings["email"]) => {
    setSettings((prev) => ({
      ...prev,
      email: { ...prev.email, [key]: !prev.email[key] },
    }))
  }

  const handleInAppToggle = (key: keyof NotificationSettings["inApp"]) => {
    setSettings((prev) => ({
      ...prev,
      inApp: { ...prev.inApp, [key]: !prev.inApp[key] },
    }))
  }

  const handleSave = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">Email Notifications</h3>
            </div>

            <div className="space-y-3 ml-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-sync-success" className="text-sm">
                  Successful synchronizations
                </Label>
                <Switch
                  id="email-sync-success"
                  checked={settings.email.syncSuccess}
                  onCheckedChange={() => handleEmailToggle("syncSuccess")}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="email-sync-errors" className="text-sm">
                  Synchronization errors
                </Label>
                <Switch
                  id="email-sync-errors"
                  checked={settings.email.syncErrors}
                  onCheckedChange={() => handleEmailToggle("syncErrors")}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="email-provider-disconnected" className="text-sm">
                  Provider disconnections
                </Label>
                <Switch
                  id="email-provider-disconnected"
                  checked={settings.email.providerDisconnected}
                  onCheckedChange={() => handleEmailToggle("providerDisconnected")}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="email-weekly-reports" className="text-sm">
                  Weekly summary reports
                </Label>
                <Switch
                  id="email-weekly-reports"
                  checked={settings.email.weeklyReports}
                  onCheckedChange={() => handleEmailToggle("weeklyReports")}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">In-App Notifications</h3>
            </div>

            <div className="space-y-3 ml-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="inapp-sync-success" className="text-sm">
                  Successful synchronizations
                </Label>
                <Switch
                  id="inapp-sync-success"
                  checked={settings.inApp.syncSuccess}
                  onCheckedChange={() => handleInAppToggle("syncSuccess")}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="inapp-sync-errors" className="text-sm">
                  Synchronization errors
                </Label>
                <Switch
                  id="inapp-sync-errors"
                  checked={settings.inApp.syncErrors}
                  onCheckedChange={() => handleInAppToggle("syncErrors")}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="inapp-provider-disconnected" className="text-sm">
                  Provider disconnections
                </Label>
                <Switch
                  id="inapp-provider-disconnected"
                  checked={settings.inApp.providerDisconnected}
                  onCheckedChange={() => handleInAppToggle("providerDisconnected")}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Notification Frequency</h3>
            <div className="ml-6">
              <Select
                value={settings.frequency}
                onValueChange={(value: NotificationSettings["frequency"]) =>
                  setSettings((prev) => ({ ...prev, frequency: value }))
                }
              >
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate</SelectItem>
                  <SelectItem value="hourly">Hourly digest</SelectItem>
                  <SelectItem value="daily">Daily digest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isLoading}>
          <Save className="h-4 w-4 mr-2" />
          {isLoading ? "Saving..." : "Save Preferences"}
        </Button>
      </div>
    </div>
  )
}
