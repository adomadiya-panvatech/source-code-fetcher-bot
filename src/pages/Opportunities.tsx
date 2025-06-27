
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Search, Filter, MoreHorizontal, Eye, Edit2, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useOpportunities, useOpportunityStats, useDeleteOpportunity } from '@/hooks/useOpportunities';

interface OpportunitiesProps {
  onOpenContactModal?: () => void;
  onOpenLeadModal?: () => void;
  onOpenOpportunityModal?: () => void;
  onOpenAccountModal?: () => void;
  onOpenSMSModal?: () => void;
  onOpenEmailModal?: () => void;
}

const Opportunities: React.FC<OpportunitiesProps> = ({ 
  onOpenContactModal, 
  onOpenLeadModal,
  onOpenOpportunityModal,
  onOpenAccountModal,
  onOpenSMSModal,
  onOpenEmailModal
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStage, setFilterStage] = useState('all');

  const { data: opportunities = [], isLoading: opportunitiesLoading, error: opportunitiesError } = useOpportunities();
  const { data: stats } = useOpportunityStats();
  const deleteOpportunityMutation = useDeleteOpportunity();

  const filteredOpportunities = opportunities.filter((opp: any) => {
    const matchesSearch = opp.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

  const handleDeleteOpportunity = (id: string) => {
    if (window.confirm('Are you sure you want to delete this opportunity?')) {
      deleteOpportunityMutation.mutate(id);
    }
  };

  if (opportunitiesError) {
    return (
      <Layout>
        <div className="p-6">
          <div className="text-center py-8 text-red-600">
            Error loading opportunities: {opportunitiesError.message}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Opportunities</h1>
            <p className="text-gray-600 mt-1">Manage your sales opportunities and track deals</p>
          </div>
          <Button 
            onClick={onOpenOpportunityModal}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Add Opportunity
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stats?.totalValue || '$465,000'}
              </div>
              <p className="text-sm text-green-600">
                {stats?.valueGrowth || '+12% from last month'}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Deals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stats?.activeDeals || opportunities.length}
              </div>
              <p className="text-sm text-blue-600">
                {stats?.closingThisMonth || '2 closing this month'}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Win Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stats?.winRate || '75%'}
              </div>
              <p className="text-sm text-green-600">Above average</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Avg Deal Size</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stats?.avgDealSize || '$93,000'}
              </div>
              <p className="text-sm text-gray-600">Last 30 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <CardTitle>All Opportunities</CardTitle>
              <div className="flex gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search opportunities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                  />
                </div>
                <select
                  value={filterStage}
                  onChange={(e) => setFilterStage(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <CardContent>
            {opportunitiesLoading ? (
              <div className="text-center py-8 text-gray-500">
                Loading opportunities...
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Opportunity</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Stage</TableHead>
                      <TableHead>Probability</TableHead>
                      <TableHead>Close Date</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOpportunities.map((opportunity: any) => (
                      <TableRow key={opportunity.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{opportunity.title || opportunity.name}</TableCell>
                        <TableCell>{opportunity.company}</TableCell>
                        <TableCell className="font-semibold text-green-600">{opportunity.value}</TableCell>
                        <TableCell>
                          <Badge className={getStageColor(opportunity.stage || 'Prospecting')}>
                            {opportunity.stage || 'Prospecting'}
                          </Badge>
                        </TableCell>
                        <TableCell>{opportunity.probability || '0%'}</TableCell>
                        <TableCell>{opportunity.closeDate || opportunity.expectedClose}</TableCell>
                        <TableCell>{opportunity.owner || opportunity.assignedTo}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(opportunity.status || 'cold')}>
                            {opportunity.status || 'cold'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDeleteOpportunity(opportunity.id)}
                              disabled={deleteOpportunityMutation.isPending}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
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
