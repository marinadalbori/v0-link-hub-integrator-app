"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Users,
  BarChart3,
  Calendar,
  Database,
  TestTube,
  Eye,
  EyeOff,
} from "lucide-react"
import { cn } from "@/lib/utils"

const providerTypes = [
  {
    id: "hubspot",
    name: "HubSpot CRM",
    type: "crm",
    icon: Users,
    description: "Sync contacts, deals, and companies",
    fields: ["API Key", "Portal ID"],
  },
  {
    id: "powerbi",
    name: "Power BI",
    type: "analytics",
    icon: BarChart3,
    description: "Export data for analytics and reporting",
    fields: ["Client ID", "Client Secret", "Tenant ID"],
  },
  {
    id: "planner",
    name: "Microsoft Planner",
    type: "task-management",
    icon: Calendar,
    description: "Sync tasks and project data",
    fields: ["Client ID", "Client Secret"],
  },
  {
    id: "custom",
    name: "Custom API",
    type: "custom",
    icon: Database,
    description: "Connect to any REST API endpoint",
    fields: ["Base URL", "API Key", "Headers"],
  },
]

interface WizardStep {
  id: number
  title: string
  description: string
}

const steps: WizardStep[] = [
  { id: 1, title: "Select Provider", description: "Choose the integration type" },
  { id: 2, title: "Configure API", description: "Enter authentication details" },
  { id: 3, title: "Field Mapping", description: "Map data fields" },
  { id: 4, title: "Test Connection", description: "Verify the integration" },
  { id: 5, title: "Activate", description: "Complete setup" },
]

interface ProviderSetupWizardProps {
  onComplete?: (provider: any) => void
  onCancel?: () => void
}

export function ProviderSetupWizard({ onComplete, onCancel }: ProviderSetupWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedProvider, setSelectedProvider] = useState<(typeof providerTypes)[0] | null>(null)
  const [credentials, setCredentials] = useState<Record<string, string>>({})
  const [fieldMappings, setFieldMappings] = useState<Record<string, string>>({})
  const [testResult, setTestResult] = useState<"idle" | "testing" | "success" | "error">("idle")
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({})

  const progress = (currentStep / steps.length) * 100

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleTestConnection = async () => {
    setTestResult("testing")
    // Simulate API test
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setTestResult("success")
  }

  const handleComplete = () => {
    if (selectedProvider) {
      onComplete?.({
        ...selectedProvider,
        credentials,
        fieldMappings,
        status: "active",
      })
    }
  }

  const toggleSecretVisibility = (field: string) => {
    setShowSecrets((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {providerTypes.map((provider) => {
                const Icon = provider.icon
                return (
                  <Card
                    key={provider.id}
                    className={cn(
                      "cursor-pointer transition-all hover:shadow-md",
                      selectedProvider?.id === provider.id
                        ? "ring-2 ring-primary border-primary"
                        : "border-border hover:border-primary/50",
                    )}
                    onClick={() => setSelectedProvider(provider)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{provider.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{provider.description}</p>
                          <Badge variant="outline" className="text-xs">
                            {provider.type.replace("-", " ")}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            {selectedProvider?.fields.map((field) => {
              const isSecret = field.toLowerCase().includes("secret") || field.toLowerCase().includes("key")
              return (
                <div key={field} className="space-y-2">
                  <Label htmlFor={field}>{field}</Label>
                  <div className="relative">
                    <Input
                      id={field}
                      type={isSecret && !showSecrets[field] ? "password" : "text"}
                      placeholder={`Enter ${field.toLowerCase()}`}
                      value={credentials[field] || ""}
                      onChange={(e) => setCredentials((prev) => ({ ...prev, [field]: e.target.value }))}
                      className="pr-10"
                    />
                    {isSecret && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => toggleSecretVisibility(field)}
                      >
                        {showSecrets[field] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    )}
                  </div>
                </div>
              )
            })}
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea id="description" placeholder="Add a description for this integration" rows={3} />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Map LinkHub fields to {selectedProvider?.name} fields</p>
            <div className="space-y-3">
              {["Name", "Email", "Company", "Phone", "Status"].map((field) => (
                <div key={field} className="flex items-center gap-4">
                  <div className="w-32">
                    <Label className="text-sm font-medium">{field}</Label>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <Select
                      value={fieldMappings[field] || ""}
                      onValueChange={(value) => setFieldMappings((prev) => ({ ...prev, [field]: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select field" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="firstname">First Name</SelectItem>
                        <SelectItem value="lastname">Last Name</SelectItem>
                        <SelectItem value="email">Email Address</SelectItem>
                        <SelectItem value="company">Company Name</SelectItem>
                        <SelectItem value="phone">Phone Number</SelectItem>
                        <SelectItem value="status">Contact Status</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <TestTube className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Test Connection</h3>
              <p className="text-muted-foreground">
                We'll verify your credentials and connection to {selectedProvider?.name}
              </p>
            </div>

            {testResult === "idle" && (
              <Button onClick={handleTestConnection} className="w-full">
                <TestTube className="h-4 w-4 mr-2" />
                Test Connection
              </Button>
            )}

            {testResult === "testing" && (
              <div className="text-center">
                <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
                <p className="text-muted-foreground">Testing connection...</p>
              </div>
            )}

            {testResult === "success" && (
              <div className="text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Connection Successful!</h3>
                <p className="text-muted-foreground">Your integration is ready to be activated</p>
              </div>
            )}

            {testResult === "error" && (
              <div className="text-center">
                <div className="h-12 w-12 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-red-500 text-xl">✕</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Connection Failed</h3>
                <p className="text-muted-foreground">Please check your credentials and try again</p>
                <Button variant="outline" onClick={() => setTestResult("idle")} className="mt-4">
                  Try Again
                </Button>
              </div>
            )}
          </div>
        )

      case 5:
        return (
          <div className="text-center space-y-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Integration Ready!</h3>
              <p className="text-muted-foreground">
                {selectedProvider?.name} has been successfully configured and is ready to sync data with LinkHub.
              </p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-left">
              <h4 className="font-medium text-foreground mb-2">Next Steps:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Initial sync will begin automatically</li>
                <li>• Monitor progress in the dashboard</li>
                <li>• Configure sync schedules in settings</li>
              </ul>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Add New Integration</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{steps[currentStep - 1]?.description}</p>
          </div>
          <Badge variant="outline">
            {currentStep} of {steps.length}
          </Badge>
        </div>
        <Progress value={progress} className="mt-4" />
      </CardHeader>

      <CardContent className="space-y-6">
        {renderStepContent()}

        <div className="flex justify-between pt-6 border-t">
          <Button variant="outline" onClick={currentStep === 1 ? onCancel : handlePrevious}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            {currentStep === 1 ? "Cancel" : "Previous"}
          </Button>

          <Button
            onClick={currentStep === steps.length ? handleComplete : handleNext}
            disabled={(currentStep === 1 && !selectedProvider) || (currentStep === 4 && testResult !== "success")}
          >
            {currentStep === steps.length ? "Complete Setup" : "Next"}
            {currentStep < steps.length && <ArrowRight className="h-4 w-4 ml-2" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
