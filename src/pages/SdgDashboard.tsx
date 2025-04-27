
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SdgDashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">SDG Contribution Dashboard</h1>
          <p className="text-muted-foreground">Track and visualize your contributions to Sustainable Development Goals.</p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>SDG Progress Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500 py-8">
            This dashboard will track SDGs 8, 12, and 16 with charts, progress bars, and 
            exportable impact reports in PDF/CSV formats.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SdgDashboard;
