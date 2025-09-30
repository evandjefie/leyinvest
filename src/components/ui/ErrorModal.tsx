import { AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import LeyButton from './LeyButton';

interface ErrorModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  showSignupLink?: boolean;
}

const ErrorModal = ({ open, onClose, title, message, showSignupLink = false }: ErrorModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-destructive" />
            </div>
            <DialogTitle className="text-xl">{title}</DialogTitle>
          </div>
          <DialogDescription className="text-base">{message}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col gap-2 sm:flex-row">
          {showSignupLink && (
            <Link to="/auth/register" className="flex-1">
              <LeyButton variant="primary" className="w-full">
                Créer un compte
              </LeyButton>
            </Link>
          )}
          <LeyButton variant="secondary" onClick={onClose} className={showSignupLink ? 'flex-1' : 'w-full'}>
            Fermer
          </LeyButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ErrorModal;
