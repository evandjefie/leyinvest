import { Bell, Settings, User } from 'lucide-react';
import LeyButton from '../ui/LeyButton';

const TopBar = () => {
  return (
    <div className="h-16 bg-white border-b border-border flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-foreground">Vue d'ensemble de vos investissements</h2>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <LeyButton variant="secondary" size="sm" className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            Enregistrer achat
          </LeyButton>
          <LeyButton variant="secondary" size="sm" className="flex items-center gap-2">
            <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
            Enregistrer vente
          </LeyButton>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
            <User className="w-5 h-5 text-muted-foreground" />
          </button>
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