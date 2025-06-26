
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter, UserCheck, Star, Clock, TrendingUp } from 'lucide-react';

const leads = [
  {
    id: 1,
    name: 'Alex Rodriguez',
    company: 'Innovation Labs',
    title: 'Product Manager',
    source: 'Website',
    status: 'Hot',
    score: 92,
    value: '$75,000',
    createdDate: '2024-01-10',
    lastActivity: '2 hours ago'
  },
  {
    id: 2,
    name: 'Emma Thompson',
    company: 'Digital Solutions',
    title: 'VP of Sales',
    source: 'LinkedIn',
    status: 'Warm',
    score: 78,
    value: '$45,000',
    createdDate: '2024-01-08',
    lastActivity: '1 day ago'
  },
  {
    id: 3,
    name: 'David Chen',
    company: 'Future Corp',
    title: 'IT Director',
    source: 'Referral',
    status: 'Cold',
    score: 54,
    value: '$30,000',
    createdDate: '2024-01-05',
    lastActivity: '5 days ago'
  }
];

const Leads = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hot': return 'bg-red-500/20 text-red-300 border-red-500/50';
      case 'Warm': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50';
      case 'Cold': return 'bg-blue-500/20 text-blue-300 border-blue-500/50';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'Website': return 'bg-green-500/20 text-green-300 border-green-500/50';
      case 'LinkedIn': return 'bg-blue-500/20 text-blue-300 border-blue-500/50';
      case 'Referral': return 'bg-purple-500/20 text-purple-300 border-purple-500/50';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-600';
    if (score >= 60) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-pink-600';
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Leads</h1>
            <p className="text-slate-600 dark:text-slate-400">Track and nurture your sales prospects</p>
          </div>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
            <Plus className="w-4 h-4 mr-2" />
            New Lead
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl rounded-xl p-4 border border-white/20 dark:border-slate-700/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Leads</p>
                <p className="text-xl font-bold text-slate-800 dark:text-white">1,234</p>
              </div>
            </div>
          </div>
          <div className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl rounded-xl p-4 border border-white/20 dark:border-slate-700/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Hot Leads</p>
                <p className="text-xl font-bold text-slate-800 dark:text-white">89</p>
              </div>
            </div>
          </div>
          <div className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl rounded-xl p-4 border border-white/20 dark:border-slate-700/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Conversion Rate</p>
                <p className="text-xl font-bold text-slate-800 dark:text-white">23.5%</p>
              </div>
            </div>
          </div>
          <div className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl rounded-xl p-4 border border-white/20 dark:border-slate-700/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Avg. Response</p>
                <p className="text-xl font-bold text-slate-800 dark:text-white">2.4h</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search leads..."
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

        {/* Leads Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leads.map((lead) => (
            <div key={lead.id} className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/30 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105 cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg text-white font-semibold">
                    {lead.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-white">{lead.name}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{lead.title}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(lead.status)}>{lead.status}</Badge>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Company</span>
                  <span className="text-sm font-medium text-slate-800 dark:text-white">{lead.company}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Source</span>
                  <Badge className={getSourceColor(lead.source)}>{lead.source}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Value</span>
                  <span className="text-sm font-bold text-green-600 dark:text-green-400">{lead.value}</span>
                </div>
              </div>
              
              <div className="space-y-3 pt-4 border-t border-white/10 dark:border-slate-700/30">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Lead Score</span>
                    <span className="text-sm font-bold text-slate-800 dark:text-white">{lead.score}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${getScoreColor(lead.score)} rounded-full transition-all duration-300`}
                      style={{ width: `${lead.score}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-500">
                  <span>Created: {lead.createdDate}</span>
                  <span>Last: {lead.lastActivity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Leads;
