import { motion } from 'framer-motion';
import LeyCard from '@/components/ui/LeyCard';

const Analysis = () => {
  return (
    <div className="space-y-8 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20"
      >
        <LeyCard className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-4">Analyse</h2>
          <p className="text-muted-foreground">
            Cette page est en développement. Elle contiendra les outils d'analyse et de suivi de performance de vos investissements.
          </p>
        </LeyCard>
      </motion.div>
    </div>
  );
};

export default Analysis;