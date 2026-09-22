import React from 'react';
import { Button } from '@douyinfe/semi-ui';
import { IconArrowRight, IconCheckCircleStroked } from '@douyinfe/semi-icons';
import { useNavigate } from 'react-router';
import { PROMO_BANNER } from '@/mock/content';

export const PromoBanner: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section style={{ padding: '0 0 60px 0' }}>
      <div className="container">
        <div
          style={{
            borderRadius: 'var(--portal-radius-lg)',
            padding: '40px 48px',
            background: 'linear-gradient(135deg, #1E1B4B 0%, var(--semi-color-primary) 100%)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
            boxShadow: 'var(--portal-shadow-hover)',
          }}
        >
          <div style={{ maxWidth: '780px' }}>
            <div style={{ marginBottom: '10px' }}>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  padding: '3px 10px',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                }}
              >
                {PROMO_BANNER.tag}
              </span>
            </div>

            <h3 style={{ fontSize: '26px', fontWeight: 700, lineHeight: 1.3, marginBottom: '8px', color: '#FFFFFF' }}>
              {PROMO_BANNER.title}
            </h3>

            <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.6, marginBottom: '16px' }}>
              {PROMO_BANNER.subtitle}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              {PROMO_BANNER.features.map((feat, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#FFFFFF' }}>
                  <IconCheckCircleStroked style={{ color: '#6EE7B7' }} />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Button
              size="large"
              style={{
                height: '46px',
                padding: '0 28px',
                borderRadius: '8px',
                backgroundColor: '#FFFFFF',
                color: 'var(--semi-color-primary)',
                fontWeight: 700,
                border: 'none',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              }}
              icon={<IconArrowRight />}
              iconPosition="right"
              onClick={() => navigate(PROMO_BANNER.ctaLink)}
            >
              {PROMO_BANNER.ctaText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
