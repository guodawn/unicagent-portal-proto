import React from 'react';
import { ADVANTAGES, ADVANTAGES_HEAD } from '@/mock/content';
import { AdvantageGlyph } from '@/components/icons';

/** 区块模式 5：六大优势网格（docs/04 §5） */
export const AdvantageGrid: React.FC = () => {
  return (
    <section className="p-section p-section--alt">
      <div className="p-container">
        <div className="p-section-head">
          <h2>{ADVANTAGES_HEAD.title}</h2>
          <p className="p-section-lead">{ADVANTAGES_HEAD.lead}</p>
        </div>
        <div className="adv-grid">
          {ADVANTAGES.map((item) => (
            <div key={item.title} className="adv-card">
              <div className="adv-icon">
                <AdvantageGlyph icon={item.icon} />
              </div>
              <div>
                <h3 className="adv-title">
                  {item.title}
                  {item.metric ? <span className="adv-metric">{item.metric}</span> : null}
                </h3>
                <p className="adv-desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
