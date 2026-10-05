/**
 * The only bridge into the Dosely repo: design tokens and seasonal themes imported straight from
 * `dosely/packages/shared` (pure data, no deps) so the video can never drift from the app.
 */
export { colors, radius, spacing, type, motion } from "../../../../../dosely/packages/shared/src/tokens";
export { THEMES, resolveThemeColors, type ThemeId, type Motif } from "../../../../../dosely/packages/shared/src/themes";

import { colors } from "../../../../../dosely/packages/shared/src/tokens";

/** Calm teal on a soft clinical surface: the video stays in the light scheme. */
export const L = colors.light;
/** Lock Screen material and Live Activity read on the dark scheme, like iOS draws them. */
export const D = colors.dark;

/** Phone screens are 282 px wide versus a 393 pt iPhone, so in-phone type is drawn at this scale. */
export const S = 0.8;
export const px = (pt: number) => Math.round(pt * S * 10) / 10;

/**
 * Medication colours from `MED_PALETTE` in `packages/shared/src/schemas.ts` (copied, because that
 * module pulls in zod; names and hex values match).
 */
export const MED = {
  teal: "#1FA39A",
  blue: "#3B82C4",
  violet: "#8B64C8",
  amber: "#D9A23A",
} as const;

/** The same morning the landing page shows: Mum, four doses, Lisinopril due at 8:30. */
export const DOSES = [
  { id: "met-am", name: "Metformin", strength: "500 mg", detail: "1 tablet with breakfast", time: "8:00 AM", color: MED.blue },
  { id: "lis", name: "Lisinopril", strength: "10 mg", detail: "1 tablet", time: "8:30 AM", color: MED.teal },
  { id: "met-pm", name: "Metformin", strength: "500 mg", detail: "1 tablet with dinner", time: "6:00 PM", color: MED.blue },
  { id: "ator", name: "Atorvastatin", strength: "20 mg", detail: "1 tablet at bedtime", time: "9:30 PM", color: MED.violet },
] as const;
