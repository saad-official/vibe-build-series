import type { CSSProperties } from "react";
import { FONT } from "../../shared/fonts";
import { LAYOUT, PHONE_CENTER } from "../../shared/Stage";
import { L } from "./tokens";

/** Linen surface with a faint deep-green glow behind the phone (the landing hero's linen panel). */
export const STAGE_BG = `radial-gradient(640px 600px at ${PHONE_CENTER.x}px ${PHONE_CENTER.y}px, rgba(31,107,74,0.13) 0%, rgba(31,107,74,0.07) 35%, rgba(31,107,74,0.02) 70%, rgba(31,107,74,0) 100%), ${L.surface}`;

/** Lock Screen wallpaper: deep green to ink (gradient only, no imagery). */
export const LOCK_WALLPAPER = "radial-gradient(130% 80% at 50% 0%, #2E6A50 0%, #173A2C 45%, #0E1714 100%)";

/** Home Screen wallpaper: a warm linen-to-sage wash. */
export const HOME_WALLPAPER = "linear-gradient(165deg, #F3EFE6 0%, #D9E6DC 55%, #B5CFBE 100%)";

/** A warm device shadow for the light stage (`SHADOW_COLOR` #2B2620). */
export const PHONE_SHADOW = "0 0 0 1px rgba(43,38,32,0.18), 0 40px 70px -30px rgba(43,38,32,0.45), 0 16px 30px -18px rgba(43,38,32,0.35)";

/** The landing hero's headline: Source Sans 3 bold, tight tracking. */
export const headline: CSSProperties = {
  fontFamily: FONT.sourceSans,
  fontWeight: 700,
  fontSize: 60,
  lineHeight: 1.04,
  letterSpacing: -1.2,
  color: L.text,
  maxWidth: LAYOUT.captionWidth,
};

export const sub: CSSProperties = {
  fontFamily: FONT.sourceSans,
  fontSize: 25,
  lineHeight: 1.4,
  fontWeight: 400,
  color: L.textSecondary,
  marginTop: 20,
  maxWidth: 500,
};
