import { cn } from "@/lib/utils";
import { type InputHTMLAttributes, forwardRef } from "react";

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "flex h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm text-white placeholder:text-muted transition-colors focus:border-cyan/50 focus:outline-none focus:ring-1 focus:ring-cyan/30",
      className
    )}
    {...props}
  />
));
Input.displayName = "Input";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-[140px] w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-white placeholder:text-muted transition-colors focus:border-cyan/50 focus:outline-none focus:ring-1 focus:ring-cyan/30 resize-y",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export const Label = ({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label
    className={cn("mb-2 block text-sm font-medium text-muted-light", className)}
    {...props}
  />
);

export const Select = forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      "flex h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm text-white transition-colors focus:border-cyan/50 focus:outline-none focus:ring-1 focus:ring-cyan/30",
      className
    )}
    {...props}
  >
    {children}
  </select>
));
Select.displayName = "Select";
