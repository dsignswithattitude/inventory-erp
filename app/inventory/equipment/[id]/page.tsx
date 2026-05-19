import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Lock, Plus, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/inventory/shared/status-badge";
import { equipment, formatDate } from "@/lib/inventory/mock-data";

export default async function EquipmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = equipment.find((entry) => entry.id === id);
  if (!item) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/inventory/equipment" className="flex items-center gap-1 hover:text-foreground"><ArrowLeft className="h-3.5 w-3.5" />Pruefmittel</Link>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div><h1>{item.name}</h1><p className="mt-1 font-mono text-sm text-muted-foreground">{item.serialNumber}</p><div className="mt-3"><StatusBadge status={item.testStatus === "due" ? "warning" : item.testStatus === "overdue" ? "overdue" : "ok"} /></div></div>
        <div className="flex max-w-full gap-2 overflow-x-auto"><Button variant="outline" size="sm"><Calendar className="mr-1.5 h-3.5 w-3.5" />Termin</Button><Button variant="outline" size="sm"><ShieldCheck className="mr-1.5 h-3.5 w-3.5" />Pruefung buchen</Button><Button size="sm"><Plus className="mr-1.5 h-3.5 w-3.5" />Dokument hochladen</Button></div>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <Card><CardContent className="p-4"><p className="text-xs font-semibold uppercase text-slate-400">Kategorie</p><p className="mt-2 text-sm font-medium">{item.category || "-"}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs font-semibold uppercase text-slate-400">Standort</p><p className="mt-2 text-sm font-medium">{item.locationName || "-"}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs font-semibold uppercase text-slate-400">Naechste Pruefung</p><p className="mt-2 text-sm font-medium">{item.nextTestDate ? formatDate(item.nextTestDate) : "-"}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs font-semibold uppercase text-slate-400">Sperre</p><p className="mt-2 flex items-center gap-2 text-sm font-medium">{item.isLocked ? <><Lock className="h-4 w-4 text-red-500" />Gesperrt</> : "Frei"}</p></CardContent></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="text-base">Pruefhistorie</CardTitle><CardDescription className="text-xs">Dokumentierte Kalibrierung und Freigabe</CardDescription></CardHeader>
        <CardContent className="space-y-3">
          <div className="rounded-2xl bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.06)] ring-1 ring-black/[0.04]"><p className="font-medium">Letzte Pruefung</p><p className="text-sm text-muted-foreground">{item.lastTestDate ? formatDate(item.lastTestDate) : "Nicht dokumentiert"}</p></div>
          <div className="rounded-2xl bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.06)] ring-1 ring-black/[0.04]"><p className="font-medium">Verantwortlich</p><p className="text-sm text-muted-foreground">{item.responsiblePerson || "-"}</p></div>
        </CardContent>
      </Card>
    </div>
  );
}
