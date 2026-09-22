import React from 'react';
import { LOGO_WALL, LOGO_WALL_HEAD } from '@/mock/content';

/** 区块模式 7：LOGO 墙 —— 文字占位，虚构脱敏（docs/04 §7） */
export const LogoWall: React.FC = () => {
  return (
    <section className="p-section p-section--alt">
      <div className="p-container">
        <div className="p-section-head">
          <h2>{LOGO_WALL_HEAD}</h2>
        </div>
        <div className="logos-grid">
          {LOGO_WALL.map((name) => (
            <div key={name} className="logos-item">
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
