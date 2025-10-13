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
  // const [accounts, setAccounts] = useState<GoogleAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [iframeUrl, setIframeUrl] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      setIframeUrl(null);
      
      // Récupérer l'URL de redirection Google depuis l'API
      fetch(`${import.meta.env.VITE_API_BASE_URL}auth/google/login`)
        .then(res => res.json())
        .then(data => {
          if (data.redirect_url) {
            // Rediriger directement vers Google (pas de nouvelle fenêtre)
            setIframeUrl(data.redirect_url);
          }else{
            console.error("L'API n'a pas retourné de redirect_url.");
          }
          setLoading(false);
        })
        .catch(err => {
          console.error('Erreur lors de la récupération de l\'URL Google:', err);
          setLoading(false);
          // onClose();
        });
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        // Augmentation de la taille pour accueillir l'iframe
        className="bg-background rounded-2xl p-6 w-full max-w-lg shadow-2xl h-3/4 flex flex-col" 
      >
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <h2 className="text-xl font-bold text-foreground">
            Connexion Google
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {loading ? (
          <div className="py-8 text-center flex-grow flex flex-col justify-center items-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-muted-foreground">Préparation de la page de connexion Google...</p>
          </div>
        ) : iframeUrl ? (
          // 🚀 AJOUT DE L'IFRAME POUR AFFICHER LA PAGE WEB DANS LE MODAL
          <div className="flex-grow">
            <iframe 
              src={iframeUrl} 
              title="Connexion Google" 
              className="w-full h-full border-none rounded-lg"
              // Sandbox peut être ajouté pour plus de sécurité, mais peut briser le comportement
              // sandbox="allow-scripts allow-same-origin allow-popups" 
            />
          </div>
        ) : (
            <div className="py-8 text-center flex-grow flex flex-col justify-center items-center">
                <p className="text-red-500 font-semibold">Échec du chargement de l'URL.</p>
                <p className="mt-2 text-sm text-muted-foreground">Veuillez réessayer ou vérifier la console pour les erreurs API.</p>
            </div>
        )}
      </motion.div>
    </div>
  );
};

export default GoogleAccountsModal;