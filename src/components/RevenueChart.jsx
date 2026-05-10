import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { revenueData } from '../data/mockData';
import { useState } from 'react';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl p-3" style={{ background: 'rgba(10,16,40,0.95)', border: '1px solid rgba(168,85,247,0.3)', backdropFilter: 'blur(20px)' }}>
      <p className="text-xs text-gray-400 mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{label}</p>
      {payload.map(p => (
        <div key={p.name} className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-gray-400 capitalize">{p.name}:</span>
          <span className="text-white font-semibold">${(p.value/1000).toFixed(0)}K</span>
        </div>
      ))}
    </div>
  );
};

const filters = ['12M', '6M', '3M', '1M'];

export default function RevenueChart() {
  const [active, setActive] = useState('12M');
  const slices = { '12M': 12, '6M': 6, '3M': 3, '1M': 1 };
  const data = revenueData.slice(-slices[active]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}
      className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)' }}>
      <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl" style={{ background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.6), rgba(59,130,246,0.6), transparent)' }} />

      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white font-semibold mb-0.5" style={{ fontFamily: 'Syne, sans-serif' }}>Revenue Analytics</h3>
          <p className="text-xs text-gray-500">Ad spend vs revenue performance</p>
        </div>
        <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActive(f)}
              className="px-3 py-1.5 rounded-lg text-xs transition-all duration-200"
              style={{
                background: active === f ? 'linear-gradient(135deg, rgba(168,85,247,0.3), rgba(59,130,246,0.2))' : 'transparent',
                color: active === f ? '#c084fc' : '#6b7280',
                border: active === f ? '1px solid rgba(168,85,247,0.3)' : '1px solid transparent',
                fontFamily: 'JetBrains Mono, monospace',
              }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#6b7280', fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}K`} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="revenue" stroke="#a855f7" strokeWidth={2} fill="url(#revGrad)" />
            <Area type="monotone" dataKey="spend" stroke="#3b82f6" strokeWidth={2} fill="url(#spendGrad)" />
            <Area type="monotone" dataKey="profit" stroke="#06b6d4" strokeWidth={2} fill="url(#profitGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex gap-4 mt-4">
        {[{ color: '#a855f7', label: 'Revenue' }, { color: '#3b82f6', label: 'Ad Spend' }, { color: '#06b6d4', label: 'Profit' }].map(l => (
          <div key={l.label} className="flex items-center gap-2">
            <div className="w-3 h-0.5 rounded-full" style={{ background: l.color }} />
            <span className="text-xs text-gray-500">{l.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
