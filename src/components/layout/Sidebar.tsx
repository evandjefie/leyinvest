import { Home, Briefcase, TrendingUp, User, Settings, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';
import logoLeycom from '@/assets/logo_leycom.svg';
import { motion } from 'framer-motion';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Portefeuille', href: '/portfolio', icon: Briefcase },
  { name: 'Analyse', href: '/analysis', icon: TrendingUp },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-white border-r border-border flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <img src={logoLeycom} alt="LeyInvest" className="h-10" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href || 
            (item.href === '/dashboard' && location.pathname === '/');
          const Icon = item.icon;
          
          return (
            <Link key={item.name} to={item.href}>
              <motion.div
                whileHover={{ x: 4 }}
                className={cn(
                  'nav-item',
                  isActive && 'active'
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary hover:bg-opacity-50 transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <User className="w-4 h-4 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">Utilisateur</p>
            <p className="text-xs text-muted-foreground truncate">user@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;