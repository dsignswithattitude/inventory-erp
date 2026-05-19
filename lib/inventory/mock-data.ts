import type { Product, Location, Vehicle, Project, PurchaseSuggestion, PurchaseOrder, Alert, Movement, DashboardKpi, DashboardRisk, Kit, Equipment } from "./types";

export const products: Product[] = [
  { id: "p1", name: "Kabel 5x2,5mm² NYY-J", sku: "EL-KAB-5X25", category: "Elektro", unit: "m", totalStock: 2500, available: 2200, reserved: 300, blocked: 0, minStock: 500, targetStock: 3000, reorderPoint: 800, leadTimeDays: 5, supplierId: "s1", supplierName: "Elektro Grosshandel GmbH", price: 4.50, status: "ok", lastMovementAt: "2026-05-17T14:30:00Z" },
  { id: "p2", name: "Filterset WP-200", sku: "HK-FILTER-200", category: "HK/KL", unit: "Stück", totalStock: 12, available: 8, reserved: 4, blocked: 0, minStock: 20, targetStock: 50, reorderPoint: 25, leadTimeDays: 7, supplierId: "s2", supplierName: "SHK Service GmbH", price: 189.00, status: "low", lastMovementAt: "2026-05-15T09:15:00Z" },
  { id: "p3", name: "Dichtungssatz DN50", sku: "SAN-DICH-50", category: "Sanitär", unit: "Stück", totalStock: 45, available: 45, reserved: 0, blocked: 0, minStock: 30, targetStock: 100, reorderPoint: 50, leadTimeDays: 3, supplierId: "s1", supplierName: "Elektro Grosshandel GmbH", price: 28.50, status: "ok", lastMovementAt: "2026-05-16T11:00:00Z" },
  { id: "p4", name: "Sicherung 16A C-Char.", sku: "EL-SICH-16C", category: "Elektro", unit: "Stück", totalStock: 0, available: 0, reserved: 0, blocked: 0, minStock: 100, targetStock: 200, reorderPoint: 150, leadTimeDays: 2, supplierId: "s1", supplierName: "Elektro Grosshandel GmbH", price: 3.20, status: "critical", lastMovementAt: "2026-05-10T08:45:00Z" },
  { id: "p5", name: "Montageschiene PV 40x40", sku: "PV-SCHIEN-40", category: "PV", unit: "m", totalStock: 180, available: 150, reserved: 30, blocked: 0, minStock: 200, targetStock: 500, reorderPoint: 300, leadTimeDays: 10, supplierId: "s3", supplierName: "Solartec AG", price: 12.80, status: "low", lastMovementAt: "2026-05-17T16:20:00Z" },
  { id: "p6", name: "Wechselrichter 10kW", sku: "PV-WR-10K", category: "PV", unit: "Stück", totalStock: 3, available: 3, reserved: 0, blocked: 0, minStock: 5, targetStock: 10, reorderPoint: 7, leadTimeDays: 14, supplierId: "s3", supplierName: "Solartec AG", price: 2450.00, status: "ok", lastMovementAt: "2026-05-14T10:30:00Z" },
  { id: "p7", name: "Schraubenset M8 verz.", sku: "VW-SCHRA-M8", category: "Verbrauchsmaterial", unit: "Satz", totalStock: 35, available: 35, reserved: 0, blocked: 0, minStock: 50, targetStock: 100, reorderPoint: 75, leadTimeDays: 2, supplierId: "s1", supplierName: "Elektro Grosshandel GmbH", price: 18.50, status: "ok", lastMovementAt: "2026-05-17T08:00:00Z" },
  { id: "p8", name: "Reinigungsmittel 5L", sku: "SAN-REIN-5L", category: "Verbrauchsmaterial", unit: "Kanister", totalStock: 8, available: 6, reserved: 2, blocked: 0, minStock: 15, targetStock: 30, reorderPoint: 20, leadTimeDays: 3, supplierId: "s2", supplierName: "SHK Service GmbH", price: 24.90, status: "low", lastMovementAt: "2026-05-16T14:45:00Z" },
  { id: "p9", name: "Messadapter USB-C", sku: "MSR-ADAP-USB", category: "Messtechnik", unit: "Stück", totalStock: 5, available: 5, reserved: 0, blocked: 2, minStock: 10, targetStock: 20, reorderPoint: 15, leadTimeDays: 7, supplierId: "s4", supplierName: "TechControl KG", price: 89.00, status: "low", lastMovementAt: "2026-05-12T13:20:00Z" },
  { id: "p10", name: "Temperaturfühler NTC 10k", sku: "HK-TF-NTC10", category: "HK/KL", unit: "Stück", totalStock: 22, available: 18, reserved: 4, blocked: 0, minStock: 15, targetStock: 40, reorderPoint: 25, leadTimeDays: 5, supplierId: "s2", supplierName: "SHK Service GmbH", price: 35.00, status: "ok", lastMovementAt: "2026-05-17T10:15:00Z" },
  { id: "p11", name: "Pressfitting 22mm Kupfer", sku: "SAN-PRES-22", category: "Sanitär", unit: "Stück", totalStock: 150, available: 140, reserved: 10, blocked: 0, minStock: 100, targetStock: 300, reorderPoint: 150, leadTimeDays: 4, supplierId: "s1", supplierName: "Elektro Grosshandel GmbH", price: 8.90, status: "ok", lastMovementAt: "2026-05-17T15:30:00Z" },
  { id: "p12", name: "Kupferrohr 18mm weich", sku: "SAN-KUPF-18", category: "Sanitär", unit: "m", totalStock: 85, available: 70, reserved: 15, blocked: 0, minStock: 50, targetStock: 200, reorderPoint: 100, leadTimeDays: 5, supplierId: "s1", supplierName: "Elektro Grosshandel GmbH", price: 6.50, status: "ok", lastMovementAt: "2026-05-17T12:00:00Z" },
  { id: "p13", name: "LS-Schalter B16 3pol.", sku: "EL-LS-B16-3", category: "Elektro", unit: "Stück", totalStock: 25, available: 20, reserved: 5, blocked: 0, minStock: 30, targetStock: 60, reorderPoint: 40, leadTimeDays: 3, supplierId: "s1", supplierName: "Elektro Grosshandel GmbH", price: 45.00, status: "ok", lastMovementAt: "2026-05-16T09:30:00Z" },
  { id: "p14", name: "FI-Schalter 40A 4pol.", sku: "EL-FI-40-4", category: "Elektro", unit: "Stück", totalStock: 8, available: 8, reserved: 0, blocked: 0, minStock: 10, targetStock: 25, reorderPoint: 15, leadTimeDays: 3, supplierId: "s1", supplierName: "Elektro Grosshandel GmbH", price: 125.00, status: "ok", lastMovementAt: "2026-05-15T11:45:00Z" },
  { id: "p15", name: "Wärmepumpenfühler Set", sku: "WP-FUEHL-SET", category: "Wärmepumpe", unit: "Stück", totalStock: 2, available: 2, reserved: 0, blocked: 0, minStock: 5, targetStock: 15, reorderPoint: 10, leadTimeDays: 10, supplierId: "s2", supplierName: "SHK Service GmbH", price: 340.00, status: "low", lastMovementAt: "2026-05-13T14:00:00Z" },
  { id: "p16", name: "Abgasschlauch DN100 5m", sku: "HK-ABGAS-100", category: "HK/KL", unit: "Stück", totalStock: 4, available: 4, reserved: 0, blocked: 0, minStock: 8, targetStock: 20, reorderPoint: 12, leadTimeDays: 7, supplierId: "s2", supplierName: "SHK Service GmbH", price: 185.00, status: "low", lastMovementAt: "2026-05-14T16:30:00Z" },
  { id: "p17", name: "Kältemittel R410A 5kg", sku: "KL-KAELT-R410A", category: "Kälte", unit: "Dose", totalStock: 6, available: 6, reserved: 0, blocked: 0, minStock: 10, targetStock: 25, reorderPoint: 15, leadTimeDays: 5, supplierId: "s2", supplierName: "SHK Service GmbH", price: 220.00, status: "ok", lastMovementAt: "2026-05-16T08:15:00Z" },
  { id: "p18", name: "Dachhaken PV verstellbar", sku: "PV-DAK-HAK", category: "PV", unit: "Stück", totalStock: 120, available: 100, reserved: 20, blocked: 0, minStock: 150, targetStock: 400, reorderPoint: 200, leadTimeDays: 8, supplierId: "s3", supplierName: "Solartec AG", price: 28.00, status: "ok", lastMovementAt: "2026-05-17T13:45:00Z" },
  { id: "p19", name: "Solarfläche 400W mono", sku: "PV-PANEL-400", category: "PV", unit: "Stück", totalStock: 8, available: 8, reserved: 0, blocked: 0, minStock: 20, targetStock: 50, reorderPoint: 30, leadTimeDays: 14, supplierId: "s3", supplierName: "Solartec AG", price: 480.00, status: "low", lastMovementAt: "2026-05-15T10:00:00Z" },
  { id: "p20", name: "Isolierrohr 22mm 2m", sku: "SAN-ISO-22", category: "Sanitär", unit: "Stück", totalStock: 65, available: 55, reserved: 10, blocked: 0, minStock: 40, targetStock: 120, reorderPoint: 80, leadTimeDays: 4, supplierId: "s1", supplierName: "Elektro Grosshandel GmbH", price: 14.50, status: "ok", lastMovementAt: "2026-05-17T09:30:00Z" },
];

