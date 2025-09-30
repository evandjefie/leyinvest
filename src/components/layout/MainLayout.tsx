import { ReactNode, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import MobileBottomNav from './MobileBottomNav';
import { useAppSelector } from '@/store/hooks';
import TradeModal from '../ui/TradeModal';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  const handleBuyClick = () => {
    setShowBuyModal(true);
  };

  const handleSellClick = () => {
    setShowSellModal(true);
  };

  return (
    <div className="flex h-screen bg-secondary bg-opacity-30">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar onBuyClick={handleBuyClick} onSellClick={handleSellClick} />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
        <MobileBottomNav />
      </div>

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
    </div>
  );
};

export default MainLayout;