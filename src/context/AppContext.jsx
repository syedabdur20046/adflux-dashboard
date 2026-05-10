import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [activePage, setActivePage] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [dateRange, setDateRange] = useState('Last 30d');
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'TikTok campaign hit 6x ROAS!', time: '2m ago', dot: '#06b6d4', read: false },
    { id: 2, text: 'Budget alert: Instagram 90% spent', time: '18m ago', dot: '#f59e0b', read: false },
    { id: 3, text: 'New AI insight available', time: '1h ago', dot: '#a855f7', read: true },
  ]);
  const [showNotif, setShowNotif] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [user, setUser] = useState({ name: 'Arjun', email: 'arjun@adflux.ai', plan: 'Pro', avatar: 'A' });
  const [campaigns, setCampaigns] = useState([
    { id: 1, name: 'Summer Sale 2025', platform: 'Instagram', budget: 12000, spent: 8400, roas: 4.2, status: 'active', progress: 70, conversions: 842, impressions: 284000 },
    { id: 2, name: 'Brand Awareness Q3', platform: 'Google', budget: 18000, spent: 11200, roas: 3.8, status: 'active', progress: 62, conversions: 612, impressions: 520000 },
    { id: 3, name: 'Retargeting Pro', platform: 'Facebook', budget: 8500, spent: 8500, roas: 5.1, status: 'completed', progress: 100, conversions: 1240, impressions: 198000 },
    { id: 4, name: 'TikTok Viral Push', platform: 'TikTok', budget: 6000, spent: 2100, roas: 6.8, status: 'active', progress: 35, conversions: 389, impressions: 890000 },
    { id: 5, name: 'Email + Social Sync', platform: 'Multi', budget: 22000, spent: 14800, roas: 4.5, status: 'paused', progress: 67, conversions: 1820, impressions: 420000 },
    { id: 6, name: 'Q4 Holiday Prep', platform: 'Google', budget: 30000, spent: 4200, roas: 2.1, status: 'active', progress: 14, conversions: 210, impressions: 95000 },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const markRead = (id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));

  const addNotification = (notif) => {
    setNotifications(prev => [{ id: Date.now(), ...notif, read: false }, ...prev.slice(0, 9)]);
  };

  const updateCampaignStatus = (id, status) => {
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, status } : c));
  };

  // Simulate live notifications
  useEffect(() => {
    const msgs = [
      { text: 'Google Ads ROAS up 12% this hour', dot: '#3b82f6', time: 'just now' },
      { text: 'New conversion milestone: 5,000 total!', dot: '#4ade80', time: 'just now' },
      { text: 'TikTok budget 50% utilised', dot: '#06b6d4', time: 'just now' },
    ];
    let i = 0;
    const t = setInterval(() => {
      addNotification({ ...msgs[i % msgs.length] });
      i++;
    }, 30000);
    return () => clearInterval(t);
  }, []);

  return (
    <AppContext.Provider value={{
      activePage, setActivePage,
      sidebarOpen, setSidebarOpen,
      darkMode, setDarkMode,
      dateRange, setDateRange,
      notifications, unreadCount, markAllRead, markRead, addNotification,
      showNotif, setShowNotif,
      showAIChat, setShowAIChat,
      showExportModal, setShowExportModal,
      showProfile, setShowProfile,
      searchQuery, setSearchQuery,
      showSearch, setShowSearch,
      user, setUser,
      campaigns, setCampaigns, updateCampaignStatus,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
