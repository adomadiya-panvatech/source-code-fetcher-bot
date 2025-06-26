
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter, Users, Mail, Phone, Building2 } from 'lucide-react';

const contacts = [
  {
    id: 1,
    name: 'John Smith',
    title: 'CEO',
    company: 'TechCorp Inc.',
    email: 'john.smith@techcorp.com',
    phone: '+1 (555) 123-4567',
    status: 'Active',
    lastContact: '2024-01-10',
    leadScore: 95
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    title: 'CTO',
    company: 'Global Systems',
    email: 'sarah.j@globalsys.com',
    phone: '+1 (555) 987-6543',
    status: 'Active',
    lastContact: '2024-01-08',
    leadScore: 87
  },
  {
    id: 3,
    name: 'Mike Davis',
    title: 'Marketing Director',
    company: 'StartupXYZ',
    email: 'mike@startupxyz.com',
    phone: '+1 (555) 456-7890',
    status: 'Inactive',
    lastContact: '2023-12-15',
    leadScore: 72
  }
];

const Contacts = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-500/20 text-green-300 border-green-500/50';
      case 'Inactive': return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
      case 'Prospect': return 'bg-blue-500/20 text-blue-300 border-blue-500/50';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
    }
  };

  const getLeadScoreColor = (score: number) => {
    if (score >= 90) return 'from-green-500 to-emerald-600';
    if (score >= 70) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-pink-600';
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Contacts</h1>
            <p className="text-slate-600 dark:text-slate-400">Manage your business contacts and relationships</p>
          </div>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
            <Plus className="w-4 h-4 mr-2" />
            New Contact
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl rounded-xl p-4 border border-white/20 dark:border-slate-700/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Contacts</p>
                <p className="text-xl font-bold text-slate-800 dark:text-white">5,678</p>
              </div>
            </div>
          </div>
          <div className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl rounded-xl p-4 border border-white/20 dark:border-slate-700/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Email Campaigns</p>
                <p className="text-xl font-bold text-slate-800 dark:text-white">24</p>
              </div>
            </div>
          </div>
          <div className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl rounded-xl p-4 border border-white/20 dark:border-slate-700/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Calls This Week</p>
                <p className="text-xl font-bold text-slate-800 dark:text-white">156</p>
              </div>
            </div>
          </div>
          <div className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl rounded-xl p-4 border border-white/20 dark:border-slate-700/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Companies</p>
                <p className="text-xl font-bold text-slate-800 dark:text-white">247</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search contacts..."
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

        {/* Contacts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map((contact) => (
            <div key={contact.id} className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/30 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105 cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg text-white font-semibold">
                    {contact.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-white">{contact.name}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{contact.title}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(contact.status)}>{contact.status}</Badge>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center text-slate-600 dark:text-slate-400 text-sm">
                  <Building2 className="w-4 h-4 mr-2" />
                  {contact.company}
                </div>
                <div className="flex items-center text-slate-600 dark:text-slate-400 text-sm">
                  <Mail className="w-4 h-4 mr-2" />
                  {contact.email}
                </div>
                <div className="flex items-center text-slate-600 dark:text-slate-400 text-sm">
                  <Phone className="w-4 h-4 mr-2" />
                  {contact.phone}
                </div>
              </div>
              
              <div className="space-y-3 pt-4 border-t border-white/10 dark:border-slate-700/30">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Last Contact</span>
                  <span className="text-sm font-medium text-slate-800 dark:text-white">{contact.lastContact}</span>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Lead Score</span>
                    <span className="text-sm font-bold text-slate-800 dark:text-white">{contact.leadScore}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${getLeadScoreColor(contact.leadScore)} rounded-full transition-all duration-300`}
                      style={{ width: `${contact.leadScore}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Contacts;
