import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const suggestedPrompts = [
  'Which campaign has the best ROAS?',
  'How can I improve my conversion rate?',
  'Suggest budget reallocation',
  'What are my top performing platforms?',
];

const aiResponses = {
  'Which campaign has the best ROAS?': 'Based on current data, **TikTok Viral Push** leads with **6.8x ROAS**, followed by **Retargeting Pro** at 5.1x. I recommend increasing TikTok budget by 20–30% to capitalize on this momentum.',
  'How can I improve my conversion rate?': 'Your conversion rate of **6.84%** is above industry average. To push it further:\n\n1. **A/B test** your landing pages — small copy changes can lift CR by 15%\n2. **Retargeting** visitors who spent 60s+ on site\n3. **Improve mobile UX** — 68% of your traffic is mobile\n4. Tighten audience to **age 22–30 urban** segment',
  'Suggest budget reallocation': 'Recommended reallocation based on ROAS performance:\n\n• **TikTok**: ↑ +$2,000 (6.8x ROAS)\n• **Facebook**: ↓ -$1,500 (lowest performer)\n• **Instagram**: ↑ +$800 (CTR up 24%)\n• **Google**: hold steady\n\nProjected impact: +$8,400 additional revenue this month.',
  'What are my top performing platforms?': 'Platform ranking by ROAS this month:\n\n🥇 **TikTok** — 6.8x ROAS, 890K impressions\n🥈 **Facebook** (Retargeting) — 5.1x ROAS\n🥉 **Instagram** — 4.2x ROAS, CTR +24%\n📊 **Google** — 3.8x ROAS, highest volume\n\nTikTok is your breakout channel right now.',
};

function formatMessage(text) {
  return text.split('\n').map((line, i) => {
    const bold = line.replace(/\*\*(.*?)\*\*/g, '<strong style="color:#c084fc">$1</strong>');
    return <p key={i} dangerouslySetInnerHTML={{ __html: bold }} className="mb-1 last:mb-0" />;
  });
}

export default function AIChat() {
  const { showAIChat, setShowAIChat } = useApp();
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hi! I\'m your AdFlux AI assistant. I can analyze your campaigns, suggest optimizations, and answer any marketing questions. What would you like to know?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMessage = async (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: msg }]);
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000 + Math.random() * 800));
    const reply = aiResponses[msg] || `Great question about "${msg}"! Based on your current campaign data, I see strong performance across TikTok and Instagram. I recommend focusing budget where ROAS exceeds 4x. Would you like a detailed breakdown of any specific metric?`;
    setMessages(prev => [...prev, { role: 'ai', text: reply }]);
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {showAIChat && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowAIChat(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
          <motion.div initial={{ opacity: 0, y: 40, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 40, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-96 h-[560px] rounded-2xl flex flex-col z-50 overflow-hidden"
            style={{ background: 'rgba(8,14,35,0.98)', border: '1px solid rgba(168,85,247,0.3)', backdropFilter: 'blur(30px)', boxShadow: '0 0 60px rgba(168,85,247,0.15)' }}>
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #a855f7, #3b82f6)' }}>
                <Sparkles size={16} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-semibold" style={{ fontFamily: 'Syne, sans-serif' }}>AdFlux AI Assistant</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-green-400">Online</span>
                </div>
              </div>
              <button onClick={() => setShowAIChat(false)} className="p-1.5 rounded-lg text-gray-500 hover:text-white transition-colors" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <X size={14} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${m.role === 'ai' ? '' : ''}`}
                    style={{ background: m.role === 'ai' ? 'linear-gradient(135deg, #a855f7, #3b82f6)' : 'rgba(255,255,255,0.1)' }}>
                    {m.role === 'ai' ? <Bot size={13} className="text-white" /> : <User size={13} className="text-gray-300" />}
                  </div>
                  <div className="max-w-[75%] text-xs leading-relaxed rounded-xl px-3 py-2.5"
                    style={{
                      background: m.role === 'ai' ? 'rgba(168,85,247,0.1)' : 'rgba(59,130,246,0.15)',
                      border: `1px solid ${m.role === 'ai' ? 'rgba(168,85,247,0.2)' : 'rgba(59,130,246,0.2)'}`,
                      color: '#d1d5db',
                      fontFamily: 'DM Sans, sans-serif',
                    }}>
                    {formatMessage(m.text)}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #a855f7, #3b82f6)' }}>
                    <Bot size={13} className="text-white" />
                  </div>
                  <div className="flex items-center gap-1 px-3 py-2.5 rounded-xl" style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.2)' }}>
                    {[0,1,2].map(i => (
                      <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-purple-400"
                        animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggested prompts */}
            {messages.length < 2 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {suggestedPrompts.map(p => (
                  <button key={p} onClick={() => sendMessage(p)}
                    className="text-xs px-2.5 py-1.5 rounded-lg text-purple-300 transition-all hover:border-purple-400/50"
                    style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.2)', fontFamily: 'DM Sans, sans-serif' }}>
                    {p}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
              <div className="flex gap-2">
                <input value={input} onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask anything about your campaigns..."
                  className="flex-1 px-3 py-2 rounded-xl text-sm text-gray-300 placeholder-gray-600 outline-none"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', fontFamily: 'DM Sans, sans-serif' }} />
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => sendMessage()}
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #a855f7, #3b82f6)' }}>
                  <Send size={14} className="text-white" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
