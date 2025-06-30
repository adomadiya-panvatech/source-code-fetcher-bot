import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Search, Filter, MoreHorizontal, Eye, Edit2, Building2, Users, TrendingUp, Star, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAccounts, useAccountStats, useDeleteAccount } from '@/hooks/useAccounts';
import { useToast } from '@/hooks/use-toast';

interface AccountsProps {
  onOpenContactModal?: () => void;
  onOpenLeadModal?: () => void;
  onOpenOpportunityModal?: () => void;
  onOpenAccountModal?: () => void;
  onOpenSMSModal?: () => void;
  onOpenEmailModal?: () => void;
  onOpenEditContactModal?: (contact: any) => void;
  onOpenEditLeadModal?: (lead: any) => void;
  onOpenEditOpportunityModal?: (opportunity: any) => void;
  onOpenEditAccountModal?: (account: any) => void;
  onOpenViewAccountModal?: (account: any) => void;
}

const Accounts: React.FC<AccountsProps> = ({
  onOpenContactModal,
  onOpenLeadModal,
  onOpenOpportunityModal,
  onOpenAccountModal,
  onOpenSMSModal,
  onOpenEmailModal,
  onOpenEditContactModal,
  onOpenEditLeadModal,
  onOpenEditOpportunityModal,
  onOpenEditAccountModal,
  onOpenViewAccountModal
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const { data: accountsResponse, isLoading: accountsLoading, error: accountsError } = useAccounts();
  const accounts = Array.isArray(accountsResponse?.data) ? accountsResponse.data : [];

  const { data: stats } = useAccountStats();
  const deleteAccountMutation = useDeleteAccount();
  const { toast } = useToast();

  const filteredAccounts = Array.isArray(accounts) ? accounts.filter((account: any) => {
    const matchesSearch = account.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.industry?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || account.type?.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesFilter;
  }) : [];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'customer': return 'bg-green-100 text-green-800';
      case 'prospect': return 'bg-blue-100 text-blue-800';
      case 'partner': return 'bg-purple-100 text-purple-800';
      case 'competitor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDeleteAccount = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}? This action cannot be undone.`)) {
      try {
        await deleteAccountMutation.mutateAsync(id);
        toast({
          title: "Success",
          description: `${name} has been deleted successfully`,
        });
      } catch (error) {
        console.error('Error deleting account:', error);
        toast({
          title: "Error",
          description: "Failed to delete account. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleEditAccount = (account: any) => {
    if (onOpenEditAccountModal) {
      onOpenEditAccountModal(account);
    }
  };

  const handleViewAccount = (account: any) => {
    if (onOpenViewAccountModal) {
      onOpenViewAccountModal(account);
    }
  };

  if (accountsError) {
    return (
      <Layout>
        <div className="p-6">
          <div className="text-center py-8 text-red-600">
            Error loading accounts: {accountsError.message}
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
            <h1 className="text-3xl font-bold text-gray-900">Accounts</h1>
            <p className="text-gray-600 mt-1">Manage your business accounts and relationships</p>
          </div>
          <Button
            onClick={onOpenAccountModal}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Add Account
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Total Accounts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stats?.total || accounts.length}
              </div>
              <p className="text-sm text-green-600">
                {stats?.growth || '+2 this week'}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Active Customers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stats?.customers || accounts.filter((a: any) => a.type === 'customer').length}
              </div>
              <p className="text-sm text-blue-600">
                {stats?.customerGrowth || '15% increase'}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Revenue Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stats?.revenue || '$2.4M'}
              </div>
              <p className="text-sm text-green-600">Annual recurring</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Star className="w-4 h-4" />
                Key Partners
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stats?.partners || accounts.filter((a: any) => a.type === 'partner').length}
              </div>
              <p className="text-sm text-purple-600">Strategic alliances</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <CardTitle>All Accounts</CardTitle>
              <div className="flex gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search accounts..."
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
                  <option value="customer">Customer</option>
                  <option value="prospect">Prospect</option>
                  <option value="partner">Partner</option>
                  <option value="competitor">Competitor</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {accountsLoading ? (
              <div className="text-center py-8 text-gray-500">
                Loading accounts...
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Account Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Industry</TableHead>
                      <TableHead>Website</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Employees</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAccounts.map((account: any) => (
                      <TableRow key={account.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{account.name}</TableCell>
                        <TableCell>
                          <Badge className={getTypeColor(account.type || 'prospect')}>
                            {account.type || 'prospect'}
                          </Badge>
                        </TableCell>
                        <TableCell>{account.industry}</TableCell>
                        <TableCell className="text-blue-600">{account.website}</TableCell>
                        <TableCell className="text-gray-600">{account.phone}</TableCell>
                        <TableCell className="text-blue-600">{account.email}</TableCell>
                        <TableCell>{account.employees}</TableCell>
                        <TableCell className="font-semibold text-green-600">{account.revenue}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleViewAccount(account)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleEditAccount(account)}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteAccount(account.id, account.name)}
                              disabled={deleteAccountMutation.isPending}
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
            {!accountsLoading && filteredAccounts.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No accounts found matching your criteria.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Accounts;
