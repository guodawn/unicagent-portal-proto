import React from 'react';
import { Link } from 'react-router';
import { Carousel } from '@douyinfe/semi-ui';
import { IconArrowRight } from '@douyinfe/semi-icons';
import { ANNOUNCEMENTS } from '@/mock/content';

/** 区块模式 1：公告轮播（对应硅基流动模型上新公告） */
export const AnnouncementBar: React.FC = () => {
  return (
    <div className="announce">
      <div className="p-container announce-inner">
        <span className="announce-tag">最新动态</span>
        <Carousel
          className="announce-carousel"
          autoPlay={{ interval: 4000 }}
          showArrow={false}
          showIndicator={false}
        >
          {ANNOUNCEMENTS.map((item) => (
            <Link key={item.text} to={item.path} className="announce-slide">
              <span className="announce-text">{item.text}</span>
              <IconArrowRight size="small" className="announce-arrow" />
            </Link>
          ))}
        </Carousel>
      </div>
    </div>
  );
};
