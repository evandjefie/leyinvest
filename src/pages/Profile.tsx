import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, LogOut, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { logoutUser } from '@/store/slices/authSlice';
import { userApi } from '@/services/userApi';
import EditProfile from './profile/EditProfile';
import ChangePassword from './profile/ChangePassword';
import IdentityDocuments from './profile/IdentityDocuments';
import LeyButton from '@/components/ui/LeyButton';

type Section = 'main' | 'edit' | 'password' | 'documents';

const Profile = () => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [activeSection, setActiveSection] = useState<Section>('main');
  const [isLoading, setIsLoading] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

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

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await dispatch(logoutUser());
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès."
      });
      navigate('/auth/login');
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la déconnexion.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.")) {
      return;
    }
    
    setIsDeletingAccount(true);
    try {
      await userApi.deleteMe();
      await dispatch(logoutUser());
      toast({
        title: "Compte supprimé",
        description: "Votre compte a été supprimé avec succès."
      });
      navigate('/auth/login');
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression du compte.",
        variant: "destructive"
      });
    } finally {
      setIsDeletingAccount(false);
    }
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
                      <span className="text-sm text-muted-foreground">Modifier</span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveSection('documents')}
                    className="w-full flex items-center justify-between p-4 bg-background hover:bg-muted/50 rounded-xl transition-colors border border-border"
                  >
                    <div className="text-left">
                      <p className="text-sm text-muted-foreground">Documents d'identité</p>
                      <p className="text-base font-medium text-foreground">Gérer mes documents</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Voir</span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </button>
                </div>

                <div className="mt-8 space-y-4">
                  <LeyButton
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                    onClick={handleLogout}
                    loading={isLoading}
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Déconnexion</span>
                  </LeyButton>
                  
                  <LeyButton
                    variant="destructive"
                    className="w-full flex items-center justify-center gap-2"
                    onClick={handleDeleteAccount}
                    loading={isDeletingAccount}
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Supprimer mon compte</span>
                  </LeyButton>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {renderSection()}
    </div>
  );
};

export default Profile;