import { useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import EditProfile from './profile/EditProfile';
import ChangePassword from './profile/ChangePassword';
import IdentityDocuments from './profile/IdentityDocuments';

type Section = 'main' | 'edit' | 'password' | 'documents';

const Profile = () => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<Section>('main');

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    );
  }

  const getInitials = () => {
    return `${user.prenom?.[0] || ''}${user.nom?.[0] || ''}`.toUpperCase();
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'edit':
        return <EditProfile onBack={() => setActiveSection('main')} />;
      case 'password':
        return <ChangePassword onBack={() => setActiveSection('main')} />;
      case 'documents':
        return <IdentityDocuments onBack={() => setActiveSection('main')} />;
      default:
        return (
          <div className="max-w-4xl mx-auto p-4 md:p-8">
            <div className="bg-background rounded-2xl shadow-sm border border-border overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h1 className="text-2xl font-semibold text-foreground">Mon compte</h1>
                <button
                  onClick={() => navigate(-1)}
                  className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-foreground" />
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary-foreground">{getInitials()}</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-primary">
                      {user.prenom} {user.nom}
                    </h2>
                    <p className="text-sm text-muted-foreground">{user.numero_whatsapp}</p>
                  </div>
                </div>

                <div className="bg-primary/5 rounded-xl p-4 mb-6">
                  <h3 className="text-base font-medium text-foreground mb-4">Documents d'identification</h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground mb-1">Nom</p>
                        <p className="font-medium text-foreground">{user.nom}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Prénom</p>
                        <p className="font-medium text-foreground">{user.prenom}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Email</p>
                        <p className="font-medium text-foreground">{user.email}</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setActiveSection('edit')}
                      className="flex items-center justify-end w-full text-sm text-foreground hover:text-primary transition-colors"
                    >
                      Modifier
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => setActiveSection('password')}
                    className="w-full flex items-center justify-between p-4 bg-background hover:bg-muted/50 rounded-xl transition-colors border border-border"
                  >
                    <div className="text-left">
                      <p className="text-sm text-muted-foreground">Mot de passe</p>
                      <p className="text-base font-medium text-foreground">*******</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-foreground">Modifier</span>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-secondary/30 pb-24 md:pb-8">
      {renderSection()}
    </div>
  );
};

export default Profile;
