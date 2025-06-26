
import React from 'react';
import { Plus, UserPlus, TrendingUp, Calendar, MessageSquare } from 'lucide-react';

interface QuickActionsProps {
  onAddContact?: () => void;
  onAddLead?: () => void;
  onOpenOpportunityModal?: () => void;
  onOpenAccountModal?: () => void;
  onOpenSMSModal?: () => void;
  onOpenEmailModal?: () => void;
}

const actions = [
  {
    id: 'contact',
    title: 'Add Contact',
    description: 'Create new contact',
    icon: UserPlus,
    color: 'from-blue-500 to-indigo-600',
    action: 'contact'
  },
  {
    id: 'lead',
    title: 'Add Lead',
    description: 'New lead opportunity',
    icon: TrendingUp,
    color: 'from-green-500 to-emerald-600',
    action: 'lead'
  },
  {
    id: 'meeting',
    title: 'Schedule Meeting',
    description: 'Book appointment',
    icon: Calendar,
    color: 'from-purple-500 to-pink-600',
    action: 'meeting'
  },
  {
    id: 'message',
    title: 'Send Message',
    description: 'Quick communication',
    icon: MessageSquare,
    color: 'from-orange-500 to-red-600',
    action: 'message'
  },
];

export const QuickActions: React.FC<QuickActionsProps> = ({ 
  onAddContact, 
  onAddLead,
  onOpenOpportunityModal,
  onOpenAccountModal,
  onOpenSMSModal,
  onOpenEmailModal
}) => {
  const handleAction = (action: string) => {
    switch (action) {
      case 'contact':
        if (onAddContact) {
          onAddContact();
        }
        break;
      case 'lead':
        if (onAddLead) {
          onAddLead();
        }
        break;
      case 'meeting':
        // Create a meeting form or modal
        const meetingTitle = prompt('Enter meeting title:');
        if (meetingTitle) {
          const meetingDate = prompt('Enter meeting date (YYYY-MM-DD):');
          if (meetingDate) {
            console.log('Meeting scheduled:', { title: meetingTitle, date: meetingDate });
            alert(`Meeting "${meetingTitle}" scheduled for ${meetingDate}`);
          }
        }
        break;
      case 'message':
        // Create a message form or modal
        const messageType = prompt('Select message type (sms/email):');
        if (messageType === 'sms' && onOpenSMSModal) {
          onOpenSMSModal();
        } else if (messageType === 'email' && onOpenEmailModal) {
          onOpenEmailModal();
        }
        break;
    }
  };

  return (
    <div className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/30 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-1">Quick Actions</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm">Common tasks and shortcuts</p>
      </div>
      
      <div className="space-y-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => handleAction(action.action)}
              className="w-full flex items-center space-x-4 p-4 rounded-xl hover:bg-white/10 dark:hover:bg-slate-700/20 transition-all duration-200 group animate-fade-in hover:scale-105 active:scale-95"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-10 h-10 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              
              <div className="flex-1 text-left">
                <h4 className="text-sm font-medium text-slate-800 dark:text-white">
                  {action.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {action.description}
                </p>
              </div>
              
              <Plus className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors duration-200 group-hover:rotate-90" />
            </button>
          );
        })}
      </div>
    </div>
  );
};
