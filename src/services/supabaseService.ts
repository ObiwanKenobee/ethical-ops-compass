
import { supabase } from "@/integrations/supabase/client";

// Interface for dashboard summary data
export interface DashboardSummary {
  partnerCount: number;
  activeInitiatives: number;
  complianceRate: number;
  openRisks: number;
  pendingAssessments: number;
}

// Interface for risk distribution data
export interface RiskDistribution {
  category: string;
  count: number;
}

// Interface for top partners data
export interface TopPartner {
  id: string;
  name: string;
  complianceScore: number;
  industry: string;
}

// Dashboard data services
export const dashboardService = {
  // Fetch summary metrics for the dashboard
  async getDashboardSummary(): Promise<DashboardSummary> {
    try {
      // Get partners count
      const { count: partnerCount } = await supabase
        .from('partners')
        .select('*', { count: 'exact', head: true });

      // Get active initiatives count
      const { count: activeInitiatives } = await supabase
        .from('esg_initiatives')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active');

      // Get pending assessments count
      const { count: pendingAssessments } = await supabase
        .from('supplier_assessments')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      // Get open risks count
      const { count: openRisks } = await supabase
        .from('risk_assessments')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'open');

      // Calculate compliance rate (from supplier_assessments)
      const { data: assessments } = await supabase
        .from('supplier_assessments')
        .select('score')
        .not('score', 'is', null);

      let complianceRate = 0;
      if (assessments && assessments.length > 0) {
        const totalScore = assessments.reduce((sum, item) => sum + (item.score || 0), 0);
        complianceRate = Math.round((totalScore / assessments.length));
      }

      return {
        partnerCount: partnerCount || 0,
        activeInitiatives: activeInitiatives || 0,
        complianceRate: complianceRate || 0,
        openRisks: openRisks || 0,
        pendingAssessments: pendingAssessments || 0
      };
    } catch (error) {
      console.error("Error fetching dashboard summary:", error);
      return {
        partnerCount: 0,
        activeInitiatives: 0,
        complianceRate: 0,
        openRisks: 0,
        pendingAssessments: 0
      };
    }
  },

  // Get risk distribution by category
  async getRiskDistribution(): Promise<RiskDistribution[]> {
    try {
      const { data, error } = await supabase
        .from('risk_factors')
        .select('category, id');

      if (error) throw error;

      // Count risks by category
      const riskDistribution: Record<string, number> = {};
      data?.forEach(risk => {
        const category = risk.category || 'Uncategorized';
        riskDistribution[category] = (riskDistribution[category] || 0) + 1;
      });

      // Convert to array format
      return Object.entries(riskDistribution).map(([category, count]) => ({
        category,
        count
      }));
    } catch (error) {
      console.error("Error fetching risk distribution:", error);
      return [];
    }
  },

  // Get top performing partners
  async getTopPartners(limit: number = 5): Promise<TopPartner[]> {
    try {
      const { data, error } = await supabase
        .from('partners')
        .select('id, name, compliance_score, industry')
        .order('compliance_score', { ascending: false })
        .limit(limit);

      if (error) throw error;

      return data?.map(partner => ({
        id: partner.id,
        name: partner.name,
        complianceScore: partner.compliance_score || 0,
        industry: partner.industry || 'Unknown'
      })) || [];
    } catch (error) {
      console.error("Error fetching top partners:", error);
      return [];
    }
  },

  // Get recent ESG initiatives
  async getRecentInitiatives(limit: number = 5) {
    try {
      const { data, error } = await supabase
        .from('esg_initiatives')
        .select('id, title, status, started_at, category')
        .order('started_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching ESG initiatives:", error);
      return [];
    }
  },

  // Get upcoming assessments
  async getUpcomingAssessments(limit: number = 5) {
    try {
      const { data, error } = await supabase
        .from('supplier_assessments')
        .select('id, supplier_id, assessment_type, due_date, status')
        .gt('due_date', new Date().toISOString())
        .order('due_date', { ascending: true })
        .limit(limit);

      if (error) throw error;
      
      // Get supplier names
      if (data && data.length > 0) {
        const supplierIds = data.map(assessment => assessment.supplier_id).filter(Boolean);
        
        if (supplierIds.length > 0) {
          const { data: suppliers } = await supabase
            .from('suppliers')
            .select('id, name')
            .in('id', supplierIds);
          
          const supplierMap = new Map();
          suppliers?.forEach(supplier => {
            supplierMap.set(supplier.id, supplier.name);
          });
          
          return data.map(assessment => ({
            ...assessment,
            supplier_name: assessment.supplier_id ? 
              supplierMap.get(assessment.supplier_id) || 'Unknown' : 
              'Unknown'
          }));
        }
      }
      
      return data || [];
    } catch (error) {
      console.error("Error fetching upcoming assessments:", error);
      return [];
    }
  }
};
