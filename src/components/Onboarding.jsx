import React, { useState, useEffect } from 'react';
import { ArrowRight, BrainCircuit, Briefcase, Code, Target, Compass, Network, Loader2, Lightbulb, ShieldCheck, Check, Blocks, Rocket, LineChart } from 'lucide-react';
import './Onboarding.css';

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);

  // Form State
  const [formData, setFormData] = useState({
    role: '',
    industry: '',
    skills: [],
    goals: [],
    interests: [],
    context: ''
  });

  const nextStep = () => {
    if(step < 6) setStep(prev => prev + 1);
  };

  const stepsList = [1, 2, 3, 4, 5];

  // Simulated Agent Run (Step 6)
  useEffect(() => {
    if (step === 6) {
      const timer = setTimeout(() => {
        onComplete();
      }, 5000); 
      return () => clearTimeout(timer);
    }
  }, [step, onComplete]);

  const toggleArrayItem = (field, item) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(item) 
        ? prev[field].filter(i => i !== item)
        : [...prev[field], item]
    }));
  };

  const renderCurrentStep = () => {
    switch(step) {
      case 0:
        return (
          <div className="text-center step-content">
            <div style={{ display: 'inline-flex', padding: '20px', background: '#e0f2fe', borderRadius: '50%', marginBottom: '2rem' }}>
              <BrainCircuit size={56} color="#0284c7" />
            </div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#0f172a', fontWeight: 800 }}>Intelligent Advisory</h1>
            <p style={{ color: '#64748b', fontSize: '1.125rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Information without action is noise. From now on, you'll receive highly polarized, actionable strategies automatically matched to your exact profile.
            </p>
            
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem', textAlign: 'left' }}>
              <ShieldCheck size={32} color="#10b981" />
              <div>
                <strong style={{ display: 'block', fontSize: '0.95rem', color: '#0f172a' }}>Privacy by Design</strong>
                <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Your 8-layer context vector is encrypted and never leaves this system.</span>
              </div>
            </div>

            <button className="btn btn-primary" onClick={nextStep} style={{ width: '100%', padding: '1rem', fontSize: '1.125rem', borderRadius: '12px' }}>
              Initialize Personal Calibration <ArrowRight size={18} style={{ marginLeft: '8px' }} />
            </button>
          </div>
        );
      case 1:
        return (
          <div className="step-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
              <Briefcase size={28} color="#3b82f6" />
              <h2 style={{ fontSize: '1.75rem', margin: 0, fontWeight: 700 }}>Profession</h2>
            </div>
            <p style={{ color: '#64748b', marginBottom: '2.5rem' }}>Phase 1 of 5: Mapping your career identity.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.95rem', color: '#334155' }}>Core Role</label>
                <input type="text" placeholder="e.g. Lead Product Manager, Senior DevOps..." style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: '12px', padding: '1rem', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s' }} value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} onFocus={(e) => e.target.style.borderColor = '#3b82f6'} onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.95rem', color: '#334155' }}>Operating Industry</label>
                <select style={{ width: '100%', border: '2px solid #e2e8f0', borderRadius: '12px', padding: '1rem', fontSize: '1rem', background: 'white', outline: 'none', cursor: 'pointer' }} value={formData.industry} onChange={e => setFormData({...formData, industry: e.target.value})}>
                  <option value="">Select industry sector...</option>
                  <option value="tech">Technology & Software</option>
                  <option value="finance">Finance & FinTech</option>
                  <option value="logistics">Supply Chain & Logistics</option>
                  <option value="health">Healthcare & BioTech</option>
                  <option value="retail">E-Commerce & Retail</option>
                </select>
              </div>
            </div>
            
            <button className="btn btn-primary" onClick={nextStep} style={{ width: '100%', padding: '1rem', fontSize: '1.125rem', borderRadius: '12px' }} disabled={!formData.role || !formData.industry}>
              Continue Configuration
            </button>
          </div>
        );
      case 2:
        return (
          <div className="step-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
              <Code size={28} color="#3b82f6" />
              <h2 style={{ fontSize: '1.75rem', margin: 0, fontWeight: 700 }}>Current Stack & Skills</h2>
            </div>
            <p style={{ color: '#64748b', marginBottom: '2rem' }}>What tools do you use? We use this to filter irrelevant tactical alerts.</p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '3rem' }}>
              {['React', 'Node.js', 'Python', 'AWS', 'Figma', 'Agile', 'Docker', 'Kubernetes', 'TypeScript', 'SQL', 'TensorFlow', 'Go', 'UX Design', 'Jira'].map(skill => (
                <button 
                  key={skill}
                  onClick={() => toggleArrayItem('skills', skill)}
                  style={{ 
                    padding: '0.6rem 1.25rem', 
                    borderRadius: '99px',
                    border: `2px solid ${formData.skills.includes(skill) ? '#3b82f6' : '#e2e8f0'}`,
                    background: formData.skills.includes(skill) ? '#eff6ff' : 'white',
                    color: formData.skills.includes(skill) ? '#2563eb' : '#475569',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {skill}
                </button>
              ))}
            </div>
            
            <button className="btn btn-primary" onClick={nextStep} style={{ width: '100%', padding: '1rem', fontSize: '1.125rem', borderRadius: '12px' }} disabled={formData.skills.length === 0}>
              Continue Configuration
            </button>
          </div>
        );
      case 3:
        return (
          <div className="step-content">
             <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
              <Target size={28} color="#3b82f6" />
              <h2 style={{ fontSize: '1.75rem', margin: 0, fontWeight: 700 }}>Career Intent</h2>
            </div>
            <p style={{ color: '#64748b', marginBottom: '2.5rem' }}>What are your primary goals for the next 6-12 months?</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
              {[
                { id: 'leadership', title: 'Ascending to Leadership', icon: Rocket, desc: 'Signals that build strategic thinking and management.' },
                { id: 'market', title: 'Market Expansion', icon: LineChart, desc: 'Alerts on competitor moves and new geographical opportunities.' },
                { id: 'optimization', title: 'Operational Efficiency', icon: Blocks, desc: 'New tools and techniques that reduce overhead and increase speed.' }
              ].map(goal => (
                <div 
                  key={goal.id} 
                  className={`selectable-card ${formData.goals.includes(goal.id) ? 'selected' : ''}`}
                  onClick={() => toggleArrayItem('goals', goal.id)}
                >
                  <div className="selectable-card-icon">
                    <goal.icon size={24} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#0f172a' }}>{goal.title}</h4>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', marginTop: '4px' }}>{goal.desc}</p>
                  </div>
                  {formData.goals.includes(goal.id) && <Check color="#3b82f6" size={20} />}
                </div>
              ))}
            </div>
            
            <button className="btn btn-primary" onClick={nextStep} style={{ width: '100%', padding: '1rem', fontSize: '1.125rem', borderRadius: '12px' }} disabled={formData.goals.length === 0}>
              Continue Configuration
            </button>
          </div>
        );
      case 4:
         return (
          <div className="step-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
              <Compass size={28} color="#3b82f6" />
              <h2 style={{ fontSize: '1.75rem', margin: 0, fontWeight: 700 }}>Interests</h2>
            </div>
            <p style={{ color: '#64748b', marginBottom: '2rem' }}>We use these topic weights to surface fringe opportunities.</p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '3rem' }}>
              {['Venture Capital', 'AI Ethics', 'SaaS Pricing', 'Remote Work', 'Blockchain', 'Cybersecurity', 'Open Source', 'Micro-SaaS', 'Leadership Psychology'].map(interest => (
                <button 
                  key={interest}
                  onClick={() => toggleArrayItem('interests', interest)}
                  style={{ 
                    padding: '0.6rem 1.25rem', 
                    borderRadius: '99px',
                    border: `2px solid ${formData.interests.includes(interest) ? '#3b82f6' : '#e2e8f0'}`,
                    background: formData.interests.includes(interest) ? '#eff6ff' : 'white',
                    color: formData.interests.includes(interest) ? '#2563eb' : '#475569',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {interest}
                </button>
              ))}
            </div>
            
            <button className="btn btn-primary" onClick={nextStep} style={{ width: '100%', padding: '1rem', fontSize: '1.125rem', borderRadius: '12px' }} disabled={formData.interests.length === 0}>
              Final Step
            </button>
          </div>
        );
      case 5:
        return (
          <div className="step-content">
             <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
              <Network size={28} color="#3b82f6" />
              <h2 style={{ fontSize: '1.75rem', margin: 0, fontWeight: 700 }}>Context</h2>
            </div>
            <p style={{ color: '#64748b', marginBottom: '2.5rem' }}>Select your current work context.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
              {['Full-Time Employee', 'Freelancer / Consultant', 'Founder / Owner'].map(ctx => (
                <div 
                  key={ctx} 
                  className={`selectable-card ${formData.context === ctx ? 'selected' : ''}`}
                  onClick={() => setFormData({...formData, context: ctx})}
                >
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#0f172a' }}>{ctx}</h4>
                  </div>
                  {formData.context === ctx && <Check color="#3b82f6" size={20} />}
                </div>
              ))}
            </div>
            
            <button className="btn btn-primary" onClick={nextStep} style={{ width: '100%', padding: '1rem', fontSize: '1.125rem', borderRadius: '12px' }} disabled={!formData.context}>
              Boot Agent Pipeline
            </button>
          </div>
        );
      case 6:
        return (
          <div className="text-center step-content">
            <div className="loading-orbit">
              <div className="orbit-ring"></div>
              <div className="orbit-center">
                <Lightbulb size={36} color="white" />
              </div>
            </div>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', fontWeight: 800 }}>First-cycle advisory agent running...</h2>
            <p style={{ color: '#64748b', fontSize: '1.125rem', maxWidth: '450px', margin: '0 auto', lineHeight: 1.6 }}>
              Synthesizing millions of global industry signals. Passing through cost-efficiency pre-filters... generating 3 personalized insights.
            </p>
            <p style={{ marginTop: '2rem', fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
              Estimated time: &lt; 45 Seconds
            </p>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="onboarding-overlay">
      <div className="onboarding-card">
        
        {step > 0 && step < 6 && (
          <div className="step-header">
            {stepsList.map(s => (
              <div 
                key={s} 
                className={`step-indicator ${step === s ? 'active' : ''} ${step > s ? 'completed' : ''}`}
              >
                {step > s ? <Check size={16} /> : s}
              </div>
            ))}
          </div>
        )}

        {renderCurrentStep()}
      </div>
    </div>
  );
}
