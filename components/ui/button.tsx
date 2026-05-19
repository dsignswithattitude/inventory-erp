"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = "default", size = "default", ...props }, ref) => (
  <button className={cn("inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    variant === "default" && "bg-blue-600 text-primary-foreground shadow-[0_10px_24px_rgba(37,99,235,0.24)] hover:bg-blue-700",
    variant === "destructive" && "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
    variant === "outline" && "bg-white shadow-[inset_0_0_0_1px_rgba(15,23,42,0.08),0_8px_20px_rgba(15,23,42,0.04)] hover:bg-slate-50 hover:text-accent-foreground",
    variant === "secondary" && "bg-secondary text-secondary-foreground shadow-[0_8px_20px_rgba(15,23,42,0.04)] hover:bg-secondary/80",
    variant === "ghost" && "hover:bg-slate-100 hover:text-accent-foreground",
    variant === "link" && "text-primary underline-offset-4 hover:underline",
    size === "default" && "h-9 px-4 py-2",
    size === "sm" && "h-8 rounded-md px-3 text-xs",
    size === "lg" && "h-10 rounded-md px-8",
    size === "icon" && "h-9 w-9",
    className
  )} ref={ref} {...props} />
));
Button.displayName = "Button";
export { Button };
