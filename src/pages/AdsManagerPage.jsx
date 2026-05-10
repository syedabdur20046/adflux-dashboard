import { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { DollarSign, Target, Zap, BarChart2 } from 'lucide-react';

const platformColors = { Instagram: '#ec4899', Google: '#3b82f6', Facebook: '#a855f7', TikTok: '#06b6d4', Multi: '#f59e0b' };

export default function AdsManagerPage() {
  const { campaigns } = useApp();
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const platforms = ['All', 'Instagram', 'Google', 'Facebook', 'TikTok'];
  const totalBudget = campaigns.reduce((a, c) => a + c.budget, 0);
  const totalSpent = campaigns.reduce((a, c) => a + c.spent, 0);
  const avgRoas = (campaigns.reduce((a, c) => a + c.roas, 0) / campaigns.length).toFixed(1);
  const filtered = selectedPlatform === 'All' ? campaigns : campaigns.filter(c => c.platform === selectedPlatform);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>Ads Manager</h1>
        <p className="text-gray-500 text-sm">Manage budgets, bids and ad sets</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { icon: DollarSign, label: 'Total Budget', value: `$${(totalBudget/1000).toFixed(1)}K`, color: '#a855f7' },
          { icon: Target, label: 'Total Spent', value: `$${(totalSpent/1000).toFixed(1)}K`, color: '#3b82f6' },
          { icon: Zap, label: 'Avg ROAS', value: `${avgRoas}x`, color: '#06b6d4' },
          { icon: BarChart2, label: 'Active Ads', value: campaigns.filter(c => c.status === 'active').length, color: '#ec4899' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="rounded-2xl p-4 relative overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }} />
            <s.icon size={16} style={{ color: s.color }} className="mb-2" />
            <p className="text-xs text-gray-500 mb-0.5">{s.label}</p>
            <p className="text-2xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>{s.value}</p>
          </motion.div>
        ))}
      </div>
      <div className="flex gap-1 p-1 rounded-xl mb-5 w-fit" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        {platforms.map(p => (
          <button key={p} onClick={() => setSelectedPlatform(p)}
            className="px-3 py-1.5 rounded-lg text-xs transition-all"
            style={{ background: selectedPlatform === p ? 'rgba(168,85,247,0.2)' : 'transparent', color: selectedPlatform === p ? '#c084fc' : '#6b7280', border: selectedPlatform === p ? '1px solid rgba(168,85,247,0.3)' : '1px solid transparent' }}>{p}</button>
        ))}
      </div>
      <div className="space-y-3">
        {filtered.map((c, i) => {
          const pc = platformColors[c.platform];
          const remaining = c.budget - c.spent;
          return (
            <motion.div key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
              className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <p className="text-sm font-semibold text-white">{c.name}</p>
                  <span className="text-xs px-2 py-0.5 rounded-full font-mono mt-1 inline-block" style={{ background: `${pc}18`, color: pc }}>{c.platform}</span>
                </div>
                <div className="flex gap-4 text-center">
                  {[{ label: 'Budget', val: `$${(c.budget/1000).toFixed(1)}K` }, { label: 'Spent', val: `$${(c.spent/1000).toFixed(1)}K` }, { label: 'Left', val: `$${(remaining/1000).toFixed(1)}K` }, { label: 'ROAS', val: `${c.roas}x` }].map(m => (
                    <div key={m.label}>
                      <p className="text-xs text-gray-500">{m.label}</p>
                      <p className="text-sm font-semibold text-white">{m.val}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${c.progress}%` }} transition={{ delay: 0.3 + i * 0.05, duration: 0.8 }}
                  className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${pc}, ${pc}88)` }} />
              </div>
              <p className="text-xs text-gray-600 mt-1">{c.progress}% of budget utilised · {c.conversions?.toLocaleString()} conversions · {(c.impressions/1000).toFixed(0)}K impressions</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
