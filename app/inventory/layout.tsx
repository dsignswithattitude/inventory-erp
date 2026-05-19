import type { Metadata } from "next";
import "../globals.css";
import { InventoryNav } from "@/components/inventory/nav";

export const metadata: Metadata = {
  title: "Lager ERP - Materialleitstand",
  description: "Lagerverwaltung und Materialsteuerung",
};

export default function InventoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="min-h-screen bg-background antialiased">
        <div className="flex min-h-screen">
          <InventoryNav />
          <main className="flex-1 p-6 lg:ml-64">{children}</main>
        </div>
      </body>
    </html>
  );
}
