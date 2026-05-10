import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const baseEvents = [
  { text: 'Instagram campaign bid updated', time: 'just now', color: '#ec4899', emoji: '📸' },
  { text: 'New conversion from Google Ads', time: '30s ago', color: '#3b82f6', emoji: '✅' },
  { text: 'TikTok ad set approved', time: '2m ago', color: '#06b6d4', emoji: '🎵' },
  { text: 'Budget alert: 90% spent', time: '5m ago', color: '#f59e0b', emoji: '⚠️' },
  { text: 'A/B test concluded: variant B wins', time: '12m ago', color: '#a855f7', emoji: '🧪' },
];

export default function ActivityFeed() {
  const [events, setEvents] = useState(baseEvents);

  useEffect(() => {
    const additions = [
      { text: 'New audience segment detected', color: '#a855f7', emoji: '🎯' },
      { text: 'ROAS spike: 7.2x on TikTok', color: '#06b6d4', emoji: '🚀' },
      { text: 'Frequency cap reached on Facebook', color: '#ec4899', emoji: '🔔' },
    ];
    let idx = 0;
    const interval = setInterval(() => {
      const newEvent = { ...additions[idx % additions.length], time: 'just now' };
      setEvents(prev => [newEvent, ...prev.slice(0, 4)]);
      idx++;
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.5 }}
      className="rounded-2xl p-5 relative" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)' }}>
      <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl" style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.5), transparent)' }} />

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold" style={{ fontFamily: 'Syne, sans-serif' }}>Activity Feed</h3>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-green-400 font-mono" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Live</span>
        </div>
      </div>

      <div className="space-y-1 overflow-hidden max-h-56">
        {events.map((event, i) => (
          <motion.div key={`${event.text}-${i}`}
            initial={{ opacity: 0, x: -10, height: 0 }} animate={{ opacity: 1, x: 0, height: 'auto' }}
            className="flex items-start gap-3 p-2.5 rounded-xl"
            style={{ background: i === 0 ? `${event.color}10` : 'transparent' }}>
            <span className="text-base flex-shrink-0">{event.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-300 truncate" style={{ fontFamily: 'DM Sans, sans-serif' }}>{event.text}</p>
              <p className="text-[10px] font-mono mt-0.5" style={{ color: event.color, fontFamily: 'JetBrains Mono, monospace' }}>{event.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
