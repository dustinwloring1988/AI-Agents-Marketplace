import { ThemeToggle } from "@/components/theme-toggle"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { 
  Code2, 
  PenLine, 
  ImagePlus, 
  AudioLines, 
  FileImage, 
  Eraser, 
  Maximize, 
  Palette 
} from "lucide-react"

const agentIcons = {
  "content-writer": PenLine,
  "flux-image": ImagePlus,
  "code-generator": Code2,
  "text-to-audio": AudioLines,
  "image-caption": FileImage,
  "remove-background": Eraser,
  "enlarge-image": Maximize,
  "recraft-image": Palette,
} as const

export const agents = [
  {
    id: 1,
    name: "Content Writer",
    description: "Generate high-quality, engaging content for various purposes.",
    credits: 1,
    category: "Writing",
    slug: "content-writer"
  },
  {
    id: 2,
    name: "Flux Image Generator",
    description: "Create stunning images from text descriptions using advanced AI.",
    credits: 2,
    category: "Art & Design",
    slug: "flux-image"
  },
  {
    id: 3,
    name: "Code Generator",
    description: "Generate high-quality, production-ready code with detailed explanations and best practices.",
    credits: 2,
    category: "Development",
    slug: "code-generator"
  },
  {
    id: 4,
    name: "Text to Audio",
    description: "Convert text to natural-sounding speech using Kokoro voice model.",
    credits: 1,
    category: "Audio",
    slug: "text-to-audio"
  },
  {
    id: 5,
    name: "Image Caption",
    description: "Generate accurate and detailed descriptions of images using AI.",
    credits: 1,
    category: "Vision",
    slug: "image-caption"
  },
  {
    id: 6,
    name: "Background Remover",
    description: "Remove backgrounds from images with high precision.",
    credits: 1,
    category: "Image Editing",
    slug: "remove-background"
  },
  {
    id: 7,
    name: "Image Enlarger",
    description: "Upscale images by 2x or 4x while maintaining quality using AI.",
    credits: 1,
    category: "Image Editing",
    slug: "enlarge-image"
  },
  {
    id: 8,
    name: "Recraft Image Generator",
    description: "Create professional-quality images with customizable styles using Recraft AI.",
    credits: 2,
    category: "Art & Design",
    slug: "recraft-image"
  }
]

function AgentCard({ name, description, credits, category, slug }: {
  name: string
  description: string
  credits: number
  category: string
  slug: string
}) {
  const Icon = agentIcons[slug as keyof typeof agentIcons]

  return (
    <Card className="p-6 border-border hover:border-border/60 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-foreground/5 rounded-lg">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">{category}</p>
            <h3 className="text-xl font-semibold">{name}</h3>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-medium">{credits}</span>
          <span className="text-muted-foreground text-sm">credits</span>
        </div>
      </div>
      <p className="text-muted-foreground">{description}</p>
      <Link 
        href={`/agents/${slug}`}
        className="mt-6 w-full px-4 py-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors inline-block text-center"
      >
        Use Agent
      </Link>
    </Card>
  )
}

export default function Browse() {
  return (
    <main className="min-h-screen bg-background">
      <div className="relative pt-16">
        <ThemeToggle />
        
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">Browse Agents</h1>
            <p className="text-muted-foreground max-w-2xl">
              Explore our marketplace of AI agents designed to help you automate tasks,
              analyze data, and enhance your productivity. Each agent requires credits to use.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <AgentCard key={agent.id} {...agent} />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
} 