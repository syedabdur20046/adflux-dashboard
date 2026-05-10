import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';
import { engagementData } from '../data/mockData';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl p-3" style={{ background: 'rgba(10,16,40,0.95)', border: '1px solid rgba(6,182,212,0.3)', backdropFilter: 'blur(20px)' }}>
      <p className="text-cyan-400 font-mono text-sm">{payload[0]?.value?.toLocaleString()}</p>
      <p className="text-gray-500 text-xs">engagements</p>
    </div>
  );
};

export default function EngagementChart() {
  const [data, setData] = useState(engagementData);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newPoint = {
          time: 'Now',
          value: Math.floor(Math.random() * 5000) + 2000,
          prev: Math.floor(Math.random() * 4000) + 1500,
        };
        return [...prev.slice(1), newPoint];
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const current = data[data.length - 1]?.value?.toLocaleString();

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.5 }}
      className="rounded-2xl p-5 relative" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)' }}>
      <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl" style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.6), transparent)' }} />

      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-white font-semibold" style={{ fontFamily: 'Syne, sans-serif' }}>Real-Time Engagement</h3>
          <div className="flex items-center gap-2 mt-0.5">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs text-cyan-400 font-mono" style={{ fontFamily: 'JetBrains Mono, monospace' }}>LIVE</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-cyan-400" style={{ fontFamily: 'Syne, sans-serif' }}>{current}</div>
          <div className="text-xs text-gray-500">current/hr</div>
        </div>
      </div>

      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="engGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="prevGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} interval={4} />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="prev" stroke="#a855f7" strokeWidth={1.5} fill="url(#prevGrad)" strokeDasharray="4 2" />
            <Area type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={2} fill="url(#engGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex gap-4 mt-2">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 rounded-full" style={{ background: '#06b6d4' }} />
          <span className="text-xs text-gray-500">Current</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 rounded-full border-dashed" style={{ borderTop: '1.5px dashed #a855f7', background: 'transparent' }} />
          <span className="text-xs text-gray-500">Previous</span>
        </div>
      </div>
    </motion.div>
  );
}
