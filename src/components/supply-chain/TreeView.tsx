
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, ChevronRight, ChevronDown, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface SupplyChainNode {
  id: string;
  name: string;
  country: string;
  status: "compliant" | "at-risk" | "non-compliant";
  documentStatus: "complete" | "partial" | "missing";
  expanded?: boolean;
  children?: SupplyChainNode[];
}

const initialData: SupplyChainNode[] = [
  {
    id: "company-1",
    name: "Your Organization",
    country: "United States",
    status: "compliant",
    documentStatus: "complete",
    expanded: true,
    children: [
      {
        id: "supplier-1",
        name: "Global Fabrics Ltd.",
        country: "Vietnam",
        status: "at-risk",
        documentStatus: "partial",
        children: [
          {
            id: "sub-supplier-1",
            name: "Raw Cotton Provider",
            country: "India",
            status: "non-compliant",
            documentStatus: "missing",
          },
          {
            id: "sub-supplier-2",
            name: "Dyeing Factory",
            country: "Bangladesh",
            status: "at-risk",
            documentStatus: "partial",
          }
        ]
      },
      {
        id: "supplier-2",
        name: "Eco Packaging Solutions",
        country: "Germany",
        status: "compliant",
        documentStatus: "complete",
        children: [
          {
            id: "sub-supplier-3",
            name: "Recycled Paper Mill",
            country: "Finland",
            status: "compliant",
            documentStatus: "complete",
          }
        ]
      },
      {
        id: "supplier-3",
        name: "FastShip Logistics",
        country: "Singapore",
        status: "compliant",
        documentStatus: "complete",
      }
    ]
  }
];

export const TreeView = () => {
  const [treeData, setTreeData] = useState<SupplyChainNode[]>(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  
  const toggleNode = (id: string) => {
    const toggleNodeRecursive = (nodes: SupplyChainNode[]): SupplyChainNode[] => {
      return nodes.map(node => {
        if (node.id === id) {
          return { ...node, expanded: !node.expanded };
        }
        if (node.children) {
          return {
            ...node,
            children: toggleNodeRecursive(node.children)
          };
        }
        return node;
      });
    };
    
    setTreeData(toggleNodeRecursive(treeData));
  };
  
  const renderStatusIcon = (status: SupplyChainNode["status"]) => {
    switch (status) {
      case "compliant":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "at-risk":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "non-compliant":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
    }
  };
  
  const renderDocumentStatus = (status: SupplyChainNode["documentStatus"]) => {
    switch (status) {
      case "complete":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Complete</Badge>;
      case "partial":
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Partial</Badge>;
      case "missing":
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Missing</Badge>;
    }
  };
  
  const renderTreeNodes = (nodes: SupplyChainNode[], level = 0) => {
    return nodes.map(node => {
      const hasChildren = node.children && node.children.length > 0;
      const isExpanded = node.expanded;
      
      return (
        <div key={node.id}>
          <div 
            className={cn(
              "flex items-center p-2 rounded-md my-1 hover:bg-gray-50",
              level === 0 ? "bg-gray-50" : ""
            )}
            style={{ paddingLeft: `${level * 24 + 8}px` }}
          >
            {hasChildren ? (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => toggleNode(node.id)}
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            ) : (
              <div className="w-6"></div>
            )}
            
            <div className="flex-1 flex items-center ml-2">
              <div className="mr-2">{renderStatusIcon(node.status)}</div>
              <div>
                <p className="font-medium">{node.name}</p>
                <p className="text-xs text-gray-500">{node.country}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {renderDocumentStatus(node.documentStatus)}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Info className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuItem>Request Documents</DropdownMenuItem>
                  <DropdownMenuItem>Risk Assessment</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {hasChildren && isExpanded && renderTreeNodes(node.children!, level + 1)}
        </div>
      );
    });
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>Visual Ethical Chain Mapper</CardTitle>
          <div className="flex items-center">
            <div className="flex items-center mr-4">
              <div className="flex items-center mr-2">
                <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-xs">Compliant</span>
              </div>
              <div className="flex items-center mr-2">
                <AlertTriangle className="h-4 w-4 text-amber-500 mr-1" />
                <span className="text-xs">At Risk</span>
              </div>
              <div className="flex items-center">
                <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-xs">Non-Compliant</span>
              </div>
            </div>
            
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search suppliers..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 h-9 w-[180px]"
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md">
          {renderTreeNodes(treeData)}
        </div>
      </CardContent>
    </Card>
  );
};
