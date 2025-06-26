
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter, DollarSign, Calendar, User, TrendingUp, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const opportunities = [
  {
    id: 1,
    title: 'Enterprise Software Deal',
    company: 'TechCorp Inc.',
    value: '$125,000',
    stage: 'Negotiation',
    probability: '75%',
    closeDate: '2024-01-15',
    owner: 'John Smith',
    status: 'hot'
  },
  {
    id: 2,
    title: 'Cloud Migration Project',
    company: 'Global Systems',
    value: '$85,000',
    stage: 'Proposal',
    probability: '60%',
    closeDate: '2024-01-28',
    owner: 'Sarah Johnson',
    status: 'warm'
  },
  {
    id: 3,
    title: 'Marketing Automation Suite',
    company: 'StartupXYZ',
    value: '$45,000',
    stage: 'Qualification',
    probability: '40%',
    closeDate: '2024-02-10',
    owner: 'Mike Davis',
    status: 'cold'
  }
];

const OpportunityModal = ({ open, onClose, data, setData }: any) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-2xl w-full max-w-xl relative border border-slate-200 dark:border-slate-700 space-y-4"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-2">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Create New Opportunity</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Fill out the details below.</p>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input placeholder="Title" value={data.title} onChange={e => setData(prev => ({ ...prev, title: e.target.value }))} />
              <Input placeholder="Company" value={data.company} onChange={e => setData(prev => ({ ...prev, company: e.target.value }))} />
              <Input placeholder="Value" value={data.value} onChange={e => setData(prev => ({ ...prev, value: e.target.value }))} />
              <Input placeholder="Stage" value={data.stage} onChange={e => setData(prev => ({ ...prev, stage: e.target.value }))} />
              <Input placeholder="Probability" value={data.probability} onChange={e => setData(prev => ({ ...prev, probability: e.target.value }))} />
              <Input placeholder="Close Date" type="date" value={data.closeDate} onChange={e => setData(prev => ({ ...prev, closeDate: e.target.value }))} />
              <Input placeholder="Owner" value={data.owner} onChange={e => setData(prev => ({ ...prev, owner: e.target.value }))} />
              <Input placeholder="Status" value={data.status} onChange={e => setData(prev => ({ ...prev, status: e.target.value }))} />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end pt-4 space-x-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log(data);
                  onClose();
                }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg"
              >
                Save Opportunity
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Opportunities = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    value: '',
    stage: '',
    probability: '',
    closeDate: '',
    owner: '',
    status: 'cold'
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hot': return 'bg-red-500/20 text-red-300 border-red-500/50';
      case 'warm': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50';
      case 'cold': return 'bg-blue-500/20 text-blue-300 border-blue-500/50';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Negotiation': return 'bg-green-500/20 text-green-300 border-green-500/50';
      case 'Proposal': return 'bg-purple-500/20 text-purple-300 border-purple-500/50';
      case 'Qualification': return 'bg-orange-500/20 text-orange-300 border-orange-500/50';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
    }
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Opportunities</h1>
            <p className="text-slate-600 dark:text-slate-400">Manage your sales pipeline and track deals</p>
          </div>
          <Button
            onClick={() => {
              setFormData({
                title: '',
                company: '',
                value: '',
                stage: '',
                probability: '',
                closeDate: '',
                owner: '',
                status: 'cold'
              });
              setIsModalOpen(true);
            }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Opportunity
          </Button>

        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl rounded-xl p-4 border border-white/20 dark:border-slate-700/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Value</p>
                <p className="text-xl font-bold text-slate-800 dark:text-white">$255K</p>
              </div>
            </div>
          </div>
          <div className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl rounded-xl p-4 border border-white/20 dark:border-slate-700/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Win Rate</p>
                <p className="text-xl font-bold text-slate-800 dark:text-white">68%</p>
              </div>
            </div>
          </div>
          <div className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl rounded-xl p-4 border border-white/20 dark:border-slate-700/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Avg. Cycle</p>
                <p className="text-xl font-bold text-slate-800 dark:text-white">45 days</p>
              </div>
            </div>
          </div>
          <div className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl rounded-xl p-4 border border-white/20 dark:border-slate-700/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Active</p>
                <p className="text-xl font-bold text-slate-800 dark:text-white">12</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search opportunities..."
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

        <OpportunityModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          data={formData}
          setData={setFormData}
        />

        {/* Opportunities Table */}
        <div className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/30 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/10 dark:bg-slate-700/30">
                <tr>
                  <th className="text-left p-4 text-slate-700 dark:text-slate-300 font-semibold">Opportunity</th>
                  <th className="text-left p-4 text-slate-700 dark:text-slate-300 font-semibold">Company</th>
                  <th className="text-left p-4 text-slate-700 dark:text-slate-300 font-semibold">Value</th>
                  <th className="text-left p-4 text-slate-700 dark:text-slate-300 font-semibold">Stage</th>
                  <th className="text-left p-4 text-slate-700 dark:text-slate-300 font-semibold">Probability</th>
                  <th className="text-left p-4 text-slate-700 dark:text-slate-300 font-semibold">Close Date</th>
                  <th className="text-left p-4 text-slate-700 dark:text-slate-300 font-semibold">Owner</th>
                  <th className="text-left p-4 text-slate-700 dark:text-slate-300 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {opportunities.map((opp) => (
                  <tr key={opp.id} className="border-t border-white/10 dark:border-slate-700/30 hover:bg-white/10 dark:hover:bg-slate-700/20 transition-colors cursor-pointer">
                    <td className="p-4">
                      <div className="font-semibold text-slate-800 dark:text-white">{opp.title}</div>
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">{opp.company}</td>
                    <td className="p-4">
                      <span className="font-semibold text-green-600 dark:text-green-400">{opp.value}</span>
                    </td>
                    <td className="p-4">
                      <Badge className={getStageColor(opp.stage)}>{opp.stage}</Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-12 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                            style={{ width: opp.probability }}
                          ></div>
                        </div>
                        <span className="text-sm text-slate-600 dark:text-slate-400">{opp.probability}</span>
                      </div>
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">{opp.closeDate}</td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">{opp.owner}</td>
                    <td className="p-4">
                      <Badge className={getStatusColor(opp.status)}>{opp.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Opportunities;
