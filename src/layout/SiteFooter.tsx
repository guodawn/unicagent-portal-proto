import React from 'react';
import { Link } from 'react-router';
import { Toast } from '@douyinfe/semi-ui';
import { BRAND, FOOTER_COLUMNS } from '@/mock/content';

/** 原型占位路径：点击提示而非跳转 404 */
const TOAST_PATHS: Record<string, string> = {
  '/login': '原型演示：登录功能待建设',
  '/agreement': '原型演示：法务页面占位',
  '/privacy': '原型演示：法务页面占位',
};

export const SiteFooter: React.FC = () => {
  return (
    <footer className="sf-footer" id="site-footer">
      <div className="p-container">
        <div className="sf-grid">
          <div className="sf-brand">
            <div className="sf-brand-row">
              <div className="sh-logo-mark sh-logo-mark--sm">众</div>
              <div className="sf-brand-name">
                <strong>{BRAND.name}</strong>
                <small>{BRAND.en}</small>
              </div>
            </div>
            <p className="sf-brand-desc">{BRAND.description}</p>
            <div className="sf-contact" id="site-contact">
              <div>商务合作：{BRAND.contactEmail}</div>
              <div>让 AI 生产力触手可及</div>
            </div>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} className="sf-col">
              <div className="sf-col-title">{col.title}</div>
              <div className="sf-col-links">
                {col.links.map((link) =>
                  TOAST_PATHS[link.path] ? (
                    <a
                      key={link.label}
                      role="link"
                      tabIndex={0}
                      className="sf-link"
                      onClick={() => Toast.info(TOAST_PATHS[link.path])}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') Toast.info(TOAST_PATHS[link.path]);
                      }}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link key={link.label} to={link.path} className="sf-link">
                      {link.label}
                    </Link>
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="sf-bottom">
          <span>{BRAND.copyright}</span>
          <span className="sf-icp">备案号占位（原型演示）</span>
          <span className="sf-note">{BRAND.prototypeNote}</span>
        </div>
      </div>
    </footer>
  );
};
