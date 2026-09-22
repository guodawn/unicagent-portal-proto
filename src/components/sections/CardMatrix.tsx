import React from 'react';
import { Tag } from '@douyinfe/semi-ui';
import { useNavigate } from 'react-router';
import { CARD_MATRIX } from '@/mock/content';
import {
  AgentMatrixIcon,
  ComputeMatrixIcon,
  GatewayMatrixIcon,
  ModelsMatrixIcon,
} from '../icons';

export const CardMatrix: React.FC = () => {
  const navigate = useNavigate();

  const renderIcon = (type: string) => {
    switch (type) {
      case 'agent':
        return <AgentMatrixIcon size={40} />;
      case 'models':
        return <ModelsMatrixIcon size={40} />;
      case 'compute':
        return <ComputeMatrixIcon size={40} />;
      case 'gateway':
        return <GatewayMatrixIcon size={40} />;
      default:
        return <AgentMatrixIcon size={40} />;
    }
  };

  return (
    <section className="section matrix-section">
      <div className="container">
        <div className="section-head">
          <h2>四大核心能力，驱动企业 AI 业务全流程落地</h2>
          <p className="lead">
            面向供给侧算力调度与模型提供商、消费侧企业与开发者，构建完整双侧生态闭环。
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
          }}
        >
          {CARD_MATRIX.map((item) => (
            <div
              key={item.id}
              className="portal-card"
              style={{
                padding: '32px 24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
              }}
              onClick={() => navigate(item.link)}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  {renderIcon(item.iconName)}
                  {item.badge && (
                    <Tag size="small" style={{ backgroundColor: 'var(--semi-color-primary-light-default)', color: 'var(--semi-color-primary)', border: 'none' }}>
                      {item.badge}
                    </Tag>
                  )}
                </div>

                <h3
                  style={{
                    fontSize: '20px',
                    fontWeight: 600,
                    color: 'var(--semi-color-text-0)',
                    marginBottom: '10px',
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--semi-color-text-1)',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {item.description}
                </p>
              </div>

              <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--semi-color-border)' }}>
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--semi-color-primary)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  {item.btnText}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
