"use client";
import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Plus, AlertTriangle, CheckCircle, Clock, Lock, Calendar, ArrowUpRight } from "lucide-react";
import { equipment, formatDate } from "@/lib/inventory/mock-data";

const testStatusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  ok: { label: "OK", color: "bg-green-100 text-green-700", icon: CheckCircle },
  due: { label: "Fällig", color: "bg-amber-100 text-amber-700", icon: Clock },
  overdue: { label: "Überfällig", color: "bg-red-100 text-red-700", icon: AlertTriangle },
  failed: { label: "Fehlgeschlagen", color: "bg-red-100 text-red-700", icon: AlertTriangle },
};

export default function EquipmentPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.ceil(equipment.length / pageSize);
  const paginated = equipment.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div><h1 className="text-2xl font-bold tracking-tight">Prüfmittel</h1><p className="text-sm text-muted-foreground">{equipment.length} Prüfmittel</p></div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Calendar className="mr-1.5 h-3.5 w-3.5" />Prüfkalender</Button>
          <Button size="sm"><Plus className="mr-1.5 h-3.5 w-3.5" />Prüfmittel anlegen</Button>
        </div>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader><TableRow className="hover:bg-transparent">
              <TableHead>Name</TableHead><TableHead>Seriennummer</TableHead><TableHead>Kategorie</TableHead>
              <TableHead>Standort</TableHead><TableHead>Verantwortlich</TableHead>
              <TableHead>Prüfstatus</TableHead><TableHead>Nächste Prüfung</TableHead>
              <TableHead>Letzte Prüfung</TableHead><TableHead>Sperre</TableHead><TableHead className="w-[80px]"></TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {paginated.map((eq) => {
                const cfg = testStatusConfig[eq.testStatus] || testStatusConfig.ok;
                const Icon = cfg.icon;
                return (
                  <TableRow key={eq.id}>
                    <TableCell><p className="font-medium text-sm">{eq.name}</p></TableCell>
                    <TableCell className="font-mono text-sm text-muted-foreground">{eq.serialNumber}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{eq.category || "-"}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{eq.locationName || "-"}</TableCell>
                    <TableCell className="text-sm">{eq.responsiblePerson || "-"}</TableCell>
                    <TableCell><span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${cfg.color}`}><Icon className="h-3 w-3" />{cfg.label}</span></TableCell>
                    <TableCell className="text-sm">{eq.nextTestDate ? formatDate(eq.nextTestDate) : "-"}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{eq.lastTestDate ? formatDate(eq.lastTestDate) : "-"}</TableCell>
                    <TableCell>{eq.isLocked ? <Lock className="h-4 w-4 text-red-500" /> : <span className="text-sm text-muted-foreground">-</span>}</TableCell>
                    <TableCell><Link href={`/inventory/equipment/${eq.id}`}><Button size="icon" variant="ghost" className="h-7 w-7"><ArrowUpRight className="h-3.5 w-3.5" /></Button></Link></TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
        <div className="px-4 py-3 shadow-[0_-1px_0_rgba(15,23,42,0.05)]"><Pagination currentPage={currentPage} totalPages={totalPages} totalItems={equipment.length} pageSize={pageSize} onPageChange={setCurrentPage} /></div>
      </Card>
    </div>
  );
}
