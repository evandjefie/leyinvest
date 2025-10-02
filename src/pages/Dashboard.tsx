import { motion } from 'framer-motion';
import { ChevronRight, ExternalLink } from 'lucide-react';
import LeyCard from '@/components/ui/LeyCard';
import { useAppSelector } from '@/store/hooks';

const Dashboard = () => {
  const { stats, top5, flop5 } = useAppSelector((state) => state.portfolio);
  const { user } = useAppSelector((state) => state.auth);

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
    <div className="min-h-screen space-y-6 md:space-y-8 p-4 md:p-6 pb-24 md:pb-6 bg-[#F0F5F4]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl text-[#0B3C3D] font-semibold">Vue d'ensemble de vos investissements</h1>
          {/* {user && (
            <p className="text-sm md:text-base text-muted-foreground mt-1">
              Utilisateur: {user.prenom} {user.nom}
            </p>
          )} */}
        </div>
      </div>

      {/* Investment Overview */}
      <div className="bg-background text-primary-foreground rounded-2xl p-3 md:p-6 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 md:gap-6">
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
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 md:gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <LeyCard className="space-y-4 p-3 md:p-6" variant='default'>
            <div className="flex items-center justify-between">
              <h3 className="text-base md:text-lg font-semibold text-gray-800">Top 5</h3>
              <button className="text-teal-600 hover:text-teal-700 text-xs md:text-sm font-medium transition-colors">
                Voir tout
              </button>
            </div>
            <div className="overflow-x-auto -mx-3 md:mx-0">
              <table className="w-full min-w-[400px]">
                <thead className="bg-teal-50">
                  <tr>
                    <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-bold text-gray-700">Entreprise</th>
                    <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-bold text-gray-700">Ouverture</th>
                    <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-bold text-gray-700">Clôture</th>
                    <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-bold text-gray-700">Variation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {top5.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-2 md:py-3 px-2 md:px-4">
                        <div>
                          <p className="font-medium text-gray-900 text-xs md:text-base">{item.company}</p>
                          <p className="text-xs text-gray-500">{item.symbol}</p>
                        </div>
                      </td>
                      <td className="py-2 md:py-3 px-2 md:px-4 text-gray-700 text-xs md:text-base">{item.openPrice}</td>
                      <td className="py-2 md:py-3 px-2 md:px-4 text-gray-700 text-xs md:text-base">{item.closePrice}</td>
                      <td className="py-2 md:py-3 px-2 md:px-4">
                        <span className="text-green-600 font-medium text-xs md:text-base">{item.variation}</span>
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
          <LeyCard className="space-y-4 p-3 md:p-6" variant='default'>
            <div className="flex items-center justify-between">
              <h3 className="text-base md:text-lg font-semibold text-gray-800">Flop 5</h3>
              <button className="text-teal-600 hover:text-teal-700 text-xs md:text-sm font-medium transition-colors">
                Voir tout
              </button>
            </div>
            <div className="overflow-x-auto -mx-3 md:mx-0">
              <table className="w-full min-w-[400px]">
                <thead className="bg-teal-50">
                <tr>
                    <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-bold text-gray-700">Entreprise</th>
                    <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-bold text-gray-700">Ouverture</th>
                    <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-bold text-gray-700">Clôture</th>
                    <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-bold text-gray-700">Variation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {flop5.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-2 md:py-3 px-2 md:px-4">
                        <div>
                          <p className="font-medium text-gray-900 text-xs md:text-base">{item.company}</p>
                          <p className="text-xs text-gray-500">{item.symbol}</p>
                        </div>
                      </td>
                      <td className="py-2 md:py-3 px-2 md:px-4 text-gray-700 text-xs md:text-base">{item.openPrice}</td>
                      <td className="py-2 md:py-3 px-2 md:px-4 text-gray-700 text-xs md:text-base">{item.closePrice}</td>
                      <td className="py-2 md:py-3 px-2 md:px-4">
                        <span className="text-red-600 font-medium text-xs md:text-base">{item.variation}</span>
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
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 md:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="mb-4">
            <h3 className="text-xl md:text-3xl text-[#0B3C3D] font-semibold">Nos évaluations</h3>
          </div>
          <LeyCard className="space-y-4 bg-white">
            <div className="space-y-1">
              {evaluations.map((evaluation) => (
                <div
                  key={evaluation.term}
                  className={`flex items-center justify-between p-3 md:p-4 rounded-lg ${evaluation.colors} hover:bg-teal-100 transition-colors cursor-pointer border border-gray-100`}
                >
                  <span className="font-medium text-gray-700 text-sm md:text-base">{evaluation.term}</span>
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
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
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2">
            <h3 className="text-xl md:text-3xl text-[#0B3C3D] font-semibold">Publications officielles</h3>
            <button className="bg-[#0B3C3D] text-white px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium hover:bg-gray-700 transition-colors flex items-center gap-2">
              Actualités du marché
              <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
            </button>
          </div>
          <LeyCard className="space-y-4 bg-[#f0f5f4]" variant='stats'>
            <div className="space-y-1">
              {publications.map((pub, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 md:p-3 rounded-lg bg-background hover:bg-gray-100 transition-colors border border-gray-100"
                >
                  <div className="flex-1 mr-2">
                    <p className="font-medium text-xs md:text-sm text-gray-800 line-clamp-1">{pub.title}</p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">{pub.subtitle}</p>
                  </div>
                  <button className="text-teal-600 hover:text-teal-700 text-xs md:text-sm font-medium transition-colors shrink-0">
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