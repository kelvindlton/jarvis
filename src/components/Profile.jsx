import React, { useState } from 'react';
import {
  User,
  Globe,
  Bell,
  Shield,
  Database,
  ChevronRight,
  Check,
  Edit2,
  X,
  Zap,
  Activity,
} from 'lucide-react';
import FloatingChat from './FloatingChat';

const SKILLS = ['React', 'Node.js', 'Python', 'AWS', 'Figma', 'Agile', 'Docker', 'TypeScript', 'SQL', 'TensorFlow'];
const INTERESTS = ['Emerging Tech', 'Supply Chain', 'Regulatory Policy', 'M&A', 'Climate & ESG', 'APAC Markets', 'AI/ML', 'Commodities'];
const INDUSTRIES = ['Technology', 'Advanced Manufacturing', 'Energy & Commodities', 'Financial Services', 'Healthcare', 'Defense & Aerospace'];
const GOALS = ['Ascending to Leadership', 'Market Expansion', 'Operational Efficiency'];

function EditableField({ label, value, onChange }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const save = () => { onChange(draft); setEditing(false); };
  const cancel = () => { setDraft(value); setEditing(false); };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
      <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
      {editing ? (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input
            autoFocus
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') save(); if (e.key === 'Escape') cancel(); }}
            style={{ flex: 1, padding: '0.5rem 0.75rem', borderRadius: '8px', border: '1.5px solid #3b82f6', outline: 'none', fontSize: '0.875rem', color: 'var(--text-primary)', background: 'white' }}
          />
          <button onClick={save} style={{ width: '30px', height: '30px', borderRadius: '6px', background: '#eff6ff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Check size={14} color="#3b82f6" />
          </button>
          <button onClick={cancel} style={{ width: '30px', height: '30px', borderRadius: '6px', background: '#fef2f2', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={14} color="#ef4444" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => setEditing(true)}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.75rem', borderRadius: '8px', border: '1.5px solid var(--border-color)', background: '#f8fafc', cursor: 'pointer', fontSize: '0.875rem', color: 'var(--text-primary)', transition: 'border-color 0.15s' }}
          onMouseEnter={e => e.currentTarget.style.borderColor = '#3b82f6'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
        >
          {value}
          <Edit2 size={12} color="var(--text-muted)" />
        </div>
      )}
    </div>
  );
}

function TogglePill({ label, active, onToggle }) {
  return (
    <button
      onClick={onToggle}
      style={{
        padding: '0.375rem 0.875rem',
        borderRadius: '999px',
        fontSize: '0.8rem',
        fontWeight: 600,
        border: active ? '1.5px solid #3b82f6' : '1.5px solid var(--border-color)',
        background: active ? '#eff6ff' : 'white',
        color: active ? '#3b82f6' : 'var(--text-secondary)',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
      }}
    >
      {active && <Check size={11} />}
      {label}
    </button>
  );
}

function Section({ icon, title, children }) {
  return (
    <div className="card animate-fade-in" style={{ padding: '1.75rem 2rem', background: 'white' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {icon}
        </div>
        <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 0 }}>{title}</h2>
      </div>
      {children}
    </div>
  );
}

const NOTIF_DEFAULTS = {
  'Critical signals': true,
  'Market alerts': true,
  'Task recommendations': true,
  'Weekly briefing': true,
  'Supply chain updates': false,
  'Regulatory changes': true,
};

const SOURCES = [
  { name: 'Bloomberg Terminal', status: 'connected', icon: <Activity size={14} color="#10b981" /> },
  { name: 'Reuters News Feed', status: 'connected', icon: <Activity size={14} color="#10b981" /> },
  { name: 'Refinitiv Eikon', status: 'pending', icon: <Activity size={14} color="#f59e0b" /> },
  { name: 'GDELT Project', status: 'connected', icon: <Activity size={14} color="#10b981" /> },
  { name: 'World Bank API', status: 'disconnected', icon: <Activity size={14} color="#ef4444" /> },
];

export default function Profile() {
  const [profile, setProfile] = useState({ name: 'Kelvin Diton', role: 'Lead Strategist', company: 'Neo-Tech Industries', region: 'APAC' });
  const [activeSkills, setActiveSkills] = useState(['React', 'Python', 'AWS', 'Agile', 'TypeScript']);
  const [activeInterests, setActiveInterests] = useState(['Emerging Tech', 'Supply Chain', 'APAC Markets', 'AI/ML']);
  const [activeGoals, setActiveGoals] = useState(['Market Expansion', 'Ascending to Leadership']);
  const [activeIndustry, setActiveIndustry] = useState('Advanced Manufacturing');
  const [notifications, setNotifications] = useState(NOTIF_DEFAULTS);
  const [saved, setSaved] = useState(false);

  const toggleSkill = (s) => setActiveSkills(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s]);
  const toggleInterest = (i) => setActiveInterests(p => p.includes(i) ? p.filter(x => x !== i) : [...p, i]);
  const toggleGoal = (g) => setActiveGoals(p => p.includes(g) ? p.filter(x => x !== g) : [...p, g]);
  const toggleNotif = (k) => setNotifications(p => ({ ...p, [k]: !p[k] }));
  const updateProfile = (key) => (val) => setProfile(p => ({ ...p, [key]: val }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <main className="main-content">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

        {/* Header */}
        <div className="animate-fade-in">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#e2e8f0', overflow: 'hidden', flexShrink: 0, boxShadow: '0 0 0 3px #bae6fd' }}>
                <img src="https://i.pravatar.cc/150?img=11" alt="Kelvin Diton" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <h1 style={{ fontSize: '1.75rem', marginBottom: '0.2rem' }}>{profile.name}</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.875rem', color: '#0284c7', fontWeight: 600 }}>{profile.role}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>·</span>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{profile.company}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleSave}
              className="btn btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: '120px', justifyContent: 'center' }}
            >
              {saved ? <><Check size={14} /> Saved!</> : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Personal Info */}
        <Section icon={<User size={16} color="#3b82f6" />} title="Personal Information">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <EditableField label="Full Name" value={profile.name} onChange={updateProfile('name')} />
            <EditableField label="Role / Title" value={profile.role} onChange={updateProfile('role')} />
            <EditableField label="Company" value={profile.company} onChange={updateProfile('company')} />
            <EditableField label="Primary Region" value={profile.region} onChange={updateProfile('region')} />
          </div>
        </Section>

        {/* Intelligence Profile */}
        <Section icon={<Zap size={16} color="#3b82f6" />} title="Intelligence Profile">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Industry */}
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.625rem' }}>Operating Industry</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {INDUSTRIES.map(ind => (
                  <TogglePill key={ind} label={ind} active={activeIndustry === ind} onToggle={() => setActiveIndustry(ind)} />
                ))}
              </div>
            </div>

            {/* Goals */}
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.625rem' }}>Career Goals</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {GOALS.map(g => (
                  <TogglePill key={g} label={g} active={activeGoals.includes(g)} onToggle={() => toggleGoal(g)} />
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.625rem' }}>Stack & Skills</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {SKILLS.map(s => (
                  <TogglePill key={s} label={s} active={activeSkills.includes(s)} onToggle={() => toggleSkill(s)} />
                ))}
              </div>
            </div>

            {/* Interests */}
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.625rem' }}>Tracked Interests</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {INTERESTS.map(i => (
                  <TogglePill key={i} label={i} active={activeInterests.includes(i)} onToggle={() => toggleInterest(i)} />
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Data Sources */}
        <Section icon={<Database size={16} color="#3b82f6" />} title="Data Sources">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {SOURCES.map((src) => {
              const statusStyle = {
                connected:    { bg: '#f0fdf4', text: '#16a34a', label: 'Connected' },
                pending:      { bg: '#fff7ed', text: '#f97316', label: 'Pending' },
                disconnected: { bg: '#fef2f2', text: '#ef4444', label: 'Disconnected' },
              }[src.status];
              return (
                <div key={src.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.875rem 1rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {src.icon}
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{src.name}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: '99px', background: statusStyle.bg, color: statusStyle.text, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {statusStyle.label}
                    </span>
                    <ChevronRight size={14} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
                  </div>
                </div>
              );
            })}
            <button className="btn" style={{ background: '#f0f9ff', color: '#0284c7', border: '1.5px dashed #bae6fd', borderRadius: '10px', padding: '0.75rem', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', marginTop: '0.25rem' }}>
              + Add Data Source
            </button>
          </div>
        </Section>

        {/* Notifications */}
        <Section icon={<Bell size={16} color="#3b82f6" />} title="Notification Preferences">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {Object.entries(notifications).map(([key, on], idx) => (
              <div
                key={key}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.875rem 0', borderBottom: idx < Object.keys(notifications).length - 1 ? '1px solid var(--border-color)' : 'none' }}
              >
                <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: 500 }}>{key}</span>
                <div
                  onClick={() => toggleNotif(key)}
                  style={{
                    width: '40px', height: '22px', borderRadius: '99px',
                    background: on ? '#3b82f6' : '#e5e7eb',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'background 0.2s',
                    flexShrink: 0,
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: '3px',
                    left: on ? '21px' : '3px',
                    width: '16px', height: '16px',
                    borderRadius: '50%',
                    background: 'white',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                    transition: 'left 0.2s',
                  }} />
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Security */}
        <Section icon={<Shield size={16} color="#3b82f6" />} title="Security & Privacy">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { label: 'Change Password', desc: 'Last changed 3 months ago' },
              { label: 'Two-Factor Authentication', desc: 'Enabled via authenticator app' },
              { label: 'Active Sessions', desc: '2 active sessions' },
              { label: 'Data Export', desc: 'Download your intelligence profile' },
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.875rem 1rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid var(--border-color)', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.background = '#f0f9ff'}
                onMouseLeave={e => e.currentTarget.style.background = '#f8fafc'}
              >
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.15rem' }}>{item.label}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.desc}</div>
                </div>
                <ChevronRight size={14} color="var(--text-muted)" />
              </div>
            ))}
          </div>
        </Section>

      </div>
      <FloatingChat pageContext="Profile" />
    </main>
  );
}
