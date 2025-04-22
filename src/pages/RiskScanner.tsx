
import { RiskTable } from "@/components/risk-scanner/RiskTable";

const RiskScanner = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Risk Scanner</h1>
          <p className="text-muted-foreground">Detect and manage ethical and compliance risks in your supply chain.</p>
        </div>
      </div>
      
      <RiskTable />
    </div>
  );
};

export default RiskScanner;
