import React from 'react';
import { useNavigate } from 'react-router';
import { IconArrowRight } from '@douyinfe/semi-icons';
import { MATRIX_HEAD, MATRIX_ITEMS } from '@/mock/content';
import { MatrixGlyph } from '@/components/icons';

/** 区块模式 4：卡片矩阵 —— 四大能力入口（docs/04 §4） */
export const ProductMatrix: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="p-section">
      <div className="p-container">
        <div className="p-section-head">
          <h2>{MATRIX_HEAD.title}</h2>
          <p className="p-section-lead">{MATRIX_HEAD.lead}</p>
        </div>
        <div className="matrix-grid">
          {MATRIX_ITEMS.map((item) => (
            <div
              key={item.title}
              className="matrix-card"
              role="link"
              tabIndex={0}
              onClick={() => navigate(item.path)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') navigate(item.path);
              }}
            >
              <div className="matrix-icon">
                <MatrixGlyph icon={item.icon} />
              </div>
              <h3 className="matrix-title">{item.title}</h3>
              <p className="matrix-desc">{item.description}</p>
              <span className="matrix-cta">
                {item.ctaLabel}
                <IconArrowRight size="small" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
