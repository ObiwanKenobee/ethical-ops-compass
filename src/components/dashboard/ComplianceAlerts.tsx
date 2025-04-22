
import { AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Alert {
  id: string;
  title: string;
  severity: "high" | "medium" | "low";
  timestamp: string;
  partner: string;
}

const alerts: Alert[] = [
  {
    id: "1",
    title: "Missing labor documentation",
    severity: "high",
    timestamp: "2 hours ago",
    partner: "Global Fabrics Ltd."
  },
  {
    id: "2",
    title: "Compliance certificate expired",
    severity: "medium",
    timestamp: "5 hours ago",
    partner: "Sustainable Materials Inc."
  },
  {
    id: "3",
    title: "Regional law update pending",
    severity: "medium",
    timestamp: "1 day ago",
    partner: "Eco Packaging Solutions"
  },
  {
    id: "4",
    title: "Environmental audit overdue",
    severity: "low",
    timestamp: "2 days ago",
    partner: "Green Transport Co."
  }
];

export const ComplianceAlerts = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-md font-medium">Recent Alerts</CardTitle>
        <AlertTriangle className="h-5 w-5 text-amber-500" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0"
            >
              <div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant="outline"
                    className={
                      alert.severity === "high"
                        ? "bg-red-100 text-red-800 hover:bg-red-100 border-red-200"
                        : alert.severity === "medium"
                        ? "bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200"
                        : "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
                    }
                  >
                    {alert.severity}
                  </Badge>
                  <h4 className="text-sm font-medium">{alert.title}</h4>
                </div>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-gray-500">{alert.partner}</span>
                  <span className="text-xs text-gray-400 mx-1">•</span>
                  <span className="text-xs text-gray-500">{alert.timestamp}</span>
                </div>
              </div>
              <button className="text-xs text-primary hover:underline">View</button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
