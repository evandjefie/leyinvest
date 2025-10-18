import { useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { ArrowLeft } from 'lucide-react';
import LeyInput from '@/components/ui/LeyInput';
import LeyButton from '@/components/ui/LeyButton';
import { changePassword } from '@/store/slices/authSlice';
import { toast } from 'sonner';

interface ChangePasswordProps {
  onBack: () => void;
}

const ChangePassword = ({ onBack }: ChangePasswordProps) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    old_password: '',
    new_password: '',
    confirm_password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.new_password !== formData.confirm_password) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }

    if (formData.new_password.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    setIsLoading(true);

    try {
      const result = await dispatch(changePassword({
        old_password: formData.old_password,
        new_password: formData.new_password,
      })).unwrap();
      
      toast.success(result?.message || 'Mot de passe modifié avec succès');
      onBack();
    } catch (error: any) {
      toast.error(error?.message || error || 'Erreur lors du changement de mot de passe');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-background rounded-2xl shadow-sm border border-border overflow-hidden">
        <div className="flex items-center gap-4 p-6 border-b border-border">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-2xl font-semibold text-foreground">Modification du mot de passe</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <LeyInput
            label="Mot de passe actuel"
            type="password"
            value={formData.old_password}
            onChange={(e) => setFormData({ ...formData, old_password: e.target.value })}
            required
          />

          <div className="space-y-2">
            <LeyInput
              label="Nouveau mot de passe"
              type="password"
              value={formData.new_password}
              onChange={(e) => setFormData({ ...formData, new_password: e.target.value })}
              required
            />
            <p className="text-xs text-muted-foreground">
              Votre mot de passe doit comporter 8 caractères ou plus, incluant au moins une majuscule, une minuscule, 
              un chiffre et un symbole spécial (@, #, $, %, &, etc.)
            </p>
          </div>

          <LeyInput
            label="Confirmer le nouveau mot de passe"
            type="password"
            value={formData.confirm_password}
            onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
            required
          />

          <LeyButton
            type="submit"
            className="w-full"
            loading={isLoading}
          >
            Enregistrer
          </LeyButton>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
