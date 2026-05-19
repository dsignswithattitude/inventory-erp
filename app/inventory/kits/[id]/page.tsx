import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle, Plus, QrCode } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/inventory/shared/status-badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { kits, formatDate } from "@/lib/inventory/mock-data";

export default async function KitDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const kit = kits.find((item) => item.id === id);
  if (!kit) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/inventory/kits" className="flex items-center gap-1 hover:text-foreground"><ArrowLeft className="h-3.5 w-3.5" />Serviceboxen</Link>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div><h1>{kit.name}</h1><p className="mt-1 text-sm text-muted-foreground">{kit.type} · {kit.vehicleName || "Ohne Fahrzeug"}</p><div className="mt-3"><StatusBadge status={kit.status} /></div></div>
        <div className="flex max-w-full gap-2 overflow-x-auto"><Button variant="outline" size="sm"><QrCode className="mr-1.5 h-3.5 w-3.5" />QR-Code</Button><Button variant="outline" size="sm"><CheckCircle className="mr-1.5 h-3.5 w-3.5" />Pruefen</Button><Button size="sm"><Plus className="mr-1.5 h-3.5 w-3.5" />Auffuellen</Button></div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card><CardContent className="p-4"><p className="text-xs font-semibold uppercase text-slate-400">Vollstaendigkeit</p><p className="mt-1 text-3xl font-semibold">{kit.completeness}%</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs font-semibold uppercase text-slate-400">Fehlend</p><p className="mt-1 text-3xl font-semibold">{kit.missingItems}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs font-semibold uppercase text-slate-400">Letzte Pruefung</p><p className="mt-2 text-sm font-medium">{kit.lastCheckAt ? formatDate(kit.lastCheckAt) : "-"}</p></CardContent></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="text-base">Inhalt</CardTitle><CardDescription className="text-xs">Soll-Ist-Abgleich der Servicebox</CardDescription></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader><TableRow><TableHead>Artikel</TableHead><TableHead>SKU</TableHead><TableHead className="text-right">Soll</TableHead><TableHead className="text-right">Ist</TableHead><TableHead>Status</TableHead><TableHead></TableHead></TableRow></TableHeader>
            <TableBody>{kit.items.map((item) => (
              <TableRow key={item.productId}><TableCell><p className="font-medium">{item.productName}</p></TableCell><TableCell className="font-mono text-sm text-muted-foreground">{item.sku}</TableCell><TableCell className="text-right text-sm">{item.targetQty} {item.unit}</TableCell><TableCell className="text-right text-sm">{item.actualQty} {item.unit}</TableCell><TableCell><StatusBadge status={item.status} /></TableCell><TableCell><Button size="sm" variant="outline">Buchen</Button></TableCell></TableRow>
            ))}</TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
