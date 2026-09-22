import React from 'react';
import { useNavigate } from 'react-router';
import { Button, Empty } from '@douyinfe/semi-ui';
import { IllustrationConstruction, IllustrationConstructionDark } from '@douyinfe/semi-illustrations';

interface PlaceholderPageProps {
  title: string;
}

/** 统一占位页（docs/03 §2）：未实现路由的兜底，保证导航永不 404 */
export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="p-container">
      <Empty
        style={{ padding: '96px 0' }}
        image={<IllustrationConstruction style={{ width: 180, height: 180 }} />}
        darkModeImage={<IllustrationConstructionDark style={{ width: 180, height: 180 }} />}
        title={`${title} · 页面待建设`}
        description="该页面将在后续版本交付，当前版本（V0.1）聚焦门户首页。"
      >
        <Button theme="solid" onClick={() => navigate('/')}>
          返回首页
        </Button>
      </Empty>
    </div>
  );
};
