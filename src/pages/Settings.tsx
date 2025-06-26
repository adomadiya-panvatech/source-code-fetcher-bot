
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Settings as SettingsIcon, User, Bell, Shield, Palette, Database, Mail, Phone, Globe } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const Settings = () => {
  // const { isDark, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'integrations', label: 'Integrations', icon: Database },
  ];

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Settings</h1>
          <p className="text-slate-600 dark:text-slate-400">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl rounded-2xl p-4 border border-white/20 dark:border-slate-700/30">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-left ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-white/20 dark:hover:bg-slate-700/50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/30">
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-slate-800 dark:text-white">General Settings</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Acme Corporation"
                        className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Time Zone
                      </label>
                      <select className="w-full px-4 py-3 bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                        <option>UTC-8 (Pacific Time)</option>
                        <option>UTC-5 (Eastern Time)</option>
                        <option>UTC+0 (GMT)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'appearance' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Appearance</h2>
                  
                  <div className="flex items-center justify-between p-4 bg-white/10 dark:bg-slate-700/20 rounded-xl">
                    <div>
                      <h3 className="font-medium text-slate-800 dark:text-white">Dark Mode</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Toggle between light and dark themes</p>
                    </div>
                    {/* <button
                      onClick={toggleTheme}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        isDark ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          isDark ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button> */}
                  </div>
                </div>
              )}

              {activeTab === 'integrations' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Integrations</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: 'Email Service', icon: Mail, status: 'Connected', color: 'green' },
                      { name: 'SMS Gateway', icon: Phone, status: 'Connected', color: 'green' },
                      { name: 'Microsoft Teams', icon: Globe, status: 'Not Connected', color: 'red' },
                    ].map((integration) => {
                      const Icon = integration.icon;
                      return (
                        <div key={integration.name} className="flex items-center justify-between p-4 bg-white/10 dark:bg-slate-700/20 rounded-xl">
                          <div className="flex items-center space-x-3">
                            <Icon className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                            <div>
                              <h3 className="font-medium text-slate-800 dark:text-white">{integration.name}</h3>
                              <p className={`text-sm ${integration.color === 'green' ? 'text-green-600' : 'text-red-600'}`}>
                                {integration.status}
                              </p>
                            </div>
                          </div>
                          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                            {integration.status === 'Connected' ? 'Configure' : 'Connect'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
