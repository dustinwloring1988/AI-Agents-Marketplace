import { SplineSceneBasic } from "@/components/SplineSceneBasic"
import { Card } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { Zap, Shield, Sliders } from "lucide-react"

function FeatureCard({ 
  title, 
  description, 
  icon: Icon 
}: { 
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <Card className="p-6 border-border">
      <div className="rounded-full w-12 h-12 flex items-center justify-center bg-background mb-6">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </Card>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="relative pt-16">
        <ThemeToggle />
        <div className="max-w-7xl mx-auto px-8">
          <SplineSceneBasic />

          <div className="py-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={Zap}
              title="Instant Deployment"
              description="Deploy AI agents instantly to handle your tasks with maximum efficiency."
            />
            <FeatureCard
              icon={Shield}
              title="Secure & Reliable"
              description="Our agents operate with enterprise-grade security and reliability standards."
            />
            <FeatureCard
              icon={Sliders}
              title="Customizable"
              description="Tailor your AI agents to match your specific needs and requirements."
            />
          </div>
        </div>
      </div>
    </main>
  )
}
