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
import { Plus, ArrowUpRight, Warehouse, Truck, FolderKanban, Package } from "lucide-react";
import { locations, formatDate } from "@/lib/inventory/mock-data";

const typeIcons: Record<string, React.ElementType> = { warehouse: Warehouse, vehicle: Truck, project: FolderKanban, container: Package, servicebox: Package };
const statusFilters = [{ value: "", label: "Alle Status" }, { value: "ok", label: "OK" }, { value: "low", label: "Niedrig" }, { value: "critical", label: "Kritisch" }];

export default function LocationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const filtered = locations.filter((l) => {
    if (searchQuery && !l.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (statusFilter && l.status !== statusFilter) return false;
    return true;
  });
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><h1 className="text-2xl font-bold tracking-tight">Orte</h1><p className="text-sm text-muted-foreground">{filtered.length} Orte</p></div><Button size="sm"><Plus className="mr-1.5 h-3.5 w-3.5" />Ort anlegen</Button></div>
      <Card><CardContent className="p-4"><div className="flex flex-col gap-4 sm:flex-row sm:items-end"><div className="flex-1"><label className="text-xs font-medium text-muted-foreground mb-1 block">Suche</label><Input placeholder="Ortsname..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} /></div><div className="w-full sm:w-36"><label className="text-xs font-medium text-muted-foreground mb-1 block">Status</label><Select options={statusFilters} value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }} /></div></div></CardContent></Card>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader><TableRow className="hover:bg-transparent"><TableHead>Ort</TableHead><TableHead>Typ</TableHead><TableHead>Verantwortlich</TableHead><TableHead className="text-right">Artikel</TableHead><TableHead className="text-right">Bestandswert</TableHead><TableHead className="text-right">Kritisch</TableHead><TableHead>Status</TableHead><TableHead>Letzte Bewegung</TableHead><TableHead className="w-[80px]"></TableHead></TableRow></TableHeader>
            <TableBody>
              {paginated.length === 0 ? <TableRow><TableCell colSpan={9} className="p-0"><EmptyState title="Keine Orte" description="Keine Orte vorhanden." /></TableCell></TableRow> : paginated.map((loc) => {
                const Icon = typeIcons[loc.type] || Warehouse;
                return (
                  <TableRow key={loc.id} className="group">
                    <TableCell><div className="flex items-center gap-3"><div className="h-8 w-8 rounded-xl bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)] ring-1 ring-black/[0.04] flex items-center justify-center"><Icon className="h-4 w-4 text-slate-600" /></div><span className="font-medium text-sm">{loc.name}</span></div></TableCell>
                    <TableCell className="text-sm text-muted-foreground capitalize">{loc.type}</TableCell>
                    <TableCell className="text-sm">{loc.responsiblePerson || "-"}</TableCell>
                    <TableCell className="text-right text-sm">{loc.itemCount}</TableCell>
                    <TableCell className="text-right text-sm">€{(loc.stockValue / 1000).toFixed(0)}k</TableCell>
                    <TableCell className="text-right">{loc.criticalItems > 0 ? <span className="font-semibold text-sm text-red-600">{loc.criticalItems}</span> : <span className="text-sm text-muted-foreground">-</span>}</TableCell>
                    <TableCell><StatusBadge status={loc.status} /></TableCell>
                    <TableCell className="text-sm text-muted-foreground">{loc.lastMovementAt ? formatDate(loc.lastMovementAt) : "-"}</TableCell>
                    <TableCell><div className="flex gap-1 opacity-0 group-hover:opacity-100"><Link href={`/inventory/locations/${loc.id}`}><Button size="icon" variant="ghost" className="h-7 w-7"><ArrowUpRight className="h-3.5 w-3.5" /></Button></Link></div></TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
        <div className="px-4 py-3 shadow-[0_-1px_0_rgba(15,23,42,0.05)]"><Pagination currentPage={currentPage} totalPages={totalPages} totalItems={filtered.length} pageSize={pageSize} onPageChange={setCurrentPage} /></div>
      </Card>
    </div>
  );
}
