interface SuccessMessageProps {
  message: string
  className?: string
}

export function SuccessMessage({ message, className }: SuccessMessageProps) {
  return (
    <div className={`text-sm text-green-600 ${className || ""}`}>{message}</div>
  )
}
