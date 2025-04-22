
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";

const Onboarding = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Org Onboarding</h1>
          <p className="text-muted-foreground">Help new partners comply with regional standards.</p>
        </div>
      </div>
      
      <OnboardingWizard />
    </div>
  );
};

export default Onboarding;
