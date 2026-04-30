import { cn } from "@/lib/utils";

export function GoldRule({ className, width = 80 }: { className?: string; width?: number }) {
  return (
    <div
      className={cn("gold-rule", className)}
      style={{ width: `${width}px` }}
      aria-hidden
    />
  );
}
