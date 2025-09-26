import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import LeyButton from '@/components/ui/LeyButton';
import LeyInput from '@/components/ui/LeyInput';
import LeySelect from '@/components/ui/LeySelect';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { registerUser, setRegistrationEmail } from '@/store/slices/authSlice';
import { RegisterRequest } from '@/types/api';
import toast from 'react-hot-toast';
import logoLeycom from '@/assets/logo_leycom.svg';
import bgAuthLeycom from '@/assets/bg_auth_leycom.svg';

const Register = () => {
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    country: '',
    profession: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [errorsStep1, setErrorsStep1] = useState<Record<string, string>>({});
  const [errorsStep2, setErrorsStep2] = useState<Record<string, string>>({});
  
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation des champs requis pour l'étape 1
    if (currentStep === 1) {
      const errors: Record<string, string> = {};
      
      if (!formData.lastName) errors.lastName = 'Le nom est obligatoire';
      if (!formData.firstName) errors.firstName = 'Le prénom est obligatoire';
      if (!formData.email) errors.email = 'L\'email est obligatoire';
      if (!formData.phone) errors.phone = 'Le téléphone est obligatoire';
      if (!formData.age) {
        errors.age = 'L\'âge est obligatoire';
      } else if (parseInt(formData.age) <= 0) {
        errors.age = 'L\'âge doit être strictement positif';
      }

      setErrorsStep1(errors);
      if (Object.keys(errors).length > 0) return;

      setCurrentStep(2);
    } else {
      // Validation des champs requis pour l'étape 2
      const errors: Record<string, string> = {};
      
      if (!formData.gender) errors.gender = 'Le genre est obligatoire';
      if (!formData.country) errors.country = 'Le pays est obligatoire';
      if (!formData.profession) errors.profession = 'La profession est obligatoire';
      if (!formData.password) {
        errors.password = 'Le mot de passe est obligatoire';
      } else if (formData.password.length < 6) {
        errors.password = 'Le mot de passe doit contenir au moins 6 caractères';
      }
      if (!formData.confirmPassword) errors.confirmPassword = 'La confirmation du mot de passe est obligatoire';
      if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Les mots de passe ne correspondent pas';
      if (!formData.acceptTerms) errors.terms = 'Veuillez accepter les conditions d\'utilisation';

      setErrorsStep2(errors);
      if (Object.keys(errors).length > 0) return;

      // Prepare registration data
      const registrationData: RegisterRequest = {
        nom: formData.lastName,
        prenom: formData.firstName,
        age: parseInt(formData.age),
        genre: formData.gender as 'Homme' | 'Femme',
        email: formData.email,
        numero_whatsapp: formData.phone,
        pays_residence: formData.country,
        situation_professionnelle: formData.profession,
        mot_de_passe: formData.password,
      };

      try {
        const result = await dispatch(registerUser(registrationData));
        if (registerUser.fulfilled.match(result)) {
          dispatch(setRegistrationEmail(formData.email));
          toast.success('Inscription réussie ! Vérifiez votre email.');
          navigate('/auth/verify-email');
        }
      } catch (err) {
        // Error already handled by Redux
      }
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
          {currentStep === 2 && (
            <button 
              onClick={() => setCurrentStep(1)}
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Retour
            </button>
          )}

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
            {currentStep === 1 ? (
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
                  S'inscrire avec Google
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
                <form onSubmit={handleNextStep} className="space-y-4">
                  <LeyInput
                    label="Nom"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Votre nom"
                    error={errorsStep1.lastName}
                    required
                  />

                  <LeyInput
                    label="Prénoms"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="Vos prénoms"
                    error={errorsStep1.firstName}
                    required
                  />

                  <LeyInput
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Votre email"
                    error={errorsStep1.email}
                    required
                  />

                  <LeyInput
                    label="Numéro whatsapp"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Numéro de téléphone"
                    error={errorsStep1.phone}
                    required
                  />

                  <LeyInput
                    label="Age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    placeholder="Votre âge"
                    error={errorsStep1.age}
                    required
                  />

                  <LeyInput
                    label="Numéro whatsapp"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Numéro de téléphone"
                    required
                  />

                  <LeyInput
                    label="Age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    placeholder="Votre âge"
                    required
                  />

                  <LeyButton
                    type="submit"
                    className="w-full"
                  >
                    Suivant
                  </LeyButton>
                </form>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-center text-foreground">
                  Finaliser la création de votre compte
                </h2>

                {/* Registration Form Step 2 */}
                <form onSubmit={handleNextStep} className="space-y-4">
                  <LeySelect
                    label="Genre"
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    options={[
                      { value: '', label: 'Sélectionner votre genre' },
                      { value: 'Homme', label: 'Homme' },
                      { value: 'Femme', label: 'Femme' },
                    ]}
                    error={errorsStep2.gender}
                    required
                  />

                  <LeySelect
                    label="Pays de résidence"
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    options={[
                      { value: '', label: 'Sélectionner votre pays' },
                      { value: 'Bénin', label: 'Bénin' },
                      { value: 'Burkina Faso', label: 'Burkina Faso' },
                      { value: 'Côte d\'Ivoire', label: 'Côte d\'Ivoire' },
                      { value: 'Guinée-Bissau', label: 'Guinée-Bissau' },
                      { value: 'Mali', label: 'Mali' },
                      { value: 'Niger', label: 'Niger' },
                      { value: 'Sénégal', label: 'Sénégal' },
                      { value: 'Togo', label: 'Togo' },                     
                    ]}
                    error={errorsStep2.country}
                    required
                  />

                  <LeySelect
                    label="Situation professionnelle"
                    value={formData.profession}
                    onChange={(e) => handleInputChange('profession', e.target.value)}
                    options={[
                      { value: '', label: 'Votre profession' },
                      { value: 'Employé', label: 'Employé' },
                      { value: 'Travailleur indépendant', label: 'Travailleur indépendant' },
                      { value: 'Entrepreneur', label: 'Entrepreneur' },
                      { value: 'Étudiant', label: 'Étudiant' },
                      { value: 'Retraité', label: 'Retraité' },
                    ]}
                    error={errorsStep2.profession}
                    required
                  />

                  <LeyInput
                    label="Mot de passe"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Au moins 6 caractères"
                    error={errorsStep2.password}
                    required
                  />

                  <LeyInput
                    label="Confirmer le mot de passe"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="Confirmer votre mot de passe"
                    error={errorsStep2.confirmPassword}
                    required
                  />

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
                  
                  {error && (
                    <div className="text-destructive text-sm text-center mt-2">
                      {error}
                    </div>
                  )}
                </form>
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