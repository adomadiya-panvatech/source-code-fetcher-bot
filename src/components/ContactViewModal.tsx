
import React from 'react';
import { X, User, Mail, Phone, Building2, MapPin, Calendar, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
  tags?: string[];
  notes?: string;
  createdAt?: string;
  lastContact?: string;
}

interface ContactViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: Contact | null;
  onEdit: () => void;
}

export const ContactViewModal: React.FC<ContactViewModalProps> = ({ 
  isOpen, 
  onClose, 
  contact,
  onEdit 
}) => {
  if (!isOpen || !contact) return null;

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

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/50 w-full max-w-2xl mx-4 animate-scale-in">
        <div className="flex items-center justify-between p-6 border-b border-white/20 dark:border-slate-700/30">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Contact Details</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">View contact information</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onEdit}
              className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 dark:hover:bg-slate-700/50 rounded-xl transition-colors duration-200"
            >
              <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Name</label>
                <p className="text-lg font-semibold text-slate-800 dark:text-white">{contact.name}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                <p className="text-slate-800 dark:text-white">{contact.email}</p>
              </div>
              
              {contact.phone && (
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    Phone
                  </label>
                  <p className="text-slate-800 dark:text-white">{contact.phone}</p>
                </div>
              )}
              
              {contact.company && (
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1">
                    <Building2 className="w-4 h-4" />
                    Company
                  </label>
                  <p className="text-slate-800 dark:text-white">{contact.company}</p>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              {contact.position && (
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Position</label>
                  <p className="text-slate-800 dark:text-white">{contact.position}</p>
                </div>
              )}
              
              <div>
                <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Status</label>
                <div className="mt-1">
                  <Badge className={getStatusColor(contact.status || 'active')}>
                    {contact.status || 'active'}
                  </Badge>
                </div>
              </div>
              
              {contact.source && (
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Source</label>
                  <div className="mt-1">
                    <Badge className={getSourceColor(contact.source)}>
                      {contact.source}
                    </Badge>
                  </div>
                </div>
              )}
              
              {contact.createdAt && (
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Created
                  </label>
                  <p className="text-slate-800 dark:text-white">{contact.createdAt}</p>
                </div>
              )}
            </div>
          </div>
          
          {contact.address && (
            <div>
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                Address
              </label>
              <p className="text-slate-800 dark:text-white mt-1">{contact.address}</p>
            </div>
          )}
          
          {contact.tags && contact.tags.length > 0 && (
            <div>
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1 mb-2">
                <Tag className="w-4 h-4" />
                Tags
              </label>
              <div className="flex gap-1 flex-wrap">
                {contact.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {contact.notes && (
            <div>
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Notes</label>
              <p className="text-slate-800 dark:text-white mt-1 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                {contact.notes}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
