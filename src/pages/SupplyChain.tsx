
import { TreeView } from "@/components/supply-chain/TreeView";

const SupplyChain = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Supply Chain</h1>
          <p className="text-muted-foreground">Visualize and manage your ethical supply chain network.</p>
        </div>
      </div>
      
      <TreeView />
    </div>
  );
};

export default SupplyChain;
