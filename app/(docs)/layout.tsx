/**
 * Docs Layout
 * 
 * Used for documentation pages
 * - Documentation-focused navigation
 * - Sidebar for docs navigation
 * - Readable content layout
 */
export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Docs Sidebar */}
        <aside className="w-64 border-r bg-muted/40 p-6">
          <nav className="space-y-2">
            <h2 className="font-semibold mb-4">Documentation</h2>
            <a href="/docs" className="block text-sm hover:underline">
              Overview
            </a>
            <a href="/docs/getting-started" className="block text-sm hover:underline">
              Getting Started
            </a>
            {/* Add more nav items as needed */}
          </nav>
        </aside>
        
        {/* Docs Content */}
        <main className="flex-1 p-8 max-w-4xl">
          {children}
        </main>
      </div>
    </div>
  );
}
