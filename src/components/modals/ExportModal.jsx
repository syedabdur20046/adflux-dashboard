import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText, Table, Image, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const formats = [
  { id: 'pdf', icon: FileText, label: 'PDF Report', desc: 'Full dashboard as PDF', color: '#ec4899' },
  { id: 'csv', icon: Table, label: 'CSV Data', desc: 'Raw campaign data', color: '#3b82f6' },
  { id: 'png', icon: Image, label: 'PNG Screenshot', desc: 'Dashboard image', color: '#06b6d4' },
];

export default function ExportModal() {
  const { showExportModal, setShowExportModal } = useApp();
  const [selected, setSelected] = useState('pdf');
  const [exporting, setExporting] = useState(false);
  const [done, setDone] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    await new Promise(r => setTimeout(r, 2000));
    setExporting(false);
    setDone(true);
    await new Promise(r => setTimeout(r, 1500));
    setDone(false);
    setShowExportModal(false);
  };

  return (
    <AnimatePresence>
      {showExportModal && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowExportModal(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 rounded-2xl p-6 z-50"
            style={{ background: 'rgba(8,14,35,0.98)', border: '1px solid rgba(168,85,247,0.3)', backdropFilter: 'blur(30px)' }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white font-bold text-lg" style={{ fontFamily: 'Syne, sans-serif' }}>Export Analytics</h2>
              <button onClick={() => setShowExportModal(false)} className="p-1.5 rounded-lg text-gray-500 hover:text-white" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <X size={15} />
              </button>
            </div>
            <div className="space-y-2 mb-6">
              {formats.map(f => (
                <button key={f.id} onClick={() => setSelected(f.id)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all"
                  style={{
                    background: selected === f.id ? `${f.color}15` : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${selected === f.id ? `${f.color}40` : 'rgba(255,255,255,0.07)'}`,
                  }}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${f.color}20` }}>
                    <f.icon size={16} style={{ color: f.color }} />
                  </div>
                  <div>
                    <p className="text-sm text-white font-medium">{f.label}</p>
                    <p className="text-xs text-gray-500">{f.desc}</p>
                  </div>
                  {selected === f.id && <div className="ml-auto w-4 h-4 rounded-full flex items-center justify-center" style={{ background: f.color }}>
                    <Check size={10} className="text-white" />
                  </div>}
                </button>
              ))}
            </div>
            <motion.button whileTap={{ scale: 0.97 }} onClick={handleExport}
              className="w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2"
              style={{ background: done ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'linear-gradient(135deg, #a855f7, #3b82f6)' }}>
              {exporting ? (
                <><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}><Download size={16} /></motion.div> Exporting...</>
              ) : done ? (
                <><Check size={16} /> Exported!</>
              ) : (
                <><Download size={16} /> Export Now</>
              )}
            </motion.button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
