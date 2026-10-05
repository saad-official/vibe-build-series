/**
 * The only bridge into the Turnproof repo: design tokens imported straight from
 * `turnproof/packages/shared` (pure data, no deps) so the video can never drift from the app.
 */
export { colors, radius, spacing, type, motion } from "../../../../../turnproof/packages/shared/src/tokens";

import { colors } from "../../../../../turnproof/packages/shared/src/tokens";

/** "Fresh linen": the app and the video stay in the light scheme. */
export const L = colors.light;
/** The camera, the Lock Screen material and the Live Activity read on the dark scheme. */
export const D = colors.dark;

/**
 * Roles the app derives in `apps/mobile/src/theme/palette.ts` (stamp chips on photos, the
 * always-dark camera, progress tracks), resolved for the light scheme.
 */
export const X = {
  /** `withAlpha(dark.surfaceSunken, 0.7)`. */
  photoChip: "rgba(12, 14, 16, 0.7)",
  onPhotoChip: D.text,
  track: L.surfaceSunken,
  cameraBackground: D.surfaceSunken,
  /** `withAlpha(dark.surfaceElevated, 0.72)`. */
  cameraControl: "rgba(28, 32, 37, 0.72)",
  shutter: L.surfaceElevated,
} as const;

/** Phone screens are 282 px wide versus a 393 pt iPhone, so in-phone type is drawn at this scale. */
export const S = 0.8;
export const px = (pt: number) => Math.round(pt * S * 10) / 10;

/**
 * The turnover the landing page shows: Maple St, six rooms, the bathroom is room 3. Checklists are
 * the first four required items of each template in `packages/shared/src/templates.ts` (a host can
 * trim a property's checklist to what matters).
 */
export const ROOMS = [
  { name: "Kitchen", icon: "kitchen", items: ["Counters wiped", "Stovetop", "Sink", "Floor mopped"] },
  { name: "Bedroom", icon: "bed", items: ["Strip bed", "Fresh linen and made bed", "Check under bed", "Vacuum or mop floor"] },
  { name: "Bathroom", icon: "bathtub", items: ["Toilet cleaned inside and out", "Shower / tub scrubbed", "Sink and counter", "Towels restocked"] },
  { name: "Living room", icon: "sofa", items: ["Dust surfaces", "Cushions and throws arranged", "Remotes in place", "Vacuum floor"] },
  { name: "Bedroom 2", icon: "bed", items: ["Strip bed", "Fresh linen and made bed", "Check under bed", "Vacuum or mop floor"] },
  { name: "Patio", icon: "leaf", items: ["Furniture wiped and arranged", "Outdoor bins emptied"] },
] as const;

/** "41:52" / "1:04:12", like `formatElapsed` in `apps/mobile/src/constants/format.ts`. */
export function formatElapsed(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(sec)}` : `${m}:${pad(sec)}`;
}
