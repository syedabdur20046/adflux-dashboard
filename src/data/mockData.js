export const revenueData = [
  { month: 'Jan', revenue: 42000, spend: 18000, profit: 24000 },
  { month: 'Feb', revenue: 58000, spend: 22000, profit: 36000 },
  { month: 'Mar', revenue: 51000, spend: 19000, profit: 32000 },
  { month: 'Apr', revenue: 74000, spend: 28000, profit: 46000 },
  { month: 'May', revenue: 68000, spend: 25000, profit: 43000 },
  { month: 'Jun', revenue: 89000, spend: 32000, profit: 57000 },
  { month: 'Jul', revenue: 95000, spend: 35000, profit: 60000 },
  { month: 'Aug', revenue: 112000, spend: 40000, profit: 72000 },
  { month: 'Sep', revenue: 98000, spend: 36000, profit: 62000 },
  { month: 'Oct', revenue: 128000, spend: 44000, profit: 84000 },
  { month: 'Nov', revenue: 142000, spend: 48000, profit: 94000 },
  { month: 'Dec', revenue: 168000, spend: 55000, profit: 113000 },
];

export const trafficData = [
  { name: 'Instagram', value: 32, color: '#ec4899' },
  { name: 'Google', value: 28, color: '#3b82f6' },
  { name: 'TikTok', value: 18, color: '#06b6d4' },
  { name: 'Facebook', value: 14, color: '#a855f7' },
  { name: 'Twitter', value: 8, color: '#f59e0b' },
];

export const campaignData = [
  { name: 'Week 1', awareness: 4200, conversion: 2800, retention: 1900 },
  { name: 'Week 2', awareness: 5800, conversion: 3600, retention: 2400 },
  { name: 'Week 3', awareness: 4900, conversion: 4200, retention: 3100 },
  { name: 'Week 4', awareness: 7200, conversion: 5100, retention: 3800 },
  { name: 'Week 5', awareness: 6800, conversion: 4800, retention: 4200 },
  { name: 'Week 6', awareness: 9100, conversion: 6200, retention: 5100 },
];

export const engagementData = Array.from({ length: 20 }, (_, i) => ({
  time: `${i}:00`,
  value: Math.floor(Math.random() * 5000) + 2000,
  prev: Math.floor(Math.random() * 4000) + 1500,
}));

export const campaigns = [
  { name: 'Summer Sale 2025', platform: 'Instagram', budget: 12000, spent: 8400, roas: 4.2, status: 'active', progress: 70 },
  { name: 'Brand Awareness Q3', platform: 'Google', budget: 18000, spent: 11200, roas: 3.8, status: 'active', progress: 62 },
  { name: 'Retargeting Pro', platform: 'Facebook', budget: 8500, spent: 8500, roas: 5.1, status: 'completed', progress: 100 },
  { name: 'TikTok Viral Push', platform: 'TikTok', budget: 6000, spent: 2100, roas: 6.8, status: 'active', progress: 35 },
  { name: 'Email + Social Sync', platform: 'Multi', budget: 22000, spent: 14800, roas: 4.5, status: 'paused', progress: 67 },
];

export const kpis = [
  { label: 'Total Ad Revenue', value: 1284000, prefix: '$', suffix: '', change: +18.4, color: '#a855f7', sparkline: [42,58,51,74,68,89,95,112,98,128,142,168] },
  { label: 'Conversion Rate', value: 6.84, prefix: '', suffix: '%', change: +2.3, color: '#06b6d4', sparkline: [4.2,5.1,4.8,5.8,5.2,6.1,5.9,6.3,6.0,6.5,6.7,6.8] },
  { label: 'Active Campaigns', value: 24, prefix: '', suffix: '', change: +4, color: '#3b82f6', sparkline: [12,14,16,18,17,20,19,21,22,23,24,24] },
  { label: 'ROAS', value: 4.72, prefix: '', suffix: 'x', change: +0.8, color: '#ec4899', sparkline: [3.1,3.4,3.2,3.8,3.6,4.0,4.1,4.3,4.4,4.5,4.6,4.7] },
];

export const aiInsights = [
  { icon: '📈', text: 'Instagram CTR increased 24% — boost budget by 15%', priority: 'high', time: '2m ago' },
  { icon: '🎯', text: 'Best-performing audience: age 22–30, urban, mobile-first', priority: 'medium', time: '8m ago' },
  { icon: '⚡', text: 'TikTok ads outperforming Facebook by 3.2x this week', priority: 'high', time: '15m ago' },
  { icon: '💡', text: 'Recommended budget reallocation: +18% to video formats', priority: 'medium', time: '32m ago' },
  { icon: '🔥', text: 'Summer Sale campaign approaching 4x ROAS target', priority: 'low', time: '1h ago' },
];

export const socialMetrics = [
  { platform: 'Instagram', followers: '248K', growth: '+12.4%', reach: '1.2M', engagement: '4.8%', color: '#ec4899', posts: 142 },
  { platform: 'TikTok', followers: '189K', growth: '+31.2%', reach: '3.8M', engagement: '8.2%', color: '#06b6d4', posts: 89 },
  { platform: 'Facebook', followers: '412K', growth: '+2.1%', reach: '890K', engagement: '2.1%', color: '#a855f7', posts: 210 },
  { platform: 'Twitter/X', followers: '94K', growth: '+5.8%', reach: '540K', engagement: '3.4%', color: '#3b82f6', posts: 318 },
  { platform: 'YouTube', followers: '62K', growth: '+18.9%', reach: '2.1M', engagement: '6.7%', color: '#f59e0b', posts: 48 },
];

export const analyticsData = {
  pageViews: [12000,15000,13500,18000,22000,19500,25000,28000,24000,31000,35000,42000],
  sessions: [8000,10000,9200,12500,15000,13800,17500,19000,16500,22000,24500,29000],
  bounceRate: [48,45,47,42,39,41,38,36,40,34,32,30],
  months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
};

export const adsManagerData = [
  { id: 'AD001', name: 'Hero Banner A', type: 'Display', impressions: 1240000, clicks: 18600, ctr: 1.5, cpc: 0.42, status: 'active', spend: 7812 },
  { id: 'AD002', name: 'Video Story 15s', type: 'Video', impressions: 890000, clicks: 35600, ctr: 4.0, cpc: 0.28, status: 'active', spend: 9968 },
  { id: 'AD003', name: 'Carousel Product', type: 'Carousel', impressions: 620000, clicks: 24800, ctr: 4.0, cpc: 0.35, status: 'paused', spend: 8680 },
  { id: 'AD004', name: 'Retargeting Copy', type: 'Display', impressions: 340000, clicks: 13600, ctr: 4.0, cpc: 0.51, status: 'active', spend: 6936 },
  { id: 'AD005', name: 'UGC Testimonial', type: 'Video', impressions: 510000, clicks: 30600, ctr: 6.0, cpc: 0.19, status: 'active', spend: 5814 },
];

export const reportsData = [
  { name: 'Q2 Performance Report', date: '2025-06-30', size: '2.4 MB', type: 'PDF', status: 'ready' },
  { name: 'May Campaign Summary', date: '2025-05-31', size: '1.8 MB', type: 'PDF', status: 'ready' },
  { name: 'Social Media Analytics', date: '2025-05-15', size: '3.1 MB', type: 'Excel', status: 'ready' },
  { name: 'ROAS Deep Dive', date: '2025-04-30', size: '0.9 MB', type: 'PDF', status: 'ready' },
  { name: 'Audience Insights Report', date: '2025-04-15', size: '4.2 MB', type: 'PDF', status: 'processing' },
];
