
import React from 'react';
import { TrendingUp, Users, DollarSign, Calendar } from 'lucide-react';

const stats = [
  {
    title: 'Total Revenue',
    value: '$2.4M',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'from-green-500 to-emerald-600'
  },
  {
    title: 'Active Leads',
    value: '1,234',
    change: '+8.2%',
    trend: 'up',
    icon: TrendingUp,
    color: 'from-blue-500 to-indigo-600'
  },
  {
    title: 'Total Contacts',
    value: '5,678',
    change: '+15.3%',
    trend: 'up',
    icon: Users,
    color: 'from-purple-500 to-pink-600'
  },
  {
    title: 'Meetings Today',
    value: '12',
    change: '-2.1%',
    trend: 'down',
    icon: Calendar,
    color: 'from-orange-500 to-red-600'
  }
];

export const StatsCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.title}
            className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/30 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105 animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                stat.trend === 'up' 
                  ? 'text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900/30' 
                  : 'text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900/30'
              }`}>
                {stat.change}
              </span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">{stat.value}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">{stat.title}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
