import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { ArrowLeft } from 'lucide-react';
import LeyInput from '@/components/ui/LeyInput';
import LeySelect from '@/components/ui/LeySelect';
import LeyButton from '@/components/ui/LeyButton';
import { updateUserProfile } from '@/store/slices/authSlice';
import { toast } from 'sonner';

interface EditProfileProps {
  onBack: () => void;
}

const EditProfile = ({ onBack }: EditProfileProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    nom: user?.nom || '',
    prenom: user?.prenom || '',
    email: user?.email || '',
    countryCode: user?.numero_whatsapp?.substring(0, 4) || '+225',
    phone: user?.numero_whatsapp?.substring(4) || '',
    pays_residence: user?.pays_residence || '',
    genre: user?.genre || '',
    situation_professionnelle: user?.situation_professionnelle || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const updateData = {
        ...formData,
        numero_whatsapp: `${formData.countryCode}${formData.phone}`,
      };
      delete (updateData as any).countryCode;
      delete (updateData as any).phone;

      await dispatch(updateUserProfile(updateData)).unwrap();
      toast.success('Informations mises à jour avec succès');
      onBack();
    } catch (error: any) {
      toast.error(error?.message || error || 'Erreur lors de la mise à jour');
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
          <h1 className="text-2xl font-semibold text-foreground">Modification des informations personnelles</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <LeyInput
            label="Nom"
            value={formData.nom}
            onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
            required
          />

          <LeyInput
            label="Prénoms"
            value={formData.prenom}
            onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
            required
          />

          <LeyInput
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Numéro</label>
              <div className="flex gap-2">
                <LeySelect
                  value={formData.countryCode}
                  onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                  options={[
                    { value: '+225', label: '+225' },
                    { value: '+33', label: '+33' },
                    { value: '+1', label: '+1' },
                  ]}
                  className="w-24"
                />
                <LeyInput
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                  placeholder="01 01 01 01 01"
                  required
                  className="flex-1"
                />
              </div>
            </div>

            <LeySelect
              label="Pays de résidence"
              value={formData.pays_residence}
              onChange={(e) => setFormData({ ...formData, pays_residence: e.target.value })}
              options={[
                { value: "Côte d'Ivoire", label: "Côte d'Ivoire" },
                { value: 'France', label: 'France' },
                { value: 'États-Unis', label: 'États-Unis' },
              ]}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LeySelect
              label="Genre"
              value={formData.genre}
              onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
              options={[
                { value: 'Homme', label: 'Homme' },
                { value: 'Femme', label: 'Femme' },
              ]}
              required
            />

            <LeySelect
              label="Situation professionnelle"
              value={formData.situation_professionnelle}
              onChange={(e) => setFormData({ ...formData, situation_professionnelle: e.target.value })}
              options={[
                { value: 'Entrepreneur', label: 'Entrepreneur' },
                { value: 'Salarié', label: 'Salarié' },
                { value: 'Étudiant', label: 'Étudiant' },
                { value: 'Sans emploi', label: 'Sans emploi' },
              ]}
              required
            />
          </div>

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

export default EditProfile;