export const locations: Location[] = [
  { id: "l1", name: "Zentrallager Hamburg", type: "warehouse", responsiblePerson: "Klaus Müller", itemCount: 850, stockValue: 125000, criticalItems: 3, lastMovementAt: "2026-05-17T16:30:00Z", status: "ok" },
  { id: "l2", name: "Lager Berlin", type: "warehouse", responsiblePerson: "Sarah Schmidt", itemCount: 420, stockValue: 85000, criticalItems: 1, lastMovementAt: "2026-05-17T14:00:00Z", status: "ok" },
  { id: "l3", name: "Werkstatt München", type: "warehouse", responsiblePerson: "Hans Weber", itemCount: 180, stockValue: 45000, criticalItems: 2, lastMovementAt: "2026-05-17T11:00:00Z", status: "low" },
  { id: "l4", name: "Fahrzeug VK-100", type: "vehicle", responsiblePerson: "Thomas Becker", itemCount: 45, stockValue: 12000, criticalItems: 1, lastMovementAt: "2026-05-17T08:30:00Z", status: "ok" },
  { id: "l5", name: "Fahrzeug VK-200", type: "vehicle", responsiblePerson: "Michael Wagner", itemCount: 38, stockValue: 9800, criticalItems: 3, lastMovementAt: "2026-05-16T17:00:00Z", status: "critical" },
  { id: "l6", name: "Container A12", type: "container", itemCount: 120, stockValue: 35000, criticalItems: 0, lastMovementAt: "2026-05-15T10:00:00Z", status: "ok" },
  { id: "l7", name: "Servicebox SB-01", type: "servicebox", responsiblePerson: "Anna Fischer", itemCount: 25, stockValue: 4500, criticalItems: 2, lastMovementAt: "2026-05-17T07:00:00Z", status: "low" },
  { id: "l8", name: "Quarantäne-Lager", type: "quarantine", itemCount: 8, stockValue: 2200, criticalItems: 0, lastMovementAt: "2026-05-14T09:00:00Z", status: "ok" },
];

