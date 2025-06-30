

'use client';

import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';


const data = [
  { date: '20 Feb', value: 0 },
  { date: '28 Feb', value: 0 },
  { date: '7 Mar', value: 0 },
  { date: '15 Mar', value: 0 },
  { date: '23 Mar', value: 0 },
];

export default async function PortfolioGraph({Balance}: { Balance: number }) {

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-lg text-gray-600 mb-2">Portfolio value</h2>
      <h1 className="text-3xl font-semibold mb-4">₹{Balance}</h1>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis domain={[0, 'dataMax']} />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#6C47FF" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {['1W', '1M', '3M', '6M', '1Y', 'ALL'].map(range => (
          <button
            key={range}
            className="bg-gray-100 text-sm px-3 py-1 rounded-md hover:bg-gray-200"
          >
            {range}
          </button>
        ))}
      </div>

      <div className="flex justify-around mt-6">
        {[
          { label: 'Buy', symbol: '+' },
          { label: 'Sell', symbol: '-' },
          { label: 'Convert', symbol: '↔' },
          { label: 'Deposit', symbol: '↓' },
          { label: 'Withdraw', symbol: '↑' },
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center">
            <div className="bg-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center">
              {item.symbol}
            </div>
            <span className="text-sm mt-1">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
