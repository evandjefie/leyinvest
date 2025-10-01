import { useState } from 'react';
import { ArrowLeft, Paperclip } from 'lucide-react';
import LeyButton from '@/components/ui/LeyButton';
import { toast } from 'sonner';

interface IdentityDocumentsProps {
  onBack: () => void;
}

interface Document {
  name: string;
  size: string;
  date: string;
}

const IdentityDocuments = ({ onBack }: IdentityDocumentsProps) => {
  const [documents, setDocuments] = useState<Document[]>([
    { name: "MaCarte d'identité.pdf", size: '3 Mo', date: '23/03/25' }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Le fichier ne doit pas dépasser 5 Mo');
      return;
    }

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Format acceptés: PDF, JPG, PNG');
      return;
    }

    setIsLoading(true);

    try {
      const newDoc: Document = {
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(1)} Mo`,
        date: new Date().toLocaleDateString('fr-FR'),
      };

      setDocuments([...documents, newDoc]);
      toast.success('Document ajouté avec succès');
    } catch (error) {
      toast.error('Erreur lors de l\'ajout du document');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    toast.success('Documents enregistrés avec succès');
    onBack();
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
          <h1 className="text-2xl font-semibold text-foreground">Documents d'identification</h1>
        </div>

        <div className="p-6 space-y-6">
          {documents.length > 0 && (
            <div className="border border-border rounded-xl overflow-hidden">
              <div className="grid grid-cols-3 bg-primary/5 p-4 text-sm font-medium">
                <div className="text-primary">Nom du fichier</div>
                <div className="text-primary">Poids</div>
                <div className="text-primary">date</div>
              </div>
              {documents.map((doc, index) => (
                <div key={index} className="grid grid-cols-3 p-4 border-t border-border text-sm">
                  <div className="text-foreground">{doc.name}</div>
                  <div className="text-foreground">{doc.size}</div>
                  <div className="text-foreground">{doc.date}</div>
                </div>
              ))}
            </div>
          )}

          <div className="border-2 border-dashed border-warning/30 bg-warning/5 rounded-xl p-8">
            <label className="flex flex-col items-center justify-center cursor-pointer">
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="hidden"
                disabled={isLoading}
              />
              <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-4">
                <Paperclip className="w-6 h-6 text-foreground" />
              </div>
              <p className="text-base font-medium text-foreground mb-1">
                Ajouter un document d'identité
              </p>
              <p className="text-sm text-muted-foreground">
                Format acceptés PDF, JPG, PNG - 5 Mo max
              </p>
            </label>
          </div>

          <LeyButton
            type="button"
            className="w-full"
            onClick={handleSubmit}
            loading={isLoading}
          >
            Enregistrer
          </LeyButton>
        </div>
      </div>
    </div>
  );
};

export default IdentityDocuments;
