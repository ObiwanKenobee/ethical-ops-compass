
import { useQuery } from "@tanstack/react-query";
import { StatCard } from "./StatCard";
import { AlertTriangle, CheckCircle, Clock, Target, Users } from "lucide-react";
import { dashboardService } from "@/services/supabaseService";
import { Skeleton } from "@/components/ui/skeleton";

export const DashboardMetrics = () => {
  const { data: summaryData, isLoading } = useQuery({
    queryKey: ['dashboardSummary'],
    queryFn: () => dashboardService.getDashboardSummary(),
  });

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="p-6 rounded-lg border">
            <Skeleton className="h-5 w-3/4 mb-2" />
            <Skeleton className="h-8 w-1/2 mb-3" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      <StatCard
        title="Partners"
        value={summaryData?.partnerCount || 0}
        description="Active organizations in network"
        icon={<Users />}
        trend={8}
        trendDescription="vs. last quarter"
      />
      <StatCard
        title="Compliance Rate"
        value={`${summaryData?.complianceRate || 0}%`}
        description="Network-wide average"
        icon={<CheckCircle />}
        trend={5}
        trendDescription="vs. last quarter"
      />
      <StatCard
        title="Open Risks"
        value={summaryData?.openRisks || 0}
        description="Requiring attention"
        icon={<AlertTriangle />}
        trend={-12}
        trendDescription="vs. last quarter"
      />
      <StatCard
        title="ESG Initiatives"
        value={summaryData?.activeInitiatives || 0}
        description="Active initiatives"
        icon={<Target />}
        trend={15}
        trendDescription="vs. last quarter"
      />
      <StatCard
        title="Assessments"
        value={summaryData?.pendingAssessments || 0}
        description="Pending completion"
        icon={<Clock />}
        trend={-5}
        trendDescription="vs. last quarter"
      />
    </div>
  );
};
