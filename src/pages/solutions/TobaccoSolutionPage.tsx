import React from 'react';
import { SolPage, SolHero, SolHead, SolCta, SolIcon, SolScanWindow, SolBoard, type SolScenario } from './shared';

/**
 * 烟草行业解决方案（/solutions/tobacco）
 * 文案来自 docs/design/agent-products-wireframes.html #tobacco-page
 * 布局：Hero 货架识别窗 → 垂直业务链 → 场景看板 → 运营闭环 → CTA
 */
export const TobaccoSolutionPage: React.FC = () => {
  const journey = [
    {
      icon: 'calendar' as const,
      order: '01 / 收购调度',
      title: '烟叶收购与交烟调度',
      lead: '识别烟叶质量，预测交烟节奏并优化烟站调度。',
    },
    {
      icon: 'box' as const,
      order: '02 / 仓储管理',
      title: '仓储保管与库存管理',
      lead: '连接图像识别、库存台账与风险规则，提升盘点效率与仓储周转。',
    },
    {
      icon: 'truck' as const,
      order: '03 / 物流调拨',
      title: '运输调拨与物流优化',
      lead: '结合运输任务、车辆资源和线路条件，优化车辆匹配、路线与计划。',
    },
    {
      icon: 'store' as const,
      order: '04 / 终端经营',
      title: '终端陈列与市场感知',
      lead: '识别陈列合规性、铺货饱满度与断货趋势，辅助市场走访与终端经营。',
    },
    {
      icon: 'chart' as const,
      order: '05 / 原料分析',
      title: '原料分析与数字配方',
      lead: '以原料数据表征支撑配方优化与质量保障，提升产品竞争力。',
    },
  ];

  const scenarios: SolScenario[] = [
    {
      no: 'T1',
      title: '零售经理：看一张陈列与缺货趋势图',
      lead: '从终端照片中识别商品、价签和空位，按门店、品类和时段形成补货关注清单。',
      out: {
        title: '终端经营 · 待处理清单',
        input: <>识别到 3 个空货位<br />2 个价签待核验</>,
        chips: ['补货优先级', '现场复核'],
        next: '分派门店补货与陈列核验任务',
      },
    },
    {
      no: 'T2',
      title: '仓储人员：完成一次库存盘点与待复核处理',
      lead: '将视觉计数结果与库存记录比对，输出异常项、复核依据和盘点报告。',
      out: {
        title: '仓储盘点 · 复核报告',
        input: <>视觉计数与台账比对<br />差异 5 项</>,
        chips: ['异常项', '复核依据'],
        next: '生成盘点报告并标记待复核项',
      },
    },
    {
      no: 'T3',
      title: '烟站调度：生成交烟与运输计划',
      lead: '综合预约窗口、站点状态与运力条件，形成调度优先级、路线与协同事项。',
      out: {
        title: '配送调度 · 执行建议',
        input: <>今日 12 个预约窗口<br />待排线</>,
        chips: ['优先级排序', '路线建议'],
        next: '形成配送路线与协同事项',
      },
    },
  ];

  const loop = [
    { icon: 'scan' as const, title: '感知', lead: '接入终端图像、库存台账、配送任务与仓储记录。' },
    { icon: 'bulb' as const, title: '研判', lead: '调用识别模型、行业规则与历史经验，发现异常和机会。' },
    { icon: 'flow' as const, title: '协同', lead: '生成补货、盘点、调拨与运输任务，明确责任人与时点。' },
    { icon: 'database' as const, title: '沉淀', lead: '回收执行结果，持续优化识别规则、调度策略和经营知识。' },
  ];

  return (
    <SolPage industry="tobacco">
      <SolHero
        eyebrow="烟草行业解决方案 / 供应链与终端经营"
        title={<>让烟草业务每一环<br /><span className="grad">都有智能协同</span></>}
        lead="围绕收购、仓储、调拨、终端和原料协同，连接图像、台账、规则与业务经验，形成可执行的工作流。"
        primaryLabel="预约方案沟通"
        secondary={{ label: '查看业务地图 ↓', href: '#sol-tobacco-map' }}
        visual={
          <SolScanWindow
            title="烟草经营协同台"
            task="任务：识别终端缺货趋势，并给出本周补货优先级"
            output="陈列识别 + 补货建议"
            slots={[
              { state: 'full' }, { state: 'full' }, { state: 'empty' },
              { state: 'full' }, { state: 'full' }, { state: 'full' },
              { state: 'full' }, { state: 'empty' }, { state: 'full' },
              { state: 'full' }, { state: 'full' }, { state: 'full' },
            ]}
            chips={['图像识别', '价格标签', '库存趋势']}
          />
        }
      />

      {/* 01 业务地图：垂直业务链 */}
      <section className="sol-sec" id="sol-tobacco-map">
        <div className="wrap">
          <div className="reveal">
            <SolHead
              tag="01 / 业务地图"
              title="贯通原料到终端的经营链路"
              lead="按业务链路组织能力，每一环均包含数据依据、智能判断和可流转结果。"
            />
          </div>
          <div className="sol-vj reveal">
            {journey.map((j) => (
              <div className="sol-vj__item" key={j.title}>
                <div className="sol-vj__card">
                  <i className="sol-vj__ic"><SolIcon name={j.icon} /></i>
                  <div>
                    <div className="sol-vj__order">{j.order}</div>
                    <h3>{j.title}</h3>
                    <p>{j.lead}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 02 场景拆解：任务列表 + 输出样例 */}
      <section className="sol-sec sol-sec--soft">
        <div className="wrap">
          <div className="reveal">
            <SolHead
              tag="02 / 场景拆解"
              title="将识别、研判与执行纳入同一界面"
              lead="呈现高频任务及其可直接使用的业务结果。"
            />
            <p className="sol-hint">点击左侧任务卡，右侧同步展示对应的输出样例</p>
          </div>
          <SolBoard items={scenarios} />
        </div>
      </section>

      {/* 03 持续运营：闭环环带 */}
      <section className="sol-sec">
        <div className="wrap">
          <div className="reveal">
            <SolHead
              tag="03 / 持续运营"
              title="让每次处理持续优化经营规则"
              lead="通过数据采集、现场执行与结果回收，持续优化知识与协同规则。"
            />
          </div>
          <div className="reveal">
            <div className="sol-loop">
              {loop.map((l) => (
                <div className="sol-loop__step" key={l.title}>
                  <i className="sol-loop__ic"><SolIcon name={l.icon} /></i>
                  <h3>{l.title}</h3>
                  <p>{l.lead}</p>
                </div>
              ))}
            </div>
            <div className="sol-loop__back" aria-hidden="true">
              <i />
              <em>结果回流 · 持续循环</em>
              <i />
            </div>
          </div>
        </div>
      </section>

      <SolCta
        title="从一个可见成效的烟草场景开始"
        lead="从陈列识别、库存盘点或配送调度切入，逐步扩展到仓储风控和原料协同。"
        primaryLabel="获取烟草行业方案"
        secondaryLabel="返回行业总览"
      />
    </SolPage>
  );
};
