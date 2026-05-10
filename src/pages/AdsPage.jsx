import { motion } from 'framer-motion';
import { adsManagerData } from '../data/mockData';
import { useState } from 'react';
import { Play, Pause, Edit2, TrendingUp } from 'lucide-react';

const GlassCard = ({ children, style = {}, className = '' }) => (
  <div className={`rounded-2xl p-5 relative ${className}`}
    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)', ...style }}>
    {children}
  </div>
);

const statusStyles = {
  active: { bg: 'rgba(34,197,94,0.1)', text: '#4ade80' },
  paused: { bg: 'rgba(245,158,11,0.1)', text: '#fbbf24' },
};

export default function AdsPage() {
  const [ads, setAds] = useState(adsManagerData);
  const toggleAd = (i) => setAds(prev => prev.map((a, idx) => idx === i ? { ...a, status: a.status === 'active' ? 'paused' : 'active' } : a));

  const totalImpressions = ads.reduce((s, a) => s + a.impressions, 0);
  const totalClicks = ads.reduce((s, a) => s + a.clicks, 0);
  const totalSpend = ads.reduce((s, a) => s + a.spend, 0);
  const avgCtr = (totalClicks / totalImpressions * 100).toFixed(2);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
          Ads <span style={{ background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Manager</span>
        </h1>
        <p className="text-gray-500 text-sm mt-0.5">All active ad creatives and performance</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Impressions', value: (totalImpressions / 1000000).toFixed(1) + 'M', color: '#a855f7' },
          { label: 'Total Clicks', value: (totalClicks / 1000).toFixed(0) + 'K', color: '#3b82f6' },
          { label: 'Avg CTR', value: avgCtr + '%', color: '#06b6d4' },
          { label: 'Total Spend', value: '$' + (totalSpend / 1000).toFixed(0) + 'K', color: '#ec4899' },
        ].map((s, i) => (
          <GlassCard key={i}>
            <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl" style={{ background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }} />
            <p className="text-xs text-gray-500 mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{s.label}</p>
            <p className="text-2xl font-bold" style={{ color: s.color, fontFamily: 'Syne, sans-serif' }}>{s.value}</p>
          </GlassCard>
        ))}
      </div>

      <GlassCard>
        <h3 className="text-white font-semibold mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>Ad Creatives</h3>
        <div className="space-y-3">
          {ads.map((ad, i) => {
            const ss = statusStyles[ad.status];
            return (
              <motion.div key={ad.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                className="flex items-center gap-4 p-3 rounded-xl transition-all"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, #a855f720, #3b82f620)`, border: '1px solid rgba(168,85,247,0.2)' }}>
                  {ad.type[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm text-white font-medium truncate" style={{ fontFamily: 'DM Sans, sans-serif' }}>{ad.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: ss.bg, color: ss.text }}>{ad.status}</span>
                  </div>
                  <div className="flex gap-3 text-xs text-gray-500">
                    <span>{(ad.impressions/1000).toFixed(0)}K impr</span>
                    <span>{(ad.clicks/1000).toFixed(1)}K clicks</span>
                    <span>CTR: <span className="text-gray-300">{ad.ctr}%</span></span>
                    <span>CPC: <span className="text-gray-300">${ad.cpc}</span></span>
                    <span>Spend: <span className="text-gray-300">${ad.spend.toLocaleString()}</span></span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <motion.button whileTap={{ scale: 0.9 }} onClick={() => toggleAd(i)}
                    className="p-1.5 rounded-lg text-gray-500 hover:text-white transition-colors" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    {ad.status === 'active' ? <Pause size={13} /> : <Play size={13} />}
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
}
