import { DocsSidebar } from "@/components/features/docs/docs-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

// Docs Layout - Uses shadcn/ui Sidebar
export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DocsSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            {/* Breadcrumb replacement or dynamic title could go here */}
            <span>Documentation</span>
          </div>
        </header>
        <div className="flex-1 p-4 md:p-8 max-w-4xl mx-auto w-full">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
