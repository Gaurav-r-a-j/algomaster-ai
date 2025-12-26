import { NextResponse } from "next/server"
import { z } from "zod"

// Input validation for health check (if query params added in future)
const healthCheckSchema = z.object({
  // Add any query params validation here if needed
}).optional()

export async function GET(request: Request) {
  try {
    // Validate any query parameters if needed
    const url = new URL(request.url)
    const params = Object.fromEntries(url.searchParams)
    
    if (Object.keys(params).length > 0) {
      healthCheckSchema.parse(params)
    }

    return NextResponse.json(
      {
        status: "ok",
        timestamp: new Date().toISOString(),
        version: process.env.npm_package_version || "1.0.0",
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request parameters", details: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
