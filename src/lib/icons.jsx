import { drawRef } from './drawIcon';
import React from 'react';

// Exact 12 SVGs matching design reference mockup (03-mockups)
export const programIcons = {
  'traffic-park': (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 9.5l9-7 9 7v10a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19.5v-10z" />
      <polyline points="9 21 9 12 15 12 15 21" />
    </svg>
  ),
  'first-aid': (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  ),
  'car-mechanics': (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v18M3 12h18" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  ),
  'self-defense': (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  'gardening': (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22V12" />
      <path d="M12 12C9 7 4 8 4 12c0 3 3 5 8 5" />
      <path d="M12 15c5 0 8-2 8-5 0-4-5-5-8 2" />
    </svg>
  ),
  'nutrition': (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 11h16a8 8 0 0 1-16 0z" />
      <path d="M8 5v2.5M12 4v3.5M16 5v2.5" />
    </svg>
  ),
  'electric-plumbing': (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  'ai-it-digital': (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  'social-media': (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="6" y="2" width="12" height="20" rx="2.5" ry="2.5" />
      <line x1="11" y1="18" x2="13" y2="18" />
    </svg>
  ),
  'entrepreneurship': (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 18h6M10 22h4M15 8a3 3 0 1 0-6 0c0 1.657 1 3 2 4v2h2v-2c1-1 2-2.343 2-4z" />
    </svg>
  ),
  'character-building': (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  'personal-hygiene': (props) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  ),
};

export function ProgramIcon({ name, id, className = 'w-6 h-6 stroke-[#8E793E]' }) {
  const key = id || name;
  const IconComponent = programIcons[key] || programIcons['gardening'];
  return <IconComponent ref={drawRef} className={`icon-draw ${className}`} />;
}

export function InstagramIcon({ className = 'w-5 h-5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      ref={drawRef}
      className={`icon-draw ${className}`}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2.2" />
    </svg>
  );
}

