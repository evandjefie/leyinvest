import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import LeyButton from '@/components/ui/LeyButton';
import LeyInput from '@/components/ui/LeyInput';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { registerUser, setRegistrationEmail } from '@/store/slices/authSlice';
import { RegisterRequest } from '@/types/api';
import { toast } from '@/hooks/use-toast';
import logoLeycom from '@/assets/logo_leycom.svg';
import bgAuthLeycom from '@/assets/bg_auth_leycom.svg';

const registerSchema = z.object({
  nom: z.string().min(1, 'Le nom est obligatoire').max(50, 'Le nom ne peut pas dépasser 50 caractères'),
  prenom: z.string().min(1, 'Le prénom est obligatoire').max(50, 'Le prénom ne peut pas dépasser 50 caractères'),
  email: z.string().email('Format d\'email invalide').min(1, 'L\'email est obligatoire'),
  numero_whatsapp: z.string().min(8, 'Le numéro WhatsApp doit contenir au moins 8 chiffres').max(15, 'Le numéro WhatsApp ne peut pas dépasser 15 chiffres'),
  age: z.number().int('L\'âge doit être un nombre entier').min(16, 'Vous devez avoir au moins 16 ans').max(120, 'L\'âge ne peut pas dépasser 120 ans'),
  genre: z.enum(['Homme', 'Femme'], { required_error: 'Le genre est obligatoire' }),
  pays_residence: z.string().min(1, 'Le pays de résidence est obligatoire'),
  situation_professionnelle: z.string().min(1, 'La situation professionnelle est obligatoire'),
  mot_de_passe: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères').max(100, 'Le mot de passe ne peut pas dépasser 100 caractères'),
});

type RegisterForm = z.infer<typeof registerSchema>;

const Register = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nom: '',
      prenom: '',
      email: '',
      numero_whatsapp: '',
      age: 18,
      genre: undefined,
      pays_residence: '',
      situation_professionnelle: '',
      mot_de_passe: '',
    }
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      const result = await dispatch(registerUser(data as RegisterRequest));
      if (registerUser.fulfilled.match(result)) {
        dispatch(setRegistrationEmail(data.email));
        toast({
          title: "Inscription réussie !",
          description: "Un code de vérification a été envoyé à votre email.",
        });
        navigate('/auth/verify-email');
      }
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  const handleGoogleSignup = () => {
    toast({
      title: "Bientôt disponible",
      description: "L'inscription avec Google sera bientôt disponible.",
    });
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <img src={logoLeycom} alt="LeyInvest" className="h-16" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              Créer votre compte
            </h2>
          </div>

          <div className="space-y-6">
            <LeyButton
              variant="secondary"
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
                <span className="px-4 bg-background text-muted-foreground">Ou inscrivez-vous avec votre email</span>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <LeyInput
                  label="Nom"
                  {...register('nom')}
                  placeholder="Votre nom"
                  error={errors.nom?.message}
                />
                <LeyInput
                  label="Prénoms"
                  {...register('prenom')}
                  placeholder="Vos prénoms"
                  error={errors.prenom?.message}
                />
              </div>

              <LeyInput
                label="Email"
                type="email"
                {...register('email')}
                placeholder="Votre email"
                error={errors.email?.message}
              />

              <LeyInput
                label="Numéro WhatsApp"
                {...register('numero_whatsapp')}
                placeholder="Numéro de téléphone"
                error={errors.numero_whatsapp?.message}
              />

              <div className="grid grid-cols-2 gap-4">
                <LeyInput
                  label="Âge"
                  type="number"
                  {...register('age', { valueAsNumber: true })}
                  placeholder="Votre âge"
                  error={errors.age?.message}
                />
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
                placeholder="Au moins 6 caractères"
                error={errors.mot_de_passe?.message}
              />

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

            <div className="text-center">
              <span className="text-muted-foreground">Déjà un compte ? </span>
              <Link 
                to="/auth/login" 
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Se connecter
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="hidden lg:block flex-1 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgAuthLeycom})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        </div>
      </div>
    </div>
  );
};

export default Register;