
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash, Upload } from "lucide-react";

interface Supplier {
  id: number;
  name: string;
  country: string;
  tier: string;
  product: string;
}

const countries = [
  "China", "India", "Vietnam", "United States", "Bangladesh", 
  "Indonesia", "Brazil", "Mexico", "Thailand", "Malaysia"
];

export interface SupplyChainStepProps {
  onNext: () => void;
  onBack: () => void;
}

export const SupplyChainStep = ({ onNext, onBack }: SupplyChainStepProps) => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    { id: 1, name: "", country: "", tier: "", product: "" }
  ]);
  
  const addSupplier = () => {
    const newId = suppliers.length > 0 ? Math.max(...suppliers.map(s => s.id)) + 1 : 1;
    setSuppliers([...suppliers, { id: newId, name: "", country: "", tier: "", product: "" }]);
  };
  
  const removeSupplier = (id: number) => {
    if (suppliers.length > 1) {
      setSuppliers(suppliers.filter(s => s.id !== id));
    }
  };
  
  const updateSupplier = (id: number, field: keyof Supplier, value: string) => {
    setSuppliers(suppliers.map(supplier => 
      supplier.id === id ? { ...supplier, [field]: value } : supplier
    ));
  };
  
  const isValid = () => {
    return suppliers.every(s => s.name && s.country && s.tier && s.product);
  };
  
  return (
    <div className="space-y-6 py-4">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Supply Chain Declaration</h2>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2 text-xs"
            onClick={() => {}}
          >
            <Upload className="h-3.5 w-3.5" />
            Import CSV
          </Button>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          Add key suppliers in your supply chain. This helps us map risks and compliance requirements.
        </p>
        
        <div className="space-y-4">
          {suppliers.map((supplier, index) => (
            <div key={supplier.id} className="p-4 border border-gray-200 rounded-md">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">Supplier {index + 1}</h3>
                {suppliers.length > 1 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeSupplier(supplier.id)}
                    className="h-8 text-destructive hover:text-destructive/80 hover:bg-destructive/10 p-2"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Supplier Name</label>
                  <Input 
                    value={supplier.name}
                    onChange={(e) => updateSupplier(supplier.id, "name", e.target.value)}
                    placeholder="Enter supplier name"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Country</label>
                  <Select
                    value={supplier.country}
                    onValueChange={(value) => updateSupplier(supplier.id, "country", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Supplier Tier</label>
                  <Select
                    value={supplier.tier}
                    onValueChange={(value) => updateSupplier(supplier.id, "tier", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select tier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tier1">Tier 1 (Direct)</SelectItem>
                      <SelectItem value="tier2">Tier 2</SelectItem>
                      <SelectItem value="tier3">Tier 3 or beyond</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Materials/Products</label>
                  <Textarea 
                    value={supplier.product}
                    onChange={(e) => updateSupplier(supplier.id, "product", e.target.value)}
                    placeholder="Enter materials or products"
                    className="mt-1 min-h-[80px]"
                  />
                </div>
              </div>
            </div>
          ))}
          
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2"
            onClick={addSupplier}
          >
            <Plus className="h-4 w-4" />
            Add Another Supplier
          </Button>
        </div>
      </div>
      
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} disabled={!isValid()}>
          Generate Compliance Report
        </Button>
      </div>
    </div>
  );
};
