import type { CSSProperties } from "react";
import { FONT, condensed } from "../../shared/fonts";
import { LAYOUT, PHONE_CENTER } from "../../shared/Stage";
import { C } from "./tokens";

/** Charcoal stage with a faint lift behind the phone so the dark bezel separates from it. */
export const STAGE_BG = `radial-gradient(620px 600px at ${PHONE_CENTER.x}px ${PHONE_CENTER.y}px, #23272C 0%, #1C1F23 40%, ${C.surface} 85%)`;

/** Lock Screen / Home Screen wallpaper: charcoal with a low safety-orange glow (gradient only). */
export const WALLPAPER = `radial-gradient(120% 70% at 50% 108%, #7A3412 0%, #3B2417 38%, #1B1D21 72%, #121316 100%)`;

export const headline: CSSProperties = {
  ...condensed,
  fontWeight: 800,
  fontSize: 68,
  lineHeight: 0.98,
  letterSpacing: -0.5,
  color: C.text,
  maxWidth: LAYOUT.captionWidth,
};

export const sub: CSSProperties = {
  fontFamily: FONT.ui,
  fontSize: 23,
  lineHeight: 1.45,
  fontWeight: 450,
  color: C.textSecondary,
  marginTop: 20,
  maxWidth: 500,
};
