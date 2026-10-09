/* ============================================================
   定价模块状态与业务逻辑（移植自 V0.2.1 原型，门户原型无登录体系，
   购买状态按访客保存在 localStorage；生产环境应替换为服务端接口）
   ============================================================ */

import { useCallback, useState } from 'react';
import {
  PLANS,
  RESOURCE_BUNDLES,
  type BillingCycle,
  type BundleItem,
  type PlanItem,
} from './data';

const STORE_KEY = 'unicdataPricingVisitorV1';

export interface StoredBundle {
  id: string;
  name: string;
  quantity: number;
  total: number;
  remaining: number;
  status: string;
  expiresAt: string;
}

export interface RefundRecord {
  status: 'processing' | 'success' | 'failed';
  amount: number;
  fromPlanName: string;
  toPlanName: string;
  remainingDays: number;
  requestedAt: string;
  originalExpiry: string;
}

export interface PlanSnapshot {
  planId: string;
  startAt: string;
  expireAt: string;
  cycle: BillingCycle;
  autoRenew: boolean;
  bundles: StoredBundle[];
  refund: RefundRecord | null;
}

const EMPTY_SNAPSHOT: PlanSnapshot = {
  planId: '',
  startAt: '',
  expireAt: '',
  cycle: 'monthly',
  autoRenew: false,
  bundles: [],
  refund: null,
};

const safeStorage = {
  get(key: string) {
    try {
      return window.localStorage.getItem(key) || '';
    } catch {
      return '';
    }
  },
  set(key: string, value: string) {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      /* 忽略隐私模式等存储异常 */
    }
  },
};

