import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LeyButton from '@/components/ui/LeyButton';
import LeyInput from '@/components/ui/LeyInput';
import toast from 'react-hot-toast';
import logoLeycom from '@/assets/logo_leycom.svg';
import bgAuthLeycom from '@/assets/bg_auth_leycom.svg';

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    gender: '',
    age: '',
    email: '',
    phone: '',
    countryCode: '+225',
    country: '',
    profession: '',
    password: '',
    acceptTerms: false,
  });
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    // Validation pour l'étape 1
    if (step === 1) {
      const errors: Record<string, string> = {};
      
      if (!formData.lastName) errors.lastName = 'Le nom est obligatoire';
      if (!formData.firstName) errors.firstName = 'Le prénom est obligatoire';
      if (!formData.email) {
        errors.email = 'L\'email est obligatoire';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Format d\'email invalide';
      }
      if (!formData.age) {
        errors.age = 'L\'âge est obligatoire';
      } else if (parseInt(formData.age) <= 0) {
        errors.age = 'L\'âge doit être strictement positif';
      }

      if (Object.keys(errors).length > 0) {
        Object.values(errors).forEach(error => toast.error(error));
        return;
      }
      setStep(2);
    } 
    // Validation pour l'étape 2
    else if (step === 2) {
      const errors: Record<string, string> = {};
      
      if (!formData.phone) errors.phone = 'Le téléphone est obligatoire';
      if (!formData.country) errors.country = 'Le pays est obligatoire';
      if (!formData.profession) errors.profession = 'La profession est obligatoire';
      if (!formData.password) {
        errors.password = 'Le mot de passe est obligatoire';
      } else if (formData.password.length < 6) {
        errors.password = 'Le mot de passe doit contenir au moins 6 caractères';
      }
      if (!formData.acceptTerms) {
        errors.terms = 'Veuillez accepter les conditions d\'utilisation';
      }

      if (Object.keys(errors).length > 0) {
        Object.values(errors).forEach(error => toast.error(error));
        return;
      }
      navigate('/auth/verify-email');
    }
  };

  const handleGoogleSignup = () => {
    toast.success('Inscription avec Google (Demo)');
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
          {/* Logo & Title */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <img src={logoLeycom} alt="LeyInvest" className="h-16" />
            </div>
            <div>
              {/* <p className="text-muted-foreground mt-2">Votre partenaire d'investissement BRVM</p> */}
            </div>
          </div>

          <div className="space-y-6">
            {step === 1 ? (
              <>
                <h2 className="text-2xl font-bold text-center text-foreground">
                  Créer votre compte
                </h2>

                {/* Google Button */}
                <LeyButton
                  variant="google"
                  className="w-full"
                  onClick={handleGoogleSignup}
                  icon={
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  }
                >
                  Continuer avec Google
                </LeyButton>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-muted-foreground">Ou inscrivez vous avec votre mail</span>
                  </div>
                </div>

                {/* Registration Form Step 1 */}
                <div className="space-y-4">
                  <LeyInput
                    label="Nom"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Votre nom"
                    required
                  />

                  <LeyInput
                    label="Prénoms"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="Vos prénoms"
                    required
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <LeyInput
                      label="Genre"
                      value={formData.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      placeholder="Genre"
                    />
                    <LeyInput
                      label="Age"
                      // type="number"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      placeholder="Age"
                    />
                  </div>

                  <LeyInput
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Votre email"
                    required
                  />

                  <LeyButton
                    onClick={handleNextStep}
                    className="w-full"
                  >
                    Suivant
                  </LeyButton>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-4 mb-6">
                  <button
                    onClick={() => setStep(1)}
                    className="p-2 rounded-full hover:bg-secondary transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                  </button>
                  <h2 className="text-2xl font-bold text-foreground">
                    Finaliser la création de votre compte
                  </h2>
                </div>

                {/* Registration Form Step 2 */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Numéro</label>
                    <div className="flex gap-2">
                      <select
                        value={formData.countryCode}
                        onChange={(e) => handleInputChange('countryCode', e.target.value)}
                        className="input-field w-24"
                      >
                        <option value="+225">+225</option>
                        <option value="+33">+33</option>
                        <option value="+1">+1</option>
                      </select>
                      <LeyInput
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="Numéro de téléphone"
                        className="flex-1"
                        required
                      />
                    </div>
                  </div>

                  <LeyInput
                    label="Pays de résidence"
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    placeholder="Sélectionner votre pays"
                    required
                  />

                  <LeyInput
                    label="Situation professionnelle"
                    value={formData.profession}
                    onChange={(e) => handleInputChange('profession', e.target.value)}
                    placeholder="Votre profession"
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
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
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
                    onClick={handleNextStep}
                    className="w-full"
                    loading={loading}
                  >
                    S'inscrire
                  </LeyButton>
                </div>
              </>
            )}

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

export default Register;