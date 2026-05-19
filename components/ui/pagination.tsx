"use client";
import { Button } from "./button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, totalItems, pageSize, onPageChange }: PaginationProps) {
  const start = Math.min((currentPage - 1) * pageSize + 1, totalItems);
  const end = Math.min(currentPage * pageSize, totalItems);
  return (
    <div className="flex items-center justify-between">
      <p className="text-xs text-muted-foreground">
        {totalItems === 0 ? "Keine Einträge" : `${start}–${end} von ${totalItems}`}
      </p>
      <div className="flex items-center gap-1">
        <Button size="sm" variant="outline" disabled={currentPage <= 1} onClick={() => onPageChange(currentPage - 1)}>
          <ChevronLeft className="h-3.5 w-3.5" />
        </Button>
        {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
          const page = totalPages <= 7 ? i + 1 : currentPage <= 4 ? i + 1 : currentPage >= totalPages - 3 ? totalPages - 6 + i : currentPage - 3 + i;
          if (page < 1 || page > totalPages) return null;
          return (
            <Button key={page} size="sm" variant={currentPage === page ? "default" : "outline"} onClick={() => onPageChange(page)}>
              {page}
            </Button>
          );
        })}
        <Button size="sm" variant="outline" disabled={currentPage >= totalPages} onClick={() => onPageChange(currentPage + 1)}>
          <ChevronRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
