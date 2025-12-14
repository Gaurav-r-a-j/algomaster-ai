/**
 * Auth Layout
 * 
 * Minimal layout for authentication pages (login, register, forgot-password)
 * - No header/footer navigation
 * - Centered content
 * - Focus on authentication forms
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
}

