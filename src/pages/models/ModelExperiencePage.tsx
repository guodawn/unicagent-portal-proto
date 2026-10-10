import React, { useEffect, useRef, useState } from 'react';

import './ModelExperiencePage.css';

/** 大模型体验 / 对话 playground（原型 page-experience，HTML 3124-3204） */

type ModelOption = { name: string; short: string };

type CategoryKey = 'text' | 'voice' | 'vision' | 'multi' | 'vector';

/** 模型目录（原型 JS 4218-4259 逐条照搬） */
const CATEGORIES: Record<CategoryKey, ModelOption[]> = {
  text: [
    { name: '腾讯混元 Hy4-preview', short: '混' },
    { name: '智谱 GLM-5.3', short: '智' },
    { name: 'DeepSeek-V4-Flash', short: 'DS' },
    { name: '美团 LongCat-2.0', short: '美' },
    { name: '智谱 GLM-5.2', short: '智' },
    { name: 'Kimi-K2.7-Code', short: 'Ki' },
    { name: 'DeepSeek-V4-Pro', short: 'DS' },
    { name: 'Qwen 3.8 Max', short: 'Q' },
  ],
  voice: [
    { name: '语音合成-标准', short: '语' },
    { name: '语音克隆-Pro', short: '克' },
    { name: '实时语音-极速', short: '实' },
  ],
  vision: [
    { name: '图像生成-通用', short: '图' },
    { name: '图像理解-Pro', short: '理' },
    { name: '视觉问答-VLM', short: '视' },
  ],
  multi: [
    { name: '全模态-Pro', short: '全' },
    { name: '多模态对话', short: '多' },
    { name: '图文理解', short: '文' },
  ],
  vector: [
    { name: 'Embedding-3', short: 'E' },
    { name: 'Embedding-Pro', short: 'P' },
    { name: 'Rerank-v2', short: 'R' },
  ],
};

const CAT_LIST: { key: CategoryKey; label: string; icon: React.ReactNode }[] = [
  {
    key: 'text',
    label: '文本模型',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    key: 'voice',
    label: '语音模型',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
        <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" />
      </svg>
    ),
  },
  {
    key: 'vision',
    label: '视觉模型',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    key: 'multi',
    label: '全模态模型',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    key: 'vector',
    label: '向量模型',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
  },
];

/** 原型 botReply 中的示例代码（命中代码类意图时追加） */
const CODE_SNIPPET = `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr)//2]
    left  = [x for x in arr if x < pivot]
    mid   = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + mid + quick_sort(right)`;

type Msg = { id: number; role: 'user' | 'bot'; text: string; code?: string; short?: string; model?: string; streaming?: boolean };

