import React, { useState, useEffect } from 'react';
import { X, Building2, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { useUpdateAccount } from '@/hooks/useAccounts';
import { useToast } from '@/hooks/use-toast';

interface Account {
  id: string;
  name: string;
  type?: string;
  industry?: string;
  website?: string;
  phone?: string;
  email?: string;
  address?: string;
  description?: string;
  revenue?: number;
  employees?: number;
  notes?: string;
}

interface AccountEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: Account | null;
}

export const AccountEditModal: React.FC<AccountEditModalProps> = ({ 
  isOpen, 
  onClose, 
  account 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'prospect',
    industry: '',
    website: '',
    phone: '',
    email: '',
    address: '',
    description: '',
    revenue: 0,
    employees: 0,
    notes: ''
  });

  const updateAccountMutation = useUpdateAccount();
  const { toast } = useToast();

  useEffect(() => {
    if (account) {
      setFormData({
        name: account.name,
        type: account.type || 'prospect',
        industry: account.industry || '',
        website: account.website || '',
        phone: account.phone || '',
        email: account.email || '',
        address: account.address || '',
        description: account.description || '',
        revenue: account.revenue || 0,
        employees: account.employees || 0,
        notes: account.notes || ''
      });
    }
  }, [account]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!account) return;
    
    try {
      await updateAccountMutation.mutateAsync({ id: account.id, data: formData });
      toast({
        title: "Success",
        description: "Account updated successfully",
      });
      onClose();
    } catch (error) {
      console.error('Error updating account:', error);
      toast({
        title: "Error",
        description: "Failed to update account. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen || !account) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/50 w-full max-w-2xl mx-4 animate-scale-in">
        <div className="flex items-center justify-between p-6 border-b border-white/20 dark:border-slate-700/30">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Edit Account</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">Update account information</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 dark:hover:bg-slate-700/50 rounded-xl transition-colors duration-200"
          >
            <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Account Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent backdrop-blur-sm transition-all duration-200"
              placeholder="Enter account name"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Account Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent backdrop-blur-sm transition-all duration-200"
              >
                <option value="prospect">Prospect</option>
                <option value="customer">Customer</option>
                <option value="partner">Partner</option>
                <option value="competitor">Competitor</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Industry
              </label>
              <input
                type="text"
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                placeholder="Enter industry"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <Mail className="w-4 h-4 inline mr-1" />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                placeholder="Enter email address"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <Phone className="w-4 h-4 inline mr-1" />
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                placeholder="Enter phone number"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <Globe className="w-4 h-4 inline mr-1" />
                Website
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                placeholder="Enter website URL"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Employees
              </label>
              <input
                type="number"
                name="employees"
                value={formData.employees}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                placeholder="Number of employees"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <MapPin className="w-4 h-4 inline mr-1" />
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent backdrop-blur-sm transition-all duration-200"
              placeholder="Enter address"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent backdrop-blur-sm transition-all duration-200 resize-none"
              placeholder="Describe the account..."
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent backdrop-blur-sm transition-all duration-200 resize-none"
              placeholder="Additional notes about this account..."
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-white/50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-white/70 dark:hover:bg-slate-600/50 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updateAccountMutation.isPending}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl hover:from-orange-600 hover:to-red-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updateAccountMutation.isPending ? 'Updating...' : 'Update Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
