import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import KPICard from './components/KPICard';
import RevenueChart from './components/RevenueChart';
import TrafficChart from './components/TrafficChart';
import CampaignPerformance from './components/CampaignPerformance';
import CampaignTable from './components/CampaignTable';
import EngagementChart from './components/EngagementChart';
import AIInsights from './components/AIInsights';
import ActivityFeed from './components/ActivityFeed';
import CampaignsPage from './pages/CampaignsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SocialPage from './pages/SocialPage';
import AdsPage from './pages/AdsPage';
import AIInsightsPage from './pages/AIInsightsPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import { kpis } from './data/mockData';
import { Bot, Calendar, X, Send, Download, CheckCircle } from 'lucide-react';
import { useState as useS } from 'react';

const dateRanges = ['Today', 'Last 7d', 'Last 30d', 'Last 90d', 'Custom'];

function ExportModal({ onClose }) {
  const [exporting, setExporting] = useState(false);
  const [done, setDone] = useState(false);
  const [format, setFormat] = useState('PDF');

  const doExport = () => {
    setExporting(true);
    setTimeout(() => { setExporting(false); setDone(true); }, 1800);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}>
      <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
        className="rounded-2xl p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}
        style={{ background: 'rgba(10,16,40,0.98)', border: '1px solid rgba(168,85,247,0.25)', backdropFilter: 'blur(20px)' }}>
        <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl" style={{ background: 'linear-gradient(90deg,transparent,#a855f7,#3b82f6,transparent)' }} />
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-white font-semibold" style={{ fontFamily: 'Syne, sans-serif' }}>Export Analytics</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-white"><X size={16} /></button>
        </div>
        {done ? (
          <div className="text-center py-4">
            <CheckCircle size={40} className="text-green-400 mx-auto mb-3" />
            <p className="text-white font-medium" style={{ fontFamily: 'Syne, sans-serif' }}>Export Complete!</p>
            <p className="text-gray-500 text-sm mt-1">Your {format} report has been downloaded.</p>
            <button onClick={onClose} className="mt-4 px-4 py-2 rounded-xl text-sm text-purple-300" style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.2)' }}>Close</button>
          </div>
        ) : (
          <>
            <p className="text-gray-400 text-sm mb-4">Choose format and export your dashboard data.</p>
            <div className="flex gap-2 mb-4">
              {['PDF', 'Excel', 'CSV'].map(f => (
                <button key={f} onClick={() => setFormat(f)}
                  className="flex-1 py-2 rounded-xl text-sm transition-all"
                  style={{
                    background: format === f ? 'linear-gradient(135deg,rgba(168,85,247,0.3),rgba(59,130,246,0.2))' : 'rgba(255,255,255,0.04)',
                    color: format === f ? '#c084fc' : '#6b7280',
                    border: format === f ? '1px solid rgba(168,85,247,0.3)' : '1px solid rgba(255,255,255,0.07)',
                    fontFamily: 'JetBrains Mono, monospace',
                  }}>
                  {f}
                </button>
              ))}
            </div>
            <div className="space-y-2 mb-5">
              {['Revenue Analytics', 'Campaign Performance', 'Traffic Sources', 'KPI Summary'].map(s => (
                <label key={s} className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded" style={{ accentColor: '#a855f7' }} />
                  <span className="text-sm text-gray-300" style={{ fontFamily: 'DM Sans, sans-serif' }}>{s}</span>
                </label>
              ))}
            </div>
            <motion.button whileTap={{ scale: 0.95 }} onClick={doExport} disabled={exporting}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm text-white font-medium"
              style={{ background: exporting ? 'rgba(168,85,247,0.4)' : 'linear-gradient(135deg,#a855f7,#3b82f6)' }}>
              {exporting ? (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                  <Download size={14} />
                </motion.div>
              ) : <Download size={14} />}
              {exporting ? 'Exporting...' : `Export as ${format}`}
            </motion.button>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

function ChatModal({ onClose }) {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hi! I\'m AdFlux AI. Ask me about your campaigns, ROAS, budget, or any marketing questions!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const aiResponses = {
    'roas': 'Your average ROAS is 4.72x. TikTok leads at 6.8x! I recommend shifting more budget there.',
    'campaign': 'You have 5 campaigns: 3 active, 1 paused, 1 completed. "TikTok Viral Push" is top performer.',
    'budget': 'Total budget: $67K. You\'ve spent $45K (67%). Instagram is 90% spent — consider a top-up.',
    'instagram': 'Instagram is performing well! CTR up 24%. Your 22–30 age group converts best there.',
    'tiktok': 'TikTok is your star — 6.8x ROAS, 8.2% engagement rate. Scale it up!',
    'revenue': 'Total ad revenue: $1.28M this year, up 18.4% vs last year. December is your peak month.',
    'help': 'I can help with: campaign analysis, budget advice, ROAS optimization, audience targeting, and platform comparisons. What would you like to know?',
    'default': 'Great question! Based on your current data, your top priority should be scaling TikTok and maintaining Instagram performance. Conversion rate at 6.84% is excellent!',
  };

  const send = () => {
    if (!input.trim()) return;
    const msg = input;
    setMessages(prev => [...prev, { role: 'user', text: msg }]);
    setInput('');
    setLoading(true);
    setTimeout(() => {
      const key = Object.keys(aiResponses).find(k => msg.toLowerCase().includes(k)) || 'default';
      setMessages(prev => [...prev, { role: 'ai', text: aiResponses[key] }]);
      setLoading(false);
    }, 900);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end p-0 sm:p-6"
      style={{ pointerEvents: 'none' }}>
      <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
        className="w-full sm:w-96 rounded-t-3xl sm:rounded-2xl overflow-hidden flex flex-col"
        style={{ height: 480, background: 'rgba(10,16,40,0.98)', border: '1px solid rgba(168,85,247,0.25)', backdropFilter: 'blur(20px)', pointerEvents: 'all' }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,#a855f7,#3b82f6,transparent)' }} />
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#a855f7,#3b82f6)' }}>
              <Bot size={14} className="text-white" />
            </div>
            <div>
              <p className="text-white text-sm font-medium" style={{ fontFamily: 'Syne, sans-serif' }}>AdFlux AI</p>
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 rounded-full bg-green-400" />
                <span className="text-xs text-gray-500">Online</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white"><X size={16} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className="max-w-[85%] px-3 py-2 rounded-2xl text-sm" style={{
                background: m.role === 'user' ? 'linear-gradient(135deg,rgba(168,85,247,0.35),rgba(59,130,246,0.25))' : 'rgba(255,255,255,0.06)',
                border: m.role === 'user' ? '1px solid rgba(168,85,247,0.3)' : '1px solid rgba(255,255,255,0.07)',
                color: '#e5e7eb', fontFamily: 'DM Sans, sans-serif',
              }}>{m.text}</div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="px-4 py-3 rounded-2xl" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex gap-1.5">
                  {[0,1,2].map(i => (
                    <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-purple-400"
                      animate={{ y: [0,-4,0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="p-3 border-t border-white/5 flex gap-2">
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Ask anything..." className="flex-1 px-3 py-2 rounded-xl text-sm text-gray-300 placeholder-gray-600 outline-none"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', fontFamily: 'DM Sans, sans-serif' }} />
          <motion.button whileTap={{ scale: 0.9 }} onClick={send}
            className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#a855f7,#3b82f6)' }}>
            <Send size={14} className="text-white" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function DashboardHome({ dateRange, setDateRange }) {
  return (
    <>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 mt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
              Marketing <span style={{ background: 'linear-gradient(135deg,#a855f7,#3b82f6,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Dashboard</span>
            </h1>
            <p className="text-gray-500 text-sm mt-0.5">May 2025 — All campaigns overview</p>
          </div>
          <div className="flex gap-1 p-1 rounded-xl overflow-x-auto" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            {dateRanges.map(r => (
              <button key={r} onClick={() => setDateRange(r)}
                className="px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all duration-200 flex items-center gap-1.5"
                style={{
                  background: dateRange === r ? 'linear-gradient(135deg,rgba(168,85,247,0.3),rgba(59,130,246,0.2))' : 'transparent',
                  color: dateRange === r ? '#c084fc' : '#6b7280',
                  border: dateRange === r ? '1px solid rgba(168,85,247,0.3)' : '1px solid transparent',
                  fontFamily: 'JetBrains Mono, monospace',
                }}>
                {r === 'Custom' && <Calendar size={10} />}{r}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpis.map((kpi, i) => <KPICard key={kpi.label} kpi={kpi} index={i} />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2 relative"><RevenueChart /></div>
        <TrafficChart />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <CampaignPerformance />
        <EngagementChart />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <CampaignTable />
        <AIInsights />
        <ActivityFeed />
      </div>
    </>
  );
}

const pageComponents = {
  dashboard: null,
  campaigns: CampaignsPage,
  analytics: AnalyticsPage,
  social: SocialPage,
  ads: AdsPage,
  ai: AIInsightsPage,
  reports: ReportsPage,
  settings: SettingsPage,
};

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [dateRange, setDateRange] = useState('Last 30d');
  const [activePage, setActivePage] = useState('dashboard');
  const [showExport, setShowExport] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const PageComp = pageComponents[activePage];

  return (
    <div className="min-h-screen" style={{ background: '#030712' }}>
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-10" style={{ background: 'radial-gradient(circle,#a855f7,transparent)' }} />
        <div className="absolute top-1/3 -right-48 w-96 h-96 rounded-full blur-3xl opacity-8" style={{ background: 'radial-gradient(circle,#3b82f6,transparent)' }} />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full blur-3xl opacity-6" style={{ background: 'radial-gradient(circle,#06b6d4,transparent)' }} />
      </div>

      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} activePage={activePage} setActivePage={setActivePage} />

      <div className="relative z-10 transition-all duration-300" style={{ marginLeft: sidebarOpen ? '240px' : '72px' }}>
        <Navbar
          sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}
          darkMode={darkMode} setDarkMode={setDarkMode}
          setActivePage={setActivePage}
          onExport={() => setShowExport(true)}
          onAIChat={() => setShowChat(true)}
          searchQuery={searchQuery} setSearchQuery={setSearchQuery}
        />

        <main className="pt-20 px-4 pb-8 lg:px-6">
          <AnimatePresence mode="wait">
            <motion.div key={activePage}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.4,0,0.2,1] }}>
              {activePage === 'dashboard' ? (
                <DashboardHome dateRange={dateRange} setDateRange={setDateRange} />
              ) : PageComp ? (
                <PageComp />
              ) : null}
            </motion.div>
          </AnimatePresence>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="mt-8 pt-6 flex items-center justify-between text-xs text-gray-600"
            style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>AdFlux AI v2.4.1 — © 2025</span>
            <span>Data refreshes every 30s</span>
          </motion.div>
        </main>
      </div>

      {/* Floating AI Chat button */}
      <motion.button
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, type: 'spring' }}
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-2xl z-40"
        style={{ background: 'linear-gradient(135deg,#a855f7,#3b82f6)', boxShadow: '0 0 30px rgba(168,85,247,0.4)' }}>
        {showChat ? <X size={20} /> : <Bot size={22} />}
      </motion.button>

      <AnimatePresence>
        {showExport && <ExportModal onClose={() => setShowExport(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {showChat && <ChatModal onClose={() => setShowChat(false)} />}
      </AnimatePresence>
    </div>
  );
}
