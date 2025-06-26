
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Search, Filter, MoreHorizontal, Eye, Edit2, TrendingUp, UserPlus, Target, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface LeadsProps {
  onOpenContactModal?: () => void;
  onOpenLeadModal?: () => void;
  onOpenOpportunityModal?: () => void;
  onOpenAccountModal?: () => void;
  onOpenSMSModal?: () => void;
  onOpenEmailModal?: () => void;
}

const fakeLeads = [
  {
    id: 1,
    name: 'Alex Martinez',
    email: 'alex.martinez@acmecorp.com',
    phone: '+1 (555) 111-2222',
    company: 'Acme Corporation',
    jobTitle: 'IT Manager',
    source: 'Website Form',
    score: 85,
    status: 'qualified',
    assignedTo: 'John Smith',
    createdDate: '2024-01-14',
    lastActivity: '2024-01-15',
    interest: 'Enterprise Software'
  },
  {
    id: 2,
    name: 'Jennifer Lopez',
    email: 'j.lopez@innovatetech.com',
    phone: '+1 (555) 222-3333',
    company: 'Innovate Tech',
    jobTitle: 'CIO',
    source: 'LinkedIn',
    score: 92,
    status: 'hot',
    assignedTo: 'Sarah Johnson',
    createdDate: '2024-01-13',
    lastActivity: '2024-01-15',
    interest: 'Cloud Migration'
  },
  {
    id: 3,
    name: 'Robert Brown',
    email: 'r.brown@newstartup.io',
    phone: '+1 (555) 333-4444',
    company: 'New Startup',
    jobTitle: 'Founder',
    source: 'Referral',
    score: 70,
    status: 'warm',
    assignedTo: 'Mike Davis',
    createdDate: '2024-01-12',
    lastActivity: '2024-01-14',
    interest: 'SaaS Platform'
  },
  {
    id: 4,
    name: 'Lisa Wang',
    email: 'lisa.wang@enterprise.com',
    phone: '+1 (555) 444-5555',
    company: 'Enterprise Solutions',
    jobTitle: 'VP Technology',
    source: 'Trade Show',
    score: 78,
    status: 'qualified',
    assignedTo: 'Emily Chen',
    createdDate: '2024-01-11',
    lastActivity: '2024-01-13',
    interest: 'Security Solutions'
  },
  {
    id: 5,
    name: 'Mark Thompson',
    email: 'mark.t@smallbiz.com',
    phone: '+1 (555) 555-6666',
    company: 'Small Business Inc',
    jobTitle: 'Owner',
    source: 'Cold Call',
    score: 45,
    status: 'cold',
    assignedTo: 'David Wilson',
    createdDate: '2024-01-10',
    lastActivity: '2024-01-11',
    interest: 'Basic Package'
  }
];

const Leads: React.FC<LeadsProps> = ({ 
  onOpenContactModal, 
  onOpenLeadModal,
  onOpenOpportunityModal,
  onOpenAccountModal,
  onOpenSMSModal,
  onOpenEmailModal
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredLeads = fakeLeads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || lead.status.toLowerCase() === filterStatus.toLowerCase();
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

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'Website Form': return 'bg-blue-100 text-blue-800';
      case 'LinkedIn': return 'bg-purple-100 text-purple-800';
      case 'Referral': return 'bg-green-100 text-green-800';
      case 'Trade Show': return 'bg-yellow-100 text-yellow-800';
      case 'Cold Call': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
            <p className="text-gray-600 mt-1">Track and nurture your potential customers</p>
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
                <UserPlus className="w-4 h-4" />
                Total Leads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">5</div>
              <p className="text-sm text-green-600">+3 this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Qualified Leads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">2</div>
              <p className="text-sm text-blue-600">40% conversion</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Hot Leads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">1</div>
              <p className="text-sm text-red-600">High priority</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Star className="w-4 h-4" />
                Avg Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">74</div>
              <p className="text-sm text-yellow-600">Good quality</p>
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
                  <option value="all">All Status</option>
                  <option value="hot">Hot</option>
                  <option value="warm">Warm</option>
                  <option value="qualified">Qualified</option>
                  <option value="cold">Cold</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Last Activity</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.map((lead) => (
                    <TableRow key={lead.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{lead.name}</TableCell>
                      <TableCell>{lead.company}</TableCell>
                      <TableCell>{lead.jobTitle}</TableCell>
                      <TableCell className="text-blue-600">{lead.email}</TableCell>
                      <TableCell className="text-gray-600">{lead.phone}</TableCell>
                      <TableCell>
                        <Badge className={getSourceColor(lead.source)}>
                          {lead.source}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className={`font-semibold ${getScoreColor(lead.score)}`}>
                          {lead.score}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(lead.status)}>
                          {lead.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{lead.assignedTo}</TableCell>
                      <TableCell>{lead.lastActivity}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {filteredLeads.length === 0 && (
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
