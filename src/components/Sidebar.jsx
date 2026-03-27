import React from 'react';
import { 
  LayoutDashboard, 
  Activity as ActivityIcon, 
  Radio, 
  CheckSquare, 
  Settings,
  LogOut
} from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '3rem' }}>
        <div style={{ background: '#3b82f6', color: 'white', padding: '8px', borderRadius: '50%' }}>
          <LayoutDashboard size={20} />
        </div>
        <div>
          <h2 style={{ fontSize: '1rem', marginBottom: 0 }}>IIA Advisor</h2>
          <p style={{ fontSize: '0.75rem', margin: 0, color: 'var(--text-muted)' }}>P.A Jarvis</p>
        </div>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
        <a href="#" className="animate-fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', background: '#f0f9ff', color: '#0284c7', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '0.875rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <LayoutDashboard size={18} />
            Command center
          </div>
          <span style={{ fontSize: '0.75rem', background: '#bae6fd', padding: '2px 6px', borderRadius: '99px' }}>5</span>
        </a>
        
        <a href="#" className="animate-fade-in" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0.75rem 1rem', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500, animationDelay: '0.05s' }}>
          <ActivityIcon size={18} />
          Market Pulse
        </a>
        
        <a href="#" className="animate-fade-in" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0.75rem 1rem', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500, animationDelay: '0.1s' }}>
          <Radio size={18} />
          Industry signals
        </a>
        
        <a href="#" className="animate-fade-in" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0.75rem 1rem', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500, animationDelay: '0.15s' }}>
          <CheckSquare size={18} />
          Tasks
        </a>
        
        <a href="#" className="animate-fade-in" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0.75rem 1rem', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500, marginTop: '2rem', animationDelay: '0.2s' }}>
          <Settings size={18} />
          Settings
        </a>
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: '#f8fafc', borderRadius: '12px', marginTop: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#e2e8f0', overflow: 'hidden' }}>
            <img src="https://i.pravatar.cc/150?img=11" alt="Kelvin Diton" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0284c7' }}>Kelvin Diton</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em' }}>LEAD STRATEGIST</div>
          </div>
        </div>
        <LogOut size={16} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
      </div>
    </aside>
  );
}
