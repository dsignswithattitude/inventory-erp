import type { Metadata } from "next";
import "../globals.css";
import { InventoryNav } from "@/components/inventory/nav";
import { InventoryActionLayer } from "@/components/inventory/action-layer";

export const metadata: Metadata = {
  title: "Lager ERP - Materialleitstand",
  description: "Lagerverwaltung und Materialsteuerung",
};

export default function InventoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="min-h-screen bg-background antialiased">
        <div className="min-h-screen bg-[radial-gradient(circle_at_50%_-10%,rgba(255,255,255,0.95),rgba(238,241,244,0.72)_34rem),linear-gradient(135deg,#f5f7f9_0%,#e7ebef_100%)]">
          <InventoryNav />
          <main className="inventory-main min-w-0 p-4 md:p-6 lg:ml-[244px] lg:p-8">{children}</main>
          <InventoryActionLayer />
        </div>
      </body>
    </html>
  );
}
