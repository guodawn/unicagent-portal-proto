import React from 'react';
import { Button } from '@douyinfe/semi-ui';
import { IconArrowRight } from '@douyinfe/semi-icons';
import { useNavigate } from 'react-router';
import { BOTTOM_CTA } from '@/mock/content';

export const BottomCta: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="section bottom-cta-section" style={{ paddingBottom: '40px' }}>
      <div className="container">
        <div
          style={{
            borderRadius: 'var(--portal-radius-lg)',
            padding: '56px 48px',
            background: 'linear-gradient(135deg, var(--semi-color-primary-light-default) 0%, var(--semi-color-fill-1) 100%)',
            border: '1px solid var(--semi-color-border)',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontSize: '32px',
              fontWeight: 700,
              color: 'var(--semi-color-text-0)',
              marginBottom: '14px',
            }}
          >
            {BOTTOM_CTA.title}
          </h2>

          <p
            style={{
              fontSize: '16px',
              color: 'var(--semi-color-text-1)',
              maxWidth: '680px',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginBottom: '36px',
            }}
          >
            {BOTTOM_CTA.subtitle}
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Button
              theme="solid"
              type="primary"
              size="large"
              style={{
                height: '48px',
                padding: '0 32px',
                fontSize: '15px',
                borderRadius: '8px',
                fontWeight: 600,
              }}
              icon={<IconArrowRight />}
              iconPosition="right"
              onClick={() => navigate(BOTTOM_CTA.btnPrimaryLink)}
            >
              {BOTTOM_CTA.btnPrimaryText}
            </Button>

            <Button
              theme="light"
              size="large"
              style={{
                height: '48px',
                padding: '0 28px',
                fontSize: '15px',
                borderRadius: '8px',
                fontWeight: 600,
              }}
              onClick={() => navigate(BOTTOM_CTA.btnSecondaryLink)}
            >
              {BOTTOM_CTA.btnSecondaryText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
