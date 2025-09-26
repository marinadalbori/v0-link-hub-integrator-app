"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"

const pathNames: Record<string, string> = {
  dashboard: "Dashboard",
  providers: "Providers",
  logs: "Logs",
  settings: "Settings",
  profile: "Profile",
}

export function Breadcrumb() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  if (segments.length <= 1) return null

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-6">
      <Link href="/dashboard" className="flex items-center hover:text-foreground transition-colors">
        <Home className="h-4 w-4" />
      </Link>

      {segments.slice(1).map((segment, index) => {
        const href = "/" + segments.slice(0, index + 2).join("/")
        const isLast = index === segments.length - 2
        const name = pathNames[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)

        return (
          <div key={segment} className="flex items-center">
            <ChevronRight className="h-4 w-4 mx-1" />
            {isLast ? (
              <span className="text-foreground font-medium">{name}</span>
            ) : (
              <Link href={href} className="hover:text-foreground transition-colors">
                {name}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}
