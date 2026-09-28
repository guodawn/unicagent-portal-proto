import React from 'react';
import { Link } from 'react-router';
import { LogoMarkSvg } from '@/proto/data';

interface FootLink {
  label: string;
  to?: string;
}

interface FootCol {
  title: string;
  links: FootLink[];
}

/** 原型页脚三栏；有对应工程路由的接路由，其余保持原型占位 href="#" */
const FOOT_COLS: FootCol[] = [
  {
    title: '核心平台服务',
    links: [
      { label: '智能体开发平台', to: '/agent-platform' },
      { label: '大模型广场', to: '/models' },
      { label: '算力调度' },
      { label: '知识库引擎' },
    ],
  },
  {
    title: '模型与解决方案',
    links: [{ label: '汽车行业方案' }, { label: '金融行业方案' }, { label: '电力行业方案' }, { label: '烟草行业方案' }],
  },
  {
    title: '联系与服务',
    links: [{ label: '预约演示' }, { label: '帮助文档', to: '/docs' }, { label: '合作生态' }, { label: '加入我们' }],
  },
];

/** 原型版页脚（docs/07 §3.8）：渐变浅紫底 + 认证徽章 */
export const SiteFooter: React.FC = () => {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <div className="f-logo">
              <span className="mark">{LogoMarkSvg}</span>
              众调AI生态服务平台
            </div>
            <p className="f-desc">从算力、模型到智能体应用，为企业提供一站式的 AI 生态服务，让业务真正用得起、用得好 AI。</p>
          </div>
          {FOOT_COLS.map((col) => (
            <div className="f-col" key={col.title}>
              <h5>{col.title}</h5>
              {col.links.map((link) =>
                link.to ? (
                  <Link key={link.label} to={link.to}>
                    {link.label}
                  </Link>
                ) : (
                  <a key={link.label} href="#">
                    {link.label}
                  </a>
                )
              )}
            </div>
          ))}
        </div>
        <div className="foot-bottom">
          <span>© 2026 众调AI生态服务平台 · 沪ICP备xxxxxxxx号</span>
          <span className="cert">
            <span className="seal">✓</span>信息系统安全等保三级认证
          </span>
        </div>
      </div>
    </footer>
  );
};
