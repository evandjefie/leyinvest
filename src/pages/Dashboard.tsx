import { motion } from 'framer-motion';
import { ChevronRight, ExternalLink } from 'lucide-react';
import LeyCard from '@/components/ui/LeyCard';
import { useAppSelector } from '@/store/hooks';

const Dashboard = () => {
  const { stats, top5, flop5 } = useAppSelector((state) => state.portfolio);

  const evaluations = [
    { term: 'Court terme', icon: ChevronRight },
    { term: 'Moyen terme', icon: ChevronRight },
    { term: 'Long terme', icon: ChevronRight },
  ];

  const publications = [
    {
      title: 'Bulletins Officiels de la Côte',
      subtitle: 'Bulletin Officiel de la Côte du 11 Juillet 2025',
      action: 'Lire'
    },
    {
      title: 'Paiement de dividendes de 308 F CFA...',
      subtitle: 'NESTLÉ CI',
      action: 'Lire'
    },
    {
      title: 'Dividende proposé de 125 F CFA..',
      subtitle: 'Assemblée Générale - ECOBANK',
      action: 'Lire'
    },
    {
      title: 'Dividende proposé de 105 F CFA',
      subtitle: 'Assemblée Générale - SONATEL',
      action: 'Lire'
    },
  ];

  return (
    <div className="space-y-8 p-6">
      {/* Investment Overview */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <LeyCard className="space-y-3">
            <p className="text-sm text-muted-foreground">Montant investi</p>
            <p className="text-2xl font-bold">XOF {stats.totalInvested.toLocaleString()}</p>
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">Rendement</p>
              <span className="text-sm font-medium profit">{stats.returnPercentage} %</span>
            </div>
          </LeyCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <LeyCard className="space-y-3">
            <p className="text-sm text-muted-foreground">Montant investi</p>
            <p className="text-2xl font-bold">XOF {stats.totalInvested.toLocaleString()}</p>
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">Rendement</p>
              <span className="text-sm font-medium profit">{stats.returnPercentage} %</span>
            </div>
          </LeyCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <LeyCard className="space-y-3 border-2 border-primary">
            <p className="text-sm text-primary font-medium">Gains / Pertes</p>
            <p className="text-2xl font-bold text-primary">XOF {stats.totalReturn.toLocaleString()}</p>
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">Rendement</p>
              <span className="text-sm font-medium profit">{stats.returnPercentage} %</span>
            </div>
          </LeyCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <LeyCard variant="stats" className="space-y-3">
            <p className="text-sm text-primary-foreground/80">Valeur totale</p>
            <p className="text-2xl font-bold text-primary-foreground">XOF {stats.totalValue.toLocaleString()}</p>
          </LeyCard>
        </motion.div>
      </div>

      {/* Top 5 and Flop 5 Tables */}
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <LeyCard className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Top 5</h3>
              <button className="text-primary hover:text-primary-dark text-sm font-medium transition-colors">
                Voir tout
              </button>
            </div>
            <div className="table-investment">
              <table className="w-full">
                <thead>
                  <tr>
                    <th>Entreprise</th>
                    <th>Ouverture</th>
                    <th>Clôture</th>
                    <th>Variation</th>
                  </tr>
                </thead>
                <tbody>
                  {top5.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div>
                          <p className="font-medium">{item.company}</p>
                          <p className="text-sm text-muted-foreground">{item.symbol}</p>
                        </div>
                      </td>
                      <td>{item.openPrice}</td>
                      <td>{item.closePrice}</td>
                      <td>
                        <span className="profit">{item.variation}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </LeyCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <LeyCard className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Flop 5</h3>
              <button className="text-primary hover:text-primary-dark text-sm font-medium transition-colors">
                Voir tout
              </button>
            </div>
            <div className="table-investment">
              <table className="w-full">
                <thead>
                  <tr>
                    <th>Entreprise</th>
                    <th>Ouverture</th>
                    <th>Clôture</th>
                    <th>Variation</th>
                  </tr>
                </thead>
                <tbody>
                  {flop5.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div>
                          <p className="font-medium">{item.company}</p>
                          <p className="text-sm text-muted-foreground">{item.symbol}</p>
                        </div>
                      </td>
                      <td>{item.openPrice}</td>
                      <td>{item.closePrice}</td>
                      <td>
                        <span className="loss">{item.variation}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </LeyCard>
        </motion.div>
      </div>

      {/* Evaluations and Publications */}
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <LeyCard className="space-y-4">
            <h3 className="text-lg font-semibold">Nos évaluations</h3>
            <div className="space-y-3">
              {evaluations.map((evaluation, index) => (
                <div
                  key={evaluation.term}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
                >
                  <span className="font-medium">{evaluation.term}</span>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              ))}
            </div>
          </LeyCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <LeyCard className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Publications officielles</h3>
              <button className="bg-foreground text-background px-4 py-2 rounded-lg text-sm font-medium hover:bg-foreground/90 transition-colors flex items-center gap-2">
                Actualités du marché
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              {publications.map((pub, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium text-sm">{pub.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{pub.subtitle}</p>
                  </div>
                  <button className="text-primary hover:text-primary-dark text-sm font-medium transition-colors">
                    {pub.action}
                  </button>
                </div>
              ))}
            </div>
          </LeyCard>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;