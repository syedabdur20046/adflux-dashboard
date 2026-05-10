import { motion } from 'framer-motion';
import { Plus, Play, Pause, Trash2, Eye, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { campaigns } from '../data/mockData';

const platformColors = { Instagram: '#ec4899', Google: '#3b82f6', Facebook: '#a855f7', TikTok: '#06b6d4', Multi: '#f59e0b' };
const statusStyles = {
  active: { bg: 'rgba(34,197,94,0.1)', text: '#4ade80', dot: '#4ade80' },
  completed: { bg: 'rgba(59,130,246,0.1)', text: '#60a5fa', dot: '#60a5fa' },
  paused: { bg: 'rgba(245,158,11,0.1)', text: '#fbbf24', dot: '#fbbf24' },
};

const GlassCard = ({ children, style = {}, className = '' }) => (
  <div className={`rounded-2xl p-5 relative ${className}`}
    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)', ...style }}>
    {children}
  </div>
);

export default function CampaignsPage() {
  const [data, setData] = useState(campaigns);
  const [showNew, setShowNew] = useState(false);
  const [newCampaign, setNewCampaign] = useState({ name: '', platform: 'Instagram', budget: '', status: 'active' });
  const [filter, setFilter] = useState('all');

  const toggleStatus = (i) => {
    setData(prev => prev.map((c, idx) => idx === i
      ? { ...c, status: c.status === 'active' ? 'paused' : c.status === 'paused' ? 'active' : c.status }
      : c));
  };
  const remove = (i) => setData(prev => prev.filter((_, idx) => idx !== i));

  const addCampaign = () => {
    if (!newCampaign.name || !newCampaign.budget) return;
    setData(prev => [...prev, { ...newCampaign, budget: +newCampaign.budget, spent: 0, roas: 0, progress: 0 }]);
    setShowNew(false);
    setNewCampaign({ name: '', platform: 'Instagram', budget: '', status: 'active' });
  };

  const filtered = filter === 'all' ? data : data.filter(c => c.status === filter);
  const totalBudget = data.reduce((a, c) => a + c.budget, 0);
  const totalSpent = data.reduce((a, c) => a + c.spent, 0);
  const avgRoas = data.length ? (data.reduce((a, c) => a + c.roas, 0) / data.length).toFixed(1) : 0;

  const inputStyle = { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '8px 12px', color: '#e5e7eb', fontFamily: 'DM Sans, sans-serif', fontSize: 13, outline: 'none', width: '100%' };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
            Campaigns <span style={{ background: 'linear-gradient(135deg,#a855f7,#3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Manager</span>
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">{data.length} campaigns — {data.filter(c => c.status === 'active').length} active</p>
        </div>
        <motion.button whileTap={{ scale: 0.95 }} onClick={() => setShowNew(!showNew)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-white font-medium"
          style={{ background: 'linear-gradient(135deg, #a855f7, #3b82f6)' }}>
          <Plus size={16} /> New Campaign
        </motion.button>
      </div>

      {showNew && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-5 mb-6" style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.25)', backdropFilter: 'blur(20px)' }}>
          <h3 className="text-white font-semibold mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>Create New Campaign</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            {[
              { label: 'Campaign Name', key: 'name', type: 'text', placeholder: 'e.g. Summer Sale 2025' },
              { label: 'Budget ($)', key: 'budget', type: 'number', placeholder: '10000' },
            ].map(f => (
              <div key={f.key}>
                <label className="text-xs text-gray-500 mb-1 block" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{f.label}</label>
                <input type={f.type} placeholder={f.placeholder} value={newCampaign[f.key]}
                  onChange={e => setNewCampaign(p => ({ ...p, [f.key]: e.target.value }))}
                  style={inputStyle} />
              </div>
            ))}
            <div>
              <label className="text-xs text-gray-500 mb-1 block" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Platform</label>
              <select value={newCampaign.platform} onChange={e => setNewCampaign(p => ({ ...p, platform: e.target.value }))} style={inputStyle}>
                {['Instagram', 'Google', 'Facebook', 'TikTok', 'Multi'].map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Status</label>
              <select value={newCampaign.status} onChange={e => setNewCampaign(p => ({ ...p, status: e.target.value }))} style={inputStyle}>
                {['active', 'paused'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <motion.button whileTap={{ scale: 0.95 }} onClick={addCampaign}
              className="px-4 py-2 rounded-xl text-sm text-white font-medium" style={{ background: 'linear-gradient(135deg,#a855f7,#3b82f6)' }}>
              Create Campaign
            </motion.button>
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => setShowNew(false)}
              className="px-4 py-2 rounded-xl text-sm text-gray-400" style={{ background: 'rgba(255,255,255,0.05)' }}>
              Cancel
            </motion.button>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Budget', value: `$${(totalBudget/1000).toFixed(0)}K`, color: '#a855f7' },
          { label: 'Total Spent', value: `$${(totalSpent/1000).toFixed(0)}K`, color: '#06b6d4' },
          { label: 'Avg ROAS', value: `${avgRoas}x`, color: '#ec4899' },
        ].map((s, i) => (
          <GlassCard key={i}>
            <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl" style={{ background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }} />
            <p className="text-xs text-gray-500 mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{s.label}</p>
            <p className="text-2xl font-bold" style={{ color: s.color, fontFamily: 'Syne, sans-serif' }}>{s.value}</p>
          </GlassCard>
        ))}
      </div>

      <div className="flex gap-2 mb-4">
        {['all', 'active', 'paused', 'completed'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className="px-3 py-1.5 rounded-lg text-xs capitalize transition-all"
            style={{
              background: filter === f ? 'linear-gradient(135deg,rgba(168,85,247,0.3),rgba(59,130,246,0.2))' : 'rgba(255,255,255,0.04)',
              color: filter === f ? '#c084fc' : '#6b7280',
              border: filter === f ? '1px solid rgba(168,85,247,0.3)' : '1px solid rgba(255,255,255,0.06)',
              fontFamily: 'JetBrains Mono, monospace',
            }}>
            {f} {filter === f ? `(${filtered.length})` : ''}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((c, i) => {
          const ss = statusStyles[c.status] || statusStyles.active;
          const pc = platformColors[c.platform] || '#888';
          return (
            <motion.div key={c.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{ background: pc }} />
                  <span className="text-sm text-white font-medium" style={{ fontFamily: 'DM Sans, sans-serif' }}>{c.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1" style={{ background: ss.bg, color: ss.text }}>
                    <div className="w-1 h-1 rounded-full" style={{ background: ss.dot }} />{c.status}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-mono hidden sm:block" style={{ color: pc }}>{c.platform}</span>
                  <span className="text-xs text-gray-400 hidden sm:block">ROAS: <span className="text-white">{c.roas}x</span></span>
                  <motion.button whileTap={{ scale: 0.9 }} onClick={() => toggleStatus(i)}
                    className="p-1.5 rounded-lg text-gray-500 hover:text-white transition-colors" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    {c.status === 'active' ? <Pause size={13} /> : <Play size={13} />}
                  </motion.button>
                  <motion.button whileTap={{ scale: 0.9 }} onClick={() => remove(i)}
                    className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 transition-colors" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <Trash2 size={13} />
                  </motion.button>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                <span>Budget: <span className="text-gray-300">${c.budget.toLocaleString()}</span></span>
                <span>Spent: <span className="text-gray-300">${c.spent.toLocaleString()}</span></span>
                <span>Progress: <span style={{ color: pc }}>{c.progress}%</span></span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${c.progress}%` }} transition={{ duration: 0.8 }}
                  className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${pc}, ${pc}88)` }} />
              </div>
            </motion.div>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-600">No campaigns found for this filter.</div>
        )}
      </div>
    </div>
  );
}
