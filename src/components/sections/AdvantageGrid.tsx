import React from 'react';
import { ADVANTAGE_GRID } from '@/mock/content';
import { AdvantageIcon } from '../icons';

export const AdvantageGrid: React.FC = () => {
  return (
    <section className="section section-alt advantage-section">
      <div className="container">
        <div className="section-head">
          <h2>为什么选择众调 AI 生态平台</h2>
          <p className="lead">
            深耕大模型基础设施与企业应用落地，打造速度、成本、稳定与合规兼备的技术护城河。
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {ADVANTAGE_GRID.map((adv) => (
            <div
              key={adv.id}
              style={{
                padding: '28px 24px',
                borderRadius: 'var(--portal-radius-card)',
                backgroundColor: 'var(--semi-color-bg-0)',
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start',
              }}
            >
              <AdvantageIcon name={adv.iconName} size={40} />

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--semi-color-text-0)', margin: 0 }}>
                    {adv.title}
                  </h3>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      color: 'var(--semi-color-primary)',
                      backgroundColor: 'var(--semi-color-primary-light-default)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    {adv.highlightText}
                  </span>
                </div>

                <p style={{ fontSize: '14px', color: 'var(--semi-color-text-1)', lineHeight: 1.6, margin: 0 }}>
                  {adv.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
