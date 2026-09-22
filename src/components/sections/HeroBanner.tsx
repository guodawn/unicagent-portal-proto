import React from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@douyinfe/semi-ui';
import { HERO } from '@/mock/content';

/** 区块模式 2：Hero 一句话定位 + CTA（docs/04 §2） */
export const HeroBanner: React.FC = () => {
  const navigate = useNavigate();

  const scrollToContact = () => {
    document.getElementById('site-footer')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero">
      <div className="hero-blob hero-blob--1" aria-hidden />
      <div className="hero-blob hero-blob--2" aria-hidden />
      <div className="hero-grid" aria-hidden />
      <div className="p-container hero-inner">
        <h1 className="hero-title">
          {HERO.titleLead}
          <br />
          <span className="hero-highlight">{HERO.titleHighlight}</span>
        </h1>
        <p className="hero-subtitle">{HERO.subtitle}</p>
        <div className="hero-ctas">
          <Button theme="solid" size="large" onClick={() => navigate(HERO.primaryCta.path)}>
            {HERO.primaryCta.label}
          </Button>
          <Button theme="light" size="large" onClick={scrollToContact}>
            {HERO.secondaryCta.label}
          </Button>
        </div>
      </div>
    </section>
  );
};
