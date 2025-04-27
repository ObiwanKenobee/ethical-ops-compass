
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CommsHub = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Communications Hub</h1>
          <p className="text-muted-foreground">Centralized platform for partner communications and document exchange.</p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Communications Center</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500 py-8">
            Communications Hub will include chat rooms, auto-alerts, and a compliance document archive organized by region.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommsHub;