export const vehicles: Vehicle[] = [
  { id: "v1", name: "Servicefahrzeug VK-100", licensePlate: "HH-AB 1234", responsiblePerson: "Thomas Becker", locationId: "l1", locationName: "Zentrallager Hamburg", completeness: 92, missingItems: 3, criticalItems: 1, lastCheckAt: "2026-05-15T08:00:00Z", status: "ok" },
  { id: "v2", name: "Servicefahrzeug VK-200", licensePlate: "HH-CD 5678", responsiblePerson: "Michael Wagner", locationId: "l3", locationName: "Werkstatt München", completeness: 78, missingItems: 8, criticalItems: 3, lastCheckAt: "2026-05-16T14:00:00Z", status: "critical" },
  { id: "v3", name: "Kleintransporter VT-50", licensePlate: "B-EF 9012", responsiblePerson: "Sarah Schmidt", locationId: "l2", locationName: "Lager Berlin", completeness: 95, missingItems: 1, criticalItems: 0, lastCheckAt: "2026-05-17T07:30:00Z", status: "ok" },
  { id: "v4", name: "Montagebus MB-30", licensePlate: "M-GH 3456", responsiblePerson: "Hans Weber", locationId: "l3", locationName: "Werkstatt München", completeness: 85, missingItems: 5, criticalItems: 1, lastCheckAt: "2026-05-14T16:00:00Z", status: "ok" },
];

