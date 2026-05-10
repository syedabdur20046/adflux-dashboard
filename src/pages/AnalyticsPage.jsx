import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { analyticsData } from '../data/mockData';
import { useState } from 'react';

const GlassCard = ({ children, style = {}, className = '' }) => (
  <div className={`rounded-2xl p-5 relative ${className}`}
    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)', ...style }}>
    {children}
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl p-3" style={{ background: 'rgba(10,16,40,0.95)', border: '1px solid rgba(168,85,247,0.3)', backdropFilter: 'blur(20px)' }}>
      <p className="text-xs text-gray-400 mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{label}</p>
      {payload.map(p => (
        <div key={p.name} className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-gray-400 capitalize">{p.name}:</span>
          <span className="text-white font-semibold">{typeof p.value === 'number' && p.value > 100 ? p.value.toLocaleString() : p.value + '%'}</span>
        </div>
      ))}
    </div>
  );
};

export default function AnalyticsPage() {
  const [metric, setMetric] = useState('pageViews');
  const metrics = [
    { key: 'pageViews', label: 'Page Views', color: '#a855f7' },
    { key: 'sessions', label: 'Sessions', color: '#3b82f6' },
    { key: 'bounceRate', label: 'Bounce Rate', color: '#ec4899' },
  ];

  const data = analyticsData.months.map((m, i) => ({
    month: m,
    pageViews: analyticsData.pageViews[i],
    sessions: analyticsData.sessions[i],
    bounceRate: analyticsData.bounceRate[i],
  }));

  const activeMetric = metrics.find(m => m.key === metric);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
          Analytics <span style={{ background: 'linear-gradient(135deg,#a855f7,#3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Overview</span>
        </h1>
        <p className="text-gray-500 text-sm mt-0.5">Website & campaign performance — 2025</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Page Views', value: '312K', change: '+24%', color: '#a855f7' },
          { label: 'Total Sessions', value: '218K', change: '+19%', color: '#3b82f6' },
          { label: 'Avg Bounce Rate', value: '38%', change: '-22%', color: '#ec4899' },
        ].map((s, i) => (
          <GlassCard key={i}>
            <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl" style={{ background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }} />
            <p className="text-xs text-gray-500 mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{s.label}</p>
            <p className="text-2xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>{s.value}</p>
            <p className="text-xs mt-1" style={{ color: s.change.startsWith('+') ? '#4ade80' : '#f87171' }}>{s.change} vs last year</p>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="mb-6">
        <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl" style={{ background: `linear-gradient(90deg, transparent, ${activeMetric.color}, transparent)` }} />
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-white font-semibold" style={{ fontFamily: 'Syne, sans-serif' }}>Traffic Trends</h3>
          <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
            {metrics.map(m => (
              <button key={m.key} onClick={() => setMetric(m.key)}
                className="px-3 py-1.5 rounded-lg text-xs transition-all"
                style={{
                  background: metric === m.key ? `${m.color}25` : 'transparent',
                  color: metric === m.key ? m.color : '#6b7280',
                  border: metric === m.key ? `1px solid ${m.color}40` : '1px solid transparent',
                  fontFamily: 'JetBrains Mono, monospace',
                }}>
                {m.label}
              </button>
            ))}
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={activeMetric.color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={activeMetric.color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey={metric} stroke={activeMetric.color} strokeWidth={2} fill="url(#aGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <GlassCard>
          <h3 className="text-white font-semibold mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>Top Pages</h3>
          <div className="space-y-3">
            {[
              { page: '/landing', views: '48,200', pct: 85 },
              { page: '/products', views: '31,500', pct: 62 },
              { page: '/pricing', views: '24,800', pct: 48 },
              { page: '/blog', views: '18,200', pct: 35 },
              { page: '/about', views: '12,100', pct: 22 },
            ].map((p, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300 font-mono" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{p.page}</span>
                  <span className="text-gray-500">{p.views}</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${p.pct}%` }} transition={{ delay: i * 0.1, duration: 0.8 }}
                    className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, #a855f7, #3b82f6)' }} />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="text-white font-semibold mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>Device Breakdown</h3>
          <div className="space-y-4">
            {[
              { device: 'Mobile', pct: 58, color: '#a855f7' },
              { device: 'Desktop', pct: 32, color: '#3b82f6' },
              { device: 'Tablet', pct: 10, color: '#06b6d4' },
            ].map((d, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-gray-300">{d.device}</span>
                  <span style={{ color: d.color, fontFamily: 'JetBrains Mono, monospace' }}>{d.pct}%</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${d.pct}%` }} transition={{ delay: i * 0.15, duration: 0.9 }}
                    className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${d.color}, ${d.color}88)` }} />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
