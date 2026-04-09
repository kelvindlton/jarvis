import React from 'react';
import ActionCard from './ActionCard';

export default function MainArea({ onNavigate }) {
  return (
    <main className="main-content">

      <div style={{ marginBottom: '1rem' }}>
        <h1>Good morning, Kelvin</h1>
        <p style={{ fontSize: '1.125rem', maxWidth: '600px', lineHeight: 1.6 }}>
          Systems are nominal. Your industry intelligence environment is ready for today's briefing.
        </p>
      </div>

      <div
        className="hero-card animate-fade-in"
        onClick={() => onNavigate('industry-signals')}
        style={{ cursor: 'pointer' }}
      >
        <div className="hero-content">
          <span className="badge urgent" style={{ marginBottom: '1rem' }}>URGENT</span>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Strategic Market Entry</h2>
          <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
            New indicators suggest a high-probability window for Neo-Tech expansion in the APAC region. Execute Phase 1 Protocol immediately to secure early-mover advantage.
          </p>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button
              className="btn btn-primary"
              onClick={(e) => { e.stopPropagation(); onNavigate('tasks'); }}
            >
              Execute Now
            </button>
            <button
              className="btn"
              style={{ color: 'var(--text-secondary)', background: 'transparent' }}
              onClick={(e) => { e.stopPropagation(); onNavigate('industry-signals'); }}
            >
              View Data Source
            </button>
          </div>
        </div>
        <div className="hero-graphic">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <path className="wave-line" d="M10 60 C 35 10, 85 110, 110 60" />
            <circle cx="10" cy="60" r="3" fill="#3b82f6" />
            <circle cx="110" cy="60" r="3" fill="#3b82f6" />
          </svg>
        </div>
      </div>

      <div className="priority-actions animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="section-title">
          <h3>
            <span style={{ color: '#38bdf8', fontSize: '1.1rem', fontWeight: 800 }}>!</span> Top Priority Actions
          </h3>
          <span className="count">3 CRITICAL ITEMS</span>
        </div>

        <ActionCard
          title="Adjust Pricing Model"
          description="New Section 4 regulations detected for EMEA. Immediate adjustment advised to maintain a 15% margin compliance."
          impact="HIGH IMPACT"
          impactType="urgent"
          time="Detected 2h ago"
          buttonText="Review Guidance"
          buttonType="primary"
          imageSrc="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=400&auto=format&fit=crop"
          onClick={() => onNavigate('tasks')}
          onButtonClick={() => onNavigate('tasks')}
        />

        <ActionCard
          title="Supply Chain Diversification"
          description="Logistic delays in SE Asia routes projected to increase by 22% in Q4. Recommend pivoting 30% volume to local hubs."
          impact="MEDIUM IMPACT"
          impactType="medium"
          time="Detected 5h ago"
          buttonText="View Alternatives"
          buttonType="dark"
          imageSrc="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=400&auto=format&fit=crop"
          onClick={() => onNavigate('tasks')}
          onButtonClick={() => onNavigate('tasks')}
        />
      </div>

    </main>
  );
}
