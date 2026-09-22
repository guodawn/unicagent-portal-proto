import React from 'react';
import { useNavigate } from 'react-router';
import { Button, Empty } from '@douyinfe/semi-ui';
import { IllustrationNotFound, IllustrationNotFoundDark } from '@douyinfe/semi-illustrations';

/** 404 页：引导返回首页（docs/03 路由表） */
export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-container">
      <Empty
        style={{ padding: '96px 0' }}
        image={<IllustrationNotFound style={{ width: 180, height: 180 }} />}
        darkModeImage={<IllustrationNotFoundDark style={{ width: 180, height: 180 }} />}
        title="页面不存在"
        description="你访问的页面不存在或已被移动。"
      >
        <Button theme="solid" onClick={() => navigate('/')}>
          返回首页
        </Button>
      </Empty>
    </div>
  );
};
