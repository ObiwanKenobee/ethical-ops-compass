import { useState } from "react";
import { Globe, Target, BarChart, ArrowUp } from "lucide-react";
import { SDGGoal, SDGTarget } from "@/types";
import { dataService } from "@/services/mockDataService";
import { CrudTable } from "@/components/common/CrudTable";
import { CrudModal } from "@/components/common/CrudModal";
import { CrudForm } from "@/components/common/CrudForm";
import { Progress } from "@/components/ui/progress";
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

const SdgDashboard = () => {
  const [sdgGoals, setSdgGoals] = useState<SDGGoal[]>(
    dataService.getAll<SDGGoal>('sdgGoals')
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentGoal, setCurrentGoal] = useState<SDGGoal | null>(null);
  const { toast } = useToast();

  const handleCreateGoal = () => {
    setCurrentGoal(null);
    setIsModalOpen(true);
  };

  const handleEditGoal = (goal: SDGGoal) => {
    setCurrentGoal(goal);
    setIsModalOpen(true);
  };

  const handleDeleteGoal = (goal: SDGGoal) => {
    setCurrentGoal(goal);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (currentGoal) {
      const success = dataService.delete('sdgGoals', currentGoal.id);
      if (success) {
        setSdgGoals(dataService.getAll<SDGGoal>('sdgGoals'));
        toast({
          title: "SDG Goal deleted",
          description: `Goal ${currentGoal.number}: ${currentGoal.title} has been removed.`,
        });
      }
    }
    setIsDeleteDialogOpen(false);
  };

  const handleFormSubmit = (data: SDGGoal) => {
    const processedData = {
      ...data,
      targets: data.targets || [],
      number: Number(data.number),
      progress: Number(data.progress),
    };
    
    if (currentGoal) {
      const updated = dataService.update<SDGGoal>('sdgGoals', currentGoal.id, processedData);
      if (updated) {
        setSdgGoals(dataService.getAll<SDGGoal>('sdgGoals'));
        toast({
          title: "SDG Goal updated",
          description: `Goal ${updated.number}: ${updated.title} has been updated successfully.`,
        });
      }
    } else {
      const newGoal = dataService.create<SDGGoal>('sdgGoals', processedData);
      setSdgGoals(dataService.getAll<SDGGoal>('sdgGoals'));
      toast({
        title: "SDG Goal created",
        description: `Goal ${newGoal.number}: ${newGoal.title} has been created.`,
      });
    }
    setIsModalOpen(false);
  };

  const renderProgress = (value: number) => {
    return (
      <div className="flex items-center space-x-2">
        <Progress value={value} className="h-2 w-32" />
        <span className="text-sm font-medium">{value}%</span>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">SDG Contribution Dashboard</h1>
          <p className="text-muted-foreground">Track your contribution to UN Sustainable Development Goals.</p>
        </div>
      </div>
      
      {sdgGoals.length === 0 ? (
        <div className="border rounded-lg p-10 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">UN SDG Alignment Engine</h2>
            <p className="text-gray-500 mb-6">Start tracking your SDG contributions.</p>
            <div className="flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                  <Globe className="h-6 w-6 text-blue-600" />
                </div>
                <button 
                  className="font-medium text-primary hover:underline"
                  onClick={handleCreateGoal}
                >
                  Add First SDG Goal
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">SDGs Tracked</h3>
              <p className="text-3xl font-bold">{sdgGoals.length}</p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">Average Progress</h3>
              <p className="text-3xl font-bold">
                {sdgGoals.length > 0 
                  ? Math.round(sdgGoals.reduce((acc, goal) => acc + goal.progress, 0) / sdgGoals.length) 
                  : 0}%
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm">
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">Total Targets</h3>
              <p className="text-3xl font-bold">
                {sdgGoals.reduce((acc, goal) => acc + (goal.targets?.length || 0), 0)}
              </p>
            </div>
          </div>

          <CrudTable
            title="SDG Goals Progress"
            columns={[
              { 
                key: 'number', 
                title: 'Goal', 
                render: (value, row) => (
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: row.color || '#3b82f6' }}
                    >
                      {value}
                    </div>
                    <span>{row.title}</span>
                  </div>
                ),
                sortable: true 
              },
              { 
                key: 'progress', 
                title: 'Progress', 
                render: renderProgress,
                sortable: true 
              },
              { 
                key: 'targets', 
                title: 'Targets', 
                render: (value) => value?.length || 0 
              }
            ]}
            data={sdgGoals}
            filterPlaceholder="Search SDG goals..."
            onCreateClick={handleCreateGoal}
            onEditClick={handleEditGoal}
            onDeleteClick={handleDeleteGoal}
          />
        </>
      )}

      <CrudModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentGoal ? `Edit SDG Goal ${currentGoal.number}` : "Add New SDG Goal"}
      >
        <CrudForm
          title=""
          fields={[
            {
              name: 'number',
              label: 'Goal Number',
              type: 'number',
              validation: { 
                required: true,
                min: 1,
                max: 17
              }
            },
            {
              name: 'title',
              label: 'Goal Title',
              type: 'text',
              placeholder: 'Enter goal title',
              validation: { required: true }
            },
            {
              name: 'description',
              label: 'Description',
              type: 'textarea',
              placeholder: 'Enter goal description',
              validation: { required: true }
            },
            {
              name: 'progress',
              label: 'Progress (%)',
              type: 'number',
              validation: { 
                required: true,
                min: 0,
                max: 100
              }
            },
            {
              name: 'color',
              label: 'Color (hex)',
              type: 'text',
              placeholder: '#3b82f6',
              validation: { 
                required: true,
                pattern: {
                  value: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
                  message: 'Must be a valid hex color code'
                }
              }
            }
          ]}
          defaultValues={{
            ...(currentGoal || {}),
            number: currentGoal?.number || 0,
            progress: currentGoal?.progress || 0
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
              Are you sure you want to delete this SDG goal? This action cannot be undone.
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

export default SdgDashboard;
