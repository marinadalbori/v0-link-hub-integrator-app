import type React from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Breadcrumb } from "@/components/layout/breadcrumb"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-background">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-6 py-6">
            <Breadcrumb />
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
