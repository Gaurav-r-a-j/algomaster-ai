// Auth Layout - Minimal layout for authentication pages (login, register, forgot-password)
// No header/footer navigation, centered content, focus on authentication forms
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">{children}</div>
    </div>
  )
}