export const projects: Project[] = [
  { id: "pr1", name: "PV-Anlage Müller Wohnstraße 15", customer: "Familie Müller", startDate: "2026-05-20", status: "planning", projectManager: "Thomas Becker", materialStatus: "critical", missingItems: 8, reservedPositions: 15, openOrders: 2 },
  { id: "pr2", name: "WP-Wechsel Schulstraße 8", customer: "Gemeinde Schulstraße", startDate: "2026-05-25", status: "planning", projectManager: "Michael Wagner", materialStatus: "low", missingItems: 3, reservedPositions: 8, openOrders: 1 },
  { id: "pr3", name: "Sanierung Altbau Bergstraße 22", customer: "Immobilien GmbH Berg", startDate: "2026-04-15", endDate: "2026-06-30", status: "active", projectManager: "Anna Fischer", materialStatus: "ok", missingItems: 0, reservedPositions: 25, openOrders: 0 },
  { id: "pr4", name: "Neubau Bürogebäude Marktplatz", customer: "Bau AG Marktplatz", startDate: "2026-03-01", endDate: "2026-08-15", status: "active", projectManager: "Klaus Müller", materialStatus: "low", missingItems: 5, reservedPositions: 42, openOrders: 3 },
  { id: "pr5", name: "PV-Anlage Gewerbehalle Ost", customer: "Logistik GmbH Ost", startDate: "2026-06-01", status: "planning", projectManager: "Thomas Becker", materialStatus: "ok", missingItems: 0, reservedPositions: 30, openOrders: 0 },
];

