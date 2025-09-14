import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LeyButton from '@/components/ui/LeyButton';
import toast from 'react-hot-toast';
import authBackground from '@/assets/auth-background.jpg';

const VerifyEmail = () => {
  const [code, setCode] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(59);
  const [canResend, setCanResend] = useState(false);
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

  const handleSubmit = () => {
    const fullCode = code.join('');
    if (fullCode.length === 4) {
      toast.success('Vérification réussie !');
      navigate('/dashboard');
    } else {
      toast.error('Veuillez saisir le code complet');
    }
  };

  const handleResend = () => {
    if (canResend) {
      setTimer(59);
      setCanResend(false);
      toast.success('Code renvoyé !');
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
              <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-lg opacity-90"></div>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">LeyInvest</h1>
              <p className="text-muted-foreground mt-2">Votre partenaire d'investissement BRVM</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">
                Vérification de votre adresse mail
              </h2>
              <p className="text-muted-foreground">
                Veuillez entrer le code envoyé au{' '}
                <span className="text-primary font-medium">utilisateur@gmail.com</span>
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

            {/* Resend Timer */}
            <div className="text-center">
              <button
                onClick={handleResend}
                disabled={!canResend}
                className={`text-sm ${
                  canResend 
                    ? 'text-primary hover:text-primary-dark cursor-pointer' 
                    : 'text-muted-foreground cursor-not-allowed'
                } transition-colors`}
              >
                Renvoyer un code dans {timer > 0 ? `00:${timer.toString().padStart(2, '0')}` : ''}
                {canResend && 'Renvoyer le code'}
              </button>
            </div>

            <LeyButton
              onClick={handleSubmit}
              className="w-full"
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
          style={{ backgroundImage: `url(${authBackground})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-dark/90" />
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;