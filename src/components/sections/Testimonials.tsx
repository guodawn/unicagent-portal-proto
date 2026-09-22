import React from 'react';
import { Tag } from '@douyinfe/semi-ui';
import { TESTIMONIALS } from '@/mock/content';

export const Testimonials: React.FC = () => {
  return (
    <section className="section testimonial-section">
      <div className="container">
        <div className="section-head">
          <h2>来自实际业务负责人的真实评价</h2>
          <p className="lead">
            听听智算中心运营方、央国企数字化决策者与高成长 AI 企业的实战落地反馈。
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="portal-card"
              style={{
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '36px', lineHeight: 1, color: 'var(--semi-color-primary)', fontFamily: 'serif' }}>
                    “
                  </span>
                  <Tag size="small" style={{ backgroundColor: 'var(--semi-color-primary-light-default)', color: 'var(--semi-color-primary)', border: 'none' }}>
                    {t.tag}
                  </Tag>
                </div>

                <p
                  style={{
                    fontSize: '15px',
                    lineHeight: 1.7,
                    color: 'var(--semi-color-text-0)',
                    fontStyle: 'italic',
                    marginBottom: '24px',
                  }}
                >
                  {t.quote}
                </p>
              </div>

              <div style={{ paddingTop: '16px', borderTop: '1px solid var(--semi-color-border)' }}>
                <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--semi-color-text-0)' }}>
                  {t.author} · {t.title}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--semi-color-text-2)', marginTop: '2px' }}>
                  {t.company}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
