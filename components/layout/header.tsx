"use client"

import type React from "react"

import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MobileSidebar } from "./sidebar"

interface HeaderProps {
  title?: string
  children?: React.ReactNode
}

export function Header({ title, children }: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-6">
      <div className="flex items-center gap-4">
        <MobileSidebar />
        {title && <h1 className="text-2xl font-semibold text-foreground">{title}</h1>}
      </div>

      <div className="flex items-center gap-4">
        {children}

        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search integrations..." className="w-64 pl-10" />
        </div>

        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-primary rounded-full" />
        </Button>

        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
          <span className="text-sm font-medium">A</span>
        </div>
      </div>
    </header>
  )
}
