import React from 'react';
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

/**
 * 首页区块序列基线（docs/04 附录）：
 * 公告轮播 → Hero → 私有化横幅 → 四大能力 → 六大优势 → 行业轮播 → LOGO 墙 → 客户评价 → 底部 CTA → 品牌口号
 */
export const HomePage: React.FC = () => {
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
