
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { dashboardService } from "@/services/supabaseService";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

export const TopPartners = () => {
  const { data: topPartners, isLoading } = useQuery({
    queryKey: ['topPartners'],
    queryFn: () => dashboardService.getTopPartners(5),
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-md font-medium">Top Partners</CardTitle>
          <Users className="h-5 w-5 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-5 w-40 mb-1" />
                <Skeleton className="h-2 w-full" />
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
        <CardTitle className="text-md font-medium">Top Partners</CardTitle>
        <Users className="h-5 w-5 text-gray-500" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topPartners && topPartners.length > 0 ? (
            topPartners.map((partner) => (
              <div key={partner.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{partner.name}</span>
                  <span className="text-sm font-semibold">
                    {partner.complianceScore}%
                  </span>
                </div>
                <Progress 
                  value={partner.complianceScore} 
                  max={100} 
                  className="h-2"
                  style={{ backgroundColor: 'var(--background)' }}
                />
                <p className="text-xs text-muted-foreground">{partner.industry}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">No partner data available</p>
          )}
          <div className="mt-3 text-center">
            <a href="#" className="text-sm text-primary hover:underline">
              View all partners
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
