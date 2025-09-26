import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import LeyButton from '@/components/ui/LeyButton';
import LeyInput from '@/components/ui/LeyInput';
import LeySelect from '@/components/ui/LeySelect';
import { toast } from '@/hooks/use-toast';
import logoLeycom from '@/assets/logo_leycom.svg';
import bgAuthLeycom from '@/assets/bg_auth_leycom.svg';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { completeProfile } from '@/store/slices/authSlice';

const CompleteProfile = () => {
  const [formData, setFormData] = useState({
    phone: '',
    countryCode: '+225',
    country: '',
    profession: '',
    age: '',
    gender: '',
    acceptTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading: authLoading } = useAppSelector((s) => s.auth);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // clear field error when user types
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation des champs
    const newErrors: Record<string, string> = {};

    if (!formData.phone) newErrors.phone = 'Le téléphone est obligatoire';
    if (!formData.country) newErrors.country = 'Le pays est obligatoire';
    if (!formData.profession) newErrors.profession = 'La situation est obligatoire';

    // Age validation: integer between 16 and 120
    const ageValue = (e.currentTarget as HTMLFormElement).querySelector('input[name="age"]') as HTMLInputElement | null;
    const age = ageValue?.value ?? '';
    const ageNum = parseInt(age, 10);
    if (!age) {
      newErrors.age = 'L\'âge est obligatoire';
    } else if (Number.isNaN(ageNum) || !Number.isInteger(ageNum)) {
      newErrors.age = 'L\'âge doit être un nombre entier';
    } else if (ageNum < 16 || ageNum > 120) {
      newErrors.age = 'L\'âge doit être compris entre 16 et 120 ans';
    }

    // Genre
    if (!formData.gender) newErrors.gender = 'Le genre est obligatoire';

    // Password stricter: min 8, majuscule, minuscule, chiffre
    const pwdInput = (e.currentTarget as HTMLFormElement).querySelector('input[name="password"]') as HTMLInputElement | null;
    const pwd = pwdInput?.value ?? '';
    if (!pwd) {
      newErrors.password = 'Le mot de passe est obligatoire';
    } else if (!/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/.test(pwd)) {
      newErrors.password = 'Mot de passe invalide — minimum 8 caractères, une majuscule, une minuscule et un chiffre';
    }

    if (!formData.acceptTerms) newErrors.terms = 'Veuillez accepter les conditions d\'utilisation';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      // focus first error if exists
      const firstKey = Object.keys(newErrors)[0];
      const el = document.querySelector(`[name="${firstKey}"]`) as HTMLElement | null;
      if (el) el.focus();
      return;
    }

    setLoading(true);

    const profileData = {
      age: parseInt(formData.age, 10),
      genre: formData.gender === 'male' ? 'Homme' : 'Femme',
      numero_whatsapp: formData.phone,
      pays_residence: formData.country,
      situation_professionnelle: formData.profession,
    };

    try {
      const result = await dispatch(completeProfile(profileData));
      if (completeProfile.fulfilled.match(result)) {
        toast({
          title: "Profil complété !",
          description: "Votre compte a été créé avec succès.",
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Erreur",
          description: result.payload as string,
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de la finalisation du profil",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
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
              {/* <p className="text-muted-foreground mt-2">Votre partenaire d'investissement BRVM</p> */}
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
                      name="phone"
                      error={errors.phone}
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
                    { value: 'BJ', label: 'Bénin' },
                    { value: 'BF', label: 'Burkina Faso' },
                    { value: 'CI', label: 'Côte d\'Ivoire' },
                    { value: 'GN', label: 'Guinée' },
                    { value: 'ML', label: 'Mali' },
                    { value: 'NE', label: 'Niger' },
                    { value: 'SN', label: 'Sénégal' },
                    { value: 'TG', label: 'Togo' },
                    { value: 'CM', label: 'Cameroun' },
                    { value: 'GA', label: 'Gabon' },
                    { value: 'GQ', label: 'Guinée équatoriale' },
                    { value: 'CF', label: 'République centrafricaine' },
                    { value: 'CG', label: 'République du Congo' },
                    { value: 'CD', label: 'République démocratique du Congo' },
                    { value: 'TD', label: 'Tchad' },
                  ]}
                  name="country"
                  error={errors.country}
                  required
                />

                <LeySelect
                  label="Situation"
                  value={formData.profession}
                  onChange={(e) => handleInputChange('profession', e.target.value)}
                  options={[
                    { value: '', label: 'Sélectionner votre situation' },
                    { value: 'entrepreneur', label: 'Entrepreneur' },
                    { value: 'salarie', label: 'Salarié' },
                    { value: 'sans_emploi', label: 'Sans emploi' },
                  ]}
                  name="profession"
                  error={errors.profession}
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <LeyInput
                    label="Âge"
                    type="number"
                    name="age"
                    placeholder="Âge"
                    value={String(formData.age ?? '')}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    error={errors.age}
                    required
                  />

                  <LeySelect
                    label="Genre"
                    name="gender"
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    options={[
                      { value: '', label: 'Sélectionner' },
                      { value: 'male', label: 'Homme' },
                      { value: 'female', label: 'Femme' },
                    ]}
                    error={errors.gender}
                    required
                  />
                </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Mot de passe</label>
                <p className="text-sm text-muted-foreground mb-3">
                  Votre mot de passe doit comporter 8 caractères ou plus, incluant au moins une
                  majuscule, une minuscule et un chiffre
                </p>
                <LeyInput
                  type="password"
                  name="password"
                  placeholder="8 caractères minimum"
                  error={errors.password}
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
                  J'ai lu et j'accepte <Link to="/terms" className="text-primary underline">les conditions d'utilisation de LeyInvest</Link>
                </span>
              </label>
              {errors.terms && <p className="text-sm text-destructive">{errors.terms}</p>}

              <LeyButton
                type="submit"
                className="w-full"
                loading={loading || authLoading}
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

export default CompleteProfile;