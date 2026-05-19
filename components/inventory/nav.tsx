"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, Truck, FolderKanban, ShoppingCart, AlertTriangle, Scan, Box, Wrench, MapPin, BarChart3, Settings, Search, HelpCircle } from "lucide-react";

const navItems = [
  { href: "/inventory", label: "Leitstand", icon: BarChart3 },
  { href: "/inventory/products", label: "Artikel", icon: Package },
  { href: "/inventory/locations", label: "Orte", icon: MapPin },
  { href: "/inventory/vehicles", label: "Fahrzeuge", icon: Truck },
  { href: "/inventory/projects", label: "Projekte", icon: FolderKanban },
  { href: "/inventory/purchase-suggestions", label: "Bestellvorschläge", icon: ShoppingCart },
  { href: "/inventory/purchase-orders", label: "Bestellungen", icon: ShoppingCart },
  { href: "/inventory/scan", label: "Scan", icon: Scan },
  { href: "/inventory/kits", label: "Serviceboxen", icon: Box },
  { href: "/inventory/equipment", label: "Prüfmittel", icon: Wrench },
  { href: "/inventory/alerts", label: "Warnungen", icon: AlertTriangle },
  { href: "/inventory/settings", label: "Einstellungen", icon: Settings },
];

export function InventoryNav() {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:flex fixed inset-y-10 left-10 z-50 w-[204px] flex-col rounded-[22px] bg-[#f7f8fb]/95 shadow-[0_28px_90px_rgba(15,23,42,0.12),inset_0_0_0_1px_rgba(255,255,255,0.82)] ring-1 ring-black/[0.035] backdrop-blur">
      <div className="flex items-center gap-3 px-4 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white shadow-[0_12px_24px_rgba(37,99,235,0.26)]">
          <Package className="h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-semibold leading-tight">Lager ERP</p>
          <p className="text-[11px] text-muted-foreground">Materialsteuerung</p>
        </div>
      </div>
      <div className="mx-3 mb-3 flex h-8 items-center gap-2 rounded-xl bg-white px-3 text-[11px] text-slate-500 shadow-[0_12px_28px_rgba(15,23,42,0.06)] ring-1 ring-black/[0.04]">
        <Search className="h-3.5 w-3.5" />
        <span>Suchen</span>
        <kbd className="ml-auto rounded bg-slate-50 px-1.5 py-0.5 text-[9px] text-slate-400">/</kbd>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-1">
        <p className="px-2 pb-2 text-[10px] font-medium uppercase text-slate-400">Module</p>
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/inventory" && pathname.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href}>
              <div className={`mb-1 flex items-center gap-2 rounded-xl px-3 py-2 text-xs transition-colors ${isActive ? "bg-white text-blue-700 shadow-[0_12px_28px_rgba(15,23,42,0.06)] ring-1 ring-black/[0.035]" : "text-slate-600 hover:bg-white/70 hover:text-foreground"}`}>
                <item.icon className="h-3.5 w-3.5 flex-shrink-0" />
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>
      <div className="px-4 py-4">
        <div className="mb-3 flex items-center gap-2 text-xs text-slate-600">
          <Settings className="h-3.5 w-3.5" />
          Einstellungen
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <HelpCircle className="h-3.5 w-3.5" />
          Hilfe
        </div>
        <div className="mt-4 rounded-2xl bg-white px-3 py-3 shadow-[0_14px_35px_rgba(15,23,42,0.06)] ring-1 ring-black/[0.035]">
          <p className="text-xs font-medium text-foreground">Service GmbH</p>
          <p className="text-[11px] text-muted-foreground">Lager Hamburg</p>
        </div>
      </div>
    </aside>
  );
}
