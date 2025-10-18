import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LeyButton from '@/components/ui/LeyButton';
import { toast } from '@/hooks/use-toast';
import logoLeycom from '@/assets/logo_leycom.svg';
import bgAuthLeycom from '@/assets/bg_auth_leycom.svg';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { resendCode, resetPassword } from '@/store/slices/authSlice';
import { authApi } from '@/services/authApi';

const VerifyCodeReset = () => {
  const [code, setCode] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(300);
  const [canResend, setCanResend] = useState(false);
  const dispatch = useAppDispatch();
  const { loading, registrationEmail } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleSubmit = async () => {
    const fullCode = code.join('');
    if (fullCode.length !== 4) {
      toast({
        title: "Code incomplet",
        description: "Veuillez saisir le code complet",
        variant: "destructive"
      });
      return;
    }

    if (!registrationEmail) {
      toast({
        title: "Erreur",
        description: "Email non trouvé",
        variant: "destructive"
      });
      navigate('/auth/forgot-password');
      return;
    }

    try {
      const response = await authApi.verifyResetCode({ 
        email: registrationEmail, 
        reset_code: fullCode 
      });
      
      toast({
        title: "Vérification réussie !",
        description: response?.message || "Code vérifié avec succès.",
      });
      
      // Stocker le token de reset pour l'utiliser dans la page suivante
      if (response.token) {
        localStorage.setItem('reset_token_temp', response.token);
      }
      
      navigate('/auth/reset-password');
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error?.message || "Code invalide ou expiré",
        variant: "destructive"
      });
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    const email = registrationEmail;
    if (!email) {
      toast({
        title: "Erreur",
        description: "Email non trouvé",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const result = await dispatch(resendCode({ email }));
      if (resendCode.fulfilled.match(result)) {
        setTimer(300);
        setCanResend(false);
        toast({
          title: "Code renvoyé !",
          description: "Un nouveau code a été envoyé à votre email.",
        });
      } else {
        toast({
          title: "Erreur",
          description: result.payload as string,
          variant: "destructive"
        });
      }
    } catch (e) {
      toast({
        title: "Erreur",
        description: "Erreur lors du renvoi du code",
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
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">
                Vérification de votre adresse mail
              </h2>
              <p className="text-muted-foreground">
                Veuillez entrer le code envoyé au{' '}
                <span className="text-primary font-medium">
                  {registrationEmail || 'votre adresse email'}
                </span>
              </p>
            </div>

            {/* Code Input */}
            <div className="flex justify-center gap-4">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  className="w-16 h-16 text-center text-2xl font-bold border-2 border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                />
              ))}
            </div>

            <div className="text-center text-sm text-muted-foreground">
              Renvoyer un code dans{' '}
              <button
                onClick={handleResend}
                disabled={!canResend}
                className={`text-sm ml-1 ${
                  canResend 
                    ? 'text-primary hover:text-primary-dark cursor-pointer' 
                    : 'text-muted-foreground cursor-not-allowed'
                } transition-colors`}
              >
                {timer > 0 ? `${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, '0')}` : ''}
                {canResend && 'Maintenant'}
              </button>
            </div>

            <LeyButton
              onClick={handleSubmit}
              className="w-full"
              loading={loading}
              disabled={code.join('').length !== 4}
            >
              Suivant
            </LeyButton>
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

export default VerifyCodeReset;