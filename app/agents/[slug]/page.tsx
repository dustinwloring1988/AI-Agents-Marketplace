'use client'

import { ThemeToggle } from "@/components/theme-toggle"
import { Card } from "@/components/ui/card"
import { agents } from "@/app/browse/page"
import { notFound } from "next/navigation"
import { useState, use } from "react"
import ReactMarkdown from 'react-markdown'
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

const agentFields = {
  "code-generator": [
    { name: "prompt", label: "What do you want to build?", type: "textarea", placeholder: "Describe the code you want to generate. Be specific about functionality, language, and any specific requirements." },
    { name: "language", label: "Programming Language", type: "select", options: ["Python", "JavaScript", "TypeScript", "Java", "C#", "Go", "Rust", "PHP"] },
    { name: "type", label: "Code Type", type: "select", options: ["Function", "Class", "Full Program", "API Endpoint", "Component", "Script"] },
    { name: "include_tests", label: "Include Tests", type: "select", options: ["Yes", "No"] }
  ],
  "recraft-image": [
    { name: "prompt", label: "Image Description", type: "textarea", placeholder: "Describe the image you want to generate" },
    { name: "size", label: "Image Size", type: "select", options: ["1024x1024", "1024x1792", "1792x1024"] },
    { name: "style", label: "Style", type: "select", options: ["any", "anime", "photographic", "digital-art", "comic-book", "fantasy-art", "line-art", "analog-film", "neon-punk", "isometric", "low-poly", "origami", "pixel-art", "tile-texture", "cinematic"] }
  ],
  "content-writer": [
    { name: "topic", label: "Topic", type: "text", placeholder: "Enter the topic for your content" },
    { name: "contentType", label: "Content Type", type: "select", options: ["Blog Post", "Article", "Social Media", "Email Newsletter", "Product Description"] },
    { name: "tone", label: "Tone", type: "select", options: ["Professional", "Casual", "Humorous", "Formal", "Friendly"] },
    { name: "wordCount", label: "Word Count", type: "number", placeholder: "Enter desired word count" }
  ],
  "flux-image": [
    { name: "prompt", label: "Image Description", type: "textarea", placeholder: "Describe the image you want to generate in detail" },
    { name: "style", label: "Art Style", type: "select", options: ["Photorealistic", "Digital Art", "Oil Painting", "Watercolor", "Anime", "3D Render"] },
    { name: "aspect_ratio", label: "Aspect Ratio", type: "select", options: ["1:1 (Square)", "16:9 (Landscape)", "9:16 (Portrait)", "4:3 (Classic)"] },
    { name: "negative_prompt", label: "Negative Prompt", type: "textarea", placeholder: "Describe elements you want to exclude from the image (optional)" }
  ],
  "text-to-audio": [
    { name: "text", label: "Text to Convert", type: "textarea", placeholder: "Enter the text you want to convert to speech" },
    { name: "speed", label: "Speech Speed", type: "number", placeholder: "Enter speed (0.8 to 1.2)", min: "0.8", max: "1.2", step: "0.1", defaultValue: "1.0" },
    { name: "voice", label: "Voice", type: "select", options: ["af_bella", "en_amy", "en_josh", "en_rachel"] }
  ],
  "image-caption": [
    { name: "image", label: "Image URL", type: "text", placeholder: "Enter the URL of the image to analyze" },
    { name: "prompt", label: "Custom Prompt", type: "text", placeholder: "Optional: Enter a specific aspect to analyze about the image" }
  ],
  "remove-background": [
    { name: "image", label: "Image URL", type: "text", placeholder: "Enter the URL of the image to process" }
  ],
  "enlarge-image": [
    { name: "image", label: "Image URL", type: "text", placeholder: "Enter the URL of the image to enlarge" },
    { name: "scale", label: "Scale Factor", type: "select", options: ["2x", "4x"] }
  ]
} as const

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

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

