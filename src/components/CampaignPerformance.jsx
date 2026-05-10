import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { campaignData } from '../data/mockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl p-3" style={{ background: 'rgba(10,16,40,0.95)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)' }}>
      <p className="text-xs text-gray-400 mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{label}</p>
      {payload.map(p => (
        <div key={p.name} className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 rounded-full" style={{ background: p.fill }} />
          <span className="text-gray-400 capitalize">{p.name}:</span>
          <span className="text-white font-semibold">${(p.value).toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

export default function CampaignPerformance() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.5 }}
      className="rounded-2xl p-5 relative" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)' }}>
      <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl" style={{ background: 'linear-gradient(90deg, transparent, rgba(236,72,153,0.6), transparent)' }} />

      <h3 className="text-white font-semibold mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>Campaign Performance</h3>
      <p className="text-xs text-gray-500 mb-5">Weekly breakdown by funnel stage</p>

      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={campaignData} barSize={8} barGap={2}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 10, fontFamily: 'JetBrains Mono, monospace' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#6b7280', fontSize: 10, fontFamily: 'JetBrains Mono, monospace' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}K`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="awareness" fill="#a855f7" radius={[3, 3, 0, 0]} />
            <Bar dataKey="conversion" fill="#3b82f6" radius={[3, 3, 0, 0]} />
            <Bar dataKey="retention" fill="#06b6d4" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex gap-4 mt-3">
        {[{ color: '#a855f7', label: 'Awareness' }, { color: '#3b82f6', label: 'Conversion' }, { color: '#06b6d4', label: 'Retention' }].map(l => (
          <div key={l.label} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: l.color }} />
            <span className="text-xs text-gray-500">{l.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
