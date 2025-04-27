
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CaseStudies = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Case Studies & Benchmarks</h1>
          <p className="text-muted-foreground">Learn from industry peers and compare performance metrics.</p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Case Studies Library</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500 py-8">
            This page will include a filterable list of case studies by region, industry, and risk level, 
            with options to save templates for similar partners and compare against industry averages.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CaseStudies;
