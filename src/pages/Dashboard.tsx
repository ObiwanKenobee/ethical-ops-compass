
import { AlertTriangle, CheckCircle, Clock, Target, Users } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { OverviewChart } from "@/components/dashboard/OverviewChart";
import { ComplianceAlerts } from "@/components/dashboard/ComplianceAlerts";
import { PartnerActivity } from "@/components/dashboard/PartnerActivity";
import { SdgProgress } from "@/components/dashboard/SdgProgress";

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Last updated: April 22, 2025 • <a href="#" className="text-primary hover:underline">Refresh Data</a>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Partners" 
          value="37" 
          description="Active organizations in network" 
          icon={<Users />}
          trend={8}
          trendDescription="vs. last quarter"
        />
        <StatCard 
          title="Compliance Score" 
          value="82%" 
          description="Network-wide average" 
          icon={<CheckCircle />}
          trend={5}
          trendDescription="vs. last quarter"
        />
        <StatCard 
          title="Open Risks" 
          value="17" 
          description="Requiring attention" 
          icon={<AlertTriangle />}
          trend={-12}
          trendDescription="vs. last quarter"
        />
        <StatCard 
          title="Avg. Resolution Time" 
          value="9.2 days" 
          description="For critical issues" 
          icon={<Clock />}
          trend={-22}
          trendDescription="vs. last quarter"
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <OverviewChart />
        <div className="space-y-6">
          <ComplianceAlerts />
          <SdgProgress />
        </div>
        <PartnerActivity />
      </div>
    </div>
  );
};

export default Dashboard;
