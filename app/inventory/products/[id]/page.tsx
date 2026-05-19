"use client";
import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { StatusBadge } from "@/components/inventory/shared/status-badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { ArrowLeft, Edit, MapPin, ArrowRightLeft, ShoppingCart, QrCode, TrendingUp, TrendingDown } from "lucide-react";
import { products, locations, movements, formatCurrency, formatNumber, formatDateTime } from "@/lib/inventory/mock-data";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = products.find((p) => p.id === resolvedParams.id);
  if (!product) notFound();

  const stockAtLocations = locations.map((loc, i) => ({
    ...loc,
    stock: [85, 42, 28, 15, 5][i % 5],
    available: [70, 35, 22, 10, 5][i % 5],
    reserved: [15, 7, 6, 5, 0][i % 5],
  })).filter((l) => l.stock > 0);

  const productMovements = movements.filter((m) => m.productId === product.id);
  const totalStockValue = product.totalStock * (product.price || 0);
  const daysOfSupply = product.consumptionPerDay ? Math.floor(product.available / product.consumptionPerDay) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/inventory/products" className="hover:text-foreground flex items-center gap-1"><ArrowLeft className="h-3.5 w-3.5" />Artikel</Link>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="h-14 w-14 rounded-lg bg-slate-100 flex items-center justify-center">A</div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{product.name}</h1>
            <div className="mt-1.5 flex items-center gap-3 text-sm text-muted-foreground">
              <span className="font-mono">{product.sku}</span><span>•</span><span>{product.category}</span><span>•</span><span>Einheit: {product.unit}</span>
            </div>
            <div className="mt-2"><StatusBadge status={product.status} /></div>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" size="sm"><QrCode className="mr-1.5 h-3.5 w-3.5" />QR-Code</Button>
          <Button variant="outline" size="sm"><ShoppingCart className="mr-1.5 h-3.5 w-3.5" />Bestellvorschlag</Button>
          <Button variant="outline" size="sm"><ArrowRightLeft className="mr-1.5 h-3.5 w-3.5" />Umbuchen</Button>
          <Button size="sm"><Edit className="mr-1.5 h-3.5 w-3.5" />Bearbeiten</Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card><CardContent className="p-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Gesamtbestand</p>
          <p className="mt-1 text-2xl font-bold">{formatNumber(product.totalStock)} {product.unit}</p>
        </CardContent></Card>
        <Card><CardContent className="p-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Verfügbar</p>
          <p className={`mt-1 text-2xl font-bold ${product.available < product.minStock ? "text-red-600" : ""}`}>{formatNumber(product.available)} {product.unit}</p>
        </CardContent></Card>
        <Card><CardContent className="p-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Bestandswert</p>
          <p className="mt-1 text-2xl font-bold">{formatCurrency(totalStockValue)}</p>
        </CardContent></Card>
        <Card><CardContent className="p-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Reichweite</p>
          <p className={`mt-1 text-2xl font-bold ${daysOfSupply !== null && daysOfSupply < 7 ? "text-red-600" : ""}`}>{daysOfSupply !== null ? `${daysOfSupply} Tage` : "N/A"}</p>
        </CardContent></Card>
      </div>

      <Tabs defaultValue="stock" value="stock" onValueChange={() => {}}>
        <TabsList>
          <TabsTrigger value="stock">Bestand nach Ort</TabsTrigger>
          <TabsTrigger value="movements">Bewegungen</TabsTrigger>
          <TabsTrigger value="suppliers">Lieferanten</TabsTrigger>
        </TabsList>

        <TabsContent value="stock">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div><CardTitle className="text-base">Bestand nach Ort</CardTitle><CardDescription className="text-xs mt-0.5">Verfügbarkeit an jedem Lagerort</CardDescription></div>
                <Button variant="outline" size="sm"><ArrowRightLeft className="mr-1.5 h-3.5 w-3.5" />Umbuchen</Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader><TableRow className="hover:bg-transparent">
                  <TableHead>Ort</TableHead><TableHead>Typ</TableHead>
                  <TableHead className="text-right">Bestand</TableHead><TableHead className="text-right">Reserviert</TableHead>
                  <TableHead className="text-right">Verfügbar</TableHead><TableHead className="text-right">Min.</TableHead>
                  <TableHead>Status</TableHead><TableHead className="w-[80px]"></TableHead>
                </TableRow></TableHeader>
                <TableBody>
                  {stockAtLocations.map((loc) => {
                    const status = (loc.available ?? 0) < (loc.minStock ?? 0) ? "low" : "ok";
                    return (
                      <TableRow key={loc.id}>
                        <TableCell><div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-slate-400" /><span className="font-medium text-sm">{loc.name}</span></div></TableCell>
                        <TableCell className="text-sm text-muted-foreground capitalize">{loc.type}</TableCell>
                        <TableCell className="text-right font-medium text-sm">{formatNumber(loc.stock ?? 0)}</TableCell>
                        <TableCell className="text-right text-sm text-muted-foreground">{loc.reserved > 0 ? formatNumber(loc.reserved ?? 0) : "-"}</TableCell>
                        <TableCell className="text-right text-sm"><span className={status === "low" ? "text-red-600 font-medium" : ""}>{formatNumber(loc.available ?? 0)}</span></TableCell>
                        <TableCell className="text-right text-sm text-muted-foreground">{formatNumber(loc.minStock ?? 20)}</TableCell>
                        <TableCell><StatusBadge status={status} /></TableCell>
                        <TableCell><Button size="sm" variant="ghost" className="h-7 text-xs">Buchen</Button></TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="movements">
          <Card>
            <CardHeader><CardTitle className="text-base">Lagerbewegungen</CardTitle></CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader><TableRow className="hover:bg-transparent">
                  <TableHead>Datum</TableHead><TableHead>Typ</TableHead><TableHead>Menge</TableHead>
                  <TableHead>Von</TableHead><TableHead>Nach</TableHead><TableHead>Referenz</TableHead>
                </TableRow></TableHeader>
                <TableBody>
                  {productMovements.length === 0 ? (
                    <TableRow><TableCell colSpan={6} className="text-center py-8 text-sm text-muted-foreground">Keine Bewegungen vorhanden</TableCell></TableRow>
                  ) : productMovements.map((m) => (
                    <TableRow key={m.id}>
                      <TableCell className="text-sm">{formatDateTime(m.createdAt)}</TableCell>
                      <TableCell><div className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${m.type === "in" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                        {m.type === "in" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {m.type === "in" ? "Wareneingang" : "Ausgabe"}
                      </div></TableCell>
                      <TableCell className="font-medium text-sm">{m.type === "in" ? "+" : "-"}{m.quantity}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{m.fromLocationName || "-"}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{m.toLocationName || "-"}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{m.referenceType ? `${m.referenceType}: ${m.referenceId}` : "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suppliers">
          <Card>
            <CardHeader><CardTitle className="text-base">Lieferanten</CardTitle></CardHeader>
            <CardContent>
              {product.supplierName ? (
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <p className="font-medium">{product.supplierName}</p>
                    <p className="text-sm text-muted-foreground mt-1">Hauptlieferant</p>
                    <p className="text-sm text-muted-foreground">Lieferzeit: {product.leadTimeDays} Tage</p>
                  </div>
                  <Button size="sm" variant="outline"><ShoppingCart className="mr-1.5 h-3.5 w-3.5" />Bestellen</Button>
                </div>
              ) : <p className="text-sm text-muted-foreground">Kein Lieferant zugewiesen</p>}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