export const purchaseSuggestions: PurchaseSuggestion[] = [
  { id: "ps1", productId: "p4", productName: "Sicherung 16A C-Char.", sku: "EL-SICH-16C", locationId: "l1", locationName: "Zentrallager Hamburg", currentStock: 0, available: 0, reserved: 0, consumptionPerDay: 8, daysOfSupply: 0, leadTimeDays: 2, targetStock: 200, suggestedQty: 200, supplierName: "Elektro Grosshandel GmbH", reason: "Bestand reicht 0 Tage. Lieferzeit 2 Tage. 30 Stück für Projekt Müller reserviert.", severity: "critical", unit: "Stück" },
  { id: "ps2", productId: "p2", productName: "Filterset WP-200", sku: "HK-FILTER-200", locationId: "l1", locationName: "Zentrallager Hamburg", currentStock: 12, available: 8, reserved: 4, consumptionPerDay: 2, daysOfSupply: 4, leadTimeDays: 7, targetStock: 50, suggestedQty: 38, supplierName: "SHK Service GmbH", reason: "Bestand reicht 4 Tage. Lieferzeit 7 Tage. Projekt WP-Wechsel benötigt 4 Stück.", severity: "warning", unit: "Stück" },
  { id: "ps3", productId: "p5", productName: "Montageschiene PV 40x40", sku: "PV-SCHIEN-40", locationId: "l1", locationName: "Zentrallager Hamburg", currentStock: 180, available: 150, reserved: 30, consumptionPerDay: 25, daysOfSupply: 6, leadTimeDays: 10, targetStock: 500, suggestedQty: 320, supplierName: "Solartec AG", reason: "Bestand reicht 6 Tage. Lieferzeit 10 Tage. Für Projekt Müller und Gewerbehalle benötigt.", severity: "warning", unit: "m" },
  { id: "ps4", productId: "p19", productName: "Solarfläche 400W mono", sku: "PV-PANEL-400", locationId: "l1", locationName: "Zentrallager Hamburg", currentStock: 8, available: 8, reserved: 0, consumptionPerDay: 4, daysOfSupply: 2, leadTimeDays: 14, targetStock: 50, suggestedQty: 42, supplierName: "Solartec AG", reason: "Bestand reicht 2 Tage. Lieferzeit 14 Tage. Beide aktive PV-Projekte benötigen Panels.", severity: "critical", unit: "Stück" },
  { id: "ps5", productId: "p15", productName: "Wärmepumpenfühler Set", sku: "WP-FUEHL-SET", locationId: "l3", locationName: "Werkstatt München", currentStock: 2, available: 2, reserved: 0, consumptionPerDay: 1, daysOfSupply: 2, leadTimeDays: 10, targetStock: 15, suggestedQty: 13, supplierName: "SHK Service GmbH", reason: "Nur 2 Sets auf Lager. WP-Wechsel startet in 7 Tagen.", severity: "warning", unit: "Stück" },
  { id: "ps6", productId: "p8", productName: "Reinigungsmittel 5L", sku: "SAN-REIN-5L", locationId: "l1", locationName: "Zentrallager Hamburg", currentStock: 8, available: 6, reserved: 2, consumptionPerDay: 3, daysOfSupply: 2, leadTimeDays: 3, targetStock: 30, suggestedQty: 22, supplierName: "SHK Service GmbH", reason: "Bestand knapp. Projekt Altbau Bergstraße verbraucht viel.", severity: "warning", unit: "Kanister" },
];

export const orders: PurchaseOrder[] = [
  { id: "o1", orderNumber: "PO-2026-0089", supplierId: "s1", supplierName: "Elektro Grosshandel GmbH", status: "ordered", orderDate: "2026-05-15", expectedDeliveryDate: "2026-05-20", positions: [
    { id: "op1", productId: "p4", productName: "Sicherung 16A C-Char.", sku: "EL-SICH-16C", qty: 150, unit: "Stück", price: 3.20, total: 480.00, receivedQty: 0, status: "ordered" },
    { id: "op2", productId: "p13", productName: "LS-Schalter B16 3pol.", sku: "EL-LS-B16-3", qty: 30, unit: "Stück", price: 45.00, total: 1350.00, receivedQty: 0, status: "ordered" }
  ], totalValue: 1830.00, projectId: "pr4", projectName: "Neubau Bürogebäude Marktplatz" },
  { id: "o2", orderNumber: "PO-2026-0090", supplierId: "s3", supplierName: "Solartec AG", status: "overdue", orderDate: "2026-05-10", expectedDeliveryDate: "2026-05-16", positions: [
    { id: "op3", productId: "p19", productName: "Solarfläche 400W mono", sku: "PV-PANEL-400", qty: 30, unit: "Stück", price: 480.00, total: 14400.00, receivedQty: 0, status: "overdue" }
  ], totalValue: 14400.00, projectId: "pr1", projectName: "PV-Anlage Müller Wohnstraße 15" },
  { id: "o3", orderNumber: "PO-2026-0091", supplierId: "s2", supplierName: "SHK Service GmbH", status: "partial", orderDate: "2026-05-12", expectedDeliveryDate: "2026-05-17", positions: [
    { id: "op4", productId: "p2", productName: "Filterset WP-200", sku: "HK-FILTER-200", qty: 25, unit: "Stück", price: 189.00, total: 4725.00, receivedQty: 10, status: "partial" },
    { id: "op5", productId: "p10", productName: "Temperaturfühler NTC 10k", sku: "HK-TF-NTC10", qty: 20, unit: "Stück", price: 35.00, total: 700.00, receivedQty: 20, status: "delivered" }
  ], totalValue: 5425.00, projectId: "pr2", projectName: "WP-Wechsel Schulstraße 8" },
  { id: "o4", orderNumber: "PO-2026-0092", supplierId: "s1", supplierName: "Elektro Grosshandel GmbH", status: "draft", positions: [
    { id: "op6", productId: "p11", productName: "Pressfitting 22mm Kupfer", sku: "SAN-PRES-22", qty: 100, unit: "Stück", price: 8.90, total: 890.00, receivedQty: 0, status: "draft" },
    { id: "op7", productId: "p12", productName: "Kupferrohr 18mm weich", sku: "SAN-KUPF-18", qty: 50, unit: "m", price: 6.50, total: 325.00, receivedQty: 0, status: "draft" }
  ], totalValue: 1215.00 },
];

