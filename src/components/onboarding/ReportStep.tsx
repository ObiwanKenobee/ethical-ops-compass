
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Download, FileText, ArrowRight, CheckCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface ReportStepProps {
  onBack: () => void;
}

export const ReportStep = ({ onBack }: ReportStepProps) => {
  return (
    <div className="space-y-6 py-4">
      <div className="flex justify-center mb-6">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
          <CheckCircle className="h-8 w-8 text-primary" />
        </div>
      </div>
      
      <h2 className="text-xl font-semibold text-center">Your Compliance Report is Ready!</h2>
      <p className="text-center text-gray-500">
        We've analyzed your inputs and generated a starter compliance report with actionable insights.
      </p>
      
      <Alert className="bg-blue-50 border-blue-200">
        <FileText className="h-5 w-5 text-blue-500" />
        <AlertTitle className="text-blue-700">AI-Generated Report</AlertTitle>
        <AlertDescription className="text-blue-600">
          This report provides an initial assessment based on your inputs. For a comprehensive evaluation, 
          we recommend completing all sections of the platform.
        </AlertDescription>
      </Alert>
      
      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="risks">Key Risks</TabsTrigger>
          <TabsTrigger value="next-steps">Next Steps</TabsTrigger>
        </TabsList>
        <TabsContent value="summary" className="p-4 border rounded-md mt-2">
          <h3 className="font-medium mb-2">Compliance Overview</h3>
          <p className="text-sm text-gray-600">
            Based on your selected region, industry, and supply chain information, your organization 
            faces <strong>medium compliance complexity</strong>. Your suppliers in Vietnam and Malaysia require 
            special attention due to labor rights considerations.
          </p>
          
          <h3 className="font-medium mt-4 mb-2">Regional Requirements</h3>
          <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
            <li>GDPR documentation and data processing agreements</li>
            <li>Modern Slavery Act statement (annual)</li>
            <li>ISO 14001 environmental management certification</li>
          </ul>
        </TabsContent>
        <TabsContent value="risks" className="p-4 border rounded-md mt-2">
          <div className="space-y-4">
            <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded">
              <h3 className="font-medium text-red-700">High Risk: Labor Documentation</h3>
              <p className="text-sm text-red-600">
                Suppliers in Southeast Asia require enhanced labor rights documentation and monitoring.
              </p>
            </div>
            
            <div className="p-3 bg-amber-50 border-l-4 border-amber-500 rounded">
              <h3 className="font-medium text-amber-700">Medium Risk: Environmental Compliance</h3>
              <p className="text-sm text-amber-600">
                Environmental impact assessments needed for manufacturing partners.
              </p>
            </div>
            
            <div className="p-3 bg-amber-50 border-l-4 border-amber-500 rounded">
              <h3 className="font-medium text-amber-700">Medium Risk: Data Protection</h3>
              <p className="text-sm text-amber-600">
                GDPR compliance documentation incomplete for several partners.
              </p>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="next-steps" className="p-4 border rounded-md mt-2">
          <ol className="space-y-4 text-sm text-gray-600">
            <li className="flex gap-3">
              <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-primary text-white font-medium">1</div>
              <div>
                <h3 className="font-medium">Complete Supplier Documentation</h3>
                <p>Gather missing compliance documents from all Tier 1 suppliers within 30 days.</p>
              </div>
            </li>
            
            <li className="flex gap-3">
              <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-primary text-white font-medium">2</div>
              <div>
                <h3 className="font-medium">Establish Risk Monitoring Process</h3>
                <p>Setup regular risk assessment reviews, especially for high-risk regions.</p>
              </div>
            </li>
            
            <li className="flex gap-3">
              <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-primary text-white font-medium">3</div>
              <div>
                <h3 className="font-medium">Create Remediation Plans</h3>
                <p>Develop action plans for addressing identified compliance gaps.</p>
              </div>
            </li>
            
            <li className="flex gap-3">
              <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-primary text-white font-medium">4</div>
              <div>
                <h3 className="font-medium">Schedule Follow-up Assessment</h3>
                <p>Book a detailed compliance review within 90 days to measure progress.</p>
              </div>
            </li>
          </ol>
        </TabsContent>
      </Tabs>
      
      <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
        <Button variant="outline" onClick={onBack}>
          Back to Supply Chain
        </Button>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
          <Button className="flex items-center gap-2">
            Continue to Platform
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
