
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, Factory } from "lucide-react";

const regions = [
  { value: "europe", label: "Europe (EU)" },
  { value: "northamerica", label: "North America" },
  { value: "asiapacific", label: "Asia Pacific" },
  { value: "latinamerica", label: "Latin America" },
  { value: "africa", label: "Africa & Middle East" },
];

const industries = [
  { value: "apparel", label: "Apparel & Textiles" },
  { value: "electronics", label: "Electronics & Technology" },
  { value: "food", label: "Food & Agriculture" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "retail", label: "Retail & Consumer Goods" },
  { value: "transportation", label: "Transportation & Logistics" },
  { value: "construction", label: "Construction & Materials" },
  { value: "healthcare", label: "Healthcare & Pharmaceuticals" },
];

export interface RegionIndustryStepProps {
  region: string;
  industry: string;
  onNext: () => void;
  onChange: (data: { region?: string; industry?: string }) => void;
}

export const RegionIndustryStep = ({ region, industry, onNext, onChange }: RegionIndustryStepProps) => {
  const handleRegionChange = (value: string) => {
    onChange({ region: value });
  };

  const handleIndustryChange = (value: string) => {
    onChange({ industry: value });
  };
  
  return (
    <div className="space-y-6 py-4">
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Globe className="h-5 w-5 text-primary" />
          <Label className="text-lg font-medium">Select Your Primary Region</Label>
        </div>
        <p className="text-sm text-gray-500 mb-2">
          Choose the region where most of your operations take place. This will determine applicable regulations.
        </p>
        <Select value={region} onValueChange={handleRegionChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a region" />
          </SelectTrigger>
          <SelectContent>
            {regions.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Factory className="h-5 w-5 text-primary" />
          <Label className="text-lg font-medium">Select Your Industry</Label>
        </div>
        <p className="text-sm text-gray-500 mb-2">
          Choose your primary industry. We'll customize compliance requirements accordingly.
        </p>
        <Select value={industry} onValueChange={handleIndustryChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select an industry" />
          </SelectTrigger>
          <SelectContent>
            {industries.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex justify-center pt-6">
        <Button
          onClick={onNext}
          disabled={!region || !industry}
          className="w-full md:w-auto"
        >
          Continue to Legal Requirements
        </Button>
      </div>
    </div>
  );
};
