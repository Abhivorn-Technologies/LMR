import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
  hover?: boolean;
}

export function Card({
  className,
  glow = false,
  hover = true,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-6 md:p-8",
        hover &&
          "transition-all duration-500 hover:border-border-hover hover:bg-card-hover hover:-translate-y-1",
        glow && "cyan-glow",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
