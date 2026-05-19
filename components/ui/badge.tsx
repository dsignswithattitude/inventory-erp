import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-[inset_0_0_0_1px_rgba(255,255,255,0.55)] transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
  variants: {
    variant: {
      default: "bg-blue-600 text-primary-foreground shadow-[0_10px_22px_rgba(37,99,235,0.22)]",
      secondary: "bg-slate-100 text-secondary-foreground",
      destructive: "bg-destructive text-destructive-foreground shadow-[0_10px_22px_rgba(239,68,68,0.18)]",
      outline: "text-foreground",
      success: "bg-emerald-50 text-emerald-700",
      warning: "bg-amber-50 text-amber-700",
      critical: "bg-red-50 text-red-700",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}
function Badge({ className, variant, ...props }: BadgeProps) { return <div className={cn(badgeVariants({ variant }), className)} {...props} />; }
export { Badge, badgeVariants };
