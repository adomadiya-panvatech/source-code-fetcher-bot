
import React from 'react';
import { Phone, Mail, Calendar, User, Building2 } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'call',
    title: 'Called John Smith',
    description: 'Discussed Q4 requirements and budget approval',
    time: '2 hours ago',
    company: 'Acme Corp',
    status: 'completed'
  },
  {
    id: 2,
    type: 'email',
    title: 'Email sent to Sarah Johnson',
    description: 'Proposal follow-up and contract details',
    time: '4 hours ago',
    company: 'TechStart Inc',
    status: 'sent'
  },
  {
    id: 3,
    type: 'meeting',
    title: 'Meeting with Michael Chen',
    description: 'Product demo and technical requirements review',
    time: '1 day ago',
    company: 'Global Solutions',
    status: 'completed'
  },
  {
    id: 4,
    type: 'lead',
    title: 'New lead from website',
    description: 'Enterprise client interested in our services',
    time: '2 days ago',
    company: 'Fortune 500 Co',
    status: 'new'
  },
  {
    id: 5,
    type: 'call',
    title: 'Follow-up call scheduled',
    description: 'Contract negotiation with legal team',
    time: '3 days ago',
    company: 'Legal Partners LLC',
    status: 'scheduled'
  },
];

const getIcon = (type: string) => {
  switch (type) {
    case 'call': return Phone;
    case 'email': return Mail;
    case 'meeting': return Calendar;
    case 'lead': return User;
    default: return Building2;
  }
};

const getIconColor = (type: string) => {
  switch (type) {
    case 'call': return 'from-green-500 to-emerald-600';
    case 'email': return 'from-blue-500 to-indigo-600';
    case 'meeting': return 'from-purple-500 to-pink-600';
    case 'lead': return 'from-orange-500 to-red-600';
    default: return 'from-gray-500 to-slate-600';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
    case 'sent': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
    case 'scheduled': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300';
    case 'new': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
    default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300';
  }
};

export const RecentActivities: React.FC = () => {
  return (
    <div className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/30 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Recent Activities</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Latest interactions and updates</p>
        </div>
        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors duration-200">
          View All
        </button>
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities.map((activity, index) => {
          const Icon = getIcon(activity.type);
          return (
            <div
              key={activity.id}
              className="flex items-start space-x-4 p-4 rounded-xl hover:bg-white/10 dark:hover:bg-slate-700/20 transition-all duration-200 group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-10 h-10 bg-gradient-to-br ${getIconColor(activity.type)} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-slate-800 dark:text-white truncate">
                    {activity.title}
                  </h4>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(activity.status)}`}>
                    {activity.status}
                  </span>
                </div>
                
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  {activity.description}
                </p>
                
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-500">{activity.company}</span>
                  <span className="text-slate-500 dark:text-slate-500">{activity.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
