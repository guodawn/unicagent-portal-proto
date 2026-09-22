import React from 'react';
import { Button, Space } from '@douyinfe/semi-ui';
import { IconArrowRight } from '@douyinfe/semi-icons';
import { useNavigate } from 'react-router';
import { HERO_CONTENT } from '@/mock/content';

export const HeroBanner: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section
      className="section hero-section"
      style={{
        paddingTop: '80px',
        paddingBottom: '70px',
        position: 'relative',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse 80% 50% at 50% -10%, var(--semi-color-primary-light-default) 0%, transparent 100%)',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <div style={{ marginBottom: '20px' }}>
          <span className="portal-badge">
            🚀 众调 AI 生态平台 UnicAgent
          </span>
        </div>

        <h1
          style={{
            fontSize: '52px',
            fontWeight: 800,
            lineHeight: 1.25,
            color: 'var(--semi-color-text-0)',
            letterSpacing: '-0.02em',
            marginBottom: '20px',
            maxWidth: '960px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          {HERO_CONTENT.title}
        </h1>

        <p
          style={{
            fontSize: '18px',
            lineHeight: 1.65,
            color: 'var(--semi-color-text-1)',
            maxWidth: '720px',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: '36px',
          }}
        >
          {HERO_CONTENT.subtitle}
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '56px' }}>
          <Button
            theme="solid"
            type="primary"
            size="large"
            style={{
              height: '48px',
              padding: '0 32px',
              fontSize: '16px',
              borderRadius: '8px',
              fontWeight: 600,
            }}
            icon={<IconArrowRight />}
            iconPosition="right"
            onClick={() => navigate(HERO_CONTENT.ctaPrimaryLink)}
          >
            {HERO_CONTENT.ctaPrimaryText}
          </Button>

          <Button
            theme="light"
            size="large"
            style={{
              height: '48px',
              padding: '0 28px',
              fontSize: '16px',
              borderRadius: '8px',
              fontWeight: 600,
            }}
            onClick={() => navigate(HERO_CONTENT.ctaSecondaryLink)}
          >
            {HERO_CONTENT.ctaSecondaryText}
          </Button>
        </div>

        {/* Metrics Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
            maxWidth: '960px',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '24px',
            backgroundColor: 'var(--semi-color-bg-1)',
            borderRadius: 'var(--portal-radius-lg)',
            border: '1px solid var(--semi-color-border)',
            boxShadow: 'var(--portal-shadow-card)',
          }}
        >
          {HERO_CONTENT.metrics.map((m, idx) => (
            <div key={idx} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: '36px',
                  fontWeight: 800,
                  color: 'var(--semi-color-primary)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                }}
              >
                {m.value}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--semi-color-text-2)', marginTop: '4px' }}>
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
