
import React, { useState } from 'react';
import { X, Phone, Send, User, Clock } from 'lucide-react';

interface SMSModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SMSModal: React.FC<SMSModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    recipient: '',
    message: '',
    scheduled: false,
    scheduleDate: '',
    scheduleTime: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('SMS data:', formData);
    onClose();
    setFormData({
      recipient: '',
      message: '',
      scheduled: false,
      scheduleDate: '',
      scheduleTime: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/50 w-full max-w-2xl mx-4 animate-scale-in">
        <div className="flex items-center justify-between p-6 border-b border-white/20 dark:border-slate-700/30">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Send SMS</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">Send a text message to your contacts</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 dark:hover:bg-slate-700/50 rounded-xl transition-colors duration-200">
            <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <User className="w-4 h-4 inline mr-1" />
              Recipient *
            </label>
            <input
              type="text"
              name="recipient"
              value={formData.recipient}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent backdrop-blur-sm transition-all duration-200"
              placeholder="Enter phone number or select contact"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Message *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={4}
              maxLength={160}
              className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent backdrop-blur-sm transition-all duration-200 resize-none"
              placeholder="Type your message here..."
            />
            <div className="text-right text-sm text-slate-500 dark:text-slate-400 mt-1">
              {formData.message.length}/160 characters
            </div>
          </div>
          
          <div className="mb-4">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="scheduled"
                checked={formData.scheduled}
                onChange={handleInputChange}
                className="w-4 h-4 text-green-600 bg-white/50 dark:bg-slate-700/50 border-gray-300 dark:border-slate-600 rounded focus:ring-green-500"
              />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <Clock className="w-4 h-4 inline mr-1" />
                Schedule for later
              </span>
            </label>
          </div>
          
          {formData.scheduled && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  name="scheduleDate"
                  value={formData.scheduleDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Time
                </label>
                <input
                  type="time"
                  name="scheduleTime"
                  value={formData.scheduleTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                />
              </div>
            </div>
          )}
          
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
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-xl hover:from-green-600 hover:to-teal-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Send className="w-4 h-4" />
              <span>{formData.scheduled ? 'Schedule SMS' : 'Send SMS'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
