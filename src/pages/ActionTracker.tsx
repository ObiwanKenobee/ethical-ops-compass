
import { AlertTriangle, Check, Clock } from "lucide-react";

const ActionTracker = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Action Tracker</h1>
          <p className="text-muted-foreground">Manage remediation actions and ensure accountability.</p>
        </div>
      </div>
      
      <div className="border rounded-lg p-10 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Remediation and Escalation Panel</h2>
          <p className="text-gray-500 mb-6">This module is under development and will be available soon.</p>
          <div className="flex items-center justify-center space-x-8">
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mb-2">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
              <span className="font-medium">Assign Actions</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                <AlertTriangle className="h-6 w-6 text-blue-600" />
              </div>
              <span className="font-medium">Escalate Issues</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <span className="font-medium">Track Resolution</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionTracker;
