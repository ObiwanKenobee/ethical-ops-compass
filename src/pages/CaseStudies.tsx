
import { useState } from "react";
import { Book, Clock, Tag, Globe } from "lucide-react";
import { CaseStudy } from "@/types";
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

const CaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(
    dataService.getAll<CaseStudy>('caseStudies')
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentCaseStudy, setCurrentCaseStudy] = useState<CaseStudy | null>(null);
  const { toast } = useToast();
  
  const handleCreateCaseStudy = () => {
    setCurrentCaseStudy(null);
    setIsModalOpen(true);
  };

  const handleEditCaseStudy = (caseStudy: CaseStudy) => {
    setCurrentCaseStudy(caseStudy);
    setIsModalOpen(true);
  };

  const handleDeleteCaseStudy = (caseStudy: CaseStudy) => {
    setCurrentCaseStudy(caseStudy);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (currentCaseStudy) {
      const success = dataService.delete('caseStudies', currentCaseStudy.id);
      if (success) {
        setCaseStudies(dataService.getAll<CaseStudy>('caseStudies'));
        toast({
          title: "Case study deleted",
          description: `"${currentCaseStudy.title}" has been removed.`,
        });
      }
    }
    setIsDeleteDialogOpen(false);
  };

  const handleFormSubmit = (data: CaseStudy) => {
    if (currentCaseStudy) {
      // Update existing case study
      const updated = dataService.update<CaseStudy>('caseStudies', currentCaseStudy.id, data);
      if (updated) {
        setCaseStudies(dataService.getAll<CaseStudy>('caseStudies'));
        toast({
          title: "Case study updated",
          description: `"${updated.title}" has been updated successfully.`,
        });
      }
    } else {
      // Create new case study
      const newCaseStudy = dataService.create<CaseStudy>('caseStudies', {
        ...data,
        tags: data.tags || []
      });
      setCaseStudies(dataService.getAll<CaseStudy>('caseStudies'));
      toast({
        title: "Case study created",
        description: `"${newCaseStudy.title}" has been created.`,
      });
    }
    setIsModalOpen(false);
  };

  const renderPublishedBadge = (value: boolean) => {
    return value ? 
      <Badge className="bg-green-100 text-green-800 border-green-200">Published</Badge> : 
      <Badge className="bg-gray-100 text-gray-800 border-gray-200">Draft</Badge>;
  };

  const renderTags = (tags: string[]) => {
    if (!tags || tags.length === 0) return '—';
    
    return (
      <div className="flex flex-wrap gap-1">
        {tags.slice(0, 2).map((tag, index) => (
          <Badge key={index} variant="outline">{tag}</Badge>
        ))}
        {tags.length > 2 && <Badge variant="outline">+{tags.length - 2}</Badge>}
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Case Studies & Benchmarks</h1>
          <p className="text-muted-foreground">Learn from anonymized case studies and industry benchmarks.</p>
        </div>
      </div>
      
      {caseStudies.length === 0 ? (
        <div className="border rounded-lg p-10 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Peer Insight Explorer</h2>
            <p className="text-gray-500 mb-6">Start building your library of case studies.</p>
            <div className="flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center mb-2">
                  <Book className="h-6 w-6 text-indigo-600" />
                </div>
                <button 
                  className="font-medium text-primary hover:underline"
                  onClick={handleCreateCaseStudy}
                >
                  Add First Case Study
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm">
              <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                <Book className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">Total Cases</h3>
              <p className="text-3xl font-bold">{caseStudies.length}</p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">Regions Covered</h3>
              <p className="text-3xl font-bold">
                {new Set(caseStudies.map(c => c.region)).size}
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Tag className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">Industries</h3>
              <p className="text-3xl font-bold">
                {new Set(caseStudies.map(c => c.industry)).size}
              </p>
            </div>
          </div>

          <CrudTable
            title="Case Studies Library"
            columns={[
              { key: 'title', title: 'Title', sortable: true },
              { key: 'industry', title: 'Industry', sortable: true },
              { key: 'region', title: 'Region', sortable: true },
              { 
                key: 'tags', 
                title: 'Tags', 
                render: renderTags
              },
              { 
                key: 'published', 
                title: 'Status', 
                render: renderPublishedBadge,
                sortable: true 
              },
            ]}
            data={caseStudies}
            filterPlaceholder="Search case studies..."
            onCreateClick={handleCreateCaseStudy}
            onEditClick={handleEditCaseStudy}
            onDeleteClick={handleDeleteCaseStudy}
          />
        </>
      )}

      <CrudModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentCaseStudy ? `Edit Case Study: ${currentCaseStudy.title}` : "Create New Case Study"}
      >
        <CrudForm
          title=""
          fields={[
            {
              name: 'title',
              label: 'Title',
              type: 'text',
              placeholder: 'Enter case study title',
              validation: { required: true }
            },
            {
              name: 'summary',
              label: 'Summary',
              type: 'textarea',
              placeholder: 'Enter a brief summary',
              validation: { required: true }
            },
            {
              name: 'industry',
              label: 'Industry',
              type: 'text',
              placeholder: 'E.g., Textiles, Agriculture',
              validation: { required: true }
            },
            {
              name: 'region',
              label: 'Region',
              type: 'text',
              placeholder: 'E.g., Southeast Asia, Europe',
              validation: { required: true }
            },
            {
              name: 'challenge',
              label: 'Challenge',
              type: 'textarea',
              placeholder: 'Describe the challenge faced',
              validation: { required: true }
            },
            {
              name: 'solution',
              label: 'Solution',
              type: 'textarea',
              placeholder: 'Describe the solution implemented',
              validation: { required: true }
            },
            {
              name: 'outcome',
              label: 'Outcome',
              type: 'textarea',
              placeholder: 'Describe the results achieved',
              validation: { required: true }
            },
            {
              name: 'published',
              label: 'Status',
              type: 'select',
              options: [
                { value: 'true', label: 'Published' },
                { value: 'false', label: 'Draft' },
              ],
              validation: { required: true }
            }
          ]}
          defaultValues={{
            ...(currentCaseStudy || {}),
            published: currentCaseStudy ? String(currentCaseStudy.published) : 'false'
          }}
          onSubmit={(data) => {
            const processedData = {
              ...data,
              published: data.published === 'true',
              tags: [] // In a real app, we'd add a tags input component
            };
            handleFormSubmit(processedData as CaseStudy);
          }}
          onCancel={() => setIsModalOpen(false)}
        />
      </CrudModal>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this case study? This action cannot be undone.
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

export default CaseStudies;
