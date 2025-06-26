
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter, Building2, Users, DollarSign, MapPin } from 'lucide-react';

const accounts = [
  {
    id: 1,
    name: 'TechCorp Inc.',
    industry: 'Technology',
    type: 'Enterprise',
    revenue: '$50M+',
    employees: '1000+',
    location: 'San Francisco, CA',
    status: 'Active',
    contacts: 12,
    opportunities: 3
  },
  {
    id: 2,
    name: 'Global Systems Ltd.',
    industry: 'Consulting',
    type: 'Mid-Market',
    revenue: '$10M-50M',
    employees: '500-1000',
    location: 'New York, NY',
    status: 'Active',
    contacts: 8,
    opportunities: 2
  },
  {
    id: 3,
    name: 'StartupXYZ',
    industry: 'Fintech',
    type: 'Small Business',
    revenue: '<$10M',
    employees: '50-100',
    location: 'Austin, TX',
    status: 'Prospect',
    contacts: 3,
    opportunities: 1
  }
];

const Accounts = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-500/20 text-green-300 border-green-500/50';
      case 'Prospect': return 'bg-blue-500/20 text-blue-300 border-blue-500/50';
      case 'Inactive': return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Enterprise': return 'bg-purple-500/20 text-purple-300 border-purple-500/50';
      case 'Mid-Market': return 'bg-orange-500/20 text-orange-300 border-orange-500/50';
      case 'Small Business': return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
    }
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Accounts</h1>
            <p className="text-slate-600 dark:text-slate-400">Manage your customer accounts and relationships</p>
          </div>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
            <Plus className="w-4 h-4 mr-2" />
            New Account
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl rounded-xl p-4 border border-white/20 dark:border-slate-700/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Accounts</p>
                <p className="text-xl font-bold text-slate-800 dark:text-white">247</p>
              </div>
            </div>
          </div>
          <div className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl rounded-xl p-4 border border-white/20 dark:border-slate-700/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Revenue</p>
                <p className="text-xl font-bold text-slate-800 dark:text-white">$12.4M</p>
              </div>
            </div>
          </div>
          <div className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl rounded-xl p-4 border border-white/20 dark:border-slate-700/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Active</p>
                <p className="text-xl font-bold text-slate-800 dark:text-white">189</p>
              </div>
            </div>
          </div>
          <div className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl rounded-xl p-4 border border-white/20 dark:border-slate-700/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Locations</p>
                <p className="text-xl font-bold text-slate-800 dark:text-white">34</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search accounts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/50 dark:bg-slate-700/50 border-white/30 dark:border-slate-600/30 backdrop-blur-sm"
            />
          </div>
          <Button variant="outline" className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-sm border-white/30 dark:border-slate-700/30">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Accounts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map((account) => (
            <div key={account.id} className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/30 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105 cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <Badge className={getStatusColor(account.status)}>{account.status}</Badge>
              </div>
              
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">{account.name}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{account.industry}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Type</span>
                  <Badge className={getTypeColor(account.type)}>{account.type}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Revenue</span>
                  <span className="text-sm font-medium text-slate-800 dark:text-white">{account.revenue}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Employees</span>
                  <span className="text-sm font-medium text-slate-800 dark:text-white">{account.employees}</span>
                </div>
              </div>
              
              <div className="flex items-center text-slate-600 dark:text-slate-400 text-sm mb-4">
                <MapPin className="w-4 h-4 mr-1" />
                {account.location}
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-white/10 dark:border-slate-700/30">
                <div className="text-center">
                  <p className="text-lg font-bold text-slate-800 dark:text-white">{account.contacts}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Contacts</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-slate-800 dark:text-white">{account.opportunities}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Opportunities</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Accounts;
