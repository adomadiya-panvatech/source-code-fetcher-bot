
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  TrendingUp, 
  Building2, 
  Users, 
  UserCheck, 
  MessageSquare 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileNavProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Home', icon: Home, path: '/' },
  { id: 'opportunities', label: 'Deals', icon: TrendingUp, path: '/opportunities' },
  { id: 'accounts', label: 'Accounts', icon: Building2, path: '/accounts' },
  { id: 'contacts', label: 'Contacts', icon: Users, path: '/contacts' },
  { id: 'leads', label: 'Leads', icon: UserCheck, path: '/leads' },
  { id: 'communications', label: 'Messages', icon: MessageSquare, path: '/communications' },
];

export const MobileNav: React.FC<MobileNavProps> = ({ activeModule, setActiveModule }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (item: typeof navItems[0]) => {
    setActiveModule(item.id);
    navigate(item.path);
  };

  const getCurrentActiveModule = () => {
    for (const item of navItems) {
      if (location.pathname === item.path) {
        return item.id;
      }
    }
    return 'dashboard';
  };

  const currentActiveModule = getCurrentActiveModule();

  return (
    <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border-t border-white/20 dark:border-slate-700/50 px-2 py-2 lg:hidden">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentActiveModule === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              className={cn(
                "flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-200 min-w-0 flex-1 max-w-[80px]",
                isActive 
                  ? "bg-gradient-to-b from-blue-500 to-indigo-600 text-white shadow-lg" 
                  : "text-slate-600 dark:text-slate-300 hover:bg-white/20 dark:hover:bg-slate-700/50"
              )}
            >
              <Icon className={cn(
                "w-5 h-5 transition-all duration-200",
                isActive ? "scale-110" : ""
              )} />
              <span className="text-xs font-medium truncate w-full text-center">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
