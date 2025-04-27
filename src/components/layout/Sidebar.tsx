
import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users,
  Folder,
  AlertTriangle, 
  CheckCircle,
  MessageSquare, 
  BookOpen,
  Globe,
  Shield, 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

interface SidebarItem {
  name: string;
  path: string;
  icon: ReactNode;
}

export const Sidebar = ({ collapsed, setCollapsed }: SidebarProps) => {
  const location = useLocation();
  
  const mainItems: SidebarItem[] = [
    { name: 'Dashboard', path: '/', icon: <Home className="h-5 w-5" /> },
    { name: 'Onboarding', path: '/onboarding', icon: <Users className="h-5 w-5" /> },
    { name: 'Supply Chain', path: '/supply-chain', icon: <Folder className="h-5 w-5" /> },
    { name: 'Risk Scanner', path: '/risk-scanner', icon: <AlertTriangle className="h-5 w-5" /> },
    { name: 'Action Tracker', path: '/action-tracker', icon: <CheckCircle className="h-5 w-5" /> },
    { name: 'Comms Hub', path: '/comms-hub', icon: <MessageSquare className="h-5 w-5" /> },
  ];

  const insightItems: SidebarItem[] = [
    { name: 'Case Studies', path: '/case-studies', icon: <BookOpen className="h-5 w-5" /> },
    { name: 'SDG Dashboard', path: '/sdg-dashboard', icon: <Globe className="h-5 w-5" /> },
  ];

  // Active path check
  const isActivePath = (path: string): boolean => {
    if (path === '/' && location.pathname === '/') {
      return true;
    }
    return location.pathname.startsWith(path) && path !== '/';
  };

  return (
    <div 
      className={cn(
        "h-screen p-4 bg-white border-r border-gray-200 flex flex-col justify-between transition-all duration-300",
        collapsed ? "w-[80px]" : "w-[250px]"
      )}
    >
      <div>
        <div className="flex items-center mb-8 ml-1">
          {!collapsed ? (
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-primary mr-2" />
              <span className="font-bold text-xl">EthicalOps</span>
            </div>
          ) : (
            <Shield className="h-8 w-8 text-primary mx-auto" />
          )}
        </div>
        
        <div className="space-y-6">
          <nav className="flex flex-col space-y-1">
            {mainItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center py-2 px-3 rounded-md hover:bg-gray-100 transition-colors",
                  isActivePath(item.path) ? "bg-gray-100 font-medium" : ""
                )}
              >
                <div className={cn("text-gray-500", isActivePath(item.path) ? "text-primary" : "")}>
                  {item.icon}
                </div>
                {!collapsed && (
                  <span className={cn("ml-3", isActivePath(item.path) ? "text-primary" : "")}>
                    {item.name}
                  </span>
                )}
              </Link>
            ))}
          </nav>
          
          {!collapsed && <div className="my-2 border-t border-gray-200" />}
          
          <div className="pt-1">
            {!collapsed && <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Insights</h3>}
            <nav className="mt-2 flex flex-col space-y-1">
              {insightItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center py-2 px-3 rounded-md hover:bg-gray-100 transition-colors",
                    isActivePath(item.path) ? "bg-gray-100 font-medium" : ""
                  )}
                >
                  <div className={cn("text-gray-500", isActivePath(item.path) ? "text-primary" : "")}>
                    {item.icon}
                  </div>
                  {!collapsed && (
                    <span className={cn("ml-3", isActivePath(item.path) ? "text-primary" : "")}>
                      {item.name}
                    </span>
                  )}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center h-10 w-10 rounded-md hover:bg-gray-100 self-end"
      >
        <svg
          className={cn("h-6 w-6 text-gray-500 transition-transform", collapsed ? "rotate-0" : "rotate-180")}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </div>
  );
};
