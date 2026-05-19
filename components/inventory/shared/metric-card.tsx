"use client";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, AlertTriangle } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: number | string;
  status?: string;
  href?: string;
  icon?: React.ElementType;
}

export function MetricCard({ label, value, status, href, icon: Icon }: MetricCardProps) {
  const isCritical = status === "critical";
  return (
    <Link href={href || "#"}>
      <Card className="cursor-pointer shadow-[0_14px_35px_rgba(15,23,42,0.06)] transition-colors hover:bg-blue-50/40">
        <CardContent className="p-3.5">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-medium text-muted-foreground">{label}</p>
            {isCritical && <AlertTriangle className="h-3.5 w-3.5 text-red-500" />}
          </div>
          <p className={`mt-1 text-xl font-semibold ${isCritical ? "text-red-600" : ""}`}>{value}</p>
          {href && <div className="mt-1.5 flex items-center gap-0.5 text-[11px] text-muted-foreground hover:text-foreground"><ArrowRight className="h-3 w-3" />Ansehen</div>}
        </CardContent>
      </Card>
    </Link>
  );
}