function ResultDisplay({ response, agent }: { response: any; agent: (typeof agents)[number] }) {
  // Handle image generation agents
  if (agent.slug === 'flux-image' || agent.slug === 'recraft-image') {
    const images = Array.isArray(response.images) ? response.images : [response.images];
    
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {images.map((url: string, i: number) => (
          <div key={i} className="relative aspect-square">
            <img 
              src={url} 
              alt={`Generated image ${i + 1}`}
              className="rounded-lg w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    )
  }

  // Handle image processing agents
  if (agent.slug === 'remove-background' || agent.slug === 'enlarge-image') {
    return (
      <div className="relative aspect-auto max-h-[600px]">
        <img 
          src={response.image} 
          alt="Processed image"
          className="rounded-lg w-full h-full object-contain"
        />
      </div>
    )
  }

  // Handle audio generation
  if (agent.slug === 'text-to-audio') {
    return (
      <div className="space-y-4">
        <div className="flex flex-col gap-4">
          <audio 
            controls 
            className="w-full"
            controlsList="nodownload"
          >
            <source src={response.audio_url} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
          <a 
            href={response.audio_url}
            download="generated-audio.mp3"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-foreground/10 text-foreground rounded-lg hover:bg-foreground/20 transition-colors text-center"
          >
            Download Audio
          </a>
        </div>
      </div>
    )
  }

  // Handle text-based responses (content, code, captions)
  let content = '';
  
  if (agent.slug === 'image-caption') {
    content = typeof response.caption === 'string' ? response.caption : '';
  } else {
    content = response.content || '';
  }
  
  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
}

function AgentPageContent({ slug }: { slug: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const agent = agents.find(a => a.slug === slug)
  const fields = agentFields[slug as keyof typeof agentFields]
  const Icon = agentIcons[slug as keyof typeof agentIcons]

  if (!agent || !fields) {
    notFound()
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setResponse(null)

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    try {
      const res = await fetch(`http://localhost:3001/api/agents/${slug}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.error || 'Failed to run agent')
      }

      setResponse(result)
    } catch (err) {
      console.error('Agent error:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = () => {
    if (!response) return

    const blob = new Blob([JSON.stringify(response, null, 2)], { type: 'application/json' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${agent.name}-result.json`
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="relative pt-16">
        <ThemeToggle />
        
        <div className="max-w-3xl mx-auto px-8">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <span>{agent.category}</span>
              <span>•</span>
              <span>{agent.credits} credits</span>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-foreground/5 rounded-lg">
                <Icon className="w-6 h-6" />
              </div>
              <h1 className="text-4xl font-bold">{agent.name}</h1>
            </div>
            <p className="text-muted-foreground">{agent.description}</p>
          </div>

          <Card className="p-6 border-border">
            <form onSubmit={handleSubmit} className="space-y-6">
              {fields.map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium mb-2">
                    {field.label}
                  </label>
                  {field.type === 'select' ? (
                    <select
                      name={field.name}
                      className="w-full bg-background border border-border text-foreground rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-foreground/20"
                      required
                    >
                      <option value="">Select {field.label}</option>
                      {field.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : field.type === 'textarea' ? (
                    <textarea
                      name={field.name}
                      placeholder={field.placeholder}
                      rows={4}
                      className="w-full bg-background border border-border text-foreground rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-foreground/20"
                      required={!field.name.includes('negative')}
                    />
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      className="w-full bg-background border border-border text-foreground rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-foreground/20"
                      required
                    />
                  )}
                </div>
              ))}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Running...' : `Run Agent (${agent.credits} credits)`}
              </button>
            </form>
          </Card>

          {error && (
            <Card className="p-6 border-red-500 mt-6">
              <p className="text-red-500">{error}</p>
            </Card>
          )}

          {response && (
            <Card className="p-6 border-border mt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Result</h2>
                <button
                  onClick={handleDownload}
                  className="px-4 py-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors text-sm"
                >
                  Download Result
                </button>
              </div>
              
              <ResultDisplay response={response} agent={agent} />
            </Card>
          )}
        </div>
      </div>
    </main>
  )
}

export default function AgentPage({ params }: PageProps) {
  const resolvedParams = use(params)
  return <AgentPageContent slug={resolvedParams.slug} />
} 