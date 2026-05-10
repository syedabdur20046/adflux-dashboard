import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Shield, LogOut, Edit2, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function ProfileModal() {
  const { showProfile, setShowProfile, user, setUser } = useApp();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user.name, email: user.email });

  const save = () => { setUser(u => ({ ...u, ...form })); setEditing(false); };

  return (
    <AnimatePresence>
      {showProfile && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowProfile(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 rounded-2xl p-6 z-50"
            style={{ background: 'rgba(8,14,35,0.98)', border: '1px solid rgba(168,85,247,0.3)', backdropFilter: 'blur(30px)' }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>Profile</h2>
              <button onClick={() => setShowProfile(false)} className="p-1.5 rounded-lg text-gray-500 hover:text-white" style={{ background: 'rgba(255,255,255,0.05)' }}><X size={14} /></button>
            </div>
            <div className="flex flex-col items-center mb-5">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white mb-2"
                style={{ background: 'linear-gradient(135deg, #a855f7, #3b82f6)' }}>{user.name[0]}</div>
              <span className="text-xs px-2 py-0.5 rounded-full text-purple-300" style={{ background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.3)' }}>{user.plan} Plan</span>
            </div>
            <div className="space-y-3 mb-5">
              {editing ? (
                <>
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Name</label>
                    <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl text-sm text-gray-200 outline-none"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(168,85,247,0.3)' }} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Email</label>
                    <input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl text-sm text-gray-200 outline-none"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(168,85,247,0.3)' }} />
                  </div>
                  <button onClick={save} className="w-full py-2 rounded-xl text-sm text-white flex items-center justify-center gap-2"
                    style={{ background: 'linear-gradient(135deg, #a855f7, #3b82f6)' }}><Check size={13} /> Save Changes</button>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <User size={15} className="text-purple-400" />
                    <div><p className="text-xs text-gray-500">Name</p><p className="text-sm text-white">{user.name}</p></div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <Mail size={15} className="text-blue-400" />
                    <div><p className="text-xs text-gray-500">Email</p><p className="text-sm text-white">{user.email}</p></div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <Shield size={15} className="text-cyan-400" />
                    <div><p className="text-xs text-gray-500">Plan</p><p className="text-sm text-white">{user.plan}</p></div>
                  </div>
                  <button onClick={() => setEditing(true)}
                    className="w-full py-2 rounded-xl text-sm text-purple-300 flex items-center justify-center gap-2"
                    style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.2)' }}>
                    <Edit2 size={13} /> Edit Profile
                  </button>
                </>
              )}
            </div>
            <button onClick={() => setShowProfile(false)}
              className="w-full py-2 rounded-xl text-sm text-red-400 flex items-center justify-center gap-2"
              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)' }}>
              <LogOut size={13} /> Sign Out
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
