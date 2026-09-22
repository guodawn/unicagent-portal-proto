import React from 'react';
import { Button, Empty } from '@douyinfe/semi-ui';
import { IllustrationConstruction } from '@douyinfe/semi-illustrations';
import { useNavigate } from 'react-router';

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({
  title,
  description = '该页面将在后续版本交付，当前原型聚焦首页。',
}) => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '120px 24px', minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Empty
        image={<IllustrationConstruction style={{ width: 180, height: 180 }} />}
        darkModeImage={<IllustrationConstruction style={{ width: 180, height: 180 }} />}
        title={title}
        description={description}
      >
        <div style={{ marginTop: '16px' }}>
          <Button theme="solid" type="primary" onClick={() => navigate('/')}>
            返回首页
          </Button>
        </div>
      </Empty>
    </div>
  );
};
