import '@douyinfe/semi-ui/react19-adapter';
// 主题唯一入口：DSM 主题包 CSS 替代 Semi 默认 css（见 docs/02 §1.1，禁止再引入默认 css）
import '@semi-bot/semi-theme-figma/semi.min.css';
import './styles/tokens.css';
import './styles/global.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { LocaleProvider } from '@douyinfe/semi-ui';
import zh_CN from '@douyinfe/semi-ui/lib/es/locale/source/zh_CN';
import { BrowserRouter } from 'react-router';
import { App } from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('root element not found');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <LocaleProvider locale={zh_CN}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LocaleProvider>
  </React.StrictMode>
);
