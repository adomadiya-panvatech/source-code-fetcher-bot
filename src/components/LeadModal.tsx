import React, { useState } from 'react';
import {
  X,
  TrendingUp,
  User,
  Mail,
  Phone,
  Building2,
  DollarSign,
  Briefcase,
  FileText,
  Star,
  Type
} from 'lucide-react';
import { useCreateLead } from '@/hooks/useLeads';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeadModal: React.FC<LeadModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    status: 'new',
    description: '',
    assigned_to: 2, // Default user ID
    name: '',
    company: '',
    job_title: '',
    email: '',
    phone: '',
    source: '',
    score: 100
  });

  const createLeadMutation = useCreateLead();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title: formData.title || 'New Business Opportunity',
      status: formData.status,
      description: formData.description || 'Potential client interested in our services',
      assigned_to: formData.assigned_to,
      name: formData.name,
      company: formData.company,
      job_title: formData.job_title,
      email: formData.email,
      phone: formData.phone,
      source: formData.source,
      score: formData.score
    };

    try {
      await createLeadMutation.mutateAsync(payload);
      console.log('Lead created successfully');
      onClose();

      setFormData({
        title: '',
        status: 'new',
        description: '',
        assigned_to: 2,
        name: '',
        company: '',
        job_title: '',
        email: '',
        phone: '',
        source: '',
        score: 100
      });
    } catch (error) {
      console.error('Error creating lead:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'score' ? Number(value) : value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/50 w-full max-w-2xl mx-4 animate-scale-in">
        <div className="flex items-center justify-between p-6 border-b border-white/20 dark:border-slate-700/30">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Add New Lead</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">Create a new lead opportunity</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 dark:hover:bg-slate-700/50 rounded-xl transition-colors duration-200"
          >
            <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <Type className="inline w-4 h-4 mr-1" />
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl focus:ring-green-500/50"
                placeholder="Enter lead title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <User className="inline w-4 h-4 mr-1" />
                Contact Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl"
                placeholder="Enter contact name"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <Mail className="inline w-4 h-4 mr-1" />
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl"
                placeholder="Enter email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <Phone className="inline w-4 h-4 mr-1" />
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl"
                placeholder="Enter phone"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <Building2 className="inline w-4 h-4 mr-1" />
                Company
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl"
                placeholder="Enter company name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <Briefcase className="inline w-4 h-4 mr-1" />
                Job Title
              </label>
              <input
                type="text"
                name="job_title"
                value={formData.job_title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl"
                placeholder="Enter job title"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Lead Source
              </label>
              <select
                name="source"
                value={formData.source}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl"
              >
                <option value="">Select source</option>
                <option value="website">Website</option>
                <option value="referral">Referral</option>
                <option value="social-media">Social Media</option>
                <option value="cold-call">Cold Call</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <Star className="inline w-4 h-4 mr-1" />
                Score
              </label>
              <input
                type="number"
                name="score"
                value={formData.score}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl"
                placeholder="Score (0-100)"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <FileText className="inline w-4 h-4 mr-1" />
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl resize-none"
              placeholder="Enter lead description..."
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-white/50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-white/70 dark:hover:bg-slate-600/50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Add Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
