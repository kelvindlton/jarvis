import React, { useState } from 'react';
import { Play, FlaskConical, RefreshCw, ChevronRight, X, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import FloatingChat from './FloatingChat';

const CATEGORY_COLORS = {
  Strategy:   { bg: '#3b82f6', light: '#eff6ff', text: '#1d4ed8' },
  Finance:    { bg: '#f59e0b', light: '#fef9c3', text: '#92400e' },
  Operations: { bg: '#10b981', light: '#f0fdf4', text: '#065f46' },
  Tech:       { bg: '#0ea5e9', light: '#f0f9ff', text: '#0369a1' },
  Legal:      { bg: '#8b5cf6', light: '#fdf4ff', text: '#6d28d9' },
};

const SKILLS = [
  { id: 1, name: 'Strategic Analysis',      skill: 'Strategic Analysis',      level: 78, tested: true  },
  { id: 2, name: 'Financial Modelling',     skill: 'Financial Modelling',     level: 61, tested: true  },
  { id: 3, name: 'Market Intelligence',     skill: 'Market Intelligence',     level: 85, tested: true  },
  { id: 4, name: 'Supply Chain Risk',       skill: 'Supply Chain Risk',       level: 44, tested: false },
  { id: 5, name: 'AI & Data Literacy',      skill: 'AI & Data Literacy',      level: 70, tested: true  },
  { id: 6, name: 'Regulatory Compliance',   skill: 'Regulatory Compliance',   level: 38, tested: false },
  { id: 7, name: 'Executive Communication', skill: 'Executive Communication', level: 82, tested: true  },
  { id: 8, name: 'Negotiation',             skill: 'Negotiation',             level: 55, tested: false },
];

const QUESTIONS = [
  {
    skill: 'Strategic Analysis',
    question: 'Which framework analyses Suppliers, Buyers, Substitutes, New Entrants, and Rivalry to assess industry competitiveness?',
    options: ["SWOT Analysis", "Porter's Five Forces", "PESTLE Framework", "BCG Matrix"],
    correct: 1,
    explanation: "Porter's Five Forces is the foundational framework for analysing industry structure and competitive intensity.",
  },
  {
    skill: 'Strategic Analysis',
    question: 'A company has a high market share in a low-growth market. In the BCG Matrix, this is classified as a:',
    options: ['Star', 'Question Mark', 'Cash Cow', 'Dog'],
    correct: 2,
    explanation: 'Cash Cows generate steady cash flow in mature markets. They fund Stars and Question Marks.',
  },
  {
    skill: 'Financial Modelling',
    question: 'EBITDA is best described as:',
    options: [
      'Net income after all deductions',
      'Earnings before interest, taxes, depreciation, and amortisation',
      'Total revenue minus cost of goods sold',
      'Free cash flow available to equity holders',
    ],
    correct: 1,
    explanation: 'EBITDA strips out financing and accounting decisions to show core operational profitability.',
  },
  {
    skill: 'Financial Modelling',
    question: 'When a company\'s P/E ratio is significantly higher than its sector peers, this typically signals:',
    options: [
      'The company is undervalued',
      'Investors expect higher future growth',
      'The company has lower earnings quality',
      'The stock is due for a correction',
    ],
    correct: 1,
    explanation: 'A premium P/E reflects market expectations of above-average earnings growth or superior quality.',
  },
  {
    skill: 'Market Intelligence',
    question: 'Which competitive intelligence method involves systematically monitoring publicly available competitor information?',
    options: ['Primary research', 'OSINT (Open-Source Intelligence)', 'Ethnographic research', 'Regression analysis'],
    correct: 1,
    explanation: 'OSINT aggregates public signals — earnings calls, filings, job postings — to build competitive intelligence.',
  },
  {
    skill: 'Supply Chain Risk',
    question: 'A company that sources a critical component from only one supplier is exposed to:',
    options: ['Demand risk', 'Single-source concentration risk', 'Currency risk', 'Regulatory risk'],
    correct: 1,
    explanation: 'Single-source dependency is a primary supply chain vulnerability. Dual- or multi-sourcing is the standard mitigation.',
  },
  {
    skill: 'AI & Data Literacy',
    question: 'In machine learning, "overfitting" means:',
    options: [
      'The model trains too slowly on large datasets',
      'The model performs well on training data but poorly on new data',
      'The model requires too much computing power',
      'The training dataset is too small to be useful',
    ],
    correct: 1,
    explanation: 'Overfitting occurs when a model memorises training data rather than learning generalisable patterns.',
  },
  {
    skill: 'Regulatory Compliance',
    question: 'GDPR primarily governs:',
    options: [
      'Financial reporting standards in the EU',
      'Personal data processing and privacy rights for EU individuals',
      'Cross-border trade regulations between EU member states',
      'Environmental standards for EU-based manufacturers',
    ],
    correct: 1,
    explanation: 'GDPR (General Data Protection Regulation) sets rights and obligations around personal data across the EU.',
  },
  {
    skill: 'Executive Communication',
    question: 'The "Pyramid Principle" in executive communication recommends:',
    options: [
      'Building to the conclusion through detailed supporting data',
      'Leading with the conclusion, then supporting with arguments and data',
      'Presenting equal weight to all perspectives before recommending',
      'Structuring communication chronologically',
    ],
    correct: 1,
    explanation: "McKinsey's Pyramid Principle leads with the answer — executives need the conclusion first, then evidence.",
  },
  {
    skill: 'Negotiation',
    question: 'BATNA stands for:',
    options: [
      'Best Alternative To a Negotiated Agreement',
      'Basic Approach To Neutral Arbitration',
      'Bilateral Agreement Through Negotiated Alternatives',
      'Best Attainable Terms in Negotiation Analysis',
    ],
    correct: 0,
    explanation: 'BATNA is your walk-away position — knowing it gives you leverage and prevents accepting a bad deal.',
  },
];

const COURSES = [
  {
    id: 1,
    title: 'Advanced Corporate Strategy',
    provider: 'Harvard Business School',
    instructor: 'Prof. Michael Porter',
    duration: '6 weeks',
    category: 'Strategy',
    progress: 42,
    status: 'in-progress',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Supply Chain Risk Management',
    provider: 'MIT OpenCourseWare',
    instructor: 'Dr. Yossi Sheffi',
    duration: '4 weeks',
    category: 'Operations',
    progress: 0,
    status: 'suggested',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600&auto=format&fit=crop',
    aiReason: 'Your Supply Chain Risk score is below the target threshold.',
  },
  {
    id: 3,
    title: 'Financial Statement Analysis & Valuation',
    provider: 'Coursera · Wharton',
    instructor: 'Prof. Brian Bushee',
    duration: '8 weeks',
    category: 'Finance',
    progress: 0,
    status: 'suggested',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=600&auto=format&fit=crop',
    aiReason: 'Completing this will raise your Financial Modelling score into your target range.',
  },
  {
    id: 4,
    title: 'Regulatory Intelligence for Global Business',
    provider: 'LinkedIn Learning',
    instructor: 'Sarah Johnson, JD',
    duration: '3 weeks',
    category: 'Legal',
    progress: 0,
    status: 'suggested',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=600&auto=format&fit=crop',
    aiReason: 'EMEA regulatory signals are spiking. Compliance is your highest-risk gap.',
  },
  {
    id: 5,
    title: 'Negotiation Mastery',
    provider: 'Harvard Business School',
    instructor: 'Prof. Deepak Malhotra',
    duration: '7 weeks',
    category: 'Strategy',
    progress: 0,
    status: 'suggested',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=600&auto=format&fit=crop',
    aiReason: 'Three upcoming vendor renewals flagged. Strengthening this will directly impact outcomes.',
  },
  {
    id: 6,
    title: 'AI for Business Leaders',
    provider: 'DeepLearning.AI',
    instructor: 'Andrew Ng',
    duration: '5 weeks',
    category: 'Tech',
    progress: 88,
    status: 'in-progress',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=600&auto=format&fit=crop',
  },
];

function levelLabel(level) {
  if (level >= 80) return 'Expert';
  if (level >= 60) return 'Proficient';
  if (level >= 40) return 'Developing';
  return 'Beginner';
}

/* ── Assessment overlay ── */
function Assessment({ onClose, onComplete }) {
  const [phase, setPhase]           = useState('intro'); // intro | quiz | results
  const [current, setCurrent]       = useState(0);
  const [selected, setSelected]     = useState(null);
  const [revealed, setRevealed]     = useState(false);
  const [answers, setAnswers]       = useState([]); // { skill, correct: bool, newLevel }

  const q = QUESTIONS[current];
  const isLast = current === QUESTIONS.length - 1;

  const handleSelect = (idx) => {
    if (revealed) return;
    setSelected(idx);
  };

  const handleReveal = () => {
    if (selected === null) return;
    setRevealed(true);
  };

  const handleNext = () => {
    const isCorrect = selected === q.correct;
    const delta = isCorrect ? Math.floor(Math.random() * 6) + 5 : Math.floor(Math.random() * 3);
    setAnswers(prev => [...prev, { skill: q.skill, correct: isCorrect, delta }]);
    if (isLast) {
      setPhase('results');
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setRevealed(false);
    }
  };

  const correctCount = answers.filter(a => a.correct).length;
  const score = Math.round((correctCount / QUESTIONS.length) * 100);

  if (phase === 'intro') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: '1.5rem', textAlign: 'center', maxWidth: '520px', margin: '0 auto' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FlaskConical size={28} color="#3b82f6" />
        </div>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.625rem' }}>Skill Assessment</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
            {QUESTIONS.length} questions across your key skill areas. Answer honestly — results update your skill profile and surface the most relevant courses.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%', background: '#f8fafc', borderRadius: '12px', padding: '1rem 1.25rem' }}>
          {[
            `${QUESTIONS.length} multiple-choice questions`,
            'Instant feedback after each answer',
            'Skill profile updated on completion',
          ].map(item => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <CheckCircle2 size={14} color="#10b981" /> {item}
            </div>
          ))}
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setPhase('quiz')}
          style={{ fontSize: '0.9rem', padding: '0.65rem 2rem', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          Start Assessment <ArrowRight size={15} />
        </button>
      </div>
    );
  }

  if (phase === 'results') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '560px', margin: '0 auto' }}>
        {/* Score banner */}
        <div style={{ textAlign: 'center', padding: '2rem', background: score >= 70 ? '#f0fdf4' : '#fef9c3', borderRadius: '16px', border: `1px solid ${score >= 70 ? '#bbf7d0' : '#fde68a'}` }}>
          <div style={{ fontSize: '3rem', fontWeight: 800, color: score >= 70 ? '#16a34a' : '#ca8a04', lineHeight: 1 }}>{score}%</div>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.5rem' }}>
            {score >= 80 ? 'Excellent performance' : score >= 60 ? 'Solid result' : 'Room to grow'}
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            {correctCount} of {QUESTIONS.length} correct
          </div>
        </div>

        {/* Per-skill breakdown */}
        <div>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.875rem' }}>
            Skill Updates
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {answers.map((a, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '0.75rem 1rem', background: 'white', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                {a.correct
                  ? <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0 }} />
                  : <XCircle size={16} color="#ef4444" style={{ flexShrink: 0 }} />
                }
                <div style={{ flex: 1, fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{a.skill}</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: a.correct ? '#10b981' : '#f59e0b' }}>
                  +{a.delta} pts
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => onComplete(answers)}
          style={{ alignSelf: 'center', fontSize: '0.9rem', padding: '0.65rem 2rem' }}
        >
          Update My Profile
        </button>
      </div>
    );
  }

  // Quiz phase
  const progress = ((current) / QUESTIONS.length) * 100;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', maxWidth: '620px', margin: '0 auto' }}>
      {/* Progress bar */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
          <span style={{ fontWeight: 600 }}>Question {current + 1} of {QUESTIONS.length}</span>
          <span style={{ color: '#3b82f6', fontWeight: 700 }}>{q.skill}</span>
        </div>
        <div style={{ height: '4px', background: '#e2e8f0', borderRadius: '99px', overflow: 'hidden' }}>
          <div style={{ width: `${progress}%`, height: '100%', background: '#3b82f6', borderRadius: '99px', transition: 'width 0.3s ease' }} />
        </div>
      </div>

      {/* Question */}
      <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.45 }}>
        {q.question}
      </div>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
        {q.options.map((opt, idx) => {
          let bg = 'white', border = 'var(--border-color)', color = 'var(--text-primary)';
          if (revealed) {
            if (idx === q.correct) { bg = '#f0fdf4'; border = '#86efac'; color = '#15803d'; }
            else if (idx === selected && idx !== q.correct) { bg = '#fef2f2'; border = '#fca5a5'; color = '#dc2626'; }
          } else if (idx === selected) {
            bg = '#eff6ff'; border = '#93c5fd'; color = '#1d4ed8';
          }
          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              style={{
                width: '100%', textAlign: 'left', padding: '0.875rem 1.125rem',
                borderRadius: '10px', border: `1.5px solid ${border}`,
                background: bg, color, fontSize: '0.9rem', fontWeight: 500,
                cursor: revealed ? 'default' : 'pointer',
                transition: 'all 0.12s ease', lineHeight: 1.4,
                display: 'flex', alignItems: 'center', gap: '10px',
              }}
            >
              <span style={{ width: '22px', height: '22px', borderRadius: '50%', border: `1.5px solid ${border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 700, flexShrink: 0, background: idx === selected || (revealed && idx === q.correct) ? bg : 'transparent' }}>
                {revealed && idx === q.correct ? <CheckCircle2 size={14} color="#16a34a" /> : revealed && idx === selected && idx !== q.correct ? <XCircle size={14} color="#dc2626" /> : String.fromCharCode(65 + idx)}
              </span>
              {opt}
            </button>
          );
        })}
      </div>

      {/* Explanation (after reveal) */}
      {revealed && (
        <div className="animate-fade-in" style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '10px', padding: '0.875rem 1rem', fontSize: '0.85rem', color: '#0c4a6e', lineHeight: 1.55 }}>
          <strong>Explanation:</strong> {q.explanation}
        </div>
      )}

      {/* Action button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {!revealed ? (
          <button
            className="btn btn-primary"
            onClick={handleReveal}
            disabled={selected === null}
            style={{ fontSize: '0.875rem', padding: '0.55rem 1.5rem', opacity: selected === null ? 0.5 : 1 }}
          >
            Check Answer
          </button>
        ) : (
          <button
            className="btn btn-primary"
            onClick={handleNext}
            style={{ fontSize: '0.875rem', padding: '0.55rem 1.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            {isLast ? 'See Results' : 'Next Question'} <ArrowRight size={14} />
          </button>
        )}
      </div>
    </div>
  );
}

/* ── Main Component ── */
export default function LearningHub() {
  const [skills, setSkills]           = useState(SKILLS);
  const [tab, setTab]                 = useState('active');
  const [showAssessment, setShowAssessment] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleAssessmentComplete = (answers) => {
    setSkills(prev => prev.map(skill => {
      const result = answers.find(a => a.skill === skill.name);
      if (!result) return skill;
      return { ...skill, level: Math.min(100, skill.level + result.delta), tested: true };
    }));
    setShowAssessment(false);
    setTab('skills');
  };

  const activeCount    = COURSES.filter(c => c.status === 'in-progress').length;
  const suggestedCount = COURSES.filter(c => c.status === 'suggested').length;

  const heroCourse = COURSES
    .filter(c => c.status === 'in-progress')
    .sort((a, b) => b.progress - a.progress)[0];

  const visibleCourses = COURSES.filter(c => {
    if (tab === 'active')    return c.status === 'in-progress';
    if (tab === 'suggested') return c.status === 'suggested';
    return false;
  });

  const catColor = (cat) => CATEGORY_COLORS[cat] || { bg: '#6b7280', light: '#f3f4f6', text: '#374151' };

  if (showAssessment) {
    return (
      <main className="main-content">
        {/* Assessment header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => setShowAssessment(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--text-muted)', padding: '4px' }}
            >
              <X size={18} />
            </button>
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Skill Assessment</span>
          </div>
          <button onClick={() => setShowAssessment(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Exit
          </button>
        </div>
        <Assessment onClose={() => setShowAssessment(false)} onComplete={handleAssessmentComplete} />
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </main>
    );
  }

  return (
    <main className="main-content" style={{ background: '#f7f9fa' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 800, marginBottom: '0.375rem' }}>My Courses</h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: 0 }}>
              Continue your learning journey where you left off.
            </p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setShowAssessment(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem', padding: '0.6rem 1.25rem', flexShrink: 0, whiteSpace: 'nowrap' }}
          >
            <FlaskConical size={13} /> Assessment
          </button>
        </div>

        {/* Hero */}
        {heroCourse && (
          <div className="animate-fade-in" style={{ borderRadius: '16px', overflow: 'hidden', background: '#0f172a', display: 'flex', minHeight: '200px', boxShadow: '0 8px 32px rgba(0,0,0,0.14)' }}>
            <div style={{ width: '220px', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
              <img src={heroCourse.image} alt={heroCourse.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.55)' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent, #0f172a)' }} />
              <span style={{ position: 'absolute', bottom: '12px', left: '12px', fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', background: catColor(heroCourse.category).bg, color: 'white', padding: '3px 8px', borderRadius: '99px' }}>
                {heroCourse.category}
              </span>
            </div>
            <div style={{ flex: 1, padding: '1.75rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.75rem' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#64748b' }}>Current Objective</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white', lineHeight: 1.3 }}>{heroCourse.title}</div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{heroCourse.instructor} · {heroCourse.provider}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginTop: '0.25rem' }}>
                <div style={{ flex: 1, height: '4px', background: '#1e293b', borderRadius: '99px', overflow: 'hidden', maxWidth: '240px' }}>
                  <div style={{ width: `${heroCourse.progress}%`, height: '100%', background: '#3b82f6', borderRadius: '99px' }} />
                </div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#3b82f6' }}>{heroCourse.progress}%</span>
                <span style={{ fontSize: '0.72rem', color: '#64748b' }}>{100 - heroCourse.progress}% remaining</span>
              </div>
              <button className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem', padding: '0.5rem 1.125rem' }}>
                <Play size={12} /> Continue
              </button>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0', borderBottom: '2px solid var(--border-color)', marginBottom: '-0.5rem' }}>
          {[
            { key: 'active',    label: `Active (${activeCount})` },
            { key: 'suggested', label: `Suggested (${suggestedCount})` },
            { key: 'skills',    label: 'Skills' },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{ padding: '0.625rem 1.125rem', background: 'none', border: 'none', borderBottom: tab === t.key ? '2px solid #3b82f6' : '2px solid transparent', marginBottom: '-2px', fontSize: '0.875rem', fontWeight: tab === t.key ? 700 : 500, color: tab === t.key ? '#3b82f6' : 'var(--text-muted)', cursor: 'pointer', transition: 'all 0.15s ease', whiteSpace: 'nowrap' }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Course grid */}
        {tab !== 'skills' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
            {visibleCourses.map((course, idx) => {
              const cc = catColor(course.category);
              const isHovered = hoveredCard === course.id;
              return (
                <div key={course.id} className="animate-fade-in" onMouseEnter={() => setHoveredCard(course.id)} onMouseLeave={() => setHoveredCard(null)} style={{ background: 'white', borderRadius: '14px', overflow: 'hidden', boxShadow: isHovered ? '0 12px 32px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.06)', transform: isHovered ? 'translateY(-3px)' : 'translateY(0)', transition: 'all 0.18s ease', animationDelay: `${0.04 * idx}s`, display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
                  <div style={{ height: '140px', position: 'relative', overflow: 'hidden', background: '#0f172a' }}>
                    <img src={course.image} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.65)', transition: 'transform 0.3s ease', transform: isHovered ? 'scale(1.05)' : 'scale(1)' }} />
                    <span style={{ position: 'absolute', top: '10px', left: '10px', fontSize: '0.58rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', background: cc.bg, color: 'white', padding: '3px 8px', borderRadius: '99px' }}>
                      {course.category}
                    </span>
                  </div>
                  <div style={{ padding: '1rem 1.125rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.35 }}>{course.title}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{course.instructor}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{course.provider} · {course.duration}</div>
                    {course.aiReason && (
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.4, marginTop: '0.25rem', borderLeft: `2px solid ${cc.bg}`, paddingLeft: '8px' }}>{course.aiReason}</div>
                    )}
                  </div>
                  <div style={{ padding: '0.75rem 1.125rem', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Progress</div>
                      <div style={{ height: '3px', background: '#e2e8f0', borderRadius: '99px', overflow: 'hidden' }}>
                        <div style={{ width: `${course.progress}%`, height: '100%', background: cc.bg, borderRadius: '99px' }} />
                      </div>
                    </div>
                    <button className="btn btn-primary" style={{ fontSize: '0.72rem', padding: '0.3rem 0.75rem', display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                      {course.status === 'in-progress' ? <><Play size={10} /> Continue</> : <><ChevronRight size={10} /> Start</>}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Skills tab */}
        {tab === 'skills' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {skills.map(skill => (
              <div key={skill.id} style={{ background: 'white', borderRadius: '10px', padding: '1rem 1.25rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '196px', flexShrink: 0 }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{skill.name}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>{levelLabel(skill.level)}</div>
                </div>
                <div style={{ flex: 1, height: '5px', background: '#e2e8f0', borderRadius: '99px', overflow: 'hidden' }}>
                  <div style={{ width: `${skill.level}%`, height: '100%', background: '#3b82f6', borderRadius: '99px', transition: 'width 0.4s ease' }} />
                </div>
                <div style={{ width: '30px', textAlign: 'right', fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', flexShrink: 0 }}>{skill.level}</div>
                <div style={{ fontSize: '0.7rem', color: skill.tested ? '#10b981' : 'var(--text-muted)', fontWeight: 600, flexShrink: 0, width: '60px', textAlign: 'right' }}>
                  {skill.tested ? '✓ Assessed' : 'Not tested'}
                </div>
              </div>
            ))}
            <button onClick={() => setShowAssessment(true)} className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem', padding: '0.55rem 1.25rem' }}>
              <FlaskConical size={13} /> Retake Assessment
            </button>
          </div>
        )}

      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      <FloatingChat pageContext="Learning Hub" />
    </main>
  );
}
