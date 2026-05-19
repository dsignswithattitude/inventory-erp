"use client";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, ArrowRight } from "lucide-react";

interface RiskCardProps {
  risk: {
    id: string;
    title: string;
    severity: string;
    cause: string;
    action: string;
    actionHref: string;
  };
}

export function RiskCard({ risk }: RiskCardProps) {
  const isCritical = risk.severity === "critical";
  return (
    <Card className={`${isCritical ? "bg-red-50/80 shadow-[0_14px_35px_rgba(239,68,68,0.08)]" : "bg-amber-50/80 shadow-[0_14px_35px_rgba(245,158,11,0.08)]"}`}>
      <CardContent className="p-3.5">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-2">
            <div className={`rounded-full p-1 ${isCritical ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-600"}`}>
              <AlertTriangle className="h-3.5 w-3.5" />
            </div>
            <div>
              <p className={`text-sm font-semibold ${isCritical ? "text-red-900" : "text-amber-900"}`}>{risk.title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{risk.cause}</p>
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">{risk.action}</p>
          <Link href={risk.actionHref}>
            <button className={`flex items-center gap-1 text-xs font-medium ${isCritical ? "text-red-600 hover:text-red-700" : "text-amber-600 hover:text-amber-700"}`}>
              Handeln <ArrowRight className="h-3 w-3" />
            </button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
