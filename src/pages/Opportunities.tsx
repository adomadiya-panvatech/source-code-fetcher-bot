
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Search, Filter, MoreHorizontal, Eye, Edit2, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ResponsiveTable, 
  ResponsiveTableContent, 
  ResponsiveTableHeader, 
  ResponsiveTableBody, 
  ResponsiveTableRow, 
  ResponsiveTableHead, 
  ResponsiveTableCell,
  ResponsiveTableCards 
} from '@/components/ui/responsive-table';
import { MobileCard } from '@/components/ui/mobile-card';
import { useOpportunities, useOpportunityStats, useDeleteOpportunity } from '@/hooks/useOpportunities';
import { useToast } from '@/hooks/use-toast';

interface OpportunitiesProps {
  onOpenContactModal?: () => void;
  onOpenLeadModal?: () => void;
  onOpenOpportunityModal?: () => void;
  onOpenAccountModal?: () => void;
  onOpenSMSModal?: () => void;
  onOpenEmailModal?: () => void;
  onOpenEditContactModal?: (contact: any) => void;
  onOpenEditLeadModal?: (lead: any) => void;
  onOpenEditOpportunityModal?: (opportunity: any) => void;
  onOpenViewOpportunityModal?: (opportunity: any) => void;
  onOpenEditAccountModal?: (account: any) => void;
}

