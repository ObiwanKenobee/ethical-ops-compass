
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardCheck } from "lucide-react";
import { dashboardService } from "@/services/supabaseService";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

// Define a type for our assessment with supplier_name
interface Assessment {
  id: string;
  supplier_id: string;
  assessment_type: string;
  due_date: string;
  status: string;
  supplier_name?: string;
}

export const UpcomingAssessments = () => {
  const { data: assessments, isLoading } = useQuery({
    queryKey: ['upcomingAssessments'],
    queryFn: () => dashboardService.getUpcomingAssessments(),
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-md font-medium">Upcoming Assessments</CardTitle>
          <ClipboardCheck className="h-5 w-5 text-gray-500" />
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

  // Function to determine badge color based on status
  const getBadgeClass = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "active":
        return "bg-green-100 text-green-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "at_risk":
        return "bg-red-100 text-red-800";
      case "suspended":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-md font-medium">Upcoming Assessments</CardTitle>
        <ClipboardCheck className="h-5 w-5 text-gray-500" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {assessments && assessments.length > 0 ? (
            assessments.map((assessment: Assessment) => (
              <div
                key={assessment.id}
                className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium">{assessment.supplier_name || 'Unknown Supplier'}</p>
                  <p className="text-xs text-gray-500">
                    Due: {format(new Date(assessment.due_date), 'MMM d, yyyy')} • {assessment.assessment_type}
                  </p>
                </div>
                <Badge
                  className={getBadgeClass(assessment.status)}
                >
                  {assessment.status.replace('_', ' ')}
                </Badge>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">No upcoming assessments</p>
          )}
          <div className="mt-3 text-center">
            <a href="#" className="text-sm text-primary hover:underline">
              View all assessments
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
