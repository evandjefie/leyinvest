import { motion } from 'framer-motion';
import { ChevronRight, ExternalLink } from 'lucide-react';
import LeyCard from '@/components/ui/LeyCard';
import { useAppSelector } from '@/store/hooks';

const Dashboard = () => {
  const { stats, top5, flop5 } = useAppSelector((state) => state.portfolio);

  const evaluations = [
    { term: 'Court terme', icon: ChevronRight, colors: 'bg-[#E9F3FF]' },
    { term: 'Moyen terme', icon: ChevronRight, colors: 'bg-[#EEFCF9]' },
    { term: 'Long terme', icon: ChevronRight, colors: 'bg-[#FFF8EC]' },
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
    <div className="space-y-8 p-6 bg-[#F0F5F4]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl text-[#0B3C3D] font-semibold text-foreground">Vue d'ensemble de vos investissements</h1>
      </div>

      {/* Investment Overview */}
      <div className="bg-background text-primary-foreground rounded-2xl p-6 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
        {/* Montant investi */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <LeyCard className="space-y-1 bg-[#F6F6F6]">
            <p className="text-sm text-muted-foreground">Montant investi</p>
            <p className="text-2xl font-semibold text-foreground">XOF {stats.totalInvested.toLocaleString()}</p>
          </LeyCard>
        </motion.div>

        {/* Rendement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <LeyCard className="space-y-1 bg-[#F6F6F6]">
            <p className="text-sm text-muted-foreground">Rendement</p>
            <p className="text-2xl font-semibold text-foreground">{stats.returnPercentage} %</p>
          </LeyCard>
        </motion.div>

        {/* Gains / Pertes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <LeyCard className="space-y-1 bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200">
            <p className="text-sm font-medium text-teal-700">Gains / Pertes</p>
            <p className="text-2xl font-semibold text-teal-800">XOF {stats.totalReturn.toLocaleString()}</p>
          </LeyCard>
        </motion.div>

        {/* Valeur totale - Grande carte */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="lg:col-span-1 lg:row-span-2"
        >
          <LeyCard className="space-y-1 bg-gradient-to-tl from-[#30B59B] to-[#D1A55E] text-white h-full">
            <p className="text-sm text-green-100">Valeur totale</p>
            <p className="text-4xl font-semibold text-white">XOF {stats.totalValue.toLocaleString()}</p>
          </LeyCard>
        </motion.div>
        
        {/* Capital */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <LeyCard className="space-y-1 bg-[#F6F6F6]">
            <p className="text-sm text-muted-foreground">Capital</p>
            <p className="text-2xl font-semibold text-foreground">XOF {stats.totalInvested.toLocaleString()}</p>
          </LeyCard>
        </motion.div>

        {/* Liquidité */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <LeyCard className="space-y-1 bg-[#F6F6F6]">
            <p className="text-sm text-muted-foreground">Liquidité</p>
            <p className="text-2xl font-semibold text-foreground">XOF {stats.totalValue.toLocaleString()}</p>
          </LeyCard>
        </motion.div>

        {/* Rentabilité */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <LeyCard className="space-y-1 bg-[#F6F6F6]">
            <p className="text-sm text-muted-foreground">Rentabilité</p>
            <p className="text-2xl font-semibold text-foreground">{stats.returnPercentage} %</p>
          </LeyCard>
        </motion.div>

      </div>

      {/* Top 5 and Flop 5 Tables */}
      <div className="card-ley bg-background grid lg:grid-cols-2 grid-cols-1 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <LeyCard className="space-y-4 p-3" variant='default1'>
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
                    <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Entreprise</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Ouverture</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Clôture</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Variation</th>
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
          <LeyCard className="space-y-4 p-3" variant='default1'>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Flop 5</h3>
              <button className="text-teal-600 hover:text-teal-700 text-sm font-medium transition-colors">
                Voir tout
              </button>
            </div>
            <div className="overflow-hidden rounded-lg">
              <table className="w-full">
                <thead className="bg-teal-50">
                <tr>
                    <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Entreprise</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Ouverture</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Clôture</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Variation</th>
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
          <div className="flex items-center justify-between">
            <h3 className="text-3xl text-[#0B3C3D] font-semibold text-foreground">Nos évaluations</h3>
          </div>
          <LeyCard className="space-y-4 bg-white">
            <div className="space-y-1">
              {evaluations.map((evaluation, index) => (
                <div
                  key={evaluation.term}
                  className={`flex items-center justify-between p-4 rounded-lg ${evaluation.colors} hover:bg-teal-100 transition-colors cursor-pointer border border-gray-100`}
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
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl text-[#0B3C3D] font-semibold text-foreground">Publications officielles</h3>
            </div>
            <button className="bg-[#0B3C3D] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors flex items-center gap-2">
              Actualités du marché
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
          <LeyCard className="space-y-4" variant='default1'>
            <div className="space-y-1">
              {publications.map((pub, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 rounded-lg bg-background hover:bg-gray-100 transition-colors border border-gray-100"
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

    </div>
  );
};

export default Dashboard;