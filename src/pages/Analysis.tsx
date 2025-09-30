import { motion } from 'framer-motion';
import { Search, TrendingUp, TrendingDown, ChevronDown } from 'lucide-react';
import LeyCard from '@/components/ui/LeyCard';
import LeyButton from '@/components/ui/LeyButton';
import { useState } from 'react';

const sectors = [
  {
    name: 'Secteur Télécommunications',
    performance: '+12%',
    stocks: [
      { symbol: 'SONATEL', variation: '+4.2%', gains: '+1 250 FCFA', volume: '18 500', action: 'Acheter' },
      { symbol: 'MTN', variation: '-1.5%', gains: '-850 FCFA', volume: '8 300', action: 'Acheter' },
    ],
  },
  {
    name: 'Secteur Services financiers',
    performance: '-0.8%',
    stocks: [
      { symbol: 'SONATEL', variation: '-2.1%', gains: '-1680 FCFA', volume: '4 500', action: 'Acheter' },
      { symbol: 'MTN', variation: '+3.2%', gains: '+1 350 FCFA', volume: '5 700', action: 'Acheter' },
    ],
  },
];

const Analysis = () => {
  const [activeTab, setActiveTab] = useState<'prevision' | 'paiement'>('prevision');

  return (
    <div className="space-y-6 md:space-y-8 p-4 md:p-6 bg-[#F0F5F4] min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl text-[#0B3C3D] font-semibold">Analyse</h1>
          <p className="text-sm text-muted-foreground mt-1">Plateforme avancée d'analyse fondamentale</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Search className="w-4 h-4" />
            <span className="text-sm hidden md:inline">Rechercher</span>
          </button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('prevision')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
            activeTab === 'prevision'
              ? 'bg-primary text-white'
              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm">Prévision de rendements</span>
        </button>
        <button
          onClick={() => setActiveTab('paiement')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
            activeTab === 'paiement'
              ? 'bg-primary text-white'
              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <TrendingDown className="w-4 h-4" />
          <span className="text-sm">Paiement des dividendes</span>
        </button>
      </div>

      <div className="space-y-4">
        {sectors.map((sector) => (
          <LeyCard key={sector.name} className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h3 className="text-base md:text-lg font-semibold text-gray-800">{sector.name}</h3>
                <span
                  className={`text-sm font-medium px-2 py-1 rounded ${
                    sector.performance.startsWith('+')
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {sector.performance}
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className="bg-teal-50">
                  <tr>
                    <th className="text-left py-3 px-2 md:px-4 text-xs md:text-sm font-bold text-gray-700">Titre</th>
                    <th className="text-left py-3 px-2 md:px-4 text-xs md:text-sm font-bold text-gray-700">
                      Variation journalière
                    </th>
                    <th className="text-left py-3 px-2 md:px-4 text-xs md:text-sm font-bold text-gray-700">
                      Gains /Pertes
                    </th>
                    <th className="text-left py-3 px-2 md:px-4 text-xs md:text-sm font-bold text-gray-700">Volume</th>
                    <th className="text-right py-3 px-2 md:px-4 text-xs md:text-sm font-bold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sector.stocks.map((stock) => (
                    <tr key={stock.symbol} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-gray-900">
                        {stock.symbol}
                      </td>
                      <td className="py-3 px-2 md:px-4">
                        <span
                          className={`text-xs md:text-sm font-medium ${
                            stock.variation.startsWith('+') ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {stock.variation}
                        </span>
                      </td>
                      <td className="py-3 px-2 md:px-4">
                        <span
                          className={`text-xs md:text-sm font-medium ${
                            stock.gains.startsWith('+') ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {stock.gains}
                        </span>
                      </td>
                      <td className="py-3 px-2 md:px-4 text-xs md:text-sm text-gray-700">{stock.volume}</td>
                      <td className="py-3 px-2 md:px-4 text-right">
                        <LeyButton variant="primary" className="text-xs px-3 py-1">
                          {stock.action}
                        </LeyButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </LeyCard>
        ))}
      </div>
    </div>
  );
};

export default Analysis;
