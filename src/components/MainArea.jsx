import React, { useState, useRef, useEffect } from 'react';
import ActionCard from './ActionCard';
import { Search, Send } from 'lucide-react';

export default function MainArea() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'system',
      type: 'greeting',
      text: "Good morning, Kelvin\nSystems are nominal. Your industry intelligence environment is ready for today's briefing."
    },
    {
      id: 2,
      sender: 'system',
      type: 'initial-dashboard'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const newUserMsg = {
      id: Date.now(),
      sender: 'user',
      type: 'text',
      text: inputValue
    };
    
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');

    // Simulate system response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'system',
        type: 'text',
        text: "I'm analyzing that request now. I'll monitor these specific signals and update your briefing when new intelligence emerges."
      }]);
    }, 1000);
  };

  const renderMessageContent = (msg) => {
    if (msg.type === 'greeting') {
      const [title, subtitle] = msg.text.split('\n');
      return (
        <div style={{ marginBottom: '1rem' }}>
          <h1>{title}</h1>
          <p style={{ fontSize: '1.125rem', maxWidth: '600px', lineHeight: 1.6 }}>{subtitle}</p>
        </div>
      );
    }

    if (msg.type === 'initial-dashboard') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' }}>
          <div className="hero-card animate-fade-in">
            <div className="hero-content">
              <span className="badge urgent" style={{ marginBottom: '1rem' }}>URGENT</span>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Strategic Market Entry</h2>
              <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                New indicators suggest a high-probability window for Neo-Tech expansion in the APAC region. Execute Phase 1 Protocol immediately to secure early-mover advantage.
              </p>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <button className="btn btn-primary">Execute Now</button>
                <button className="btn" style={{ color: 'var(--text-secondary)', background: 'transparent' }}>View Data Source</button>
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
            />
          </div>
        </div>
      );
    }

    // Standard text message
    return (
      <div className="card animate-fade-in" style={{ padding: '1.25rem 1.5rem', background: msg.sender === 'user' ? '#f0f9ff' : 'white', border: msg.sender === 'user' ? 'none' : '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.6, margin: 0, color: msg.sender === 'user' ? '#0c4a6e' : 'var(--text-primary)' }}>
          {msg.text}
        </p>
      </div>
    );
  };

  return (
    <main className="main-content chat-layout">
      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message-wrapper ${msg.sender} animate-fade-in`}>
            {msg.sender === 'user' && (
              <div className="msg-avatar user-avatar">
                <img src="https://i.pravatar.cc/150?img=11" alt="Kelvin Diton" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
            
            <div className={`message-content ${msg.sender === 'user' ? 'user-msg' : 'system-msg'}`}>
              {renderMessageContent(msg)}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form className="search-container" onSubmit={handleSendMessage} style={{ marginTop: 'auto', flexShrink: 0 }}>
        <Search size={20} className="search-icon" style={{ marginRight: '10px' }} />
        <input 
          type="text" 
          className="search-input" 
          placeholder="Ask intelligence..." 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="send-btn" disabled={!inputValue.trim()}>
          <Send size={14} style={{ marginLeft: '-2px', marginTop: '1px' }} />
        </button>
      </form>
    </main>
  );
}
