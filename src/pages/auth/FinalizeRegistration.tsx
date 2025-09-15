import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import LeyButton from '@/components/ui/LeyButton';
import LeyInput from '@/components/ui/LeyInput';
import LeySelect from '@/components/ui/LeySelect';
import toast from 'react-hot-toast';
import logoLeycom from '@/assets/logo_leycom.svg';
import bgAuthLeycom from '@/assets/bg_auth_leycom.svg';

const FinalizeRegistration = () => {
  const [formData, setFormData] = useState({
    phone: '',
    countryCode: '+225',
    country: '',
    profession: '',
    acceptTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.phone || !formData.country || !formData.profession) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    if (!formData.acceptTerms) {
      toast.error('Veuillez accepter les conditions d\'utilisation');
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success('Inscription finalisée avec succès !');
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md space-y-8"
        >
          {/* Back Button */}
          <Link 
            to="/auth/verify-email"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour
          </Link>

          {/* Logo & Title */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <img src={logoLeycom} alt="LeyInvest" className="h-16" />
            </div>
            <div>
              <p className="text-muted-foreground mt-2">Votre partenaire d'investissement BRVM</p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center text-foreground">
              Finalisez la création de votre compte
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Numéro whatsapp
                </label>
                <div className="flex gap-2">
                  <LeySelect
                    value={formData.countryCode}
                    onChange={(e) => handleInputChange('countryCode', e.target.value)}
                    options={[
                      { value: '+225', label: '+225' },
                      { value: '+33', label: '+33' },
                      { value: '+1', label: '+1' },
                    ]}
                    className="w-24"
                  />
                  <LeyInput
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Numéro de téléphone"
                    className="flex-1"
                    required
                  />
                </div>
              </div>

              <LeySelect
                label="Pays de résidence"
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                options={[
                  { value: '', label: 'Sélectionner votre pays' },
                  { value: 'CI', label: 'Côte d\'Ivoire' },
                  { value: 'SN', label: 'Sénégal' },
                  { value: 'BF', label: 'Burkina Faso' },
                  { value: 'ML', label: 'Mali' },
                  { value: 'FR', label: 'France' },
                ]}
                required
              />

              <LeySelect
                label="Situation professionnelle"
                value={formData.profession}
                onChange={(e) => handleInputChange('profession', e.target.value)}
                options={[
                  { value: '', label: 'Votre profession' },
                  { value: 'employe', label: 'Employé' },
                  { value: 'independant', label: 'Travailleur indépendant' },
                  { value: 'entrepreneur', label: 'Entrepreneur' },
                  { value: 'etudiant', label: 'Étudiant' },
                  { value: 'retraite', label: 'Retraité' },
                ]}
                required
              />

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Mot de passe</label>
                <p className="text-sm text-muted-foreground mb-3">
                  Votre mot de passe doit comporter 6 caractères ou plus, incluant au moins une
                  majuscule, une minuscule, un chiffre et un symbole spécial (@ # $ % & etc.)
                </p>
                <LeyInput
                  type="password"
                  placeholder="6 caractères minimum"
                  required
                />
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.acceptTerms}
                  onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                  className="w-4 h-4 mt-1 text-primary border-border rounded focus:ring-primary/20"
                />
                <span className="text-sm text-foreground">
                  J'ai lu et j'accepte les conditions d'utilisation de LeyInvest
                </span>
              </label>

              <LeyButton
                type="submit"
                className="w-full"
                loading={loading}
              >
                S'inscrire
              </LeyButton>
            </form>

            <div className="text-center">
              <span className="text-muted-foreground">Déjà un compte ? </span>
              <Link 
                to="/auth/login" 
                className="text-primary hover:text-primary-dark font-medium transition-colors"
              >
                Se connecter
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Panel - Background */}
      <div className="hidden lg:block flex-1 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgAuthLeycom})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-dark/90" />
        </div>
      </div>
    </div>
  );
};

export default FinalizeRegistration;