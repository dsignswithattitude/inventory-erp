"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Search, Camera, Package, Keyboard, QrCode } from "lucide-react";

export default function ScanPage() {
  const [scanResult, setScanResult] = useState("");
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold tracking-tight">Scan</h1><p className="text-sm text-muted-foreground">Artikel scannen, buchen und suchen</p></div>
      <Card>
        <CardHeader><CardTitle className="text-base">Scanner</CardTitle><CardDescription className="text-xs mt-0.5">Halten Sie ein Gerät an den Barcode oder QR-Code</CardDescription></CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center justify-center rounded-xl bg-white shadow-[inset_0_0_0_1px_rgba(15,23,42,0.06),0_18px_50px_rgba(15,23,42,0.06)] p-12 text-center">
            <div className="rounded-full bg-slate-100 p-4"><Camera className="h-10 w-10 text-slate-500" /></div>
            <p className="mt-4 text-sm font-medium">Kamera bereit</p>
            <p className="mt-1 text-xs text-muted-foreground">Scannen Sie einen Barcode oder QR-Code</p>
            <div className="mt-6 flex max-w-full gap-3 overflow-x-auto">
              <Button variant="outline" size="sm"><QrCode className="mr-1.5 h-3.5 w-3.5" />QR-Code scannen</Button>
              <Button variant="outline" size="sm"><Keyboard className="mr-1.5 h-3.5 w-3.5" />SKU manuell eingeben</Button>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-1"><Input placeholder="SKU oder Barcode eingeben..." value={scanResult} onChange={(e) => setScanResult(e.target.value)} className="font-mono" /></div>
            <Button size="lg"><Search className="mr-2 h-4 w-4" />Suchen</Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="text-base">Letzte Scans</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader><TableRow className="hover:bg-transparent"><TableHead>Zeit</TableHead><TableHead>SKU / Barcode</TableHead><TableHead>Artikel</TableHead><TableHead>Aktion</TableHead></TableRow></TableHeader>
            <TableBody>
              <TableRow><TableCell className="text-sm text-muted-foreground">Heute 14:32</TableCell><TableCell className="font-mono text-sm">EL-KAB-5X25</TableCell><TableCell className="text-sm font-medium">Kabel 5x2,5mm² NYY-J</TableCell><TableCell className="text-sm text-muted-foreground">Wareneingang +50m</TableCell></TableRow>
              <TableRow><TableCell className="text-sm text-muted-foreground">Heute 11:15</TableCell><TableCell className="font-mono text-sm">EL-SICH-16C</TableCell><TableCell className="text-sm font-medium">Sicherung 16A C-Char.</TableCell><TableCell className="text-sm text-muted-foreground">Ausgabe an VK-100</TableCell></TableRow>
              <TableRow><TableCell className="text-sm text-muted-foreground">Gestern 16:45</TableCell><TableCell className="font-mono text-sm">HK-FILTER-200</TableCell><TableCell className="text-sm font-medium">Filterset WP-200</TableCell><TableCell className="text-sm text-muted-foreground">Bestand geprüft</TableCell></TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="text-base">Schnellbuchungen</CardTitle><CardDescription className="text-xs mt-0.5">Häufige Buchungstypen</CardDescription></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[{ label: "Wareneingang", color: "bg-green-100 text-green-700" },{ label: "Ausgabe", color: "bg-blue-100 text-blue-700" },{ label: "Umbuchung", color: "bg-purple-100 text-purple-700" },{ label: "Inventur", color: "bg-amber-100 text-amber-700" }].map((a) => (
              <button key={a.label} className="flex flex-col items-center gap-2 rounded-2xl bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.06)] ring-1 ring-black/[0.04] hover:bg-slate-50 transition-colors">
                <div className={`rounded-full p-2.5 ${a.color}`}><Package className="h-5 w-5" /></div>
                <span className="text-xs font-medium">{a.label}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
