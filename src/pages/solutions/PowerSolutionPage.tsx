import React, { useState } from 'react';
import { SolPage, SolHero, SolHead, SolCta, SolIcon, SolAskWindow } from './shared';

/**
 * 电力行业解决方案（/solutions/power）
 * 文案来自 docs/design/agent-products-wireframes.html #power-page
 * 控制台场景内容参考《众调科技产品及案例介绍》pp.35-39（设备监控分析 / 立体巡检策略 /
 * 巡视状态评价与故障研判 / 检修策略辅助生成 / 检修作业文档辅助编制）
 * 布局：Hero 提问窗 → 业务架构三明治 → 场景矩阵 → 运检控制台（任务切换） → 角色卡 → CTA
 */
export const PowerSolutionPage: React.FC = () => {
  const [task, setTask] = useState(0);
  const mapInputs = ['规程标准与设备手册', '台账、缺陷与历史工单', '运行数据与现场记录'];
  const mapOutputs = ['设备问答与排查建议', '巡检任务与路线建议', '运行分析与隐患研判'];

  const scenes = [
    {
      icon: 'chart' as const,
      order: '01 / 监测分析',
      title: '运行信息分析与核验',
      lead: '处理设备运行报告、监测数据与回传信息，输出统一格式的分析和校验结果。',
    },
    {
      icon: 'route' as const,
      order: '02 / 巡检组织',
      title: '巡检策略与资源编排',
      lead: '结合设备状态、现场约束与作业要求，辅助生成巡检点位、路径和执行计划。',
    },
    {
      icon: 'pulse' as const,
      order: '03 / 状态评估',
      title: '健康评估与故障研判',
      lead: '关联台账、缺陷、监测数据和专业知识，为风险等级和排查优先级提供依据。',
    },
    {
      icon: 'tool' as const,
      order: '04 / 检修闭环',
      title: '维护策略与作业文档',
      lead: '生成检修策略、准备清单和作业材料，回收执行结果以持续完善知识与规则。',
    },
  ];

  /** 待处理任务与对应的智能辅助结果（处理路径 + 能力标签，取自产品案例介绍） */
  const tasks = [
    {
      time: '08:40',
      title: '主变温度趋势异常',
      scene: '设备监控分析',
      steps: ['运行报告解析', '异常信息识别', '监控指标分析'],
      chips: ['多源运行数据接入', '阈值与趋势识别', '同比环比与外推预测'],
    },
    {
      time: '09:10',
      title: '站内巡视 · 状态评价',
      scene: '巡视状态评价与故障研判',
      steps: ['状态量采集', '异常识别', '故障研判'],
      chips: ['例行巡视与试验数据', '告警规则联动', '缺陷登记联动'],
    },
    {
      time: '10:30',
      title: '检修工单资料核查',
      scene: '检修策略与作业文档',
      steps: ['状态评价', '检修策略生成', '作业文档编制'],
      chips: ['A/B/C 类策略推荐', '周期与工期建议', '风险交底材料生成'],
    },
    {
      time: '13:00',
      title: '无人机巡检路径复核',
      scene: '设备立体巡检策略',
      steps: ['设备状态评价', '巡检策略生成', '巡检资源编排'],
      chips: ['例行 · 精准 · 特殊 · 动态', '人员+无人机+车辆协同', '巡检路线自动编排'],
    },
  ];

  const roles = [
    { icon: 'person' as const, title: '运检人员', lead: '查规程、问设备、领任务；将复杂资料转为可执行的现场检查步骤。' },
    { icon: 'users' as const, title: '班组负责人', lead: '看风险、排任务、追进度；把分散作业信息汇成可管理的班组视图。' },
    { icon: 'chart' as const, title: '生产管理者', lead: '看趋势、查隐患、做复盘；围绕设备健康和作业质量进行持续改善。' },
  ];

  return (
    <SolPage industry="power">
      <SolHero
        eyebrow="电力行业解决方案 / 设备运检与现场作业"
        title={<>让知识、设备与现场协同<br /><span className="grad">服务每次安全作业</span></>}
        lead="整合规程、台账、运行数据和现场任务，为运检、调度与管理提供可追溯的决策辅助。"
        primaryLabel="预约方案沟通"
        secondary={{ label: '查看运检工作台 ↓', href: '#sol-power-console' }}
        visual={
          <SolAskWindow
            title="设备运检智能工作台"
            input="问题：变电设备温升异常，现场应优先核查什么？"
            output="规程依据 + 排查路径"
            chips={['设备手册', '历史缺陷', '工单规则']}
          />
        }
      />

      {/* 01 业务架构：输入 → 中枢 → 输出 */}
      <section className="sol-sec">
        <div className="wrap">
          <div className="reveal">
            <SolHead
              tag="01 / 业务架构"
              title="从监测到检修的业务闭环"
              lead="以数据与规程、智能研判、现场作业和结果回收，串起电力业务主线。"
            />
          </div>
          <div className="sol-map reveal">
            <div className="sol-rail">
              <h3>知识与数据输入</h3>
              {mapInputs.map((t) => <span key={t}>{t}</span>)}
            </div>
            <i className="sol-map__arrow" aria-hidden="true" />
            <div className="sol-core">
              <i><SolIcon name="bolt" /></i>
              <strong>电力行业智能中枢</strong>
              <small>知识理解 · 风险识别 · 任务编排 · 结果追溯</small>
            </div>
            <i className="sol-map__arrow" aria-hidden="true" />
            <div className="sol-rail sol-rail--out">
              <h3>业务行动输出</h3>
              {mapOutputs.map((t) => <span key={t}>{t}</span>)}
            </div>
          </div>
        </div>
      </section>

      {/* 02 典型场景：水印编号矩阵 */}
      <section className="sol-sec sol-sec--soft">
        <div className="wrap">
          <div className="reveal">
            <SolHead
              tag="02 / 典型场景"
              title="覆盖监测、巡检、评估与检修"
              lead="围绕真实运检流程，完成信息核验、策略生成、现场执行与结果回收。"
            />
          </div>
          <div className="sol-scenes">
            {scenes.map((s, i) => (
              <article className="sol-scene reveal" key={s.title}>
                <em aria-hidden="true">{`0${i + 1}`}</em>
                <i className="sol-scene__ic"><SolIcon name={s.icon} /></i>
                <span className="sol-scene__order">{s.order}</span>
                <h3>{s.title}</h3>
                <p>{s.lead}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 03 工作台：任务流 + 智能结果 */}
      <section className="sol-sec" id="sol-power-console">
        <div className="wrap">
          <div className="reveal">
            <SolHead
              tag="03 / 工作台"
              title="一次真实的运检工作流"
              lead="以任务进入、知识辅助、结果沉淀三步呈现真实作业过程，点击左侧任务切换查看。"
            />
          </div>
          <div className="sol-console reveal">
            <div className="sol-feed">
              <div className="sol-feed__bar">
                <span className="agp-win__dots" aria-hidden="true"><i /><i /><i /></span>
                <h3>待处理任务</h3>
                <span className="sol-feed__note">点击切换</span>
                <b>{tasks.length} 项</b>
              </div>
              <div className="sol-feed__body" aria-label="任务流切换">
                {tasks.map((t, i) => (
                  <button
                    type="button"
                    key={t.time}
                    className={`sol-feed__row${i === task ? ' is-on' : ''}`}
                    aria-pressed={i === task}
                    onClick={() => setTask(i)}
                  >
                    <span>{t.time}</span>
                    <b>{t.title}</b>
                  </button>
                ))}
              </div>
            </div>
            <div className="sol-answer" aria-live="polite">
              <div className="sol-answer__in" key={task}>
                <span className="sol-answer__label">智能辅助结果 · {tasks[task].scene}</span>
                <h3>{tasks[task].title}</h3>
                <div className="sol-answer__block">
                  <strong>处理路径</strong>
                  <div className="sol-answer__steps">
                    {tasks[task].steps.map((s, i) => (
                      <React.Fragment key={s}>
                        <span className="sol-answer__step">{s}</span>
                        {i < tasks[task].steps.length - 1 && <i className="sol-answer__arrow" aria-hidden="true">→</i>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                <div className="sol-answer__chips">
                  {tasks[task].chips.map((c) => <span key={c}>{c}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 角色场景 */}
      <section className="sol-sec sol-sec--soft">
        <div className="wrap">
          <div className="reveal">
            <SolHead
              tag="04 / 角色场景"
              title="为不同角色提供不同视角"
              lead="同一套行业能力适配不同现场的输入与输出。"
            />
          </div>
          <div className="sol-roles">
            {roles.map((r) => (
              <article className="sol-role reveal" key={r.title}>
                <span className="sol-role__ava"><SolIcon name={r.icon} /></span>
                <h3>{r.title}</h3>
                <p>{r.lead}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SolCta
        title="从一个高频、可验证的运检场景开始"
        lead="从设备知识、运行分析或路线规划切入，连接更多设备、作业和管理流程。"
        primaryLabel="获取电力行业方案"
        secondaryLabel="返回行业总览"
      />
    </SolPage>
  );
};
