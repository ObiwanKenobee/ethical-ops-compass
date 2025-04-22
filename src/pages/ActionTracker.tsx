import { useState } from "react";
import { AlertTriangle, Check, Clock } from "lucide-react";
import { Action } from "@/types";
import { dataService } from "@/services/mockDataService";
import { CrudTable } from "@/components/common/CrudTable";
import { CrudModal } from "@/components/common/CrudModal";
import { CrudForm } from "@/components/common/CrudForm";
import { Badge } from "@/components/ui/badge";
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

const ActionTracker = () => {
  const [actions, setActions] = useState<Action[]>(dataService.getAll<Action>('actions'));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState<Action | null>(null);
  const { toast } = useToast();
  const partners = dataService.getAll('partners');
  const risks = dataService.getAll('risks');

  const handleCreateAction = () => {
    setCurrentAction(null);
    setIsModalOpen(true);
  };

  const handleEditAction = (action: Action) => {
    setCurrentAction(action);
    setIsModalOpen(true);
  };

  const handleDeleteAction = (action: Action) => {
    setCurrentAction(action);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (currentAction) {
      const success = dataService.delete('actions', currentAction.id);
      if (success) {
        setActions(dataService.getAll<Action>('actions'));
        toast({
          title: "Action deleted",
          description: `Action "${currentAction.title}" has been removed.`,
        });
      }
    }
    setIsDeleteDialogOpen(false);
  };

  const handleFormSubmit = (data: Action) => {
    // If a partner ID is provided, get the partner name to display
    if (data.partnerId) {
      const partner = dataService.getById('partners', data.partnerId);
      if (partner && 'name' in partner) {
        data.partnerName = partner.name as string;
      }
    }
    
    if (currentAction) {
      // Update existing action
      const updated = dataService.update<Action>('actions', currentAction.id, data);
      if (updated) {
        setActions(dataService.getAll<Action>('actions'));
        toast({
          title: "Action updated",
          description: `Action "${updated.title}" has been updated successfully.`,
        });
      }
    } else {
      // Create new action
      const newAction = dataService.create<Action>('actions', data);
      setActions(dataService.getAll<Action>('actions'));
      toast({
        title: "Action created",
        description: `New action "${newAction.title}" has been added.`,
      });
    }
    setIsModalOpen(false);
  };

  const renderStatusBadge = (value: string) => {
    switch (value) {
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Pending</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">In Progress</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>;
      case 'canceled':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Canceled</Badge>;
      default:
        return value;
    }
  };

  const renderPriorityBadge = (value: string) => {
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
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Action Tracker</h1>
          <p className="text-muted-foreground">Manage remediation actions and ensure accountability.</p>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm">
          <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
            <Clock className="h-6 w-6 text-amber-600" />
          </div>
          <h3 className="text-lg font-medium mb-2">Pending Tasks</h3>
          <p className="text-3xl font-bold">{actions.filter(a => a.status === 'pending').length}</p>
        </div>
        
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            <AlertTriangle className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-medium mb-2">In Progress</h3>
          <p className="text-3xl font-bold">{actions.filter(a => a.status === 'in-progress').length}</p>
        </div>
        
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm">
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-lg font-medium mb-2">Completed</h3>
          <p className="text-3xl font-bold">{actions.filter(a => a.status === 'completed').length}</p>
        </div>
      </div>

      <CrudTable
        title="Action Items"
        columns={[
          { key: 'title', title: 'Action Title', sortable: true },
          { key: 'partnerName', title: 'Partner', sortable: true },
          { 
            key: 'priority', 
            title: 'Priority', 
            render: renderPriorityBadge,
            sortable: true 
          },
          { 
            key: 'status', 
            title: 'Status', 
            render: renderStatusBadge,
            sortable: true 
          },
          { 
            key: 'dueDate', 
            title: 'Due Date', 
            render: (value) => new Date(value).toLocaleDateString(),
            sortable: true 
          },
          { key: 'assignedTo', title: 'Assigned To' },
        ]}
        data={actions}
        filterPlaceholder="Search actions..."
        onCreateClick={handleCreateAction}
        onEditClick={handleEditAction}
        onDeleteClick={handleDeleteAction}
      />

      <CrudModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentAction ? `Edit Action: ${currentAction.title}` : "Add New Action"}
      >
        <CrudForm
          title=""
          fields={[
            {
              name: 'title',
              label: 'Action Title',
              type: 'text',
              placeholder: 'Enter action title',
              validation: { required: true }
            },
            {
              name: 'description',
              label: 'Description',
              type: 'textarea',
              placeholder: 'Enter action description',
              validation: { required: true }
            },
            {
              name: 'status',
              label: 'Status',
              type: 'select',
              options: [
                { value: 'pending', label: 'Pending' },
                { value: 'in-progress', label: 'In Progress' },
                { value: 'completed', label: 'Completed' },
                { value: 'canceled', label: 'Canceled' },
              ],
              validation: { required: true }
            },
            {
              name: 'priority',
              label: 'Priority',
              type: 'select',
              options: [
                { value: 'low', label: 'Low' },
                { value: 'medium', label: 'Medium' },
                { value: 'high', label: 'High' },
              ],
              validation: { required: true }
            },
            {
              name: 'dueDate',
              label: 'Due Date',
              type: 'date',
              validation: { required: true }
            },
            {
              name: 'assignedTo',
              label: 'Assigned To',
              type: 'text',
              placeholder: 'Enter assignee name'
            },
            {
              name: 'partnerId',
              label: 'Associated Partner',
              type: 'select',
              options: partners.map((partner: any) => ({
                value: partner.id,
                label: partner.name
              })),
              validation: { required: true }
            },
            {
              name: 'relatedRiskId',
              label: 'Related Risk',
              type: 'select',
              options: [
                { value: '', label: 'None' },
                ...risks.map((risk: any) => ({
                  value: risk.id,
                  label: `${risk.riskType} - ${risk.partnerName}`
                }))
              ]
            }
          ]}
          defaultValues={currentAction || {}}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </CrudModal>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Action Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this action? This action cannot be undone.
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

export default ActionTracker;
