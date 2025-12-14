"use client"

import {
  CheckmarkCircleIcon,
  ComputerIcon,
  FileIcon,
  SettingsIcon,
  ShieldIcon,
  StarIcon,
} from "@/lib/icons"
import { IconWrapper } from "@/components/common/icon-wrapper"

interface TechItem {
  name: string
  icon: typeof ComputerIcon
  description?: string
}

const techStack: TechItem[] = [
  {
    name: "Next.js 16",
    icon: ComputerIcon,
  },
  {
    name: "TypeScript",
    icon: FileIcon,
  },
  {
    name: "Tailwind CSS",
    icon: SettingsIcon,
  },
  {
    name: "shadcn/ui",
    icon: StarIcon,
  },
  {
    name: "Zustand",
    icon: ShieldIcon,
  },
  {
    name: "Zod",
    icon: CheckmarkCircleIcon,
  },
]

export function TechStack() {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
      {techStack.map((tech) => (
        <div
          key={tech.name}
          className="bg-card flex flex-col items-center rounded-lg border p-4 transition-shadow hover:shadow-md"
        >
          <IconWrapper
            icon={tech.icon}
            size={32}
            className="text-primary mb-2"
          />
          <span className="text-center text-sm font-medium">{tech.name}</span>
        </div>
      ))}
    </div>
  )
}
