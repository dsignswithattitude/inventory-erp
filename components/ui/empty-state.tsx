"use client";
import * as React from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ElementType;
}

export function EmptyState({ title, description, icon: Icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
      {Icon && <div className="mb-3 rounded-2xl bg-white p-3 shadow-[0_14px_35px_rgba(15,23,42,0.07)] ring-1 ring-black/[0.04]"><Icon className="h-6 w-6 text-slate-400" /></div>}
      <p className="text-sm font-medium text-foreground">{title}</p>
      {description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}
    </div>
  );
}
