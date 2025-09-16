import { motion } from 'framer-motion';
import { ChevronRight, ExternalLink } from 'lucide-react';
import LeyCard from '@/components/ui/LeyCard';
import { useAppSelector } from '@/store/hooks';
import { useState } from 'react';
import TradeModal from '@/components/ui/TradeModal';

const Dashboard = () => {
  const { stats, top5, flop5 } = useAppSelector((state) => state.portfolio);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);

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
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Vue d'ensemble de vos investissements</h1>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowBuyModal(true)}
            className="bg-foreground text-background px-4 py-2 rounded-lg text-sm font-medium hover:bg-foreground/90 transition-colors flex items-center gap-2"
          >
            <div className="w-5 h-5 bg-background text-foreground rounded-full flex items-center justify-center text-xs font-bold">1</div>
            Enregistrer achat
          </button>
          <button 
            onClick={() => setShowSellModal(true)}
            className="bg-amber-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors flex items-center gap-2"
          >
            <div className="w-5 h-5 bg-white text-amber-500 rounded-full flex items-center justify-center text-xs font-bold">$</div>
            Enregistrer vente
          </button>
        </div>
      </div>

      {/* Investment Overview */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <LeyCard className="space-y-3 bg-white">
            <p className="text-sm text-muted-foreground">Montant investi</p>
            <p className="text-2xl font-bold text-foreground">XOF {stats.totalInvested.toLocaleString()}</p>
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">Rendement</p>
              <span className="text-sm font-medium text-green-600">{stats.returnPercentage} %</span>
            </div>
          </LeyCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <LeyCard className="space-y-3 bg-white">
            <p className="text-sm text-muted-foreground">Montant investi</p>
            <p className="text-2xl font-bold text-foreground">XOF {stats.totalInvested.toLocaleString()}</p>
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">Rendement</p>
              <span className="text-sm font-medium text-green-600">{stats.returnPercentage} %</span>
            </div>
          </LeyCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <LeyCard className="space-y-3 bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200">
            <p className="text-sm font-medium text-teal-700">Gains / Pertes</p>
            <p className="text-2xl font-bold text-teal-800">XOF {stats.totalReturn.toLocaleString()}</p>
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">Rendement</p>
              <span className="text-sm font-medium text-teal-600">{stats.returnPercentage} %</span>
            </div>
          </LeyCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <LeyCard className="space-y-3 bg-gradient-to-r from-green-500 to-green-600 text-white">
            <p className="text-sm text-green-100">Valeur totale</p>
            <p className="text-2xl font-bold text-white">XOF {stats.totalValue.toLocaleString()}</p>
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
          <LeyCard className="space-y-4 bg-white">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Top 5</h3>
              <button className="text-teal-600 hover:text-teal-700 text-sm font-medium transition-colors">
                Voir tout
              </button>
            </div>
            <div className="overflow-hidden rounded-lg">
              <table className="w-full">
                <thead className="bg-teal-50">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Entreprise</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Ouverture</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Clôture</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Variation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {top5.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{item.company}</p>
                          <p className="text-sm text-gray-500">{item.symbol}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-700">{item.openPrice}</td>
                      <td className="py-3 px-4 text-gray-700">{item.closePrice}</td>
                      <td className="py-3 px-4">
                        <span className="text-green-600 font-medium">{item.variation}</span>
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
          <LeyCard className="space-y-4 bg-white">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Flop 5</h3>
              <button className="text-teal-600 hover:text-teal-700 text-sm font-medium transition-colors">
                Voir tout
              </button>
            </div>
            <div className="overflow-hidden rounded-lg">
              <table className="w-full">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Entreprise</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Ouverture</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Clôture</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Variation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {flop5.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{item.company}</p>
                          <p className="text-sm text-gray-500">{item.symbol}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-700">{item.openPrice}</td>
                      <td className="py-3 px-4 text-gray-700">{item.closePrice}</td>
                      <td className="py-3 px-4">
                        <span className="text-red-600 font-medium">{item.variation}</span>
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
          <LeyCard className="space-y-4 bg-white">
            <h3 className="text-lg font-semibold text-gray-800">Nos évaluations</h3>
            <div className="space-y-3">
              {evaluations.map((evaluation, index) => (
                <div
                  key={evaluation.term}
                  className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer border border-gray-100"
                >
                  <span className="font-medium text-gray-700">{evaluation.term}</span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
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
          <LeyCard className="space-y-4 bg-white">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Publications officielles</h3>
              <button className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors flex items-center gap-2">
                Actualités du marché
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {publications.map((pub, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-100"
                >
                  <div className="flex-1">
                    <p className="font-medium text-sm text-gray-800">{pub.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{pub.subtitle}</p>
                  </div>
                  <button className="text-teal-600 hover:text-teal-700 text-sm font-medium transition-colors ml-4">
                    {pub.action}
                  </button>
                </div>
              ))}
            </div>
          </LeyCard>
        </motion.div>
      </div>

      {showBuyModal && (
        <TradeModal 
          isOpen={showBuyModal} 
          onClose={() => setShowBuyModal(false)}
          type="buy"
        />
      )}

      {showSellModal && (
        <TradeModal 
          isOpen={showSellModal} 
          onClose={() => setShowSellModal(false)}
          type="sell"
        />
      )}
    </div>
  );
};

export default Dashboard;