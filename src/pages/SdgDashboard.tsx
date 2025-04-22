
import { Globe } from "lucide-react";

const SdgDashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">SDG Contribution Dashboard</h1>
          <p className="text-muted-foreground">Track your contribution to UN Sustainable Development Goals.</p>
        </div>
      </div>
      
      <div className="border rounded-lg p-10 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">UN SDG Alignment Engine</h2>
          <p className="text-gray-500 mb-6">This module is under development and will be available soon.</p>
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                <Globe className="h-6 w-6 text-blue-600" />
              </div>
              <span className="font-medium">Explore SDG Impact</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SdgDashboard;
