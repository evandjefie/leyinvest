import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import LeyInput from './LeyInput';
import LeySelect from './LeySelect';
import LeyButton from './LeyButton';
import { toast } from '@/hooks/use-toast';
import transactionApi from '@/services/transactionApi';
import actionsApi, { Action } from '@/services/actionsApi';

interface TradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'buy' | 'sell';
}

const TradeModal = ({ isOpen, onClose, type = 'buy' }: TradeModalProps) => {
  const [formData, setFormData] = useState({
    action: '',
    quantity: '',
    price: '',
    comment: ''
  });
  
  // Calculer automatiquement le montant
  const calculatedAmount = formData.quantity && formData.price 
    ? (parseFloat(formData.quantity) * parseFloat(formData.price)).toFixed(2)
    : '0';
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actions, setActions] = useState<Action[]>([]);
  const [loadingActions, setLoadingActions] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadActions();
    }
  }, [isOpen]);

  const loadActions = async () => {
    try {
      setLoadingActions(true);
      const response = await actionsApi.getActions();
      setActions(response.actions || []);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les actions disponibles",
        variant: "destructive"
      });
    } finally {
      setLoadingActions(false);
    }
  };

  const actionOptions = actions.map(action => ({
    value: action.id.toString(),
    label: action.nom
  }));

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.action) {
      newErrors.action = 'Veuillez sélectionner une action';
    }
    if (!formData.quantity) {
      newErrors.quantity = 'Veuillez renseigner la quantité';
    } else if (parseInt(formData.quantity) <= 0) {
      newErrors.quantity = 'La quantité doit être strictement positive';
    }
    if (!formData.price) {
      newErrors.price = 'Veuillez renseigner le prix';
    } else if (parseFloat(formData.price) <= 0) {
      newErrors.price = 'Le prix doit être strictement positif';
    }

    // Comment is required per new requirement
    if (!formData.comment || formData.comment.trim() === '') {
      newErrors.comment = 'Le commentaire est obligatoire';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setIsSubmitting(true);
        
        const transactionData = {
          action_id: parseInt(formData.action),
          type_transaction: (type === 'buy' ? 'achat' : 'vente') as 'achat' | 'vente',
          quantite: parseInt(formData.quantity),
          prix_unitaire: parseFloat(formData.price),
          commentaire: formData.comment
        };
        
        const response = await transactionApi.createTransaction(transactionData);
        
        toast({
          title: "Transaction enregistrée",
          description: response?.message || `Votre ${type === 'buy' ? 'achat' : 'vente'} a été enregistré avec succès.`,
        });
        
        onClose();
        setFormData({
          action: '',
          quantity: '',
          price: '',
          comment: ''
        });
      } catch (error: any) {
        toast({
          title: "Erreur",
          description: error.message || `Une erreur est survenue lors de l'enregistrement de votre ${type === 'buy' ? 'achat' : 'vente'}.`,
          variant: "destructive"
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

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
            {type === 'buy' ? 'Enregistrer un achat' : 'Enregistrer une vente'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Action <span className="text-destructive">*</span>
            </label>
            <LeySelect
              placeholder={loadingActions ? "Chargement..." : "Sélectionner une action"}
              options={actionOptions}
              value={formData.action}
              onChange={(e) => handleInputChange('action')(e.target.value)}
              error={errors.action}
              disabled={loadingActions}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Quantité <span className="text-destructive">*</span>
            </label>
            <LeyInput
              type="number"
              placeholder="Nombre d'actions"
              value={formData.quantity}
              onChange={(e) => handleInputChange('quantity')(e.target.value)}
              error={errors.quantity}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Prix par action (FCFA) <span className="text-destructive">*</span>
            </label>
            <LeyInput
              type="number"
              placeholder="0"
              value={formData.price}
              onChange={(e) => handleInputChange('price')(e.target.value)}
              error={errors.price}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {type === 'buy' ? "Montant de l'achat" : "Montant de la vente"}
            </label>
              <LeyInput
                type="text"
                placeholder="Calculé automatiquement"
                value={`${calculatedAmount} FCFA`}
                disabled
              />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Commentaire (optionnel)
            </label>
            <textarea
              placeholder="Ajoutez un commentaire..."
              value={formData.comment}
              onChange={(e) => handleInputChange('comment')(e.target.value)}
              className={"input-field w-full min-h-[80px] resize-none " + (errors.comment ? 'border-destructive' : '')}
            />
            {errors.comment && <p className="text-sm text-destructive">{errors.comment}</p>}
          </div>

          <div className="flex gap-3 pt-4">
            <LeyButton
              type="button"
              variant="secondary"
              onClick={onClose}
              className="flex-1"
            >
              Annuler
            </LeyButton>
            <LeyButton
              type="submit"
              variant="primary"
              className="flex-1"
              loading={isSubmitting}
            >
              Enregistrer
            </LeyButton>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default TradeModal;