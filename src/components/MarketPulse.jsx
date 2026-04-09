import React, { useState } from 'react';
import {
  Activity,
  TrendingUp,
  TrendingDown,
  Globe,
  Zap,
  BarChart2,
  Clock
} from 'lucide-react';
import FloatingChat from './FloatingChat';

// ── Sparkline SVG ──────────────────────────────────────────────
function Sparkline({ data, color = '#3b82f6', height = 44, showArea = false }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const W = 100, H = height;
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * W,
    H - 4 - ((v - min) / range) * (H - 8),
  ]);
  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const area = `${line} L${W},${H} L0,${H} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ width: '100%', height: `${H}px` }}>
      {showArea && <path d={area} fill={color} opacity={0.1} />}
      <path d={line} stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Large Area Chart ───────────────────────────────────────────
function AreaChart({ data, color = '#3b82f6', labels = [] }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const W = 400, H = 120;
  const pad = { t: 10, b: 24, l: 8, r: 8 };
  const iW = W - pad.l - pad.r;
  const iH = H - pad.t - pad.b;
  const pts = data.map((v, i) => [
    pad.l + (i / (data.length - 1)) * iW,
    pad.t + iH - ((v - min) / range) * iH,
  ]);
  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const area = `${line} L${(pad.l + iW).toFixed(1)},${pad.t + iH} L${pad.l},${pad.t + iH} Z`;
  const lastPt = pts[pts.length - 1];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ width: '100%', height: '120px' }}>
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0.01" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#areaGrad)" />
      <path d={line} stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Dot at latest point */}
      <circle cx={lastPt[0]} cy={lastPt[1]} r="3.5" fill={color} />
      <circle cx={lastPt[0]} cy={lastPt[1]} r="6" fill={color} opacity="0.2" />
      {/* X-axis labels */}
      {labels.map((lbl, i) => {
        const x = pad.l + (i / (labels.length - 1)) * iW;
        return (
          <text key={i} x={x} y={H - 4} textAnchor="middle" fontSize="8" fill="#9ca3af" fontFamily="Inter, sans-serif">
            {lbl}
          </text>
        );
      })}
    </svg>
  );
}

// ── Data ───────────────────────────────────────────────────────
const SP500_INTRADAY = [5198, 5202, 5195, 5208, 5215, 5210, 5222, 5218, 5230, 5225, 5234, 5228, 5240, 5235, 5244, 5239, 5250, 5245, 5258, 5252, 5260, 5256, 5265, 5260];
const SP500_LABELS = ['09:30', '', '', '10:30', '', '', '11:30', '', '', '12:30', '', '', '13:30', '', '', '14:30', '', '', '15:30', '', '', '16:00'];

const MARKET_SECTIONS = [
  {
    id: 'indices',
    label: 'Global Indices',
    items: [
      { name: 'S&P 500',     value: '5,260.14', change: +1.24, data: [5180,5195,5188,5205,5222,5215,5230,5244,5260], color: '#3b82f6' },
      { name: 'NASDAQ',      value: '16,428.82', change: +1.87, data: [16100,16180,16155,16250,16290,16310,16370,16400,16428], color: '#3b82f6' },
      { name: 'FTSE 100',    value: '7,891.44',  change: -0.34, data: [7930,7918,7924,7908,7900,7912,7904,7897,7891], color: '#ef4444' },
      { name: 'Nikkei 225',  value: '38,647.75', change: +0.68, data: [38400,38440,38420,38490,38510,38480,38550,38610,38647], color: '#3b82f6' },
      { name: 'DAX',         value: '17,932.68', change: +0.52, data: [17820,17850,17840,17870,17890,17875,17905,17920,17932], color: '#3b82f6' },
      { name: 'Hang Seng',   value: '18,204.31', change: -0.91, data: [18400,18360,18340,18310,18290,18270,18250,18225,18204], color: '#ef4444' },
    ],
  },
  {
    id: 'sectors',
    label: 'Sectors',
    items: [
      { name: 'Technology',    value: '+2.41%', change: +2.41, data: [0,0.4,0.3,0.7,0.9,0.8,1.2,1.6,2.41], color: '#3b82f6' },
      { name: 'Energy',        value: '-1.18%', change: -1.18, data: [0,-0.2,-0.4,-0.6,-0.5,-0.8,-1.0,-1.1,-1.18], color: '#ef4444' },
      { name: 'Financials',    value: '+0.87%', change: +0.87, data: [0,0.1,0.2,0.3,0.4,0.5,0.6,0.75,0.87], color: '#3b82f6' },
      { name: 'Healthcare',    value: '+0.34%', change: +0.34, data: [0,0.05,0.1,0.2,0.15,0.25,0.28,0.31,0.34], color: '#3b82f6' },
      { name: 'Consumer',      value: '-0.22%', change: -0.22, data: [0,-0.05,-0.08,-0.1,-0.12,-0.15,-0.18,-0.2,-0.22], color: '#ef4444' },
      { name: 'Materials',     value: '+1.05%', change: +1.05, data: [0,0.15,0.25,0.4,0.55,0.65,0.8,0.92,1.05], color: '#3b82f6' },
    ],
  },
  {
    id: 'commodities',
    label: 'Commodities',
    items: [
      { name: 'Gold',          value: '$2,341.80', change: +0.62, data: [2320,2325,2318,2328,2330,2325,2334,2338,2341], color: '#f59e0b' },
      { name: 'Crude Oil WTI', value: '$78.42',    change: -1.24, data: [79.5,79.2,79.0,78.8,78.6,78.7,78.5,78.45,78.42], color: '#ef4444' },
      { name: 'Natural Gas',   value: '$2.18',     change: -2.15, data: [2.28,2.26,2.24,2.22,2.20,2.21,2.19,2.18,2.18], color: '#ef4444' },
      { name: 'Silver',        value: '$27.64',    change: +1.10, data: [27.2,27.3,27.25,27.35,27.4,27.5,27.55,27.60,27.64], color: '#6b7280' },
      { name: 'Copper',        value: '$4.28/lb',  change: +0.47, data: [4.24,4.25,4.24,4.26,4.27,4.26,4.27,4.27,4.28], color: '#f59e0b' },
      { name: 'Carbon Credits',value: '€68.40',   change: +2.30, data: [65.0,65.5,66.0,66.5,67.0,67.2,67.8,68.1,68.4], color: '#10b981' },
    ],
  },
  {
    id: 'forex',
    label: 'Forex',
    items: [
      { name: 'EUR / USD', value: '1.0842', change: +0.18, data: [1.0820,1.0825,1.0822,1.0828,1.0830,1.0835,1.0838,1.0840,1.0842], color: '#3b82f6' },
      { name: 'GBP / USD', value: '1.2714', change: +0.32, data: [1.2680,1.2688,1.2690,1.2695,1.2700,1.2705,1.2708,1.2711,1.2714], color: '#3b82f6' },
      { name: 'USD / JPY', value: '151.84', change: -0.22, data: [152.10,152.05,152.00,151.95,151.90,151.88,151.86,151.85,151.84], color: '#ef4444' },
      { name: 'AUD / USD', value: '0.6521', change: -0.14, data: [0.6540,0.6535,0.6530,0.6528,0.6525,0.6524,0.6522,0.6521,0.6521], color: '#ef4444' },
      { name: 'USD / CNY', value: '7.2340', change: +0.05, data: [7.2290,7.2300,7.2305,7.2310,7.2315,7.2320,7.2330,7.2335,7.2340], color: '#3b82f6' },
      { name: 'USD / SGD', value: '1.3452', change: -0.08, data: [1.3465,1.3462,1.3460,1.3458,1.3456,1.3455,1.3454,1.3453,1.3452], color: '#ef4444' },
    ],
  },
];

const HERO_STATS = [
  { label: 'S&P 500',  value: '5,260',    change: +1.24 },
  { label: 'NASDAQ',   value: '16,428',   change: +1.87 },
  { label: 'Gold',     value: '$2,341',   change: +0.62 },
  { label: 'EUR/USD',  value: '1.0842',   change: +0.18 },
];

// ── Component ──────────────────────────────────────────────────
export default function MarketPulse() {
  const [activeSection, setActiveSection] = useState('indices');

  const section = MARKET_SECTIONS.find(s => s.id === activeSection);

  return (
    <main className="main-content">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

        {/* Header */}
        <div className="animate-fade-in">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.5rem' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: 0 }}>Market Pulse</h1>
            <span className="badge live" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0284c7', display: 'inline-block' }}></span>
              LIVE
            </span>
          </div>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Real-time market data across indices, sectors, commodities, and forex relevant to your portfolio.
          </p>
        </div>

        {/* Hero stats strip */}
        <div className="animate-fade-in" style={{ display: 'flex', gap: '1rem', animationDelay: '0.05s' }}>
          {HERO_STATS.map((s) => (
            <div key={s.label} className="card" style={{ flex: 1, padding: '1rem 1.25rem', background: 'white' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.375rem' }}>{s.label}</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>{s.value}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: 600, color: s.change >= 0 ? '#10b981' : '#ef4444' }}>
                {s.change >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {s.change >= 0 ? '+' : ''}{s.change}%
              </div>
            </div>
          ))}
        </div>

        {/* Featured Chart — S&P 500 */}
        <div className="card animate-fade-in" style={{ padding: '1.75rem 2rem', background: 'white', animationDelay: '0.1s' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.25rem' }}>
                <h2 style={{ fontSize: '1.1rem', marginBottom: 0 }}>S&amp;P 500 — Intraday</h2>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, background: '#f0fdf4', color: '#16a34a', padding: '2px 8px', borderRadius: '99px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>+1.24%</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={11} /> Updated just now &nbsp;·&nbsp; NYSE
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>5,260.14</div>
              <div style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 600, marginTop: '0.25rem' }}>▲ 64.32 today</div>
            </div>
          </div>
          <AreaChart data={SP500_INTRADAY} color="#3b82f6" labels={SP500_LABELS} />
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
            {[
              { label: 'Open',   val: '5,198.20' },
              { label: 'High',   val: '5,268.90' },
              { label: 'Low',    val: '5,192.40' },
              { label: 'Volume', val: '2.4B' },
            ].map(d => (
              <div key={d.label}>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{d.label}</div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{d.val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Section tabs */}
        <div className="animate-fade-in" style={{ display: 'flex', gap: '0.375rem', animationDelay: '0.15s' }}>
          {MARKET_SECTIONS.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              style={{
                padding: '0.4rem 1rem',
                borderRadius: '999px',
                fontSize: '0.8rem',
                fontWeight: 600,
                border: activeSection === s.id ? '1.5px solid #3b82f6' : '1.5px solid var(--border-color)',
                background: activeSection === s.id ? '#eff6ff' : 'white',
                color: activeSection === s.id ? '#3b82f6' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Section header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <BarChart2 size={16} color="#38bdf8" />
            {section.label}
          </h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Globe size={12} /> Live data
          </span>
        </div>

        {/* Market cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {section.items.map((item, idx) => {
            const isUp = item.change >= 0;
            return (
              <div
                key={item.name}
                className="card animate-fade-in"
                style={{ padding: '1.25rem 1.5rem', background: 'white', animationDelay: `${0.04 * idx}s` }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>{item.name}</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>{item.value}</div>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: isUp ? '#10b981' : '#ef4444',
                    background: isUp ? '#f0fdf4' : '#fef2f2',
                    padding: '4px 8px',
                    borderRadius: '6px',
                  }}>
                    {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {isUp ? '+' : ''}{item.change}%
                  </div>
                </div>
                <Sparkline data={item.data} color={item.color} height={44} showArea={true} />
              </div>
            );
          })}
        </div>

        {/* AI Insight callout */}
        <div className="card animate-fade-in" style={{ background: '#f0f9ff', border: 'none', padding: '1.25rem 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
            <Zap size={14} color="#0284c7" />
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AI Market Insight</span>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#0c4a6e', margin: 0, lineHeight: 1.6 }}>
            Technology sector is leading today's rally, driven by strong AI infrastructure spend signals. Energy weakness is tied to OPEC+ supply guidance. Consider rebalancing APAC exposure — Hang Seng underperformance is diverging from the broader EM trend.
          </p>
        </div>

      </div>
      <FloatingChat pageContext="Market Pulse" />
    </main>
  );
}
