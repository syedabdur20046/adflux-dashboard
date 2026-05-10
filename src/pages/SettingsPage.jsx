import { motion } from 'framer-motion';
import { useState } from 'react';
import { User, Bell, Shield, Palette, Globe, CreditCard, Save, CheckCircle } from 'lucide-react';

const GlassCard = ({ children, style = {}, className = '', title, icon: Icon, color = '#a855f7' }) => (
  <div className={`rounded-2xl p-5 relative ${className}`}
    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)', ...style }}>
    <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
    {title && (
      <div className="flex items-center gap-2 mb-4">
        {Icon && <Icon size={16} style={{ color }} />}
        <h3 className="text-white font-semibold" style={{ fontFamily: 'Syne, sans-serif' }}>{title}</h3>
      </div>
    )}
    {children}
  </div>
);

const Toggle = ({ value, onChange, label }) => (
  <div className="flex items-center justify-between py-2">
    <span className="text-sm text-gray-300" style={{ fontFamily: 'DM Sans, sans-serif' }}>{label}</span>
    <button onClick={() => onChange(!value)}
      className="relative w-11 h-6 rounded-full transition-all duration-300 flex-shrink-0"
      style={{ background: value ? 'linear-gradient(135deg,#a855f7,#3b82f6)' : 'rgba(255,255,255,0.1)' }}>
      <motion.div animate={{ x: value ? 20 : 2 }} transition={{ duration: 0.2 }}
        className="absolute top-1 w-4 h-4 rounded-full bg-white" />
    </button>
  </div>
);

const inputStyle = { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '10px 14px', color: '#e5e7eb', fontFamily: 'DM Sans, sans-serif', fontSize: 13, outline: 'none', width: '100%' };

export default function SettingsPage() {
  const [profile, setProfile] = useState({ name: 'Arjun', email: 'arjun@company.com', company: 'AdFlux Inc.', role: 'Marketing Manager' });
  const [notifs, setNotifs] = useState({ email: true, push: true, slack: false, weekly: true, alerts: true });
  const [theme, setTheme] = useState({ darkMode: true, compactView: false, animations: true, sidebarOpen: true });
  const [saved, setSaved] = useState(false);

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
            Account <span style={{ background: 'linear-gradient(135deg,#a855f7,#ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Settings</span>
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">Manage your account and preferences</p>
        </div>
        <motion.button whileTap={{ scale: 0.95 }} onClick={save}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-white font-medium"
          style={{ background: saved ? 'linear-gradient(135deg,#22c55e,#16a34a)' : 'linear-gradient(135deg,#a855f7,#3b82f6)' }}>
          {saved ? <><CheckCircle size={14} /> Saved!</> : <><Save size={14} /> Save Changes</>}
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <GlassCard title="Profile" icon={User} color="#a855f7">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white flex-shrink-0"
              style={{ background: 'linear-gradient(135deg,#a855f7,#3b82f6)' }}>
              {profile.name[0]}
            </div>
            <div>
              <p className="text-white font-semibold" style={{ fontFamily: 'Syne, sans-serif' }}>{profile.name}</p>
              <p className="text-xs text-gray-500">{profile.role}</p>
              <button className="text-xs text-purple-400 mt-1 hover:text-purple-300">Change avatar</button>
            </div>
          </div>
          <div className="space-y-3">
            {Object.entries(profile).map(([k, v]) => (
              <div key={k}>
                <label className="text-xs text-gray-500 mb-1 block capitalize" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{k}</label>
                <input value={v} onChange={e => setProfile(p => ({ ...p, [k]: e.target.value }))} style={inputStyle} />
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard title="Notifications" icon={Bell} color="#06b6d4">
          <div className="divide-y divide-white/5">
            {Object.entries(notifs).map(([k, v]) => (
              <Toggle key={k} value={v} onChange={val => setNotifs(p => ({ ...p, [k]: val }))}
                label={{ email: 'Email Notifications', push: 'Push Notifications', slack: 'Slack Alerts', weekly: 'Weekly Summary', alerts: 'Budget Alerts' }[k]} />
            ))}
          </div>
        </GlassCard>

        <GlassCard title="Appearance" icon={Palette} color="#ec4899">
          <div className="divide-y divide-white/5">
            {Object.entries(theme).map(([k, v]) => (
              <Toggle key={k} value={v} onChange={val => setTheme(p => ({ ...p, [k]: val }))}
                label={{ darkMode: 'Dark Mode', compactView: 'Compact View', animations: 'Animations', sidebarOpen: 'Sidebar Default Open' }[k]} />
            ))}
          </div>
        </GlassCard>

        <GlassCard title="Plan & Billing" icon={CreditCard} color="#f59e0b">
          <div className="p-4 rounded-xl mb-4" style={{ background: 'linear-gradient(135deg,rgba(168,85,247,0.15),rgba(59,130,246,0.1))', border: '1px solid rgba(168,85,247,0.2)' }}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-white font-semibold" style={{ fontFamily: 'Syne, sans-serif' }}>Pro Plan</span>
              <span className="text-xs px-2 py-0.5 rounded-full text-purple-300" style={{ background: 'rgba(168,85,247,0.2)' }}>Active</span>
            </div>
            <p className="text-gray-400 text-sm">$99/month · Renews June 1, 2025</p>
          </div>
          <div className="space-y-2 text-sm">
            {['Unlimited campaigns', 'AI-powered insights', 'Advanced analytics', 'Priority support'].map(f => (
              <div key={f} className="flex items-center gap-2 text-gray-400">
                <CheckCircle size={13} className="text-green-400 flex-shrink-0" />
                {f}
              </div>
            ))}
          </div>
          <motion.button whileTap={{ scale: 0.95 }} className="mt-4 w-full py-2.5 rounded-xl text-sm text-white font-medium"
            style={{ background: 'linear-gradient(135deg,#f59e0b,#f97316)' }}>
            Upgrade to Enterprise
          </motion.button>
        </GlassCard>
      </div>
    </div>
  );
}
