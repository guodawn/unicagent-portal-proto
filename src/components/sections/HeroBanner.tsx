import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@douyinfe/semi-ui';
import { HERO } from '@/mock/content';

/** Hero 轮换高亮词（原型演示文案，来源于平台能力叙事） */
const ROTATING_WORDS = ['自己的 AI 生产力', '随取随用的模型服务', '高效协作的数字员工', '可持续运营的算力'];

/** 浮动小卡：纯 CSS/SVG 程序生成视觉（docs/02 §6），替代真实图片素材 */
const HeroFloatCards: React.FC = () => (
  <>
    <div className="hero-float-card hero-float-card--chat" aria-hidden>
      <div className="hero-chat-row">
        <span className="hero-chat-avatar">数字员工</span>
        <span className="hero-chat-bubble">帮我整理本周会议纪要</span>
      </div>
      <div className="hero-chat-row hero-chat-row--reply">
        <span className="hero-chat-bubble hero-chat-bubble--done">
          已生成并发送到飞书
          <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden>
            <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      </div>
    </div>

    <div className="hero-float-card hero-float-card--model" aria-hidden>
      <div className="hero-model-name">
        高速版 GLM-5<span className="hero-model-dot" />
      </div>
      <svg className="hero-spark" viewBox="0 0 120 36" preserveAspectRatio="none">
        <polyline points="0,30 15,26 30,28 45,20 60,22 75,14 90,16 105,8 120,10" fill="none" stroke="var(--semi-color-primary)" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <div className="hero-model-price">¥0.002 / 千 tokens</div>
    </div>

    <div className="hero-float-card hero-float-card--compute" aria-hidden>
      <div className="hero-gauge-label">算力利用率</div>
      <div className="hero-gauge">
        <div className="hero-gauge-bar">
          <div className="hero-gauge-fill" />
        </div>
        <span className="hero-gauge-num">87%</span>
      </div>
    </div>
  </>
);

/** 区块模式 2：Hero 一句话定位 + CTA（docs/04 §2），含轮换词 / 浮动卡视差 / 交错入场 */
export const HeroBanner: React.FC = () => {
  const navigate = useNavigate();
  const [wordIndex, setWordIndex] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = heroRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty('--mx', x.toFixed(3));
    el.style.setProperty('--my', y.toFixed(3));
  };

  const handleMouseLeave = () => {
    const el = heroRef.current;
    if (!el) return;
    el.style.setProperty('--mx', '0');
    el.style.setProperty('--my', '0');
  };

  const scrollToContact = () => {
    document.getElementById('site-footer')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" ref={heroRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div className="hero-blob hero-blob--1" aria-hidden />
      <div className="hero-blob hero-blob--2" aria-hidden />
      <div className="hero-grid" aria-hidden />
      <HeroFloatCards />
      <div className="p-container hero-inner">
        <h1 className="hero-title" data-reveal>
          {HERO.titleLead}
          <br />
          <span className="hero-highlight" key={wordIndex}>
            {ROTATING_WORDS[wordIndex]}
          </span>
        </h1>
        <p className="hero-subtitle" data-reveal style={{ transitionDelay: '90ms' }}>
          {HERO.subtitle}
        </p>
        <div className="hero-ctas" data-reveal style={{ transitionDelay: '180ms' }}>
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
