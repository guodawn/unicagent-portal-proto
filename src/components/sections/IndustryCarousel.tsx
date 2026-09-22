import React, { useState } from 'react';
import { Button, Carousel, Tag } from '@douyinfe/semi-ui';
import { IconArrowRight, IconCheckCircleStroked } from '@douyinfe/semi-icons';
import { useNavigate } from 'react-router';
import { INDUSTRY_CAROUSEL } from '@/mock/content';

export const IndustryCarousel: React.FC = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="section industry-section">
      <div className="container">
        <div className="section-head">
          <h2>深入行业核心场景，提供专属 AI 解决方案</h2>
          <p className="lead">
            将大模型基础能力与汽车、电网、能源及企业通用场景的业务知识深度结合，落地见效。
          </p>
        </div>

        {/* Industry Pill Quick-switch */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '32px', flexWrap: 'wrap' }}>
          {INDUSTRY_CAROUSEL.map((ind, idx) => (
            <button
              key={ind.id}
              onClick={() => setActiveIndex(idx)}
              style={{
                padding: '8px 20px',
                borderRadius: '9999px',
                border: 'none',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                backgroundColor: activeIndex === idx ? 'var(--semi-color-primary)' : 'var(--semi-color-fill-0)',
                color: activeIndex === idx ? '#FFFFFF' : 'var(--semi-color-text-1)',
                transition: 'var(--portal-transition)',
              }}
            >
              {ind.name}
            </button>
          ))}
        </div>

        {/* Carousel Container */}
        <div
          style={{
            borderRadius: 'var(--portal-radius-lg)',
            border: '1px solid var(--semi-color-border)',
            backgroundColor: 'var(--semi-color-bg-1)',
            boxShadow: 'var(--portal-shadow-card)',
            overflow: 'hidden',
          }}
        >
          {INDUSTRY_CAROUSEL.map((item, idx) => {
            if (idx !== activeIndex) return null;
            return (
              <div
                key={item.id}
                style={{
                  padding: '48px 40px',
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 1fr',
                  gap: '40px',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ marginBottom: '12px' }}>
                    <Tag size="large" color="violet">
                      {item.tag}
                    </Tag>
                  </div>

                  <h3 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--semi-color-text-0)', marginBottom: '12px' }}>
                    {item.title}
                  </h3>

                  <p style={{ fontSize: '15px', color: 'var(--semi-color-text-1)', lineHeight: 1.6, marginBottom: '24px' }}>
                    {item.description}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                    {item.scenarios.map((sc, sIdx) => (
                      <div key={sIdx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <IconCheckCircleStroked style={{ color: 'var(--semi-color-primary)', fontSize: '16px' }} />
                        <span style={{ fontSize: '14px', color: 'var(--semi-color-text-1)' }}>{sc}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    theme="solid"
                    type="primary"
                    size="large"
                    icon={<IconArrowRight />}
                    iconPosition="right"
                    onClick={() => navigate(item.link)}
                  >
                    查看{item.name}方案详情
                  </Button>
                </div>

                {/* Right Aesthetic Banner */}
                <div
                  style={{
                    height: '320px',
                    borderRadius: 'var(--portal-radius-card)',
                    background: 'linear-gradient(135deg, var(--semi-color-primary-light-default) 0%, var(--semi-color-fill-1) 100%)',
                    border: '1px solid var(--semi-color-border)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '32px',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontSize: '48px',
                      marginBottom: '16px',
                    }}
                  >
                    {idx === 0 ? '🚗' : idx === 1 ? '⚡' : idx === 2 ? '🛢️' : '💼'}
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--semi-color-text-0)' }}>
                    {item.name}场景专属模型
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--semi-color-text-2)', marginTop: '8px', maxWidth: '240px' }}>
                    支持端侧轻量微调与私有知识库挂载，已具备规模化量产交付标准
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
