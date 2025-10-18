import { ArrowUpToLine, ArrowDownToLine, Bell, Settings, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import LeyButton from '../ui/LeyButton';
import logoLeycom from '@/assets/logo_leycom.svg';
import icon_record_achat from '@/assets/icon_record_achat.svg';
import icon_record_vente from '@/assets/icon_record_vente.svg';

interface TopBarProps {
  onBuyClick?: () => void;
  onSellClick?: () => void;
}

const TopBar = ({ onBuyClick, onSellClick }: TopBarProps) => {
  return (
    <div className="h-16 bg-white border-b border-border flex items-center justify-between px-4 md:px-6">
      {/* Logo on mobile */}
      <div className="md:hidden">
        <img src={logoLeycom} alt="LeyInvest" className="h-8" />
      </div>
      
      <div className="hidden md:block flex-1"></div>
      
      <div className="flex items-center gap-2 md:gap-4">
        <div className="hidden md:flex items-center gap-2">
          <LeyButton 
            variant=""
            size="sm"
            className="bg-[#D5F1EC] rounded-sm flex items-center gap-2"
            onClick={onBuyClick}  
          >
            <img src={icon_record_achat} alt="icon_achat" className="h-6" />
            Enregistrer achat
          </LeyButton>
          <LeyButton 
            variant="" 
            size="sm" 
            className="bg-[#FFF8EC] rounded-sm flex items-center gap-2"
            onClick={onSellClick}
          >
            <img src={icon_record_vente} alt="icon_vente" className="h-6" />
            Enregistrer vente
          </LeyButton>
        </div>
        
        <div className="flex items-center gap-2">
          <Link to="/profile" className="p-2 hover:bg-secondary rounded-lg transition-colors">
            <User className="w-5 h-5 text-muted-foreground" />
          </Link>
          <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-muted-foreground" />
          </button>
          <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
            <Settings className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;