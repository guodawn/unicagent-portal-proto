import React from 'react';
import { API_DIFFERENCE_ROWS, API_FAQS, API_SCOPE_CARDS, PRICING_HERO } from './data';
import { PriPage, PriFaq, PriTabs, priToast } from './shared';

/**
 * 定价 · API充值（/pricing/topup）
 * 逻辑取自《众调AI生态服务平台V0.2.1-API充值》原型 apiRechargeContent：
 * 使用范围说明 → 订阅套餐与 API充值对比 → FAQ；充值动作跳转控制台（原型行为）。
 */
export const TopupPage: React.FC = () => {
  const recharge = () => {
    // 原型行为：登录后跳控制台充值页；门户原型无控制台与登录，给出轻提示。
    priToast('充值服务暂不可用，请稍后再试。');
  };

  return (
    <PriPage>
      {/* 首屏 */}
      <section className="pri-hero">
        <div className="wrap">
          <span className="pri-kicker">{PRICING_HERO.api.kicker}</span>
          <h1>{PRICING_HERO.api.title}</h1>
          <p>{PRICING_HERO.api.lead}</p>
          <div className="pri-hero__action">
            <PriTabs active="api" />
            <button type="button" className="btn btn-primary pri-hero__recharge" onClick={recharge}>立即充值</button>
          </div>
        </div>
      </section>

      {/* 使用范围 */}
      <section className="pri-sec">
        <div className="wrap">
          <div className="pri-scopehead">
            <h3>API充值积分可以用在哪里？</h3>
            <p>按模型调用场景灵活使用；在平台内模型体验中，系统优先扣减最近到期的可用积分。</p>
          </div>
          <div className="pri-scopegrid">
            {API_SCOPE_CARDS.map((card) => (
              <article className={`pri-scopecard${card.supported ? ' is-supported' : ' is-restricted'}`} key={card.head}>
                <div className="pri-scopecard__head">
                  <span className={`pri-scopeicon${card.supported ? ' ok' : ''}`}>{card.supported ? '✓' : '×'}</span>
                  <div>
                    <span>{card.head}</span>
                    <p>{card.headDesc}</p>
                  </div>
                </div>
                <div className="pri-scopecard__items">
                  {card.items.map((it) => (
                    <div className="pri-scopeitem" key={it.title}>
                      <div>
                        <strong>{it.title}</strong>
                        <p>{it.desc}</p>
                      </div>
                      <span className={`pri-scopetag${card.supported ? ' available' : ''}`}>{it.state}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 与订阅套餐的区别 */}
      <section className="pri-sec pri-sec--soft">
        <div className="wrap">
          <div className="pri-comphead">
            <h2>订阅套餐与 API充值有什么区别？</h2>
            <p>两种方式面向不同场景，可按实际使用需求选择。</p>
          </div>
          <div className="pri-comptable-wrap">
            <table className="pri-comptable" aria-label="订阅套餐与 API充值对比">
              <thead>
                <tr>
                  <th scope="col">对比项</th>
                  <th scope="col">订阅套餐</th>
                  <th scope="col">API充值</th>
                </tr>
              </thead>
              <tbody>
                {API_DIFFERENCE_ROWS.map((row) => (
                  <tr key={row.label}>
                    <td>{row.label}</td>
                    <td>{row.kind === 'check' ? (row.sub === true ? <span className="pri-check">✓</span> : <span className="pri-muted">{row.sub}</span>) : row.sub}</td>
                    <td>{row.kind === 'check' ? (row.api === true ? <span className="pri-check">✓</span> : <span className="pri-muted">{row.api}</span>) : row.api}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ（标题居中，列表与上方内容同宽） */}
      <section className="pri-sec">
        <div className="wrap">
          <div className="pri-faqhead">
            <h2>常见问题</h2>
            <p>了解 API充值积分的使用范围与扣减规则。</p>
          </div>
          <PriFaq items={API_FAQS} />
        </div>
      </section>
    </PriPage>
  );
};
