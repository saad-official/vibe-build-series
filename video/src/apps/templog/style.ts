import type { CSSProperties } from "react";
import { FONT } from "../../shared/fonts";
import { LAYOUT, PHONE_CENTER } from "../../shared/Stage";
import { L } from "./tokens";

/** Archivo at the landing page's `.condensed` width (font-stretch: 85%). */
export const condensed = { fontFamily: FONT.archivo, fontVariationSettings: '"wdth" 85' } as const;

/** The landing `.steel` sheen: a faint vertical brushing over the steel surface. */
const BRUSH = "repeating-linear-gradient(90deg, rgba(18,25,28,0.022) 0 1px, rgba(18,25,28,0) 1px 3px)";

/**
 * Brushed steel with the hero's two glows: heat behind the phone, a little cold below it
 * (`app/(marketing)/page.tsx` Hero).
 */
export const STAGE_BG = [
  BRUSH,
  `radial-gradient(560px 520px at ${PHONE_CENTER.x + 20}px ${PHONE_CENTER.y - 60}px, rgba(232,86,42,0.15) 0%, rgba(232,86,42,0.07) 40%, rgba(232,86,42,0.02) 72%, rgba(232,86,42,0) 100%)`,
  `radial-gradient(520px 420px at ${PHONE_CENTER.x - 180}px ${PHONE_CENTER.y + 220}px, rgba(47,127,214,0.10) 0%, rgba(47,127,214,0.04) 45%, rgba(47,127,214,0) 100%)`,
  `linear-gradient(180deg, #F6F8F9 0%, ${L.surface} 60%, #ECEFF1 100%)`,
].join(", ");

/** Plain brushed steel (Problem, the PDF cut). */
export const STEEL_BG = [BRUSH, `linear-gradient(180deg, #F6F8F9 0%, ${L.surface} 60%, #ECEFF1 100%)`].join(", ");

/** Lock Screen wallpaper: dark steel with a low heat glow (gradients only, no imagery). */
export const LOCK_WALLPAPER = "radial-gradient(120% 70% at 50% 108%, #7A2E14 0%, #3A2219 36%, #182024 70%, #0F1416 100%)";

/** Home Screen wallpaper: cool steel-blue wash. */
export const HOME_WALLPAPER = "linear-gradient(165deg, #E9EEF1 0%, #C9D5DC 52%, #A7B9C4 100%)";

/** A softer device shadow for the light stage. */
export const PHONE_SHADOW = "0 0 0 1px rgba(18,25,28,0.18), 0 40px 70px -30px rgba(11,17,20,0.45), 0 16px 30px -18px rgba(11,17,20,0.35)";

export const headline: CSSProperties = {
  ...condensed,
  fontWeight: 700,
  fontSize: 64,
  lineHeight: 1.0,
  letterSpacing: -1,
  color: L.text,
  maxWidth: LAYOUT.captionWidth,
};

export const sub: CSSProperties = {
  fontFamily: FONT.archivo,
  fontSize: 24,
  lineHeight: 1.42,
  fontWeight: 400,
  color: L.textSecondary,
  marginTop: 20,
  maxWidth: 500,
};
