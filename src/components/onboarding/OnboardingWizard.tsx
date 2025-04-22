
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RegionIndustryStep } from "./RegionIndustryStep";
import { LegalRequirementsStep } from "./LegalRequirementsStep";
import { SupplyChainStep } from "./SupplyChainStep";
import { ReportStep } from "./ReportStep";
import { Check } from "lucide-react";
import { toast } from "sonner";

const steps = [
  { id: 1, name: "Region & Industry" },
  { id: 2, name: "Legal Requirements" },
  { id: 3, name: "Supply Chain Declaration" },
  { id: 4, name: "Generated Report" },
];

export const OnboardingWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  
  const progress = Math.round((currentStep / steps.length) * 100);
  
  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      toast.success("Step completed successfully!");
    }
  };
  
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <RegionIndustryStep onNext={handleNext} />;
      case 2:
        return <LegalRequirementsStep onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <SupplyChainStep onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <ReportStep onBack={handleBack} />;
      default:
        return null;
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-none shadow-md">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl">Ethical Compliance Starter Kit</CardTitle>
          <CardDescription>Complete the steps below to setup compliance for your organization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {steps.map((step) => (
                <div 
                  key={step.id} 
                  className="flex flex-col items-center space-y-1"
                  style={{ width: `${100 / steps.length}%` }}
                >
                  <div 
                    className={`h-8 w-8 rounded-full flex items-center justify-center border-2 ${
                      step.id < currentStep
                        ? "bg-primary border-primary text-white"
                        : step.id === currentStep
                        ? "border-primary text-primary"
                        : "border-gray-300 text-gray-400"
                    }`}
                  >
                    {step.id < currentStep ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <span className={`text-xs ${
                    step.id <= currentStep ? "text-primary font-medium" : "text-gray-500"
                  }`}>
                    {step.name}
                  </span>
                </div>
              ))}
            </div>
            <Progress value={progress} className="h-1" />
          </div>
          
          {renderStep()}
        </CardContent>
      </Card>
    </div>
  );
};
