
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RegionIndustryStep } from "./RegionIndustryStep";
import { SupplyChainStep } from "./SupplyChainStep";
import { LegalRequirementsStep } from "./LegalRequirementsStep";
import { ReportStep } from "./ReportStep";

enum WizardStep {
  RegionIndustry = 0,
  SupplyChain = 1,
  LegalRequirements = 2,
  Report = 3,
  Complete = 4
}

export const OnboardingWizard = () => {
  const [currentStep, setCurrentStep] = useState<WizardStep>(WizardStep.RegionIndustry);
  const [formData, setFormData] = useState({
    region: "",
    industry: "",
    supplierCount: 0,
    supplierRegions: [],
    complianceFrameworks: [],
  });

  const handleNext = () => {
    window.scrollTo(0, 0);
    setCurrentStep(prev => Math.min(prev + 1, WizardStep.Complete));
  };

  const handleBack = () => {
    window.scrollTo(0, 0);
    setCurrentStep(prev => Math.max(prev - 1, WizardStep.RegionIndustry));
  };

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="p-6">
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            {[...Array(4)].map((_, i) => (
              <div 
                key={i} 
                className={`w-1/4 h-2 rounded-full mx-1 ${i <= currentStep ? 'bg-primary' : 'bg-gray-200'}`}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <div>Region & Industry</div>
            <div>Supply Chain</div>
            <div>Legal Requirements</div>
            <div>AI Report</div>
          </div>
        </div>
        
        {currentStep === WizardStep.RegionIndustry && (
          <RegionIndustryStep 
            data={formData}
            onUpdate={updateFormData}
          />
        )}
        
        {currentStep === WizardStep.SupplyChain && (
          <SupplyChainStep
            data={formData}
            onUpdate={updateFormData}
          />
        )}
        
        {currentStep === WizardStep.LegalRequirements && (
          <LegalRequirementsStep
            data={formData}
            onUpdate={updateFormData}
          />
        )}
        
        {currentStep === WizardStep.Report && (
          <ReportStep
            data={formData}
          />
        )}
        
        {currentStep === WizardStep.Complete && (
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold mb-4">Onboarding Complete!</h2>
            <p className="mb-6">Your organization has been successfully onboarded to EthicalOps.</p>
            <Button onClick={() => window.location.href = "/"}>
              Go to Dashboard
            </Button>
          </div>
        )}
        
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === WizardStep.RegionIndustry}
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentStep === WizardStep.Complete}
          >
            {currentStep === WizardStep.Report ? "Complete" : "Next"}
          </Button>
        </div>
      </Card>
    </div>
  );
};
