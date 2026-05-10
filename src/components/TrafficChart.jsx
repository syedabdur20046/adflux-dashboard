import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { trafficData } from '../data/mockData';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="rounded-xl p-3" style={{ background: 'rgba(10,16,40,0.95)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)' }}>
      <p className="text-white text-sm font-medium">{d.name}</p>
      <p style={{ color: d.payload.color }} className="text-lg font-bold">{d.value}%</p>
    </div>
  );
};

const platformEmojis = { Instagram: '📸', Google: '🔍', TikTok: '🎵', Facebook: '👥', Twitter: '🐦' };

export default function TrafficChart() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }}
      className="rounded-2xl p-5 relative" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)' }}>
      <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl" style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.6), transparent)' }} />

      <h3 className="text-white font-semibold mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>Traffic Sources</h3>
      <p className="text-xs text-gray-500 mb-4">Platform distribution</p>

      <div className="flex items-center gap-4">
        <div className="relative w-36 h-36 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={trafficData} cx="50%" cy="50%" innerRadius={45} outerRadius={65} paddingAngle={3} dataKey="value" strokeWidth={0}>
                {trafficData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>100%</div>
              <div className="text-xs text-gray-500">Total</div>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-2.5">
          {trafficData.map((item, i) => (
            <motion.div key={item.name} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 + i * 0.05 }}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-400 flex items-center gap-1.5">
                  <span>{platformEmojis[item.name]}</span> {item.name}
                </span>
                <span className="text-xs font-mono text-white" style={{ color: item.color, fontFamily: 'JetBrains Mono, monospace' }}>{item.value}%</span>
              </div>
              <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${item.value}%` }} transition={{ delay: 0.8 + i * 0.05, duration: 0.8, ease: 'easeOut' }}
                  className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${item.color}, ${item.color}88)` }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
