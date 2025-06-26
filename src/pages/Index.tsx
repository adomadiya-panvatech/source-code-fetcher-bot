import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { EnhancedStatsCards } from '@/components/EnhancedStatsCards';
import { SalesChart } from '@/components/SalesChart';
import { ActivityChart } from '@/components/ActivityChart';
import { RecentActivities } from '@/components/RecentActivities';
import { QuickActions } from '@/components/QuickActions';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, Building2, UserCheck, MessageSquare, ArrowRight, Calendar, Phone, Mail, Plus, Database } from 'lucide-react';

interface IndexProps {
  onOpenContactModal?: () => void;
  onOpenLeadModal?: () => void;
  onOpenOpportunityModal?: () => void;
  onOpenAccountModal?: () => void;
  onOpenSMSModal?: () => void;
  onOpenEmailModal?: () => void;
}

const Index: React.FC<IndexProps> = ({ 
  onOpenContactModal, 
  onOpenLeadModal,
  onOpenOpportunityModal,
  onOpenAccountModal,
  onOpenSMSModal,
  onOpenEmailModal
}) => {
  const quickLinks = [
    { 
      title: 'CRM Dashboard', 
      description: 'Customer management system', 
      icon: Database, 
      path: '/crm',
      color: 'from-indigo-500 to-blue-600',
      count: 'New Interface',
      trend: 'Try it now'
    },
    { 
      title: 'Opportunities', 
      description: 'Manage sales pipeline', 
      icon: TrendingUp, 
      path: '/opportunities',
      color: 'from-blue-500 to-indigo-600',
      count: '12 active',
      trend: '+5 this week'
    },
    { 
      title: 'Accounts', 
      description: 'Customer accounts', 
      icon: Building2, 
      path: '/accounts',
      color: 'from-green-500 to-emerald-600',
      count: '247 total',
      trend: '+12 new'
    },
    { 
      title: 'Contacts', 
      description: 'Business contacts', 
      icon: Users, 
      path: '/contacts',
      color: 'from-purple-500 to-pink-600',
      count: '5,678 contacts',
      trend: '+89 today'
    },
    { 
      title: 'Leads', 
      description: 'Sales prospects', 
      icon: UserCheck, 
      path: '/leads',
      color: 'from-orange-500 to-red-600',
      count: '89 hot leads',
      trend: '+15 qualified'
    },
    { 
      title: 'Communications', 
      description: 'All messages', 
      icon: MessageSquare, 
      path: '/communications',
      color: 'from-cyan-500 to-blue-600',
      count: '2,456 sent',
      trend: '98% delivered'
    }
  ];

  const todaysMeetings = [
    { time: '10:00 AM', title: 'Client Onboarding Call', client: 'Acme Corp', type: 'video' },
    { time: '2:00 PM', title: 'Sales Review Meeting', client: 'Internal', type: 'meeting' },
    { time: '4:30 PM', title: 'Product Demo', client: 'TechStart Inc', type: 'demo' },
  ];

  const recentTasks = [
    { task: 'Follow up with leads from trade show', priority: 'high', due: 'Today' },
    { task: 'Prepare quarterly sales report', priority: 'medium', due: 'Tomorrow' },
    { task: 'Update CRM contact information', priority: 'low', due: 'This week' },
  ];

  return (
    <Layout>
      <div className="p-4 lg:p-6 space-y-6 lg:space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 dark:from-blue-500/10 dark:to-purple-600/10 backdrop-blur-xl rounded-3xl p-6 lg:p-8 border border-white/20 dark:border-slate-700/30">
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
            <div className="mb-6 xl:mb-0">
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 dark:text-white mb-4">
                Welcome back, John! 👋
              </h1>
              <p className="text-base lg:text-lg text-slate-600 dark:text-slate-400 mb-4">
                Here's what's happening with your business today
              </p>
              <div className="flex flex-wrap gap-3 lg:gap-4 text-sm">
                <div className="flex items-center space-x-2 bg-white/20 dark:bg-slate-800/20 rounded-full px-4 py-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-slate-700 dark:text-slate-300">12 new leads today</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 dark:bg-slate-800/20 rounded-full px-4 py-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-slate-700 dark:text-slate-300">3 meetings scheduled</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 dark:bg-slate-800/20 rounded-full px-4 py-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-slate-700 dark:text-slate-300">$45K in pipeline</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={onOpenContactModal}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Contact
              </Button>
              <Button 
                onClick={onOpenLeadModal}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Lead
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Stats */}
        <EnhancedStatsCards />

        {/* Today's Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Meetings */}
          <div className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/30 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Today's Meetings</h3>
              <Calendar className="w-5 h-5 text-slate-500" />
            </div>
            <div className="space-y-3">
              {todaysMeetings.map((meeting, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 dark:hover:bg-slate-700/20 transition-colors">
                  <div className="text-sm font-medium text-slate-600 dark:text-slate-400 w-16">
                    {meeting.time}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800 dark:text-white">{meeting.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{meeting.client}</p>
                  </div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/30 shadow-lg">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400 text-sm">Response Rate</span>
                <span className="text-green-600 font-semibold">94%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400 text-sm">Conversion Rate</span>
                <span className="text-blue-600 font-semibold">23.5%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400 text-sm">Active Campaigns</span>
                <span className="text-purple-600 font-semibold">8</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400 text-sm">Team Performance</span>
                <span className="text-orange-600 font-semibold">Excellent</span>
              </div>
            </div>
          </div>

          {/* Priority Tasks */}
          <div className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/30 shadow-lg">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Priority Tasks</h3>
            <div className="space-y-3">
              {recentTasks.map((task, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/10 dark:hover:bg-slate-700/20 transition-colors">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    task.priority === 'high' ? 'bg-red-500' : 
                    task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800 dark:text-white">{task.task}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Due: {task.due}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Access Cards */}
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-slate-800 dark:text-white mb-6">Quick Access</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link key={link.title} to={link.path}>
                  <div className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/30 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105 cursor-pointer">
                    <div className={`w-12 h-12 bg-gradient-to-br ${link.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200 mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">{link.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">{link.description}</p>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500 dark:text-slate-500">{link.count}</span>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
                      </div>
                      <div className="text-xs text-green-600 dark:text-green-400">{link.trend}</div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <SalesChart />
          <ActivityChart />
        </div>
        
        {/* Bottom Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <RecentActivities />
          </div>
          <div>
            <QuickActions 
              onAddContact={onOpenContactModal}
              onAddLead={onOpenLeadModal}
              onOpenOpportunityModal={onOpenOpportunityModal}
              onOpenAccountModal={onOpenAccountModal}
              onOpenSMSModal={onOpenSMSModal}
              onOpenEmailModal={onOpenEmailModal}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
