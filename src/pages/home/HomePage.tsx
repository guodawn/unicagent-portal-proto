import React, { useEffect } from 'react';
import { AnnouncementBar } from '@/components/sections/AnnouncementBar';
import { HeroBanner } from '@/components/sections/HeroBanner';
import { PromoBanner } from '@/components/sections/PromoBanner';
import { ProductMatrix } from '@/components/sections/ProductMatrix';
import { AdvantageGrid } from '@/components/sections/AdvantageGrid';
import { IndustryCarousel } from '@/components/sections/IndustryCarousel';
import { LogoWall } from '@/components/sections/LogoWall';
import { Testimonials } from '@/components/sections/Testimonials';
import { BottomCta } from '@/components/sections/BottomCta';
import { BrandSlogan } from '@/components/sections/BrandSlogan';
import './HomePage.css';

/** 首页区块序列基线（docs/04 附录）：
 * 公告轮播 → Hero → 私有化横幅 → 四大能力 → 六大优势 → 行业轮播 → LOGO 墙 → 客户评价 → 底部 CTA → 品牌口号 */
export const HomePage: React.FC = () => {
  // 滚动入场观察器：进入视口后为 [data-reveal] 元素加 .is-revealed（一次性）
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('is-revealed'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.add('is-revealed');
            // 入场完成后清掉交错延迟，避免拖慢后续 hover 过渡
            window.setTimeout(() => {
              el.style.transitionDelay = '';
            }, 1000);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <AnnouncementBar />
      <HeroBanner />
      <PromoBanner />
      <ProductMatrix />
      <AdvantageGrid />
      <IndustryCarousel />
      <LogoWall />
      <Testimonials />
      <BottomCta />
      <BrandSlogan />
    </div>
  );
};
