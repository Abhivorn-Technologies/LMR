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
        "group/card relative overflow-hidden rounded-2xl border border-border bg-[#0a2b33]/80 p-6 md:p-8 backdrop-blur-xl",
        hover &&
          "transition-all duration-700 hover:border-cyan/30 hover:bg-[#0c3540]/90 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(0,180,216,0.15)]",
        glow && "cyan-glow",
        className
      )}
      {...props}
    >
      {/* Premium Glass reflection effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />
      {/* Interactive Border Glow */}
      <div className="absolute inset-0 border border-white/[0.05] rounded-2xl pointer-events-none" />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
