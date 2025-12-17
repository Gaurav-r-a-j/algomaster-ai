interface ErrorMessageProps {
  message: string
  className?: string
}

export function ErrorMessage({ message, className }: ErrorMessageProps) {
  return (
    <div className={`text-sm text-red-600 ${className || ""}`}>{message}</div>
  )
}
