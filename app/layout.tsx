import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lager ERP",
  description: "Lagerverwaltung und Materialsteuerung",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen bg-background antialiased">{children}</body>
    </html>
  );
}
