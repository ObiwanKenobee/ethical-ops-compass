
import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  trend?: number;
  trendDescription?: string;
  className?: string;
}

export const StatCard = ({
  title,
  value,
  description,
  icon,
  trend,
  trendDescription,
  className,
}: StatCardProps) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        {icon && <div className="h-5 w-5 text-gray-500">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
        
        {trend !== undefined && (
          <div className="flex items-center mt-4">
            <div className={cn(
              "text-xs font-medium mr-2 px-1.5 py-0.5 rounded-full",
              trend > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            )}>
              {trend > 0 ? "+" : ""}{trend}%
            </div>
            {trendDescription && (
              <span className="text-xs text-gray-500">{trendDescription}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
