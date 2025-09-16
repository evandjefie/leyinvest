import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import LeyInput from './LeyInput';
import LeySelect from './LeySelect';
import LeyButton from './LeyButton';

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
    totalAmount: '',
    comment: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const buyActions = [
    { value: 'SONATEL', label: 'SONATEL' },
    { value: 'ECOBANK', label: 'ECOBANK' },
    { value: 'BOA', label: 'BOA' },
    { value: 'ORANGE', label: 'ORANGE' },
  ];

  const sellActions = [
    { value: 'SONATEL', label: 'SONATEL (10 actions disponibles)' },
    { value: 'ECOBANK', label: 'ECOBANK (25 actions disponibles)' },
    { value: 'BOA', label: 'BOA (15 actions disponibles)' },
    { value: 'ORANGE', label: 'ORANGE (30 actions disponibles)' },
  ];

  const actions = type === 'buy' ? buyActions : sellActions;

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
    if (!formData.totalAmount) {
      newErrors.totalAmount = 'Veuillez renseigner le montant';
    } else if (parseFloat(formData.totalAmount) <= 0) {
      newErrors.totalAmount = 'Le montant doit être strictement positif';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      onClose();
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
              placeholder="Sélectionner une action"
              options={actions}
              value={formData.action}
              onChange={(e) => handleInputChange('action')(e.target.value)}
              error={errors.action}
            />
          </div>

          <LeyInput
            label="Quantité"
            type="number"
            placeholder="Nombre d'actions"
            value={formData.quantity}
            onChange={(e) => handleInputChange('quantity')(e.target.value)}
            error={errors.quantity}
            required
          />

          <LeyInput
            label="Prix par action (FCFA)"
            type="number"
            placeholder="0"
            value={formData.price}
            onChange={(e) => handleInputChange('price')(e.target.value)}
            error={errors.price}
            required
          />

            <LeyInput
              label={type === 'buy' ? "Montant de l'achat" : "Montant de la vente"}
              type="number"
              placeholder="0"
              value={formData.totalAmount}
              onChange={(e) => handleInputChange('totalAmount')(e.target.value)}
              error={errors.totalAmount}
              required
            />

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Commentaire (optionnel)
            </label>
            <textarea
              placeholder="Ajoutez un commentaire..."
              value={formData.comment}
              onChange={(e) => handleInputChange('comment')(e.target.value)}
              className="input-field w-full min-h-[80px] resize-none"
            />
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