import React, { useState } from 'react';
import {
  Bell,
  BellOff,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Users,
  BookOpen,
  CheckSquare,
  Radio,
  Zap,
  Trash2,
  Filter,
  Clock,
  ChevronRight,
  X,
} from 'lucide-react';
import FloatingChat from './FloatingChat';

const ALL_NOTIFICATIONS = [
  {
    id: 1,
    type: 'signal',
    priority: 'urgent',
    title: 'Semiconductor Allocation Spike',
    body: 'Leading foundries report a 34% surge in allocation requests. Spot prices up 18% week-over-week. Action recommended within 48 hours.',
    time: '2 min ago',
    read: false,
    actionLabel: 'View Signal',
    page: 'industry-signals',
  },
  {
    id: 2,
    type: 'following',
    priority: 'normal',
    title: 'Sarah Chen co-led $120M Series B',
    body: 'QuantumBase round values company at $680M. Overlaps with your Neo-Tech infrastructure roadmap — outreach opportunity flagged.',
    time: '18 min ago',
    read: false,
    actionLabel: 'View Activity',
    page: 'following',
  },
  {
    id: 3,
    type: 'task',
    priority: 'urgent',
    title: 'Task overdue: Adjust Pricing Model',
    body: 'EMEA regulatory adjustment flagged 2 hours ago. This task has not been reviewed. Compliance window is narrowing.',
    time: '1 hour ago',
    read: false,
    actionLabel: 'Open Task',
    page: 'tasks',
  },
  {
    id: 4,
    type: 'market',
    priority: 'medium',
    title: 'Carbon Credit prices hit 6-month high',
    body: 'EU ETS prices reached €68.40/tonne. Forward pricing climbed 11% QoQ. Locking positions now projected to save €2.1M per 100k tonnes.',
    time: '2 hours ago',
    read: false,
    actionLabel: 'View Market',
    page: 'market-pulse',
  },
  {
    id: 5,
    type: 'learning',
    priority: 'normal',
    title: 'Course progress: 42% on Corporate Strategy',
    body: 'You\'re ahead of your weekly target. 3 more modules to unlock your next skill level assessment in Strategic Analysis.',
    time: '3 hours ago',
    read: true,
    actionLabel: 'Continue Course',
    page: 'learning',
  },
  {
    id: 6,
    type: 'signal',
    priority: 'medium',
    title: 'AI Chip Export Restriction Expanded',
    body: 'US Commerce extends H100-class GPU controls. Compliance window is 60 days. Inventory audit recommended immediately.',
    time: '5 hours ago',
    read: true,
    actionLabel: 'View Signal',
    page: 'industry-signals',
  },
  {
    id: 7,
    type: 'following',
    priority: 'normal',
    title: 'Marcus Webb keynoting at TechFuture Summit',
    body: 'Confirmed for Singapore, April 14–16. Topic: "The Industrialisation of AI Inference." Relevant to your Q2 competitive briefing.',
    time: '1 day ago',
    read: true,
    actionLabel: 'View Activity',
    page: 'following',
  },
  {
    id: 8,
    type: 'task',
    priority: 'normal',
    title: 'Task accepted: Supply Chain Diversification',
    body: 'You accepted the supply chain pivot recommendation. Jarvis has added 3 follow-up actions to your task queue.',
    time: '1 day ago',
    read: true,
    actionLabel: 'Open Tasks',
    page: 'tasks',
  },
  {
    id: 9,
    type: 'market',
    priority: 'normal',
    title: 'Tech Stocks up 2.4% — NASDAQ session close',
    body: 'AI infrastructure sector led gains. Semiconductor index up 3.1%. Your tracked tickers are outperforming index by 0.6%.',
    time: '1 day ago',
    read: true,
    actionLabel: 'View Market',
    page: 'market-pulse',
  },
  {
    id: 10,
    type: 'learning',
    priority: 'normal',
    title: 'New skill assessment available: Negotiation',
    body: 'Based on your upcoming vendor renewals, Jarvis recommends completing the Negotiation assessment before April 10.',
    time: '2 days ago',
    read: true,
    actionLabel: 'Start Assessment',
    page: 'learning',
  },
];

const TYPE_CONFIG = {
  signal:    { icon: <Radio size={15} />,        color: '#6b7280', bg: '#f3f4f6', label: 'Signal'    },
  following: { icon: <Users size={15} />,        color: '#6b7280', bg: '#f3f4f6', label: 'Following' },
  task:      { icon: <CheckSquare size={15} />,  color: '#6b7280', bg: '#f3f4f6', label: 'Task'      },
  market:    { icon: <TrendingUp size={15} />,   color: '#6b7280', bg: '#f3f4f6', label: 'Market'    },
  learning:  { icon: <BookOpen size={15} />,     color: '#6b7280', bg: '#f3f4f6', label: 'Learning'  },
};

const PRIORITY_BADGE = {
  urgent: { bg: '#fee2e2', text: '#ef4444', label: 'URGENT' },
  medium: { bg: '#f3f4f6', text: '#6b7280', label: 'MEDIUM' },
  normal: null,
};

const FILTERS = ['All', 'Unread', 'Signal', 'Following', 'Task', 'Market', 'Learning'];

