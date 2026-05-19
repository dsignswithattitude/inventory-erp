"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold tracking-tight">Einstellungen</h1><p className="text-sm text-muted-foreground">Systemkonfiguration und Benutzerverwaltung</p></div>
      <Card>
        <CardHeader><CardTitle className="text-base">Allgemein</CardTitle><CardDescription className="text-xs mt-0.5">Grundeinstellungen des Systems</CardDescription></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className="text-sm font-medium mb-1.5 block">Firmenname</label><Input defaultValue="Service GmbH" /></div>
            <div><label className="text-sm font-medium mb-1.5 block">Standard-Lagerort</label><Select options={[{ value: "l1", label: "Zentrallager Hamburg" }, { value: "l2", label: "Lager Berlin" }]} value="l1" onChange={() => {}} /></div>
            <div><label className="text-sm font-medium mb-1.5 block">Währung</label><Select options={[{ value: "EUR", label: "EUR - Euro" }]} value="EUR" onChange={() => {}} /></div>
            <div><label className="text-sm font-medium mb-1.5 block">Datumsformat</label><Select options={[{ value: "dd.mm.yyyy", label: "DD.MM.YYYY" }]} value="dd.mm.yyyy" onChange={() => {}} /></div>
          </div>
          <div className="flex justify-end"><Button size="sm">Speichern</Button></div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="text-base">Bestandsschwellen</CardTitle><CardDescription className="text-xs mt-0.5">Globale Schwellenwerte für Bestandswarnungen</CardDescription></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div><label className="text-sm font-medium mb-1.5 block">Kritische Schwelle (Tage)</label><Input type="number" defaultValue="7" /></div>
            <div><label className="text-sm font-medium mb-1.5 block">Warn-Schwelle (Tage)</label><Input type="number" defaultValue="14" /></div>
            <div><label className="text-sm font-medium mb-1.5 block">Standardlieferzeit (Tage)</label><Input type="number" defaultValue="7" /></div>
          </div>
          <div className="flex justify-end"><Button size="sm">Speichern</Button></div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="text-base">Benachrichtigungen</CardTitle><CardDescription className="text-xs mt-0.5">E-Mail und Push-Benachrichtigungen konfigurieren</CardDescription></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[{ label: "Kritische Bestandswarnungen", desc: "E-Mail bei kritischen Artikeln", enabled: true }, { label: "Bestellung überfällig", desc: "E-Mail bei überfälligen Lieferungen", enabled: true }, { label: "Fahrzeug unvollständig", desc: "Push bei fehlenden Artikeln", enabled: false }, { label: "Prüfmittel fällig", desc: "E-Mail 7 Tage vor Fälligkeit", enabled: true }].map((item, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border p-3">
                <div><p className="text-sm font-medium">{item.label}</p><p className="text-xs text-muted-foreground">{item.desc}</p></div>
                <input type="checkbox" defaultChecked={item.enabled} className="h-4 w-4 rounded border-gray-300" />
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-4"><Button size="sm">Speichern</Button></div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="text-base">Benutzer</CardTitle><CardDescription className="text-xs mt-0.5">Benutzerverwaltung und Rollen</CardDescription></CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[{ name: "Klaus Müller", role: "Admin", email: "k.mueller@example.com" }, { name: "Thomas Becker", role: "Monteur", email: "t.becker@example.com" }, { name: "Anna Fischer", role: "Lagerist", email: "a.fischer@example.com" }].map((user, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-slate-200 flex items-center justify-center text-sm font-medium">{user.name.split(" ").map(n => n[0]).join("")}</div>
                  <div><p className="text-sm font-medium">{user.name}</p><p className="text-xs text-muted-foreground">{user.email}</p></div>
                </div>
                <div className="flex items-center gap-3"><span className="text-xs font-medium text-muted-foreground">{user.role}</span><Button variant="ghost" size="sm">Bearbeiten</Button></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
