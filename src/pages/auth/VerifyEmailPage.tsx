import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LeyButton from '@/components/ui/LeyButton';
import { toast } from '@/hooks/use-toast';
import logoLeycom from '@/assets/logo_leycom.svg';
import bgAuthLeycom from '@/assets/bg_auth_leycom.svg';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { resendCode, verifyEmail } from '@/store/slices/authSlice';

const VerifyEmailPage = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  // 10 minutes in seconds
  const [timer, setTimer] = useState(600);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error, registrationEmail } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!registrationEmail) {
      navigate('/auth/register');
      return;
    }

    let interval: NodeJS.Timeout | undefined;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      setCanResend(false);
    } else {
      setCanResend(true);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer, navigate, registrationEmail]);

  const handleCodeChange = (index: number, value: string) => {
    // Only digits
    if (!/^\d*$/.test(value)) return;

    // If user pasted the whole code into one field
    if (value.length > 1) {
      const digits = value.slice(0, 6).split('');
      const newCode = [...code];
      for (let i = 0; i < 6; i++) {
        newCode[i] = digits[i] ?? '';
      }
      setCode(newCode);
      // focus last filled or last input
      const lastFilled = Math.min(digits.length - 1, 5);
      const next = document.getElementById(`code-${lastFilled}`);
      next?.focus();
      return;
    }

    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleSubmit = async () => {
    const fullCode = code.join('');
    if (fullCode.length !== 6) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez saisir le code complet",
        variant: "destructive"
      });
      return;
    }
    
    if (!registrationEmail) {
      toast({
        title: "Erreur",
        description: "Email non trouvé, veuillez vous réinscrire",
        variant: "destructive"
      });
      navigate('/auth/register');
      return;
    }

    try {
  const result = await dispatch(verifyEmail({ email: registrationEmail, otp: fullCode }));
      if (verifyEmail.fulfilled.match(result)) {
        toast({
          title: "Email vérifié !",
          description: "Votre email a été vérifié avec succès.",
        });
        navigate('/auth/complete-profile');
      } else {
        toast({
          title: "Erreur de vérification",
          description: result.payload as string,
          variant: "destructive"
        });
      }
    } catch (e) {
      toast({
        title: "Erreur",
        description: "Erreur lors de la vérification",
        variant: "destructive"
      });
    }
  };

  const handleResend = async () => {
    if (canResend && registrationEmail) {
      try {
        const result = await dispatch(resendCode({ email: registrationEmail }));
        if (resendCode.fulfilled.match(result)) {
          setTimer(59);
          setCanResend(false);
          toast({
            title: "Code renvoyé",
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
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center text-foreground">
              Vérifiez votre email
            </h2>
            <p className="text-center text-muted-foreground">
              Nous avons envoyé un code de vérification à <span className="font-medium text-foreground">{registrationEmail}</span>
            </p>

            <div className="flex justify-center gap-3">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onPaste={(e) => {
                    const paste = e.clipboardData.getData('text');
                    if (/^\d+$/.test(paste)) {
                      e.preventDefault();
                      handleCodeChange(index, paste);
                    }
                  }}
                  className="w-14 h-14 text-center text-2xl font-bold border border-border rounded-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                />
              ))}
            </div>

            <LeyButton
              onClick={handleSubmit}
              className="w-full"
              loading={loading}
            >
              Vérifier
            </LeyButton>

            {error && (
              <div className="text-destructive text-sm text-center">
                {error}
              </div>
            )}

            <div className="text-center">
              <p className="text-muted-foreground text-sm">
                Vous n'avez pas reçu de code ? 
                {canResend ? (
                  <button 
                    onClick={handleResend}
                    className="text-primary hover:text-primary/80 font-medium ml-1"
                  >
                    Renvoyer le code
                  </button>
                ) : (
                  <span className="text-muted-foreground ml-1">
                    Renvoyer le code dans {timer}s
                  </span>
                )}
              </p>
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

export default VerifyEmailPage;