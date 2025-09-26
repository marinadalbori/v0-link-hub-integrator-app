"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileSettings } from "@/components/settings/profile-settings"
import { ApiKeysSettings } from "@/components/settings/api-keys-settings"
import { NotificationsSettings } from "@/components/settings/notifications-settings"
import { SecuritySettings } from "@/components/settings/security-settings"
import { User, Key, Bell, Shield } from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your account and integration preferences</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="api-keys" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            API Keys
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileSettings />
        </TabsContent>

        <TabsContent value="api-keys">
          <ApiKeysSettings />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationsSettings />
        </TabsContent>

        <TabsContent value="security">
          <SecuritySettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
