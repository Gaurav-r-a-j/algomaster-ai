// Category/Topic Type System - Extensible for multiple interview topics

export enum CategoryType {
  DSA = "dsa", // Data Structures & Algorithms (Primary)
  FRONTEND = "frontend", // Frontend (React, Vue, etc.)
  SYSTEM_DESIGN = "system-design", // System Design
  BACKEND = "backend", // Backend (Node.js, Python, etc.)
  DATABASE = "database", // Database Design
  DEVOPS = "devops", // DevOps & Infrastructure
  MOBILE = "mobile", // Mobile Development
}

export interface Category {
  id: CategoryType
  name: string
  description: string
  icon?: string
  color?: string
  order: number
  enabled: boolean
}

export const CATEGORIES: Category[] = [
  {
    id: CategoryType.DSA,
    name: "Data Structures & Algorithms",
    description: "Master DSA fundamentals for technical interviews",
    order: 1,
    enabled: true,
  },
  {
    id: CategoryType.FRONTEND,
    name: "Frontend Development",
    description: "React, Vue, Angular, and frontend concepts",
    order: 2,
    enabled: false, // Will enable later
  },
  {
    id: CategoryType.SYSTEM_DESIGN,
    name: "System Design",
    description: "Design scalable systems and architectures",
    order: 3,
    enabled: false, // Will enable later
  },
  {
    id: CategoryType.BACKEND,
    name: "Backend Development",
    description: "Server-side development and APIs",
    order: 4,
    enabled: false,
  },
  {
    id: CategoryType.DATABASE,
    name: "Database Design",
    description: "Database concepts and optimization",
    order: 5,
    enabled: false,
  },
  {
    id: CategoryType.DEVOPS,
    name: "DevOps",
    description: "Infrastructure and deployment",
    order: 6,
    enabled: false,
  },
  {
    id: CategoryType.MOBILE,
    name: "Mobile Development",
    description: "iOS and Android development",
    order: 7,
    enabled: false,
  },
]

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find(c => c.id === id)
}

export function getEnabledCategories(): Category[] {
  return CATEGORIES.filter(c => c.enabled)
}

