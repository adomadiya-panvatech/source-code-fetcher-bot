
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Search, Filter, MoreHorizontal, Eye, Edit2, Phone, Mail, User, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useContacts, useContactStats, useDeleteContact } from '@/hooks/useContacts';
import { ContactViewModal } from '@/components/ContactViewModal';
import { ContactEditModal } from '@/components/ContactEditModal';

interface ContactsProps {
  onOpenContactModal?: () => void;
  onOpenLeadModal?: () => void;
  onOpenOpportunityModal?: () => void;
  onOpenAccountModal?: () => void;
  onOpenSMSModal?: () => void;
  onOpenEmailModal?: () => void;
}

const Contacts: React.FC<ContactsProps> = ({ 
  onOpenContactModal, 
  onOpenLeadModal,
  onOpenOpportunityModal,
  onOpenAccountModal,
  onOpenSMSModal,
  onOpenEmailModal
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const { data: contacts = [], isLoading: contactsLoading, error: contactsError } = useContacts();
  const { data: stats } = useContactStats();
  const deleteContactMutation = useDeleteContact();

  const filteredContacts = contacts.filter((contact: any) => {
    const matchesSearch = contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.company?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || contact.status?.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'prospect': return 'bg-blue-100 text-blue-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'Website': return 'bg-blue-100 text-blue-800';
      case 'Referral': return 'bg-green-100 text-green-800';
      case 'LinkedIn': return 'bg-purple-100 text-purple-800';
      case 'Cold Call': return 'bg-orange-100 text-orange-800';
      case 'Trade Show': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDeleteContact = (id: string) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      deleteContactMutation.mutate(id);
    }
  };

  const handleViewContact = (contact: any) => {
    setSelectedContact(contact);
    setViewModalOpen(true);
  };

  const handleEditContact = (contact: any) => {
    setSelectedContact(contact);
    setEditModalOpen(true);
  };

  const handleEditFromView = () => {
    setViewModalOpen(false);
    setEditModalOpen(true);
  };

  if (contactsError) {
    return (
      <Layout>
        <div className="p-6">
          <div className="text-center py-8 text-red-600">
            Error loading contacts: {contactsError.message}
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
            <h1 className="text-3xl font-bold text-gray-900">Contacts</h1>
            <p className="text-gray-600 mt-1">Manage your business contacts and relationships</p>
          </div>
          <Button 
            onClick={onOpenContactModal}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Add Contact
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Total Contacts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stats?.total || contacts.length}
              </div>
              <p className="text-sm text-green-600">
                {stats?.growth || '+2 this week'}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <User className="w-4 h-4" />
                Active Contacts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stats?.active || contacts.filter((c: any) => c.status === 'active').length}
              </div>
              <p className="text-sm text-blue-600">
                {stats?.engagement || '60% engagement'}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Recent Calls
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stats?.recentCalls || '12'}
              </div>
              <p className="text-sm text-green-600">This week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Response
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stats?.emailResponse || '85%'}
              </div>
              <p className="text-sm text-green-600">Response rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <CardTitle>All Contacts</CardTitle>
              <div className="flex gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search contacts..."
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
                  <option value="active">Active</option>
                  <option value="prospect">Prospect</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {contactsLoading ? (
              <div className="text-center py-8 text-gray-500">
                Loading contacts...
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Contact</TableHead>
                      <TableHead>Tags</TableHead>
                      <TableHead className="w-[150px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContacts.map((contact: any) => (
                      <TableRow key={contact.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{contact.name}</TableCell>
                        <TableCell>{contact.company}</TableCell>
                        <TableCell>{contact.position}</TableCell>
                        <TableCell className="text-blue-600">{contact.email}</TableCell>
                        <TableCell className="text-gray-600">{contact.phone}</TableCell>
                        <TableCell>
                          <Badge className={getSourceColor(contact.source || 'Other')}>
                            {contact.source || 'Other'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(contact.status || 'active')}>
                            {contact.status || 'active'}
                          </Badge>
                        </TableCell>
                        <TableCell>{contact.lastContact || contact.updatedAt}</TableCell>
                        <TableCell>
                          <div className="flex gap-1 flex-wrap">
                            {(contact.tags || []).slice(0, 2).map((tag: string, index: number) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleViewContact(contact)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleEditContact(contact)}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={onOpenSMSModal}>
                              <Phone className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={onOpenEmailModal}>
                              <Mail className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
            {!contactsLoading && filteredContacts.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No contacts found matching your criteria.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <ContactViewModal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        contact={selectedContact}
        onEdit={handleEditFromView}
      />
      
      <ContactEditModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        contact={selectedContact}
      />
    </Layout>
  );
};

export default Contacts;
