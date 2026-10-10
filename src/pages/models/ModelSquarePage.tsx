import React, { useEffect, useMemo, useState } from 'react';
import { useProtoReveal } from '@/proto/useProtoReveal';
import './ModelSquarePage.css';

/** 大模型广场（原型 page-models，HTML 2910-3121）：Hero 搜索 → 筛选 → 模型列表 → 详情弹窗 */

type ModelItem = {
  id: string;
  /** 厂商名（卡片顶部小字，与截图一致） */
  vendor: string;
  /** 厂商 logo（品牌化 SVG，按截图近似还原） */
  logo: React.ReactNode;
  /** 模型全名 */
  name: string;
  /** 模型类型（对应「模型类型」筛选） */
  type: string;
  /** 应用场景（对应「应用场景」筛选） */
  scenes: string[];
  /** 发布时间（展示） */
  publishedAt: string;
  /** 发布时间戳（排序用） */
  publishedTs: number;
  /** 输入价格 ¥/M Tokens */
  inputPrice: number;
  /** 输出价格 ¥/M Tokens */
  outputPrice: number;
};

/* ====================== 厂商品牌 logo（按截图厂商近似还原，24×24 SVG） ====================== */

/** 智谱（GLM 系列）：深灰底白色 Z */
const LOGO_ZHIPU = (
  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
    <defs>
      <linearGradient id="lg-zhipu" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#2A2A30" />
        <stop offset="100%" stopColor="#55555F" />
      </linearGradient>
    </defs>
    <rect width="24" height="24" rx="6" fill="url(#lg-zhipu)" />
    <path d="M7.5 7.5h9l-9 9h9" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** 腾讯混元：蓝色球体 + 白色轨道弧线 */
const LOGO_HUNYUAN = (
  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
    <defs>
      <radialGradient id="lg-hunyuan" cx="35%" cy="28%" r="85%">
        <stop offset="0%" stopColor="#6FC3FF" />
        <stop offset="55%" stopColor="#2E7CF6" />
        <stop offset="100%" stopColor="#0A4BC8" />
      </radialGradient>
    </defs>
    <circle cx="12" cy="12" r="11" fill="url(#lg-hunyuan)" />
    <ellipse cx="12" cy="12" rx="8.2" ry="3.1" fill="none" stroke="#fff" strokeOpacity=".9" strokeWidth="1.3" transform="rotate(-24 12 12)" />
    <ellipse cx="12" cy="12" rx="8.2" ry="3.1" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="1.1" transform="rotate(38 12 12)" />
  </svg>
);

/** DeepSeek：蓝紫圆底 + 白色鲸鱼 */
const LOGO_DEEPSEEK = (
  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
    <defs>
      <linearGradient id="lg-deepseek" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#5D7BFF" />
        <stop offset="100%" stopColor="#3D56E8" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="11" fill="url(#lg-deepseek)" />
    <path
      d="M3.6 14.4c1.9-3 5-4.5 8.4-4.1 1.8.2 3.3.9 4.4 2 1.1-.3 1.9-1 2.5-2.2.2 1.4-.2 2.6-1 3.5.3.7.4 1.4.3 2.1l-2.1-.4c-1.1 1.2-2.9 1.9-5 1.9-3.1 0-5.9-1.1-7.5-2.8z"
      fill="#fff"
    />
  </svg>
);

/** 美团 LongCat：绿色底白色 M（猫耳形） */
const LOGO_LONGCAT = (
  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
    <defs>
      <linearGradient id="lg-longcat" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#3BE08A" />
        <stop offset="100%" stopColor="#0FB377" />
      </linearGradient>
    </defs>
    <rect width="24" height="24" rx="6" fill="url(#lg-longcat)" />
    <path d="M6.5 17V8.5l5.5 4.6 5.5-4.6V17" fill="none" stroke="#fff" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Kimi（Moonshot）：黑色底白色 K */
const LOGO_KIMI = (
  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
    <defs>
      <linearGradient id="lg-kimi" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#232327" />
        <stop offset="100%" stopColor="#4A4A52" />
      </linearGradient>
    </defs>
    <rect width="24" height="24" rx="6" fill="url(#lg-kimi)" />
    <path d="M9.2 7v10M9.2 12l5.4-4.8M9.2 12l5.4 4.8" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Qwen：紫色底白色四角星 */
const LOGO_QWEN = (
  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
    <defs>
      <linearGradient id="lg-qwen" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#7C4DFF" />
        <stop offset="100%" stopColor="#5138EE" />
      </linearGradient>
    </defs>
    <rect width="24" height="24" rx="6" fill="url(#lg-qwen)" />
    <path d="M12 4.6l2.1 5.3 5.3 2.1-5.3 2.1L12 19.4l-2.1-5.3-5.3-2.1 5.3-2.1z" fill="#fff" />
  </svg>
);

/** 豆包（字节）：蓝底白色对话气泡 */
const LOGO_DOUBAO = (
  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
    <defs>
      <linearGradient id="lg-doubao" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#4E7BFF" />
        <stop offset="100%" stopColor="#2B4FE0" />
      </linearGradient>
    </defs>
    <rect width="24" height="24" rx="6" fill="url(#lg-doubao)" />
    <path d="M6 8.6A2.6 2.6 0 018.6 6h6.8A2.6 2.6 0 0118 8.6v3.8A2.6 2.6 0 0115.4 15H11l-3.3 3v-3H8.6A2.6 2.6 0 016 12.4z" fill="#fff" />
  </svg>
);

/** 讯飞星火：红橙圆底白色火花星 */
const LOGO_IFLYTEK = (
  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
    <defs>
      <linearGradient id="lg-iflytek" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FF7A45" />
        <stop offset="100%" stopColor="#E2231A" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="11" fill="url(#lg-iflytek)" />
    <path d="M12 4.6l1.8 4.2 4.2 1.8-4.2 1.8L12 16.6l-1.8-4.2L6 10.6l4.2-1.8z" fill="#fff" />
  </svg>
);

/** MiniMax：橙红圆底白色海螺螺旋 */
const LOGO_MINIMAX = (
  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
    <defs>
      <linearGradient id="lg-minimax" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FF8A5B" />
        <stop offset="100%" stopColor="#E6402B" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="11" fill="url(#lg-minimax)" />
    <path d="M12 6.4a5.6 5.6 0 11-5.3 7.4" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M12 11.1a1.6 1.6 0 11-1.5 2.1" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** 百川：深蓝底白色 B */
const LOGO_BAICHUAN = (
  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
    <defs>
      <linearGradient id="lg-baichuan" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#3E8BFF" />
        <stop offset="100%" stopColor="#1B5FD9" />
      </linearGradient>
    </defs>
    <rect width="24" height="24" rx="6" fill="url(#lg-baichuan)" />
    <path d="M8.6 6.4v11.2h3.9a2.8 2.8 0 000-5.6H8.6M8.6 12h4.3a2.8 2.8 0 010 5.6H8.6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** 阶跃星辰：青绿底白色阶梯 */
const LOGO_STEPFUN = (
  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
    <defs>
      <linearGradient id="lg-stepfun" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#2DD4BF" />
        <stop offset="100%" stopColor="#0E9384" />
      </linearGradient>
    </defs>
    <rect width="24" height="24" rx="6" fill="url(#lg-stepfun)" />
    <path d="M5.6 17.6v-4.2h4.2v-4.2h4.2V5h4.4" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** 模型数据（名称与厂商按截图逐条对照；发布时间/价格为 mock，截图未提供） */
const MODELS: ModelItem[] = [
  { id: 'glm-5-3-flash', vendor: '智谱', logo: <img src="/images/logo-z.png" alt="" />, name: 'zai-org/GLM-5.3-Flash', type: '对话', scenes: ['通用助手', '快速响应', '多模态理解/识别'], publishedAt: '2026年09月10日', publishedTs: new Date('2026-09-10').getTime(), inputPrice: 2, outputPrice: 8 },
  { id: 'hy4-preview', vendor: '腾讯混元', logo: <img src="/images/logo-hunyuan.png" alt="" />, name: 'tencent/Hy4-preview', type: '对话', scenes: ['旗舰全能', '通用助手'], publishedAt: '2026年08月28日', publishedTs: new Date('2026-08-28').getTime(), inputPrice: 6, outputPrice: 18 },
  { id: 'glm-5-3', vendor: '智谱', logo: <img src="/images/logo-z.png" alt="" />, name: 'zai-org/GLM-5.3', type: '对话', scenes: ['旗舰全能', '数学推理'], publishedAt: '2026年08月14日', publishedTs: new Date('2026-08-14').getTime(), inputPrice: 6, outputPrice: 28 },
  { id: 'deepseek-v4-flash', vendor: 'DeepSeek', logo: <img src="/images/logo-deepseek.png" alt="" />, name: 'deepseek-ai/DeepSeek-V4-Flash', type: '对话', scenes: ['快速响应', '长文本处理'], publishedAt: '2026年04月24日', publishedTs: new Date('2026-04-24').getTime(), inputPrice: 1, outputPrice: 2 },
  { id: 'longcat-2-0', vendor: 'meituan-longcat', logo: <img src="/images/logo-longcat.png" alt="" />, name: 'meituan-longcat/LongCat-2.0', type: '对话', scenes: ['Vibe Coding', '通用助手'], publishedAt: '2026年06月30日', publishedTs: new Date('2026-06-30').getTime(), inputPrice: 5, outputPrice: 20 },
  { id: 'glm-5-2', vendor: '智谱', logo: <img src="/images/logo-z.png" alt="" />, name: 'zai-org/GLM-5.2', type: '对话', scenes: ['通用助手', '长文本处理'], publishedAt: '2026年07月10日', publishedTs: new Date('2026-07-10').getTime(), inputPrice: 5, outputPrice: 22 },
  { id: 'kimi-k2-7-code', vendor: 'Kimi', logo: <img src="/images/logo-kimi.png" alt="" />, name: 'moonshotai/Kimi-K2.7-Code', type: '对话', scenes: ['Vibe Coding', '数学推理'], publishedAt: '2026年05月18日', publishedTs: new Date('2026-05-18').getTime(), inputPrice: 4, outputPrice: 16 },
  { id: 'deepseek-v4-pro', vendor: 'DeepSeek', logo: <img src="/images/logo-deepseek.png" alt="" />, name: 'deepseek-ai/DeepSeek-V4-Pro', type: '对话', scenes: ['旗舰全能', '数学推理'], publishedAt: '2026年03月15日', publishedTs: new Date('2026-03-15').getTime(), inputPrice: 8, outputPrice: 24 },
  { id: 'qwen3-8-27b', vendor: 'Qwen', logo: <img src="/images/logo-qwen.png" alt="" />, name: 'Qwen/Qwen3.8-27B', type: '对话', scenes: ['多模态理解/识别', '通用助手'], publishedAt: '2026年02月08日', publishedTs: new Date('2026-02-08').getTime(), inputPrice: 3, outputPrice: 9 },

  /* —— 补充模型：覆盖生图 / 视频 / 语音 / 嵌入 / 重排序 等筛选类目（数据为 mock） —— */
  { id: 'qwen-image-3', vendor: 'Qwen', logo: <img src="/images/logo-qwen.png" alt="" />, name: 'Qwen/Qwen-Image-3.0', type: '生图', scenes: ['图像生成', 'AIGC 内容创作'], publishedAt: '2026年07月22日', publishedTs: new Date('2026-07-22').getTime(), inputPrice: 12, outputPrice: 12 },
  { id: 'glm-image-pro', vendor: '智谱', logo: <img src="/images/logo-z.png" alt="" />, name: 'zai-org/GLM-Image-Pro', type: '生图', scenes: ['图像生成', '图像编辑'], publishedAt: '2026年06月18日', publishedTs: new Date('2026-06-18').getTime(), inputPrice: 9, outputPrice: 9 },
  { id: 'minimax-image-01', vendor: 'MiniMax', logo: <img src="/images/logo-minimax.png" alt="" />, name: 'MiniMax/MiniMax-Image-01', type: '生图', scenes: ['图像生成', 'AIGC 内容创作'], publishedAt: '2026年05月06日', publishedTs: new Date('2026-05-06').getTime(), inputPrice: 8, outputPrice: 8 },
  { id: 'cogvideox-5', vendor: '智谱', logo: <img src="/images/logo-z.png" alt="" />, name: 'zai-org/CogVideoX-5.0', type: '视频', scenes: ['视频生成', 'AIGC 内容创作'], publishedAt: '2026年04月11日', publishedTs: new Date('2026-04-11').getTime(), inputPrice: 18, outputPrice: 18 },
  { id: 'qwen3-embedding-8b', vendor: 'Qwen', logo: <img src="/images/logo-qwen.png" alt="" />, name: 'Qwen/Qwen3-Embedding-8B', type: '嵌入', scenes: ['RAG', '领域知识综合'], publishedAt: '2026年03月28日', publishedTs: new Date('2026-03-28').getTime(), inputPrice: 1, outputPrice: 1 },
  { id: 'embedding-3', vendor: '智谱', logo: <img src="/images/logo-z.png" alt="" />, name: 'zai-org/embedding-3', type: '嵌入', scenes: ['RAG'], publishedAt: '2026年01月20日', publishedTs: new Date('2026-01-20').getTime(), inputPrice: 2, outputPrice: 2 },
  { id: 'qwen3-reranker-4b', vendor: 'Qwen', logo: <img src="/images/logo-qwen.png" alt="" />, name: 'Qwen/Qwen3-Reranker-4B', type: '重排序', scenes: ['RAG'], publishedAt: '2026年03月28日', publishedTs: new Date('2026-03-28').getTime(), inputPrice: 1, outputPrice: 1 },
  { id: 'rerank-v2', vendor: '智谱', logo: <img src="/images/logo-z.png" alt="" />, name: 'zai-org/rerank-v2', type: '重排序', scenes: ['RAG', '领域知识综合'], publishedAt: '2026年01月20日', publishedTs: new Date('2026-01-20').getTime(), inputPrice: 2, outputPrice: 2 },
  { id: 'spark-tts-pro', vendor: '讯飞星火', logo: <img src="/images/logo-iflytek.png" alt="" />, name: 'iFlytek/Spark-TTS-Pro', type: '语音', scenes: ['语音合成', '语音交互'], publishedAt: '2026年06月12日', publishedTs: new Date('2026-06-12').getTime(), inputPrice: 6, outputPrice: 6 },
  { id: 'minimax-speech-02-hd', vendor: 'MiniMax', logo: <img src="/images/logo-minimax.png" alt="" />, name: 'MiniMax/speech-02-hd', type: '语音', scenes: ['语音合成', '内容翻译'], publishedAt: '2026年02月26日', publishedTs: new Date('2026-02-26').getTime(), inputPrice: 5, outputPrice: 5 },
  { id: 'minimax-text-02', vendor: 'MiniMax', logo: <img src="/images/logo-minimax.png" alt="" />, name: 'MiniMax/MiniMax-Text-02', type: '对话', scenes: ['角色扮演', '游戏互动', '内容翻译'], publishedAt: '2026年05月25日', publishedTs: new Date('2026-05-25').getTime(), inputPrice: 2, outputPrice: 8 },
  { id: 'baichuan4-turbo', vendor: '百川', logo: <img src="/images/logo-baichuan.png" alt="" />, name: 'baichuan/Baichuan4-Turbo', type: '对话', scenes: ['内容翻译', '领域知识综合'], publishedAt: '2026年04月08日', publishedTs: new Date('2026-04-08').getTime(), inputPrice: 2, outputPrice: 6 },
  { id: 'spark-4-ultra', vendor: '讯飞星火', logo: <img src="/images/logo-iflytek.png" alt="" />, name: 'iFlytek/Spark-4.0-Ultra', type: '对话', scenes: ['内容翻译', '文案创作'], publishedAt: '2026年03月05日', publishedTs: new Date('2026-03-05').getTime(), inputPrice: 3, outputPrice: 10 },
  /* —— 第二批补充：均为已有官方 logo 的厂商，用于充实列表与筛选项 —— */
  { id: 'spark-asr-pro', vendor: '讯飞星火', logo: <img src="/images/logo-iflytek.png" alt="" />, name: 'iFlytek/Spark-ASR-Pro', type: '语音', scenes: ['语音识别', '语音交互'], publishedAt: '2026年07月08日', publishedTs: new Date('2026-07-08').getTime(), inputPrice: 4, outputPrice: 4 },
  { id: 'minimax-video-01', vendor: 'MiniMax', logo: <img src="/images/logo-minimax.png" alt="" />, name: 'MiniMax/video-01', type: '视频', scenes: ['视频生成', 'AIGC 内容创作'], publishedAt: '2026年06月25日', publishedTs: new Date('2026-06-25').getTime(), inputPrice: 16, outputPrice: 16 },
  { id: 'qwen3-8-plus', vendor: 'Qwen', logo: <img src="/images/logo-qwen.png" alt="" />, name: 'Qwen/Qwen3.8-Plus', type: '对话', scenes: ['通用助手', '旗舰全能'], publishedAt: '2026年08月20日', publishedTs: new Date('2026-08-20').getTime(), inputPrice: 4, outputPrice: 14 },
  { id: 'hy4-turbo', vendor: '腾讯混元', logo: <img src="/images/logo-hunyuan.png" alt="" />, name: 'tencent/Hy4-Turbo', type: '对话', scenes: ['多模态理解/识别', '旗舰全能'], publishedAt: '2026年08月09日', publishedTs: new Date('2026-08-09').getTime(), inputPrice: 3, outputPrice: 11 },
  { id: 'glm-5-3-air', vendor: '智谱', logo: <img src="/images/logo-z.png" alt="" />, name: 'zai-org/GLM-5.3-Air', type: '对话', scenes: ['快速响应', '通用助手'], publishedAt: '2026年09月02日', publishedTs: new Date('2026-09-02').getTime(), inputPrice: 1, outputPrice: 6 },
  { id: 'deepseek-v4-lite', vendor: 'DeepSeek', logo: <img src="/images/logo-deepseek.png" alt="" />, name: 'deepseek-ai/DeepSeek-V4-Lite', type: '对话', scenes: ['快速响应', '长文本处理'], publishedAt: '2026年05月12日', publishedTs: new Date('2026-05-12').getTime(), inputPrice: 1, outputPrice: 4 },
  { id: 'longcat-2-0-flash', vendor: 'meituan-longcat', logo: <img src="/images/logo-longcat.png" alt="" />, name: 'meituan-longcat/LongCat-2.0-Flash', type: '对话', scenes: ['快速响应', 'Vibe Coding'], publishedAt: '2026年07月26日', publishedTs: new Date('2026-07-26').getTime(), inputPrice: 2, outputPrice: 9 },
  { id: 'kimi-k2-7', vendor: 'Kimi', logo: <img src="/images/logo-kimi.png" alt="" />, name: 'moonshotai/Kimi-K2.7', type: '对话', scenes: ['长文本处理', '通用助手'], publishedAt: '2026年04月30日', publishedTs: new Date('2026-04-30').getTime(), inputPrice: 4, outputPrice: 14 },
  { id: 'baichuan4-pro', vendor: '百川', logo: <img src="/images/logo-baichuan.png" alt="" />, name: 'baichuan/Baichuan4-Pro', type: '对话', scenes: ['领域知识综合', '数学推理'], publishedAt: '2026年05月02日', publishedTs: new Date('2026-05-02').getTime(), inputPrice: 3, outputPrice: 10 },
  { id: 'minimax-text-03', vendor: 'MiniMax', logo: <img src="/images/logo-minimax.png" alt="" />, name: 'MiniMax/MiniMax-Text-03', type: '对话', scenes: ['角色扮演', '游戏互动', '文案创作'], publishedAt: '2026年09月05日', publishedTs: new Date('2026-09-05').getTime(), inputPrice: 3, outputPrice: 10 },
  { id: 'glm-image-edit', vendor: '智谱', logo: <img src="/images/logo-z.png" alt="" />, name: 'zai-org/GLM-Image-Edit', type: '生图', scenes: ['图像编辑', '图像生成'], publishedAt: '2026年07月16日', publishedTs: new Date('2026-07-16').getTime(), inputPrice: 10, outputPrice: 10 },
  { id: 'hy-asr-2', vendor: '腾讯混元', logo: <img src="/images/logo-hunyuan.png" alt="" />, name: 'tencent/Hy-ASR-2.0', type: '语音', scenes: ['语音识别', '语音交互'], publishedAt: '2026年06月05日', publishedTs: new Date('2026-06-05').getTime(), inputPrice: 3, outputPrice: 3 },
];


const TYPE_TAGS = ['全部', '对话', '生图', '嵌入', '重排序', '语音', '视频'];
const SCENE_TAGS = [
  '全部',
  'RAG',
  '通用助手',
  '旗舰全能',
  '文案创作',
  '长文本处理',
  '数学推理',
  'Vibe Coding',
  '快速响应',
  '多模态理解/识别',
  '语音合成',
  '语音交互',
  '语音识别',
  '图像生成',
  '图像编辑',
  '视频生成',
  'AIGC 内容创作',
  '游戏互动',
  '角色扮演',
  '内容翻译',
  '领域知识综合',
];
const SORT_OPTIONS = ['按默认排序 ↓', '按价格', '按发布时间'] as const;
/**
 * Hero 漂浮图标：把用户提供的所有 logo 图去重铺开（public/images/ 下共 10 张）。
 * 11 个位置 × 10 张图 → 仅末尾重复一次智谱，且与 f1 分处左上/右下两角，视觉上不相邻。
 */
const FLOAT_LOGOS = [
  '/images/logo-z.png',
  '/images/logo-longcat.png',
  '/images/logo-deepseek.png',
  '/images/logo-qwen.png',
  '/images/logo-cube.png',
  '/images/logo-kimi.png',
  '/images/logo-hunyuan.png',
  '/images/logo-minimax.png',
  '/images/logo-baichuan.png',
  '/images/logo-iflytek.png',
  '/images/logo-z.png',
];

/** 模型详情弹窗（原型 4074-4165）：所有卡片共用同一份 mock 详情，与原型行为一致 */
const ModelDetailModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  const codeText =
    'curl https://api.example.com/v1/embeddings \\\n  -H "Authorization: Bearer $API_KEY" \\\n  -d \'{ "model":"embedding-3", "input":"企业知识库检索" }\'';

  const handleCopy = () => {
    const done = () => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(codeText).then(done).catch(done);
    } else {
      done();
    }
  };

  return (
    <div
      className={`md-overlay${open ? ' open' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="md-modal">
        <div className="md-head">
          <div className="md-logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <circle cx="5" cy="6" r="1.5" />
              <circle cx="5" cy="18" r="1.5" />
              <circle cx="19" cy="12" r="1.5" />
              <path d="M6.5 6.5l4 4M6.5 17.5l4-4M17.5 12h-5" />
            </svg>
          </div>
          <div className="md-head-text">
            <h2>Embedding 文本向量</h2>
            <div className="md-sub-name">
              <span>embedding-3</span>
              <span
                className="md-copy-btn"
                title="复制模型名"
                onClick={() => navigator.clipboard?.writeText('embedding-3')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
              </span>
            </div>
          </div>
          <button type="button" className="md-close" aria-label="关闭" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="md-body">
          <section className="md-section">
            <h3>模型信息</h3>
            <div className="md-info-grid">
              <div className="md-info-item">
                <label>模型厂商</label>
                <div className="value">智谱 AI</div>
              </div>
              <div className="md-info-item">
                <label>模型类型</label>
                <div className="value">向量嵌入</div>
              </div>
              <div className="md-info-item">
                <label>模型标签</label>
                <div className="value">
                  <span className="md-tag-pill">检索增强</span>
                  <span className="md-tag-pill">长文本</span>
                </div>
              </div>
              <div className="md-info-item">
                <label>Max Tokens</label>
                <div className="value">8,192</div>
              </div>
              <div className="md-info-item">
                <label>输入模态</label>
                <div className="value">
                  <span className="md-modality">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 7V4h16v3M9 20h6M12 4v16" />
                    </svg>
                    文本
                  </span>
                </div>
              </div>
              <div className="md-info-item">
                <label>输出模态</label>
                <div className="value">
                  <span className="md-modality">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 7V4h16v3M9 20h6M12 4v16" />
                    </svg>
                    文本
                  </span>
                </div>
              </div>
              <div className="md-info-item">
                <label>发布时间</label>
                <div className="value">2026-08-03</div>
              </div>
              <div className="md-info-item">
                <label>更新时间</label>
                <div className="value">2026-08-03</div>
              </div>
            </div>
          </section>

          <section className="md-section">
            <h3>商品简介</h3>
            <p className="md-desc">面向语义检索、知识库召回和相似度计算，适配企业知识问答与检索增强。</p>
          </section>

          <section className="md-section">
            <h3>价格信息</h3>
            <table className="md-price-table">
              <thead>
                <tr>
                  <th>功能</th>
                  <th style={{ textAlign: 'right' }}>价格</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>输入 Tokens</td>
                  <td>50.00 Credits / M Tokens</td>
                </tr>
                <tr>
                  <td>输出 Tokens</td>
                  <td>50.00 Credits / M Tokens</td>
                </tr>
                <tr>
                  <td>缓存读取 Tokens</td>
                  <td>0.00 Credits / M Tokens</td>
                </tr>
                <tr>
                  <td>缓存写入 Tokens</td>
                  <td>0.00 Credits / M Tokens</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="md-section">
            <h3>流量控制</h3>
            <div className="md-rate-grid">
              <div className="md-rate-card">
                <div className="label">RPM</div>
                <div className="value">
                  800<span className="unit"> 请求/分钟</span>
                </div>
              </div>
              <div className="md-rate-card">
                <div className="label">TPM</div>
                <div className="value">
                  400,000<span className="unit"> Tokens/分钟</span>
                </div>
              </div>
              <div className="md-rate-card">
                <div className="label">QPS</div>
                <div className="value">
                  20<span className="unit"> 请求/秒</span>
                </div>
              </div>
              <div className="md-rate-card">
                <div className="label">并发数</div>
                <div className="value">
                  80<span className="unit"> 个请求</span>
                </div>
              </div>
              <div className="md-rate-card full">
                <div className="label">TPD</div>
                <div className="value">
                  50,000,000<span className="unit"> Tokens/日</span>
                </div>
              </div>
            </div>
          </section>

          <section className="md-section">
            <h3>API代码示例</h3>
            <div className="md-code-wrap">
              <pre className="md-code">
                <span className="c-kw">curl</span> https://api.example.com/v1/embeddings \{'\n'}
                {'  '}-H <span className="c-str">&quot;Authorization: Bearer $API_KEY&quot;</span> \{'\n'}
                {'  '}-d <span className="c-str">{'{ "model":"embedding-3", "input":"企业知识库检索" }'}</span>
              </pre>
              <button type="button" className={`md-copy-code${copied ? ' copied' : ''}`} onClick={handleCopy}>
                {copied ? '已复制' : '复制代码示例'}
              </button>
            </div>
          </section>
        </div>

        <div className="md-foot">
          <div className="btn-cta-fx-wrap">
            <button type="button" className="btn btn-cta-fx">
              <span>立即体验</span>
            </button>
          </div>
          <div className="btn-cta-fx-wrap-dark">
            <button type="button" className="btn btn-cta-fx-dark">
              <span>API 文档</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ModelSquarePage: React.FC = () => {
  useProtoReveal();

  const [keyword, setKeyword] = useState('');
  const [type, setType] = useState('全部');
  const [scene, setScene] = useState('全部');
  const [sort, setSort] = useState<(typeof SORT_OPTIONS)[number]>('按默认排序 ↓');
  const [detailOpen, setDetailOpen] = useState(false);

  const list = useMemo(() => {
    const kw = keyword.trim().toLowerCase();
    const typeActive = type !== '全部';
    const sceneActive = scene !== '全部';
    let result = MODELS.filter((m) => {
      const matchType = !typeActive || m.type === type;
      const matchScene = !sceneActive || m.scenes.includes(scene);
      // 类型与场景取「并集」：任一条件命中即展示，保证任意点击组合都有结果（原型演示）。
      // 搜索关键词仍为硬条件。
      const matchFilter =
        typeActive && sceneActive ? matchType || matchScene : matchType && matchScene;
      if (!matchFilter) return false;
      if (kw && !`${m.name} ${m.vendor}`.toLowerCase().includes(kw)) return false;
      return true;
    });
    if (sort === '按价格') {
      result = [...result].sort((a, b) => a.inputPrice + a.outputPrice - (b.inputPrice + b.outputPrice));
    } else if (sort === '按发布时间') {
      result = [...result].sort((a, b) => b.publishedTs - a.publishedTs);
    }
    return result;
  }, [keyword, type, scene, sort]);

  return (
    <section className="model-square-page" id="page-models">
      {/* Hero 搜索区 */}
      <section className="ms-hero">
        {FLOAT_LOGOS.map((src, i) => (
          <div key={`${src}-${i}`} className={`ms-float f${i + 1}`}>
            <img src={src} alt="" loading="lazy" />
          </div>
        ))}
        <div className="wrap reveal">
          <h1>海量AI模型，随心挑选</h1>
          <p className="ms-sub">搜索发现更多</p>
          <div className="ms-search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="搜索模型..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* 筛选区 */}
      <section className="ms-filters">
        <div className="ms-filter-row">
          <span className="ms-filter-label">模型类型</span>
          {TYPE_TAGS.map((t) => (
            <span
              key={t}
              className={`ms-tag${type === t ? ' active' : ''}`}
              onClick={() => setType(t)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setType(t);
              }}
            >
              {t}
            </span>
          ))}
        </div>
        <div className="ms-filter-row">
          <span className="ms-filter-label">应用场景</span>
          {SCENE_TAGS.map((t) => (
            <span
              key={t}
              className={`ms-tag${scene === t ? ' active' : ''}`}
              onClick={() => setScene(t)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setScene(t);
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* 模型列表 */}
      <section className="ms-list">
        <div className="ms-list-head">
          <h2>
            发现并使用最适合你的 AI 模型 <span className="ms-badge">{list.length}</span>
          </h2>
          <div className="ms-sort">
            {SORT_OPTIONS.map((s) => (
              <span
                key={s}
                className={sort === s ? 'active' : ''}
                onClick={() => setSort(s)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setSort(s);
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {list.length === 0 ? (
          <div className="ms-empty">没有符合条件的模型，试试更换筛选条件或关键词</div>
        ) : (
          <div className="ms-grid">
            {list.map((m) => (
              <div key={m.id} className="ms-card">
                <div className="ms-card-head">
                  <div className="ms-vendor">
                    <div className="ms-vendor-logo">{m.logo}</div>
                    <span className="ms-vendor-name">{m.vendor}</span>
                  </div>
                  <span className="ms-type-tag">{m.type}</span>
                </div>
                <h3 className="ms-model-name">{m.name}</h3>
                <div className="ms-meta">
                  <div className="ms-meta-row">
                    <span>发布时间：</span>
                    <span>{m.publishedAt}</span>
                  </div>
                  <div className="ms-meta-row ms-price">
                    <span className="ms-meta-label">输入：</span>¥{m.inputPrice}
                    <span className="ms-meta-label"> / M Tokens</span>
                  </div>
                  <div className="ms-meta-row ms-price">
                    <span className="ms-meta-label">输出：</span>¥{m.outputPrice}
                    <span className="ms-meta-label"> / M Tokens</span>
                  </div>
                </div>
                <button type="button" className="ms-detail-btn" onClick={() => setDetailOpen(true)}>
                  查看详情
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <ModelDetailModal open={detailOpen} onClose={() => setDetailOpen(false)} />
    </section>
  );
};
