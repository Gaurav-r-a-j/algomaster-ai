"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from "react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Registry of components that can be used in markdown previews
// This allows us to safely render previews from code strings
export const previewComponents: Record<string, React.ComponentType<any>> = {
  Button,
  Badge,
  Input,
  Link,
}

// Helper to get a component from the registry
export function getPreviewComponent(
  name: string
): React.ComponentType<any> | null {
  return previewComponents[name] || null
}
