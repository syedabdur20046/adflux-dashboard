import { motion } from 'framer-motion';
import { Sparkles, Bot } from 'lucide-react';
import { aiInsights } from '../data/mockData';

const priorityStyles = {
  high: { color: '#f87171', bg: 'rgba(248,113,113,0.1)', border: 'rgba(248,113,113,0.2)' },
  medium: { color: '#fbbf24', bg: 'rgba(251,191,36,0.1)', border: 'rgba(251,191,36,0.2)' },
  low: { color: '#4ade80', bg: 'rgba(74,222,128,0.1)', border: 'rgba(74,222,128,0.2)' },
};

export default function AIInsights() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.5 }}
      className="rounded-2xl p-5 relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(168,85,247,0.2)', backdropFilter: 'blur(20px)' }}>

      {/* Animated glow */}
      <div className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-20"
        style={{ background: 'linear-gradient(135deg, #a855f7, #3b82f6)', animation: 'pulse 3s ease-in-out infinite' }} />
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #a855f7, #3b82f6, transparent)' }} />

      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.3), rgba(59,130,246,0.2))', border: '1px solid rgba(168,85,247,0.3)' }}>
          <Sparkles size={16} className="text-purple-400" />
        </div>
        <div>
          <h3 className="text-white font-semibold text-sm" style={{ fontFamily: 'Syne, sans-serif' }}>AI Insights</h3>
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              {[0,1,2].map(i => (
                <motion.div key={i} className="w-1 h-1 rounded-full bg-purple-400"
                  animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }} />
              ))}
            </div>
            <span className="text-xs text-purple-400/60">Analyzing campaigns</span>
          </div>
        </div>
      </div>

      <div className="space-y-2.5">
        {aiInsights.map((insight, i) => {
          const ps = priorityStyles[insight.priority];
          return (
            <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.1 + i * 0.07 }}
              className="flex gap-3 p-3 rounded-xl transition-all cursor-pointer group"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
              whileHover={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(168,85,247,0.2)' }}>
              <span className="text-base flex-shrink-0 mt-0.5">{insight.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-300 leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>{insight.text}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full uppercase tracking-wide" style={{ background: ps.bg, color: ps.color, border: `1px solid ${ps.border}` }}>
                    {insight.priority}
                  </span>
                  <span className="text-[10px] text-gray-600 font-mono">{insight.time}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm transition-all"
        style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(59,130,246,0.1))', border: '1px solid rgba(168,85,247,0.25)', color: '#c084fc', fontFamily: 'DM Sans, sans-serif' }}>
        <Bot size={14} />
        Ask AI Assistant
      </motion.button>
    </motion.div>
  );
}
