import { motion } from 'framer-motion';
import { campaigns } from '../data/mockData';

const platformColors = { Instagram: '#ec4899', Google: '#3b82f6', Facebook: '#a855f7', TikTok: '#06b6d4', Multi: '#f59e0b' };
const statusStyles = {
  active: { bg: 'rgba(34,197,94,0.1)', text: '#4ade80', dot: '#4ade80' },
  completed: { bg: 'rgba(59,130,246,0.1)', text: '#60a5fa', dot: '#60a5fa' },
  paused: { bg: 'rgba(245,158,11,0.1)', text: '#fbbf24', dot: '#fbbf24' },
};

export default function CampaignTable() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.5 }}
      className="rounded-2xl p-5 relative" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)' }}>
      <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl" style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.6), transparent)' }} />

      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-white font-semibold" style={{ fontFamily: 'Syne, sans-serif' }}>Top Campaigns</h3>
          <p className="text-xs text-gray-500">Active & recent performance</p>
        </div>
        <button className="text-xs px-3 py-1.5 rounded-lg transition-all" style={{ background: 'rgba(168,85,247,0.1)', color: '#c084fc', border: '1px solid rgba(168,85,247,0.2)', fontFamily: 'DM Sans, sans-serif' }}>
          View All
        </button>
      </div>

      <div className="space-y-3">
        {campaigns.map((c, i) => {
          const ss = statusStyles[c.status];
          const pc = platformColors[c.platform];
          return (
            <motion.div key={c.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 + i * 0.06 }}
              className="p-3 rounded-xl transition-all duration-200 cursor-pointer group"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
              whileHover={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(168,85,247,0.2)' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: pc }} />
                  <span className="text-sm text-gray-200 font-medium truncate max-w-[160px]" style={{ fontFamily: 'DM Sans, sans-serif' }}>{c.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1" style={{ background: ss.bg, color: ss.text }}>
                    <div className="w-1 h-1 rounded-full" style={{ background: ss.dot }} />
                    {c.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs" style={{ color: pc, fontFamily: 'JetBrains Mono, monospace' }}>{c.platform}</span>
                <span className="text-xs text-gray-500">ROAS: <span className="text-white">{c.roas}x</span></span>
                <span className="text-xs text-gray-500">${(c.spent/1000).toFixed(1)}K / ${(c.budget/1000).toFixed(1)}K</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${c.progress}%` }} transition={{ delay: 1 + i * 0.06, duration: 0.8, ease: 'easeOut' }}
                  className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${pc}, ${pc}88)` }} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
