'use client'

import { SplineScene } from "@/components/ui/spline";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import Link from "next/link"

export function SplineSceneBasic() {
  return (
    <Card className="w-full h-[500px] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
      />
      
      <div className="flex h-full">
        {/* Left content */}
        <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/40">
            AI Agents Marketplace
          </h1>
          <p className="mt-4 text-muted-foreground max-w-lg">
            Discover and hire powerful AI agents to automate your tasks. Our marketplace offers 
            a diverse selection of specialized agents ready to enhance your workflow.
          </p>
          <Link 
            href="/browse"
            className="mt-8 px-6 py-2 bg-foreground text-background rounded-lg w-fit hover:bg-foreground/90 transition-colors"
          >
            Browse Agents
          </Link>
        </div>

        {/* Right content */}
        <div className="flex-1 relative">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </Card>
  )
} 