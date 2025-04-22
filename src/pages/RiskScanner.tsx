import { useState } from "react";
import { Risk } from "@/types";
import { dataService } from "@/services/mockDataService";
import { CrudTable } from "@/components/common/CrudTable";
import { CrudModal } from "@/components/common/CrudModal";
import { CrudForm } from "@/components/common/CrudForm";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const RiskScanner = () => {
  const [risks, setRisks] = useState<Risk[]>(dataService.getAll<Risk>('risks'));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentRisk, setCurrentRisk] = useState<Risk | null>(null);
  const { toast } = useToast();
  const partners = dataService.getAll('partners');

  const handleCreateRisk = () => {
    setCurrentRisk(null);
    setIsModalOpen(true);
  };

  const handleEditRisk = (risk: Risk) => {
    setCurrentRisk(risk);
    setIsModalOpen(true);
  };

  const handleDeleteRisk = (risk: Risk) => {
    setCurrentRisk(risk);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (currentRisk) {
      const success = dataService.delete('risks', currentRisk.id);
      if (success) {
        setRisks(dataService.getAll<Risk>('risks'));
        toast({
          title: "Risk deleted",
          description: `Risk for ${currentRisk.partnerName} has been removed.`,
        });
      }
    }
    setIsDeleteDialogOpen(false);
  };

  const handleFormSubmit = (data: Risk) => {
    // If a partner ID is provided, get the partner name to display
    if (data.partnerId) {
      const partner = dataService.getById('partners', data.partnerId);
      if (partner && 'name' in partner) {
        data.partnerName = partner.name as string;
      }
    }
    
    if (currentRisk) {
      // Update existing risk
      const updated = dataService.update<Risk>('risks', currentRisk.id, data);
      if (updated) {
        setRisks(dataService.getAll<Risk>('risks'));
        toast({
          title: "Risk updated",
          description: `Risk information has been updated successfully.`,
        });
      }
    } else {
      // Create new risk
      const newRisk = dataService.create<Risk>('risks', data);
      setRisks(dataService.getAll<Risk>('risks'));
      toast({
        title: "Risk created",
        description: `New risk has been added to the system.`,
      });
    }
    setIsModalOpen(false);
  };

  const renderSeverityBadge = (value: string) => {
    switch (value) {
      case 'low':
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" /> Low
          </Badge>
        );
      case 'medium':
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
            <AlertTriangle className="h-3 w-3 mr-1" /> Medium
          </Badge>
        );
      case 'high':
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
            <AlertTriangle className="h-3 w-3 mr-1" /> High
          </Badge>
        );
      default:
        return value;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Risk Scanner</h1>
          <p className="text-muted-foreground">Detect and manage ethical and compliance risks in your supply chain.</p>
        </div>
      </div>
      
      <CrudTable
        title="Node Risk Detection Engine"
        columns={[
          { key: 'partnerName', title: 'Partner', sortable: true },
          { key: 'country', title: 'Country', sortable: true },
          { key: 'riskType', title: 'Risk Type', sortable: true },
          { 
            key: 'severity', 
            title: 'Severity', 
            render: renderSeverityBadge,
            sortable: true 
          },
          { key: 'source', title: 'Source' },
          { 
            key: 'detectedDate', 
            title: 'Detected', 
            render: (value) => new Date(value).toLocaleDateString(),
            sortable: true 
          },
          { 
            key: 'status', 
            title: 'Status',
            render: (value) => (
              <Badge variant="outline" className={
                value === 'open' 
                  ? 'bg-red-100 text-red-800 border-red-200'
                  : value === 'in-progress' 
                  ? 'bg-blue-100 text-blue-800 border-blue-200'
                  : 'bg-green-100 text-green-800 border-green-200'
              }>
                {value.charAt(0).toUpperCase() + value.slice(1)}
              </Badge>
            ),
            sortable: true
          },
        ]}
        data={risks}
        filterPlaceholder="Search risks..."
        onCreateClick={handleCreateRisk}
        onEditClick={handleEditRisk}
        onDeleteClick={handleDeleteRisk}
      />

      <CrudModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentRisk ? `Edit Risk: ${currentRisk.riskType}` : "Add New Risk"}
      >
        <CrudForm
          title=""
          fields={[
            {
              name: 'partnerId',
              label: 'Partner',
              type: 'select',
              options: partners.map((partner: any) => ({
                value: partner.id,
                label: partner.name
              })),
              validation: { required: true }
            },
            {
              name: 'country',
              label: 'Country',
              type: 'text',
              placeholder: 'Enter country',
              validation: { required: true }
            },
            {
              name: 'riskType',
              label: 'Risk Type',
              type: 'text',
              placeholder: 'Enter risk type',
              validation: { required: true }
            },
            {
              name: 'severity',
              label: 'Severity',
              type: 'select',
              options: [
                { value: 'low', label: 'Low' },
                { value: 'medium', label: 'Medium' },
                { value: 'high', label: 'High' },
              ],
              validation: { required: true }
            },
            {
              name: 'source',
              label: 'Source',
              type: 'text',
              placeholder: 'Enter source',
              validation: { required: true }
            },
            {
              name: 'detectedDate',
              label: 'Detection Date',
              type: 'date',
              validation: { required: true }
            },
            {
              name: 'status',
              label: 'Status',
              type: 'select',
              options: [
                { value: 'open', label: 'Open' },
                { value: 'in-progress', label: 'In Progress' },
                { value: 'resolved', label: 'Resolved' },
              ],
              validation: { required: true }
            },
            {
              name: 'assignedTo',
              label: 'Assigned To',
              type: 'text',
              placeholder: 'Enter assignee'
            }
          ]}
          defaultValues={currentRisk || {}}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </CrudModal>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Risk Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this risk? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default RiskScanner;
