"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, ClipboardList, PackagePlus, Printer, QrCode, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type ActionKind = "create" | "order" | "print" | "qr" | "save" | "check" | "default";

interface ActionState {
  label: string;
  kind: ActionKind;
  message: string;
}

function getActionKind(label: string): ActionKind {
  const lower = label.toLowerCase();
  if (lower.includes("anlegen") || lower.includes("bearbeiten")) return "create";
  if (lower.includes("bestell") || lower.includes("auffuell") || lower.includes("auffüll")) return "order";
  if (lower.includes("druck")) return "print";
  if (lower.includes("qr")) return "qr";
  if (lower.includes("speichern")) return "save";
  if (lower.includes("inventur") || lower.includes("pruef") || lower.includes("prüf")) return "check";
  return "default";
}

function getActionMessage(label: string, kind: ActionKind): string {
  if (kind === "create") return `${label} ist vorbereitet. Die Eingabemaske ist als Demo-Workflow geoeffnet.`;
  if (kind === "order") return `${label} wurde in die Arbeitsliste gelegt.`;
  if (kind === "print") return `${label} wurde als Druckauftrag vorbereitet.`;
  if (kind === "qr") return `${label} wurde erzeugt und liegt zur Ausgabe bereit.`;
  if (kind === "save") return "Aenderungen wurden lokal in dieser Demo gespeichert.";
  if (kind === "check") return `${label} wurde als Pruefschritt gestartet.`;
  return `${label || "Aktion"} wurde ausgefuehrt.`;
}

function ActionIcon({ kind }: { kind: ActionKind }) {
  if (kind === "create") return <PackagePlus className="h-5 w-5" />;
  if (kind === "order") return <ClipboardList className="h-5 w-5" />;
  if (kind === "print") return <Printer className="h-5 w-5" />;
  if (kind === "qr") return <QrCode className="h-5 w-5" />;
  if (kind === "save") return <Save className="h-5 w-5" />;
  return <CheckCircle2 className="h-5 w-5" />;
}

export function InventoryActionLayer() {
  const [action, setAction] = useState<ActionState | null>(null);
  const [toast, setToast] = useState<ActionState | null>(null);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const button = target?.closest("button");
      if (!button || button.disabled || button.closest("a") || button.closest("[data-native-action='true']")) return;

      const label = button.textContent?.trim() || button.getAttribute("aria-label") || "Aktion";
      const kind = getActionKind(label);
      const nextAction = { label, kind, message: getActionMessage(label, kind) };
      setToast(nextAction);

      if (kind !== "default") {
        setAction(nextAction);
      }
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const fields = useMemo(() => {
    if (!action) return [];
    if (action.kind === "create") return ["Name", "Kategorie", "Verantwortlich"];
    if (action.kind === "order") return ["Artikel", "Menge", "Zielort"];
    if (action.kind === "check") return ["Objekt", "Termin", "Verantwortlich"];
    if (action.kind === "print" || action.kind === "qr") return ["Ausgabe", "Format", "Ziel"];
    return ["Status", "Notiz"];
  }, [action]);

  return (
    <>
      {toast && (
        <div className="fixed bottom-5 right-5 z-[80] flex max-w-sm items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm shadow-[0_24px_70px_rgba(15,23,42,0.18)] ring-1 ring-black/[0.05]">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <ActionIcon kind={toast.kind} />
          </div>
          <div className="min-w-0">
            <p className="font-medium text-slate-900">{toast.label}</p>
            <p className="truncate text-xs text-slate-500">{toast.message}</p>
          </div>
        </div>
      )}

      {action && (
        <div className="fixed inset-0 z-[90] bg-slate-950/18 backdrop-blur-sm" onClick={() => setAction(null)}>
          <aside
            data-native-action="true"
            className="ml-auto flex h-full w-full max-w-[420px] flex-col bg-white p-5 shadow-[0_30px_100px_rgba(15,23,42,0.25)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <ActionIcon kind={action.kind} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-950">{action.label}</h2>
                  <p className="mt-1 text-sm text-slate-500">{action.message}</p>
                </div>
              </div>
              <button className="rounded-xl p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-700" onClick={() => setAction(null)}>
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {fields.map((field) => (
                <label key={field} className="block">
                  <span className="mb-1 block text-xs font-semibold text-slate-500">{field}</span>
                  <input
                    className="h-10 w-full rounded-xl bg-slate-50 px-3 text-sm shadow-[inset_0_0_0_1px_rgba(15,23,42,0.06)] outline-none focus:ring-2 focus:ring-blue-500/25"
                    placeholder={`${field} eingeben`}
                  />
                </label>
              ))}
            </div>

            <div className="mt-auto flex justify-end gap-2 pt-6">
              <Button variant="outline" size="sm" onClick={() => setAction(null)}>Abbrechen</Button>
              <Button size="sm" onClick={() => setAction(null)}>Uebernehmen</Button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