export const alerts: Alert[] = [
  { id: "a1", title: "Kritischer Bestand: Sicherung 16A", type: "stock", severity: "critical", productId: "p4", productName: "Sicherung 16A C-Char.", locationId: "l1", locationName: "Zentrallager Hamburg", recommendedAction: "Sofortige Bestellung auslösen", actionHref: "/inventory/purchase-suggestions", status: "open", createdAt: "2026-05-17T08:00:00Z" },
  { id: "a2", title: "Projekt gefährdet: PV-Anlage Müller", type: "project", severity: "critical", productId: "p19", productName: "Solarfläche 400W mono", projectId: "pr1", projectName: "PV-Anlage Müller Wohnstraße 15", recommendedAction: "Bestellung beschleunigen oder Alternative suchen", actionHref: "/inventory/projects/pr1", status: "open", createdAt: "2026-05-16T14:00:00Z" },
  { id: "a3", title: "Fahrzeug unvollständig: VK-200", type: "vehicle", severity: "warning", vehicleId: "v2", vehicleName: "Servicefahrzeug VK-200", recommendedAction: "Fahrzeug auffüllen vor nächster Tour", actionHref: "/inventory/vehicles/v2", responsible: "Michael Wagner", status: "open", createdAt: "2026-05-16T17:30:00Z" },
  { id: "a4", title: "Bestellung überfällig: PO-2026-0090", type: "order", severity: "warning", recommendedAction: "Lieferstatus beim Lieferanten prüfen", actionHref: "/inventory/purchase-orders/o2", status: "open", createdAt: "2026-05-17T06:00:00Z" },
  { id: "a5", title: "Prüfmittel fällig: Messadapter USB-C", type: "equipment", severity: "warning", locationId: "l3", locationName: "Werkstatt München", recommendedAction: "Kalibrierung organisieren", actionHref: "/inventory/equipment", status: "open", createdAt: "2026-05-15T10:00:00Z" },
  { id: "a6", title: "Servicebox unvollständig: SB-01", type: "kit", severity: "warning", locationId: "l7", locationName: "Servicebox SB-01", recommendedAction: "Box prüfen und auffüllen", actionHref: "/inventory/kits", responsible: "Anna Fischer", status: "acknowledged", createdAt: "2026-05-14T08:00:00Z" },
  { id: "a7", title: "Bestand knapp: Filterset WP-200", type: "stock", severity: "warning", productId: "p2", productName: "Filterset WP-200", locationId: "l1", locationName: "Zentrallager Hamburg", recommendedAction: "Bestellung prüfen und ggf. erhöhen", actionHref: "/inventory/purchase-suggestions", status: "open", createdAt: "2026-05-17T07:00:00Z" },
  { id: "a8", title: "Materialrisiko: Montageschiene PV", type: "project", severity: "warning", productId: "p5", productName: "Montageschiene PV 40x40", projectId: "pr4", projectName: "Neubau Bürogebäude Marktplatz", recommendedAction: "Nachbestellung einplanen", actionHref: "/inventory/projects/pr4", status: "open", createdAt: "2026-05-17T12:00:00Z" },
  { id: "a9", title: "Fahrzeug kritisch: VK-200", type: "vehicle", severity: "critical", vehicleId: "v2", vehicleName: "Servicefahrzeug VK-200", recommendedAction: "Sofort auffüllen - Montage morgen gefährdet", actionHref: "/inventory/vehicles/v2", responsible: "Michael Wagner", status: "open", createdAt: "2026-05-17T18:00:00Z" },
  { id: "a10", title: "Bestand knapp: Wärmepumpenfühler", type: "stock", severity: "warning", productId: "p15", productName: "Wärmepumpenfühler Set", locationId: "l3", locationName: "Werkstatt München", recommendedAction: "Bestellung für WP-Wechsel vorbereiten", actionHref: "/inventory/purchase-suggestions", status: "open", createdAt: "2026-05-16T09:00:00Z" },
];

