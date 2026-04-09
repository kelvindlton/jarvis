import React, { useState } from 'react';
import {
  Radio,
  Globe,
  Clock,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Zap,
  Filter,
  ChevronRight,
  Activity,
  BarChart2,
  X,
  Maximize2,
  Minimize2,
  ExternalLink,
  Building2,
  MapPin,
  ShieldAlert,
  DollarSign,
  Truck,
  ArrowUpDown,
  Check,
} from 'lucide-react';
import FloatingChat from './FloatingChat';

const ALL_SIGNALS = [
  {
    id: 1,
    title: 'Semiconductor Allocation Spike',
    category: 'Technology',
    region: 'Global',
    impact: 'HIGH IMPACT',
    impactType: 'urgent',
    time: '2 minutes ago',
    description:
      'Leading foundries report a 34% surge in allocation requests for advanced node chips (3nm–5nm). Demand driven by AI accelerator buildout from hyperscalers. Supply constraints expected to persist through Q3, with spot prices up 18% week-over-week.',
    aiNote:
      'Recommend securing forward contracts on critical chip categories within 48 hours. Early-mover advantage estimated at 12–15% cost reduction.',
    trend: 'up',
    sources: 4,
    featured: true,
    imageSrc:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop',
    analysis: {
      confidence: 91,
      sentiment: 'Bearish',
      velocity: 'Fast',
      financialImpact: 85,
      regulatoryRisk: 40,
      supplyRisk: 92,
      marketVolatility: 78,
      breakdown: 'Cross-referencing TSMC, Samsung, and Intel foundry order books reveals a systemic demand imbalance not seen since 2021. AI accelerator demand from AWS, Google, and Microsoft is the primary driver. Secondary demand from automotive and industrial IoT is compounding allocation pressure. Q3 relief unlikely without new capacity coming online — earliest credible supply normalization is Q1 next year.',
    },
    entities: [
      { name: 'TSMC', type: 'company' },
      { name: 'Samsung', type: 'company' },
      { name: 'NVIDIA', type: 'company' },
      { name: 'AWS', type: 'company' },
      { name: 'Global', type: 'region' },
    ],
    timeline: [
      { time: '2 min ago', event: 'Foundry allocation data updated — spike confirmed across 3 tier-1 suppliers' },
      { time: '4 hours ago', event: 'Spot price index crossed +15% threshold, triggering this alert' },
      { time: '2 days ago', event: 'Hyperscaler Q2 CapEx disclosures increased AI infrastructure spend guidance by 22%' },
    ],
    sourceLinks: [
      { title: 'TSMC Q1 Earnings Call — Allocation Commentary', domain: 'tsmc.com', time: '1 day ago' },
      { title: 'SemiAnalysis: Advanced Node Supply Crunch 2026', domain: 'semianalysis.com', time: '3 hours ago' },
      { title: 'Bloomberg: Chip Prices Surge on AI Demand', domain: 'bloomberg.com', time: '5 hours ago' },
      { title: 'IC Insights Foundry Report Q1 2026', domain: 'icinsights.com', time: '2 days ago' },
    ],
  },
  {
    id: 2,
    title: 'Rare Earth Tariff Adjustment',
    category: 'Regulatory',
    region: 'APAC',
    impact: 'HIGH IMPACT',
    impactType: 'urgent',
    time: '1 hour ago',
    description:
      'New APAC regulatory framework imposes a 22% tariff increase on rare earth exports effective next quarter. Affects battery, magnet, and optics supply chains. Companies reliant on single-source suppliers face highest exposure.',
    aiNote:
      'Diversify sourcing to North American and African suppliers. Estimated 8-week lead time for qualification.',
    trend: 'up',
    sources: 6,
    imageSrc:
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=600&auto=format&fit=crop',
    analysis: {
      confidence: 87,
      sentiment: 'Bearish',
      velocity: 'Medium',
      financialImpact: 72,
      regulatoryRisk: 90,
      supplyRisk: 68,
      marketVolatility: 55,
      breakdown: 'China controls approximately 60% of global rare earth processing capacity. The new tariff framework targets lanthanum, cerium, and neodymium — critical for EV motors, wind turbines, and consumer electronics. North American and African alternative sources (MP Materials, Lynas) can partially offset but require 6–12 month qualification timelines. Companies with single-source exposure face the highest near-term margin compression.',
    },
    entities: [
      { name: 'China MOFCOM', type: 'org' },
      { name: 'MP Materials', type: 'company' },
      { name: 'Lynas Rare Earths', type: 'company' },
      { name: 'APAC', type: 'region' },
    ],
    timeline: [
      { time: '1 hour ago', event: 'Official gazette published final tariff schedule, effective Q3 2026' },
      { time: '3 days ago', event: 'Draft framework leaked — industry bodies filed objections' },
      { time: '2 weeks ago', event: 'APAC trade ministers summit flagged rare earth as strategic lever' },
    ],
    sourceLinks: [
      { title: 'China MOFCOM Official Tariff Notice', domain: 'mofcom.gov.cn', time: '1 hour ago' },
      { title: 'Reuters: Rare Earth Tariff Impact Analysis', domain: 'reuters.com', time: '2 hours ago' },
      { title: 'MP Materials Investor Update', domain: 'mpmaterials.com', time: '1 day ago' },
      { title: 'Benchmark Mineral Intelligence Report', domain: 'benchmarkminerals.com', time: '4 hours ago' },
      { title: 'FT: China Tightens Grip on Critical Minerals', domain: 'ft.com', time: '6 hours ago' },
      { title: 'BloombergNEF Rare Earth Supply Tracker', domain: 'bnef.com', time: '12 hours ago' },
    ],
  },
  {
    id: 3,
    title: 'EV Battery Supply Disruption',
    category: 'Supply Chain',
    region: 'SE Asia',
    impact: 'MEDIUM IMPACT',
    impactType: 'medium',
    time: '3 hours ago',
    description:
      'Production delays at three major lithium-ion cell manufacturers in Vietnam and Indonesia. Combined output down 19% this month. OEM pipeline impact projected for Q4 delivery schedules.',
    aiNote:
      'Consider inventory buffer increase of 30% on critical cell SKUs and evaluate spot market coverage.',
    trend: 'down',
    sources: 3,
    imageSrc:
      'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=600&auto=format&fit=crop',
    analysis: {
      confidence: 79,
      sentiment: 'Bearish',
      velocity: 'Medium',
      financialImpact: 60,
      regulatoryRisk: 20,
      supplyRisk: 74,
      marketVolatility: 45,
      breakdown: 'Root cause is a combination of monsoon-season flooding disrupting logistics at the Binh Duong industrial zone and an unresolved labor dispute at CATL\'s Indonesian joint venture facility. Combined, these three manufacturers represent ~14% of Southeast Asian cell output. OEM customers have 6–8 weeks of buffer stock on average, meaning Q4 impact is real but manageable with rapid sourcing diversification.',
    },
    entities: [
      { name: 'CATL', type: 'company' },
      { name: 'Vietnam', type: 'region' },
      { name: 'Indonesia', type: 'region' },
      { name: 'Binh Duong Zone', type: 'location' },
    ],
    timeline: [
      { time: '3 hours ago', event: 'Third manufacturer confirmed output reduction — total impact upgraded to MEDIUM' },
      { time: '1 day ago', event: 'CATL JV facility reported 40% capacity reduction due to labor dispute' },
      { time: '3 days ago', event: 'Flooding reported in Binh Duong — logistics disrupted' },
    ],
    sourceLinks: [
      { title: 'S&P Global: SE Asia Battery Supply Update', domain: 'spglobal.com', time: '4 hours ago' },
      { title: 'Nikkei Asia: EV Supply Chain Disruption', domain: 'asia.nikkei.com', time: '5 hours ago' },
      { title: 'Wood Mackenzie Battery Market Brief', domain: 'woodmac.com', time: '1 day ago' },
    ],
  },
  {
    id: 4,
    title: 'AI Chip Export Restriction Expansion',
    category: 'Regulatory',
    region: 'US / China',
    impact: 'HIGH IMPACT',
    impactType: 'urgent',
    time: '5 hours ago',
    description:
      'US Commerce Department expands H100-class GPU export controls to cover additional end-use categories. Impacts AI infrastructure build-out for non-allied nations. Compliance window is 60 days.',
    aiNote:
      'Audit current inventory positions and customer contracts for compliance exposure immediately.',
    trend: 'up',
    sources: 8,
    imageSrc:
      'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=600&auto=format&fit=crop',
    analysis: {
      confidence: 95,
      sentiment: 'Bearish',
      velocity: 'Fast',
      financialImpact: 80,
      regulatoryRisk: 96,
      supplyRisk: 55,
      marketVolatility: 70,
      breakdown: 'The BIS rule expansion adds 14 new end-use categories to the Entity List framework, including cloud inference services, autonomous systems training, and dual-use research institutions. Companies shipping or re-exporting H100/A100-class GPUs must re-screen all existing customer contracts within the 60-day window. Non-compliance penalties include loss of export privileges and potential criminal liability for officers.',
    },
    entities: [
      { name: 'US Commerce / BIS', type: 'org' },
      { name: 'NVIDIA', type: 'company' },
      { name: 'China', type: 'region' },
      { name: 'Entity List', type: 'policy' },
    ],
    timeline: [
      { time: '5 hours ago', event: 'Federal Register published final rule — effective 60 days from today' },
      { time: '2 weeks ago', event: 'ANPRM comment period closed — industry broadly opposed expansion' },
      { time: '6 weeks ago', event: 'Proposed rule leaked to press — initial market reaction was -3.2% for NVDA' },
    ],
    sourceLinks: [
      { title: 'Federal Register: BIS Final Rule 2026-04-01', domain: 'federalregister.gov', time: '5 hours ago' },
      { title: 'Export Compliance Review: What Changes', domain: 'exportcompliancedaily.com', time: '6 hours ago' },
      { title: 'Reuters: NVIDIA Shares React to Expansion', domain: 'reuters.com', time: '7 hours ago' },
      { title: 'BIS Entity List Updated Database', domain: 'bis.doc.gov', time: '5 hours ago' },
      { title: 'WSJ: Tech Companies Face New Export Hurdles', domain: 'wsj.com', time: '8 hours ago' },
      { title: 'CSIS: AI Export Controls Deep Dive', domain: 'csis.org', time: '1 day ago' },
      { title: 'Covington Export Controls Alert', domain: 'cov.com', time: '4 hours ago' },
      { title: 'Semiconductor Industry Association Statement', domain: 'semiconductors.org', time: '3 hours ago' },
    ],
  },
  {
    id: 5,
    title: 'Carbon Credit Market Surge',
    category: 'Energy',
    region: 'EMEA',
    impact: 'MEDIUM IMPACT',
    impactType: 'medium',
    time: '8 hours ago',
    description:
      'European carbon credit prices hit 6-month high at €68.40/tonne following tighter EU ETS auction supply. Industrial emitters facing margin compression as forward pricing climbs 11% quarter-on-quarter.',
    aiNote:
      'Lock in forward credit positions at current prices. Delay is projected to cost an additional €2.1M per 100k tonnes.',
    trend: 'up',
    sources: 5,
    imageSrc:
      'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=600&auto=format&fit=crop',
    analysis: {
      confidence: 83,
      sentiment: 'Bearish',
      velocity: 'Slow',
      financialImpact: 65,
      regulatoryRisk: 50,
      supplyRisk: 30,
      marketVolatility: 60,
      breakdown: 'The EU ETS auction supply reduction is a deliberate policy mechanism under the Market Stability Reserve (MSR) framework, which removes surplus allowances when the total number of allowances in circulation (TNAC) exceeds 833 million. Current TNAC is below this threshold, meaning supply tightening is structural and unlikely to reverse before 2028. Companies with high Scope 1 emissions should treat this as a long-term cost input, not a short-term fluctuation.',
    },
    entities: [
      { name: 'European Commission', type: 'org' },
      { name: 'EU ETS', type: 'policy' },
      { name: 'ICE Futures', type: 'company' },
      { name: 'EMEA', type: 'region' },
    ],
    timeline: [
      { time: '8 hours ago', event: 'EUA spot price reached €68.40 — 6-month high confirmed' },
      { time: '3 days ago', event: 'EU ETS Q2 auction schedule released — supply 8% below Q1' },
      { time: '2 weeks ago', event: 'MSR decision published — removal of 320M allowances confirmed' },
    ],
    sourceLinks: [
      { title: 'ICE EUA Price Feed — Live', domain: 'theice.com', time: 'Live' },
      { title: 'EU ETS Auction Results Q2 2026', domain: 'ets.emissionseurope.eu', time: '3 days ago' },
      { title: 'Carbon Pulse: EUA Market Analysis', domain: 'carbon-pulse.com', time: '10 hours ago' },
      { title: 'BloombergNEF Carbon Market Outlook', domain: 'bnef.com', time: '1 day ago' },
      { title: 'ICAP EU Carbon Market Report', domain: 'icapenergy.com', time: '2 days ago' },
    ],
  },
  {
    id: 6,
    title: 'Logistics Port Congestion — Tanjung Pelepas',
    category: 'Supply Chain',
    region: 'SE Asia',
    impact: 'MEDIUM IMPACT',
    impactType: 'medium',
    time: '12 hours ago',
    description:
      'Vessel wait times at Tanjung Pelepas have surged to 6.2 days (baseline: 1.8 days) amid port labor disputes. 14% of regional container throughput rerouted to Singapore terminals, elevating congestion risk system-wide.',
    aiNote:
      'Re-route critical shipments via Singapore with buffer lead time added. Alert procurement on at-risk inbound cargo.',
    trend: 'down',
    sources: 2,
    imageSrc:
      'https://images.unsplash.com/photo-1565793979468-f2fc1d61c1e0?q=80&w=600&auto=format&fit=crop',
    analysis: {
      confidence: 76,
      sentiment: 'Bearish',
      velocity: 'Slow',
      financialImpact: 45,
      regulatoryRisk: 15,
      supplyRisk: 62,
      marketVolatility: 35,
      breakdown: 'The labor dispute at PTP involves dockworkers demanding a 12% wage increase and improved shift conditions. Negotiations have been ongoing for 11 days with no resolution. Singapore PSA terminals are absorbing diverted volume but are already operating at 91% capacity, meaning further diversion will push congestion system-wide. Vessel operators are adding 1.5–2 day buffer to Malaysia-bound ETAs.',
    },
    entities: [
      { name: 'Port of Tanjung Pelepas', type: 'location' },
      { name: 'PSA Singapore', type: 'company' },
      { name: 'Malaysia', type: 'region' },
      { name: 'Maersk', type: 'company' },
    ],
    timeline: [
      { time: '12 hours ago', event: 'Wait time updated to 6.2 days — third consecutive day of increase' },
      { time: '2 days ago', event: 'Maersk issued advisory — rerouting 40% of calls to Singapore' },
      { time: '11 days ago', event: 'PTP dockworker union filed formal dispute notice' },
    ],
    sourceLinks: [
      { title: 'Port of Tanjung Pelepas Operations Bulletin', domain: 'ptp.com.my', time: '12 hours ago' },
      { title: 'Freightos: Malaysia Port Congestion Tracker', domain: 'freightos.com', time: '6 hours ago' },
    ],
  },
];

