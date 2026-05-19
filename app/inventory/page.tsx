"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/inventory/shared/metric-card";
import { RiskCard } from "@/components/inventory/shared/risk-card";
import { StatusBadge } from "@/components/inventory/shared/status-badge";
import { dashboardKpis, dashboardRisks, projects, purchaseSuggestions, vehicles, movements, alerts, formatCurrency, formatDateTime } from "@/lib/inventory/mock-data";
import { Plus, ArrowRight, ArrowUpRight, TrendingUp, TrendingDown } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const stockByCategoryData = [
  { category: "Elektro", value: 45000 },
  { category: "HK/KL", value: 32000 },
  { category: "Sanitär", value: 28000 },
  { category: "PV", value: 65000 },
  { category: "Verbrauch", value: 15000 },
  { category: "Messtechnik", value: 8500 },
];

export default function DashboardPage() {
  const urgentSuggestions = purchaseSuggestions.filter(s => s.severity === "critical" || s.severity === "warning").slice(0, 4);
  const recentMovements = movements.slice(0, 6);
  const recentAlerts = alerts.filter(a => a.status === "open").slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Materialleitstand</h1>
          <p className="text-sm text-muted-foreground">Operativer Überblick für Lager, Einkauf und Projektleitung</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm"><Plus className="mr-1.5 h-3.5 w-3.5" />Artikel anlegen</Button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {dashboardKpis.map((kpi, i) => (
          <MetricCard key={i} label={kpi.label} value={kpi.value} status={kpi.status} href={kpi.href} />
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Risks */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Aktuelle Risiken</h2>
          </div>
          <div className="space-y-3">
            {dashboardRisks.map((risk) => <RiskCard key={risk.id} risk={risk} />)}
          </div>
        </div>

        {/* Bestellvorschläge & Projects */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Bestellvorschläge</CardTitle>
                  <CardDescription className="text-xs mt-0.5">Heute zu bestellen</CardDescription>
                </div>
                <a href="/inventory/purchase-suggestions"><Button variant="ghost" size="sm">Alle anzeigen <ArrowRight className="ml-1 h-3 w-3" /></Button></a>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {urgentSuggestions.map((s) => (
                <div key={s.id} className="flex items-center justify-between rounded-lg border p-3 hover:bg-slate-50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{s.productName}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{s.reason}</p>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <div className="text-right">
                      <p className="text-sm font-semibold">{s.suggestedQty} {s.unit}</p>
                      <p className="text-xs text-muted-foreground">{s.supplierName}</p>
                    </div>
                    <StatusBadge status={s.severity} />
                    <Button size="sm" variant="outline">Bestellen</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Projektmaterial</CardTitle>
                  <CardDescription className="text-xs mt-0.5">Materialstatus nach Projekt</CardDescription>
                </div>
                <a href="/inventory/projects"><Button variant="ghost" size="sm">Alle anzeigen <ArrowRight className="ml-1 h-3 w-3" /></Button></a>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {projects.slice(0, 5).map((prj) => (
                  <div key={prj.id} className="flex items-center justify-between rounded-lg border p-3 hover:bg-slate-50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{prj.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{prj.customer} • Start {prj.startDate}</p>
                    </div>
                    <div className="flex items-center gap-4 ml-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{prj.missingItems} fehlend</p>
                        <p className="text-xs text-muted-foreground">{prj.reservedPositions} reserviert</p>
                      </div>
                      <StatusBadge status={prj.materialStatus} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Fahrzeugstatus</CardTitle>
                <CardDescription className="text-xs mt-0.5">Standardbestände</CardDescription>
              </div>
              <a href="/inventory/vehicles"><Button variant="ghost" size="sm">Alle anzeigen <ArrowRight className="ml-1 h-3 w-3" /></Button></a>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {vehicles.map((v) => (
                <div key={v.id} className="flex items-center justify-between rounded-lg border p-3 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-slate-100 p-2">T</div>
                    <div>
                      <p className="text-sm font-medium">{v.name}</p>
                      <p className="text-xs text-muted-foreground">{v.licensePlate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-semibold">{v.completeness}%</p>
                      <p className="text-xs text-muted-foreground">{v.missingItems} fehlend{v.criticalItems > 0 && `, ${v.criticalItems} kritisch`}</p>
                    </div>
                    <StatusBadge status={v.status} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div>
              <CardTitle className="text-base">Bestandswert nach Kategorie</CardTitle>
              <CardDescription className="text-xs mt-0.5">Verteilung des Lagerbestands</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stockByCategoryData} layout="vertical" margin={{ left: 20, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                  <XAxis type="number" tickFormatter={(v) => `€${(v/1000).toFixed(0)}k`} tick={{ fontSize: 11 }} stroke="#94a3b8" />
                  <YAxis dataKey="category" type="category" width={80} tick={{ fontSize: 11 }} stroke="#94a3b8" />
                  <Tooltip formatter={(value) => formatCurrency(value as number)} contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }} />
                  <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Third Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <div>
              <CardTitle className="text-base">Letzte Bewegungen</CardTitle>
              <CardDescription className="text-xs mt-0.5">Aktuelle Lagerbewegungen</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentMovements.map((m) => (
                <div key={m.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-3">
                    <div className={`rounded-full p-1.5 ${m.type === "in" ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"}`}>
                      {m.type === "in" ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{m.productName}</p>
                      <p className="text-xs text-muted-foreground">{m.type === "in" ? `Nach ${m.toLocationName}` : `Nach ${m.toLocationName}`}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{m.type === "in" ? "+" : "-"}{m.quantity}</p>
                    <p className="text-xs text-muted-foreground">{formatDateTime(m.createdAt)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Letzte Warnungen</CardTitle>
                <CardDescription className="text-xs mt-0.5">Offene Warnungen und Alarme</CardDescription>
              </div>
              <a href="/inventory/alerts"><Button variant="ghost" size="sm">Alle anzeigen <ArrowRight className="ml-1 h-3 w-3" /></Button></a>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between rounded-lg border p-3 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`rounded-full p-1.5 ${alert.severity === "critical" ? "bg-red-100 text-red-600" : alert.severity === "warning" ? "bg-amber-100 text-amber-600" : "bg-blue-100 text-blue-600"}`}>!</div>
                    <div>
                      <p className="text-sm font-medium">{alert.title}</p>
                      <p className="text-xs text-muted-foreground">{alert.productName || alert.projectName || alert.vehicleName || alert.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={alert.severity} />
                    <Button size="sm" variant="outline">{alert.type === "stock" ? "Bestellen" : alert.type === "project" ? "Prüfen" : alert.type === "vehicle" ? "Auffüllen" : "Ansehen"}</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
