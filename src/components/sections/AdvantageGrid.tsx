import React from 'react';
import { ADVANTAGES, ADVANTAGES_HEAD } from '@/mock/content';
import { AdvantageGlyph } from '@/components/icons';

/** 六卡图标色轮换：全部取自主题令牌色板（蓝/紫/绿/橙），保证多样但不成新色相 */
const TINT_CYCLE = ['primary', 'secondary', 'success', 'warning'] as const;

/** 区块模式 5：六大优势网格（docs/04 §5），滚动交错入场 + 图标多彩化 */
export const AdvantageGrid: React.FC = () => {
  return (
    <section className="p-section p-section--alt">
      <div className="p-container">
        <div className="p-section-head" data-reveal>
          <h2>{ADVANTAGES_HEAD.title}</h2>
          <p className="p-section-lead">{ADVANTAGES_HEAD.lead}</p>
        </div>
        <div className="adv-grid">
          {ADVANTAGES.map((item, index) => {
            const tint = TINT_CYCLE[index % TINT_CYCLE.length];
            return (
              <div
                key={item.title}
                className="adv-card"
                data-reveal
                style={{ transitionDelay: `${(index % 3) * 90}ms` }}
              >
                <div className={`adv-icon adv-icon--${tint}`}>
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
            );
          })}
        </div>
      </div>
    </section>
  );
};
