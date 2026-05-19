import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, ClipboardList, PackageCheck, Plus, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/inventory/shared/status-badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { projects, purchaseSuggestions, orders, alerts, formatCurrency, formatDate } from "@/lib/inventory/mock-data";

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects.find((item) => item.id === id);
  if (!project) notFound();

  const projectOrders = orders.filter((order) => order.projectId === project.id);
  const projectAlerts = alerts.filter((alert) => alert.projectId === project.id);
  const suggestedMaterial = purchaseSuggestions.slice(0, 4);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/inventory/projects" className="flex items-center gap-1 hover:text-foreground"><ArrowLeft className="h-3.5 w-3.5" />Projekte</Link>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <h1>{project.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{project.customer} · Start {formatDate(project.startDate)}</p>
          <div className="mt-3 flex gap-2">
            <StatusBadge status={project.status} />
            <StatusBadge status={project.materialStatus} />
          </div>
        </div>
        <div className="flex max-w-full gap-2 overflow-x-auto">
          <Button variant="outline" size="sm"><Calendar className="mr-1.5 h-3.5 w-3.5" />Termin planen</Button>
          <Button variant="outline" size="sm"><PackageCheck className="mr-1.5 h-3.5 w-3.5" />Material reservieren</Button>
          <Button size="sm"><Plus className="mr-1.5 h-3.5 w-3.5" />Position anlegen</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card><CardContent className="p-4"><p className="text-xs font-semibold uppercase text-slate-400">Fehlend</p><p className="mt-1 text-3xl font-semibold">{project.missingItems}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs font-semibold uppercase text-slate-400">Reserviert</p><p className="mt-1 text-3xl font-semibold">{project.reservedPositions}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs font-semibold uppercase text-slate-400">Bestellungen</p><p className="mt-1 text-3xl font-semibold">{project.openOrders}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs font-semibold uppercase text-slate-400">Leitung</p><p className="mt-2 flex items-center gap-2 text-sm font-medium"><User className="h-4 w-4 text-slate-400" />{project.projectManager || "-"}</p></CardContent></Card>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <Card>
          <CardHeader><CardTitle className="text-base">Materialplan</CardTitle><CardDescription className="text-xs">Relevante Positionen fuer dieses Projekt</CardDescription></CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader><TableRow><TableHead>Artikel</TableHead><TableHead>Ort</TableHead><TableHead className="text-right">Vorschlag</TableHead><TableHead>Status</TableHead><TableHead></TableHead></TableRow></TableHeader>
              <TableBody>
                {suggestedMaterial.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell><p className="font-medium">{item.productName}</p><p className="text-xs text-muted-foreground">{item.sku}</p></TableCell>
                    <TableCell className="text-sm text-muted-foreground">{item.locationName}</TableCell>
                    <TableCell className="text-right text-sm font-medium">{item.suggestedQty} {item.unit}</TableCell>
                    <TableCell><StatusBadge status={item.severity} /></TableCell>
                    <TableCell><Button size="sm" variant="outline">Reservieren</Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="space-y-5">
          <Card>
            <CardHeader><CardTitle className="text-base">Bestellungen</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {projectOrders.length === 0 ? <p className="text-sm text-muted-foreground">Keine offenen Bestellungen.</p> : projectOrders.map((order) => (
                <Link key={order.id} href={`/inventory/purchase-orders/${order.id}`} className="block rounded-2xl bg-white p-3 shadow-[0_12px_30px_rgba(15,23,42,0.06)] ring-1 ring-black/[0.04]">
                  <p className="font-medium">{order.orderNumber}</p>
                  <p className="text-xs text-muted-foreground">{order.supplierName} · {formatCurrency(order.totalValue)}</p>
                </Link>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base">Warnungen</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {projectAlerts.length === 0 ? <p className="text-sm text-muted-foreground">Keine Warnungen.</p> : projectAlerts.map((alert) => (
                <div key={alert.id} className="rounded-2xl bg-white p-3 shadow-[0_12px_30px_rgba(15,23,42,0.06)] ring-1 ring-black/[0.04]">
                  <p className="font-medium">{alert.title}</p>
                  <p className="text-xs text-muted-foreground">{alert.recommendedAction}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
