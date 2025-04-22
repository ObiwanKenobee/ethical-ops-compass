
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, Search, Filter, ArrowDown, ArrowUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Risk {
  id: string;
  partner: string;
  country: string;
  riskType: string;
  severity: "high" | "medium" | "low";
  source: string;
  detectedDate: string;
}

const risks: Risk[] = [
  {
    id: "risk-1",
    partner: "Global Fabrics Ltd.",
    country: "Vietnam",
    riskType: "Labor Documentation",
    severity: "high",
    source: "Document Scanner",
    detectedDate: "2025-03-15",
  },
  {
    id: "risk-2",
    partner: "Raw Cotton Provider",
    country: "India",
    riskType: "Child Labor",
    severity: "high",
    source: "News Alert",
    detectedDate: "2025-03-10",
  },
  {
    id: "risk-3",
    partner: "Dyeing Factory",
    country: "Bangladesh",
    riskType: "Environmental Compliance",
    severity: "medium",
    source: "Audit Report",
    detectedDate: "2025-03-05",
  },
  {
    id: "risk-4",
    partner: "FastShip Logistics",
    country: "Singapore",
    riskType: "Carbon Disclosure",
    severity: "low",
    source: "Document Scanner",
    detectedDate: "2025-02-28",
  },
  {
    id: "risk-5",
    partner: "Eco Packaging Solutions",
    country: "Germany",
    riskType: "Certification Expiry",
    severity: "medium",
    source: "System Alert",
    detectedDate: "2025-02-20",
  },
];

export const RiskTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSeverity, setFilterSeverity] = useState<string>("");
  const [sortField, setSortField] = useState<keyof Risk>("detectedDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  
  const handleSort = (field: keyof Risk) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
  
  const filteredRisks = risks.filter(risk => {
    const matchesSearch = 
      risk.partner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      risk.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      risk.riskType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSeverity = filterSeverity ? risk.severity === filterSeverity : true;
    
    return matchesSearch && matchesSeverity;
  });
  
  const sortedRisks = [...filteredRisks].sort((a, b) => {
    if (sortField === "detectedDate") {
      const dateA = new Date(a[sortField]).getTime();
      const dateB = new Date(b[sortField]).getTime();
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    } else {
      const valueA = a[sortField].toString().toLowerCase();
      const valueB = b[sortField].toString().toLowerCase();
      return sortDirection === "asc" 
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }
  });
  
  const renderSeverityBadge = (severity: Risk["severity"]) => {
    switch (severity) {
      case "high":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
            <AlertTriangle className="h-3 w-3 mr-1" /> High
          </Badge>
        );
      case "medium":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
            <AlertTriangle className="h-3 w-3 mr-1" /> Medium
          </Badge>
        );
      case "low":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" /> Low
          </Badge>
        );
    }
  };
  
  const renderSortIcon = (field: keyof Risk) => {
    if (sortField !== field) return null;
    
    return sortDirection === "asc" ? (
      <ArrowUp className="h-4 w-4 ml-1" />
    ) : (
      <ArrowDown className="h-4 w-4 ml-1" />
    );
  };
  
  return (
    <div>
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-semibold">Node Risk Detection Engine</h2>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search risks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 max-w-[240px]"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <Select value={filterSeverity} onValueChange={setFilterSeverity}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="All severities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All severities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort("partner")}
              >
                <div className="flex items-center">
                  Partner {renderSortIcon("partner")}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort("country")}
              >
                <div className="flex items-center">
                  Country {renderSortIcon("country")}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort("riskType")}
              >
                <div className="flex items-center">
                  Risk Type {renderSortIcon("riskType")}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort("severity")}
              >
                <div className="flex items-center">
                  Severity {renderSortIcon("severity")}
                </div>
              </TableHead>
              <TableHead>Source</TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort("detectedDate")}
              >
                <div className="flex items-center">
                  Detected {renderSortIcon("detectedDate")}
                </div>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedRisks.length > 0 ? (
              sortedRisks.map((risk) => (
                <TableRow key={risk.id}>
                  <TableCell className="font-medium">{risk.partner}</TableCell>
                  <TableCell>{risk.country}</TableCell>
                  <TableCell>{risk.riskType}</TableCell>
                  <TableCell>{renderSeverityBadge(risk.severity)}</TableCell>
                  <TableCell>{risk.source}</TableCell>
                  <TableCell>{new Date(risk.detectedDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">Assign Action</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No risks found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
