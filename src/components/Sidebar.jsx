import React, { useState } from 'react';
import {
  LayoutDashboard,
  Activity as ActivityIcon,
  Radio,
  CheckSquare,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Users,
  BookOpen,
  Bell,
} from 'lucide-react';

export default function Sidebar({ currentPage, onNavigate }) {
  const [collapsed, setCollapsed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const isExpanded = !collapsed || hovered;

  const navItem = (page, icon, label, delay, badge) => {
    const isActive = currentPage === page;
    return (
      <a
        key={page}
        href="#"
        title={!isExpanded ? label : undefined}
        className="animate-fade-in"
        onClick={(e) => { e.preventDefault(); onNavigate(page); }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: isExpanded ? 'space-between' : 'center',
          padding: '0.75rem',
          background: isActive ? '#f0f9ff' : 'transparent',
          color: isActive ? '#0284c7' : 'var(--text-secondary)',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: isActive ? 600 : 500,
          fontSize: '0.875rem',
          animationDelay: delay,
          transition: 'background 0.15s, color 0.15s',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: isExpanded ? '12px' : 0, flexShrink: 0 }}>
          {icon}
          {isExpanded && label}
        </div>
        {isExpanded && badge && (
          <span style={{ fontSize: '0.75rem', background: '#bae6fd', color: '#0284c7', padding: '2px 6px', borderRadius: '99px' }}>
            {badge}
          </span>
        )}
      </a>
    );
  };

  return (
    <aside
      className="sidebar"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: isExpanded ? '260px' : '64px',
        transition: 'width 0.25s ease',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: isExpanded ? 'space-between' : 'center',
        marginBottom: '3rem',
        minHeight: '36px',
      }}>
        {isExpanded ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: '#3b82f6', color: 'white', padding: '8px', borderRadius: '50%', flexShrink: 0 }}>
              <LayoutDashboard size={20} />
            </div>
            <div style={{ overflow: 'hidden' }}>
              <h2 style={{ fontSize: '1rem', marginBottom: 0, whiteSpace: 'nowrap' }}>IIA Advisor</h2>
              <p style={{ fontSize: '0.75rem', margin: 0, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>P.A Jarvis</p>
            </div>
          </div>
        ) : (
          <div style={{ background: '#3b82f6', color: 'white', padding: '8px', borderRadius: '50%' }}>
            <LayoutDashboard size={20} />
          </div>
        )}
      </div>

      {/* Nav */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
        {navItem('command-center', <LayoutDashboard size={18} />, 'Command center', '0s', '5')}
        {navItem('market-pulse', <ActivityIcon size={18} />, 'Market Pulse', '0.05s')}
        {navItem('industry-signals', <Radio size={18} />, 'Industry signals', '0.1s')}
        {navItem('tasks', <CheckSquare size={18} />, 'Tasks', '0.15s')}
        {navItem('following', <Users size={18} />, 'Following', '0.2s', '6')}
        {navItem('learning', <BookOpen size={18} />, 'Learning Hub', '0.25s')}
        {navItem('notifications', <Bell size={18} />, 'Notifications', '0.3s', '4')}
        <div style={{ marginTop: '2rem' }}>
          {navItem('profile', <Settings size={18} />, 'Settings', '0.25s')}
        </div>
      </nav>

      {/* User profile card */}
      <div
        onClick={() => onNavigate('profile')}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: isExpanded ? 'space-between' : 'center',
          padding: isExpanded ? '1rem' : '0.75rem',
          background: currentPage === 'profile' ? '#f0f9ff' : '#f8fafc',
          borderRadius: '12px',
          marginTop: 'auto',
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'background 0.15s',
          border: currentPage === 'profile' ? '1.5px solid #bae6fd' : '1.5px solid transparent',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: isExpanded ? '10px' : 0 }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#e2e8f0', overflow: 'hidden', flexShrink: 0 }}>
            <img src="https://i.pravatar.cc/150?img=11" alt="Kelvin Diton" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          {isExpanded && (
            <div>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0284c7', whiteSpace: 'nowrap' }}>Kelvin Diton</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>LEAD STRATEGIST</div>
            </div>
          )}
        </div>
        {isExpanded && <LogOut size={16} color="var(--text-muted)" style={{ cursor: 'pointer', flexShrink: 0 }} onClick={e => e.stopPropagation()} />}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(c => !c)}
        style={{
          marginTop: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          padding: '0.5rem',
          background: 'transparent',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          cursor: 'pointer',
          color: 'var(--text-muted)',
          transition: 'background 0.15s',
        }}
        title={collapsed ? 'Pin sidebar open' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </aside>
  );
}
