"use client";
import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { StatusBadge } from "@/components/inventory/shared/status-badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { EmptyState } from "@/components/ui/empty-state";
import { Plus, QrCode, ArrowUpRight } from "lucide-react";
import { kits, formatDate } from "@/lib/inventory/mock-data";

export default function KitsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.ceil(kits.length / pageSize);
  const paginated = kits.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div><h1 className="text-2xl font-bold tracking-tight">Serviceboxen</h1><p className="text-sm text-muted-foreground">{kits.length} Serviceboxen</p></div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><QrCode className="mr-1.5 h-3.5 w-3.5" />QR-Codes</Button>
          <Button size="sm"><Plus className="mr-1.5 h-3.5 w-3.5" />Box anlegen</Button>
        </div>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader><TableRow className="hover:bg-transparent">
              <TableHead>Name</TableHead><TableHead>Typ</TableHead><TableHead>Fahrzeug</TableHead>
              <TableHead>Verantwortlich</TableHead><TableHead className="text-right">Vollst.</TableHead>
              <TableHead className="text-right">Fehlend</TableHead><TableHead>Status</TableHead>
              <TableHead>Letzte Prüfung</TableHead><TableHead className="w-[80px]"></TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {paginated.length === 0 ? (
                <TableRow><TableCell colSpan={9} className="p-0"><EmptyState title="Keine Serviceboxen" description="Keine Serviceboxen vorhanden." /></TableCell></TableRow>
              ) : paginated.map((kit) => (
                <TableRow key={kit.id} className="group">
                  <TableCell><div className="flex items-center gap-3"><div className="h-8 w-8 rounded-xl bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)] ring-1 ring-black/[0.04] flex items-center justify-center">S</div><span className="font-medium text-sm">{kit.name}</span></div></TableCell>
                  <TableCell className="text-sm text-muted-foreground">{kit.type}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{kit.vehicleName || "-"}</TableCell>
                  <TableCell className="text-sm">{kit.responsiblePerson || "-"}</TableCell>
                  <TableCell className="text-right"><span className={`text-sm font-semibold ${kit.completeness < 80 ? "text-red-600" : kit.completeness < 95 ? "text-amber-600" : "text-green-600"}`}>{kit.completeness}%</span></TableCell>
                  <TableCell className="text-right">{kit.missingItems > 0 ? <span className="font-semibold text-sm text-red-600">{kit.missingItems}</span> : <span className="text-sm text-muted-foreground">-</span>}</TableCell>
                  <TableCell><StatusBadge status={kit.status} /></TableCell>
                  <TableCell className="text-sm text-muted-foreground">{kit.lastCheckAt ? formatDate(kit.lastCheckAt) : "-"}</TableCell>
                  <TableCell><div className="flex gap-1 opacity-0 group-hover:opacity-100"><Link href={`/inventory/kits/${kit.id}`}><Button size="icon" variant="ghost" className="h-7 w-7"><ArrowUpRight className="h-3.5 w-3.5" /></Button></Link></div></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <div className="px-4 py-3 shadow-[0_-1px_0_rgba(15,23,42,0.05)]"><Pagination currentPage={currentPage} totalPages={totalPages} totalItems={kits.length} pageSize={pageSize} onPageChange={setCurrentPage} /></div>
      </Card>
    </div>
  );
}
