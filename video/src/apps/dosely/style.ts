import type { CSSProperties } from "react";
import { FONT } from "../../shared/fonts";
import { LAYOUT, PHONE_CENTER } from "../../shared/Stage";
import { L } from "./tokens";

/** Soft clinical surface with the landing hero's teal glow behind the phone. */
export const STAGE_BG = `radial-gradient(640px 600px at ${PHONE_CENTER.x}px ${PHONE_CENTER.y}px, rgba(31,163,154,0.15) 0%, rgba(31,163,154,0.08) 35%, rgba(31,163,154,0.025) 70%, rgba(31,163,154,0) 100%), ${L.surface}`;

/** Lock Screen wallpaper: deep teal-ink gradient (no imagery). */
export const LOCK_WALLPAPER = "radial-gradient(130% 80% at 50% 0%, #2C6F6A 0%, #173A3C 45%, #0E1C21 100%)";

/** Home Screen wallpaper: light teal wash. */
export const HOME_WALLPAPER = "linear-gradient(165deg, #E6F5F2 0%, #BFE3DE 55%, #93CFC7 100%)";

/** A softer device shadow for the light stage. */
export const PHONE_SHADOW = "0 0 0 1px rgba(28,36,48,0.18), 0 40px 70px -30px rgba(28,36,48,0.45), 0 16px 30px -18px rgba(28,36,48,0.35)";

export const headline: CSSProperties = {
  fontFamily: FONT.atkinson,
  fontWeight: 650,
  fontSize: 58,
  lineHeight: 1.08,
  letterSpacing: -1,
  color: L.text,
  maxWidth: LAYOUT.captionWidth,
};

export const sub: CSSProperties = {
  fontFamily: FONT.atkinson,
  fontSize: 24,
  lineHeight: 1.45,
  fontWeight: 400,
  color: L.textSecondary,
  marginTop: 20,
  maxWidth: 500,
};