function parseJson<T>(raw: string, fallback: T): T {
  try {
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function loadSnapshot(): PlanSnapshot {
  const snap = parseJson<Partial<PlanSnapshot>>(safeStorage.get(STORE_KEY), {});
  return { ...EMPTY_SNAPSHOT, ...snap, bundles: Array.isArray(snap.bundles) ? snap.bundles : [] };
}

function saveSnapshot(snap: PlanSnapshot) {
  safeStorage.set(STORE_KEY, JSON.stringify(snap));
}

/* ====================== 日期工具（与原型一致） ====================== */

export function addMonthsClamped(date: Date, months: number): Date {
  const d = new Date(date);
  const day = d.getDate();
  d.setDate(1);
  d.setMonth(d.getMonth() + months);
  const last = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  d.setDate(Math.min(day, last));
  return d;
}

export function addYearsClamped(date: Date, years: number): Date {
  const d = new Date(date);
  const m = d.getMonth();
  const day = d.getDate();
  d.setDate(1);
  d.setFullYear(d.getFullYear() + years);
  d.setMonth(m);
  const last = new Date(d.getFullYear(), m + 1, 0).getDate();
  d.setDate(Math.min(day, last));
  return d;
}

export function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function formatPortalDateTime(date: Date): string {
  const h = String(date.getHours()).padStart(2, '0');
  const m = String(date.getMinutes()).padStart(2, '0');
  const s = String(date.getSeconds()).padStart(2, '0');
  return `${formatDate(date)}T${h}:${m}:${s}`;
}

export function parsePortalDate(value: string): Date | null {
  if (!value) return null;
  const normalized = value.includes('T') ? value : `${value}T00:00:00`;
  const d = new Date(normalized);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function daysUntil(date: Date): number {
  return Math.max(0, Math.ceil((date.getTime() - Date.now()) / 86400000));
}

export function calculatePlanExpiry(cycle: BillingCycle, base = new Date()): string {
  const end = cycle === 'yearly' ? addYearsClamped(base, 1) : addMonthsClamped(base, cycle === 'quarterly' ? 3 : 1);
  return formatPortalDateTime(end);
}

function subtractCycle(date: Date, cycle: BillingCycle): Date {
  return cycle === 'yearly' ? addYearsClamped(date, -1) : addMonthsClamped(date, cycle === 'quarterly' ? -3 : -1);
}

/* ====================== 套餐 / 资源包规则 ====================== */

export const planById = (id: string): PlanItem | undefined => PLANS.find((p) => p.id === id);
export const bundleById = (id: string): BundleItem | undefined => RESOURCE_BUNDLES.find((b) => b.id === id);

export const planPriceForCycle = (plan: PlanItem, cycle: BillingCycle): number => plan[cycle] || plan.monthly;

export const planOriginalForCycle = (plan: PlanItem, cycle: BillingCycle): number =>
  plan[`original${cycle.charAt(0).toUpperCase()}${cycle.slice(1)}` as 'originalMonthly' | 'originalQuarterly' | 'originalYearly'] || plan.originalMonthly;

export function activePlanOf(snap: PlanSnapshot): PlanItem | null {
  const plan = planById(snap.planId);
  const expiry = parsePortalDate(snap.expireAt);
  return plan && (!expiry || expiry >= new Date()) ? plan : null;
}

export function hasEligiblePlanForBundle(snap: PlanSnapshot, bundle: BundleItem): boolean {
  const plan = activePlanOf(snap);
  return !!(plan && bundle && plan.groupId === bundle.groupId);
}

export interface UpgradeRefund {
  fromPlan: PlanItem;
  toPlan: PlanItem;
  cycle: BillingCycle;
  start: Date;
  expiry: Date;
  totalDays: number;
  remainingDays: number;
  paidPrice: number;
  refundAmount: number;
}

export function calculateUpgradeRefund(snap: PlanSnapshot, targetPlanId: string): UpgradeRefund | null {
  const current = activePlanOf(snap);
  const target = planById(targetPlanId);
  if (!current || !target || target.groupId !== current.groupId || target.level <= current.level) return null;
  const cycle = snap.cycle;
  const expiry = parsePortalDate(snap.expireAt) || new Date();
  let start = parsePortalDate(snap.startAt);
  if (!start) start = subtractCycle(expiry, cycle);
  const now = new Date();
  const totalDays = Math.max(1, Math.ceil((expiry.getTime() - start.getTime()) / 86400000));
  const remainingDays = Math.max(0, Math.ceil((expiry.getTime() - now.getTime()) / 86400000));
  const paidPrice = planPriceForCycle(current, cycle);
  const refundAmount = Math.max(0, Math.round((paidPrice * remainingDays / totalDays) * 100) / 100);
  return { fromPlan: current, toPlan: target, cycle, start, expiry, totalDays, remainingDays, paidPrice, refundAmount };
}

export interface BundlePauseNotice {
  planExpiry: Date | null;
  bundleExpiry: Date;
  remainingDays: number;
  needsAcknowledgement: boolean;
}

export function getBundlePauseNotice(snap: PlanSnapshot, bundle: BundleItem, base = new Date()): BundlePauseNotice {
  const plan = activePlanOf(snap);
  const planExpiry = parsePortalDate(snap.expireAt);
  const bundleExpiry = addDays(base, bundle.validDays);
  const remainingDays = planExpiry ? daysUntil(planExpiry) : 0;
  return { planExpiry, bundleExpiry, remainingDays, needsAcknowledgement: !!(plan && planExpiry && bundleExpiry > planExpiry) };
}

/* ====================== 购买动作 ====================== */

export function applyPlanPurchase(
  snap: PlanSnapshot,
  planId: string,
  cycle: BillingCycle,
  autoRenew: boolean,
): { next: PlanSnapshot; upgrade: UpgradeRefund | null } {
  const upgrade = calculateUpgradeRefund(snap, planId);
  const wasRenewal = activePlanOf(snap)?.id === planId;
  const now = new Date();
  const renewalBase = wasRenewal ? parsePortalDate(snap.expireAt) || now : now;
  const next: PlanSnapshot = {
    ...snap,
    planId,
    startAt: wasRenewal ? snap.startAt : formatPortalDateTime(now),
    expireAt: calculatePlanExpiry(cycle, renewalBase),
    cycle,
    autoRenew,
    refund: upgrade
      ? {
          status: 'processing',
          amount: upgrade.refundAmount,
          fromPlanName: upgrade.fromPlan.name,
          toPlanName: upgrade.toPlan.name,
          remainingDays: upgrade.remainingDays,
          requestedAt: now.toISOString(),
          originalExpiry: formatDate(upgrade.expiry),
        }
      : snap.refund,
  };
  saveSnapshot(next);
  return { next, upgrade };
}

export function applyBundlePurchase(snap: PlanSnapshot, bundle: BundleItem, quantity: number): { next: PlanSnapshot; notice: BundlePauseNotice } {
  const notice = getBundlePauseNotice(snap, bundle);
  const item: StoredBundle = {
    id: `bundle-${Date.now()}`,
    name: bundle.name,
    quantity,
    total: bundle.unitCredits * quantity,
    remaining: bundle.unitCredits * quantity,
    status: '可使用',
    expiresAt: formatPortalDateTime(notice.bundleExpiry),
  };
  const next: PlanSnapshot = { ...snap, bundles: [...snap.bundles, item] };
  saveSnapshot(next);
  return { next, notice };
}

/* ====================== React Hook ====================== */

export function usePlanStore() {
  const [snap, setSnap] = useState<PlanSnapshot>(() => loadSnapshot());

  const purchasePlan = useCallback((planId: string, cycle: BillingCycle, autoRenew: boolean) => {
    const { next, upgrade } = applyPlanPurchase(loadSnapshot(), planId, cycle, autoRenew);
    setSnap(next);
    return upgrade;
  }, []);

  const purchaseBundle = useCallback((bundle: BundleItem, quantity: number) => {
    const { next, notice } = applyBundlePurchase(loadSnapshot(), bundle, quantity);
    setSnap(next);
    return notice;
  }, []);

  const toggleAutoRenew = useCallback(() => {
    const next = { ...loadSnapshot(), autoRenew: !loadSnapshot().autoRenew };
    saveSnapshot(next);
    setSnap(next);
  }, []);

  return { snap, purchasePlan, purchaseBundle, toggleAutoRenew };
}
