"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Pagination } from "@/components/ui/pagination";
import { StatusBadge } from "@/components/inventory/shared/status-badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { EmptyState } from "@/components/ui/empty-state";
import { AlertTriangle, CheckCircle, Bell } from "lucide-react";
import { alerts, formatDateTime } from "@/lib/inventory/mock-data";

const typeFilters = [{ value: "", label: "Alle Typen" }, { value: "stock", label: "Bestand" }, { value: "project", label: "Projekt" }, { value: "vehicle", label: "Fahrzeug" }, { value: "order", label: "Bestellung" }, { value: "equipment", label: "Prüfmittel" }, { value: "kit", label: "Servicebox" }];
const statusFilters = [{ value: "", label: "Alle Status" }, { value: "open", label: "Offen" }, { value: "acknowledged", label: "Bestätigt" }, { value: "resolved", label: "Erledigt" }, { value: "ignored", label: "Ignoriert" }];

export default function AlertsPage() {
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const filtered = alerts.filter((a) => {
    if (typeFilter && a.type !== typeFilter) return false;
    if (statusFilter && a.status !== statusFilter) return false;
    return true;
  });

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div><h1 className="text-2xl font-bold tracking-tight">Warnungen</h1><p className="text-sm text-muted-foreground">{filtered.length} Warnungen</p></div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><CheckCircle className="mr-1.5 h-3.5 w-3.5" />Alle bestätigen</Button>
          <Button variant="outline" size="sm"><Bell className="mr-1.5 h-3.5 w-3.5" />Einstellungen</Button>
        </div>
      </div>

      <Card><CardContent className="p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="w-full sm:w-40">
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Typ</label>
            <Select options={typeFilters} value={typeFilter} onChange={(e) => { setTypeFilter(e.target.value); setCurrentPage(1); }} />
          </div>
          <div className="w-full sm:w-40">
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Status</label>
            <Select options={statusFilters} value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }} />
          </div>
        </div>
      </CardContent></Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader><TableRow className="hover:bg-transparent">
              <TableHead>Schwere</TableHead><TableHead>Datum</TableHead><TableHead>Titel</TableHead>
              <TableHead>Typ</TableHead><TableHead>Objekt</TableHead><TableHead>Verantwortlich</TableHead>
              <TableHead>Aktion</TableHead><TableHead>Status</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {paginated.length === 0 ? (
                <TableRow><TableCell colSpan={8} className="p-0"><EmptyState title="Keine Warnungen" description="Keine Warnungen vorhanden." /></TableCell></TableRow>
              ) : paginated.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell>
                    <div className={`rounded-full p-1.5 ${alert.severity === "critical" ? "bg-red-100 text-red-600" : alert.severity === "warning" ? "bg-amber-100 text-amber-600" : "bg-blue-100 text-blue-600"}`}>
                      <AlertTriangle className="h-4 w-4" />
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">{formatDateTime(alert.createdAt)}</TableCell>
                  <TableCell className="font-medium text-sm max-w-[200px]"><span className="line-clamp-1">{alert.title}</span></TableCell>
                  <TableCell className="text-sm capitalize">{alert.type}</TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-[150px]"><span className="line-clamp-1">{alert.productName || alert.projectName || alert.vehicleName || "-"}</span></TableCell>
                  <TableCell className="text-sm text-muted-foreground">{alert.responsible || "-"}</TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-[200px]"><span className="line-clamp-1">{alert.recommendedAction}</span></TableCell>
                  <TableCell><StatusBadge status={alert.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <div className="border-t px-4 py-3"><Pagination currentPage={currentPage} totalPages={totalPages} totalItems={filtered.length} pageSize={pageSize} onPageChange={setCurrentPage} /></div>
      </Card>
    </div>
  );
}