const CATEGORIES = ['All', 'Technology', 'Supply Chain', 'Regulatory', 'Energy', 'Geopolitical'];

const CATEGORY_COLORS = {
  Technology: { bg: '#eff6ff', text: '#3b82f6' },
  'Supply Chain': { bg: '#f0fdf4', text: '#16a34a' },
  Regulatory: { bg: '#fef9c3', text: '#ca8a04' },
  Energy: { bg: '#fff7ed', text: '#ea580c' },
  Geopolitical: { bg: '#fdf4ff', text: '#9333ea' },
};

const SIGNAL_TASK_CATEGORY = {
  Technology: 'Strategic',
  Energy: 'Strategic',
  Regulatory: 'Regulatory',
  'Supply Chain': 'Supply Chain',
  Geopolitical: 'Strategic',
};

export default function IndustrySignals({ addTask }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedSignal, setSelectedSignal] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [analyzedIds, setAnalyzedIds] = useState(new Set());
  const [sortBy, setSortBy] = useState('urgency');
  const [sortOpen, setSortOpen] = useState(false);

  const SORT_OPTIONS = [
    { key: 'urgency',    label: 'Urgency' },
    { key: 'newest',     label: 'Newest' },
    { key: 'confidence', label: 'Confidence' },
    { key: 'sources',    label: 'Sources' },
    { key: 'region',     label: 'Region' },
  ];

  const handleAnalyze = (signal, e) => {
    if (e) e.stopPropagation();
    setAnalyzedIds(prev => new Set([...prev, signal.id]));
    if (addTask) {
      addTask({
        id: Date.now(),
        title: signal.title,
        description: signal.aiNote,
        category: SIGNAL_TASK_CATEGORY[signal.category] || 'Strategic',
        priority: signal.impactType,
        status: 'pending',
        source: `${signal.category} Signal · ${signal.region}`,
        detected: signal.time,
        deadline: signal.impactType === 'urgent' ? '48 hours' : '1 week',
        confidence: signal.analysis?.confidence ?? 80,
        impact: signal.impact,
        impactType: signal.impactType,
        aiAnalysis: signal.aiNote,
        steps: [],
      });
    }
  };

  const featured = ALL_SIGNALS.find((s) => s.featured);
  const filteredSignals = ALL_SIGNALS.filter((s) => {
    if (activeCategory === 'All') return true;
    return s.category === activeCategory;
  });
  const baseFeedSignals = filteredSignals.filter((s) => !s.featured || activeCategory !== 'All');
  const feedSignals = [...baseFeedSignals].sort((a, b) => {
    if (sortBy === 'urgency') {
      const order = { urgent: 0, medium: 1 };
      return (order[a.impactType] ?? 2) - (order[b.impactType] ?? 2);
    }
    if (sortBy === 'newest') return 0; // preserve original array order
    if (sortBy === 'confidence') return (b.analysis?.confidence ?? 0) - (a.analysis?.confidence ?? 0);
    if (sortBy === 'sources') return b.sources - a.sources;
    if (sortBy === 'region') return a.region.localeCompare(b.region);
    return 0;
  });

  return (
    <main className="main-content">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

        {/* Page Header */}
        <div className="animate-fade-in" style={{ marginBottom: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.5rem' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: 0 }}>Industry Signals</h1>
            <span className="badge live" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0284c7', display: 'inline-block' }}></span>
              LIVE
            </span>
          </div>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '560px', lineHeight: 1.5 }}>
            AI-analyzed signals across your tracked sectors. Updated continuously from {' '}
            <span style={{ color: '#0284c7', fontWeight: 600 }}>28 verified sources</span>.
          </p>
        </div>

        {/* Stats Row */}
        <div className="animate-fade-in" style={{ display: 'flex', gap: '1rem', animationDelay: '0.05s' }}>
          {[
            { label: 'Active Signals', value: '6', icon: <Radio size={16} color="#3b82f6" />, bg: '#eff6ff', color: '#3b82f6' },
            { label: 'Critical', value: '3', icon: <AlertTriangle size={16} color="#ef4444" />, bg: '#fee2e2', color: '#ef4444' },
            { label: 'Regions Covered', value: '7', icon: <Globe size={16} color="#10b981" />, bg: '#f0fdf4', color: '#10b981' },
            { label: 'Avg Confidence', value: '88%', icon: <Activity size={16} color="#0ea5e9" />, bg: '#f0f9ff', color: '#0ea5e9' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="card"
              style={{
                flex: 1,
                padding: '1rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: 'white',
              }}
            >
              <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {stat.icon}
              </div>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: stat.color, lineHeight: 1.1 }}>{stat.value}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Signal */}
        {activeCategory === 'All' && featured && (
          <div className="hero-card animate-fade-in" onClick={() => setSelectedSignal(featured)} style={{ animationDelay: '0.1s', flexDirection: 'column', padding: 0, overflow: 'hidden', cursor: 'pointer' }}>
            <div style={{ display: 'flex', width: '100%' }}>
              <div style={{ flex: 1, padding: '2rem 2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                  <span className="badge urgent">URGENT</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} /> {featured.time}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Globe size={12} /> {featured.region}
                  </span>
                </div>
                <h2 style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>{featured.title}</h2>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.65, color: 'var(--text-secondary)', marginBottom: '1.25rem', maxWidth: '520px' }}>
                  {featured.description}
                </p>
                {analyzedIds.has(featured.id) && (
                  <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '10px', padding: '0.875rem 1.125rem', marginBottom: '1.5rem', maxWidth: '520px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.4rem' }}>
                      <Zap size={13} color="#0284c7" />
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AI Recommendation</span>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: '#0c4a6e', margin: 0, lineHeight: 1.5 }}>{featured.aiNote}</p>
                  </div>
                )}
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <button
                    className={`btn ${analyzedIds.has(featured.id) ? 'btn-secondary' : 'btn-primary'}`}
                    onClick={(e) => { e.stopPropagation(); handleAnalyze(featured, e); }}
                  >
                    {analyzedIds.has(featured.id) ? 'Analyzed ✓' : 'Analyze Now'}
                  </button>
                  <button className="btn" style={{ background: 'transparent', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    View Sources <ChevronRight size={14} />
                  </button>
                </div>
              </div>
              <div style={{ width: '280px', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
                <img
                  src={featured.imageSrc}
                  alt={featured.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(255,255,255,0.15), transparent)' }}></div>
              </div>
            </div>
          </div>
        )}

        {/* Category Filter Tabs */}
        <div className="animate-fade-in" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', animationDelay: '0.15s' }}>
          <Filter size={14} color="var(--text-muted)" style={{ flexShrink: 0 }} />
          <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.375rem 0.875rem',
                  borderRadius: '999px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  border: activeCategory === cat ? '1.5px solid #3b82f6' : '1.5px solid var(--border-color)',
                  background: activeCategory === cat ? '#eff6ff' : 'white',
                  color: activeCategory === cat ? '#3b82f6' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Section Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <BarChart2 size={16} color="#38bdf8" />
            {activeCategory === 'All' ? 'All Signals' : `${activeCategory} Signals`}
          </h3>
          {/* Sort toggle */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setSortOpen(o => !o)}
              style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                padding: '0.3rem 0.75rem', borderRadius: '99px',
                border: '1.5px solid var(--border-color)',
                background: sortOpen ? '#eff6ff' : 'white',
                color: sortOpen ? '#3b82f6' : 'var(--text-secondary)',
                fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              <ArrowUpDown size={12} />
              {SORT_OPTIONS.find(o => o.key === sortBy)?.label}
            </button>
            {sortOpen && (
              <div
                style={{
                  position: 'absolute', top: 'calc(100% + 6px)', right: 0,
                  background: 'white', border: '1px solid var(--border-color)',
                  borderRadius: '10px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                  zIndex: 50, minWidth: '140px', overflow: 'hidden',
                }}
              >
                {SORT_OPTIONS.map(opt => (
                  <button
                    key={opt.key}
                    onClick={() => { setSortBy(opt.key); setSortOpen(false); }}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      width: '100%', padding: '0.5rem 0.875rem',
                      background: sortBy === opt.key ? '#eff6ff' : 'transparent',
                      color: sortBy === opt.key ? '#3b82f6' : 'var(--text-primary)',
                      fontSize: '0.82rem', fontWeight: sortBy === opt.key ? 600 : 500,
                      border: 'none', cursor: 'pointer', textAlign: 'left',
                      borderBottom: '1px solid #f3f4f6',
                    }}
                  >
                    {opt.label}
                    {sortBy === opt.key && <Check size={12} color="#3b82f6" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Signal Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {feedSignals.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
              No signals in this category right now.
            </div>
          ) : (
            feedSignals.map((signal, idx) => {
              const catStyle = CATEGORY_COLORS[signal.category] || { bg: '#f3f4f6', text: '#6b7280' };
              return (
                <div
                  key={signal.id}
                  className="action-card animate-fade-in"
                  onClick={() => setSelectedSignal(signal)}
                  style={{ animationDelay: `${0.05 * idx}s`, cursor: 'pointer' }}
                >
                  <img src={signal.imageSrc} alt={signal.title} className="action-image" />
                  <div className="action-content">
                    <div>
                      <div className="action-header" style={{ marginBottom: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                          <span
                            style={{
                              fontSize: '0.65rem',
                              fontWeight: 700,
                              padding: '2px 8px',
                              borderRadius: '99px',
                              background: catStyle.bg,
                              color: catStyle.text,
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em',
                            }}
                          >
                            {signal.category}
                          </span>
                          <span className={`badge ${signal.impactType}`}>{signal.impact}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                          {signal.trend === 'up' ? (
                            <TrendingUp size={14} color="#ef4444" />
                          ) : (
                            <TrendingDown size={14} color="#10b981" />
                          )}
                        </div>
                      </div>
                      <div className="action-title">{signal.title}</div>
                      <p className="action-desc">{signal.description}</p>
                      {analyzedIds.has(signal.id) && (
                        <div
                          style={{
                            background: '#f0f9ff',
                            border: '1px solid #bae6fd',
                            borderRadius: '8px',
                            padding: '0.625rem 0.875rem',
                            marginBottom: '0.75rem',
                            display: 'flex',
                            gap: '6px',
                            alignItems: 'flex-start',
                          }}
                        >
                          <Zap size={12} color="#0284c7" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <p style={{ fontSize: '0.8rem', color: '#0c4a6e', margin: 0, lineHeight: 1.45 }}>{signal.aiNote}</p>
                        </div>
                      )}
                    </div>
                    <div className="action-footer">
                      <button
                        className={`btn ${analyzedIds.has(signal.id) ? 'btn-secondary' : 'btn-primary'}`}
                        style={{ fontSize: '0.8rem', padding: '0.4rem 1rem' }}
                        onClick={(e) => handleAnalyze(signal, e)}
                      >
                        {analyzedIds.has(signal.id) ? 'Analyzed ✓' : 'Analyze'}
                      </button>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Globe size={11} /> {signal.region}
                      </span>
                      <span className="action-time">
                        <Clock size={11} /> {signal.time}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>
                        {signal.sources} sources
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      {/* Signal Detail Drawer */}
      {selectedSignal && (() => {
        const catStyle = CATEGORY_COLORS[selectedSignal.category] || { bg: '#f3f4f6', text: '#6b7280' };
        const a = selectedSignal.analysis;

        const closeDrawer = () => { setSelectedSignal(null); setExpanded(false); };

        /* ── Shared left-column content ── */
        const leftContent = (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, padding: '2px 8px', borderRadius: '99px', background: catStyle.bg, color: catStyle.text, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {selectedSignal.category}
              </span>
              <span className={`badge ${selectedSignal.impactType}`}>{selectedSignal.impact}</span>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}>
                {selectedSignal.trend === 'up' ? <TrendingUp size={14} color="#ef4444" /> : <TrendingDown size={14} color="#10b981" />}
                <span style={{ fontSize: '0.7rem', color: selectedSignal.trend === 'up' ? '#ef4444' : '#10b981', fontWeight: 600 }}>
                  {selectedSignal.trend === 'up' ? 'Trending Up' : 'Trending Down'}
                </span>
              </div>
            </div>
            {/* Meta */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}><Globe size={12} /> {selectedSignal.region}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> {selectedSignal.time}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>{selectedSignal.sources} sources</span>
            </div>
            {/* Title */}
            <h2 style={{ fontSize: expanded ? '1.4rem' : '1.2rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0, lineHeight: 1.3 }}>
              {selectedSignal.title}
            </h2>
            {/* Description */}
            <p style={{ fontSize: '0.9rem', lineHeight: 1.65, color: 'var(--text-secondary)', margin: 0 }}>
              {selectedSignal.description}
            </p>
            {/* AI Recommendation — visible only after Analyze */}
            {analyzedIds.has(selectedSignal.id) && (
              <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '10px', padding: '0.875rem 1.125rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.4rem' }}>
                  <Zap size={13} color="#0284c7" />
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AI Recommendation</span>
                </div>
                <p style={{ fontSize: '0.875rem', color: '#0c4a6e', margin: 0, lineHeight: 1.5 }}>{selectedSignal.aiNote}</p>
              </div>
            )}
            <div style={{ height: '1px', background: 'var(--border-color)' }} />
            {/* Actions */}
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <button
                className={`btn ${analyzedIds.has(selectedSignal.id) ? 'btn-secondary' : 'btn-primary'}`}
                onClick={(e) => handleAnalyze(selectedSignal, e)}
              >
                {analyzedIds.has(selectedSignal.id) ? 'Analyzed ✓' : 'Analyze Now'}
              </button>
              <button className="btn" style={{ background: 'transparent', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                View Sources <ChevronRight size={14} />
              </button>
            </div>
          </div>
        );

        /* ── Right column (expanded only) ── */
        const rightContent = a && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Confidence + Sentiment */}
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.875rem' }}>
                Signal Intelligence
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                {[
                  { label: 'Confidence', value: `${a.confidence}%`, color: a.confidence >= 85 ? '#10b981' : a.confidence >= 70 ? '#f59e0b' : '#ef4444' },
                  { label: 'Sentiment', value: a.sentiment, color: a.sentiment === 'Bullish' ? '#10b981' : a.sentiment === 'Bearish' ? '#ef4444' : '#6b7280' },
                  { label: 'Velocity', value: a.velocity, color: a.velocity === 'Fast' ? '#ef4444' : a.velocity === 'Medium' ? '#f59e0b' : '#10b981' },
                ].map(item => (
                  <div key={item.label} style={{ background: '#f8fafc', borderRadius: '10px', padding: '0.75rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: item.color, marginBottom: '2px' }}>{item.value}</div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{item.label}</div>
                  </div>
                ))}
              </div>

              {/* Impact bars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {[
                  { label: 'Financial Impact',   value: a.financialImpact,  icon: <DollarSign size={11} />,  color: '#ef4444' },
                  { label: 'Regulatory Risk',    value: a.regulatoryRisk,   icon: <ShieldAlert size={11} />, color: '#f59e0b' },
                  { label: 'Supply Chain Risk',  value: a.supplyRisk,       icon: <Truck size={11} />,       color: '#8b5cf6' },
                  { label: 'Market Volatility',  value: a.marketVolatility, icon: <Activity size={11} />,    color: '#0ea5e9' },
                ].map(bar => (
                  <div key={bar.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 500 }}>
                        <span style={{ color: bar.color }}>{bar.icon}</span>{bar.label}
                      </span>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: bar.color }}>{bar.value}</span>
                    </div>
                    <div style={{ height: '5px', background: '#e2e8f0', borderRadius: '99px', overflow: 'hidden' }}>
                      <div style={{ width: `${bar.value}%`, height: '100%', background: bar.color, borderRadius: '99px' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Analysis Breakdown */}
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.625rem' }}>
                Analysis Breakdown
              </div>
              <p style={{ fontSize: '0.855rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0, background: '#f8fafc', padding: '0.875rem 1rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                {a.breakdown}
              </p>
            </div>

            {/* Key Entities */}
            {selectedSignal.entities && (
              <div>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.625rem' }}>
                  Key Entities
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {selectedSignal.entities.map(e => (
                    <span key={e.name} style={{
                      display: 'inline-flex', alignItems: 'center', gap: '4px',
                      fontSize: '0.75rem', fontWeight: 600, padding: '3px 10px',
                      borderRadius: '99px', border: '1.5px solid var(--border-color)',
                      background: 'white', color: 'var(--text-primary)',
                    }}>
                      {e.type === 'company' && <Building2 size={10} color="#3b82f6" />}
                      {e.type === 'region' && <Globe size={10} color="#10b981" />}
                      {e.type === 'location' && <MapPin size={10} color="#f59e0b" />}
                      {e.type === 'org' && <ShieldAlert size={10} color="#9333ea" />}
                      {e.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Timeline */}
            {selectedSignal.timeline && (
              <div>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                  Event Timeline
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {selectedSignal.timeline.map((t, i) => (
                    <div key={i} style={{ display: 'flex', gap: '12px', paddingBottom: i < selectedSignal.timeline.length - 1 ? '0.875rem' : 0 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: i === 0 ? '#3b82f6' : '#cbd5e1', marginTop: '4px', flexShrink: 0 }} />
                        {i < selectedSignal.timeline.length - 1 && <div style={{ width: '1.5px', flex: 1, background: '#e2e8f0', marginTop: '4px' }} />}
                      </div>
                      <div style={{ paddingBottom: i < selectedSignal.timeline.length - 1 ? '0.25rem' : 0 }}>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '2px' }}>{t.time}</div>
                        <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>{t.event}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Source Links */}
            {selectedSignal.sourceLinks && (
              <div>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.625rem' }}>
                  Source Links ({selectedSignal.sourceLinks.length})
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                  {selectedSignal.sourceLinks.map((src, i) => (
                    <a
                      key={i}
                      href="#"
                      onClick={e => e.preventDefault()}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '0.625rem 0',
                        borderBottom: i < selectedSignal.sourceLinks.length - 1 ? '1px solid var(--border-color)' : 'none',
                        textDecoration: 'none', gap: '0.75rem',
                      }}
                    >
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: '0.825rem', fontWeight: 600, color: '#3b82f6', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {src.title}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                          <Globe size={10} />{src.domain}
                          <span>·</span>
                          <Clock size={10} />{src.time}
                        </div>
                      </div>
                      <ExternalLink size={13} color="#94a3b8" style={{ flexShrink: 0 }} />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

        /* ── panel inner markup (shared) ── */
        const panelInner = (
          <>
            {/* Hero image */}
            <div style={{ position: 'relative', width: '100%', height: expanded ? '220px' : '200px', flexShrink: 0 }}>
              <img src={selectedSignal.imageSrc} alt={selectedSignal.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }} />
              <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '6px' }}>
                <button
                  onClick={() => setExpanded(e => !e)}
                  title={expanded ? 'Collapse' : 'Expand for full details'}
                  style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(0,0,0,0.5)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  {expanded ? <Minimize2 size={14} color="white" /> : <Maximize2 size={14} color="white" />}
                </button>
                <button
                  onClick={closeDrawer}
                  style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(0,0,0,0.5)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <X size={15} color="white" />
                </button>
              </div>
              {expanded && (
                <div style={{ position: 'absolute', bottom: '16px', left: '24px', right: '80px' }}>
                  <h2 style={{ color: 'white', fontSize: '1.5rem', fontWeight: 800, margin: 0, textShadow: '0 1px 4px rgba(0,0,0,0.4)', lineHeight: 1.2 }}>
                    {selectedSignal.title}
                  </h2>
                </div>
              )}
            </div>
            {/* Body */}
            <div style={{ flex: 1, overflowY: 'auto', display: expanded ? 'grid' : 'block', gridTemplateColumns: expanded ? '1fr 1fr' : undefined }}>
              <div style={{ padding: '1.5rem', borderRight: expanded ? '1px solid var(--border-color)' : 'none', overflowY: expanded ? 'auto' : undefined }}>
                {leftContent}
              </div>
              {expanded && (
                <div style={{ padding: '1.5rem', overflowY: 'auto' }}>
                  {rightContent}
                </div>
              )}
            </div>
          </>
        );

        return expanded ? (
          /* ── EXPANDED: backdrop is the flex centering container ── */
          <div
            onClick={closeDrawer}
            style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
          >
            <div
              className="animate-fade-in"
              onClick={e => e.stopPropagation()}
              style={{ width: '100%', maxWidth: '1060px', maxHeight: '100%', background: 'white', borderRadius: '16px', display: 'flex', flexDirection: 'column', boxShadow: '0 24px 80px rgba(0,0,0,0.25)', overflow: 'hidden' }}
            >
              {panelInner}
            </div>
          </div>
        ) : (
          /* ── COLLAPSED: side drawer ── */
          <>
            <div onClick={closeDrawer} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', zIndex: 300 }} />
            <div
              className="animate-fade-in"
              style={{ position: 'fixed', top: 0, right: 0, width: '440px', height: '100vh', background: 'white', zIndex: 301, display: 'flex', flexDirection: 'column', boxShadow: '-8px 0 40px rgba(0,0,0,0.12)', overflow: 'hidden' }}
            >
              {panelInner}
            </div>
          </>
        );
      })()}

      <FloatingChat pageContext="Industry Signals" />
    </main>
  );
}
