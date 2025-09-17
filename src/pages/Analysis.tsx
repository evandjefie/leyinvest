import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import LeyCard from '@/components/ui/LeyCard';
import LeyInput from '@/components/ui/LeyInput';

const Analysis = () => {
  const sectorsData = [
    {
      name: 'Secteur Télécommunications',
      variation: '+1.2%',
      isPositive: true,
      stocks: [
        {
          title: 'SONATEL',
          variationJournaliere: '+3.2%',
          gainsPertes: '+1 250 FCFA',
          volume: '16 500',
          isPositive: true
        },
        {
          title: 'MTN',
          variationJournaliere: '-1.8%',
          gainsPertes: '-650 FCFA',
          volume: '8 200',
          isPositive: false
        }
      ]
    },
    {
      name: 'Secteur Services financiers',
      variation: '-0.9%',
      isPositive: false,
      stocks: [
        {
          title: 'BICI CÔTE D\'IVOIRE',
          variationJournaliere: '-2.1%',
          gainsPertes: '-1380 FCFA',
          volume: '4 590',
          isPositive: false
        },
        {
          title: 'BANK OF AFRICA SENEGAL',
          variationJournaliere: '+1.3%',
          gainsPertes: '+1850 FCFA',
          volume: '2 705',
          isPositive: true
        }
      ]
    }
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analyse</h1>
          <p className="text-sm text-muted-foreground mt-1">Plateforme avancée d'analyse fondamentale</p>
        </div>
        <div className="w-80">
          <LeyInput
            placeholder="Rechercher ici"
            icon={<Search className="w-4 h-4" />}
          />
        </div>
      </div>

      {/* Sectors Analysis */}
      <div className="space-y-8">
        {sectorsData.map((sector, sectorIndex) => (
          <motion.div
            key={sector.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectorIndex * 0.1 }}
          >
            <LeyCard className="space-y-4 bg-white">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{sector.name}</h3>
                <span className={`text-sm font-medium px-2 py-1 rounded ${
                  sector.isPositive ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
                }`}>
                  {sector.variation}
                </span>
              </div>
              
              <div className="overflow-hidden rounded-lg">
                <table className="w-full">
                  <thead className={`${sectorIndex === 0 ? 'bg-teal-50' : 'bg-blue-50'}`}>
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Titre</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Variation journalière</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Gains / Pertes</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Volume</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {sector.stocks.map((stock, stockIndex) => (
                      <tr key={stockIndex} className="hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 font-medium text-gray-900">{stock.title}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-sm font-medium ${
                            stock.isPositive 
                              ? 'text-green-600 bg-green-50' 
                              : 'text-red-600 bg-red-50'
                          }`}>
                            {stock.variationJournaliere}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`font-medium ${
                            stock.isPositive ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {stock.gainsPertes}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-700">{stock.volume}</td>
                        <td className="py-3 px-4">
                          <button className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors">
                            Analyse
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </LeyCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Analysis;