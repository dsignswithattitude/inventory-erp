"use client";
import * as React from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ElementType;
}

export function EmptyState({ title, description, icon: Icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {Icon && <div className="rounded-full bg-slate-100 p-3 mb-3"><Icon className="h-6 w-6 text-slate-400" /></div>}
      <p className="text-sm font-medium text-foreground">{title}</p>
      {description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}
    </div>
  );
}
