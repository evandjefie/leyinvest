import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { logoutUser } from '@/store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Briefcase, Calendar, LogOut, Edit } from 'lucide-react';
import LeyCard from '@/components/ui/LeyCard';
import LeyButton from '@/components/ui/LeyButton';
import { motion } from 'framer-motion';

const Profile = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/auth/login');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    );
  }

  const profileSections = [
    { icon: User, label: 'Nom complet', value: `${user.prenom} ${user.nom}` },
    { icon: Mail, label: 'Email', value: user.email },
    { icon: Phone, label: 'WhatsApp', value: user.numero_whatsapp },
    { icon: MapPin, label: 'Pays de résidence', value: user.pays_residence },
    { icon: Briefcase, label: 'Situation professionnelle', value: user.situation_professionnelle },
    { icon: Calendar, label: 'Âge', value: `${user.age} ans` },
  ];

  return (
    <div className="min-h-screen bg-secondary bg-opacity-30 pb-24 md:pb-8">
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Mon Profil</h1>
          <p className="text-muted-foreground">Gérez vos informations personnelles</p>
        </motion.div>

        {/* Avatar Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <LeyCard className="mb-6">
            <div className="flex flex-col md:flex-row items-center gap-6 p-6">
              <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center">
                <User className="w-12 h-12 text-primary-foreground" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-foreground mb-1">
                  {user.prenom} {user.nom}
                </h2>
                <p className="text-muted-foreground">{user.email}</p>
                <div className="mt-3">
                  <span className={cn(
                    'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
                    user.is_verified 
                      ? 'bg-success bg-opacity-10 text-success'
                      : 'bg-warning bg-opacity-10 text-warning'
                  )}>
                    {user.is_verified ? '✓ Compte vérifié' : '⚠ Compte non vérifié'}
                  </span>
                </div>
              </div>
              <LeyButton
                variant="secondary"
                className="gap-2"
              >
                <Edit className="w-4 h-4" />
                Modifier
              </LeyButton>
            </div>
          </LeyCard>
        </motion.div>

        {/* Information Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {profileSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
              >
                <LeyCard className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary bg-opacity-10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-muted-foreground mb-1">{section.label}</p>
                      <p className="text-base font-medium text-foreground truncate">{section.value}</p>
                    </div>
                  </div>
                </LeyCard>
              </motion.div>
            );
          })}
        </div>

        {/* Account Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <LeyCard className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Actions du compte</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary transition-colors text-left">
                <Edit className="w-5 h-5 text-muted-foreground" />
                <span className="text-foreground">Modifier mes informations</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary transition-colors text-left">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <span className="text-foreground">Changer mon email</span>
              </button>
              <button
                onClick={handleLogout}
                disabled={isLoading}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-destructive hover:bg-opacity-10 transition-colors text-left group"
              >
                <LogOut className="w-5 h-5 text-destructive" />
                <span className="text-destructive font-medium">
                  {isLoading ? 'Déconnexion...' : 'Se déconnecter'}
                </span>
              </button>
            </div>
          </LeyCard>
        </motion.div>
      </div>
    </div>
  );
};

const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

export default Profile;
