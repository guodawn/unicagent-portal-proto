import React from 'react';
import { Space, Tooltip } from '@douyinfe/semi-ui';
import { BRAND_SLOGAN } from '@/mock/content';

export const BrandSlogan: React.FC = () => {
  return (
    <section style={{ padding: '40px 0 60px 0', textAlign: 'center' }}>
      <div className="container">
        <h2
          style={{
            fontSize: '28px',
            fontWeight: 700,
            color: 'var(--semi-color-text-0)',
            letterSpacing: '0.04em',
            marginBottom: '20px',
          }}
        >
          {BRAND_SLOGAN.slogan}
        </h2>

        {/* Social placeholders */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          {['GitHub', '微信公众号', '知乎专栏', '技术社区'].map((item) => (
            <Tooltip key={item} content={`关注众调 AI · ${item}`}>
              <span
                style={{
                  fontSize: '13px',
                  color: 'var(--semi-color-text-2)',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  backgroundColor: 'var(--semi-color-fill-0)',
                  cursor: 'pointer',
                  transition: 'var(--portal-transition)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--semi-color-primary)';
                  e.currentTarget.style.backgroundColor = 'var(--semi-color-primary-light-default)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--semi-color-text-2)';
                  e.currentTarget.style.backgroundColor = 'var(--semi-color-fill-0)';
                }}
              >
                {item}
              </span>
            </Tooltip>
          ))}
        </div>
      </div>
    </section>
  );
};
