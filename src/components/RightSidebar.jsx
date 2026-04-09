import React, { useState } from 'react';
import { Heart, Activity as TrendingUp, RefreshCw } from 'lucide-react';

export default function RightSidebar({ onNavigate }) {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  return (
    <aside className="right-panel">
      <div className="animate-fade-in" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: '#0ea5e9', fontWeight: 500 }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0ea5e9' }}></div>
          Live system
        </div>
        <button
          className="btn btn-primary"
          onClick={handleRefresh}
          disabled={refreshing}
          style={{ borderRadius: '99px', padding: '0.4rem 1.25rem', display: 'flex', alignItems: 'center', gap: '5px', opacity: refreshing ? 0.75 : 1 }}
        >
          <RefreshCw size={13} style={{ animation: refreshing ? 'spin 0.8s linear infinite' : 'none' }} />
          {refreshing ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>

      <div className="card animate-fade-in" style={{ padding: '1.5rem', background: '#f0f9ff', border: 'none', animationDelay: '0.1s' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: '#0f172a' }}>
            <Heart size={18} color="#0ea5e9" />
            Confidence
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0ea5e9' }}>88%</div>
        </div>
        <div style={{ height: '4px', background: '#cbd5e1', borderRadius: '4px', overflow: 'hidden', marginBottom: '0.5rem' }}>
          <div style={{ width: '88%', height: '100%', background: 'linear-gradient(90deg, #0ea5e9, #38bdf8)' }}></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600 }}>
          <span>OSV</span>
          <span>OTR</span>
        </div>
      </div>

      <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: '1rem' }}>Quick Signals</h3>
        
        <div
          className="card"
          onClick={() => onNavigate && onNavigate('industry-signals')}
          style={{ padding: '1.25rem', background: '#f0f9ff', border: 'none', marginBottom: '1rem', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: '0.875rem', color: '#0f172a' }}>
              <TrendingUp size={16} color="#0ea5e9" />
              Industry Signals
            </div>
            <span className="badge live">Live</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ position: 'relative', paddingLeft: '1rem' }}>
              <div style={{ position: 'absolute', left: 0, top: '6px', width: '4px', height: '4px', background: '#0ea5e9', borderRadius: '50%' }}></div>
              <div style={{ fontSize: '0.875rem', fontWeight: 500, color: '#0f172a', marginBottom: '0.25rem' }}>Semiconductor allocation spike</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>2 minutes ago • Global</div>
            </div>
            
            <div style={{ position: 'relative', paddingLeft: '1rem' }}>
              <div style={{ position: 'absolute', left: 0, top: '6px', width: '4px', height: '4px', background: '#c084fc', borderRadius: '50%' }}></div>
              <div style={{ fontSize: '0.875rem', fontWeight: 500, color: '#0f172a', marginBottom: '0.25rem' }}>Rare earth tariff adjustment</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>1 hour ago • APAC</div>
            </div>
          </div>
        </div>

        <div className="card animate-fade-in" onClick={() => onNavigate && onNavigate('market-pulse')} style={{ padding: '1.5rem', background: '#f0f9ff', border: 'none', animationDelay: '0.3s', cursor: 'pointer' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: '0.875rem', color: '#0f172a', marginBottom: '1.5rem' }}>
              <TrendingUp size={16} color="#0ea5e9" />
              Market Pulse
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Tech Stocks</span>
                <span style={{ color: '#10b981', fontWeight: 600 }}>+2.4%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Crude Oil</span>
                <span style={{ color: '#ef4444', fontWeight: 600 }}>-1.2%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Carbon Credits</span>
                <span style={{ color: '#10b981', fontWeight: 600 }}>+0.8%</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '60px', marginBottom: '0.5rem', gap: '4px' }}>
              <div style={{ width: '16%', height: '30%', background: '#bae6fd', borderRadius: '2px 2px 0 0' }}></div>
              <div style={{ width: '16%', height: '45%', background: '#bae6fd', borderRadius: '2px 2px 0 0' }}></div>
              <div style={{ width: '16%', height: '60%', background: '#7dd3fc', borderRadius: '2px 2px 0 0' }}></div>
              <div style={{ width: '16%', height: '80%', background: '#38bdf8', borderRadius: '2px 2px 0 0' }}></div>
              <div style={{ width: '16%', height: '65%', background: '#38bdf8', borderRadius: '2px 2px 0 0' }}></div>
              <div style={{ width: '16%', height: '100%', background: '#0ea5e9', borderRadius: '2px 2px 0 0' }}></div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              <span>08:00</span>
              <span>12:00</span>
              <span>16:00</span>
            </div>
        </div>
      </div>
    </aside>
  );
}
