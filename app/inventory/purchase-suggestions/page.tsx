"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Pagination } from "@/components/ui/pagination";
import { StatusBadge } from "@/components/inventory/shared/status-badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { EmptyState } from "@/components/ui/empty-state";
import { ShoppingCart, CheckCircle, MapPin } from "lucide-react";
import { purchaseSuggestions, formatNumber } from "@/lib/inventory/mock-data";

const severities = [{ value: "", label: "Alle" }, { value: "critical", label: "Kritisch" }, { value: "warning", label: "Warnung" }];

export default function PurchaseSuggestionsPage() {
  const [severityFilter, setSeverityFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const filtered = purchaseSuggestions.filter((s) => !severityFilter || s.severity === severityFilter);
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div><h1 className="text-2xl font-bold tracking-tight">Bestellvorschläge</h1><p className="text-sm text-muted-foreground">{filtered.length} Vorschläge</p></div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><CheckCircle className="mr-1.5 h-3.5 w-3.5" />Alle bestätigen</Button>
          <Button size="sm"><ShoppingCart className="mr-1.5 h-3.5 w-3.5" />Ausgewählte bestellen</Button>
        </div>
      </div>

      <Card><CardContent className="p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="w-full sm:w-36">
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Schweregrad</label>
            <Select options={severities} value={severityFilter} onChange={(e) => { setSeverityFilter(e.target.value); setCurrentPage(1); }} />
          </div>
        </div>
      </CardContent></Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader><TableRow className="hover:bg-transparent">
              <TableHead>Schweregrad</TableHead><TableHead>Artikel</TableHead><TableHead>SKU</TableHead>
              <TableHead className="text-right">Bestand</TableHead><TableHead className="text-right">Tagesverbrauch</TableHead>
              <TableHead className="text-right">Reichweite</TableHead><TableHead className="text-right">Vorschlag</TableHead>
              <TableHead>Lieferant</TableHead><TableHead>Grund</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {paginated.length === 0 ? (
                <TableRow><TableCell colSpan={9} className="p-0"><EmptyState title="Keine Vorschläge" description="Keine Bestellvorschläge vorhanden." /></TableCell></TableRow>
              ) : paginated.map((s) => (
                <TableRow key={s.id}>
                  <TableCell><StatusBadge status={s.severity} /></TableCell>
                  <TableCell><p className="font-medium text-sm">{s.productName}</p><p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><MapPin className="h-3 w-3" />{s.locationName}</p></TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">{s.sku}</TableCell>
                  <TableCell className="text-right text-sm"><span className={s.available < s.consumptionPerDay * s.leadTimeDays ? "text-red-600 font-medium" : ""}>{formatNumber(s.currentStock)} {s.unit}</span></TableCell>
                  <TableCell className="text-right text-sm text-muted-foreground">{formatNumber(s.consumptionPerDay)} / Tag</TableCell>
                  <TableCell className="text-right"><span className={`text-sm font-semibold ${s.daysOfSupply < s.leadTimeDays ? "text-red-600" : "text-green-600"}`}>{s.daysOfSupply} Tage</span></TableCell>
                  <TableCell className="text-right"><span className="font-semibold text-sm">{formatNumber(s.suggestedQty)} {s.unit}</span></TableCell>
                  <TableCell className="text-sm text-muted-foreground">{s.supplierName}</TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-[200px]"><span className="line-clamp-2">{s.reason}</span></TableCell>
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