export const movements: Movement[] = [
  { id: "m1", productId: "p4", productName: "Sicherung 16A C-Char.", type: "out", quantity: 30, toLocationId: "l4", toLocationName: "Fahrzeug VK-100", referenceType: "project", referenceId: "pr4", createdAt: "2026-05-17T08:30:00Z" },
  { id: "m2", productId: "p11", productName: "Pressfitting 22mm Kupfer", type: "out", quantity: 15, toLocationId: "l4", toLocationName: "Fahrzeug VK-100", referenceType: "project", referenceId: "pr3", createdAt: "2026-05-17T09:15:00Z" },
  { id: "m3", productId: "p1", productName: "Kabel 5x2,5mm² NYY-J", type: "out", quantity: 100, toLocationId: "l4", toLocationName: "Fahrzeug VK-100", referenceType: "project", referenceId: "pr1", createdAt: "2026-05-17T10:00:00Z" },
  { id: "m4", productId: "p7", productName: "Schraubenset M8 verz.", type: "in", quantity: 50, toLocationId: "l1", toLocationName: "Zentrallager Hamburg", createdAt: "2026-05-17T08:00:00Z" },
  { id: "m5", productId: "p2", productName: "Filterset WP-200", type: "out", quantity: 5, toLocationId: "l5", toLocationName: "Fahrzeug VK-200", referenceType: "project", referenceId: "pr2", createdAt: "2026-05-16T14:00:00Z" },
];

export const kits: Kit[] = [
  { id: "k1", name: "Werkzeugkoffer Standard", type: "Standard", vehicleId: "v1", vehicleName: "Servicefahrzeug VK-100", responsiblePerson: "Thomas Becker", completeness: 92, missingItems: 2, lastCheckAt: "2026-05-15T08:00:00Z", status: "ok",
    items: [
      { productId: "p7", productName: "Schraubenset M8 verz.", sku: "VW-SCHRA-M8", targetQty: 2, actualQty: 2, unit: "Satz", status: "ok" },
      { productId: "p8", productName: "Reinigungsmittel 5L", sku: "SAN-REIN-5L", targetQty: 2, actualQty: 1, unit: "Kanister", status: "low" },
      { productId: "p9", productName: "Messadapter USB-C", sku: "MSR-ADAP-USB", targetQty: 1, actualQty: 1, unit: "Stück", status: "ok" },
    ]
  },
  { id: "k2", name: "Elektro-Notfallset", type: "Elektro", vehicleId: "v2", vehicleName: "Servicefahrzeug VK-200", responsiblePerson: "Michael Wagner", completeness: 65, missingItems: 6, lastCheckAt: "2026-05-16T14:00:00Z", status: "critical",
    items: [
      { productId: "p4", productName: "Sicherung 16A C-Char.", sku: "EL-SICH-16C", targetQty: 30, actualQty: 0, unit: "Stück", status: "critical" },
      { productId: "p13", productName: "LS-Schalter B16 3pol.", sku: "EL-LS-B16-3", targetQty: 10, actualQty: 5, unit: "Stück", status: "low" },
      { productId: "p14", productName: "FI-Schalter 40A 4pol.", sku: "EL-FI-40-4", targetQty: 5, actualQty: 5, unit: "Stück", status: "ok" },
      { productId: "p1", productName: "Kabel 5x2,5mm² NYY-J", sku: "EL-KAB-5X25", targetQty: 50, actualQty: 20, unit: "m", status: "low" },
    ]
  },
];

