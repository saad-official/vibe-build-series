/**
 * The only bridge into the Punchcard repo: its design tokens and client palette, imported straight
 * from `punchcard/packages/shared` (pure data, no deps) so the video can never drift from the app.
 */
export { colors, radius, spacing, type, motion } from "../../../../../punchcard/packages/shared/src/tokens";
export { clientColorHex } from "../../../../../punchcard/packages/shared/src/palette";

import { colors } from "../../../../../punchcard/packages/shared/src/tokens";

/** The app runs in dark mode for the whole video: charcoal + safety orange. */
export const C = colors.dark;

/**
 * Phone screens are 282 px wide versus a 393 pt iPhone, so type and spacing tokens are drawn at
 * this scale inside the phone (captions outside the phone use their own, larger sizes).
 */
export const S = 0.8;
export const px = (pt: number) => Math.round(pt * S * 10) / 10;

/** Story data shared by every scene: the same job the landing page shows. */
export const STORY = {
  client: "Smith kitchen",
  job: "Kitchen refit",
  startedAt: "7:54",
  rateCents: 6000,
  /** 1:47:12, which lands the clock on 9:41 like the landing hero. */
  finalSeconds: 6432,
  earlier: [
    { client: "Patel rewire", job: "Panel swap", time: "2h 10m", earned: "$156.00", color: "green" as const },
    { client: "Rivera bathroom", job: "Leak call-out", time: "0h 45m", earned: "$54.00", color: "amber" as const },
  ],
  /** Earlier jobs today, in seconds (2h 10m + 0h 45m). */
  earlierSeconds: 2 * 3600 + 10 * 60 + 45 * 60,
} as const;

export function hms(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

export function dollars(cents: number): string {
  return `$${(Math.floor(cents) / 100).toFixed(2)}`;
}

export function earnedCents(seconds: number): number {
  return (seconds * STORY.rateCents) / 3600;
}

/** Wall clock for "7:54 + elapsed", for the status bar. */
export function clockAt(seconds: number): string {
  const startMinutes = 7 * 60 + 54;
  const total = startMinutes + Math.floor(seconds / 60);
  const h = Math.floor(total / 60);
  const m = total % 60;
  return `${h}:${String(m).padStart(2, "0")}`;
}
