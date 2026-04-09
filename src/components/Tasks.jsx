import React, { useState } from 'react';
import { Check, X, RotateCcw, Zap } from 'lucide-react';
import FloatingChat from './FloatingChat';

function AcceptModal({ task, onConfirm, onClose }) {
  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}
    >
      <div
        className="animate-fade-in"
        onClick={e => e.stopPropagation()}
        style={{ width: '100%', maxWidth: '520px', background: 'white', borderRadius: '16px', boxShadow: '0 24px 60px rgba(0,0,0,0.18)', overflow: 'hidden' }}
      >
        {/* Header */}
        <div style={{ padding: '1.375rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.375rem' }}>
              <Zap size={13} color="#3b82f6" />
              <span style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#3b82f6' }}>AI Briefing</span>
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.35 }}>{task.title}</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '2px', flexShrink: 0, display: 'flex' }}>
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '1.375rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', maxHeight: '60vh', overflowY: 'auto' }}>
          {/* Analysis */}
          <div>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Analysis
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>{task.aiAnalysis}</p>
          </div>

          {/* Steps */}
          {task.steps?.length > 0 && (
            <div>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                Recommended Steps
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {task.steps.map((step, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#111827', color: 'white', fontSize: '0.62rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                      {i + 1}
                    </span>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={onConfirm} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Check size={13} /> Confirm & Accept
          </button>
        </div>
      </div>
    </div>
  );
}

function CompleteModal({ task, onConfirm, onClose }) {
  const [checked, setChecked] = useState(() => (task.steps || []).map(() => false));
  const allChecked = checked.every(Boolean);

  const toggle = (i) => setChecked(prev => prev.map((v, idx) => idx === i ? !v : v));

  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}
    >
      <div
        className="animate-fade-in"
        onClick={e => e.stopPropagation()}
        style={{ width: '100%', maxWidth: '520px', background: 'white', borderRadius: '16px', boxShadow: '0 24px 60px rgba(0,0,0,0.18)', overflow: 'hidden' }}
      >
        {/* Header */}
        <div style={{ padding: '1.375rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.375rem' }}>
              <Check size={13} color="#10b981" />
              <span style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#10b981' }}>Complete Task</span>
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.35 }}>{task.title}</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '2px', flexShrink: 0, display: 'flex' }}>
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '1.375rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', maxHeight: '60vh', overflowY: 'auto' }}>
          <div>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              Confirm all steps completed
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {(task.steps || []).map((step, i) => (
                <label
                  key={i}
                  onClick={() => toggle(i)}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer', userSelect: 'none' }}
                >
                  <span style={{
                    width: '18px', height: '18px', borderRadius: '4px', flexShrink: 0, marginTop: '1px',
                    border: checked[i] ? 'none' : '1.5px solid #d1d5db',
                    background: checked[i] ? '#111827' : 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.15s ease',
                  }}>
                    {checked[i] && <Check size={11} color="white" strokeWidth={3} />}
                  </span>
                  <span style={{
                    fontSize: '0.875rem', lineHeight: 1.5,
                    color: checked[i] ? 'var(--text-muted)' : 'var(--text-primary)',
                    textDecoration: checked[i] ? 'line-through' : 'none',
                    transition: 'all 0.15s ease',
                  }}>
                    {step}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button
            className="btn btn-primary"
            onClick={onConfirm}
            disabled={!allChecked}
            style={{ display: 'flex', alignItems: 'center', gap: '5px', opacity: allChecked ? 1 : 0.4, cursor: allChecked ? 'pointer' : 'not-allowed' }}
          >
            <Check size={13} /> Mark Complete
          </button>
        </div>
      </div>
    </div>
  );
}

export const INITIAL_TASKS = [
  {
    id: 1,
    title: 'Adjust Pricing Model — EMEA',
    description: 'New Section 4 regulations detected for EMEA. Immediate adjustment advised to maintain a 15% margin compliance across affected product lines.',
    category: 'Regulatory',
    priority: 'urgent',
    status: 'pending',
    source: 'EMEA Regulatory Signal',
    detected: '2 hours ago',
    deadline: '48 hours',
    confidence: 94,
    impact: 'HIGH IMPACT',
    impactType: 'urgent',
    aiAnalysis: 'Failure to act within 48 hours risks a 15% revenue penalty on EMEA contracts. Three competitors have already adjusted. Recommend immediate legal review followed by pricing system update.',
    steps: ['Audit affected EMEA product lines', 'Engage legal for Section 4 compliance review', 'Update pricing engine with compliant rates', 'Notify EMEA sales team'],
  },
  {
    id: 2,
    title: 'Supply Chain Diversification — SE Asia',
    description: 'Logistic delays in SE Asia routes projected to increase by 22% in Q4. Recommend pivoting 30% volume to local hubs to maintain delivery SLAs.',
    category: 'Supply Chain',
    priority: 'medium',
    status: 'pending',
    source: 'Port Congestion Signal · Tanjung Pelepas',
    detected: '5 hours ago',
    deadline: '2 weeks',
    confidence: 81,
    impact: 'MEDIUM IMPACT',
    impactType: 'medium',
    aiAnalysis: 'Congestion at Tanjung Pelepas is worsening. Historical data suggests a 6–9 day delay spike. Rerouting 30% of volume to Singapore terminals reduces risk exposure by ~$2.1M in Q4.',
    steps: ['Identify alternative Singapore hub capacity', 'Negotiate spot rates with 2 backup carriers', 'Notify procurement of new routing plan', 'Monitor Tanjung Pelepas congestion weekly'],
  },
  {
    id: 3,
    title: 'Semiconductor Forward Contract',
    description: 'Secure forward contracts on critical 3nm–5nm chip categories within 48 hours. Early-mover advantage estimated at 12–15% cost reduction vs spot price.',
    category: 'Strategic',
    priority: 'urgent',
    status: 'pending',
    source: 'Semiconductor Allocation Spike',
    detected: '2 minutes ago',
    deadline: '48 hours',
    confidence: 88,
    impact: 'HIGH IMPACT',
    impactType: 'urgent',
    aiAnalysis: 'Foundry allocation requests up 34%. Spot prices have risen 18% week-over-week. Three hyperscalers are locking in Q3–Q4 supply now. A 48-hour window exists before pricing moves further.',
    steps: ['Identify chip SKUs requiring forward cover', 'Contact preferred foundry allocation team', 'Negotiate 90-day forward contract', 'Route for CFO approval'],
  },
  {
    id: 4,
    title: 'APAC Market Entry — Phase 1 Protocol',
    description: 'High-probability window for Neo-Tech expansion in the APAC region. Execute Phase 1 go-to-market protocol to secure early-mover advantage.',
    category: 'Strategic',
    priority: 'urgent',
    status: 'pending',
    source: 'Strategic Market Intelligence',
    detected: '1 day ago',
    deadline: '5 days',
    confidence: 91,
    impact: 'HIGH IMPACT',
    impactType: 'urgent',
    aiAnalysis: 'APAC macro indicators align with expansion thesis: consumer confidence up 8%, competitor activity low, regulatory window open. Phase 1 estimated cost: $1.2M. Projected 18-month ROI: 340%.',
    steps: ['Finalize legal entity structure in target APAC markets', 'Appoint regional lead', 'Establish local banking relationships', 'Soft-launch product with beta partners'],
  },
  {
    id: 5,
    title: 'Rare Earth Supplier Diversification',
    description: 'Diversify sourcing to North American and African suppliers ahead of the APAC tariff adjustment. Estimated 8-week lead time for qualification.',
    category: 'Supply Chain',
    priority: 'urgent',
    status: 'accepted',
    source: 'Rare Earth Tariff Signal · APAC',
    detected: '1 hour ago',
    deadline: '8 weeks',
    confidence: 86,
    impact: 'HIGH IMPACT',
    impactType: 'urgent',
    aiAnalysis: 'A 22% tariff increase on APAC rare earth exports takes effect next quarter. Qualifying NA/African suppliers now avoids a projected $4.8M cost increase in H2. Lead time is 8 weeks minimum.',
    steps: ['RFQ to 3 North American rare earth suppliers', 'Initiate qualification audit process', 'Negotiate pricing and volume commitments', 'Transition 40% volume by end of quarter'],
  },
  {
    id: 6,
    title: 'Carbon Credit Forward Position',
    description: 'Lock in forward carbon credit positions at current €68.40/tonne. Delay projected to cost an additional €2.1M per 100k tonnes as EU ETS auction supply tightens.',
    category: 'Regulatory',
    priority: 'medium',
    status: 'completed',
    source: 'Carbon Credit Market Signal · EMEA',
    detected: '8 hours ago',
    deadline: 'Completed',
    confidence: 79,
    impact: 'MEDIUM IMPACT',
    impactType: 'medium',
    aiAnalysis: 'EU ETS auction supply tightening. Forward curve suggests 11% price increase QoQ. Locking at current prices secures €2.1M savings per 100k tonnes vs projected Q4 spot.',
    steps: ['Engage carbon desk for forward pricing', 'Execute forward contract at €68.40/t', 'Book hedge in compliance system'],
  },
];

const TABS = [
  { id: 'all',       label: 'All'       },
  { id: 'pending',   label: 'Pending'   },
  { id: 'accepted',  label: 'Accepted'  },
  { id: 'completed', label: 'Completed' },
  { id: 'declined',  label: 'Declined'  },
];

const STATUS_DOT = {
  'pending':   '#f97316',
  'accepted':  '#3b82f6',
  'completed': '#10b981',
  'declined':  '#9ca3af',
};

const STATUS_LABEL = {
  'pending':   'Pending',
  'accepted':  'Accepted',
  'completed': 'Completed',
  'declined':  'Declined',
};

const PRIORITY_DOT = {
  urgent: '#ef4444',
  medium: '#f97316',
  low:    '#10b981',
};

export default function Tasks({ tasks, setTasks }) {
  const [activeTab, setActiveTab]         = useState('all');
  const [acceptingTask, setAcceptingTask] = useState(null);
  const [completingTask, setCompletingTask] = useState(null);

  const update  = (id, patch) => setTasks(prev => prev.map(t => t.id === id ? { ...t, ...patch } : t));
  const accept  = (id) => update(id, { status: 'accepted'  });
  const decline = (id) => update(id, { status: 'declined'  });
  const complete= (id) => update(id, { status: 'completed' });
  const restore = (id) => update(id, { status: 'pending'   });

  const displayed = tasks.filter(t => activeTab === 'all' || t.status === activeTab);
  const counts    = TABS.reduce((acc, s) => {
    acc[s.id] = s.id === 'all' ? tasks.length : tasks.filter(t => t.status === s.id).length;
    return acc;
  }, {});

  return (
    <main className="main-content">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '760px' }}>

        {/* Header */}
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 800, marginBottom: '0.375rem' }}>Tasks</h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: 0 }}>
            AI-recommended actions from your latest intelligence signals.
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0', borderBottom: '2px solid var(--border-color)' }}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.5rem 1rem', background: 'none', border: 'none',
                borderBottom: activeTab === tab.id ? '2px solid #111827' : '2px solid transparent',
                marginBottom: '-2px',
                fontSize: '0.85rem', fontWeight: activeTab === tab.id ? 700 : 500,
                color: activeTab === tab.id ? 'var(--text-primary)' : 'var(--text-muted)',
                cursor: 'pointer', transition: 'all 0.15s ease', whiteSpace: 'nowrap',
                display: 'flex', alignItems: 'center', gap: '6px',
              }}
            >
              {tab.label}
              {counts[tab.id] > 0 && (
                <span style={{
                  fontSize: '0.65rem', fontWeight: 700, background: activeTab === tab.id ? '#111827' : '#f3f4f6',
                  color: activeTab === tab.id ? 'white' : 'var(--text-muted)',
                  padding: '1px 6px', borderRadius: '99px',
                }}>
                  {counts[tab.id]}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Task list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {displayed.length === 0 && (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', padding: '2rem 0' }}>No tasks here.</p>
          )}

          {displayed.map((task, idx) => {
            return (
              <div
                key={task.id}
                className="animate-fade-in"
                style={{ borderBottom: '1px solid var(--border-color)', animationDelay: `${0.04 * idx}s` }}
              >
                {/* Main row */}
                <div style={{ padding: '1.25rem 0', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>

                  {/* Title row */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: 0 }}>
                      {/* Priority dot */}
                      <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: PRIORITY_DOT[task.priority] || '#9ca3af', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                        {task.title}
                      </span>
                    </div>
                    {/* Status */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0 }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: STATUS_DOT[task.status] }} />
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                        {STATUS_LABEL[task.status]}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0, paddingLeft: '15px' }}>
                    {task.description}
                  </p>

                  {/* Meta + actions row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: '15px', flexWrap: 'wrap', gap: '0.75rem' }}>
                    {/* Meta */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{task.category}</span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Deadline: {task.deadline}</span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{task.confidence}% confidence</span>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {task.status === 'pending' && (
                        <>
                          <button onClick={() => setAcceptingTask(task)} style={btnStyle('#111827', 'white')}>Accept</button>
                          <button onClick={() => decline(task.id)} style={btnStyle('transparent', 'var(--text-muted)', true)}>Decline</button>
                        </>
                      )}
                      {task.status === 'accepted' && (
                        <>
                          <button onClick={() => setCompletingTask(task)} style={btnStyle('#111827', 'white')}>
                            <Check size={12} /> Mark Complete
                          </button>
                          <button onClick={() => decline(task.id)} style={btnStyle('transparent', 'var(--text-muted)', true)}>Cancel</button>
                        </>
                      )}
                      {task.status === 'declined' && (
                        <button onClick={() => restore(task.id)} style={{ ...ghostBtn, display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <RotateCcw size={12} /> Restore
                        </button>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
      {acceptingTask && (
        <AcceptModal
          task={acceptingTask}
          onConfirm={() => { accept(acceptingTask.id); setAcceptingTask(null); }}
          onClose={() => setAcceptingTask(null)}
        />
      )}
      {completingTask && (
        <CompleteModal
          task={completingTask}
          onConfirm={() => { complete(completingTask.id); setCompletingTask(null); }}
          onClose={() => setCompletingTask(null)}
        />
      )}
      <FloatingChat pageContext="Tasks" />
    </main>
  );
}

const btnStyle = (bg, color, ghost = false) => ({
  padding: '0.3rem 0.875rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 600,
  background: bg, color, border: ghost ? '1px solid var(--border-color)' : 'none',
  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px',
});

const ghostBtn = {
  background: 'none', border: 'none', cursor: 'pointer',
  color: 'var(--text-muted)', padding: '4px', display: 'flex', alignItems: 'center',
};
