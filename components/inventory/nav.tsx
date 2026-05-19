"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, Truck, FolderKanban, ShoppingCart, AlertTriangle, Scan, Box, Wrench, MapPin, BarChart3, Settings, ClipboardList } from "lucide-react";

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
    <aside className="hidden lg:flex flex-col w-64 border-r bg-card fixed inset-y-0 left-0 z-50">
      <div className="flex items-center gap-2.5 px-4 py-4 border-b">
        <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
          <Package className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="font-semibold text-sm">Lager ERP</p>
          <p className="text-xs text-muted-foreground">Materialleitstand</p>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-0.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/inventory" && pathname.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href}>
              <div className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${isActive ? "bg-blue-50 text-blue-700 font-medium" : "text-muted-foreground hover:bg-slate-100 hover:text-foreground"}`}>
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>
      <div className="border-t px-4 py-3">
        <p className="text-xs text-muted-foreground">Service GmbH</p>
        <p className="text-xs text-muted-foreground">Lager Hamburg</p>
      </div>
    </aside>
  );
}
