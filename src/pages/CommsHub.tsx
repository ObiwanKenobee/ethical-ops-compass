
import { useState } from "react";
import { MessageSquare, SendIcon, Clock, CheckCircle } from "lucide-react";
import { Communication } from "@/types";
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

const CommsHub = () => {
  // Initialize with an empty array since we don't have mock communications yet
  const [communications, setCommunications] = useState<Communication[]>(
    dataService.getAll<Communication>('communications')
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentCommunication, setCurrentCommunication] = useState<Communication | null>(null);
  const { toast } = useToast();

  const partners = dataService.getAll('partners');
  
  const handleCreateCommunication = () => {
    setCurrentCommunication(null);
    setIsModalOpen(true);
  };

  const handleEditCommunication = (communication: Communication) => {
    setCurrentCommunication(communication);
    setIsModalOpen(true);
  };

  const handleDeleteCommunication = (communication: Communication) => {
    setCurrentCommunication(communication);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (currentCommunication) {
      const success = dataService.delete('communications', currentCommunication.id);
      if (success) {
        setCommunications(dataService.getAll<Communication>('communications'));
        toast({
          title: "Communication deleted",
          description: `"${currentCommunication.title}" has been removed.`,
        });
      }
    }
    setIsDeleteDialogOpen(false);
  };

  const handleFormSubmit = (data: Communication) => {
    if (currentCommunication) {
      // Update existing communication
      const updated = dataService.update<Communication>('communications', currentCommunication.id, data);
      if (updated) {
        setCommunications(dataService.getAll<Communication>('communications'));
        toast({
          title: "Communication updated",
          description: `"${updated.title}" has been updated successfully.`,
        });
      }
    } else {
      // Create new communication
      const newCommunication = dataService.create<Communication>('communications', data);
      setCommunications(dataService.getAll<Communication>('communications'));
      toast({
        title: "Communication created",
        description: `"${newCommunication.title}" has been created.`,
      });
    }
    setIsModalOpen(false);
  };

  const renderStatusBadge = (value: string) => {
    switch (value) {
      case 'sent':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Sent</Badge>;
      case 'draft':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Draft</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Scheduled</Badge>;
      default:
        return value;
    }
  };

  const renderTypeBadge = (value: string) => {
    switch (value) {
      case 'message':
        return <Badge className="bg-purple-100 text-purple-800 border-purple-200">Message</Badge>;
      case 'notification':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Notification</Badge>;
      case 'alert':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Alert</Badge>;
      default:
        return value;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Communications Hub</h1>
          <p className="text-muted-foreground">Partner communication and notification center.</p>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm">
          <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
            <MessageSquare className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-medium mb-2">Messages</h3>
          <p className="text-3xl font-bold">{communications.filter(c => c.type === 'message').length}</p>
        </div>
        
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            <SendIcon className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-medium mb-2">Notifications</h3>
          <p className="text-3xl font-bold">{communications.filter(c => c.type === 'notification').length}</p>
        </div>
        
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm">
          <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
            <Clock className="h-6 w-6 text-amber-600" />
          </div>
          <h3 className="text-lg font-medium mb-2">Scheduled</h3>
          <p className="text-3xl font-bold">{communications.filter(c => c.status === 'scheduled').length}</p>
        </div>
      </div>

      <CrudTable
        title="Communication Management"
        columns={[
          { key: 'title', title: 'Title', sortable: true },
          { 
            key: 'type', 
            title: 'Type', 
            render: renderTypeBadge,
            sortable: true 
          },
          { 
            key: 'status', 
            title: 'Status', 
            render: renderStatusBadge,
            sortable: true 
          },
          { 
            key: 'sendDate', 
            title: 'Send Date', 
            render: (value) => new Date(value).toLocaleDateString(),
            sortable: true 
          },
          { key: 'sender', title: 'Sender' },
          { 
            key: 'recipients', 
            title: 'Recipients', 
            render: (value) => value && value.length ? `${value.length} recipient(s)` : '0' 
          },
        ]}
        data={communications}
        filterPlaceholder="Search communications..."
        onCreateClick={handleCreateCommunication}
        onEditClick={handleEditCommunication}
        onDeleteClick={handleDeleteCommunication}
      />

      <CrudModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentCommunication ? `Edit Communication: ${currentCommunication.title}` : "Create New Communication"}
      >
        <CrudForm
          title=""
          fields={[
            {
              name: 'title',
              label: 'Title',
              type: 'text',
              placeholder: 'Enter communication title',
              validation: { required: true }
            },
            {
              name: 'content',
              label: 'Content',
              type: 'textarea',
              placeholder: 'Enter communication content',
              validation: { required: true }
            },
            {
              name: 'type',
              label: 'Type',
              type: 'select',
              options: [
                { value: 'message', label: 'Message' },
                { value: 'notification', label: 'Notification' },
                { value: 'alert', label: 'Alert' },
              ],
              validation: { required: true }
            },
            {
              name: 'status',
              label: 'Status',
              type: 'select',
              options: [
                { value: 'draft', label: 'Draft' },
                { value: 'scheduled', label: 'Scheduled' },
                { value: 'sent', label: 'Sent' },
              ],
              validation: { required: true }
            },
            {
              name: 'sendDate',
              label: 'Send Date',
              type: 'date',
              validation: { required: true }
            },
            {
              name: 'sender',
              label: 'Sender',
              type: 'text',
              placeholder: 'Enter sender name',
              validation: { required: true }
            }
          ]}
          defaultValues={currentCommunication || {
            recipients: [],
            readBy: []
          }}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </CrudModal>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this communication? This action cannot be undone.
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

export default CommsHub;
