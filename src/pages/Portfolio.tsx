import { motion } from 'framer-motion';
import { useState } from 'react';
import { Search } from 'lucide-react';
import LeyCard from '@/components/ui/LeyCard';
import LeyInput from '@/components/ui/LeyInput';

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('Mois');
  
  const portfolioData = [
    {
      symbol: 'SNTS',
      title: 'SONATEL',
      quantity: 50,
      pru: 16500,
      cours: 17450,
      valeur: 872500,
      plusMoinsValue: 47500,
      isPositive: true
    },
    {
      symbol: 'ECOW',
      title: 'ECOBANK',
      quantity: 100,
      pru: 8200,
      cours: 8545,
      valeur: 854500,
      plusMoinsValue: -47500,
      isPositive: false
    }
  ];

  const performanceData = {
    'Jour': { value: 99, variation: 0 },
    'Semaine': { value: 99, variation: 0 },
    'Mois': { value: 99, variation: 0 },
    'Année': { value: 99, variation: 0 }
  };

  const tabs = ['Jour', 'Semaine', 'Mois', 'Année'];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Mon Portefeuille</h1>
          <p className="text-sm text-muted-foreground mt-1">Suivi détaillé de vos positions</p>
        </div>
        <div className="w-80">
          <LeyInput
            placeholder="Rechercher ici"
            icon={<Search className="w-4 h-4" />}
          />
        </div>
      </div>

      {/* Time Period Tabs */}
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === tab
                ? 'bg-teal-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Performance Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <LeyCard className="space-y-4 bg-white">
          <h3 className="text-lg font-semibold text-gray-800">
            Graphique de performance du portefeuille vs BRVM Composite
          </h3>
          <div className="h-80 bg-gray-50 rounded-lg flex items-center justify-center relative">
            {/* Chart placeholder - would integrate with a real charting library */}
            <div className="w-full h-full p-4">
              <div className="flex justify-end gap-8 mb-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-orange-400"></div>
                  <span className="text-gray-600">PORTEFEUILLE</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-teal-400"></div>
                  <span className="text-gray-600">BRVM COMPOSITE</span>
                </div>
              </div>
              <svg className="w-full h-full" viewBox="0 0 800 300">
                {/* Portfolio line (orange) */}
                <polyline
                  fill="none"
                  stroke="#fb923c"
                  strokeWidth="2"
                  points="50,250 100,240 150,220 200,200 250,180 300,160 350,140 400,120 450,140 500,160 550,180 600,200 650,220 700,240 750,250"
                />
                {/* BRVM Composite line (teal) */}
                <polyline
                  fill="none"
                  stroke="#2dd4bf"
                  strokeWidth="2"
                  points="50,200 100,190 150,180 200,170 250,160 300,150 350,140 400,130 450,120 500,110 550,120 600,130 650,140 700,150 750,160"
                />
              </svg>
            </div>
          </div>
        </LeyCard>
      </motion.div>

      <div className="grid lg:grid-cols-4 grid-cols-1 gap-6">
        {/* Portfolio Table */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3"
        >
          <LeyCard className="space-y-4 bg-white">
            <div className="overflow-hidden rounded-lg">
              <table className="w-full">
                <thead className="bg-teal-50">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Symbole</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Titre</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Quantité</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">PRU</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Cours</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Valeur</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">+/- value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {portfolioData.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 font-medium text-gray-900">{item.symbol}</td>
                      <td className="py-3 px-4 text-gray-700">{item.title}</td>
                      <td className="py-3 px-4 text-gray-700">{item.quantity}</td>
                      <td className="py-3 px-4 text-gray-700">{item.pru.toLocaleString()}</td>
                      <td className="py-3 px-4 text-gray-700">{item.cours.toLocaleString()}</td>
                      <td className="py-3 px-4 text-gray-700">{item.valeur.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <span className={`font-medium ${
                          item.isPositive ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {item.isPositive ? '+' : ''}{item.plusMoinsValue.toLocaleString()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </LeyCard>
        </motion.div>

        {/* +/- Value Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <LeyCard className="space-y-4 bg-white">
            <h3 className="text-lg font-semibold text-gray-800">+/- Value</h3>
            <div className="space-y-3">
              {Object.entries(performanceData).map(([period, data]) => (
                <div
                  key={period}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                >
                  <span className="font-medium text-gray-700">{period}</span>
                  <div className="flex gap-4">
                    <span className="text-teal-600 font-medium">{data.value}</span>
                    <span className="text-teal-600 font-medium">{data.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </LeyCard>
        </motion.div>
      </div>
    </div>
  );
};

export default Portfolio;