export const equipment: Equipment[] = [
  { id: "e1", name: "Druckkalibrator FLUKE 725", serialNumber: "FLK-725-2024-001", locationId: "l1", locationName: "Zentrallager Hamburg", responsiblePerson: "Klaus Müller", testStatus: "ok", nextTestDate: "2026-08-15", lastTestDate: "2026-02-15", isLocked: false, category: "Messgerät" },
  { id: "e2", name: "Wärmebildkamera Testo 875", serialNumber: "TST-875-2023-015", locationId: "l3", locationName: "Werkstatt München", responsiblePerson: "Hans Weber", testStatus: "due", nextTestDate: "2026-05-20", lastTestDate: "2025-05-20", isLocked: false, category: "Messgerät" },
  { id: "e3", name: "Gasleckdetektor testo 316-4", serialNumber: "TST-316-4-2022-008", locationId: "l1", locationName: "Zentrallager Hamburg", responsiblePerson: "Klaus Müller", testStatus: "ok", nextTestDate: "2026-11-10", lastTestDate: "2025-11-10", isLocked: false, category: "Messgerät" },
  { id: "e4", name: "Elektrotester Gossen Metrawatt", serialNumber: "GM-P360-2024-003", locationId: "l2", locationName: "Lager Berlin", responsiblePerson: "Sarah Schmidt", testStatus: "overdue", nextTestDate: "2026-04-01", lastTestDate: "2025-04-01", isLocked: true, category: "Messgerät" },
  { id: "e5", name: "Lötstation Weller WE1010", serialNumber: "WL-WE1010-2024-002", locationId: "l3", locationName: "Werkstatt München", responsiblePerson: "Hans Weber", testStatus: "ok", nextTestDate: "2026-09-30", lastTestDate: "2026-03-30", isLocked: false, category: "Arbeitsmittel" },
];

export const dashboardKpis: DashboardKpi[] = [
  { label: "Kritische Artikel", value: 5, status: "critical", href: "/inventory/products?status=critical" },
  { label: "Materialrisiken bei Projekten", value: 3, status: "low", href: "/inventory/projects?status=low" },
  { label: "Offene Bestellvorschläge", value: 6, href: "/inventory/purchase-suggestions" },
  { label: "Bestandswert gesamt", value: 289500, href: "/inventory/products" },
  { label: "Überfällige Bestellungen", value: 1, status: "critical", href: "/inventory/purchase-orders?status=overdue" },
  { label: "Fahrzeuge unvollständig", value: 1, status: "critical", href: "/inventory/vehicles?status=critical" },
];

export const dashboardRisks: DashboardRisk[] = [
  { id: "r1", title: "Sicherungen nicht lieferbar", severity: "critical", cause: "Bestand 0, Lieferant meldet Lieferverzug", action: "Alternativlieferant kontaktieren", actionHref: "/inventory/products/p4" },
  { id: "r2", title: "Solarpanels nicht rechtzeitig", severity: "critical", cause: "Bestellung PO-2026-0090 überfällig seit 2 Tagen", action: "Lieferstatus prüfen, Expresslieferung anfragen", actionHref: "/inventory/purchase-orders/o2" },
  { id: "r3", title: "Fahrzeug VK-200 für Montage morgen kritisch", severity: "critical", cause: "3 kritische Artikel fehlen, Tour startet 07:00", action: "Heute auffüllen oder Ersatz organisieren", actionHref: "/inventory/vehicles/v2" },
  { id: "r4", title: "Wärmebildkamera Prüfung fällig", severity: "warning", cause: "Nächste Prüfung in 2 Tagen, noch nicht organisiert", action: "Kalibrierung terminieren", actionHref: "/inventory/equipment" },
];

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(value);
}
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("de-DE").format(value);
}
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
}
export function formatDateTime(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
}
