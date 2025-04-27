
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { dashboardService } from "@/services/supabaseService";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

// Custom colors for the pie chart
const COLORS = ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff', '#ff9f40', '#c9cbcf'];

export const RiskDistributionChart = () => {
  const { data: riskDistribution, isLoading } = useQuery({
    queryKey: ['riskDistribution'],
    queryFn: () => dashboardService.getRiskDistribution(),
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-md font-medium">Risk Distribution</CardTitle>
          <AlertTriangle className="h-5 w-5 text-gray-500" />
        </CardHeader>
        <CardContent className="h-60 flex items-center justify-center">
          <Skeleton className="w-40 h-40 rounded-full" />
        </CardContent>
      </Card>
    );
  }

  // Calculate total risks for percentage
  const totalRisks = riskDistribution?.reduce((sum, item) => sum + item.count, 0) || 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-md font-medium">Risk Distribution</CardTitle>
        <AlertTriangle className="h-5 w-5 text-amber-500" />
      </CardHeader>
      <CardContent>
        <div className="h-60">
          {riskDistribution && riskDistribution.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="count"
                  labelLine={false}
                  label={({ category, count }) => `${category}: ${count}`}
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name, props) => [
                    `Count: ${value} (${((value / totalRisks) * 100).toFixed(1)}%)`, 
                    props.payload.category
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-sm text-gray-500">No risk data available</p>
            </div>
          )}
        </div>
        <div className="mt-3">
          <div className="grid grid-cols-2 gap-2">
            {riskDistribution?.map((item, index) => (
              <div key={`legend-${index}`} className="flex items-center text-xs">
                <div 
                  className="w-3 h-3 mr-1 rounded-full" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }} 
                />
                <span>{item.category}: {item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