export default function Notifications({ onNavigate }) {
  const [notifications, setNotifications] = useState(ALL_NOTIFICATIONS);
  const [activeFilter, setActiveFilter] = useState('All');

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const markRead = (id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const dismiss = (id) => setNotifications(prev => prev.filter(n => n.id !== id));
  const clearAll = () => setNotifications([]);

  const visible = notifications.filter(n => {
    if (activeFilter === 'Unread') return !n.read;
    if (activeFilter === 'All') return true;
    return n.type === activeFilter.toLowerCase();
  });

  return (
    <main className="main-content">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

        {/* Header */}
        <div className="animate-fade-in" style={{ marginBottom: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.5rem' }}>
              <h1 style={{ fontSize: '2rem', marginBottom: 0 }}>Notifications</h1>
              {unreadCount > 0 && (
                <span style={{ background: '#ef4444', color: 'white', fontSize: '0.75rem', fontWeight: 700, padding: '2px 8px', borderRadius: '99px' }}>
                  {unreadCount} new
                </span>
              )}
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="btn"
                  style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '5px', color: '#0284c7', border: '1.5px solid #bae6fd', background: 'white' }}
                >
                  <CheckCircle size={13} /> Mark all read
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={clearAll}
                  className="btn"
                  style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-muted)', border: '1.5px solid var(--border-color)', background: 'white' }}
                >
                  <Trash2 size={13} /> Clear all
                </button>
              )}
            </div>
          </div>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '560px', lineHeight: 1.5 }}>
            All alerts, updates, and intelligence from across your Jarvis workspace.
          </p>
        </div>

        {/* Stats row */}
        <div className="animate-fade-in" style={{ display: 'flex', gap: '1rem', animationDelay: '0.05s' }}>
          {[
            { label: 'Unread',        value: unreadCount,                                           icon: <Bell size={16} color="#ef4444" />,      bg: '#fee2e2', color: '#ef4444' },
            { label: 'Signals',       value: notifications.filter(n => n.type === 'signal').length,  icon: <Radio size={16} color="#0284c7" />,     bg: '#f0f9ff', color: '#0284c7' },
            { label: 'Tasks',         value: notifications.filter(n => n.type === 'task').length,    icon: <CheckSquare size={16} color="#16a34a" />,bg: '#f0fdf4', color: '#16a34a' },
            { label: 'Following',     value: notifications.filter(n => n.type === 'following').length,icon: <Users size={16} color="#9333ea" />,     bg: '#fdf4ff', color: '#9333ea' },
          ].map(stat => (
            <div key={stat.label} className="card" style={{ flex: 1, padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '10px', background: 'white' }}>
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

        {/* Filter tabs */}
        <div className="animate-fade-in" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', animationDelay: '0.08s' }}>
          <Filter size={14} color="var(--text-muted)" style={{ flexShrink: 0 }} />
          <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  padding: '0.375rem 0.875rem',
                  borderRadius: '999px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  border: activeFilter === f ? '1.5px solid #3b82f6' : '1.5px solid var(--border-color)',
                  background: activeFilter === f ? '#eff6ff' : 'white',
                  color: activeFilter === f ? '#3b82f6' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {f}
                {f === 'Unread' && unreadCount > 0 && (
                  <span style={{ marginLeft: '5px', background: '#ef4444', color: 'white', fontSize: '0.6rem', fontWeight: 700, padding: '1px 5px', borderRadius: '99px' }}>
                    {unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Notification list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {visible.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '3.5rem', color: 'var(--text-muted)', borderRadius: '14px' }}>
              <BellOff size={32} style={{ marginBottom: '0.75rem', opacity: 0.4 }} />
              <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>All caught up</div>
              <div style={{ fontSize: '0.85rem' }}>No notifications in this category.</div>
            </div>
          ) : (
            visible.map((n, idx) => {
              const cfg = TYPE_CONFIG[n.type];
              const priority = PRIORITY_BADGE[n.priority];
              return (
                <div
                  key={n.id}
                  className="animate-fade-in"
                  onClick={() => markRead(n.id)}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    padding: '1.25rem 1.375rem',
                    background: 'white',
                    borderRadius: '14px',
                    border: '1px solid var(--border-color)',
                    borderLeft: n.read ? '1px solid var(--border-color)' : '4px solid #111827',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                    cursor: 'pointer',
                    transition: 'box-shadow 0.15s, background 0.15s',
                    animationDelay: `${0.04 * idx}s`,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.08)'; e.currentTarget.style.background = '#f8fafc'; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)'; e.currentTarget.style.background = 'white'; }}
                >
                  {/* Type icon */}
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: cfg.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: cfg.color, marginTop: '2px' }}>
                    {cfg.icon}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.3rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '7px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.65rem', fontWeight: 700, padding: '2px 7px', borderRadius: '99px', background: cfg.bg, color: cfg.color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          {cfg.label}
                        </span>
                        {priority && (
                          <span style={{ fontSize: '0.65rem', fontWeight: 700, padding: '2px 7px', borderRadius: '99px', background: priority.bg, color: priority.text, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            {priority.label}
                          </span>
                        )}
                        {!n.read && (
                          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#111827', display: 'inline-block', flexShrink: 0 }} />
                        )}
                      </div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap', flexShrink: 0 }}>
                        <Clock size={11} /> {n.time}
                      </span>
                    </div>

                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
                      {n.title}
                    </div>
                    <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: '0 0 0.625rem 0' }}>
                      {n.body}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <button
                        onClick={(e) => { e.stopPropagation(); markRead(n.id); onNavigate && onNavigate(n.page); }}
                        style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', fontWeight: 600, color: '#3b82f6', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                      >
                        {n.actionLabel} <ChevronRight size={12} />
                      </button>
                    </div>
                  </div>

                  {/* Dismiss */}
                  <button
                    onClick={(e) => { e.stopPropagation(); dismiss(n.id); }}
                    title="Dismiss"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px', display: 'flex', alignItems: 'flex-start', flexShrink: 0, opacity: 0.6 }}
                  >
                    <X size={14} />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>

      <FloatingChat pageContext="Notifications" />
    </main>
  );
}
