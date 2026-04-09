import React, { useState } from 'react';
import {
  Users,
  Rocket,
  Briefcase,
  Mic,
  TrendingUp,
  FileText,
  Bell,
  BellOff,
  Plus,
  Clock,
  Search,
  Zap,
  Building2,
  Star,
  X,
  UserMinus,
  CheckCircle2,
} from 'lucide-react';
import FloatingChat from './FloatingChat';

const PROFILES = [
  {
    id: 1,
    name: 'Sarah Chen',
    title: 'Partner',
    company: 'Sequoia Capital',
    avatar: 'https://i.pravatar.cc/150?img=47',
    tags: ['Mentor', 'VC'],
    notificationsOn: true,
    sector: 'Venture Capital',
  },
  {
    id: 2,
    name: 'Marcus Webb',
    title: 'CEO',
    company: 'NovaTech Systems',
    avatar: 'https://i.pravatar.cc/150?img=12',
    tags: ['Tech', 'AI'],
    notificationsOn: true,
    sector: 'Deep Tech',
  },
  {
    id: 3,
    name: 'Priya Nair',
    title: 'VP Strategy',
    company: 'BlackRock',
    avatar: 'https://i.pravatar.cc/150?img=25',
    tags: ['Mentor', 'Finance'],
    notificationsOn: false,
    sector: 'Asset Management',
  },
  {
    id: 4,
    name: 'James Okafor',
    title: 'Founder & CTO',
    company: 'Logix AI',
    avatar: 'https://i.pravatar.cc/150?img=8',
    tags: ['Startup', 'AI'],
    notificationsOn: true,
    sector: 'AI / ML',
  },
  {
    id: 5,
    name: 'Amara Diallo',
    title: 'Director',
    company: 'McKinsey & Co.',
    avatar: 'https://i.pravatar.cc/150?img=32',
    tags: ['Mentor', 'Strategy'],
    notificationsOn: false,
    sector: 'Consulting',
  },
];

const ACTIVITY_FEED = [
  {
    id: 1,
    profileId: 1,
    type: 'Funding',
    title: 'Co-led $120M Series B for QuantumBase',
    description:
      'Sarah co-led the $120M Series B round for QuantumBase, a quantum-as-a-service startup targeting enterprise infrastructure. Round values company at $680M.',
    time: '18 minutes ago',
    aiNote: "QuantumBase overlaps with Neo-Tech's infrastructure roadmap. Consider outreach to explore partnership.",
  },
  {
    id: 2,
    profileId: 2,
    type: 'Product Launch',
    title: 'NovaTech launches EdgeCore v3 platform',
    description:
      'NovaTech Systems released EdgeCore v3, featuring on-device LLM inference for industrial IoT. Claims 4× throughput improvement over v2. Beta access now open.',
    time: '2 hours ago',
    aiNote: 'EdgeCore v3 directly competes with your Q4 product roadmap. Benchmark comparison recommended.',
  },
  {
    id: 3,
    profileId: 4,
    type: 'Publication',
    title: 'New paper: "Sparse Attention at Scale" co-authored by James',
    description:
      'James Okafor and the Logix AI research team published findings on sparse attention mechanisms reducing inference cost by 38% without accuracy loss.',
    time: '5 hours ago',
    aiNote: null,
  },
  {
    id: 4,
    profileId: 3,
    type: 'Career Move',
    title: 'Priya Nair promoted to Global Head of Strategy',
    description:
      'Priya has been elevated from VP to Global Head of Strategy at BlackRock, overseeing a $2.3T AUM strategy division across 14 markets.',
    time: '1 day ago',
    aiNote: "Priya's expanded mandate increases her relevance to your APAC market entry strategy. Good time to reconnect.",
  },
  {
    id: 5,
    profileId: 2,
    type: 'Speaking',
    title: 'Marcus keynoting at TechFuture Summit 2026',
    description:
      'Marcus Webb confirmed as keynote speaker at TechFuture Summit in Singapore (April 14–16). Topic: "The Industrialisation of AI Inference."',
    time: '1 day ago',
    aiNote: null,
  },
  {
    id: 6,
    profileId: 5,
    type: 'Update',
    title: 'Amara publishes "The Strategy Paradox of 2026" report',
    description:
      "McKinsey published Amara's flagship annual strategy report, identifying over-reliance on historical data models as the #1 risk factor for enterprise strategy teams this year.",
    time: '2 days ago',
    aiNote: 'Findings in section 4 are directly applicable to your pricing model review. Briefing queued.',
  },
];

