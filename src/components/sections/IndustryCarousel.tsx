import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Carousel } from '@douyinfe/semi-ui';
import { IconArrowRight } from '@douyinfe/semi-icons';
import { INDUSTRIES, INDUSTRIES_HEAD } from '@/mock/content';

/** 区块模式 6：行业解决方案轮播（docs/04 §6） */
export const IndustryCarousel: React.FC = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);

  return (
    <section className="p-section">
      <div className="p-container">
        <div className="p-section-head">
          <h2>{INDUSTRIES_HEAD.title}</h2>
          <p className="p-section-lead">{INDUSTRIES_HEAD.lead}</p>
        </div>
        <div className="ind-wrap">
          <Carousel
            className="ind-carousel"
            autoPlay={{ interval: 5000, hoverToPause: true }}
            showArrow
            arrowType="hover"
            showIndicator={false}
            onChange={(current: number) => setActive(current)}
          >
            {INDUSTRIES.map((industry) => (
              <div
                key={industry.key}
                className="ind-slide"
                role="link"
                tabIndex={0}
                onClick={() => navigate(industry.path)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') navigate(industry.path);
                }}
              >
                <div className="ind-body">
                  <div className="ind-name-row">
                    <span className="ind-emoji" aria-hidden>
                      {industry.emoji}
                    </span>
                    <span className="ind-name">{industry.name}</span>
                  </div>
                  <h3 className="ind-headline">{industry.headline}</h3>
                  <ul className="ind-scenarios">
                    {industry.scenarios.map((scene) => (
                      <li key={scene}>{scene}</li>
                    ))}
                  </ul>
                  <span className="ind-more">
                    查看方案
                    <IconArrowRight size="small" />
                  </span>
                </div>
                <div className={`ind-decor ind-decor--${industry.key}`} aria-hidden>
                  <span className="ind-decor-emoji">{industry.emoji}</span>
                </div>
              </div>
            ))}
          </Carousel>
          <div className="ind-counter">
            {String(active + 1).padStart(2, '0')} / {String(INDUSTRIES.length).padStart(2, '0')}
          </div>
        </div>
      </div>
    </section>
  );
};
