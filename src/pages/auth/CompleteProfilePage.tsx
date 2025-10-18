// src/pages/Auth/CompleteProfilePage.tsx

import { useEffect } from 'react'; // Importer useEffect
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
// Importer useForm, mais aussi Controller, watch et setValue
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

// Nos composants et données
import LeyButton from '@/components/ui/LeyButton';
import LeyInput from '@/components/ui/LeyInput';
import LeySelect from '@/components/ui/LeySelect';
import { LeyCombobox } from '@/components/ui/LeyCombobox'; // Notre nouveau Combobox
import { countries } from '@/lib/countries'; // Nos données de pays

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { completeProfile } from '@/store/slices/authSlice';
import { toast } from '@/hooks/use-toast';
import { completeProfileSchema, CompleteProfileFormValues } from '@/lib/validations/auth';
import logoLeycom from '@/assets/logo_leycom.svg';
import bgAuthLeycom from '@/assets/bg_auth_leycom.svg';

const CompleteProfilePage = () => {
  const dispatch = useAppDispatch();
  const { loading, error, registrationEmail } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, control, watch, setValue } = useForm<CompleteProfileFormValues>({
    resolver: zodResolver(completeProfileSchema),
    defaultValues: {
      genre: undefined,
      age: 18,
      pays_residence: '',
      phone_prefix: '',
      numero_whatsapp: '',
      situation_professionnelle: '',
      mot_de_passe: '',
      accept_terms: false,
    }
  });

  // 1. On "observe" le champ du pays de résidence
  const selectedCountry = watch('pays_residence');

  // 2. On met à jour l'indicatif téléphonique quand le pays change
  useEffect(() => {
    const countryData = countries.find(c => c.code === selectedCountry);
    if (countryData) {
      setValue('phone_prefix', countryData.dial_code, { shouldValidate: true });
    } else {
      setValue('phone_prefix', '', { shouldValidate: true });
    }
  }, [selectedCountry, setValue]);


  const onSubmit = async (data: CompleteProfileFormValues) => {
    // Vérifier si l'utilisateur vient de Google SSO
    const isGoogleUser = localStorage.getItem('google_signup') === 'true';
    
    if (!registrationEmail && !isGoogleUser) {
      toast({
        title: "Erreur",
        description: "Session expirée, veuillez vous réinscrire",
        variant: "destructive"
      });
      navigate('/auth/register');
      return;
    }

    try {
      // On combine l'indicatif et le numéro avant l'envoi
      const fullPhoneNumber = `${data.phone_prefix}${data.numero_whatsapp}`;
      
      const profileData: any = {
        ...data,
        numero_whatsapp: fullPhoneNumber, // On envoie le numéro complet
      };

      // Si c'est un utilisateur Google, on n'a pas besoin de l'email
      if (registrationEmail) {
        profileData.email = registrationEmail;
      }
      
      const result = await dispatch(completeProfile(profileData));
      
      if (completeProfile.fulfilled.match(result)) {
        // Nettoyer le localStorage pour Google
        if (isGoogleUser) {
          localStorage.removeItem('google_signup');
        }
        
        toast({
          title: "Profil complété !",
          description: result.payload?.message || "Votre compte a été créé avec succès.",
        });
        navigate('/dashboard');
      } else if (completeProfile.rejected.match(result)) {
        toast({
          title: "Erreur",
          description: result.payload as string || "Une erreur est survenue lors de la création du profil",
          variant: "destructive"
        });
      }
    } catch (err: any) {
      console.error('Complete profile error:', err);
      toast({
        title: "Erreur",
        description: err.message || "Une erreur est survenue",
        variant: "destructive"
      });
    }
  };

  return (
    // Pour éviter le scroll, on utilise h-screen et overflow-auto sur la partie formulaire
    <div className="w-full h-screen flex">
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-white overflow-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-lg space-y-6" // max-w-lg pour un peu plus d'espace
        >
          <div className="text-center">
            <img src={logoLeycom} alt="LeyInvest" className="h-10 mx-auto" />
          </div>

          <div className="space-y-4">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-foreground">
                Finalisez la création de votre compte
                </h2>
                <p className="text-muted-foreground mt-1">
                Veuillez compléter votre profil pour continuer.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <LeySelect
                  label="Genre"
                  options={[
                    { value: 'Homme', label: 'Homme' },
                    { value: 'Femme', label: 'Femme' },
                  ]}
                  placeholder="Sélectionner"
                  {...register('genre')}
                  error={errors.genre?.message}
                />            
                <LeyInput
                  label="Âge"
                  type="number"
                  {...register('age', { valueAsNumber: true })}
                  placeholder="Votre âge"
                  error={errors.age?.message}
                />
              </div>

              {/* Pays de résidence avec le Combobox */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Pays de résidence</label>
                <Controller
                    control={control}
                    name="pays_residence"
                    render={({ field }) => (
                        <LeyCombobox
                            options={countries.map(country => ({
                                value: country.code,
                                label: country.name
                            }))}
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Sélectionner votre pays"
                            searchPlaceholder='Rechercher un pays...'
                        />
                    )}
                />
                {errors.pays_residence && <p className="text-sm text-destructive mt-1">{errors.pays_residence.message}</p>}
              </div>
              
              {/* Numéro WhatsApp */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Numéro WhatsApp</label>
                <div className="flex items-start gap-2">
                   {/* L'indicatif est maintenant un input désactivé qui se met à jour automatiquement */}
                  <LeyInput
                    {...register('phone_prefix')}
                    readOnly
                    className="w-24 bg-gray-100 text-center"
                    placeholder="+XXX"
                  />
                  <div className="w-full">
                    <LeyInput
                      {...register('numero_whatsapp', {
                        onChange: (e) => {
                          // Nettoyage du numéro (suppression des caractères non numériques)
                          const value = e.target.value.replace(/[^\d]/g, '');
                          e.target.value = value;
                          return value;
                        }
                      })}
                      placeholder="Votre numéro (sans indicatif)"
                      error={errors.numero_whatsapp?.message}
                      type="tel" // Type sémantique pour les numéros
                    />
                  </div>
                </div>
                {errors.phone_prefix && <p className="text-sm text-destructive mt-1">{errors.phone_prefix.message}</p>}
              </div>

              <LeySelect
                  label="Situation professionnelle"
                  options={[
                    { value: 'Employé', label: 'Employé' },
                    { value: 'Travailleur indépendant', label: 'Travailleur indépendant' },
                    { value: 'Entrepreneur', label: 'Entrepreneur' },
                    { value: 'Étudiant', label: 'Étudiant' },
                    { value: 'Retraité', label: 'Retraité' },
                    { value: 'Autre', label: 'Autre' },
                  ]}
                  placeholder="Votre profession"
                  {...register('situation_professionnelle')}
                  error={errors.situation_professionnelle?.message}
              />

              <LeyInput
                label="Mot de passe"
                type="password"
                {...register('mot_de_passe')}
                placeholder="8 caractères minimum"
                error={errors.mot_de_passe?.message}
              />
              
              <div className="flex items-start">
                  <input
                    id="accept_terms"
                    type="checkbox"
                    {...register('accept_terms')}
                    className="h-4 w-4 mt-0.5 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <div className="ml-3 text-sm">
                      <label htmlFor="accept_terms" className="text-foreground">
                          J'ai lu et j'accepte les <Link to="/terms" className="font-medium text-primary hover:underline">conditions d'utilisation</Link>
                      </label>
                      {errors.accept_terms && <p className="text-sm text-destructive">{errors.accept_terms.message}</p>}
                  </div>
              </div>

              <LeyButton type="submit" className="w-full" loading={loading}>
                S'inscrire
              </LeyButton>
              
              {error && <p className="text-destructive text-sm text-center">{error}</p>}
            </form>
          </div>
        </motion.div>
      </div>

      {/* Partie Droite avec l'image */}
      <div 
        className="hidden lg:block flex-1 relative overflow-hidden"
      >
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

export default CompleteProfilePage;