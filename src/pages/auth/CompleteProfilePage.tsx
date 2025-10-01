import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import LeyButton from '@/components/ui/LeyButton';
import LeyInput from '@/components/ui/LeyInput';
import LeySelect from '@/components/ui/LeySelect';
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

  const { register, handleSubmit, formState: { errors } } = useForm<CompleteProfileFormValues>({
    resolver: zodResolver(completeProfileSchema),
    defaultValues: {
      numero_whatsapp: '',
      age: 18,
      genre: undefined,
      pays_residence: '',
      situation_professionnelle: '',
      mot_de_passe: '',      
    }
  });


  const onSubmit = async (data: CompleteProfileFormValues) => {
    if (!registrationEmail) {
      toast({
        title: "Erreur",
        description: "Session expirée, veuillez vous réinscrire",
        variant: "destructive"
      });
      navigate('/auth/register');
      return;
    }

    try {
      const result = await dispatch(completeProfile({
        email: registrationEmail,
        ...data
      }));
      
      if (completeProfile.fulfilled.match(result)) {
        toast({
          title: "Profil complété !",
          description: "Votre compte a été créé avec succès.",
        });
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Complete profile error:', err);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <img src={logoLeycom} alt="LeyInvest" className="h-12" />
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center text-foreground">
              Finalisez la création de votre compte
            </h2>
            <p className="text-center text-muted-foreground">
              Veuillez compléter votre profil pour accéder à votre tableau de bord
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">
                    Genre
                  </label>
                  
                  <select
                    {...register('genre')}
                    className="input-field w-full"
                  >
                    <option value="">Sélectionner</option>
                    <option value="Homme">Homme</option>
                    <option value="Femme">Femme</option>
                  </select>
                  {errors.genre && <p className="text-sm text-destructive">{errors.genre.message}</p>}
                </div>                
                <LeyInput
                  label="Âge"
                  type="number"
                  {...register('age', { valueAsNumber: true })}
                  placeholder="Votre âge"
                  error={errors.age?.message}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Pays de résidence
                </label>
                <select
                  {...register('pays_residence')}
                  className="input-field w-full"
                >
                  <option value="">Sélectionner votre pays</option>
                  <option value="Bénin">Bénin</option>
                  <option value="Burkina Faso">Burkina Faso</option>
                  <option value="Côte d'Ivoire">Côte d'Ivoire</option>
                  <option value="Guinée-Bissau">Guinée-Bissau</option>
                  <option value="Mali">Mali</option>
                  <option value="Niger">Niger</option>
                  <option value="Sénégal">Sénégal</option>
                  <option value="Togo">Togo</option>
                </select>
                {errors.pays_residence && <p className="text-sm text-destructive">{errors.pays_residence.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                    Numéro whatsapp
                </label>
                <div className="flex gap-2">
                  <LeySelect
                    value={null}
                    onChange={(e) => null}
                    options={[
                      { value: '+245', label: '+245' },
                      { value: '+229', label: '+229' },
                      { value: '+228', label: '+228' },
                      { value: '+226', label: '+226' },
                      { value: '+225', label: '+225' },
                      { value: '+224', label: '+224' },
                      { value: '+223', label: '+223' },
                      { value: '+221', label: '+221' },
                    ]}
                    className=""
                  />
                  <LeyInput
                    value={null}
                    onChange={(e) => null}
                    // type='number'
                    minLength={8}
                    maxLength={10}
                    {...register('numero_whatsapp')}
                    // placeholder="Numéro de téléphone"
                    className="w-full"
                    name="phone"
                    error={null}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Situation professionnelle
                </label>
                <select
                  {...register('situation_professionnelle')}
                  className="input-field w-full"
                >
                  <option value="">Votre profession</option>
                  <option value="Employé">Employé</option>
                  <option value="Travailleur indépendant">Travailleur indépendant</option>
                  <option value="Entrepreneur">Entrepreneur</option>
                  <option value="Étudiant">Étudiant</option>
                  <option value="Retraité">Retraité</option>
                </select>
                {errors.situation_professionnelle && <p className="text-sm text-destructive">{errors.situation_professionnelle.message}</p>}
              </div>

              <LeyInput
                label="Mot de passe"
                type="password"
                {...register('mot_de_passe')}
                placeholder="8 caractères minimum"
                error={errors.mot_de_passe?.message}
              />
              
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={null}
                  onChange={(e) => null}
                  className="w-4 h-4 mt-1 text-primary border-border rounded focus:ring-primary focus:ring-opacity-20"
                />
                <span className="text-sm text-foreground">
                  J'ai lu et j'accepte <Link to="/terms" className="text-primary underline">les conditions d'utilisation</Link> de LeyInvest
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
                <div className="text-destructive text-sm text-center">
                  {error}
                </div>
              )}
            </form>

          </div>
        </motion.div>
      </div>

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

export default CompleteProfilePage;