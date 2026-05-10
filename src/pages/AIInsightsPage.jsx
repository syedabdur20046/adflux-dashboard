import { motion } from 'framer-motion';
import { Sparkles, Brain, TrendingUp, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';
import { aiInsights } from '../data/mockData';
import { useState } from 'react';

const GlassCard = ({ children, style = {}, className = '' }) => (
  <div className={`rounded-2xl p-5 relative ${className}`}
    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)', ...style }}>
    {children}
  </div>
);

const priorityStyles = {
  high: { color: '#f87171', bg: 'rgba(248,113,113,0.1)', border: 'rgba(248,113,113,0.2)', Icon: AlertTriangle },
  medium: { color: '#fbbf24', bg: 'rgba(251,191,36,0.1)', border: 'rgba(251,191,36,0.2)', Icon: Lightbulb },
  low: { color: '#4ade80', bg: 'rgba(74,222,128,0.1)', border: 'rgba(74,222,128,0.2)', Icon: CheckCircle },
};

const recommendations = [
  { title: 'Increase TikTok Budget', desc: 'TikTok is delivering 6.8x ROAS. Shift 20% budget from Facebook for better returns.', impact: 'High', savings: '+$18K est.' },
  { title: 'Optimize Ad Frequency', desc: 'Facebook ad frequency is at 7.2. Cap at 5 to reduce fatigue and cut CPC by ~12%.', impact: 'Medium', savings: '-$2.4K/mo' },
  { title: 'Launch Lookalike Audiences', desc: 'Your top 1% converters show strong signals. Lookalike can expand reach by 4x.', impact: 'High', savings: '+34% reach' },
  { title: 'A/B Test Video Length', desc: 'Current 30s videos show 42% completion rate. Test 15s cuts to improve engagement.', impact: 'Low', savings: '+8% CTR est.' },
];

export default function AIInsightsPage() {
  const [chat, setChat] = useState([{ role: 'ai', text: 'Hello! I am AdFlux AI. Ask me anything about your campaigns, performance, or marketing strategy.' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const aiResponses = {
    'roas': 'Your current average ROAS is 4.72x. TikTok leads at 6.8x, followed by Facebook (5.1x). I recommend shifting budget to TikTok for maximum returns.',
    'campaign': 'You have 5 campaigns, 3 active. "TikTok Viral Push" is performing best at 6.8x ROAS with only 35% budget spent — great opportunity to scale.',
    'budget': 'Total budget: $67K. Spent: $45K (67%). Instagram is 90% spent — consider increasing its budget or pausing lower performers.',
    'instagram': 'Instagram CTR is up 24% this month. Your 22–30 urban audience segment is your top converter. Current spend: $8.4K of $12K budget.',
    'tiktok': 'TikTok is your star performer: 6.8x ROAS, 18% of total traffic, and engagement rate of 8.2%. Video formats under 15s work best.',
    'default': 'Based on your current data, I recommend focusing on TikTok and Instagram for highest ROI. Your conversion rate is strong at 6.84% — above industry average of 4.2%.',
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input };
    setChat(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setTimeout(() => {
      const key = Object.keys(aiResponses).find(k => input.toLowerCase().includes(k)) || 'default';
      setChat(prev => [...prev, { role: 'ai', text: aiResponses[key] }]);
      setLoading(false);
    }, 900);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
          AI <span style={{ background: 'linear-gradient(135deg,#a855f7,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Insights</span>
        </h1>
        <p className="text-gray-500 text-sm mt-0.5">Powered by AdFlux AI — real-time marketing intelligence</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-white font-semibold mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>Live Insights</h3>
          <div className="space-y-3">
            {aiInsights.map((ins, i) => {
              const ps = priorityStyles[ins.priority];
              return (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                  className="flex gap-3 p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${ps.border}`, backdropFilter: 'blur(20px)' }}>
                  <span className="text-xl flex-shrink-0 mt-0.5">{ins.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm text-gray-200 leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>{ins.text}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] px-2 py-0.5 rounded-full uppercase font-mono"
                        style={{ background: ps.bg, color: ps.color, border: `1px solid ${ps.border}` }}>{ins.priority}</span>
                      <span className="text-[10px] text-gray-600 font-mono">{ins.time}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>AI Recommendations</h3>
          <div className="space-y-3">
            {recommendations.map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                className="p-4 rounded-2xl cursor-pointer transition-all" style={{ background: 'rgba(168,85,247,0.06)', border: '1px solid rgba(168,85,247,0.15)' }}
                whileHover={{ borderColor: 'rgba(168,85,247,0.35)' }}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-white font-medium" style={{ fontFamily: 'Syne, sans-serif' }}>{r.title}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-purple-400">{r.savings}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full" style={{
                      background: r.impact === 'High' ? 'rgba(248,113,113,0.1)' : r.impact === 'Medium' ? 'rgba(251,191,36,0.1)' : 'rgba(74,222,128,0.1)',
                      color: r.impact === 'High' ? '#f87171' : r.impact === 'Medium' ? '#fbbf24' : '#4ade80',
                    }}>{r.impact}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Chatbot */}
      <GlassCard style={{ border: '1px solid rgba(168,85,247,0.25)' }}>
        <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl" style={{ background: 'linear-gradient(90deg, transparent, #a855f7, #3b82f6, transparent)' }} />
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,rgba(168,85,247,0.3),rgba(59,130,246,0.2))', border: '1px solid rgba(168,85,247,0.3)' }}>
            <Brain size={16} className="text-purple-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm" style={{ fontFamily: 'Syne, sans-serif' }}>AI Assistant</h3>
            <div className="flex items-center gap-1.5">
              {[0,1,2].map(i => (
                <motion.div key={i} className="w-1 h-1 rounded-full bg-purple-400"
                  animate={{ opacity: [0.3,1,0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }} />
              ))}
              <span className="text-xs text-purple-400/60">Ready</span>
            </div>
          </div>
        </div>

        <div className="h-52 overflow-y-auto mb-4 space-y-3 pr-1">
          {chat.map((msg, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className="max-w-xs px-4 py-2.5 rounded-2xl text-sm" style={{
                background: msg.role === 'user' ? 'linear-gradient(135deg,rgba(168,85,247,0.3),rgba(59,130,246,0.2))' : 'rgba(255,255,255,0.05)',
                border: msg.role === 'user' ? '1px solid rgba(168,85,247,0.3)' : '1px solid rgba(255,255,255,0.08)',
                color: '#e5e7eb',
                fontFamily: 'DM Sans, sans-serif',
              }}>
                {msg.text}
              </div>
            </motion.div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="px-4 py-3 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
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

        <div className="flex gap-2">
          <input value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Ask about ROAS, campaigns, budget, TikTok..."
            className="flex-1 px-4 py-2.5 rounded-xl text-sm text-gray-300 placeholder-gray-600 outline-none"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', fontFamily: 'DM Sans, sans-serif' }} />
          <motion.button whileTap={{ scale: 0.95 }} onClick={sendMessage}
            className="px-4 py-2.5 rounded-xl text-sm text-white font-medium"
            style={{ background: 'linear-gradient(135deg,#a855f7,#3b82f6)' }}>
            Send
          </motion.button>
        </div>
        <p className="text-xs text-gray-600 mt-2">Try: "How is TikTok doing?" / "What's my ROAS?" / "Budget status"</p>
      </GlassCard>
    </div>
  );
}
