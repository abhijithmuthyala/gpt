export default function ErrorMessage({
  message,
  className,
}: {
  message: string;
  className?: string;
}) {
  return <p className={`text-destructive text-sm ${className}`}>{message}</p>;
}
