import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Search, Filter, MoreHorizontal, Eye, Edit2, Trash2, Users, UserCheck, Phone, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useLeads, useLeadStats, useDeleteLead } from '@/hooks/useLeads';
import { useToast } from '@/hooks/use-toast';

interface LeadsProps {
  onOpenContactModal?: () => void;
  onOpenLeadModal?: () => void;
  onOpenOpportunityModal?: () => void;
  onOpenAccountModal?: () => void;
  onOpenSMSModal?: () => void;
  onOpenEmailModal?: () => void;
  onOpenEditContactModal?: (contact: any) => void;
  onOpenEditLeadModal?: (lead: any) => void;
  onOpenEditOpportunityModal?: (opportunity: any) => void;
  onOpenViewLeadModal?: (lead: any) => void;
  onOpenEditAccountModal?: (account: any) => void;
}

const Leads: React.FC<LeadsProps> = ({
  onOpenContactModal,
  onOpenLeadModal,
  onOpenOpportunityModal,
  onOpenAccountModal,
  onOpenSMSModal,
  onOpenEmailModal,
  onOpenEditContactModal,
  onOpenEditLeadModal,
  onOpenEditOpportunityModal,
  onOpenViewLeadModal,
  onOpenEditAccountModal
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const { data: leadsResponse, isLoading: leadsLoading, error: leadsError } = useLeads();
  const leads = leadsResponse?.data ?? [];

  const { data: stats } = useLeadStats();

  const deleteLeadMutation = useDeleteLead();
  const { toast } = useToast();

  const filteredLeads = leads.filter((lead: any) => {
    const matchesSearch = lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || lead.status?.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hot': return 'bg-red-100 text-red-800';
      case 'warm': return 'bg-orange-100 text-orange-800';
      case 'qualified': return 'bg-green-100 text-green-800';
      case 'cold': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'website form': return 'bg-blue-100 text-blue-800';
      case 'linkedin': return 'bg-purple-100 text-purple-800';
      case 'referral': return 'bg-green-100 text-green-800';
      case 'trade show': return 'bg-yellow-100 text-yellow-800';
      case 'cold call': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDeleteLead = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}? This action cannot be undone.`)) {
      try {
        await deleteLeadMutation.mutateAsync(id);
        toast({
          title: "Success",
          description: `${name} has been deleted successfully`,
        });
      } catch (error) {
        console.error('Error deleting lead:', error);
        toast({
          title: "Error",
          description: "Failed to delete lead. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleEditLead = (lead: any) => {
    if (onOpenEditLeadModal) {
      onOpenEditLeadModal(lead);
    }
  };

  const handleViewLead = (lead: any) => {
    if (onOpenViewLeadModal) {
      onOpenViewLeadModal(lead);
    }
  };

  if (leadsError) {
    return (
      <Layout>
        <div className="p-6">
          <div className="text-center py-8 text-red-600">
            Error loading leads: {leadsError.message}
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
            <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
            <p className="text-gray-600 mt-1">Manage your leads and convert them into customers</p>
          </div>
          <Button
            onClick={onOpenLeadModal}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Add Lead
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Total Leads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stats?.total || leads.length}
              </div>
              <p className="text-sm text-green-600">
                {stats?.growth || '+5 this week'}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <UserCheck className="w-4 h-4" />
                Qualified Leads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stats?.qualified || leads.filter((l: any) => l.status === 'qualified').length}
              </div>
              <p className="text-sm text-blue-600">
                {stats?.qualifiedGrowth || '10% increase'}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Contacted Leads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stats?.contacted || leads.filter((l: any) => l.status === 'contacted').length}
              </div>
              <p className="text-sm text-green-600">
                {stats?.contactedGrowth || '20% increase'}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                New Leads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stats?.new || leads.filter((l: any) => l.status === 'new').length}
              </div>
              <p className="text-sm text-purple-600">Fresh prospects</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <CardTitle>All Leads</CardTitle>
              <div className="flex gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search leads..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="proposal">Proposal</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {leadsLoading ? (
              <div className="text-center py-8 text-gray-500">
                Loading leads...
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLeads.map((lead: any) => (
                      <TableRow key={lead.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{lead.name}</TableCell>
                        <TableCell>{lead.company}</TableCell>
                        <TableCell className="text-blue-600">{lead.email}</TableCell>
                        <TableCell>{lead.phone}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(lead.status || 'cold')}>
                            {lead.status || 'cold'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getSourceColor(lead.source || 'other')}>
                            {lead.source || 'other'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleViewLead(lead)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleEditLead(lead)}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteLead(lead.id, lead.name)}
                              disabled={deleteLeadMutation.isPending}
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
            {!leadsLoading && filteredLeads.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No leads found matching your criteria.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Leads;
