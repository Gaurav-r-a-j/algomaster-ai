import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { DocsSidebar } from "@/components/features/docs/docs-sidebar"

// Docs Layout - Uses shadcn/ui Sidebar
export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <DocsSidebar />
      <SidebarInset>
        <header className="bg-background flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
            {/* Breadcrumb replacement or dynamic title could go here */}
            <span>Documentation</span>
          </div>
        </header>
        <div className="mx-auto w-full max-w-4xl flex-1 p-4 md:p-8">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
