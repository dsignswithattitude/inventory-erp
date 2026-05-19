"use client";
import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Pagination } from "@/components/ui/pagination";
import { StatusBadge } from "@/components/inventory/shared/status-badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { EmptyState } from "@/components/ui/empty-state";
import { Plus, QrCode, ArrowUpRight, PlusCircle } from "lucide-react";
import { vehicles, formatDate } from "@/lib/inventory/mock-data";

const statuses = [{ value: "", label: "Alle Status" }, { value: "ok", label: "OK" }, { value: "low", label: "Niedrig" }, { value: "critical", label: "Kritisch" }];

export default function VehiclesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const filtered = vehicles.filter((v) => {
    if (searchQuery && !v.name.toLowerCase().includes(searchQuery.toLowerCase()) && !v.licensePlate.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (statusFilter && v.status !== statusFilter) return false;
    return true;
  });

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div><h1 className="text-2xl font-bold tracking-tight">Fahrzeuge</h1><p className="text-sm text-muted-foreground">{filtered.length} Fahrzeuge</p></div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><QrCode className="mr-1.5 h-3.5 w-3.5" />QR-Codes drucken</Button>
          <Button size="sm"><Plus className="mr-1.5 h-3.5 w-3.5" />Fahrzeug anlegen</Button>
        </div>
      </div>

      <Card><CardContent className="p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Suche</label>
            <Input placeholder="Name, Kennzeichen..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} />
          </div>
          <div className="w-full sm:w-36">
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Status</label>
            <Select options={statuses} value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }} />
          </div>
        </div>
      </CardContent></Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader><TableRow className="hover:bg-transparent">
              <TableHead>Fahrzeug</TableHead><TableHead>Kennzeichen</TableHead><TableHead>Verantwortlich</TableHead><TableHead>Standort</TableHead>
              <TableHead className="text-right">Vollständigkeit</TableHead><TableHead className="text-right">Fehlend</TableHead><TableHead>Kritisch</TableHead>
              <TableHead>Status</TableHead><TableHead>Letzter Check</TableHead><TableHead className="w-[100px]"></TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {paginated.length === 0 ? (
                <TableRow><TableCell colSpan={10} className="p-0"><EmptyState title="Keine Fahrzeuge gefunden" description="Passen Sie Ihre Suche an." /></TableCell></TableRow>
              ) : paginated.map((v) => (
                <TableRow key={v.id} className="group">
                  <TableCell><div className="flex items-center gap-3"><div className="h-8 w-8 rounded-xl bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)] ring-1 ring-black/[0.04] flex items-center justify-center">T</div><span className="font-medium text-sm">{v.name}</span></div></TableCell>
                  <TableCell className="font-mono text-sm">{v.licensePlate}</TableCell>
                  <TableCell className="text-sm">{v.responsiblePerson || "-"}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{v.locationName || "-"}</TableCell>
                  <TableCell className="text-right"><span className={`text-sm font-semibold ${v.completeness < 80 ? "text-red-600" : v.completeness < 95 ? "text-amber-600" : "text-green-600"}`}>{v.completeness}%</span></TableCell>
                  <TableCell className="text-right text-sm">{v.missingItems > 0 ? v.missingItems : "-"}</TableCell>
                  <TableCell className="text-right">{v.criticalItems > 0 ? <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700">{v.criticalItems}</span> : <span className="text-sm text-muted-foreground">-</span>}</TableCell>
                  <TableCell><StatusBadge status={v.status} /></TableCell>
                  <TableCell className="text-sm text-muted-foreground">{v.lastCheckAt ? formatDate(v.lastCheckAt) : "-"}</TableCell>
                  <TableCell>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                      <Link href={`/inventory/vehicles/${v.id}`}><Button size="icon" variant="ghost" className="h-7 w-7"><ArrowUpRight className="h-3.5 w-3.5" /></Button></Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <div className="px-4 py-3 shadow-[0_-1px_0_rgba(15,23,42,0.05)]"><Pagination currentPage={currentPage} totalPages={totalPages} totalItems={filtered.length} pageSize={pageSize} onPageChange={setCurrentPage} /></div>
      </Card>
    </div>
  );
}