/** 模拟对话：按关键词生成不同风格的回复（原型 mock，非真实模型输出） */
const mockReply = (question: string, modelName: string): { text: string; code?: string } => {
  const q = question.toLowerCase();

  if (/^(你好|您好|hi|hello|嗨|在吗)/i.test(q.trim())) {
    return {
      text: `你好！很高兴见到你 👋\n我是 ${modelName}，在这个体验中心里你可以随时向我提问：写代码、改文案、做分析、聊思路都可以。\n试着输入「帮我写一个快速排序」或「给我讲讲大模型微调」看看效果。`,
    };
  }

  if (/代码|排序|python|函数|实现|算法|写一个|示例/.test(q)) {
    return {
      text: `好的，下面给你一个可运行的示例（以「${question}」为例）：\n这段代码的时间复杂度为 O(n log n)，可以直接复制到本地 Python 环境执行。\n如果你希望换成其他语言、加注释或补测试用例，直接告诉我。`,
      code: CODE_SNIPPET,
    };
  }

  if (/区别|对比|比较|vs|哪个好/.test(q)) {
    return {
      text: `这个问题可以从三个维度来看：\n1. 能力边界——两者的强项场景不同，先明确你的主要用途；\n2. 成本——按 token 计费时，长上下文场景的价格差异会被放大；\n3. 生态——周边工具链、微调支持和社区活跃度都影响落地速度。\n结论：没有绝对的好坏，匹配业务场景的才是最优解。需要我针对你的具体场景展开分析吗？`,
    };
  }

  if (/是什么|介绍|解释|讲讲|怎么理解|为什么/.test(q)) {
    return {
      text: `用一句话概括：「${question.replace(/[?？。！!]*$/, '')}」本质上是把复杂问题拆成可执行的小步骤。\n展开来说：\n· 先定义清楚目标和约束；\n· 再选择合适的方法或模型；\n· 最后用真实数据验证效果并迭代。\n如果你想深入某个环节，告诉我序号，我逐个展开。`,
    };
  }

  if (/写|文案|标题|slogan|宣传/.test(q)) {
    return {
      text: `收到，给你三版不同风格的方案：\n① 简洁有力型——一句话讲清核心价值；\n② 场景共鸣型——从用户痛点切入，引发代入感；\n③ 数据背书型——用具体数字建立信任。\n选定方向后告诉我，我可以在该风格下再出 5 个变体供你挑选。`,
    };
  }

  return {
    text: `收到你的问题：「${question}」。\n我是基于演示环境运行的 ${modelName}，针对这个问题可以这样思考：先明确目标与约束，再拆解为可执行的小步骤，最后用真实数据验证效果。\n你可以进一步追问，例如要求我展开更详细的步骤、示例代码或对比分析。`,
  };
};

