
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Partner extends BaseEntity {
  name: string;
  country: string;
  industry: string;
  complianceScore: number;
  status: 'active' | 'pending' | 'suspended';
  riskLevel: 'low' | 'medium' | 'high';
  website?: string;
  contactEmail?: string;
  contactName?: string;
}

export interface Risk extends BaseEntity {
  partnerId: string;
  partnerName: string;
  country: string;
  riskType: string;
  severity: 'low' | 'medium' | 'high';
  source: string;
  detectedDate: string;
  status: 'open' | 'in-progress' | 'resolved';
  assignedTo?: string;
}

export interface Action extends BaseEntity {
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'canceled';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  assignedTo?: string;
  relatedRiskId?: string;
  partnerId: string;
  partnerName: string;
}

export interface Communication extends BaseEntity {
  title: string;
  content: string;
  type: 'message' | 'notification' | 'alert';
  status: 'sent' | 'draft' | 'scheduled';
  sendDate: string;
  sender: string;
  recipients: string[];
  readBy: string[];
}

export interface CaseStudy extends BaseEntity {
  title: string;
  summary: string;
  industry: string;
  region: string;
  challenge: string;
  solution: string;
  outcome: string;
  tags: string[];
  published: boolean;
}

export interface SDGGoal extends BaseEntity {
  number: number;
  title: string;
  description: string;
  targets: SDGTarget[];
  color: string;
  progress: number;
}

export interface SDGTarget {
  id: string;
  description: string;
  progress: number;
  indicators: string[];
}

export interface OnboardingPartner extends BaseEntity {
  companyName: string;
  industry: string;
  region: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  status: 'new' | 'in-progress' | 'completed' | 'rejected';
  currentStep: number;
  supplyChainInfo: {
    tier: string;
    products: string[];
    certifications: string[];
  };
  legalRequirements: {
    documentsSubmitted: boolean;
    complianceVerified: boolean;
    lastAuditDate?: string;
  };
}

export interface SupplyChainNode extends BaseEntity {
  name: string;
  type: 'supplier' | 'manufacturer' | 'distributor' | 'retailer';
  tier: number;
  location: string;
  products: string[];
  certifications: string[];
  riskScore: number;
  parentId?: string;
  childrenIds: string[];
}

