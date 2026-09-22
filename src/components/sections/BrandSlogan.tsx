import React from 'react';
import { Toast } from '@douyinfe/semi-ui';
import { IconGithubLogo, IconLink, IconMail } from '@douyinfe/semi-icons';
import { BRAND } from '@/mock/content';

/** 区块模式 10：品牌口号 + 社媒（docs/04 §10，社媒为原型占位） */
export const BrandSlogan: React.FC = () => {
  const socials = [
    { label: 'GitHub', Glyph: IconGithubLogo },
    { label: '微信公众号', Glyph: IconLink },
    { label: '合作洽谈', Glyph: IconMail },
  ];

  return (
    <section className="p-section slogan">
      <div className="p-container slogan-inner">
        <h2 className="slogan-title">{BRAND.slogan}</h2>
        <p className="slogan-sub">{BRAND.name} · {BRAND.en}</p>
        <div className="slogan-socials">
          {socials.map(({ label, Glyph }) => (
            <button
              key={label}
              type="button"
              className="slogan-social"
              aria-label={label}
              onClick={() => Toast.info(`原型演示：${label}链接占位`)}
            >
              <Glyph size="large" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
