import { User } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div className="p-4 border-t border-border">
      <div 
        className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary hover:bg-opacity-50 transition-colors cursor-pointer"
        onClick={handleProfileClick}
      >
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <User className="w-4 h-4 text-primary-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground">
            {user?.prenom} {user?.nom}
          </p>
          <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
