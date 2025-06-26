
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  BarChart3, 
  Users, 
  UserCheck, 
  TrendingUp, 
  MessageSquare,
  Building2,
  Phone,
  Mail,
  MessageCircle,
  Home,
  Settings,
  HelpCircle,
  User
} from 'lucide-react';

interface SidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
}

const modules = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/', category: 'main' },
  { id: 'opportunities', label: 'Opportunities', icon: TrendingUp, path: '/opportunities', category: 'main' },
  { id: 'accounts', label: 'Accounts', icon: Building2, path: '/accounts', category: 'main' },
  { id: 'contacts', label: 'Contacts', icon: Users, path: '/contacts', category: 'main' },
  { id: 'leads', label: 'Leads', icon: UserCheck, path: '/leads', category: 'main' },
  { id: 'communications', label: 'Communications', icon: MessageSquare, path: '/communications', category: 'main' },
];

const communicationSubModules = [
  { id: 'sms', label: 'SMS', icon: Phone, count: '1,234' },
  { id: 'email', label: 'Email', icon: Mail, count: '567' },
  { id: 'teams', label: 'MS Teams', icon: MessageCircle, count: '89' },
];

const bottomModules = [
  { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
  // { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
  { id: 'help', label: 'Help & Support', icon: HelpCircle, path: '/help' },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeModule, setActiveModule }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleModuleClick = (module: { id: string; path: string }) => {
    setActiveModule(module.id);
    navigate(module.path);
  };

  const getCurrentActiveModule = () => {
    for (const module of [...modules, ...bottomModules]) {
      if (location.pathname === module.path) {
        return module.id;
      }
    }
    return 'dashboard';
  };

  const currentActiveModule = getCurrentActiveModule();

  return (
    <div className="w-64 h-screen bg-white/10 dark:bg-slate-800/50 backdrop-blur-xl border-r border-white/20 dark:border-slate-700/50 shadow-xl flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-white/20 dark:border-slate-700/50">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 dark:text-white">CRM Suite</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Business Management</p>
          </div>
        </div>
      </div>
      
      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="mb-6">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 px-2">
              Main Menu
            </p>
            <nav className="space-y-1">
              {modules.map((module) => {
                const Icon = module.icon;
                const isActive = currentActiveModule === module.id;
                
                return (
                  <div key={module.id}>
                    <button
                      onClick={() => handleModuleClick(module)}
                      className={cn(
                        "w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200 group text-left",
                        isActive 
                          ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25 transform scale-105" 
                          : "text-slate-600 dark:text-slate-300 hover:bg-white/20 dark:hover:bg-slate-700/50 hover:text-slate-800 dark:hover:text-white hover:scale-102"
                      )}
                    >
                      <Icon className={cn(
                        "w-5 h-5 transition-all duration-200",
                        isActive ? "scale-110 text-white" : "group-hover:scale-105"
                      )} />
                      <span className="font-medium text-sm">{module.label}</span>
                      {isActive && (
                        <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      )}
                    </button>
                    
                    {/* Communications Sub-modules */}
                    {module.id === 'communications' && currentActiveModule === 'communications' && (
                      <div className="ml-6 mt-2 space-y-1 animate-fade-in">
                        {communicationSubModules.map((subModule) => {
                          const SubIcon = subModule.icon;
                          return (
                            <button
                              key={subModule.id}
                              className="w-full flex items-center justify-between space-x-3 px-3 py-2 rounded-lg text-sm text-slate-500 dark:text-slate-400 hover:bg-white/10 dark:hover:bg-slate-700/30 hover:text-slate-700 dark:hover:text-slate-200 transition-all duration-200 group"
                            >
                              <div className="flex items-center space-x-3">
                                <SubIcon className="w-4 h-4 group-hover:scale-105 transition-transform" />
                                <span>{subModule.label}</span>
                              </div>
                              <span className="text-xs bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded-full">
                                {subModule.count}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-white/20 dark:border-slate-700/50">
        <div className="space-y-1">
          {bottomModules.map((module) => {
            const Icon = module.icon;
            const isActive = currentActiveModule === module.id;
            return (
              <button
                key={module.id}
                onClick={() => handleModuleClick(module)}
                className={cn(
                  "w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200 group text-left",
                  isActive 
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg" 
                    : "text-slate-600 dark:text-slate-300 hover:bg-white/20 dark:hover:bg-slate-700/50 hover:text-slate-800 dark:hover:text-white"
                )}
              >
                <Icon className="w-5 h-5 group-hover:scale-105 transition-transform duration-200" />
                <span className="font-medium text-sm">{module.label}</span>
              </button>
            );
          })}
        </div>
        
        {/* User Info */}
        <div className="mt-4 p-3 bg-white/10 dark:bg-slate-700/30 rounded-xl">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-xs">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800 dark:text-white truncate">John Doe</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
