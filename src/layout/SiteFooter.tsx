import React from 'react';
import { Link } from 'react-router';
import { BrandLogoIcon } from '../components/icons';
import { BRAND_SLOGAN, FOOTER_COLUMNS } from '@/mock/content';

export const SiteFooter: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: 'var(--semi-color-fill-0)',
        borderTop: '1px solid var(--semi-color-border)',
        paddingTop: '64px',
        paddingBottom: '32px',
        color: 'var(--semi-color-text-1)',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
            gap: '48px',
            marginBottom: '48px',
          }}
          className="footer-grid"
        >
          {/* Col 1: Brand & Contact */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <BrandLogoIcon size={30} />
              <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--semi-color-text-0)' }}>
                众调 AI 生态平台
              </span>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--semi-color-text-2)', lineHeight: 1.6, maxWidth: '280px', margin: '0 0 16px 0' }}>
              企业级 AI 基础设施 + 智能体双侧生态平台。连接算力供给与模型服务，加速全场景生产力跃迁。
            </p>
            <div style={{ fontSize: '13px', color: 'var(--semi-color-text-2)' }}>
              业务咨询：contact@unicagent.example (原型演示)
            </div>
          </div>

          {/* Col 2, 3, 4: Link Columns */}
          {FOOTER_COLUMNS.map((col, idx) => (
            <div key={idx}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--semi-color-text-0)', marginBottom: '16px' }}>
                {col.title}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {col.links.map((link, lIdx) => (
                  <Link
                    key={lIdx}
                    to={link.url}
                    style={{
                      fontSize: '13px',
                      color: 'var(--semi-color-text-2)',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--semi-color-primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--semi-color-text-2)')}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom copyright */}
        <div
          style={{
            paddingTop: '24px',
            borderTop: '1px solid var(--semi-color-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '12px',
            color: 'var(--semi-color-text-2)',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div>{BRAND_SLOGAN.copyright}</div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>京ICP备2026000000号-1 (占位)</span>
            <span>隐私政策</span>
            <span>服务协议</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