const SUGGESTED_PROFILES = [
  {
    id: 'suggested-1',
    name: 'Ren Liu',
    title: 'CTO',
    company: 'Anthropic',
    avatar: 'https://i.pravatar.cc/150?img=56',
    tags: ['Tech', 'AI'],
    notificationsOn: true,
    sector: 'AI / ML',
  },
  {
    id: 'suggested-2',
    name: 'Fatima Al-Sayed',
    title: 'General Partner',
    company: 'a16z',
    avatar: 'https://i.pravatar.cc/150?img=44',
    tags: ['VC'],
    notificationsOn: true,
    sector: 'Venture Capital',
  },
];

const TYPE_STYLES = {
  'Funding':       { bg: '#f0fdf4', text: '#16a34a', icon: <TrendingUp size={12} /> },
  'Product Launch':{ bg: '#eff6ff', text: '#3b82f6', icon: <Rocket size={12} /> },
  'Career Move':   { bg: '#fdf4ff', text: '#9333ea', icon: <Briefcase size={12} /> },
  'Speaking':      { bg: '#fff7ed', text: '#ea580c', icon: <Mic size={12} /> },
  'Publication':   { bg: '#f8fafc', text: '#64748b', icon: <FileText size={12} /> },
  'Update':        { bg: '#fef9c3', text: '#ca8a04', icon: <Zap size={12} /> },
};

const FILTERS = ['All', 'Mentors', 'Tech', 'Finance', 'Strategy', 'VC'];

/* ── Add Profile Modal ── */
function AddProfileModal({ onAdd, onClose }) {
  const [name, setName]       = useState('');
  const [title, setTitle]     = useState('');
  const [company, setCompany] = useState('');
  const [attempted, setAttempted] = useState(false);

  const handleSubmit = () => {
    setAttempted(true);
    if (!name.trim()) return;
    onAdd({ name: name.trim(), title: title.trim(), company: company.trim() });
    onClose();
  };

  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 400, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
    >
      <div
        className="animate-fade-in"
        onClick={e => e.stopPropagation()}
        style={{ width: '100%', maxWidth: '420px', background: 'white', borderRadius: '16px', boxShadow: '0 24px 60px rgba(0,0,0,0.18)', overflow: 'hidden' }}
      >
        {/* Modal header */}
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
            <Users size={16} color="#3b82f6" /> Add Profile
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}>
            <X size={18} />
          </button>
        </div>
        {/* Form */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '5px' }}>
              Name <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Jane Smith"
              value={name}
              onChange={e => setName(e.target.value)}
              autoFocus
              style={{
                width: '100%', boxSizing: 'border-box',
                padding: '0.55rem 0.75rem',
                borderRadius: '8px',
                border: attempted && !name.trim() ? '1.5px solid #ef4444' : '1.5px solid var(--border-color)',
                outline: 'none', fontSize: '0.875rem', color: 'var(--text-primary)',
              }}
            />
            {attempted && !name.trim() && (
              <div style={{ fontSize: '0.72rem', color: '#ef4444', marginTop: '4px' }}>Name is required</div>
            )}
          </div>
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '5px' }}>Title</label>
            <input
              type="text"
              placeholder="e.g. CEO, Partner, Director"
              value={title}
              onChange={e => setTitle(e.target.value)}
              style={{
                width: '100%', boxSizing: 'border-box',
                padding: '0.55rem 0.75rem',
                borderRadius: '8px', border: '1.5px solid var(--border-color)',
                outline: 'none', fontSize: '0.875rem', color: 'var(--text-primary)',
              }}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '5px' }}>Company</label>
            <input
              type="text"
              placeholder="e.g. Sequoia Capital"
              value={company}
              onChange={e => setCompany(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              style={{
                width: '100%', boxSizing: 'border-box',
                padding: '0.55rem 0.75rem',
                borderRadius: '8px', border: '1.5px solid var(--border-color)',
                outline: 'none', fontSize: '0.875rem', color: 'var(--text-primary)',
              }}
            />
          </div>
        </div>
        {/* Footer */}
        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>Add Profile</button>
        </div>
      </div>
    </div>
  );
}

