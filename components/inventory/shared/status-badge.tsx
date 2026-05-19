"use client";
import { cn } from "@/lib/utils";

const statusConfig: Record<string, { label: string; className: string }> = {
  ok: { label: "OK", className: "bg-green-100 text-green-700" },
  low: { label: "Niedrig", className: "bg-amber-100 text-amber-700" },
  critical: { label: "Kritisch", className: "bg-red-100 text-red-700" },
  out: { label: "Leer", className: "bg-red-100 text-red-700" },
  open: { label: "Offen", className: "bg-red-100 text-red-700" },
  acknowledged: { label: "Bestätigt", className: "bg-amber-100 text-amber-700" },
  resolved: { label: "Erledigt", className: "bg-green-100 text-green-700" },
  ignored: { label: "Ignoriert", className: "bg-slate-100 text-slate-500" },
  warning: { label: "Warnung", className: "bg-amber-100 text-amber-700" },
  planning: { label: "Planung", className: "bg-blue-100 text-blue-700" },
  active: { label: "Aktiv", className: "bg-green-100 text-green-700" },
  onhold: { label: "Pausiert", className: "bg-slate-100 text-slate-500" },
  completed: { label: "Abgeschlossen", className: "bg-green-100 text-green-700" },
  draft: { label: "Entwurf", className: "bg-slate-100 text-slate-500" },
  ordered: { label: "Bestellt", className: "bg-blue-100 text-blue-700" },
  partial: { label: "Teillieferung", className: "bg-amber-100 text-amber-700" },
  delivered: { label: "Geliefert", className: "bg-green-100 text-green-700" },
  overdue: { label: "Überfällig", className: "bg-red-100 text-red-700" },
  cancelled: { label: "Storniert", className: "bg-slate-100 text-slate-500" },
};

interface StatusBadgeProps { status: string; className?: string }

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const cfg = statusConfig[status] || { label: status, className: "bg-slate-100 text-slate-600" };
  return (
    <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", cfg.className, className)}>
      {cfg.label}
    </span>
  );
}
