import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import LeyCard from '@/components/ui/LeyCard';
import { useAppSelector } from '@/store/hooks';

const performanceData = [
  { month: 'JAN', portfolio: 1200, brvm: 1000 },
  { month: 'FEB', portfolio: 1400, brvm: 1100 },
  { month: 'MAR', portfolio: 1600, brvm: 1300 },
  { month: 'APR', portfolio: 1800, brvm: 1500 },
  { month: 'MAY', portfolio: 2200, brvm: 1700 },
  { month: 'JUN', portfolio: 2000, brvm: 1900 },
  { month: 'JUL', portfolio: 2400, brvm: 2100 },
  { month: 'AUG', portfolio: 2800, brvm: 2300 },
  { month: 'SEP', portfolio: 2600, brvm: 2200 },
  { month: 'OCT', portfolio: 3000, brvm: 2500 },
  { month: 'NOV', portfolio: 3200, brvm: 2700 },
  { month: 'DEC', portfolio: 3600, brvm: 2900 },
];

const portfolioHoldings = [
  { symbol: 'SNTS', name: 'SONATEL', quantity: 56, pru: 18500, price: 17450, cours: 672500, valeur: 67900, variation: '+5.6%' },
  { symbol: 'ECOW', name: 'ECOBANK', quantity: 90, pru: 8200, price: 8545, cours: 658600, valeur: -47900, variation: '-3.2%' },
];

const dailyPerformance = [
  { day: 'Jour', value: 90, variation: 99 },
  { day: 'Semaine', value: 90, variation: 99 },
  { day: 'Mois', value: 90, variation: 99 },
  { day: 'Année', value: 90, variation: 99 },
];

const Portfolio = () => {
  const { stats } = useAppSelector((state) => state.portfolio);

  return (
    <div className="min-h-screen space-y-6 md:space-y-8 p-4 md:p-6 pb-24 md:pb-6 bg-[#F0F5F4]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl text-[#0B3C3D] font-semibold">Mon Portefeuille</h1>
          <p className="text-sm text-muted-foreground mt-1">Suivi détaillé de vos positions</p>
        </div>
      </div>

      <LeyCard className="p-4 md:p-6">
        <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-4">
          Graphique de performance du portefeuille vs BRVM Composite
        </h3>
        <div className="h-[250px] md:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <XAxis dataKey="month" stroke="#666" style={{ fontSize: '12px' }} />
              <YAxis stroke="#666" style={{ fontSize: '12px' }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="portfolio" stroke="#E9A86D" strokeWidth={2} name="PORTEFEUILLE" />
              <Line type="monotone" dataKey="brvm" stroke="#30B59B" strokeWidth={2} name="BRVM COMPOSITE" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </LeyCard>

      <LeyCard className="p-4 md:p-6">
        <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-4">Positions</h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-teal-50">
              <tr>
                <th className="text-left py-3 px-2 md:px-4 text-xs md:text-sm font-bold text-gray-700">Symbole</th>
                <th className="text-left py-3 px-2 md:px-4 text-xs md:text-sm font-bold text-gray-700">Titre</th>
                <th className="text-right py-3 px-2 md:px-4 text-xs md:text-sm font-bold text-gray-700">Quantité</th>
                <th className="text-right py-3 px-2 md:px-4 text-xs md:text-sm font-bold text-gray-700">PRU</th>
                <th className="text-right py-3 px-2 md:px-4 text-xs md:text-sm font-bold text-gray-700">Cours</th>
                <th className="text-right py-3 px-2 md:px-4 text-xs md:text-sm font-bold text-gray-700">Valeur</th>
                <th className="text-right py-3 px-2 md:px-4 text-xs md:text-sm font-bold text-gray-700">+/- Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {portfolioHoldings.map((holding) => (
                <tr key={holding.symbol} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-gray-900">{holding.symbol}</td>
                  <td className="py-3 px-2 md:px-4 text-xs md:text-sm text-gray-700">{holding.name}</td>
                  <td className="py-3 px-2 md:px-4 text-xs md:text-sm text-right text-gray-700">{holding.quantity}</td>
                  <td className="py-3 px-2 md:px-4 text-xs md:text-sm text-right text-gray-700">{holding.pru}</td>
                  <td className="py-3 px-2 md:px-4 text-xs md:text-sm text-right text-gray-700">{holding.cours.toLocaleString()}</td>
                  <td className="py-3 px-2 md:px-4 text-xs md:text-sm text-right text-gray-700">{holding.valeur.toLocaleString()}</td>
                  <td className="py-3 px-2 md:px-4 text-xs md:text-sm text-right">
                    <span className={`font-medium ${holding.variation.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {holding.variation}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </LeyCard>

      <LeyCard className="p-4 md:p-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-4">+/- Value</h3>
            <div className="space-y-2">
              {dailyPerformance.map((item) => (
                <div key={item.day} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">{item.day}</span>
                  <div className="flex gap-4">
                    <span className="text-sm font-medium text-teal-600">{item.value}</span>
                    <span className="text-sm font-medium text-teal-600">{item.variation}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-4">Variation</h3>
            <div className="space-y-2">
              {dailyPerformance.map((item) => (
                <div key={item.day} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">{item.day}</span>
                  <span className="text-sm font-medium text-teal-600">{item.variation}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </LeyCard>
    </div>
  );
};

export default Portfolio;
