import React from 'react';

// Brand Logo
export const BrandLogoIcon: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="36" height="36" rx="10" fill="url(#brand_logo_grad)" />
    <path
      d="M10 13C10 11.3431 11.3431 10 13 10H23C24.6569 10 26 11.3431 26 13V18C26 22.4183 22.4183 26 18 26C13.5817 26 10 22.4183 10 18V13Z"
      stroke="#FFFFFF"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="18" cy="18" r="3" fill="#FFFFFF" />
    <defs>
      <linearGradient id="brand_logo_grad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
        <stop stopColor="var(--semi-color-primary, #6E29F6)" />
        <stop offset="1" stopColor="var(--semi-color-primary-active, #4F19CF)" />
      </linearGradient>
    </defs>
  </svg>
);

// Matrix Icon: 智能体开发平台
export const AgentMatrixIcon: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <rect width="40" height="40" rx="10" fill="var(--semi-color-primary-light-default)" />
    <path
      d="M20 11V15M14 20H11M29 20H26M20 29V25"
      stroke="var(--semi-color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <rect x="14" y="15" width="12" height="10" rx="3" stroke="var(--semi-color-primary)" strokeWidth="2" />
    <circle cx="17.5" cy="20" r="1" fill="var(--semi-color-primary)" />
    <circle cx="22.5" cy="20" r="1" fill="var(--semi-color-primary)" />
  </svg>
);

// Matrix Icon: 大模型广场
export const ModelsMatrixIcon: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <rect width="40" height="40" rx="10" fill="var(--semi-color-primary-light-default)" />
    <circle cx="20" cy="20" r="8" stroke="var(--semi-color-primary)" strokeWidth="2" strokeDasharray="3 3" />
    <circle cx="20" cy="20" r="4" fill="var(--semi-color-primary)" />
    <circle cx="12" cy="14" r="2" fill="var(--semi-color-primary)" />
    <circle cx="28" cy="14" r="2" fill="var(--semi-color-primary)" />
    <circle cx="20" cy="30" r="2" fill="var(--semi-color-primary)" />
  </svg>
);

// Matrix Icon: 算力运营
export const ComputeMatrixIcon: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <rect width="40" height="40" rx="10" fill="var(--semi-color-primary-light-default)" />
    <rect x="12" y="13" width="16" height="14" rx="2" stroke="var(--semi-color-primary)" strokeWidth="2" />
    <path d="M16 19H24M16 23H21" stroke="var(--semi-color-primary)" strokeWidth="2" strokeLinecap="round" />
    <circle cx="24" cy="16" r="1" fill="var(--semi-color-primary)" />
  </svg>
);

// Matrix Icon: 服务网关
export const GatewayMatrixIcon: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <rect width="40" height="40" rx="10" fill="var(--semi-color-primary-light-default)" />
    <path
      d="M13 15L20 11L27 15V22C27 25.5 24 28.5 20 29.5C16 28.5 13 25.5 13 22V15Z"
      stroke="var(--semi-color-primary)"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path d="M18 20L20 22L23 18" stroke="var(--semi-color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Advantage Icons
export const AdvantageIcon: React.FC<{ name: string; size?: number }> = ({ name, size = 36 }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '8px',
        backgroundColor: 'var(--semi-color-primary-light-default)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--semi-color-primary)',
        flexShrink: 0,
      }}
    >
      {name === 'speed' && (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      )}
      {name === 'cost' && (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      )}
      {name === 'stability' && (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      )}
      {name === 'intelligence' && (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      )}
      {name === 'security' && (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      )}
      {name === 'autonomy' && (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      )}
    </div>
  );
};
