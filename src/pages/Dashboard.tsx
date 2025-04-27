import { useState } from "react";
import { DashboardMetrics } from "@/components/dashboard/DashboardMetrics";
import { OverviewChart } from "@/components/dashboard/OverviewChart";
import { ComplianceAlerts } from "@/components/dashboard/ComplianceAlerts";
import { PartnerActivity } from "@/components/dashboard/PartnerActivity";
import { SdgProgress } from "@/components/dashboard/SdgProgress";
import { RiskDistributionChart } from "@/components/dashboard/RiskDistributionChart";
import { TopPartners } from "@/components/dashboard/TopPartners";
import { RecentInitiatives } from "@/components/dashboard/RecentInitiatives";
import { UpcomingAssessments } from "@/components/dashboard/UpcomingAssessments";
import { CrudTable } from "@/components/common/CrudTable";
import { CrudModal } from "@/components/common/CrudModal";
import { CrudForm } from "@/components/common/CrudForm";
import { dataService } from "@/services/mockDataService";
import { useToast } from "@/hooks/use-toast";
import { Partner } from "@/types";
import { Badge } from "@/components/ui/badge";
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

const Dashboard = () => {
  const [partners, setPartners] = useState<Partner[]>(dataService.getAll<Partner>('partners'));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentPartner, setCurrentPartner] = useState<Partner | null>(null);
  const { toast } = useToast();

  const handleCreatePartner = () => {
    setCurrentPartner(null);
    setIsModalOpen(true);
  };

  const handleEditPartner = (partner: Partner) => {
    setCurrentPartner(partner);
    setIsModalOpen(true);
  };

  const handleDeletePartner = (partner: Partner) => {
    setCurrentPartner(partner);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (currentPartner) {
      const success = dataService.delete('partners', currentPartner.id);
      if (success) {
        setPartners(dataService.getAll<Partner>('partners'));
        toast({
          title: "Partner deleted",
          description: `${currentPartner.name} has been removed from your partners.`,
        });
      }
    }
    setIsDeleteDialogOpen(false);
  };

  const handleFormSubmit = (data: Partner) => {
    if (currentPartner) {
      const updated = dataService.update<Partner>('partners', currentPartner.id, data);
      if (updated) {
        setPartners(dataService.getAll<Partner>('partners'));
        toast({
          title: "Partner updated",
          description: `${updated.name} has been updated successfully.`,
        });
      }
    } else {
      const newPartner = dataService.create<Partner>('partners', data);
      setPartners(dataService.getAll<Partner>('partners'));
      toast({
        title: "Partner created",
        description: `${newPartner.name} has been added to your partners.`,
      });
    }
    setIsModalOpen(false);
  };

  const renderRiskLevel = (value: string) => {
    switch (value) {
      case 'low':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Low</Badge>;
      case 'medium':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Medium</Badge>;
      case 'high':
        return <Badge className="bg-red-100 text-red-800 border-red-200">High</Badge>;
      default:
        return value;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()} • <a href="#" className="text-primary hover:underline">Refresh Data</a>
        </div>
      </div>
      
      <DashboardMetrics />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <OverviewChart />
        <div className="space-y-6">
          <ComplianceAlerts />
          <SdgProgress />
        </div>
        <PartnerActivity />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <RecentInitiatives />
        <UpcomingAssessments />
        <RiskDistributionChart />
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <CrudTable
            title="Partner Management"
            columns={[
              { key: 'name', title: 'Partner Name', sortable: true },
              { key: 'country', title: 'Country', sortable: true },
              { key: 'industry', title: 'Industry', sortable: true },
              { key: 'complianceScore', title: 'Compliance', 
                render: (value) => `${value}%`,
                sortable: true
              },
              { key: 'riskLevel', title: 'Risk Level', 
                render: renderRiskLevel,
                sortable: true
              },
            ]}
            data={partners}
            filterPlaceholder="Search partners..."
            onCreateClick={handleCreatePartner}
            onEditClick={handleEditPartner}
            onDeleteClick={handleDeletePartner}
            onViewClick={(partner) => {
              toast({
                title: "Partner details",
                description: `Viewing details for ${partner.name}`,
              });
            }}
          />
        </div>
        <div>
          <TopPartners />
        </div>
      </div>

      <CrudModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentPartner ? `Edit Partner: ${currentPartner.name}` : "Add New Partner"}
      >
        <CrudForm
          title=""
          fields={[
            {
              name: 'name',
              label: 'Partner Name',
              type: 'text',
              placeholder: 'Enter partner name',
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
              name: 'industry',
              label: 'Industry',
              type: 'text',
              placeholder: 'Enter industry',
              validation: { required: true }
            },
            {
              name: 'complianceScore',
              label: 'Compliance Score',
              type: 'number',
              validation: { 
                required: true,
                min: 0,
                max: 100
              }
            },
            {
              name: 'status',
              label: 'Status',
              type: 'select',
              options: [
                { value: 'active', label: 'Active' },
                { value: 'pending', label: 'Pending' },
                { value: 'suspended', label: 'Suspended' },
              ],
              validation: { required: true }
            },
            {
              name: 'riskLevel',
              label: 'Risk Level',
              type: 'select',
              options: [
                { value: 'low', label: 'Low' },
                { value: 'medium', label: 'Medium' },
                { value: 'high', label: 'High' },
              ],
              validation: { required: true }
            },
            {
              name: 'website',
              label: 'Website URL',
              type: 'text',
              placeholder: 'Enter website URL'
            },
            {
              name: 'contactEmail',
              label: 'Contact Email',
              type: 'email',
              placeholder: 'Enter contact email'
            },
            {
              name: 'contactName',
              label: 'Contact Name',
              type: 'text',
              placeholder: 'Enter contact name'
            }
          ]}
          defaultValues={currentPartner || {}}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </CrudModal>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the partner
              and all associated data.
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

export default Dashboard;
