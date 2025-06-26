
import React from 'react';
import { TrendingUp, Users, DollarSign, Calendar, Target, Award, Clock, Globe } from 'lucide-react';

const stats = [
  {
    title: 'Total Revenue',
    value: '$2.4M',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'from-green-500 to-emerald-600',
    description: 'vs last month'
  },
  {
    title: 'Active Leads',
    value: '1,234',
    change: '+8.2%',
    trend: 'up',
    icon: TrendingUp,
    color: 'from-blue-500 to-indigo-600',
    description: 'in pipeline'
  },
  {
    title: 'Total Contacts',
    value: '5,678',
    change: '+15.3%',
    trend: 'up',
    icon: Users,
    color: 'from-purple-500 to-pink-600',
    description: 'active contacts'
  },
  {
    title: 'Meetings Today',
    value: '12',
    change: '-2.1%',
    trend: 'down',
    icon: Calendar,
    color: 'from-orange-500 to-red-600',
    description: 'scheduled'
  },
  {
    title: 'Conversion Rate',
    value: '23.5%',
    change: '+5.1%',
    trend: 'up',
    icon: Target,
    color: 'from-cyan-500 to-blue-600',
    description: 'this quarter'
  },
  {
    title: 'Deals Closed',
    value: '89',
    change: '+18.7%',
    trend: 'up',
    icon: Award,
    color: 'from-yellow-500 to-orange-600',
    description: 'this month'
  },
  {
    title: 'Avg Response Time',
    value: '2.4h',
    change: '-12.3%',
    trend: 'up',
    icon: Clock,
    color: 'from-teal-500 to-green-600',
    description: 'improved'
  },
  {
    title: 'Global Reach',
    value: '47',
    change: '+3',
    trend: 'up',
    icon: Globe,
    color: 'from-indigo-500 to-purple-600',
    description: 'countries'
  }
];

export const EnhancedStatsCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.title}
            className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/30 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105 animate-fade-in relative overflow-hidden"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Background gradient effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                  stat.trend === 'up' 
                    ? 'text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900/30' 
                    : 'text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900/30'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-1 group-hover:text-3xl transition-all duration-200">{stat.value}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">{stat.title}</p>
                <p className="text-slate-500 dark:text-slate-500 text-xs mt-1">{stat.description}</p>
              </div>

              {/* Mini sparkline effect */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
