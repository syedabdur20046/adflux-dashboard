import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Megaphone, BarChart3, Share2, Target, Sparkles, FileText, Settings, ChevronRight, Zap } from 'lucide-react';

export const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: Megaphone, label: 'Campaigns', id: 'campaigns' },
  { icon: BarChart3, label: 'Analytics', id: 'analytics' },
  { icon: Share2, label: 'Social Media', id: 'social' },
  { icon: Target, label: 'Ads Manager', id: 'ads' },
  { icon: Sparkles, label: 'AI Insights', id: 'ai', badge: 'NEW' },
  { icon: FileText, label: 'Reports', id: 'reports' },
  { icon: Settings, label: 'Settings', id: 'settings' },
];

export default function Sidebar({ open, setOpen, activePage, setActivePage }) {
  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 lg:hidden" />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ width: open ? 240 : 72 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="fixed left-0 top-0 h-full z-30 flex flex-col overflow-hidden"
        style={{ background: 'linear-gradient(180deg, rgba(10,16,40,0.98) 0%, rgba(6,10,25,0.98) 100%)', borderRight: '1px solid rgba(168,85,247,0.1)' }}
      >
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #a855f7, #3b82f6)' }}>
            <Zap size={18} className="text-white" />
          </div>
          <AnimatePresence>
            {open && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800 }} className="text-white text-lg">
                  Ad<span style={{ background: 'linear-gradient(135deg,#a855f7,#3b82f6,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Flux</span>
                </span>
                <span className="block text-xs text-purple-400/60" style={{ fontFamily: 'JetBrains Mono, monospace' }}>AI v2.4</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto overflow-x-hidden">
          {navItems.map(({ icon: Icon, label, id, badge }) => {
            const active = activePage === id;
            return (
              <motion.button key={id} whileHover={{ x: 2 }} whileTap={{ scale: 0.98 }}
                onClick={() => setActivePage(id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group relative"
                style={{
                  background: active ? 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(59,130,246,0.1))' : 'transparent',
                  border: active ? '1px solid rgba(168,85,247,0.25)' : '1px solid transparent',
                }}>
                {active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full" style={{ background: 'linear-gradient(180deg, #a855f7, #3b82f6)' }} />}
                <Icon size={18} className={active ? 'text-purple-400 flex-shrink-0' : 'text-gray-500 flex-shrink-0 group-hover:text-gray-300 transition-colors'} />
                <AnimatePresence>
                  {open && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className={`text-sm whitespace-nowrap flex-1 ${active ? 'text-purple-200 font-medium' : 'text-gray-400 group-hover:text-gray-200'}`}
                      style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {open && badge && (
                    <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                      className="text-[9px] font-mono px-1.5 py-0.5 rounded-full text-cyan-400"
                      style={{ background: 'rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.3)' }}>
                      {badge}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/5">
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => setOpen(!open)}
            className="w-full flex items-center justify-center h-9 rounded-xl text-gray-500 hover:text-gray-300 transition-colors"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronRight size={16} />
            </motion.div>
          </motion.button>
        </div>
      </motion.aside>
    </>
  );
}
