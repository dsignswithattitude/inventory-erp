"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Pagination } from "@/components/ui/pagination";
import { EmptyState } from "@/components/ui/empty-state";
import { StatusBadge } from "@/components/inventory/shared/status-badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Plus, Search, Download, Upload, QrCode, ArrowUpRight, X } from "lucide-react";
import { products, formatNumber, formatDate } from "@/lib/inventory/mock-data";

const categories = ["Alle", "Elektro", "HK/KL", "Sanitär", "PV", "Verbrauchsmaterial", "Messtechnik", "Wärmepumpe", "Kälte"];
const statuses = [{ value: "", label: "Alle Status" }, { value: "ok", label: "OK" }, { value: "low", label: "Niedrig" }, { value: "critical", label: "Kritisch" }, { value: "out", label: "Leer" }];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const pageSize = 10;

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (searchQuery) { const q = searchQuery.toLowerCase(); result = result.filter(p => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)); }
    if (categoryFilter) { result = result.filter(p => p.category === categoryFilter); }
    if (statusFilter) { result = result.filter(p => p.status === statusFilter); }
    result.sort((a, b) => {
      let cmp = 0;
      if (sortBy === "name") cmp = a.name.localeCompare(b.name);
      else if (sortBy === "stock") cmp = a.totalStock - b.totalStock;
      else if (sortBy === "available") cmp = a.available - b.available;
      else if (sortBy === "status") cmp = a.status.localeCompare(b.status);
      else if (sortBy === "category") cmp = a.category.localeCompare(b.category);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return result;
  }, [searchQuery, categoryFilter, statusFilter, sortBy, sortDir]);

  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSort = (col: string) => {
    if (sortBy === col) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortBy(col); setSortDir("asc"); }
    setCurrentPage(1);
  };

  const SortHeader = ({ col, label }: { col: string; label: string }) => (
    <TableHead className="cursor-pointer hover:bg-slate-50 select-none" onClick={() => handleSort(col)}>
      <div className="flex items-center gap-1">{label}{sortBy === col && <span className="text-xs">{sortDir === "asc" ? "↑" : "↓"}</span>}</div>
    </TableHead>
  );

  const hasFilters = searchQuery || categoryFilter || statusFilter;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Artikel</h1>
          <p className="text-sm text-muted-foreground">{filteredProducts.length} Artikel{hasFilters && " (gefiltert)"}</p>
        </div>
        <div className="flex max-w-full gap-2 overflow-x-auto">
          <Button variant="outline" size="sm"><Upload className="mr-1.5 h-3.5 w-3.5" />Import</Button>
          <Button variant="outline" size="sm"><Download className="mr-1.5 h-3.5 w-3.5" />Export</Button>
          <Button variant="outline" size="sm"><QrCode className="mr-1.5 h-3.5 w-3.5" />QR-Codes</Button>
          <Button size="sm"><Plus className="mr-1.5 h-3.5 w-3.5" />Artikel anlegen</Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Suche</label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                <Input placeholder="Artikelname, SKU, Kategorie..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} className="pl-8" />
              </div>
            </div>
            <div className="w-full sm:w-40">
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Kategorie</label>
              <Select options={categories.map((c) => ({ value: c === "Alle" ? "" : c, label: c }))} value={categoryFilter} onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }} placeholder="Alle" />
            </div>
            <div className="w-full sm:w-36">
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Status</label>
              <Select options={statuses} value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }} placeholder="Alle Status" />
            </div>
            {hasFilters && <Button variant="ghost" size="sm" onClick={() => { setSearchQuery(""); setCategoryFilter(""); setStatusFilter(""); setCurrentPage(1); }}><X className="mr-1 h-3 w-3" />Filter löschen</Button>}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <SortHeader col="name" label="Artikel" />
                <SortHeader col="category" label="Kategorie" />
                <TableHead>SKU</TableHead>
                <TableHead>Einheit</TableHead>
                <SortHeader col="stock" label="Bestand" />
                <SortHeader col="available" label="Verfügbar" />
                <TableHead>Reserviert</TableHead>
                <TableHead>Min.</TableHead>
                <TableHead>Lieferant</TableHead>
                <SortHeader col="status" label="Status" />
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedProducts.length === 0 ? (
                <TableRow><TableCell colSpan={11} className="p-0"><EmptyState title="Keine Artikel gefunden" description="Passen Sie Ihre Suche oder Filter an." /></TableCell></TableRow>
              ) : (
                paginatedProducts.map((product) => (
                  <TableRow key={product.id} className="group">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-xl bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)] ring-1 ring-black/[0.04] flex items-center justify-center">A</div>
                        <div>
                          <p className="font-medium text-sm">{product.name}</p>
                          {product.lastMovementAt && <p className="text-xs text-muted-foreground">Letzte Bewegung: {formatDate(product.lastMovementAt)}</p>}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{product.category}</TableCell>
                    <TableCell className="text-sm font-mono">{product.sku}</TableCell>
                    <TableCell className="text-sm">{product.unit}</TableCell>
                    <TableCell className="text-sm font-medium">{formatNumber(product.totalStock)}</TableCell>
                    <TableCell className="text-sm"><span className={product.available < product.minStock ? "text-red-600 font-medium" : ""}>{formatNumber(product.available)}</span></TableCell>
                    <TableCell className="text-sm text-muted-foreground">{product.reserved > 0 ? formatNumber(product.reserved) : "-"}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{formatNumber(product.minStock)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{product.supplierName ? product.supplierName.split(" ")[0] : "-"}</TableCell>
                    <TableCell><StatusBadge status={product.status} /></TableCell>
                    <TableCell><Link href={`/inventory/products/${product.id}`}><Button size="icon" variant="ghost" className="h-8 w-8 opacity-0 group-hover:opacity-100"><ArrowUpRight className="h-4 w-4" /></Button></Link></TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
        <div className="px-4 py-3 shadow-[0_-1px_0_rgba(15,23,42,0.05)]">
          <Pagination currentPage={currentPage} totalPages={totalPages} totalItems={filteredProducts.length} pageSize={pageSize} onPageChange={setCurrentPage} />
        </div>
      </Card>
    </div>
  );
}
