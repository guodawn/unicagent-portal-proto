import React from 'react';
import { Carousel, Tag } from '@douyinfe/semi-ui';
import { IconArrowRight } from '@douyinfe/semi-icons';
import { useNavigate } from 'react-router';
import { ANNOUNCEMENTS } from '@/mock/content';

export const AnnouncementBar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundColor: 'var(--semi-color-fill-0)',
        borderBottom: '1px solid var(--semi-color-border)',
        height: '42px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Carousel
          autoPlay={{ interval: 4000 }}
          showIndicator={false}
          showArrow={false}
          style={{ width: '100%', maxWidth: '840px', height: '32px' }}
        >
          {ANNOUNCEMENTS.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                height: '32px',
                fontSize: '13px',
                cursor: 'pointer',
              }}
              onClick={() => navigate(item.link)}
            >
              <Tag size="small" style={{ backgroundColor: 'var(--semi-color-primary-light-default)', color: 'var(--semi-color-primary)', border: 'none', fontWeight: 600 }}>
                {item.tag}
              </Tag>
              <span
                style={{
                  color: 'var(--semi-color-text-1)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.title}
              </span>
              <span style={{ color: 'var(--semi-color-primary)', display: 'inline-flex', alignItems: 'center', gap: '2px', fontWeight: 500 }}>
                查看 <IconArrowRight style={{ fontSize: '12px' }} />
              </span>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};
