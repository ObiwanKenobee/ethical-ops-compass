
import { 
  Partner, 
  Risk, 
  Action, 
  Communication, 
  CaseStudy, 
  SDGGoal,
  OnboardingPartner,
  SupplyChainNode
} from '@/types';
import { v4 as uuidv4 } from 'uuid';

// Mock data for each entity type
const mockPartners: Partner[] = [
  {
    id: '1',
    name: 'Global Fabrics Ltd.',
    country: 'Vietnam',
    industry: 'Textiles',
    complianceScore: 82,
    status: 'active',
    riskLevel: 'medium',
    website: 'https://globalfabrics.example',
    contactEmail: 'contact@globalfabrics.example',
    contactName: 'Min Tran',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2025-03-10T14:45:00Z'
  },
  {
    id: '2',
    name: 'Raw Cotton Provider',
    country: 'India',
    industry: 'Agriculture',
    complianceScore: 65,
    status: 'active',
    riskLevel: 'high',
    website: 'https://rawcotton.example',
    contactEmail: 'info@rawcotton.example',
    contactName: 'Rahul Patel',
    createdAt: '2024-02-08T09:15:00Z',
    updatedAt: '2025-03-05T11:20:00Z'
  },
  {
    id: '3',
    name: 'Dyeing Factory',
    country: 'Bangladesh',
    industry: 'Chemical Processing',
    complianceScore: 78,
    status: 'pending',
    riskLevel: 'medium',
    contactEmail: 'operations@dyeingfactory.example',
    contactName: 'Ahmed Khan',
    createdAt: '2023-11-20T16:40:00Z',
    updatedAt: '2025-02-28T13:10:00Z'
  }
];

const mockRisks: Risk[] = [
  {
    id: 'risk-1',
    partnerId: '1',
    partnerName: 'Global Fabrics Ltd.',
    country: 'Vietnam',
    riskType: 'Labor Documentation',
    severity: 'high',
    source: 'Document Scanner',
    detectedDate: '2025-03-15T00:00:00Z',
    status: 'open',
    createdAt: '2025-03-15T10:30:00Z',
    updatedAt: '2025-03-15T10:30:00Z'
  },
  {
    id: 'risk-2',
    partnerId: '2',
    partnerName: 'Raw Cotton Provider',
    country: 'India',
    riskType: 'Child Labor',
    severity: 'high',
    source: 'News Alert',
    detectedDate: '2025-03-10T00:00:00Z',
    status: 'in-progress',
    assignedTo: 'Sarah Johnson',
    createdAt: '2025-03-10T14:20:00Z',
    updatedAt: '2025-03-12T09:45:00Z'
  }
];

const mockActions: Action[] = [
  {
    id: 'action-1',
    title: 'Request Updated Labor Documents',
    description: 'Contact Global Fabrics Ltd. to request updated labor documentation for all factory workers.',
    status: 'pending',
    priority: 'high',
    dueDate: '2025-04-01T00:00:00Z',
    assignedTo: 'Michael Chen',
    relatedRiskId: 'risk-1',
    partnerId: '1',
    partnerName: 'Global Fabrics Ltd.',
    createdAt: '2025-03-16T11:20:00Z',
    updatedAt: '2025-03-16T11:20:00Z'
  },
  {
    id: 'action-2',
    title: 'Schedule Compliance Audit',
    description: 'Arrange an unannounced on-site audit to investigate child labor allegations.',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2025-03-25T00:00:00Z',
    assignedTo: 'Sarah Johnson',
    relatedRiskId: 'risk-2',
    partnerId: '2',
    partnerName: 'Raw Cotton Provider',
    createdAt: '2025-03-11T09:30:00Z',
    updatedAt: '2025-03-18T16:45:00Z'
  }
];

// Create more mock data for other entities...

class MockDataService {
  private partners: Partner[] = [...mockPartners];
  private risks: Risk[] = [...mockRisks];
  private actions: Action[] = [...mockActions];
  private communications: Communication[] = [];
  private caseStudies: CaseStudy[] = [];
  private sdgGoals: SDGGoal[] = [];
  private onboardingPartners: OnboardingPartner[] = [];
  private supplyChainNodes: SupplyChainNode[] = [];
  
  // Generic CRUD operations
  
  // Get all items of a specific entity type
  getAll<T>(entityType: string): T[] {
    switch (entityType) {
      case 'partners': return this.partners as unknown as T[];
      case 'risks': return this.risks as unknown as T[];
      case 'actions': return this.actions as unknown as T[];
      case 'communications': return this.communications as unknown as T[];
      case 'caseStudies': return this.caseStudies as unknown as T[];
      case 'sdgGoals': return this.sdgGoals as unknown as T[];
      case 'onboardingPartners': return this.onboardingPartners as unknown as T[];
      case 'supplyChainNodes': return this.supplyChainNodes as unknown as T[];
      default: throw new Error(`Unknown entity type: ${entityType}`);
    }
  }
  
