
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'Mon', calls: 45, emails: 32, meetings: 8 },
  { day: 'Tue', calls: 52, emails: 41, meetings: 12 },
  { day: 'Wed', calls: 38, emails: 28, meetings: 6 },
  { day: 'Thu', calls: 61, emails: 39, meetings: 15 },
  { day: 'Fri', calls: 55, emails: 44, meetings: 11 },
  { day: 'Sat', calls: 23, emails: 18, meetings: 3 },
  { day: 'Sun', calls: 15, emails: 12, meetings: 1 },
];

export const ActivityChart: React.FC = () => {
  return (
    <div className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/30 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Weekly Activity</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Communication breakdown by day</p>
        </div>
        <div className="flex space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-slate-600 dark:text-slate-400">Calls</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-slate-600 dark:text-slate-400">Emails</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-slate-600 dark:text-slate-400">Meetings</span>
          </div>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
            <XAxis 
              dataKey="day" 
              stroke="rgba(148, 163, 184, 0.8)"
              fontSize={12}
            />
            <YAxis 
              stroke="rgba(148, 163, 184, 0.8)"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(10px)'
              }}
            />
            <Bar dataKey="calls" fill="#10B981" radius={[2, 2, 0, 0]} />
            <Bar dataKey="emails" fill="#3B82F6" radius={[2, 2, 0, 0]} />
            <Bar dataKey="meetings" fill="#8B5CF6" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
