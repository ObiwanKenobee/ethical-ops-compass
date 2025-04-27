
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target } from "lucide-react";
import { dashboardService } from "@/services/supabaseService";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

export const RecentInitiatives = () => {
  const { data: initiatives, isLoading } = useQuery({
    queryKey: ['recentInitiatives'],
    queryFn: () => dashboardService.getRecentInitiatives(),
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-md font-medium">Recent ESG Initiatives</CardTitle>
          <Target className="h-5 w-5 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-between justify-between border-b pb-3">
                <div>
                  <Skeleton className="h-5 w-40 mb-1" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-6 w-16" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-md font-medium">Recent ESG Initiatives</CardTitle>
        <Target className="h-5 w-5 text-gray-500" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {initiatives && initiatives.length > 0 ? (
            initiatives.map((initiative) => (
              <div
                key={initiative.id}
                className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium">{initiative.title}</p>
                  <p className="text-xs text-gray-500">
                    Started {initiative.started_at ? format(new Date(initiative.started_at), 'MMM d, yyyy') : 'N/A'} • {initiative.category || 'General'}
                  </p>
                </div>
                <Badge
                  className={
                    initiative.status === "active" ? "bg-green-100 text-green-800" :
                    initiative.status === "planned" ? "bg-blue-100 text-blue-800" :
                    initiative.status === "completed" ? "bg-gray-100 text-gray-800" :
                    "bg-amber-100 text-amber-800"
                  }
                >
                  {initiative.status}
                </Badge>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">No recent initiatives found</p>
          )}
          <div className="mt-3 text-center">
            <a href="#" className="text-sm text-primary hover:underline">
              View all initiatives
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
