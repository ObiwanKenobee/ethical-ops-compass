
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const complianceData = [
  { month: "Jan", Score: 65, Target: 70 },
  { month: "Feb", Score: 68, Target: 70 },
  { month: "Mar", Score: 72, Target: 75 },
  { month: "Apr", Score: 75, Target: 75 },
  { month: "May", Score: 73, Target: 80 },
  { month: "Jun", Score: 78, Target: 80 },
  { month: "Jul", Score: 82, Target: 85 },
  { month: "Aug", Score: 85, Target: 85 },
  { month: "Sep", Score: 87, Target: 90 },
];

const riskData = [
  { month: "Jan", "High Risk": 8, "Medium Risk": 14, "Low Risk": 45 },
  { month: "Feb", "High Risk": 7, "Medium Risk": 16, "Low Risk": 50 },
  { month: "Mar", "High Risk": 5, "Medium Risk": 18, "Low Risk": 55 },
  { month: "Apr", "High Risk": 6, "Medium Risk": 15, "Low Risk": 60 },
  { month: "May", "High Risk": 4, "Medium Risk": 13, "Low Risk": 65 },
  { month: "Jun", "High Risk": 5, "Medium Risk": 10, "Low Risk": 70 },
  { month: "Jul", "High Risk": 3, "Medium Risk": 9, "Low Risk": 76 },
  { month: "Aug", "High Risk": 2, "Medium Risk": 8, "Low Risk": 80 },
  { month: "Sep", "High Risk": 1, "Medium Risk": 7, "Low Risk": 83 },
];

export const OverviewChart = () => {
  const [chartTab, setChartTab] = useState("compliance");

  return (
    <Card className="col-span-2">
      <CardHeader className="pb-3">
        <CardTitle>Performance Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={chartTab} onValueChange={setChartTab}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="compliance">Compliance Score</TabsTrigger>
            <TabsTrigger value="risk">Risk Distribution</TabsTrigger>
          </TabsList>
          <TabsContent value="compliance" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={complianceData}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34A853" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#34A853" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} domain={[50, 100]} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="Score"
                  stroke="#34A853"
                  fillOpacity={1}
                  fill="url(#colorScore)"
                />
                <Area
                  type="monotone"
                  dataKey="Target"
                  stroke="#4285F4"
                  strokeDasharray="3 3"
                  fill="none"
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="risk" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={riskData}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="High Risk"
                  stackId="1"
                  stroke="#EA4335"
                  fill="#EA4335"
                />
                <Area
                  type="monotone"
                  dataKey="Medium Risk"
                  stackId="1"
                  stroke="#F9AB00"
                  fill="#F9AB00"
                />
                <Area
                  type="monotone"
                  dataKey="Low Risk"
                  stackId="1"
                  stroke="#34A853"
                  fill="#34A853"
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
