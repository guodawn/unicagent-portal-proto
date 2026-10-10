import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import './AuthPage.css';

/** 登录/注册（原型 page-auth，HTML 3524-3701）：左侧品牌区 + 右侧双面板表单 */

type PaneKey = 'login' | 'register';

/** 左侧品牌区背景：神经网络连线装饰（原型 3532-3573） */
const AuthNeuralBg: React.FC = () => (
  <div className="auth-side-bg" aria-hidden="true">
    <svg className="auth-neural" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="nnLineA" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#7C3AED" stopOpacity={0} />
          <stop offset="50%" stopColor="#7C3AED" stopOpacity={0.55} />
          <stop offset="100%" stopColor="#6366F1" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="nnLineB" x1="0" x2="1" y1="1" y2="0">
          <stop offset="0%" stopColor="#6366F1" stopOpacity={0} />
          <stop offset="50%" stopColor="#6366F1" stopOpacity={0.5} />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
        </linearGradient>
        <radialGradient id="nnNode1">
          <stop offset="0%" stopColor="#C4B5FD" />
          <stop offset="100%" stopColor="#7C3AED" />
        </radialGradient>
        <radialGradient id="nnNode2">
          <stop offset="0%" stopColor="#A5B4FC" />
          <stop offset="100%" stopColor="#6366F1" />
        </radialGradient>
      </defs>
      <g className="nn-lines">
        <line className="nn-line l1" x1="45" y1="55" x2="170" y2="95" stroke="url(#nnLineA)" />
        <line className="nn-line l2" x1="170" y1="95" x2="310" y2="45" stroke="url(#nnLineB)" />
        <line className="nn-line l3" x1="45" y1="55" x2="20" y2="260" stroke="url(#nnLineB)" />
        <line className="nn-line l4" x1="170" y1="95" x2="235" y2="155" stroke="url(#nnLineA)" />
        <line className="nn-line l5" x1="310" y1="45" x2="385" y2="240" stroke="url(#nnLineA)" />
        <line className="nn-line l1" x1="235" y1="155" x2="385" y2="240" stroke="url(#nnLineB)" />
        <line className="nn-line l3" x1="20" y1="260" x2="150" y2="470" stroke="url(#nnLineA)" />
        <line className="nn-line l2" x1="150" y1="470" x2="55" y2="495" stroke="url(#nnLineB)" />
        <line className="nn-line l4" x1="150" y1="470" x2="200" y2="545" stroke="url(#nnLineA)" />
        <line className="nn-line l5" x1="385" y1="240" x2="345" y2="520" stroke="url(#nnLineB)" />
        <line className="nn-line l1" x1="200" y1="545" x2="345" y2="520" stroke="url(#nnLineA)" />
        <line className="nn-line l3" x1="55" y1="495" x2="20" y2="260" stroke="url(#nnLineB)" />
      </g>
      <g className="nn-nodes">
        <circle className="nn-node n1" cx="45" cy="55" r="4" fill="url(#nnNode1)" />
        <circle className="nn-node n2" cx="170" cy="95" r="6" fill="url(#nnNode2)" />
        <circle className="nn-node n3" cx="310" cy="45" r="5" fill="url(#nnNode1)" />
        <circle className="nn-node n4" cx="235" cy="155" r="4" fill="url(#nnNode2)" />
        <circle className="nn-node n5" cx="20" cy="260" r="3" fill="url(#nnNode1)" />
        <circle className="nn-node n6" cx="385" cy="240" r="4" fill="url(#nnNode2)" />
        <circle className="nn-node n7" cx="55" cy="495" r="5" fill="url(#nnNode1)" />
        <circle className="nn-node n8" cx="200" cy="545" r="6" fill="url(#nnNode2)" />
        <circle className="nn-node n9" cx="345" cy="520" r="4" fill="url(#nnNode1)" />
        <circle className="nn-node n10" cx="150" cy="470" r="3" fill="url(#nnNode2)" />
      </g>
    </svg>
  </div>
);

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();

  const [pane, setPane] = useState<PaneKey>('login');
  const [loginDone, setLoginDone] = useState(false);
  const [registerDone, setRegisterDone] = useState(false);
  const [showLoginPwd, setShowLoginPwd] = useState(false);
  const [showRegPwd, setShowRegPwd] = useState(false);

  const [loginAccount, setLoginAccount] = useState('');
  const [loginPwd, setLoginPwd] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regUser, setRegUser] = useState('');
  const [regPwd, setRegPwd] = useState('');
  const [regAgree, setRegAgree] = useState(false);

  /** 切换登录/注册面板并重置表单与成功态（原型 switchAuthPane） */
  const switchPane = (which: PaneKey) => {
    setPane(which);
    setLoginDone(false);
    setRegisterDone(false);
    setShowLoginPwd(false);
    setShowRegPwd(false);
    setLoginAccount('');
    setLoginPwd('');
    setRegEmail('');
    setRegUser('');
    setRegPwd('');
    setRegAgree(false);
  };

  const submitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loginAccount.trim()) return;
    if (!loginPwd) return;
    setLoginDone(true);
    window.scrollTo(0, 0);
  };

  const submitRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!regEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regEmail)) return;
    if (!regUser.trim()) return;
    if (!regPwd) return;
    if (!regAgree) return;
    setRegisterDone(true);
    window.scrollTo(0, 0);
  };

  return (
    <section className="auth-page" id="page-auth">
      <div className="auth-wrap">
        {/* 左侧品牌区 */}
        <aside className="auth-side">
          <div className="auth-blob auth-blob-1" aria-hidden="true" />
          <div className="auth-blob auth-blob-2" aria-hidden="true" />
          <AuthNeuralBg />
          <div className="auth-side-body">
            <div className="auth-badge">
              <span className="auth-badge-dot" />
              众调 AI 生态服务平台
            </div>
            <h2>
              连接 <span className="auth-flow">AI 算力</span> 与真实业务场景
            </h2>
            <p className="auth-side-desc">
              一站式接入大模型、弹性算力与行业方案，让 AI 真正在企业里跑起来。
            </p>
            <ul className="auth-features">
              <li className="auth-feature">
                <span className="dot">✓</span>
                <div className="auth-feature-text">
                  <div className="auth-feature-title">多模型体验</div>
                  <div className="auth-feature-sub">新用户每日登录可领取 token 额度</div>
                </div>
              </li>
              <li className="auth-feature">
                <span className="dot">✓</span>
                <div className="auth-feature-text">
                  <div className="auth-feature-title">弹性算力调度</div>
                  <div className="auth-feature-sub">按需开通、即开即用</div>
                </div>
              </li>
              <li className="auth-feature">
                <span className="dot">✓</span>
                <div className="auth-feature-text">
                  <div className="auth-feature-title">行业方案定制</div>
                  <div className="auth-feature-sub">陪伴式落地服务</div>
                </div>
              </li>
            </ul>
            <div className="auth-stats">
              <div className="auth-stat">
                <div className="auth-stat-num">
                  7×24<span className="unit">h</span>
                </div>
                <div className="auth-stat-label">企业级服务</div>
              </div>
              <div className="auth-stat">
                <div className="auth-stat-num">
                  99.9<span className="unit">%</span>
                </div>
                <div className="auth-stat-label">可用性 SLA</div>
              </div>
            </div>
          </div>
          <div className="auth-side-foot">© 2026 众调科技 · 让 AI 落地更简单</div>
        </aside>

        {/* 右侧表单卡片 */}
        <div className="auth-card">
          {/* 登录 */}
          <div className={`auth-pane${pane === 'login' ? ' is-on' : ''}`}>
            <div className="auth-head">
              <div>
                <div className="auth-title">登录账号</div>
                <div className="auth-sub">使用账户名称或注册邮箱登录</div>
              </div>
              <div className="auth-switch">
                还没有账号？
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    switchPane('register');
                  }}
                >
                  立即注册
                </a>
              </div>
            </div>
            {!loginDone ? (
              <form className="auth-form" noValidate onSubmit={submitLogin}>
                <div className="auth-field">
                  <label className="auth-field-label">
                    <span className="req">*</span>账户名称 / 邮箱
                  </label>
                  <div className="auth-input">
                    <span className="ico" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="account"
                      placeholder="请输入账户名称或邮箱"
                      autoComplete="username"
                      value={loginAccount}
                      onChange={(e) => setLoginAccount(e.target.value)}
                    />
                  </div>
                </div>
                <div className="auth-field">
                  <label className="auth-field-label">
                    <span className="req">*</span>密码
                  </label>
                  <div className="auth-input">
                    <span className="ico" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </span>
                    <input
                      type={showLoginPwd ? 'text' : 'password'}
                      name="password"
                      placeholder="请输入密码"
                      autoComplete="current-password"
                      value={loginPwd}
                      onChange={(e) => setLoginPwd(e.target.value)}
                    />
                    <span
                      className={`eye${showLoginPwd ? ' is-on' : ''}`}
                      role="button"
                      aria-label="显示/隐藏密码"
                      onClick={() => setShowLoginPwd((v) => !v)}
                    >
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </span>
                  </div>
                </div>
                <button type="submit" className="auth-submit">
                  登录
                </button>
              </form>
            ) : (
              <div className="auth-success is-on">
                <div className="auth-success-icon">✓</div>
                <h3>登录成功</h3>
                <p>正在为您准备控制台…</p>
                <button type="button" className="auth-back" onClick={() => navigate('/')}>
                  返回首页
                </button>
              </div>
            )}
          </div>

          {/* 注册 */}
          <div className={`auth-pane${pane === 'register' ? ' is-on' : ''}`}>
            <div className="auth-head">
              <div>
                <div className="auth-title">注册账号</div>
                <div className="auth-sub">创建账号后，需要完成邮箱验证</div>
              </div>
              <div className="auth-switch">
                已有账号？
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    switchPane('login');
                  }}
                >
                  立即登录
                </a>
              </div>
            </div>
            {!registerDone ? (
              <form className="auth-form" noValidate onSubmit={submitRegister}>
                <div className="auth-field">
                  <label className="auth-field-label">
                    <span className="req">*</span>邮箱
                  </label>
                  <div className="auth-input">
                    <span className="ico" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <path d="M3 7l9 6 9-6" />
                      </svg>
                    </span>
                    <input
                      type="email"
                      name="email"
                      placeholder="请输入邮箱地址"
                      autoComplete="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="auth-field">
                  <label className="auth-field-label">
                    <span className="req">*</span>账户名称
                  </label>
                  <div className="auth-input">
                    <span className="ico" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="username"
                      placeholder="4-20 个字符，仅支持字母、数字和下划线"
                      autoComplete="username"
                      value={regUser}
                      onChange={(e) => setRegUser(e.target.value)}
                    />
                  </div>
                </div>
                <div className="auth-field">
                  <label className="auth-field-label">
                    <span className="req">*</span>密码
                  </label>
                  <div className="auth-input">
                    <span className="ico" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </span>
                    <input
                      type={showRegPwd ? 'text' : 'password'}
                      name="password"
                      placeholder="请输入 12-64 个字符的密码"
                      autoComplete="new-password"
                      value={regPwd}
                      onChange={(e) => setRegPwd(e.target.value)}
                    />
                    <span
                      className={`eye${showRegPwd ? ' is-on' : ''}`}
                      role="button"
                      aria-label="显示/隐藏密码"
                      onClick={() => setShowRegPwd((v) => !v)}
                    >
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </span>
                  </div>
                </div>
                <label className="auth-check">
                  <input type="checkbox" checked={regAgree} onChange={(e) => setRegAgree(e.target.checked)} />
                  <span>
                    我已阅读并同意 <a href="javascript:void(0)">《用户协议》</a> 和{' '}
                    <a href="javascript:void(0)">《隐私政策》</a>
                  </span>
                </label>
                <button type="submit" className="auth-submit">
                  注册
                </button>
              </form>
            ) : (
              <div className="auth-success is-on">
                <div className="auth-success-icon">✓</div>
                <h3>注册成功</h3>
                <p>请前往邮箱完成验证，验证通过后即可登录。</p>
                <button type="button" className="auth-back" onClick={() => switchPane('login')}>
                  返回登录
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
