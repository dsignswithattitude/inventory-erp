"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/inventory/shared/metric-card";
import { RiskCard } from "@/components/inventory/shared/risk-card";
import { StatusBadge } from "@/components/inventory/shared/status-badge";
import {
  alerts,
  dashboardKpis,
  dashboardRisks,
  formatCurrency,
  formatDateTime,
  movements,
  projects,
  purchaseSuggestions,
  vehicles,
} from "@/lib/inventory/mock-data";
import {
  ArrowRight,
  Bell,
  Package,
  Plus,
  Search,
  SlidersHorizontal,
  TrendingDown,
  TrendingUp,
  Truck,
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const stockByCategoryData = [
  { category: "Elektro", value: 45000 },
  { category: "HK/KL", value: 32000 },
  { category: "Sanitaer", value: 28000 },
  { category: "PV", value: 65000 },
  { category: "Verbrauch", value: 15000 },
  { category: "Messtechnik", value: 8500 },
];

export default function DashboardPage() {
  const urgentSuggestions = purchaseSuggestions
    .filter((item) => item.severity === "critical" || item.severity === "warning")
    .slice(0, 4);
  const recentMovements = movements.slice(0, 6);
  const recentAlerts = alerts.filter((alert) => alert.status === "open").slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase text-slate-400">Materialsteuerung</p>
          <h1>Leitstand</h1>
          <p className="text-sm text-muted-foreground">Operativer Ueberblick fuer Lager, Einkauf und Projektleitung</p>
        </div>
        <div className="grid w-full grid-cols-1 gap-2 md:w-auto md:grid-cols-[340px_auto_auto] md:items-center">
          <div className="flex h-10 min-w-0 items-center gap-2 rounded-xl bg-white px-3 text-sm text-slate-400 shadow-[0_10px_24px_rgba(15,23,42,0.05)] ring-1 ring-black/[0.05]">
            <Search className="h-4 w-4" />
            <span className="truncate">Artikel, Projekt oder Fahrzeug suchen</span>
            <kbd className="ml-auto rounded-lg bg-slate-50 px-1.5 py-0.5 text-[10px] text-slate-400">/</kbd>
          </div>
          <Button size="sm" variant="outline">
            <SlidersHorizontal className="mr-1.5 h-3.5 w-3.5" />
            Filter
          </Button>
          <Button size="sm">
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Artikel
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {dashboardKpis.map((kpi) => (
          <MetricCard key={kpi.label} label={kpi.label} value={kpi.value} status={kpi.status} href={kpi.href} />
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[360px_minmax(0,1fr)]">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Aktuelle Risiken</CardTitle>
                <CardDescription className="text-xs">Heute priorisieren</CardDescription>
              </div>
              <span className="rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-medium text-red-700">
                {dashboardRisks.length} offen
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {dashboardRisks.map((risk) => (
              <RiskCard key={risk.id} risk={risk} />
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Bestellvorschlaege</CardTitle>
                <CardDescription className="text-xs">Material mit Handlungsbedarf</CardDescription>
              </div>
              <a href="/inventory/purchase-suggestions">
                <Button variant="ghost" size="sm">
                  Alle <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </a>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {urgentSuggestions.map((item) => (
                <div key={item.id} className="grid gap-3 px-6 py-4 transition-colors hover:bg-slate-50/70 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-900">{item.productName}</p>
                    <p className="mt-1 line-clamp-1 text-xs text-slate-500">{item.reason}</p>
                  </div>
                  <div className="flex items-center gap-3 overflow-x-auto md:justify-end">
                    <div className="text-left sm:text-right">
                      <p className="text-sm font-semibold">{item.suggestedQty} {item.unit}</p>
                      <p className="text-xs text-muted-foreground">{item.supplierName}</p>
                    </div>
                    <StatusBadge status={item.severity} />
                    <Button size="sm" variant="outline">Bestellen</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Projektmaterial</CardTitle>
                <CardDescription className="text-xs">Status nach Projekt</CardDescription>
              </div>
              <a href="/inventory/projects">
                <Button variant="ghost" size="sm">
                  Alle <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </a>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {projects.slice(0, 5).map((project) => (
                <div key={project.id} className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-slate-50/70">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-900">{project.name}</p>
                    <p className="mt-1 text-xs text-slate-500">{project.customer} · Start {project.startDate}</p>
                  </div>
                  <div className="flex flex-shrink-0 items-center gap-3">
                    <div className="hidden text-right sm:block">
                      <p className="text-sm font-medium">{project.missingItems} fehlend</p>
                      <p className="text-xs text-muted-foreground">{project.reservedPositions} reserviert</p>
                    </div>
                    <StatusBadge status={project.materialStatus} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Fahrzeugstatus</CardTitle>
                <CardDescription className="text-xs">Standardbestaende</CardDescription>
              </div>
              <a href="/inventory/vehicles">
                <Button variant="ghost" size="sm">
                  Alle <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </a>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {vehicles.map((vehicle) => (
                <div key={vehicle.id} className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-slate-50/70">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white text-xs font-semibold shadow-[0_10px_24px_rgba(15,23,42,0.06)] ring-1 ring-black/[0.04]">
                      T
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-slate-900">{vehicle.name}</p>
                      <p className="text-xs text-muted-foreground">{vehicle.licensePlate}</p>
                    </div>
                  </div>
                  <div className="flex flex-shrink-0 items-center gap-3">
                    <div className="hidden text-right sm:block">
                      <p className="text-sm font-semibold">{vehicle.completeness}%</p>
                      <p className="text-xs text-muted-foreground">{vehicle.missingItems} fehlend</p>
                    </div>
                    <StatusBadge status={vehicle.status} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_420px]">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Letzte Bewegungen</CardTitle>
            <CardDescription className="text-xs">Aktuelle Lagerbewegungen</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {recentMovements.map((movement) => (
                <div key={movement.id} className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-slate-50/70">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ${movement.type === "in" ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"}`}>
                      {movement.type === "in" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{movement.productName}</p>
                      <p className="text-xs text-muted-foreground">Nach {movement.toLocationName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{movement.type === "in" ? "+" : "-"}{movement.quantity}</p>
                    <p className="text-xs text-muted-foreground">{formatDateTime(movement.createdAt)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Bestandswert</CardTitle>
            <CardDescription className="text-xs">Nach Kategorie</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stockByCategoryData} layout="vertical" margin={{ left: 8, right: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                  <XAxis type="number" tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`} tick={{ fontSize: 11 }} stroke="#9ca3af" />
                  <YAxis dataKey="category" type="category" width={82} tick={{ fontSize: 11 }} stroke="#9ca3af" />
                  <Tooltip formatter={(value) => formatCurrency(value as number)} contentStyle={{ fontSize: 12, borderRadius: 12, border: "0", boxShadow: "0 18px 45px rgba(15,23,42,0.12)" }} />
                  <Bar dataKey="value" fill="#2563eb" radius={[0, 8, 8, 0]} barSize={18} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Letzte Warnungen</CardTitle>
              <CardDescription className="text-xs">Offene Warnungen und Alarme</CardDescription>
            </div>
            <a href="/inventory/alerts">
              <Button variant="ghost" size="sm">
                Alle <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </a>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="grid gap-3 px-6 py-4 hover:bg-slate-50/70 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
                <div className="flex min-w-0 items-center gap-3">
                  <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-xs font-semibold ${alert.severity === "critical" ? "bg-red-50 text-red-600" : alert.severity === "warning" ? "bg-amber-50 text-amber-600" : "bg-blue-50 text-blue-600"}`}>
                    <Bell className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-900">{alert.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{alert.productName || alert.projectName || alert.vehicleName || alert.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:justify-end">
                  <StatusBadge status={alert.severity} />
                  <Button size="sm" variant="outline">
                    {alert.type === "stock" ? "Bestellen" : alert.type === "project" ? "Pruefen" : alert.type === "vehicle" ? "Auffuellen" : "Ansehen"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
