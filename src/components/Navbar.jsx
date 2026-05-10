import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, Menu, Sun, Moon, Download, Bot, ChevronDown, X, Check } from 'lucide-react';
import { navItems } from './Sidebar';

export default function Navbar({ sidebarOpen, setSidebarOpen, darkMode, setDarkMode, setActivePage, onExport, onAIChat, searchQuery, setSearchQuery }) {
  const [showNotif, setShowNotif] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'TikTok campaign hit 6x ROAS!', time: '2m ago', dot: '#06b6d4', read: false },
    { id: 2, text: 'Budget alert: Instagram 90% spent', time: '18m ago', dot: '#f59e0b', read: false },
    { id: 3, text: 'New AI insight available', time: '1h ago', dot: '#a855f7', read: false },
    { id: 4, text: 'Report ready: May Campaign Summary', time: '2h ago', dot: '#4ade80', read: true },
  ]);
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);
  const unread = notifications.filter(n => !n.read).length;

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const dismiss = (id) => setNotifications(prev => prev.filter(n => n.id !== id));

  const searchResults = searchQuery.length > 1
    ? navItems.filter(n => n.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  useEffect(() => {
    if (showSearch && searchRef.current) searchRef.current.focus();
  }, [showSearch]);

  return (
    <header className="fixed top-0 right-0 z-10 flex items-center gap-2 px-3 py-2.5 transition-all duration-300"
      style={{ left: 0, background: 'rgba(3,7,18,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>

      <motion.button whileTap={{ scale: 0.9 }} onClick={() => setSidebarOpen(!sidebarOpen)}
        className="p-2 rounded-lg text-gray-400 hover:text-white transition-colors flex-shrink-0"
        style={{ background: 'rgba(255,255,255,0.05)' }}>
        <Menu size={18} />
      </motion.button>

      {/* Search */}
      <div className="flex-1 max-w-md relative">
        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        <input ref={searchRef} value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search pages, campaigns..."
          className="w-full pl-8 pr-4 py-1.5 rounded-xl text-sm text-gray-300 placeholder-gray-600 outline-none transition-all"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', fontFamily: 'DM Sans, sans-serif' }}
          onFocus={e => e.target.style.borderColor = 'rgba(168,85,247,0.4)'}
          onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.07)'; setTimeout(() => setSearchQuery(''), 200); }} />
        <AnimatePresence>
          {searchResults.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
              className="absolute top-full mt-1 left-0 right-0 rounded-xl overflow-hidden z-50"
              style={{ background: 'rgba(10,16,40,0.97)', border: '1px solid rgba(168,85,247,0.2)', backdropFilter: 'blur(20px)' }}>
              {searchResults.map(r => (
                <button key={r.id} onMouseDown={() => setActivePage(r.id)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 text-left transition-colors">
                  <r.icon size={14} className="text-purple-400" />
                  <span className="text-sm text-gray-200" style={{ fontFamily: 'DM Sans, sans-serif' }}>{r.label}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Live */}
      <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
        style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.2)' }}>
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-xs text-cyan-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>LIVE</span>
      </div>

      {/* Export */}
      <motion.button whileTap={{ scale: 0.95 }} onClick={onExport}
        className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm text-purple-300 transition-all hover:bg-purple-500/20"
        style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.2)' }}>
        <Download size={13} />
        <span className="text-xs" style={{ fontFamily: 'DM Sans, sans-serif' }}>Export</span>
      </motion.button>

      {/* Notifications */}
      <div className="relative">
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => setShowNotif(!showNotif)}
          className="relative p-2 rounded-xl text-gray-400 hover:text-white transition-colors"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <Bell size={15} />
          {unread > 0 && (
            <div className="absolute top-1 right-1 w-4 h-4 rounded-full text-[9px] flex items-center justify-center text-white font-bold"
              style={{ background: '#a855f7' }}>{unread}</div>
          )}
        </motion.button>
        <AnimatePresence>
          {showNotif && (
            <motion.div initial={{ opacity: 0, y: 8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.96 }}
              className="absolute right-0 top-full mt-2 w-76 rounded-2xl z-50 overflow-hidden"
              style={{ width: 300, background: 'rgba(10,16,40,0.97)', border: '1px solid rgba(168,85,247,0.2)', backdropFilter: 'blur(20px)' }}>
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                <span className="text-xs text-gray-400 font-mono" style={{ fontFamily: 'JetBrains Mono, monospace' }}>NOTIFICATIONS</span>
                <button onClick={markAllRead} className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1">
                  <Check size={11} /> Mark all read
                </button>
              </div>
              {notifications.map(n => (
                <div key={n.id} className="flex items-start gap-3 px-4 py-3 hover:bg-white/5 cursor-pointer border-b border-white/5 group transition-colors">
                  <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: n.read ? '#374151' : n.dot }} />
                  <div className="flex-1">
                    <p className={`text-sm ${n.read ? 'text-gray-500' : 'text-gray-200'}`} style={{ fontFamily: 'DM Sans, sans-serif' }}>{n.text}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{n.time}</p>
                  </div>
                  <button onClick={() => dismiss(n.id)} className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-gray-400 transition-all">
                    <X size={12} />
                  </button>
                </div>
              ))}
              {notifications.length === 0 && (
                <div className="px-4 py-6 text-center text-gray-600 text-sm">All caught up!</div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Theme toggle */}
      <motion.button whileTap={{ scale: 0.9 }} onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded-xl text-gray-400 hover:text-white transition-colors"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
        {darkMode ? <Sun size={15} /> : <Moon size={15} />}
      </motion.button>

      {/* Profile */}
      <motion.button whileTap={{ scale: 0.97 }} onClick={() => setActivePage('settings')}
        className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-xl transition-all hover:bg-white/5"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white"
          style={{ background: 'linear-gradient(135deg, #a855f7, #3b82f6)' }}>A</div>
        <span className="text-sm text-gray-300 hidden sm:block" style={{ fontFamily: 'DM Sans, sans-serif' }}>Arjun</span>
        <ChevronDown size={11} className="text-gray-500" />
      </motion.button>
    </header>
  );
}
