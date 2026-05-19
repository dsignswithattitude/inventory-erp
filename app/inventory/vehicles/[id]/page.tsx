"use client";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/inventory/shared/status-badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { ArrowLeft, QrCode, PlusCircle, CheckCircle, Printer } from "lucide-react";
import { vehicles, formatDate } from "@/lib/inventory/mock-data";

export default async function VehicleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const vehicle = vehicles.find((v) => v.id === resolvedParams.id);
  if (!vehicle) notFound();

  const stockItems = [
    { productName: "Kabel 5x2,5mm² NYY-J", sku: "EL-KAB-5X25", target: 50, actual: 42, unit: "m", status: "low" as const },
    { productName: "Sicherung 16A C-Char.", sku: "EL-SICH-16C", target: 30, actual: 0, unit: "Stück", status: "critical" as const },
    { productName: "Schraubenset M8 verz.", sku: "VW-SCHRA-M8", target: 2, actual: 2, unit: "Satz", status: "ok" as const },
    { productName: "LS-Schalter B16 3pol.", sku: "EL-LS-B16-3", target: 10, actual: 7, unit: "Stück", status: "low" as const },
    { productName: "Pressfitting 22mm Kupfer", sku: "SAN-PRES-22", target: 20, actual: 18, unit: "Stück", status: "ok" as const },
    { productName: "Reinigungsmittel 5L", sku: "SAN-REIN-5L", target: 2, actual: 1, unit: "Kanister", status: "low" as const },
  ];

  const missingItems = stockItems.filter((i) => i.actual < i.target);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/inventory/vehicles" className="hover:text-foreground flex items-center gap-1"><ArrowLeft className="h-3.5 w-3.5" />Fahrzeuge</Link>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="h-14 w-14 rounded-lg bg-slate-100 flex items-center justify-center">T</div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{vehicle.name}</h1>
            <p className="text-sm text-muted-foreground mt-1 font-mono">{vehicle.licensePlate}</p>
            <div className="mt-2 flex items-center gap-4 text-sm">
              <span className="text-muted-foreground">{vehicle.responsiblePerson}</span>
              <span className="text-muted-foreground">{vehicle.locationName}</span>
            </div>
            <div className="mt-2"><StatusBadge status={vehicle.status} /></div>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" size="sm"><QrCode className="mr-1.5 h-3.5 w-3.5" />QR-Code</Button>
          <Button variant="outline" size="sm"><Printer className="mr-1.5 h-3.5 w-3.5" />Auffüllliste drucken</Button>
          <Button variant="outline" size="sm"><CheckCircle className="mr-1.5 h-3.5 w-3.5" />Inventur</Button>
          <Button size="sm"><PlusCircle className="mr-1.5 h-3.5 w-3.5" />Auffüllen</Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card><CardContent className="p-4 text-center">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Vollständigkeit</p>
          <p className={`mt-1 text-3xl font-bold ${vehicle.completeness < 80 ? "text-red-600" : vehicle.completeness < 95 ? "text-amber-600" : "text-green-600"}`}>{vehicle.completeness}%</p>
        </CardContent></Card>
        <Card><CardContent className="p-4 text-center">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Fehlende Artikel</p>
          <p className={`mt-1 text-3xl font-bold ${vehicle.missingItems > 0 ? "text-amber-600" : "text-green-600"}`}>{vehicle.missingItems}</p>
        </CardContent></Card>
        <Card><CardContent className="p-4 text-center">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Kritische Artikel</p>
          <p className={`mt-1 text-3xl font-bold ${vehicle.criticalItems > 0 ? "text-red-600" : "text-green-600"}`}>{vehicle.criticalItems}</p>
        </CardContent></Card>
        <Card><CardContent className="p-4 text-center">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Letzte Prüfung</p>
          <p className="mt-1 text-lg font-semibold">{vehicle.lastCheckAt ? formatDate(vehicle.lastCheckAt) : "Nie"}</p>
        </CardContent></Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div><CardTitle className="text-base">Fahrzeugbestand</CardTitle><p className="text-xs mt-0.5 text-muted-foreground">Soll vs. Ist Bestand</p></div>
            {missingItems.length > 0 && <Button size="sm" variant="outline"><PlusCircle className="mr-1.5 h-3.5 w-3.5" />Alle auffüllen ({missingItems.length})</Button>}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader><TableRow className="hover:bg-transparent">
              <TableHead>Artikel</TableHead><TableHead>SKU</TableHead>
              <TableHead className="text-right">Soll</TableHead><TableHead className="text-right">Ist</TableHead>
              <TableHead className="text-right">Fehlend</TableHead><TableHead>Status</TableHead><TableHead className="w-[100px]"></TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {stockItems.map((item, i) => (
                <TableRow key={i}>
                  <TableCell><p className="font-medium text-sm">{item.productName}</p></TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">{item.sku}</TableCell>
                  <TableCell className="text-right text-sm">{item.target} {item.unit}</TableCell>
                  <TableCell className="text-right"><span className={`font-semibold text-sm ${item.actual < item.target ? "text-red-600" : "text-green-600"}`}>{item.actual} {item.unit}</span></TableCell>
                  <TableCell className="text-right">{item.actual < item.target ? <span className="font-semibold text-sm text-red-600">{item.target - item.actual} {item.unit}</span> : <span className="text-sm text-muted-foreground">-</span>}</TableCell>
                  <TableCell><StatusBadge status={item.status} /></TableCell>
                  <TableCell>{item.actual < item.target && <Button size="sm" variant="outline" className="h-7 text-xs"><PlusCircle className="mr-1 h-3 w-3" />Auffüllen</Button>}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
