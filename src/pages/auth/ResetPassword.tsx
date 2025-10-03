import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import LeyButton from '@/components/ui/LeyButton';
import LeyInput from '@/components/ui/LeyInput';
import { toast } from '@/hooks/use-toast';
import { resetPasswordSchema, ResetPasswordFormValues } from '@/lib/validations/auth';
import logoLeycom from '@/assets/logo_leycom.svg';
import bgAuthLeycom from '@/assets/bg_auth_leycom.svg';
import SuccessModal from '@/components/ui/SuccessModal';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { confirmResetPassword } from '@/store/slices/authSlice';

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const dispatch = useAppDispatch();
  const { loading, resetToken } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    }
  });

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate('/auth/login');
  };

  const onSubmit = async (data: ResetPasswordFormValues) => {
    if (!resetToken) {
      toast({
        title: "Erreur",
        description: "Token de réinitialisation non trouvé",
        variant: "destructive"
      });
      navigate('/auth/forgot-password');
      return;
    }

    try {
      const result = await dispatch(confirmResetPassword({ 
        token: resetToken, 
        data: { 
          password: data.password, 
          confirm_password: data.confirmPassword 
        } 
      }));
      
      if (confirmResetPassword.fulfilled.match(result)) {
        setShowSuccessModal(true);
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
        description: "Erreur lors de la réinitialisation du mot de passe",
        variant: "destructive"
      });
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
            to="/auth/verify-code-reset"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour
          </Link>

          {/* Logo & Title */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <img src={logoLeycom} alt="LeyInvest" className="h-12" />
            </div>
            <div>
              {/* <p className="text-muted-foreground mt-2">Votre partenaire d'investissement BRVM</p> */}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center text-foreground">
              Réinitialisation du mot de passe
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nouveau mot de passe
                </label>
                <p className="text-sm text-muted-foreground mb-3">
                  Votre mot de passe doit comporter 8 caractères ou plus, incluant au moins une
                  majuscule, une minuscule, un chiffre et un symbole spécial (@ # $ % & etc.)
                </p>
                <LeyInput
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  placeholder="Entrer votre mot de passe"
                  suffix={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  }
                  error={errors.password?.message}
                  required
                />
              </div>

              <LeyInput
                label="Confirmation le nouveau mot de passe"
                type={showConfirmPassword ? 'text' : 'password'}
                {...register('confirmPassword')}
                placeholder="Répéter votre mot de passe"
                suffix={
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                }
                error={errors.confirmPassword?.message}
                required
              />

              <LeyButton
                type="submit"
                className="w-full"
                loading={loading}
              >
                Enregistrer
              </LeyButton>
            </form>
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

      <SuccessModal
        isOpen={showSuccessModal}
        message="Votre mot de passe à bien été réinitialisé"
        onClose={handleModalClose}
      />
    </div>
  );
};

export default ResetPassword;