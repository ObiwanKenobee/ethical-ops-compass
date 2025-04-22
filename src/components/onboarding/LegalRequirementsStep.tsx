
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface Requirement {
  id: string;
  name: string;
  description: string;
}

const requirements: Requirement[] = [
  {
    id: "gdpr",
    name: "GDPR Compliance",
    description: "General Data Protection Regulation for handling personal data",
  },
  {
    id: "msa",
    name: "Modern Slavery Act",
    description: "Statement and policies addressing modern slavery risks",
  },
  {
    id: "ctpat",
    name: "CTPAT Certification",
    description: "Customs Trade Partnership Against Terrorism requirements",
  },
  {
    id: "iso14001",
    name: "ISO 14001",
    description: "Environmental management standards compliance",
  },
  {
    id: "iso45001",
    name: "ISO 45001",
    description: "Occupational health and safety standards compliance",
  },
  {
    id: "fcpa",
    name: "Anti-Corruption (FCPA)",
    description: "Foreign Corrupt Practices Act compliance",
  },
];

interface LegalRequirementsStepProps {
  onNext: () => void;
  onBack: () => void;
}

export const LegalRequirementsStep = ({ onNext, onBack }: LegalRequirementsStepProps) => {
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>([]);
  
  const toggleRequirement = (id: string) => {
    if (selectedRequirements.includes(id)) {
      setSelectedRequirements(selectedRequirements.filter((req) => req !== id));
    } else {
      setSelectedRequirements([...selectedRequirements, id]);
    }
  };
  
  return (
    <div className="space-y-6 py-4">
      <div>
        <h2 className="text-lg font-medium mb-2">Legal Requirements Checklist</h2>
        <p className="text-sm text-gray-500 mb-6">
          Select all compliance requirements that apply to your organization.
        </p>
        
        <div className="space-y-4">
          {requirements.map((requirement) => (
            <div 
              key={requirement.id} 
              className="flex items-start space-x-3 p-3 border border-gray-200 rounded-md hover:bg-gray-50"
              onClick={() => toggleRequirement(requirement.id)}
            >
              <Checkbox 
                id={requirement.id} 
                checked={selectedRequirements.includes(requirement.id)}
                onCheckedChange={() => toggleRequirement(requirement.id)}
              />
              <div>
                <Label htmlFor={requirement.id} className="font-medium cursor-pointer">
                  {requirement.name}
                </Label>
                <p className="text-sm text-gray-500">{requirement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} disabled={selectedRequirements.length === 0}>
          Continue to Supply Chain
        </Button>
      </div>
    </div>
  );
};
