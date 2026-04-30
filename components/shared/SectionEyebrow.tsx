import { cn } from "@/lib/utils";

export function SectionEyebrow({
  children,
  className,
  align = "left",
}: {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3",
        align === "center" && "justify-center",
        className,
      )}
    >
      <span className="h-[1px] w-8 bg-[var(--color-gold)]" />
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold)]">
        {children}
      </span>
      <span className="h-[1px] w-8 bg-[var(--color-gold)]" />
    </div>
  );
}
