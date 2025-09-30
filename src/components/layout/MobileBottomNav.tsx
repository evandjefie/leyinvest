import { Home, Wallet, Plus, TrendingUp, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const MobileBottomNav = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Accueil', path: '/dashboard', icon: Home },
    { name: 'Portefeuille', path: '/portfolio', icon: Wallet },
    { name: '', path: '#', icon: Plus, isAction: true },
    { name: 'Analyse', path: '/analysis', icon: TrendingUp },
    { name: 'Profil', path: '/profile', icon: User },
  ];

  const isActive = (path: string) => {
    return location.pathname === path || (path === '/dashboard' && location.pathname === '/');
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50 safe-area-bottom">
      <div className="flex items-center justify-around h-20 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          
          if (item.isAction) {
            return (
              <button
                key="action"
                className="flex flex-col items-center justify-center w-14 h-14 bg-primary rounded-full text-primary-foreground shadow-lg -mt-6"
              >
                <Icon className="w-6 h-6" />
              </button>
            );
          }

          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center justify-center flex-1 h-full transition-colors',
                active ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <Icon className={cn('w-6 h-6 mb-1', active && 'stroke-[2.5]')} />
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
