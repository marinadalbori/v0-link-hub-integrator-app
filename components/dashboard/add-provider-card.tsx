"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface AddProviderCardProps {
  onAdd?: () => void
  className?: string
}

export function AddProviderCard({ onAdd, className }: AddProviderCardProps) {
  return (
    <Card
      className={cn(
        "group hover:shadow-lg transition-all duration-200 border-dashed border-2 border-muted-foreground/25 hover:border-primary/50 bg-muted/20 hover:bg-muted/30",
        className,
      )}
    >
      <CardContent className="flex flex-col items-center justify-center h-full min-h-[200px] p-6">
        <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors mb-4">
          <Plus className="h-8 w-8 text-primary" />
        </div>
        <h3 className="font-semibold text-foreground mb-2">Add Integration</h3>
        <p className="text-sm text-muted-foreground text-center mb-4">
          Connect a new provider to sync data with LinkHub
        </p>
        <Button onClick={onAdd} className="w-full">
          Add Provider
        </Button>
      </CardContent>
    </Card>
  )
}