export const ModelExperiencePage: React.FC = () => {
  const [cat, setCat] = useState<CategoryKey>('text');
  const [model, setModel] = useState<ModelOption>({ name: 'Qwen 3.8 Max', short: 'Q' });
  const [ddOpen, setDdOpen] = useState(false);
  const [text, setText] = useState('');
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);

  const chatRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const seq = useRef(0);
  const streamTimer = useRef<number | null>(null);

  // 卸载时清理流式输出定时器
  useEffect(
    () => () => {
      if (streamTimer.current !== null) window.clearInterval(streamTimer.current);
    },
    []
  );

  // 消息区自动滚到底（原型 addMsg 内 scrollTop = scrollHeight）
  useEffect(() => {
    const el = chatRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, typing]);

  // 点击空白处收起模型下拉
  useEffect(() => {
    if (!ddOpen) return;
    const onDocClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t.closest('.me-model-dropdown') && !t.closest('.me-model-pill')) setDdOpen(false);
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, [ddOpen]);

  const handlePickCat = (key: CategoryKey) => {
    if (streamTimer.current !== null) {
      window.clearInterval(streamTimer.current);
      streamTimer.current = null;
    }
    setCat(key);
    const first = CATEGORIES[key][0];
    setModel(first);
    setMsgs([]);
    setText('');
    setTyping(false);
    setDdOpen(false);
    if (inputRef.current) inputRef.current.style.height = 'auto';
  };

  const send = () => {
    const value = text.trim();
    if (!value || typing) return;
    seq.current += 1;
    setMsgs((prev) => [...prev, { id: seq.current, role: 'user', text: value }]);
    setText('');
    if (inputRef.current) inputRef.current.style.height = 'auto';

    const snapshot = model;
    const reply = mockReply(value, snapshot.name);
    setTyping(true);

    window.setTimeout(() => {
      setTyping(false);
      seq.current += 1;
      const botId = seq.current;
      setMsgs((prev) => [
        ...prev,
        { id: botId, role: 'bot', text: '', code: reply.code, short: snapshot.short, model: snapshot.name, streaming: true },
      ]);

      // 打字机流式输出：约 1.8s 内匀速吐完
      let i = 0;
      const step = Math.max(1, Math.round(reply.text.length / 60));
      streamTimer.current = window.setInterval(() => {
        i += step;
        const done = i >= reply.text.length;
        const slice = done ? reply.text : reply.text.slice(0, i);
        setMsgs((prev) => prev.map((m) => (m.id === botId ? { ...m, text: slice, streaming: !done } : m)));
        if (done && streamTimer.current !== null) {
          window.clearInterval(streamTimer.current);
          streamTimer.current = null;
        }
      }, 30);
    }, 700);
  };

  const models = CATEGORIES[cat];

  return (
    <section className="model-experience-page" id="page-experience">
      <div className="me-layout">
        {/* 左侧：模型类型导航 */}
        <aside className="me-side">
          <div className="me-side-title">体验中心</div>
          {CAT_LIST.map((c) => (
            <button
              key={c.key}
              type="button"
              className={`me-cat${cat === c.key ? ' active' : ''}`}
              aria-pressed={cat === c.key}
              onClick={() => handlePickCat(c.key)}
            >
              {c.icon}
              <span>{c.label}</span>
            </button>
          ))}
        </aside>

        {/* 主区域 */}
        <main className="me-main">
          {/* 顶部：模型选择器 */}
          <div className="me-topbar">
            <button
              type="button"
              className={`me-model-pill${ddOpen ? ' open' : ''}`}
              aria-haspopup="listbox"
              aria-expanded={ddOpen}
              aria-label="选择模型"
              onClick={(e) => {
                e.stopPropagation();
                setDdOpen((v) => !v);
              }}
            >
              <span className="me-model-pill-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </span>
              <span className="me-model-pill-name">{model.name}</span>
              <svg className="me-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div className={`me-model-dropdown${ddOpen ? ' open' : ''}`} role="listbox" aria-label="可选模型列表">
              {models.length === 0 ? (
                <div className="me-model-dd-empty">该类型模型即将上线</div>
              ) : (
                models.map((m) => (
                  <div
                    key={m.name}
                    className={`me-model-dd-item${m.name === model.name ? ' active' : ''}`}
                    role="option"
                    aria-selected={m.name === model.name}
                    onClick={() => {
                      setModel(m);
                      setDdOpen(false);
                    }}
                  >
                    <span className="me-model-dd-name">{m.name}</span>
                    <svg className="me-model-dd-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 聊天区 */}
          <div className="me-chat" ref={chatRef}>
            {msgs.length === 0 && !typing && (
              <div className="me-welcome">
                <h2>欢迎开启创作，今天你有什么构思想落地</h2>
              </div>
            )}

            {msgs.map((m) =>
              m.role === 'user' ? (
                <div key={m.id} className="me-msg user">
                  <div className="me-bubble">
                    {m.text.split('\n').map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>
              ) : (
                <div key={m.id} className="me-msg bot">
                  <div className="me-avatar">{m.short}</div>
                  <div className="me-bubble">
                    {m.text.split('\n').map((line, i) => (
                      <p key={i}>{line || '\u00A0'}</p>
                    ))}
                    {m.streaming && <span className="me-caret" aria-hidden="true" />}
                    {m.code && (
                      <pre>
                        <code>{m.code}</code>
                      </pre>
                    )}
                  </div>
                </div>
              )
            )}

            {typing && (
              <div className="me-msg bot">
                <div className="me-avatar">{model.short}</div>
                <div className="me-bubble">
                  <div className="me-typing">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 底部：输入 */}
          <div className="me-bottombar">
            <div className="me-input-card">
              <textarea
                ref={inputRef}
                className="me-input"
                rows={2}
                placeholder="今天你想做什么，/ 调用指令"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  const el = e.target;
                  el.style.height = 'auto';
                  el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
              />
              <div className="me-input-row">
                <div className="me-input-right">
                  <button
                    type="button"
                    className={`me-send${text.trim() ? ' active' : ''}`}
                    aria-label="发送"
                    title="发送"
                    onClick={send}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 19V5M5 12l7-7 7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};
