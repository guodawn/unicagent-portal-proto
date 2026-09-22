import React from 'react';
import './HomePage.css';
import { AnnouncementBar } from '@/components/sections/AnnouncementBar';
import { HeroBanner } from '@/components/sections/HeroBanner';
import { PromoBanner } from '@/components/sections/PromoBanner';
import { CardMatrix } from '@/components/sections/CardMatrix';
import { AdvantageGrid } from '@/components/sections/AdvantageGrid';
import { IndustryCarousel } from '@/components/sections/IndustryCarousel';
import { LogoWall } from '@/components/sections/LogoWall';
import { Testimonials } from '@/components/sections/Testimonials';
import { BottomCta } from '@/components/sections/BottomCta';
import { BrandSlogan } from '@/components/sections/BrandSlogan';

export const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      {/* 1. 公告轮播 */}
      <AnnouncementBar />

      {/* 2. Hero 焦点区 (一句话定位 + CTA) */}
      <HeroBanner />

      {/* 3. 私有化部署服务平台横幅 */}
      <PromoBanner />

      {/* 4. 四大核心能力 (产品矩阵) */}
      <CardMatrix />

      {/* 5. 六大优势 (为什么选择众调) */}
      <AdvantageGrid />

      {/* 6. 行业解决方案 */}
      <IndustryCarousel />

      {/* 7. 典型客户与合作伙伴 LOGO 墙 */}
      <LogoWall />

      {/* 8. 客户评价 */}
      <Testimonials />

      {/* 9. 底部双行动号召 */}
      <BottomCta />

      {/* 10. 品牌口号与社媒 */}
      <BrandSlogan />
    </div>
  );
};
