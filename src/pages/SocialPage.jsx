import { motion } from 'framer-motion';
import { socialMetrics } from '../data/mockData';
import { TrendingUp, Users, Eye, Heart } from 'lucide-react';

const GlassCard = ({ children, style = {}, className = '' }) => (
  <div className={`rounded-2xl p-5 relative ${className}`}
    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)', ...style }}>
    {children}
  </div>
);

const platformEmoji = { Instagram: '📸', TikTok: '🎵', Facebook: '👥', 'Twitter/X': '🐦', YouTube: '▶️' };

export default function SocialPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
          Social <span style={{ background: 'linear-gradient(135deg,#ec4899,#a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Media</span>
        </h1>
        <p className="text-gray-500 text-sm mt-0.5">Cross-platform performance overview</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Followers', value: '1.01M', icon: Users, color: '#a855f7' },
          { label: 'Total Reach', value: '8.5M', icon: Eye, color: '#3b82f6' },
          { label: 'Avg Engagement', value: '5.0%', icon: Heart, color: '#ec4899' },
          { label: 'Growth Rate', value: '+14.1%', icon: TrendingUp, color: '#06b6d4' },
        ].map((s, i) => (
          <GlassCard key={i}>
            <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl" style={{ background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }} />
            <div className="flex items-center gap-2 mb-2">
              <s.icon size={14} style={{ color: s.color }} />
              <p className="text-xs text-gray-500" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{s.label}</p>
            </div>
            <p className="text-2xl font-bold" style={{ color: s.color, fontFamily: 'Syne, sans-serif' }}>{s.value}</p>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {socialMetrics.map((s, i) => (
          <motion.div key={s.platform} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="rounded-2xl p-5 relative" style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${s.color}25`, backdropFilter: 'blur(20px)' }}>
            <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl" style={{ background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }} />
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{platformEmoji[s.platform]}</span>
                <div>
                  <p className="text-white font-semibold" style={{ fontFamily: 'Syne, sans-serif' }}>{s.platform}</p>
                  <p className="text-xs text-gray-500">{s.posts} posts this month</p>
                </div>
              </div>
              <span className="text-xs px-2 py-1 rounded-full font-mono" style={{ background: `${s.color}18`, color: s.color, border: `1px solid ${s.color}30` }}>
                {s.growth}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Followers', value: s.followers },
                { label: 'Reach', value: s.reach },
                { label: 'Engagement', value: s.engagement },
              ].map(m => (
                <div key={m.label} className="rounded-xl p-3 text-center" style={{ background: `${s.color}08` }}>
                  <p className="text-xs text-gray-500 mb-1">{m.label}</p>
                  <p className="text-base font-bold" style={{ color: s.color, fontFamily: 'Syne, sans-serif' }}>{m.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
