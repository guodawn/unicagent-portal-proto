import React from 'react';
import { LOGO_WALL } from '@/mock/content';

export const LogoWall: React.FC = () => {
  return (
    <section className="section section-alt logowall-section">
      <div className="container">
        <div className="section-head" style={{ marginBottom: '36px' }}>
          <h2>典型客户与合作伙伴</h2>
          <p className="lead">
            深受制造业领军企业、电网能源央国企与智算中心生态伙伴的持续信任。
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '16px',
          }}
        >
          {LOGO_WALL.map((item) => (
            <div
              key={item.id}
              style={{
                height: '72px',
                borderRadius: 'var(--portal-radius-card)',
                backgroundColor: 'var(--semi-color-bg-0)',
                border: '1px solid var(--semi-color-border)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px 16px',
                textAlign: 'center',
                transition: 'var(--portal-transition)',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--semi-color-primary)';
                const nameEl = e.currentTarget.querySelector('.logo-name') as HTMLElement;
                if (nameEl) nameEl.style.color = 'var(--semi-color-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--semi-color-border)';
                const nameEl = e.currentTarget.querySelector('.logo-name') as HTMLElement;
                if (nameEl) nameEl.style.color = 'var(--semi-color-text-2)';
              }}
            >
              <span
                className="logo-name"
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--semi-color-text-2)',
                  transition: 'color 0.2s ease',
                }}
              >
                {item.name}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--semi-color-text-2)', opacity: 0.7, marginTop: '2px' }}>
                {item.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
