"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Pagination } from "@/components/ui/pagination";
import { StatusBadge } from "@/components/inventory/shared/status-badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { EmptyState } from "@/components/ui/empty-state";
import Link from "next/link";
import { Plus, Search, ArrowUpRight } from "lucide-react";
import { projects, formatDate } from "@/lib/inventory/mock-data";

const statuses = [{ value: "", label: "Alle Status" }, { value: "planning", label: "Planung" }, { value: "active", label: "Aktiv" }, { value: "onhold", label: "Pausiert" }, { value: "completed", label: "Abgeschlossen" }];

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const filtered = projects.filter((p) => {
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase()) && !p.customer?.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (statusFilter && p.status !== statusFilter) return false;
    return true;
  });

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div><h1 className="text-2xl font-bold tracking-tight">Projekte</h1><p className="text-sm text-muted-foreground">{filtered.length} Projekte</p></div>
        <Button size="sm"><Plus className="mr-1.5 h-3.5 w-3.5" />Projekt anlegen</Button>
      </div>

      <Card><CardContent className="p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Suche</label>
            <Input placeholder="Projektname, Kunde..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} />
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
              <TableHead>Projekt</TableHead><TableHead>Kunde</TableHead><TableHead>Start</TableHead>
              <TableHead>Status</TableHead><TableHead>Material</TableHead>
              <TableHead className="text-right">Fehlend</TableHead><TableHead className="text-right">Reserviert</TableHead>
              <TableHead className="text-right">Bestellungen</TableHead><TableHead>Projektleiter</TableHead><TableHead className="w-[80px]"></TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {paginated.length === 0 ? (
                <TableRow><TableCell colSpan={10} className="p-0"><EmptyState title="Keine Projekte gefunden" description="Passen Sie Ihre Suche an." /></TableCell></TableRow>
              ) : paginated.map((prj) => (
                <TableRow key={prj.id} className="group">
                  <TableCell><div className="flex items-center gap-3"><div className="h-8 w-8 rounded-xl bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)] ring-1 ring-black/[0.04] flex items-center justify-center">P</div><span className="font-medium text-sm">{prj.name}</span></div></TableCell>
                  <TableCell className="text-sm text-muted-foreground">{prj.customer || "-"}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{prj.startDate ? formatDate(prj.startDate) : "-"}</TableCell>
                  <TableCell><StatusBadge status={prj.status} /></TableCell>
                  <TableCell><StatusBadge status={prj.materialStatus} /></TableCell>
                  <TableCell className="text-right">{prj.missingItems > 0 ? <span className="font-semibold text-sm text-red-600">{prj.missingItems}</span> : <span className="text-sm text-muted-foreground">-</span>}</TableCell>
                  <TableCell className="text-right text-sm text-muted-foreground">{prj.reservedPositions}</TableCell>
                  <TableCell className="text-right text-sm text-muted-foreground">{prj.openOrders}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{prj.projectManager || "-"}</TableCell>
                  <TableCell><Link href={`/inventory/projects/${prj.id}`}><Button size="icon" variant="ghost" className="h-8 w-8 opacity-0 group-hover:opacity-100"><ArrowUpRight className="h-4 w-4" /></Button></Link></TableCell>
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
