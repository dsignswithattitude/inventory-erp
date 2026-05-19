"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

interface TabsContextValue { value: string; onChange: (v: string) => void }
const TabsContext = React.createContext<TabsContextValue>({ value: "", onChange: () => {} });

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> { value: string; onValueChange: (v: string) => void }
export function Tabs({ value, onValueChange, className, children, ...props }: TabsProps) {
  return <TabsContext.Provider value={{ value, onChange: onValueChange }}><div className={cn("space-y-2", className)} {...props}>{children}</div></TabsContext.Provider>;
}
export function TabsList({ className, children, ...props }: React.HTMLAttributes<"div">) {
  return <div className={cn("inline-flex h-10 items-center justify-center rounded-2xl bg-white p-1 text-muted-foreground shadow-[0_14px_35px_rgba(15,23,42,0.06)] ring-1 ring-black/[0.04]", className)} {...props}>{children}</div>;
}
interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { value: string }
export function TabsTrigger({ value, className, children, ...props }: TabsTriggerProps) {
  const ctx = React.useContext(TabsContext);
  return <button data-native-action="true" className={cn("inline-flex items-center justify-center whitespace-nowrap rounded-xl px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", ctx.value === value ? "bg-blue-600 text-white shadow-[0_10px_22px_rgba(37,99,235,0.2)]" : "hover:bg-slate-50 hover:text-foreground", className)} onClick={() => ctx.onChange(value)} {...props}>{children}</button>;
}
interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> { value: string }
export function TabsContent({ value, className, children, ...props }: TabsContentProps) {
  const ctx = React.useContext(TabsContext);
  if (ctx.value !== value) return null;
  return <div className={cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className)} {...props}>{children}</div>;
}
