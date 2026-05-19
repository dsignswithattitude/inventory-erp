import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle, PackageOpen, Printer, Truck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/inventory/shared/status-badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { orders, formatCurrency, formatDate } from "@/lib/inventory/mock-data";

export default async function PurchaseOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = orders.find((item) => item.id === id);
  if (!order) notFound();

  const receivedTotal = order.positions.reduce((sum, item) => sum + item.receivedQty, 0);
  const orderedTotal = order.positions.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/inventory/purchase-orders" className="flex items-center gap-1 hover:text-foreground"><ArrowLeft className="h-3.5 w-3.5" />Bestellungen</Link>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1>{order.orderNumber}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{order.supplierName || "Ohne Lieferant"} · {order.projectName || "Kein Projekt"}</p>
          <div className="mt-3"><StatusBadge status={order.status} /></div>
        </div>
        <div className="flex max-w-full gap-2 overflow-x-auto">
          <Button variant="outline" size="sm"><Printer className="mr-1.5 h-3.5 w-3.5" />Drucken</Button>
          <Button variant="outline" size="sm"><Truck className="mr-1.5 h-3.5 w-3.5" />Lieferstatus</Button>
          <Button size="sm"><CheckCircle className="mr-1.5 h-3.5 w-3.5" />Wareneingang buchen</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card><CardContent className="p-4"><p className="text-xs font-semibold uppercase text-slate-400">Wert</p><p className="mt-1 text-2xl font-semibold">{formatCurrency(order.totalValue)}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs font-semibold uppercase text-slate-400">Positionen</p><p className="mt-1 text-2xl font-semibold">{order.positions.length}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs font-semibold uppercase text-slate-400">Empfangen</p><p className="mt-1 text-2xl font-semibold">{receivedTotal}/{orderedTotal}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs font-semibold uppercase text-slate-400">Erwartet</p><p className="mt-1 text-lg font-semibold">{order.expectedDeliveryDate ? formatDate(order.expectedDeliveryDate) : "-"}</p></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Positionen</CardTitle><CardDescription className="text-xs">Bestellte und gelieferte Mengen</CardDescription></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader><TableRow><TableHead>Artikel</TableHead><TableHead>SKU</TableHead><TableHead className="text-right">Bestellt</TableHead><TableHead className="text-right">Geliefert</TableHead><TableHead className="text-right">Einzelpreis</TableHead><TableHead className="text-right">Gesamt</TableHead><TableHead>Status</TableHead><TableHead></TableHead></TableRow></TableHeader>
            <TableBody>
              {order.positions.map((position) => (
                <TableRow key={position.id}>
                  <TableCell><p className="font-medium">{position.productName}</p></TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">{position.sku}</TableCell>
                  <TableCell className="text-right text-sm">{position.qty} {position.unit}</TableCell>
                  <TableCell className="text-right text-sm">{position.receivedQty} {position.unit}</TableCell>
                  <TableCell className="text-right text-sm">{formatCurrency(position.price)}</TableCell>
                  <TableCell className="text-right font-medium">{formatCurrency(position.total)}</TableCell>
                  <TableCell><StatusBadge status={position.status} /></TableCell>
                  <TableCell><Button size="sm" variant="outline"><PackageOpen className="mr-1 h-3 w-3" />Buchen</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
