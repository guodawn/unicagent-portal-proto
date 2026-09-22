import React from 'react';
import { LOGO_WALL, LOGO_WALL_HEAD } from '@/mock/content';

/** 双行反向跑马灯：内容复制一份实现无缝循环，hover 暂停（docs/04 §7） */
function MarqueeRow({ names, reverse }: { names: string[]; reverse?: boolean }) {
  const doubled = [...names, ...names];
  return (
    <div className={`marquee${reverse ? ' marquee--reverse' : ''}`}>
      <div className={`marquee-track${reverse ? ' marquee-track--reverse' : ''}`}>
        {doubled.map((name, index) => (
          <div key={`${name}-${index}`} className="logos-item" aria-hidden={index >= names.length}>
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}

/** 区块模式 7：LOGO 墙 —— 双行跑马灯，虚构脱敏（docs/04 §7） */
export const LogoWall: React.FC = () => {
  const midpoint = Math.ceil(LOGO_WALL.length / 2);
  return (
    <section className="p-section p-section--alt">
      <div className="p-container">
        <div className="p-section-head" data-reveal>
          <h2>{LOGO_WALL_HEAD}</h2>
        </div>
        <div className="logos-marquee-wrap" data-reveal>
          <MarqueeRow names={LOGO_WALL.slice(0, midpoint)} />
          <MarqueeRow names={LOGO_WALL.slice(midpoint)} reverse />
        </div>
      </div>
    </section>
  );
};