/* ── Main Component ── */
export default function Following({ addTask }) {
  const [profiles, setProfiles]               = useState(PROFILES);
  const [activeFilter, setActiveFilter]       = useState('All');
  const [searchValue, setSearchValue]         = useState('');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedProfile, setSelectedProfile]   = useState(null);
  const [showAddModal, setShowAddModal]         = useState(false);
  const [suggested, setSuggested]               = useState(SUGGESTED_PROFILES);
  const [actedIds, setActedIds]                 = useState(new Set());

  const toggleNotification = (id) => {
    setProfiles(prev => prev.map(p => p.id === id ? { ...p, notificationsOn: !p.notificationsOn } : p));
  };

  const handleUnfollow = (profileId) => {
    setProfiles(prev => prev.filter(p => p.id !== profileId));
    setSelectedProfile(null);
  };

  const handleAddProfile = ({ name, title, company }) => {
    const newProfile = {
      id: Date.now(),
      name,
      title: title || 'Unknown Title',
      company: company || 'Unknown Company',
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
      tags: [],
      notificationsOn: true,
      sector: 'Other',
    };
    setProfiles(prev => [...prev, newProfile]);
  };

  const handleFollow = (s) => {
    const newProfile = {
      id: Date.now(),
      name: s.name,
      title: s.title,
      company: s.company,
      avatar: s.avatar,
      tags: s.tags,
      notificationsOn: true,
      sector: s.sector,
    };
    setProfiles(prev => [...prev, newProfile]);
    setSuggested(prev => prev.filter(p => p.id !== s.id));
  };

  const handleTakeAction = (activity, profile) => {
    setActedIds(prev => new Set([...prev, activity.id]));
    if (addTask) {
      addTask({
        id: Date.now(),
        title: `Follow-up: ${activity.title}`,
        description: activity.aiNote || activity.description,
        category: 'Strategic',
        priority: 'medium',
        status: 'pending',
        source: `Following · ${profile.name}`,
        detected: activity.time,
        deadline: '1 week',
        confidence: 80,
        impact: 'MEDIUM IMPACT',
        impactType: 'medium',
        aiAnalysis: activity.aiNote || activity.description,
        steps: [],
      });
    }
  };

  const filteredProfiles = profiles.filter(p => {
    if (activeFilter === 'All') return true;
    return p.tags.some(t => t === activeFilter) || p.sector.includes(activeFilter);
  });

  const visibleFeed = ACTIVITY_FEED.filter(a => {
    const profile = profiles.find(p => p.id === a.profileId);
    if (!profile) return false;
    if (activeFilter === 'All') return true;
    return profile.tags.some(t => t === activeFilter) || profile.sector.includes(activeFilter);
  });

  const profileMap = Object.fromEntries(profiles.map(p => [p.id, p]));

  return (
    <main className="main-content">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

        {/* Header */}
        <div className="animate-fade-in" style={{ marginBottom: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.5rem' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: 0 }}>Following</h1>
          </div>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '540px', lineHeight: 1.5 }}>
            Track mentors, leaders, and key industry profiles. Jarvis surfaces moves, launches, and signals relevant to your strategy.
          </p>
        </div>

        {/* Stats row */}
        <div className="animate-fade-in" style={{ display: 'flex', gap: '1rem', animationDelay: '0.05s' }}>
          {[
            { label: 'Following',       value: profiles.length, icon: <Users size={16} color="#3b82f6" />,    bg: '#eff6ff', color: '#3b82f6' },
            { label: 'Updates Today',   value: '4',             icon: <Bell size={16} color="#10b981" />,     bg: '#f0fdf4', color: '#10b981' },
            { label: 'Launches Tracked',value: '2',             icon: <Rocket size={16} color="#ea580c" />,   bg: '#fff7ed', color: '#ea580c' },
            { label: 'Career Moves',    value: '1',             icon: <Briefcase size={16} color="#9333ea" />,bg: '#fdf4ff', color: '#9333ea' },
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
          <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  padding: '0.375rem 0.875rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 600,
                  border: activeFilter === f ? '1.5px solid #3b82f6' : '1.5px solid var(--border-color)',
                  background: activeFilter === f ? '#eff6ff' : 'white',
                  color: activeFilter === f ? '#3b82f6' : 'var(--text-secondary)',
                  cursor: 'pointer', transition: 'all 0.15s ease',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Two-column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.5rem', alignItems: 'start' }}>

          {/* Activity Feed */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: 0 }}>
                <Bell size={15} color="#38bdf8" />
                Activity Feed
                <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', background: '#f3f4f6', padding: '2px 8px', borderRadius: '99px', marginLeft: '4px' }}>
                  {visibleFeed.length}
                </span>
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Most recent first</span>
            </div>

            {visibleFeed.map((activity, idx) => {
              const profile = profileMap[activity.profileId];
              const typeStyle = TYPE_STYLES[activity.type] || { bg: '#f3f4f6', text: '#6b7280', icon: null };
              return (
                <div
                  key={activity.id}
                  className="card animate-fade-in"
                  onClick={() => setSelectedActivity(activity)}
                  style={{ padding: '1.25rem', animationDelay: `${0.05 * idx}s`, cursor: 'pointer', transition: 'box-shadow 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = ''}
                >
                  {/* Card header: profile (clickable) + type badge */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.875rem' }}>
                    <div
                      style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                      onClick={e => { e.stopPropagation(); setSelectedProfile(profile); }}
                    >
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                        <img src={profile.avatar} alt={profile.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#3b82f6' }}>{profile.name}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{profile.title} · {profile.company}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        display: 'flex', alignItems: 'center', gap: '4px',
                        fontSize: '0.65rem', fontWeight: 700, padding: '3px 8px', borderRadius: '99px',
                        background: typeStyle.bg, color: typeStyle.text,
                        textTransform: 'uppercase', letterSpacing: '0.05em',
                      }}>
                        {typeStyle.icon} {activity.type}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
                        <Clock size={11} /> {activity.time}
                      </span>
                    </div>
                  </div>

                  {/* Title + description */}
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                    {activity.title}
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0, marginBottom: activity.aiNote ? '0.875rem' : 0 }}>
                    {activity.description}
                  </p>

                  {/* AI note */}
                  {activity.aiNote && (
                    <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '0.625rem 0.875rem', display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
                      <Zap size={12} color="#0284c7" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <p style={{ fontSize: '0.8rem', color: '#0c4a6e', margin: 0, lineHeight: 1.45 }}>{activity.aiNote}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Following sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Search + add */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <Search size={13} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder="Search profiles..."
                  value={searchValue}
                  onChange={e => setSearchValue(e.target.value)}
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    padding: '0.45rem 0.75rem 0.45rem 2rem',
                    borderRadius: '8px', border: '1.5px solid var(--border-color)',
                    outline: 'none', fontSize: '0.8rem', color: 'var(--text-primary)',
                    background: '#f8fafc',
                  }}
                />
              </div>
              <button
                className="btn btn-primary"
                onClick={() => setShowAddModal(true)}
                style={{ padding: '0.45rem 0.875rem', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap', fontSize: '0.8rem' }}
              >
                <Plus size={13} /> Add
              </button>
            </div>

            {/* Profile cards */}
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                {filteredProfiles.length} profile{filteredProfiles.length !== 1 ? 's' : ''} following
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {filteredProfiles
                  .filter(p => !searchValue || p.name.toLowerCase().includes(searchValue.toLowerCase()) || p.company.toLowerCase().includes(searchValue.toLowerCase()))
                  .map(profile => (
                    <div
                      key={profile.id}
                      className="card animate-fade-in"
                      onClick={() => setSelectedProfile(profile)}
                      style={{ padding: '1rem', cursor: 'pointer' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <div style={{ position: 'relative', flexShrink: 0 }}>
                          <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden' }}>
                            <img src={profile.avatar} alt={profile.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                          {profile.tags.includes('Mentor') && (
                            <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '16px', height: '16px', background: '#fbbf24', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid white' }}>
                              <Star size={8} color="white" fill="white" />
                            </div>
                          )}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{profile.name}</div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{profile.title}</div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                            <Building2 size={10} color="var(--text-muted)" />
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{profile.company}</span>
                          </div>
                        </div>
                        <button
                          onClick={e => { e.stopPropagation(); toggleNotification(profile.id); }}
                          title={profile.notificationsOn ? 'Mute notifications' : 'Enable notifications'}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', color: profile.notificationsOn ? '#0284c7' : 'var(--text-muted)', flexShrink: 0 }}
                        >
                          {profile.notificationsOn ? <Bell size={14} /> : <BellOff size={14} />}
                        </button>
                      </div>

                      {/* Tags */}
                      <div style={{ display: 'flex', gap: '4px', marginTop: '0.625rem', flexWrap: 'wrap' }}>
                        {profile.tags.map(tag => (
                          <span key={tag} style={{
                            fontSize: '0.6rem', fontWeight: 700, padding: '2px 6px', borderRadius: '99px',
                            background: tag === 'Mentor' ? '#fef9c3' : '#f3f4f6',
                            color: tag === 'Mentor' ? '#ca8a04' : '#6b7280',
                            textTransform: 'uppercase', letterSpacing: '0.04em',
                          }}>
                            {tag}
                          </span>
                        ))}
                        <span style={{ fontSize: '0.6rem', fontWeight: 600, padding: '2px 6px', borderRadius: '99px', background: '#f0f9ff', color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          {profile.sector}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Suggested to follow */}
            {suggested.length > 0 && (
              <div className="card" style={{ padding: '1.25rem', background: '#f8fafc', border: '1px dashed var(--border-color)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Zap size={12} color="#0284c7" /> Suggested for you
                </div>
                {suggested.map(s => (
                  <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.625rem' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                      <img src={s.avatar} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>{s.name}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{s.title} · {s.company}</div>
                    </div>
                    <button
                      className="btn"
                      onClick={() => handleFollow(s)}
                      style={{ fontSize: '0.7rem', padding: '0.25rem 0.6rem', display: 'flex', alignItems: 'center', gap: '3px', color: '#3b82f6', border: '1.5px solid #bfdbfe', background: 'white', flexShrink: 0 }}
                    >
                      <Plus size={11} /> Follow
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <FloatingChat pageContext="Following" />

      {/* ── Activity Detail Drawer ── */}
      {selectedActivity && (() => {
        const profile = profileMap[selectedActivity.profileId];
        const typeStyle = TYPE_STYLES[selectedActivity.type] || { bg: '#f3f4f6', text: '#6b7280', icon: null };
        const acted = actedIds.has(selectedActivity.id);
        const close = () => setSelectedActivity(null);
        return (
          <>
            <div onClick={close} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', zIndex: 300 }} />
            <div
              className="animate-fade-in"
              style={{ position: 'fixed', top: 0, right: 0, width: '440px', height: '100vh', background: 'white', zIndex: 301, display: 'flex', flexDirection: 'column', boxShadow: '-8px 0 40px rgba(0,0,0,0.12)', overflow: 'hidden' }}
            >
              {/* Hero image */}
              <div style={{ position: 'relative', width: '100%', height: '160px', flexShrink: 0, background: '#f0f9ff' }}>
                <img src={profile?.avatar} alt={profile?.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(8px) brightness(0.6)', transform: 'scale(1.1)' }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '52px', height: '52px', borderRadius: '50%', overflow: 'hidden', border: '3px solid white', flexShrink: 0 }}>
                      <img src={profile?.avatar} alt={profile?.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <div
                        style={{ fontSize: '0.95rem', fontWeight: 700, color: 'white', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '2px' }}
                        onClick={() => { close(); setSelectedProfile(profile); }}
                      >
                        {profile?.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)' }}>{profile?.title} · {profile?.company}</div>
                    </div>
                  </div>
                </div>
                <button onClick={close} style={{ position: 'absolute', top: '12px', right: '12px', width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(0,0,0,0.5)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <X size={14} color="white" />
                </button>
              </div>

              {/* Body */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Type + time */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.65rem', fontWeight: 700, padding: '3px 8px', borderRadius: '99px', background: typeStyle.bg, color: typeStyle.text, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {typeStyle.icon} {selectedActivity.type}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={11} /> {selectedActivity.time}
                  </span>
                </div>

                <div style={{ height: '1px', background: 'var(--border-color)' }} />

                {/* Title */}
                <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0, lineHeight: 1.35 }}>
                  {selectedActivity.title}
                </h2>

                {/* Description */}
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
                  {selectedActivity.description}
                </p>

                {/* AI note */}
                {selectedActivity.aiNote && (
                  <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '10px', padding: '0.875rem 1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.4rem' }}>
                      <Zap size={13} color="#0284c7" />
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AI Recommendation</span>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: '#0c4a6e', margin: 0, lineHeight: 1.5 }}>{selectedActivity.aiNote}</p>
                  </div>
                )}

                <div style={{ height: '1px', background: 'var(--border-color)' }} />

                {/* Action button */}
                <button
                  className={`btn ${acted ? 'btn-secondary' : 'btn-primary'}`}
                  style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '6px' }}
                  onClick={() => !acted && handleTakeAction(selectedActivity, profile)}
                  disabled={acted}
                >
                  {acted ? <><CheckCircle2 size={14} /> Task Created</> : 'Take Action'}
                </button>
              </div>
            </div>
          </>
        );
      })()}

      {/* ── Profile Detail Drawer ── */}
      {selectedProfile && (() => {
        const liveProfile = profiles.find(p => p.id === selectedProfile.id) || selectedProfile;
        const profileActivities = ACTIVITY_FEED.filter(a => a.profileId === liveProfile.id).slice(0, 3);
        const close = () => setSelectedProfile(null);
        return (
          <>
            <div onClick={close} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', zIndex: 302 }} />
            <div
              className="animate-fade-in"
              style={{ position: 'fixed', top: 0, right: 0, width: '440px', height: '100vh', background: 'white', zIndex: 303, display: 'flex', flexDirection: 'column', boxShadow: '-8px 0 40px rgba(0,0,0,0.12)', overflow: 'hidden' }}
            >
              {/* Profile hero */}
              <div style={{ position: 'relative', height: '180px', flexShrink: 0, overflow: 'hidden' }}>
                <img src={liveProfile.avatar} alt={liveProfile.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(10px) brightness(0.55)', transform: 'scale(1.1)' }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', overflow: 'hidden', border: '3px solid white' }}>
                      <img src={liveProfile.avatar} alt={liveProfile.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    {liveProfile.tags.includes('Mentor') && (
                      <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '18px', height: '18px', background: '#fbbf24', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid white' }}>
                        <Star size={9} color="white" fill="white" />
                      </div>
                    )}
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: 'white' }}>{liveProfile.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)' }}>{liveProfile.title} · {liveProfile.company}</div>
                  </div>
                </div>
                <button onClick={close} style={{ position: 'absolute', top: '12px', right: '12px', width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(0,0,0,0.5)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <X size={14} color="white" />
                </button>
              </div>

              {/* Body */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                {/* Tags + sector */}
                <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                  {liveProfile.tags.map(tag => (
                    <span key={tag} style={{ fontSize: '0.65rem', fontWeight: 700, padding: '3px 8px', borderRadius: '99px', background: tag === 'Mentor' ? '#fef9c3' : '#f3f4f6', color: tag === 'Mentor' ? '#ca8a04' : '#6b7280', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {tag}
                    </span>
                  ))}
                  <span style={{ fontSize: '0.65rem', fontWeight: 600, padding: '3px 8px', borderRadius: '99px', background: '#f0f9ff', color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {liveProfile.sector}
                  </span>
                </div>

                {/* Notification toggle */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f8fafc', borderRadius: '10px', padding: '0.75rem 1rem' }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Notifications</div>
                  <button
                    onClick={() => toggleNotification(liveProfile.id)}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', background: liveProfile.notificationsOn ? '#0284c7' : '#e2e8f0', border: 'none', borderRadius: '99px', padding: '0.3rem 0.75rem', cursor: 'pointer', color: liveProfile.notificationsOn ? 'white' : 'var(--text-muted)', fontSize: '0.78rem', fontWeight: 600 }}
                  >
                    {liveProfile.notificationsOn ? <><Bell size={12} /> On</> : <><BellOff size={12} /> Off</>}
                  </button>
                </div>

                {/* Recent activity */}
                {profileActivities.length > 0 && (
                  <div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.625rem' }}>
                      Recent Activity
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                      {profileActivities.map((a, i) => {
                        const ts = TYPE_STYLES[a.type] || { bg: '#f3f4f6', text: '#6b7280', icon: null };
                        return (
                          <div
                            key={a.id}
                            onClick={() => { close(); setSelectedActivity(a); }}
                            style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '0.625rem 0', borderBottom: i < profileActivities.length - 1 ? '1px solid var(--border-color)' : 'none', cursor: 'pointer' }}
                          >
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '0.6rem', fontWeight: 700, padding: '2px 7px', borderRadius: '99px', background: ts.bg, color: ts.text, textTransform: 'uppercase', letterSpacing: '0.04em', flexShrink: 0, marginTop: '2px' }}>
                              {ts.icon}
                            </span>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.title}</div>
                              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                                <Clock size={10} /> {a.time}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div style={{ height: '1px', background: 'var(--border-color)' }} />

                {/* Unfollow button */}
                <button
                  className="btn"
                  onClick={() => handleUnfollow(liveProfile.id)}
                  style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '6px', color: '#ef4444', border: '1.5px solid #fecaca', background: '#fff5f5' }}
                >
                  <UserMinus size={14} /> Unfollow
                </button>
              </div>
            </div>
          </>
        );
      })()}

      {/* ── Add Profile Modal ── */}
      {showAddModal && (
        <AddProfileModal
          onAdd={handleAddProfile}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </main>
  );
}
