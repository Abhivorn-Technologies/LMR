import React from "react";

// Helper for common premium icon container setup
const SVGContainer = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="primary-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#115E59" />
        <stop offset="100%" stopColor="#00B4D8" />
      </linearGradient>
      <linearGradient id="secondary-grad" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#04151A" />
        <stop offset="100%" stopColor="#115E59" />
      </linearGradient>
      <linearGradient id="accent-grad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#00E5FF" />
        <stop offset="100%" stopColor="#115E59" stopOpacity="0.5" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#04151a" floodOpacity="0.15" />
      </filter>
    </defs>
    {children}
  </svg>
);

export const GeneralInsuranceIcon = ({ className }: { className?: string }) => (
  <SVGContainer className={className}>
    <path d="M32 6L10 14v16c0 14 16 26 22 28 6-2 22-14 22-28V14L32 6z" fill="url(#primary-grad)" fillOpacity="0.15" filter="url(#shadow)" />
    <path d="M32 6L10 14v16c0 14 16 26 22 28 6-2 22-14 22-28V14L32 6z" stroke="url(#primary-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M32 6v52" stroke="url(#accent-grad)" strokeWidth="2" strokeOpacity="0.4" strokeDasharray="4 4" />
    <path d="M22 30l7 7 13-13" stroke="url(#secondary-grad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)" />
    <circle cx="32" cy="32" r="20" stroke="url(#accent-grad)" strokeWidth="1" strokeOpacity="0.5" />
  </SVGContainer>
);

export const LifeInsuranceIcon = ({ className }: { className?: string }) => (
  <SVGContainer className={className}>
    <path d="M32 18c0-8-12-12-20-6-7.5 5.5-6 17 0 24s20 18 20 18 14-11 20-18 7.5-18.5 0-24c-8-6-20-2-20 6z" fill="url(#primary-grad)" fillOpacity="0.15" filter="url(#shadow)" />
    <path d="M32 18c0-8-12-12-20-6-7.5 5.5-6 17 0 24s20 18 20 18 14-11 20-18 7.5-18.5 0-24c-8-6-20-2-20 6z" stroke="url(#primary-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="32" cy="28" r="6" fill="url(#secondary-grad)" filter="url(#glow)" />
    <path d="M22 42c0-5 5-10 10-10s10 5 10 10" stroke="url(#secondary-grad)" strokeWidth="3" strokeLinecap="round" />
    <circle cx="24" cy="34" r="3" fill="url(#accent-grad)" />
    <circle cx="40" cy="34" r="3" fill="url(#accent-grad)" />
  </SVGContainer>
);

export const ReinsuranceIcon = ({ className }: { className?: string }) => (
  <SVGContainer className={className}>
    <path d="M32 8A24 24 0 118 32c0-8 6-16 14-20" stroke="url(#primary-grad)" strokeWidth="3" strokeLinecap="round" fill="none" filter="url(#shadow)" />
    <path d="M32 56a24 24 0 1124-24c0 8-6 16-14 20" stroke="url(#secondary-grad)" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M14 12l8 8-8 8" stroke="url(#primary-grad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M50 52l-8-8 8-8" stroke="url(#secondary-grad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="32" cy="32" r="10" fill="url(#accent-grad)" fillOpacity="0.2" stroke="url(#primary-grad)" strokeWidth="2" strokeDasharray="6 4" />
    <circle cx="32" cy="32" r="4" fill="url(#secondary-grad)" filter="url(#glow)" />
  </SVGContainer>
);

export const ClaimServicesIcon = ({ className }: { className?: string }) => (
  <SVGContainer className={className}>
    <rect x="14" y="8" width="36" height="48" rx="6" fill="url(#primary-grad)" fillOpacity="0.1" filter="url(#shadow)" />
    <rect x="14" y="8" width="36" height="48" rx="6" stroke="url(#primary-grad)" strokeWidth="2.5" />
    <path d="M22 20h20M22 30h20M22 40h10" stroke="url(#secondary-grad)" strokeWidth="3" strokeLinecap="round" />
    <circle cx="44" cy="44" r="12" fill="#fff" stroke="url(#primary-grad)" strokeWidth="2.5" filter="url(#shadow)" />
    <path d="M39 44l3 3 7-7" stroke="url(#secondary-grad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)" />
    <path d="M14 16l36 0" stroke="url(#primary-grad)" strokeWidth="1" strokeOpacity="0.5" strokeDasharray="4 4" />
  </SVGContainer>
);

export const RiskManagementIcon = ({ className }: { className?: string }) => (
  <SVGContainer className={className}>
    <path d="M8 56h48" stroke="url(#primary-grad)" strokeWidth="3" strokeLinecap="round" />
    <rect x="12" y="32" width="10" height="24" rx="2" fill="url(#primary-grad)" fillOpacity="0.2" stroke="url(#primary-grad)" strokeWidth="2" />
    <rect x="27" y="18" width="10" height="38" rx="2" fill="url(#secondary-grad)" fillOpacity="0.2" stroke="url(#secondary-grad)" strokeWidth="2" />
    <rect x="42" y="8" width="10" height="48" rx="2" fill="url(#accent-grad)" fillOpacity="0.2" stroke="url(#accent-grad)" strokeWidth="2" filter="url(#shadow)" />
    <path d="M8 40l14-14 15 6 19-20" stroke="url(#secondary-grad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)" />
    <circle cx="56" cy="12" r="4" fill="url(#primary-grad)" />
  </SVGContainer>
);

export const ConsultingIcon = ({ className }: { className?: string }) => (
  <SVGContainer className={className}>
    <path d="M32 10a18 18 0 00-18 18c0 7.5 4.5 13 8 16v6a4 4 0 004 4h12a4 4 0 004-4v-6c3.5-3 8-8.5 8-16a18 18 0 00-18-18z" fill="url(#primary-grad)" fillOpacity="0.15" filter="url(#shadow)" />
    <path d="M32 10a18 18 0 00-18 18c0 7.5 4.5 13 8 16v6a4 4 0 004 4h12a4 4 0 004-4v-6c3.5-3 8-8.5 8-16a18 18 0 00-18-18z" stroke="url(#primary-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M22 50h20M24 56h16" stroke="url(#secondary-grad)" strokeWidth="3" strokeLinecap="round" />
    <circle cx="32" cy="28" r="8" fill="url(#secondary-grad)" filter="url(#glow)" />
    <path d="M32 8V2M32 20v8M18 14l-4-4M24 22l-6-6M46 14l4-4M40 22l6-6M10 28H4M20 28h-6M54 28h6M44 28h6" stroke="url(#accent-grad)" strokeWidth="2.5" strokeLinecap="round" />
  </SVGContainer>
);
