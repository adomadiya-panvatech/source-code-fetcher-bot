
import React, { useState, useEffect } from 'react';
import { X, User, Mail, Phone, Building2, MapPin } from 'lucide-react';
import { useUpdateContact } from '@/hooks/useContacts';
import { useToast } from '@/hooks/use-toast';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  position?: string;
  address?: string;
  source?: string;
  status?: string;
  notes?: string;
  tags?: string;
}

interface ContactEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: Contact | null;
}

export const ContactEditModal: React.FC<ContactEditModalProps> = ({ 
  isOpen, 
  onClose, 
  contact 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    address: '',
    notes: '',
    source: 'website',
    status: 'active',
    tags: ''
  });

  const updateContactMutation = useUpdateContact();
  const { toast } = useToast();

  useEffect(() => {
    if (contact) {
      setFormData({
        name: contact.name,
        email: contact.email,
        phone: contact.phone || '',
        company: contact.company || '',
        position: contact.position || '',
        address: contact.address || '',
        notes: contact.notes || '',
        source: contact.source || 'website',
        status: contact.status || 'active',
        tags: contact.tags || ''
      });
    }
  }, [contact]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contact) return;
    
    try {
      await updateContactMutation.mutateAsync({ id: contact.id, data: formData });
      toast({
        title: "Success",
        description: "Contact updated successfully",
      });
      onClose();
    } catch (error) {
      console.error('Error updating contact:', error);
      toast({
        title: "Error",
        description: "Failed to update contact. Please try again.",
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

  if (!isOpen || !contact) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/50 w-full max-w-2xl mx-4 animate-scale-in">
        <div className="flex items-center justify-between p-6 border-b border-white/20 dark:border-slate-700/30">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Edit Contact</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">Update contact information</p>
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
              Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent backdrop-blur-sm transition-all duration-200"
              placeholder="Enter contact name"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <Mail className="w-4 h-4 inline mr-1" />
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent backdrop-blur-sm transition-all duration-200"
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
                className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                placeholder="Enter phone number"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <Building2 className="w-4 h-4 inline mr-1" />
                Company
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                placeholder="Enter company name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Position
              </label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                placeholder="Enter job position"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Source
              </label>
              <select
                name="source"
                value={formData.source}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent backdrop-blur-sm transition-all duration-200"
              >
                <option value="website">Website</option>
                <option value="referral">Referral</option>
                <option value="social_media">Social Media</option>
                <option value="advertisement">Advertisement</option>
                <option value="trade_show">Trade Show</option>
                <option value="cold_call">Cold Call</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent backdrop-blur-sm transition-all duration-200"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="prospect">Prospect</option>
                <option value="customer">Customer</option>
              </select>
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
              className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent backdrop-blur-sm transition-all duration-200"
              placeholder="Enter address"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Tags
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent backdrop-blur-sm transition-all duration-200"
              placeholder="Enter tags (comma separated)"
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
              className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent backdrop-blur-sm transition-all duration-200 resize-none"
              placeholder="Additional notes about this contact..."
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
              disabled={updateContactMutation.isPending}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updateContactMutation.isPending ? 'Updating...' : 'Update Contact'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
