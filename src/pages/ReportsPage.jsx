import { motion } from 'framer-motion';
import { reportsData } from '../data/mockData';
import { Download, FileText, RefreshCw, CheckCircle, Clock } from 'lucide-react';
import { useState } from 'react';

const GlassCard = ({ children, style = {}, className = '' }) => (
  <div className={`rounded-2xl p-5 relative ${className}`}
    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)', ...style }}>
    {children}
  </div>
);

export default function ReportsPage() {
  const [reports, setReports] = useState(reportsData);
  const [generating, setGenerating] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const generate = () => {
    setGenerating(true);
    setTimeout(() => {
      const newReport = { name: `Custom Report — ${new Date().toLocaleDateString()}`, date: new Date().toISOString().split('T')[0], size: '1.2 MB', type: 'PDF', status: 'ready' };
      setReports(prev => [newReport, ...prev]);
      setGenerating(false);
      showToast('Report generated successfully!');
    }, 2000);
  };

  const download = (r) => showToast(`Downloading "${r.name}"...`);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
            Reports & <span style={{ background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Exports</span>
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">{reports.length} reports available</p>
        </div>
        <motion.button whileTap={{ scale: 0.95 }} onClick={generate} disabled={generating}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-white font-medium"
          style={{ background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', opacity: generating ? 0.7 : 1 }}>
          {generating ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}><RefreshCw size={14} /></motion.div> : <FileText size={14} />}
          {generating ? 'Generating...' : 'Generate Report'}
        </motion.button>
      </div>

      {toast && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          className="mb-4 px-4 py-3 rounded-xl flex items-center gap-2 text-sm text-green-300"
          style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)' }}>
          <CheckCircle size={14} className="text-green-400" /> {toast}
        </motion.div>
      )}

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Reports', value: reports.length, color: '#3b82f6' },
          { label: 'Ready', value: reports.filter(r => r.status === 'ready').length, color: '#4ade80' },
          { label: 'Processing', value: reports.filter(r => r.status === 'processing').length, color: '#fbbf24' },
        ].map((s, i) => (
          <GlassCard key={i}>
            <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl" style={{ background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }} />
            <p className="text-xs text-gray-500 mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{s.label}</p>
            <p className="text-2xl font-bold" style={{ color: s.color, fontFamily: 'Syne, sans-serif' }}>{s.value}</p>
          </GlassCard>
        ))}
      </div>

      <GlassCard>
        <h3 className="text-white font-semibold mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>All Reports</h3>
        <div className="space-y-3">
          {reports.map((r, i) => (
            <motion.div key={r.name + i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="flex items-center gap-4 p-3 rounded-xl transition-all"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: r.type === 'PDF' ? 'rgba(239,68,68,0.1)' : 'rgba(34,197,94,0.1)', border: `1px solid ${r.type === 'PDF' ? 'rgba(239,68,68,0.2)' : 'rgba(34,197,94,0.2)'}` }}>
                <FileText size={16} style={{ color: r.type === 'PDF' ? '#f87171' : '#4ade80' }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white font-medium truncate" style={{ fontFamily: 'DM Sans, sans-serif' }}>{r.name}</p>
                <div className="flex gap-3 text-xs text-gray-500 mt-0.5">
                  <span>{r.date}</span>
                  <span>{r.size}</span>
                  <span className="font-mono">{r.type}</span>
                </div>
              </div>
              {r.status === 'processing' ? (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs" style={{ background: 'rgba(251,191,36,0.1)', color: '#fbbf24' }}>
                  <Clock size={11} /> Processing
                </div>
              ) : (
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => download(r)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs text-blue-300 transition-all hover:bg-blue-500/20"
                  style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}>
                  <Download size={12} /> Download
                </motion.button>
              )}
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
