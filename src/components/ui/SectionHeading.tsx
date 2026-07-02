import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <div className={cn("mb-5 flex", align === "center" && "justify-center")}>
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-cyan/5 px-4 py-1.5 backdrop-blur-sm shadow-[0_0_15px_rgba(0,229,255,0.05)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00E5FF]">
              {eyebrow}
            </span>
          </span>
        </div>
      )}
      <h2 className="font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl lg:text-5xl leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base leading-loose text-[#c4e0e6] md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
