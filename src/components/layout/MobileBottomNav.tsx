import { Home, Wallet, Plus, TrendingUp, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import TradeModal from '../ui/TradeModal';

const MobileBottomNav = () => {
  const location = useLocation();
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState(false);

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

  const handleActionClick = () => {
    setShowActionMenu(!showActionMenu);
  };

  const handleBuyClick = () => {
    setShowActionMenu(false);
    setShowBuyModal(true);
  };

  const handleSellClick = () => {
    setShowActionMenu(false);
    setShowSellModal(true);
  };

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50 safe-area-bottom">
        <div className="flex items-center justify-around h-20 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            
            if (item.isAction) {
              return (
                <button
                  key="action"
                  onClick={handleActionClick}
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

      {/* Action Menu */}
      {showActionMenu && (
        <div className="md:hidden fixed inset-0 bg-black/30 z-40" onClick={() => setShowActionMenu(false)}>
          <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex flex-col gap-3 items-center">
            <button
              onClick={handleBuyClick}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg"
            >
              Enregistrer achat
            </button>
            <button
              onClick={handleSellClick}
              className="flex items-center gap-2 bg-[#FFD796] text-foreground px-4 py-2 rounded-lg shadow-lg"
            >
              Enregistrer vente
            </button>
          </div>
        </div>
      )}

      {/* Trade Modals */}
      {showBuyModal && (
        <TradeModal 
          isOpen={showBuyModal} 
          onClose={() => setShowBuyModal(false)}
          type="buy"
        />
      )}

      {showSellModal && (
        <TradeModal 
          isOpen={showSellModal} 
          onClose={() => setShowSellModal(false)}
          type="sell"
        />
      )}
    </>
  );
};

export default MobileBottomNav;