const Opportunities: React.FC<OpportunitiesProps> = ({
  onOpenContactModal,
  onOpenLeadModal,
  onOpenOpportunityModal,
  onOpenAccountModal,
  onOpenSMSModal,
  onOpenEmailModal,
  onOpenEditContactModal,
  onOpenEditLeadModal,
  onOpenEditOpportunityModal,
  onOpenViewOpportunityModal,
  onOpenEditAccountModal
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStage, setFilterStage] = useState('all');

  const { data: response, isLoading: opportunitiesLoading, error: opportunitiesError } = useOpportunities();
  const opportunities = response?.data ?? [];

  const deleteOpportunityMutation = useDeleteOpportunity();
  const { toast } = useToast();

  const filteredOpportunities = opportunities.filter((opp: any) => {
    const matchesSearch = opp.opportunity?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.company?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStage === 'all' || opp.stage?.toLowerCase() === filterStage.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hot': return 'bg-red-100 text-red-800';
      case 'warm': return 'bg-yellow-100 text-yellow-800';
      case 'cold': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Prospecting': return 'bg-gray-100 text-gray-800';
      case 'Discovery': return 'bg-blue-100 text-blue-800';
      case 'Qualification': return 'bg-yellow-100 text-yellow-800';
      case 'Proposal': return 'bg-orange-100 text-orange-800';
      case 'Negotiation': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDeleteOpportunity = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}? This action cannot be undone.`)) {
      try {
        await deleteOpportunityMutation.mutateAsync(id);
        toast({
          title: "Success",
          description: `${name} has been deleted successfully`,
        });
      } catch (error) {
        console.error('Error deleting opportunity:', error);
        toast({
          title: "Error",
          description: "Failed to delete opportunity. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleEditOpportunity = (opportunity: any) => {
    if (onOpenEditOpportunityModal) {
      onOpenEditOpportunityModal(opportunity);
    }
  };

  const handleViewOpportunity = (opportunity: any) => {
    if (onOpenViewOpportunityModal) {
      onOpenViewOpportunityModal(opportunity);
    }
  };

  if (opportunitiesError) {
    return (
      <Layout>
        <div className="p-4 lg:p-6">
          <div className="text-center py-8 text-red-600">
            Error loading opportunities: {opportunitiesError.message}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Opportunities</h1>
            <p className="text-gray-600 mt-1 text-sm lg:text-base">Manage your sales opportunities and track deals</p>
          </div>
          <Button
            onClick={onOpenOpportunityModal}
            className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
          >
            Add Opportunity
          </Button>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4">
              <CardTitle className="text-lg lg:text-xl">All Opportunities</CardTitle>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search opportunities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-sm lg:text-base"
                  />
                </div>
                <select
                  value={filterStage}
                  onChange={(e) => setFilterStage(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm lg:text-base"
                >
                  <option value="all">All Stages</option>
                  <option value="prospecting">Prospecting</option>
                  <option value="discovery">Discovery</option>
                  <option value="qualification">Qualification</option>
                  <option value="proposal">Proposal</option>
                  <option value="negotiation">Negotiation</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 sm:p-6">
            {opportunitiesLoading ? (
              <div className="text-center py-8 text-gray-500">
                Loading opportunities...
              </div>
            ) : (
              <>
                {/* Desktop Table */}
                <ResponsiveTable>
                  <ResponsiveTableContent>
                    <ResponsiveTableHeader>
                      <ResponsiveTableRow>
                        <ResponsiveTableHead>Opportunity</ResponsiveTableHead>
                        <ResponsiveTableHead>Company</ResponsiveTableHead>
                        <ResponsiveTableHead>Value</ResponsiveTableHead>
                        <ResponsiveTableHead>Stage</ResponsiveTableHead>
                        <ResponsiveTableHead>Probability</ResponsiveTableHead>
                        <ResponsiveTableHead>Close Date</ResponsiveTableHead>
                        <ResponsiveTableHead>Status</ResponsiveTableHead>
                        <ResponsiveTableHead className="w-[100px]">Actions</ResponsiveTableHead>
                      </ResponsiveTableRow>
                    </ResponsiveTableHeader>
                    <ResponsiveTableBody>
                      {filteredOpportunities.map((opportunity: any) => (
                        <ResponsiveTableRow key={opportunity.id} className="hover:bg-gray-50">
                          <ResponsiveTableCell className="font-medium">{opportunity.opportunity}</ResponsiveTableCell>
                          <ResponsiveTableCell>{opportunity.company}</ResponsiveTableCell>
                          <ResponsiveTableCell className="font-semibold text-green-600">{opportunity.value}</ResponsiveTableCell>
                          <ResponsiveTableCell>
                            <Badge className={getStageColor(opportunity.stage || 'Prospecting')}>
                              {opportunity.stage || 'Prospecting'}
                            </Badge>
                          </ResponsiveTableCell>
                          <ResponsiveTableCell>{opportunity.probability || '0%'}</ResponsiveTableCell>
                          <ResponsiveTableCell>{opportunity.close_date || opportunity.expectedClose}</ResponsiveTableCell>
                          <ResponsiveTableCell>
                            <Badge className={getStatusColor(opportunity.status || 'cold')}>
                              {opportunity.status || 'cold'}
                            </Badge>
                          </ResponsiveTableCell>
                          <ResponsiveTableCell>
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleViewOpportunity(opportunity)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleEditOpportunity(opportunity)}
                              >
                                <Edit2 className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteOpportunity(opportunity.id, opportunity.title || opportunity.name)}
                                disabled={deleteOpportunityMutation.isPending}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </ResponsiveTableCell>
                        </ResponsiveTableRow>
                      ))}
                    </ResponsiveTableBody>
                  </ResponsiveTableContent>
                </ResponsiveTable>

                {/* Mobile Cards */}
                <ResponsiveTableCards
                  data={filteredOpportunities}
                  renderCard={(opportunity, index) => (
                    <MobileCard
                      key={opportunity.id}
                      title={opportunity.opportunity || 'Untitled Opportunity'}
                      subtitle={opportunity.company}
                      badge={{
                        text: opportunity.stage || 'Prospecting',
                        variant: opportunity.stage === 'Negotiation' ? 'success' : 
                               opportunity.stage === 'Proposal' ? 'warning' : 'default'
                      }}
                      fields={[
                        { label: 'Value', value: opportunity.value || 'Not specified' },
                        { label: 'Probability', value: opportunity.probability || '0%' },
                        { label: 'Close Date', value: opportunity.close_date || opportunity.expectedClose || 'Not set' },
                        { 
                          label: 'Status', 
                          value: (
                            <Badge className={getStatusColor(opportunity.status || 'cold')}>
                              {opportunity.status || 'cold'}
                            </Badge>
                          )
                        }
                      ]}
                      actions={[
                        {
                          label: 'View',
                          onClick: () => handleViewOpportunity(opportunity),
                          variant: 'outline',
                          icon: <Eye className="w-4 h-4" />
                        },
                        {
                          label: 'Edit',
                          onClick: () => handleEditOpportunity(opportunity),
                          variant: 'outline',
                          icon: <Edit2 className="w-4 h-4" />
                        },
                        {
                          label: 'Delete',
                          onClick: () => handleDeleteOpportunity(opportunity.id, opportunity.opportunity || 'opportunity'),
                          variant: 'destructive',
                          icon: <Trash2 className="w-4 h-4" />
                        }
                      ]}
                      className="card-hover"
                    />
                  )}
                />
              </>
            )}
            {!opportunitiesLoading && filteredOpportunities.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No opportunities found matching your criteria.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Opportunities;