  // Get a specific item by ID
  getById<T extends { id: string }>(entityType: string, id: string): T | undefined {
    const items = this.getAll<T>(entityType);
    return items.find(item => item.id === id);
  }
  
  // Create a new item
  create<T extends { id?: string }>(entityType: string, item: T): T {
    const newItem = {
      ...item,
      id: item.id || uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as T;
    
    switch (entityType) {
      case 'partners':
        this.partners.push(newItem as unknown as Partner);
        break;
      case 'risks':
        this.risks.push(newItem as unknown as Risk);
        break;
      case 'actions':
        this.actions.push(newItem as unknown as Action);
        break;
      case 'communications':
        this.communications.push(newItem as unknown as Communication);
        break;
      case 'caseStudies':
        this.caseStudies.push(newItem as unknown as CaseStudy);
        break;
      case 'sdgGoals':
        this.sdgGoals.push(newItem as unknown as SDGGoal);
        break;
      case 'onboardingPartners':
        this.onboardingPartners.push(newItem as unknown as OnboardingPartner);
        break;
      case 'supplyChainNodes':
        this.supplyChainNodes.push(newItem as unknown as SupplyChainNode);
        break;
      default:
        throw new Error(`Unknown entity type: ${entityType}`);
    }
    
    return newItem;
  }
  
  // Update an existing item
  update<T extends { id: string }>(entityType: string, id: string, updates: Partial<T>): T | undefined {
    let items: any[];
    
    switch (entityType) {
      case 'partners': items = this.partners; break;
      case 'risks': items = this.risks; break;
      case 'actions': items = this.actions; break;
      case 'communications': items = this.communications; break;
      case 'caseStudies': items = this.caseStudies; break;
      case 'sdgGoals': items = this.sdgGoals; break;
      case 'onboardingPartners': items = this.onboardingPartners; break;
      case 'supplyChainNodes': items = this.supplyChainNodes; break;
      default: throw new Error(`Unknown entity type: ${entityType}`);
    }
    
    const index = items.findIndex(item => item.id === id);
    if (index === -1) return undefined;
    
    const updatedItem = {
      ...items[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    
    items[index] = updatedItem;
    return updatedItem as T;
  }
  
  // Delete an item by ID
  delete(entityType: string, id: string): boolean {
    let items: any[];
    
    switch (entityType) {
      case 'partners': items = this.partners; break;
      case 'risks': items = this.risks; break;
      case 'actions': items = this.actions; break;
      case 'communications': items = this.communications; break;
      case 'caseStudies': items = this.caseStudies; break;
      case 'sdgGoals': items = this.sdgGoals; break;
      case 'onboardingPartners': items = this.onboardingPartners; break;
      case 'supplyChainNodes': items = this.supplyChainNodes; break;
      default: throw new Error(`Unknown entity type: ${entityType}`);
    }
    
    const initialLength = items.length;
    switch (entityType) {
      case 'partners':
        this.partners = this.partners.filter(item => item.id !== id);
        break;
      case 'risks':
        this.risks = this.risks.filter(item => item.id !== id);
        break;
      case 'actions':
        this.actions = this.actions.filter(item => item.id !== id);
        break;
      case 'communications':
        this.communications = this.communications.filter(item => item.id !== id);
        break;
      case 'caseStudies':
        this.caseStudies = this.caseStudies.filter(item => item.id !== id);
        break;
      case 'sdgGoals':
        this.sdgGoals = this.sdgGoals.filter(item => item.id !== id);
        break;
      case 'onboardingPartners':
        this.onboardingPartners = this.onboardingPartners.filter(item => item.id !== id);
        break;
      case 'supplyChainNodes':
        this.supplyChainNodes = this.supplyChainNodes.filter(item => item.id !== id);
        break;
    }
    
    return items.length !== initialLength;
  }
  
  // Custom query methods for specific use cases
  getPartnerRisks(partnerId: string): Risk[] {
    return this.risks.filter(risk => risk.partnerId === partnerId);
  }
  
  getPartnerActions(partnerId: string): Action[] {
    return this.actions.filter(action => action.partnerId === partnerId);
  }
  
  getOpenRisks(): Risk[] {
    return this.risks.filter(risk => risk.status === 'open');
  }
  
  getPendingActions(): Action[] {
    return this.actions.filter(action => action.status === 'pending' || action.status === 'in-progress');
  }
}

export const dataService = new MockDataService();
