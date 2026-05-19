"use client";
import { cn } from "@/lib/utils";

const statusConfig: Record<string, { label: string; className: string }> = {
  ok: { label: "OK", className: "bg-emerald-50 text-emerald-700" },
  low: { label: "Niedrig", className: "bg-amber-50 text-amber-700" },
  critical: { label: "Kritisch", className: "bg-red-50 text-red-700" },
  out: { label: "Leer", className: "bg-red-50 text-red-700" },
  open: { label: "Offen", className: "bg-red-50 text-red-700" },
  acknowledged: { label: "Bestätigt", className: "bg-amber-50 text-amber-700" },
  resolved: { label: "Erledigt", className: "bg-emerald-50 text-emerald-700" },
  ignored: { label: "Ignoriert", className: "bg-slate-100 text-slate-500" },
  warning: { label: "Warnung", className: "bg-amber-50 text-amber-700" },
  planning: { label: "Planung", className: "bg-blue-50 text-blue-700" },
  active: { label: "Aktiv", className: "bg-emerald-50 text-emerald-700" },
  onhold: { label: "Pausiert", className: "bg-slate-100 text-slate-500" },
  completed: { label: "Abgeschlossen", className: "bg-emerald-50 text-emerald-700" },
  draft: { label: "Entwurf", className: "bg-slate-100 text-slate-500" },
  ordered: { label: "Bestellt", className: "bg-blue-50 text-blue-700" },
  partial: { label: "Teillieferung", className: "bg-amber-50 text-amber-700" },
  delivered: { label: "Geliefert", className: "bg-emerald-50 text-emerald-700" },
  overdue: { label: "Überfällig", className: "bg-red-50 text-red-700" },
  cancelled: { label: "Storniert", className: "bg-slate-100 text-slate-500" },
};

interface StatusBadgeProps { status: string; className?: string }

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const cfg = statusConfig[status] || { label: status, className: "bg-slate-100 text-slate-600" };
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium shadow-[inset_0_0_0_1px_rgba(255,255,255,0.55)]", cfg.className, className)}>
      {cfg.label}
    </span>
  );
}
