import React from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@douyinfe/semi-ui';
import { IconTickCircle } from '@douyinfe/semi-icons';
import { PRIVATE_PROMO } from '@/mock/content';

/** 区块模式 3：重点业务强推横幅（对应硅基流动「锁定算力」横幅，V0.1 用于私有化部署） */
export const PromoBanner: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="p-section promo-section">
      <div className="p-container">
        <div className="promo-card">
          <div className="promo-body">
            <span className="promo-tag">{PRIVATE_PROMO.tag}</span>
            <h3 className="promo-title">{PRIVATE_PROMO.title}</h3>
            <ul className="promo-points">
              {PRIVATE_PROMO.points.map((point) => (
                <li key={point} className="promo-point">
                  <IconTickCircle size="small" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="promo-action">
            <Button theme="solid" size="large" className="promo-btn" onClick={() => navigate(PRIVATE_PROMO.cta.path)}>
              {PRIVATE_PROMO.cta.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
