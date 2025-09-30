import { LayoutDashboard, Wallet, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';
import logoLeycom from '@/assets/logo_leycom.svg';
import { motion } from 'framer-motion';
import UserProfile from './UserProfile';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Portefeuille', href: '/portfolio', icon: Wallet },
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
                  'nav-item flex',
                  isActive && 'active'
                )}
              >
                {/* <div className='p-3 bg-primary'></div> */}
                <Icon className="w-5 h-5" />
                <span
                  className=""
                >
                  {item.name}
                  </span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <UserProfile />
    </div>
  );
};

export default Sidebar;