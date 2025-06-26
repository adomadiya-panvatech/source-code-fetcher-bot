
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Search, Filter, MoreHorizontal, Eye, Reply, MessageSquare, Mail, Phone, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface CommunicationsProps {
  onOpenContactModal?: () => void;
  onOpenLeadModal?: () => void;
  onOpenOpportunityModal?: () => void;
  onOpenAccountModal?: () => void;
  onOpenSMSModal?: () => void;
  onOpenEmailModal?: () => void;
}

const fakeCommunications = [
  {
    id: 1,
    type: 'email',
    subject: 'Product Demo Follow-up',
    contact: 'John Smith',
    company: 'Tech Solutions Inc',
    direction: 'outbound',
    status: 'sent',
    date: '2024-01-15 10:30 AM',
    content: 'Thank you for your time during our product demo. I wanted to follow up...',
    assignedTo: 'Sarah Johnson'
  },
  {
    id: 2,
    type: 'phone',
    subject: 'Discovery Call',
    contact: 'Emily Chen',
    company: 'Financial Services Ltd',
    direction: 'inbound',
    status: 'completed',
    date: '2024-01-15 2:15 PM',
    content: 'Discussion about security requirements and compliance needs',
    assignedTo: 'Mike Davis'
  },
  {
    id: 3,
    type: 'sms',
    subject: 'Meeting Reminder',
    contact: 'Alex Martinez',
    company: 'Acme Corporation',
    direction: 'outbound',
    status: 'delivered',
    date: '2024-01-14 9:00 AM',
    content: 'Hi Alex, just a quick reminder about our meeting tomorrow at 2 PM.',
    assignedTo: 'John Smith'
  },
  {
    id: 4,
    type: 'email',
    subject: 'Proposal Submission',
    contact: 'Jennifer Lopez',
    company: 'Innovate Tech',
    direction: 'outbound',
    status: 'opened',
    date: '2024-01-13 4:45 PM',
    content: 'Please find attached our comprehensive proposal for your cloud migration project...',
    assignedTo: 'Sarah Johnson'
  },
  {
    id: 5,
    type: 'phone',
    subject: 'Technical Support',
    contact: 'Robert Brown',
    company: 'New Startup',
    direction: 'inbound',
    status: 'missed',
    date: '2024-01-12 11:20 AM',
    content: 'Customer called regarding integration questions',
    assignedTo: 'Emily Chen'
  }
];

const Communications: React.FC<CommunicationsProps> = ({ 
  onOpenContactModal, 
  onOpenLeadModal,
  onOpenOpportunityModal,
  onOpenAccountModal,
  onOpenSMSModal,
  onOpenEmailModal
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredCommunications = fakeCommunications.filter(comm => {
    const matchesSearch = comm.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comm.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comm.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || comm.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="w-4 h-4" />;
      case 'phone': return <Phone className="w-4 h-4" />;
      case 'sms': return <MessageSquare className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'email': return 'bg-blue-100 text-blue-800';
      case 'phone': return 'bg-green-100 text-green-800';
      case 'sms': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-blue-100 text-blue-800';
      case 'opened': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'missed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDirectionColor = (direction: string) => {
    return direction === 'inbound' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800';
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Communications</h1>
            <p className="text-gray-600 mt-1">Track all customer interactions and communications</p>
          </div>
          <div className="flex space-x-2">
            <Button 
              onClick={onOpenSMSModal}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Send SMS
            </Button>
            <Button 
              onClick={onOpenEmailModal}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Mail className="w-4 h-4 mr-2" />
              Send Email
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Emails Sent
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">24</div>
              <p className="text-sm text-green-600">+6 this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Calls Made
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">15</div>
              <p className="text-sm text-blue-600">80% connection rate</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                SMS Sent
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">8</div>
              <p className="text-sm text-green-600">100% delivery rate</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Send className="w-4 h-4" />
                Response Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">65%</div>
              <p className="text-sm text-green-600">Above average</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <CardTitle>Communication History</CardTitle>
              <div className="flex gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search communications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                  />
                </div>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="sms">SMS</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Direction</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCommunications.map((communication) => (
                    <TableRow key={communication.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge className={getTypeColor(communication.type)}>
                            {getTypeIcon(communication.type)}
                            <span className="ml-1 capitalize">{communication.type}</span>
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{communication.subject}</TableCell>
                      <TableCell>{communication.contact}</TableCell>
                      <TableCell>{communication.company}</TableCell>
                      <TableCell>
                        <Badge className={getDirectionColor(communication.direction)}>
                          {communication.direction}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(communication.status)}>
                          {communication.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{communication.date}</TableCell>
                      <TableCell>{communication.assignedTo}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Reply className="w-4 h-4" />
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
            {filteredCommunications.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No communications found matching your criteria.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Communications;
