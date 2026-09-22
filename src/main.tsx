import '@douyinfe/semi-ui/react19-adapter';
import '@semi-bot/semi-theme-figma/semi.min.css';
import './styles/tokens.css';
import './styles/global.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { LocaleProvider } from '@douyinfe/semi-ui';
import zh_CN from '@douyinfe/semi-ui/lib/es/locale/source/zh_CN';
import { BrowserRouter } from 'react-router';
import { App } from './App';

const root = document.getElementById('root');
if (!root) {
  throw new Error('root element not found');
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <LocaleProvider locale={zh_CN}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LocaleProvider>
  </React.StrictMode>
);
