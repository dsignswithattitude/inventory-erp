import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRightLeft, Package, Plus, Warehouse } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/inventory/shared/status-badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { locations, products, movements, formatCurrency, formatDateTime } from "@/lib/inventory/mock-data";

export default async function LocationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const location = locations.find((item) => item.id === id);
  if (!location) notFound();
  const sampleProducts = products.slice(0, 8);
  const locationMovements = movements.filter((item) => item.toLocationId === location.id).slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/inventory/locations" className="flex items-center gap-1 hover:text-foreground"><ArrowLeft className="h-3.5 w-3.5" />Orte</Link>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex min-w-0 items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-[0_12px_30px_rgba(15,23,42,0.08)] ring-1 ring-black/[0.04]"><Warehouse className="h-5 w-5 text-blue-600" /></div>
          <div className="min-w-0">
            <h1>{location.name}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{location.type} · {location.responsiblePerson || "Ohne Verantwortlichen"}</p>
            <div className="mt-3"><StatusBadge status={location.status} /></div>
          </div>
        </div>
        <div className="flex max-w-full gap-2 overflow-x-auto">
          <Button variant="outline" size="sm"><ArrowRightLeft className="mr-1.5 h-3.5 w-3.5" />Umbuchen</Button>
          <Button size="sm"><Plus className="mr-1.5 h-3.5 w-3.5" />Artikel einlagern</Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <Card><CardContent className="p-4"><p className="text-xs font-semibold uppercase text-slate-400">Artikel</p><p className="mt-1 text-3xl font-semibold">{location.itemCount}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs font-semibold uppercase text-slate-400">Bestandswert</p><p className="mt-1 text-2xl font-semibold">{formatCurrency(location.stockValue)}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs font-semibold uppercase text-slate-400">Kritisch</p><p className="mt-1 text-3xl font-semibold">{location.criticalItems}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs font-semibold uppercase text-slate-400">Letzte Bewegung</p><p className="mt-2 text-sm font-medium">{location.lastMovementAt ? formatDateTime(location.lastMovementAt) : "-"}</p></CardContent></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="text-base">Bestand</CardTitle><CardDescription className="text-xs">Beispielbestand am Ort</CardDescription></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader><TableRow><TableHead>Artikel</TableHead><TableHead>SKU</TableHead><TableHead className="text-right">Verfuegbar</TableHead><TableHead>Status</TableHead><TableHead></TableHead></TableRow></TableHeader>
            <TableBody>{sampleProducts.map((product) => (
              <TableRow key={product.id}><TableCell><p className="font-medium">{product.name}</p></TableCell><TableCell className="font-mono text-sm text-muted-foreground">{product.sku}</TableCell><TableCell className="text-right text-sm">{product.available} {product.unit}</TableCell><TableCell><StatusBadge status={product.status} /></TableCell><TableCell><Link href={`/inventory/products/${product.id}`}><Button size="sm" variant="outline"><Package className="mr-1 h-3 w-3" />Oeffnen</Button></Link></TableCell></TableRow>
            ))}</TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="text-base">Bewegungen</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {locationMovements.length === 0 ? <p className="text-sm text-muted-foreground">Keine aktuellen Bewegungen.</p> : locationMovements.map((movement) => (
            <div key={movement.id} className="rounded-2xl bg-white p-3 shadow-[0_12px_30px_rgba(15,23,42,0.06)] ring-1 ring-black/[0.04]">
              <p className="font-medium">{movement.productName}</p>
              <p className="text-xs text-muted-foreground">{movement.quantity} · {formatDateTime(movement.createdAt)}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
