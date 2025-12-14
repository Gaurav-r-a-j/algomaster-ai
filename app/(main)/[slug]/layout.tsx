import { LearningPlatformLayout } from "@/components/layouts/learning-platform-layout"

export default function TopicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <LearningPlatformLayout>{children}</LearningPlatformLayout>
}
