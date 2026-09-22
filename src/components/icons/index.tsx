import React from 'react';
import type { ComponentProps } from 'react';
import {
  IconApartment,
  IconApps,
  IconCloud,
  IconGlobe,
  IconHistogram,
  IconLayers,
  IconPieChart2Stroked,
  IconShield,
} from '@douyinfe/semi-icons';
import type { AdvantageIconKey, MatrixIconKey } from '@/mock/content';

type IconComponent = typeof IconApps;
type IconSize = ComponentProps<IconComponent>['size'];

/** 装饰/功能图标统一组件化（docs/02 §6），按内容层的 icon key 取用 */
const MATRIX_ICONS: Record<MatrixIconKey, IconComponent> = {
  apps: IconApps,
  plaza: IconLayers,
  cloud: IconCloud,
  gateway: IconApartment,
};

const ADVANTAGE_ICONS: Record<AdvantageIconKey, IconComponent> = {
  shield: IconShield,
  plaza: IconLayers,
  apps: IconApps,
  billing: IconHistogram,
  share: IconPieChart2Stroked,
  globe: IconGlobe,
};

export function MatrixGlyph({ icon, size }: { icon: MatrixIconKey; size?: IconSize }) {
  const Cmp = MATRIX_ICONS[icon];
  return <Cmp size={size} />;
}

export function AdvantageGlyph({ icon, size }: { icon: AdvantageIconKey; size?: IconSize }) {
  const Cmp = ADVANTAGE_ICONS[icon];
  return <Cmp size={size} />;
}
