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
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</p>
            {isCritical && <AlertTriangle className="h-4 w-4 text-red-500" />}
          </div>
          <p className={`mt-1 text-2xl font-bold ${isCritical ? "text-red-600" : ""}`}>{value}</p>
          {href && <div className="mt-2 flex items-center gap-0.5 text-xs text-muted-foreground hover:text-foreground"><ArrowRight className="h-3 w-3" />Ansehen</div>}
        </CardContent>
      </Card>
    </Link>
  );
}
