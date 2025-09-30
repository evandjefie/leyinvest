import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import LeyButton from '@/components/ui/LeyButton';
import LeyInput from '@/components/ui/LeyInput';
import ErrorModal from '@/components/ui/ErrorModal';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginUser, clearError } from '@/store/slices/authSlice';
import { toast } from '@/hooks/use-toast';
import { loginSchema, LoginFormValues } from '@/lib/validations/auth';
import logoLeycom from '@/assets/logo_leycom.svg';
import bgAuthLeycom from '@/assets/bg_auth_leycom.svg';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = async (data: LoginFormValues) => {
    dispatch(clearError());

    try {
      const result = await dispatch(loginUser({ email: data.email, password: data.password }));
      if (loginUser.fulfilled.match(result)) {
        toast({
          title: "Connexion réussie !",
          description: "Vous êtes maintenant connecté.",
        });
        navigate('/dashboard');
      } else if (loginUser.rejected.match(result)) {
        const errorMsg = result.error.message || '';
        if (errorMsg.includes('Identifiants invalides') || errorMsg.includes('utilisateur introuvable') || errorMsg.includes('n\'existe pas') || errorMsg.includes('404')) {
          setErrorMessage('Ce compte n\'existe pas dans notre base de données. Veuillez vérifier vos identifiants ou créer un nouveau compte.');
          setShowErrorModal(true);
        }
      }
    } catch (err) {
      // Error already handled by Redux
    }
  };

  const handleGoogleLogin = () => {
    toast({
      title: "Bientôt disponible",
      description: "La connexion avec Google sera bientôt disponible.",
    });
  };

  return (
    <>
      <ErrorModal
        open={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title="Compte introuvable"
        message={errorMessage}
        showSignupLink
      />
      
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
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-center text-foreground">
                Connectez-vous à votre compte
              </h2>

              {/* Google Button */}
              <LeyButton
                variant="google"
                className="w-full"
                onClick={handleGoogleLogin}
                icon={
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                }
              >
                Se connecter avec Google
              </LeyButton>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-muted-foreground">Ou connectez vous avec votre mail</span>
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <LeyInput
                  label="Email"
                  type="email"
                  {...register('email')}
                  placeholder="Entrer votre mail"
                  error={errors.email?.message}
                  required
                />

                <LeyInput
                  label="Mot de passe"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  placeholder="Entrer votre mot de passe"
                  error={errors.password?.message}
                  suffix={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  }
                  required
                />

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-opacity-20"
                    />
                    <span className="text-sm text-foreground">Se souvenir de moi</span>
                  </label>
                  <Link 
                    to="/auth/forgot-password" 
                    className="text-sm text-primary hover:text-primary-dark transition-colors"
                  >
                    Mot de passe oublié?
                  </Link>
                </div>

                <LeyButton
                  type="submit"
                  className="w-full"
                  loading={loading}
                >
                  Se connecter
                </LeyButton>
                
                {error && !showErrorModal && (
                  <div className="text-destructive text-sm text-center mt-2">
                    {error}
                  </div>
                )}
              </form>

              <div className="text-center">
                <span className="text-muted-foreground">Pas encore de compte ? </span>
                <Link 
                  to="/auth/register" 
                  className="text-primary hover:text-primary-dark font-medium transition-colors"
                >
                  S'inscrire
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
    </>
  );
};

export default Login;
