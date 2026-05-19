"use client";
import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Pagination } from "@/components/ui/pagination";
import { StatusBadge } from "@/components/inventory/shared/status-badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { EmptyState } from "@/components/ui/empty-state";
import { Plus, ArrowUpRight, ShoppingCart } from "lucide-react";
import { orders, formatDate, formatCurrency } from "@/lib/inventory/mock-data";

const statusFilters = [{ value: "", label: "Alle Status" }, { value: "draft", label: "Entwurf" }, { value: "ordered", label: "Bestellt" }, { value: "partial", label: "Teillieferung" }, { value: "delivered", label: "Geliefert" }, { value: "overdue", label: "Überfällig" }];

export default function PurchaseOrdersPage() {
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const filtered = orders.filter((o) => !statusFilter || o.status === statusFilter);
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div><h1 className="text-2xl font-bold tracking-tight">Bestellungen</h1><p className="text-sm text-muted-foreground">{filtered.length} Bestellungen</p></div>
        <div className="flex gap-2"><Button variant="outline" size="sm"><ShoppingCart className="mr-1.5 h-3.5 w-3.5" />Schnellbestellung</Button><Button size="sm"><Plus className="mr-1.5 h-3.5 w-3.5" />Bestellung anlegen</Button></div>
      </div>
      <Card><CardContent className="p-4"><div className="flex flex-col gap-4 sm:flex-row sm:items-end"><div className="w-full sm:w-40"><label className="text-xs font-medium text-muted-foreground mb-1 block">Status</label><Select options={statusFilters} value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }} /></div></div></CardContent></Card>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader><TableRow className="hover:bg-transparent"><TableHead>Bestellnr.</TableHead><TableHead>Lieferant</TableHead><TableHead>Bestelldatum</TableHead><TableHead>Erwartet</TableHead><TableHead className="text-right">Wert</TableHead><TableHead>Projekt</TableHead><TableHead>Status</TableHead><TableHead>Pos.</TableHead><TableHead className="w-[80px]"></TableHead></TableRow></TableHeader>
            <TableBody>
              {paginated.length === 0 ? <TableRow><TableCell colSpan={9} className="p-0"><EmptyState title="Keine Bestellungen" description="Keine Bestellungen vorhanden." /></TableCell></TableRow> : paginated.map((order) => (
                <TableRow key={order.id} className="group">
                  <TableCell className="font-mono text-sm font-medium">{order.orderNumber}</TableCell>
                  <TableCell className="text-sm">{order.supplierName || "-"}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{order.orderDate ? formatDate(order.orderDate) : "-"}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{order.expectedDeliveryDate ? formatDate(order.expectedDeliveryDate) : "-"}</TableCell>
                  <TableCell className="text-right font-medium text-sm">{formatCurrency(order.totalValue)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{order.projectName || "-"}</TableCell>
                  <TableCell><StatusBadge status={order.status} /></TableCell>
                  <TableCell className="text-sm text-muted-foreground">{order.positions.length}</TableCell>
                  <TableCell><div className="flex gap-1 opacity-0 group-hover:opacity-100"><Link href={`/inventory/purchase-orders/${order.id}`}><Button size="icon" variant="ghost" className="h-7 w-7"><ArrowUpRight className="h-3.5 w-3.5" /></Button></Link></div></TableCell>
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
