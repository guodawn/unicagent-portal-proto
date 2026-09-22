import React from 'react';
import { TESTIMONIALS, TESTIMONIALS_HEAD } from '@/mock/content';

/** 区块模式 8：客户评价（门户 IA 明确要求，虚构脱敏，docs/04 §8） */
export const Testimonials: React.FC = () => {
  return (
    <section className="p-section">
      <div className="p-container">
        <div className="p-section-head">
          <h2>{TESTIMONIALS_HEAD.title}</h2>
          <p className="p-section-lead">{TESTIMONIALS_HEAD.lead}</p>
        </div>
        <div className="testi-grid">
          {TESTIMONIALS.map((item) => (
            <figure key={item.company} className="testi-card">
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
