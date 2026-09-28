import React, { useState } from 'react';
import { Starfield } from '@/proto/Starfield';
import { useProtoReveal } from '@/proto/useProtoReveal';
import { PARTNER_ROWS, REVIEWS, SOLUTION_PANELS } from '@/proto/data';

/** 原型首页（docs/07 §3）：Hero 星空 → 行业解决方案 → 合作伙伴跑马灯 → 客户评价 → CTA */
export const HomePage: React.FC = () => {
  useProtoReveal();
  const [activeTab, setActiveTab] = useState('car');

  return (
    <div>
      {/* ============ HERO ============ */}
      <section className="hero" id="hero">
        <Starfield />
        {/* 极光氛围背景 */}
        <div
          className="aurora aurora-1"
          style={{ width: 520, height: 520, background: 'radial-gradient(circle,#A78BFA,transparent 70%)', top: -180, left: -160 }}
        />
        <div
          className="aurora aurora-2"
          style={{ width: 460, height: 460, background: 'radial-gradient(circle,#22D3EE,transparent 70%)', bottom: -180, right: -120 }}
        />
        <div
          className="aurora aurora-1"
          style={{ width: 380, height: 380, background: 'radial-gradient(circle,#F0ABFC,transparent 70%)', top: '30%', right: '20%', opacity: 0.4 }}
        />
        <div className="wrap hero-inner">
          <div className="tag">
            <span className="dot" />
            企业级 AI 生态服务平台
          </div>
          <h1>
            懂业务的<span className="grad-flow">AI{'\u00A0'}生态服务</span>
          </h1>
          <p className="sub">
            从<span className="mark-word">算力、模型到智能体</span>应用,企业 AI 一站构建
            <br />
            让每一个业务场景都拥有<span className="mark-purple">专属的智能体</span>
          </p>
          <div className="hero-btns">
            <button className="btn btn-primary">预约方案演示</button>
          </div>
          <div className="scroll-hint">
            <div className="mouse" />
            向下滚动，探索行业实践
          </div>
        </div>
      </section>

      {/* ============ SOLUTIONS ============ */}
      <section className="section" id="solutions">
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="eyebrow">Industry Solutions</div>
            <h2>行业实践解决方案</h2>
            <p>深度赋能重点实体产业场景,以垂直精炼的专用智能体驱动业务高质量增长</p>
          </div>

          <div className="tabs reveal">
            {SOLUTION_PANELS.map((p) => (
              <div
                key={p.key}
                className={`tab${activeTab === p.key ? ' active' : ''}`}
                onClick={() => {
                  setActiveTab(p.key);
                }}
              >
                <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {p.tabIcon}
                </svg>
                {p.label}
              </div>
            ))}
          </div>

          {SOLUTION_PANELS.map((p) => (
            <div key={p.key} className={`panel${activeTab === p.key ? ' active' : ''}`}>
              <div className="solution-hero reveal">
                <div className="sh-text">
                  <h3>{p.h3}</h3>
                  <button className="btn btn-primary">立即咨询</button>
                </div>
                <div className="sh-visual">
                  <img
                    src={p.img}
                    alt={p.alt}
                    onError={(e) => {
                      // 与原型 onerror 一致：隐藏图片并显示 emoji 兜底
                      e.currentTarget.style.display = 'none';
                      const fb = e.currentTarget.nextElementSibling as HTMLElement | null;
                      if (fb) fb.style.display = 'flex';
                    }}
                  />
                  <div className="img-fallback" style={{ display: 'none' }}>
                    {p.fallback}
                  </div>
                </div>
              </div>
              <div className="feature-grid">
                {p.features.map((f) => (
                  <div className="feature-card reveal" key={f.title}>
                    <div className="fic">{f.icon}</div>
                    <h4>{f.title}</h4>
                    <p>{f.desc}</p>
                    <a className="case-link">查看案例 →</a>
                  </div>
                ))}
                <div className="feature-card reveal" key={p.gen.title}>
                  <div className="fic">{p.gen.icon}</div>
                  <h4>{p.gen.title}</h4>
                  <p>{p.gen.desc}</p>
                  <button className="gen-btn">✨ AI 生成专属方案</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ PARTNERS ============ */}
      <section className="section soft" id="partners">
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="eyebrow">Trusted By</div>
            <h2>已服务多家头部企业与高校科研院所</h2>
            <p>共建可信赖的产业 AI 生态,覆盖汽车、金融、电力、烟草与高校科研等核心场景</p>
          </div>
          {PARTNER_ROWS.map((row, i) => (
            <div className="marquee-row reveal" key={i}>
              <div className="marquee">
                <div
                  className={`marquee-track${i === 1 ? ' marquee-track-reverse' : ''}${i === 2 ? ' marquee-track-slow' : ''}`}
                >
                  {[0, 1].map((copy) => (
                    <div className="marquee-group" key={copy} aria-hidden={copy === 1}>
                      {row.map((pt) => (
                        <div className="partner-card" key={pt.e}>
                          <div className="logo"><img src={pt.logo} alt={`${pt.n} LOGO`} width="64" height="48" /></div>
                          <div className="ptxt">
                            <div className="pname">{pt.n}</div>
                            <div className="pen">{pt.e}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ REVIEWS ============ */}
      <section className="section" id="reviews">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>
              客户<span className="mark-purple">真实</span>反馈
            </h2>
          </div>
          <div className="review-grid">
            {REVIEWS.map((r, i) => (
              <article
                className="review-card reveal in"
                key={r.title}
                style={{ animation: `panelIn .45s ${i * 0.08}s both` }}
              >
                <div className="rc-top">
                  <h3 className="rc-title">{r.title}</h3>
                  <span className="quote-mark">”</span>
                </div>
                <p className="quote">{r.quote}</p>
                <div className="rc-foot">
                  <span className="avatar">✦</span>
                  <div className="who">
                    <span className="nm">{r.nm}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="cta" id="cta">
        <div className="wrap">
          <div className="cta-inner reveal">
            <h2>
              您可能想了解:<span className="mark-word">我们有什么具体内容</span>与能力?
            </h2>
            <p>
              预约<span className="mark-purple">一对一方案沟通</span>,获取贴合您业务场景的 AI 落地路径
            </p>
            <button className="btn btn-primary">联系我们</button>
          </div>
        </div>
      </section>
    </div>
  );
};
