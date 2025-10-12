import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface GoogleAccount {
  email: string;
  initial: string;
  color?: string;
}

interface GoogleAccountsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAccount: (email: string) => void;
}

const GoogleAccountsModal = ({ isOpen, onClose, onSelectAccount }: GoogleAccountsModalProps) => {
  const [accounts, setAccounts] = useState<GoogleAccount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      
      // Récupérer l'URL de redirection Google depuis l'API
      fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/google/login`)
        .then(res => res.json())
        .then(data => {
          if (data.redirect_url) {
            // Ouvrir la page Google dans une nouvelle fenêtre
            window.location.href = data.redirect_url;
          }
          setLoading(false);
        })
        .catch(err => {
          console.error('Erreur lors de la récupération de l\'URL Google:', err);
          setLoading(false);
        });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-background rounded-2xl p-6 w-full max-w-md shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">
            Sélectionner un compte google
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="py-8 text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-muted-foreground">Chargement des comptes Google disponibles sur votre appareil...</p>
            </div>
          ) : accounts.length > 0 ? (
            accounts.map((account) => (
              <button
                key={account.email}
                onClick={() => onSelectAccount(account.email)}
                className="w-full flex items-center gap-4 p-4 hover:bg-secondary rounded-lg transition-colors"
              >
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${account.color || 'bg-primary'}`}
                >
                  {account.initial}
                </div>
                <span className="text-foreground">{account.email}</span>
              </button>
            ))
          ) : (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">Aucun compte Google n'a été trouvé sur votre appareil.</p>
              <p className="mt-2 text-sm text-muted-foreground">Veuillez vous connecter à un compte Google dans votre navigateur.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default GoogleAccountsModal;