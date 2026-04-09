import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot } from 'lucide-react';

const INITIAL_MSG = {
  id: 1,
  sender: 'system',
  text: "I'm monitoring this page's context. Ask me anything about the data or signals shown here.",
};

export default function FloatingChat({ pageContext = '' }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MSG]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    if (open) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: inputValue }]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'system',
        text: "I'm analyzing that request now. I'll update your briefing when new intelligence emerges.",
      }]);
      if (!open) setUnread(n => n + 1);
    }, 1200);
  };

  return (
    <>
      {/* Modal */}
      {open && (
        <div
          className="animate-fade-in"
          style={{
            position: 'fixed',
            bottom: 'calc(52px + 2.5rem)',
            right: '2rem',
            width: '360px',
            height: '460px',
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.06)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 200,
          }}
        >
          {/* Header */}
          <div style={{
            padding: '0.875rem 1.125rem',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: '#f8fafc',
            flexShrink: 0,
          }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Bot size={15} color="#3b82f6" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>Jarvis Intelligence</div>
              <div style={{ fontSize: '0.68rem', color: '#10b981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                Online · Context-aware {pageContext && `· ${pageContext}`}
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px', display: 'flex' }}>
              <X size={15} />
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {messages.map(msg => (
              <div key={msg.id} style={{ display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start', gap: '7px', alignItems: 'flex-end' }}>
                {msg.sender === 'system' && (
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginBottom: '2px' }}>
                    <Bot size={11} color="#3b82f6" />
                  </div>
                )}
                <div style={{
                  maxWidth: '78%',
                  padding: '0.5rem 0.75rem',
                  borderRadius: msg.sender === 'user' ? '10px 10px 2px 10px' : '10px 10px 10px 2px',
                  background: msg.sender === 'user' ? '#3b82f6' : '#f1f5f9',
                  color: msg.sender === 'user' ? 'white' : 'var(--text-primary)',
                  fontSize: '0.825rem',
                  lineHeight: 1.55,
                }}>
                  {msg.text}
                </div>
                {msg.sender === 'user' && (
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, marginBottom: '2px' }}>
                    <img src="https://i.pravatar.cc/150?img=11" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '7px' }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Bot size={11} color="#3b82f6" />
                </div>
                <div style={{ padding: '0.5rem 0.75rem', borderRadius: '10px 10px 10px 2px', background: '#f1f5f9', display: 'flex', gap: '3px', alignItems: 'center' }}>
                  {[0,1,2].map(i => (
                    <div key={i} style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#94a3b8', animation: 'typingBounce 1.2s infinite', animationDelay: `${i * 0.2}s` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} style={{ padding: '0.75rem', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '8px', alignItems: 'center', background: 'white', flexShrink: 0 }}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask about this page..."
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              style={{ flex: 1, padding: '0.45rem 0.75rem', borderRadius: '8px', border: '1.5px solid var(--border-color)', outline: 'none', fontSize: '0.825rem', color: 'var(--text-primary)', background: '#f8fafc', transition: 'border-color 0.15s' }}
              onFocus={e => e.target.style.borderColor = '#3b82f6'}
              onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
            />
            <button type="submit" disabled={!inputValue.trim()} style={{ width: '32px', height: '32px', borderRadius: '8px', background: inputValue.trim() ? '#3b82f6' : '#e5e7eb', border: 'none', cursor: inputValue.trim() ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.15s' }}>
              <Send size={13} color="white" style={{ marginLeft: '1px' }} />
            </button>
          </form>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        title="Ask intelligence"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: open ? '#1d4ed8' : '#3b82f6',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(59,130,246,0.4)',
          transition: 'background 0.2s, transform 0.2s',
          zIndex: 201,
          transform: open ? 'scale(0.92)' : 'scale(1)',
        }}
      >
        {open ? <X size={19} color="white" /> : <MessageSquare size={19} color="white" />}
        {!open && unread > 0 && (
          <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '17px', height: '17px', borderRadius: '50%', background: '#ef4444', color: 'white', fontSize: '0.6rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid white' }}>
            {unread}
          </span>
        )}
      </button>

      <style>{`
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }
      `}</style>
    </>
  );
}
