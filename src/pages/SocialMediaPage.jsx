import { motion } from 'framer-motion';
import { TrendingUp, Users, Heart, MessageCircle, Share2, Eye } from 'lucide-react';

const platforms = [
  { name: 'Instagram', color: '#ec4899', followers: '284K', growth: '+12.4%', engagement: '4.8%', posts: 142, reach: '1.2M', icon: '📸' },
  { name: 'TikTok', color: '#06b6d4', followers: '512K', growth: '+38.2%', engagement: '8.2%', posts: 89, reach: '3.8M', icon: '🎵' },
  { name: 'Facebook', color: '#3b82f6', followers: '96K', growth: '+2.1%', engagement: '1.9%', posts: 210, reach: '420K', icon: '👥' },
  { name: 'Twitter/X', color: '#a855f7', followers: '48K', growth: '+5.6%', engagement: '2.4%', posts: 388, reach: '280K', icon: '🐦' },
];

const posts = [
  { platform: 'Instagram', content: 'Summer collection launch 🌊 #fashion', likes: 4820, comments: 312, shares: 189, views: '48K', time: '2h ago', color: '#ec4899' },
  { platform: 'TikTok', content: 'Behind the scenes — our creative process ✨', likes: 12400, comments: 890, shares: 2100, views: '284K', time: '5h ago', color: '#06b6d4' },
  { platform: 'Facebook', content: 'Meet our team! Swipe to see everyone 👋', likes: 892, comments: 124, shares: 56, views: '12K', time: '1d ago', color: '#3b82f6' },
  { platform: 'Twitter/X', content: 'Just hit 50K followers! Thank you all 🙏', likes: 2140, comments: 380, shares: 920, views: '28K', time: '1d ago', color: '#a855f7' },
];

export default function SocialMediaPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>Social Media</h1>
        <p className="text-gray-500 text-sm">Cross-platform performance overview</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {platforms.map((p, i) => (
          <motion.div key={p.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            className="rounded-2xl p-5 relative overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${p.color}, transparent)` }} />
            <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-15" style={{ background: p.color }} />
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">{p.icon}</span>
              <span className="text-sm font-semibold text-white">{p.name}</span>
            </div>
            <p className="text-2xl font-bold text-white mb-0.5" style={{ fontFamily: 'Syne, sans-serif' }}>{p.followers}</p>
            <p className="text-xs text-gray-500 mb-3">followers</p>
            <div className="space-y-1.5">
              {[
                { label: 'Growth', value: p.growth, positive: true },
                { label: 'Engagement', value: p.engagement },
                { label: 'Reach', value: p.reach },
              ].map(m => (
                <div key={m.label} className="flex justify-between">
                  <span className="text-xs text-gray-500">{m.label}</span>
                  <span className="text-xs font-mono" style={{ color: m.positive ? '#4ade80' : p.color, fontFamily: 'JetBrains Mono, monospace' }}>{m.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl" style={{ background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.6), transparent)' }} />
        <h3 className="text-white font-semibold mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>Recent Posts Performance</h3>
        <div className="space-y-3">
          {posts.map((post, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.06 }}
              className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="flex items-start gap-3 flex-1">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0"
                  style={{ background: `${post.color}20` }}>
                  {platforms.find(p => p.name === post.platform || post.platform.startsWith(p.name))?.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-200">{post.content}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{post.time} · <span style={{ color: post.color }}>{post.platform}</span></p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1"><Heart size={11} style={{ color: '#ec4899' }} />{post.likes.toLocaleString()}</span>
                <span className="flex items-center gap-1"><MessageCircle size={11} style={{ color: '#3b82f6' }} />{post.comments}</span>
                <span className="flex items-center gap-1"><Share2 size={11} style={{ color: '#06b6d4' }} />{post.shares}</span>
                <span className="flex items-center gap-1"><Eye size={11} style={{ color: '#a855f7' }} />{post.views}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
