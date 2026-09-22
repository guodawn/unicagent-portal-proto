import React from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@douyinfe/semi-ui';
import { BOTTOM_CTA } from '@/mock/content';

/** 区块模式 9：底部双 CTA（docs/04 §9），主卡流光渐变 + 滚动入场 */
export const BottomCta: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="p-section">
      <div className="p-container">
        <div className="cta-grid">
          {BOTTOM_CTA.map((item, index) => (
            <div
              key={item.title}
              className={`cta-card${index === 0 ? ' cta-card--primary' : ' cta-card--alt'}`}
              data-reveal
              style={{ transitionDelay: `${index * 110}ms` }}
            >
              <h3 className="cta-title">{item.title}</h3>
              <p className="cta-desc">{item.description}</p>
              <Button theme={index === 0 ? 'solid' : 'light'} size="large" onClick={() => navigate(item.path)}>
                {item.ctaLabel}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
