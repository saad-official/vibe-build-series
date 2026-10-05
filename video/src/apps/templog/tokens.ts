/**
 * The only bridge into the Templog repo: design tokens and the Food Code numbers imported straight
 * from `templog/packages/shared` (pure modules; their schema imports are type-only) so the video can
 * never show a limit or a pass / fail the app would judge differently.
 */
export { colors, radius, spacing, type, motion } from "../../../../../templog/packages/shared/src/tokens";
export { COOLING_LIMITS, formatMinutes } from "../../../../../templog/packages/shared/src/cooling";
export { FOOD_CODE_DEFAULTS, COOKING_MINIMUMS_F, evaluateReading, limitsLabel } from "../../../../../templog/packages/shared/src/limits";
export { formatTemp } from "../../../../../templog/packages/shared/src/units";

import { colors } from "../../../../../templog/packages/shared/src/tokens";
import { COOLING_LIMITS, formatMinutes } from "../../../../../templog/packages/shared/src/cooling";
import { FOOD_CODE_DEFAULTS, evaluateReading, limitsLabel } from "../../../../../templog/packages/shared/src/limits";
import { formatTemp } from "../../../../../templog/packages/shared/src/units";

/** Brushed steel, light scheme: the app's default look and the landing hero's. */
export const L = colors.light;
/** Lock Screen material and the Live Activity read on the dark scheme, like iOS draws them. */
export const D = colors.dark;

/** Phone screens are 282 px wide versus a 393 pt iPhone, so in-phone type is drawn at this scale. */
export const S = 0.8;
export const px = (pt: number) => Math.round(pt * S * 10) / 10;

/** The app's `track` role (unfilled ring / bar) and keypad caps (`theme/palette.ts`). */
export const TRACK = L.surfaceSunken;

export const temp = (valueF: number) => formatTemp(valueF, "F");

const COLD = FOOD_CODE_DEFAULTS["cold-holding"];
const HOT = FOOD_CODE_DEFAULTS["hot-holding"];

export const COLD_LABEL = limitsLabel({ limits: COLD }, "F"); // ≤ 41 °F
export const HOT_LABEL = limitsLabel({ limits: HOT }, "F"); // ≥ 135 °F
export const COLD_MAX = COLD.max!;
export const HOT_MIN = HOT.min!;

export type Kind = "cold-holding" | "hot-holding";
export type Row = { name: string; kind: Kind; valueF: number; at: string; initials: string };

export function resultOf(kind: Kind, valueF: number): "pass" | "fail" {
  return evaluateReading({ limits: FOOD_CODE_DEFAULTS[kind] }, valueF).result;
}

/**
 * Rosa's Tacos at 2:01 PM, the same kitchen the landing mock shows: the walk-in's 2:00 check is
 * due (its last reading 37.8 °F passed), the hot well failed at 128 °F, a reach-in is next at 2:30.
 */
export const BOARD: (Row & { status: "due" | "upcoming" | "logged" })[] = [
  { name: "Walk-in cooler", kind: "cold-holding", valueF: 37.8, at: "12:04 PM", initials: "SR", status: "due" },
  { name: "Hot well", kind: "hot-holding", valueF: 128, at: "11:58 AM", initials: "MA", status: "upcoming" },
  { name: "Reach-in", kind: "cold-holding", valueF: 40.1, at: "12:06 PM", initials: "SR", status: "upcoming" },
  { name: "Soup kettle", kind: "hot-holding", valueF: 152, at: "12:01 PM", initials: "MA", status: "logged" },
];

/** The reading typed in the Core scene: exactly the cold-holding limit, so it passes. */
export const LOGGED_F = 41;

/**
 * Chili came off heat at 12:50 PM; at 2:02 PM stage 1 (135 °F → 70 °F within 2 h) has 48 min left
 * and 60% of its time used. Stage 2 (→ 41 °F) closes 6 h after the start.
 */
export const CHILI = {
  name: "Chili, 4 gal",
  offHeat: "12:50 PM",
  initials: "RD",
  stage1Due: "2:50 PM",
  minutesLeft: 48,
  stage1Minutes: COOLING_LIMITS.stage1Hours * 60,
  totalMinutes: COOLING_LIMITS.totalHours * 60,
} as const;
export const CHILI_USED = 1 - CHILI.minutesLeft / CHILI.stage1Minutes; // 0.6
export const STAGE1_MAX = temp(COOLING_LIMITS.stage1MaxF); // 70 °F
export const STAGE2_MAX = temp(COOLING_LIMITS.stage2MaxF); // 41 °F
export const COOL_START = temp(COOLING_LIMITS.startF); // 135 °F
/** `Stage 1: ≤ 70 °F in 48 m` (the shared `coolingLabel` format). */
export const stage1Label = (minutesLeft: number) => `Stage 1: ≤ ${STAGE1_MAX} in ${formatMinutes(minutesLeft)}`;
