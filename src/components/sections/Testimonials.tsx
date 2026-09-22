import React from 'react';
import { TESTIMONIALS, TESTIMONIALS_HEAD } from '@/mock/content';

/** 评价卡引号色轮换：主题令牌内做多样（docs/04 §8） */
const ACCENT_CYCLE = ['primary', 'secondary', 'success'] as const;

/** 区块模式 8：客户评价（虚构脱敏，docs/04 §8），滚动交错入场 */
export const Testimonials: React.FC = () => {
  return (
    <section className="p-section">
      <div className="p-container">
        <div className="p-section-head" data-reveal>
          <h2>{TESTIMONIALS_HEAD.title}</h2>
          <p className="p-section-lead">{TESTIMONIALS_HEAD.lead}</p>
        </div>
        <div className="testi-grid">
          {TESTIMONIALS.map((item, index) => (
            <figure
              key={item.company}
              className={`testi-card testi-card--${ACCENT_CYCLE[index % ACCENT_CYCLE.length]}`}
              data-reveal
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <blockquote className="testi-quote">{item.quote}</blockquote>
              <figcaption className="testi-author">
                <strong>{item.company}</strong>
                <span>{item.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
