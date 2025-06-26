
import React, { useState } from 'react';
import { Search, Bell, User, Plus, BarChart3, Users, UserPlus, Database, FileText, Key, Settings, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CRMLayoutProps {
  children: React.ReactNode;
  onOpenContactModal?: () => void;
  onOpenLeadModal?: () => void;
}

export const CRMLayout: React.FC<CRMLayoutProps> = ({ children, onOpenContactModal, onOpenLeadModal }) => {
  const [activeSection, setActiveSection] = useState('Dashboard');

  const sidebarItems = [
    { title: 'Dashboard', icon: BarChart3, section: 'MAIN' },
    { title: 'All Customers', icon: Users, section: 'CUSTOMERS' },
    { title: 'Add New', icon: UserPlus, section: 'CUSTOMERS', action: onOpenContactModal },
    { title: 'Segments', icon: Database, section: 'CUSTOMERS' },
    { title: 'API Console', icon: FileText, section: 'API' },
    { title: 'API Keys', icon: Key, section: 'API' },
    { title: 'Documentation', icon: FileText, section: 'API' },
    { title: 'Analytics', icon: TrendingUp, section: 'REPORTS' },
    { title: 'Exports', icon: FileText, section: 'REPORTS' },
  ];

  const sections = ['MAIN', 'CUSTOMERS', 'API', 'REPORTS'];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-60 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-blue-600">CRM API</h1>
          <p className="text-xs text-gray-500">Web Interface v1.0</p>
        </div>

        {/* Navigation */}
        <div className="flex-1 py-4">
          {sections.map((section) => (
            <div key={section} className="mb-6">
              <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                {section}
              </h3>
              {sidebarItems
                .filter(item => item.section === section)
                .map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.title}
                      onClick={() => {
                        setActiveSection(item.title);
                        if (item.action) item.action();
                      }}
                      className={`w-full flex items-center px-4 py-2 text-sm transition-colors ${
                        activeSection === item.title
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-3" />
                      {item.title}
                    </button>
                  );
                })}
            </div>
          ))}
        </div>

        {/* User Section */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">Super Admin</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={onOpenContactModal}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Customer
              </Button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-6">
          {children}
        </div>
      </div>
    </div>
  );
};
