import React, { useState, useEffect } from 'react';

// Simple SVG icons for the tech stack
const ReactIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
    <circle cx="12" cy="12" r="2.5" fill="#61DAFB" />
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1" fill="none" />
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1" fill="none" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1" fill="none" transform="rotate(120 12 12)" />
  </svg>
);

const ViteIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
    <path d="M21.5 3L12 22L2.5 3H8.5L12 10L15.5 3H21.5Z" fill="#BD34FE" />
    <path d="M21.5 3L12 22L8.5 3H2.5L12 22L21.5 3Z" fill="url(#vite-grad)" fillOpacity="0.6" />
    <defs><linearGradient id="vite-grad" x1="2.5" y1="3" x2="21.5" y2="3"><stop stopColor="#41D1FF" /><stop offset="1" stopColor="#BD34FE" /></linearGradient></defs>
  </svg>
);

const TSIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
    <rect x="2" y="2" width="20" height="20" rx="2" fill="#3178C6" />
    <text x="12" y="17" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="sans-serif">TS</text>
  </svg>
);

const TailwindIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
    <path d="M12 6C9.33 6 7.67 7.33 7 10C8 8.67 9.17 8.17 10.5 8.5C11.26 8.69 11.81 9.25 12.41 9.86C13.42 10.89 14.58 12 17 12C19.67 12 21.33 10.67 22 8C21 9.33 19.83 9.83 18.5 9.5C17.74 9.31 17.19 8.75 16.59 8.14C15.58 7.11 14.42 6 12 6ZM7 12C4.33 12 2.67 13.33 2 16C3 14.67 4.17 14.17 5.5 14.5C6.26 14.69 6.81 15.25 7.41 15.86C8.42 16.89 9.58 18 12 18C14.67 18 16.33 16.67 17 14C16 15.33 14.83 15.83 13.5 15.5C12.74 15.31 12.19 14.75 11.59 14.14C10.58 13.11 9.42 12 7 12Z" fill="#06B6D4" />
  </svg>
);

const COUNTER_KEY = 'portfolio_visit_count';
const COUNTER_SESSION_KEY = 'portfolio_session_counted';

export const TechBadge: React.FC = () => {
  const [views, setViews] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    const stored = localStorage.getItem(COUNTER_KEY);
    return stored ? parseInt(stored, 10) : 0;
  });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const timer = setTimeout(() => {
      // Only increment once per session
      if (!sessionStorage.getItem(COUNTER_SESSION_KEY)) {
        setViews(prev => {
          const next = prev + 1;
          localStorage.setItem(COUNTER_KEY, String(next));
          return next;
        });
        sessionStorage.setItem(COUNTER_SESSION_KEY, 'true');
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="fixed bottom-4 right-4 z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 backdrop-blur-md transition-all duration-300 cursor-default select-none"
        style={{
          background: 'rgba(12, 12, 12, 0.75)',
          boxShadow: isHovered
            ? '0 0 20px rgba(97, 218, 251, 0.15), 0 4px 12px rgba(0,0,0,0.4)'
            : '0 2px 8px rgba(0,0,0,0.3)',
          transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        }}
      >
        {/* Tech icons */}
        <div className="flex items-center gap-1.5">
          <ReactIcon />
          <ViteIcon />
          <TSIcon />
          <TailwindIcon />
        </div>

        {/* Divider */}
        <div className="w-px h-4 bg-white/10" />

        {/* View counter */}
        <div className="flex items-center gap-1">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[11px] text-white/50 font-mono tracking-tight">
            {views.toLocaleString()} {views === 1 ? 'visit' : 'visits'}
          </span>
        </div>
      </div>
    </div>
  );
};
