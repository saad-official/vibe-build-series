import type { CSSProperties } from "react";

/**
 * A small set of SF-Symbol / Material-like glyphs drawn as 24-unit SVG paths, so the screens can
 * show the same icons the apps use without shipping an icon font. All use currentColor.
 */
const PATHS = {
  play: <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.4-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" fill="currentColor" />,
  stop: <rect x="6" y="6" width="12" height="12" rx="2.5" fill="currentColor" />,
  cup: (
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 9h12v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z" fill="currentColor" stroke="none" />
      <path d="M16 10.5h1.5a2.5 2.5 0 0 1 0 5H16" />
      <path d="M7.5 3.5c0 1.2 1 1.3 1 2.5M11.5 3.5c0 1.2 1 1.3 1 2.5" />
    </g>
  ),
  swap: (
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 8h14M14 4l4 4-4 4M20 16H6M10 12l-4 4 4 4" />
    </g>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />,
  bell: (
    <g fill="currentColor">
      <path d="M12 3a6 6 0 0 0-6 6v3.6l-1.6 2.7A1 1 0 0 0 5.3 17h13.4a1 1 0 0 0 .9-1.7L18 12.6V9a6 6 0 0 0-6-6z" />
      <path d="M9.5 18.5a2.5 2.5 0 0 0 5 0z" />
    </g>
  ),
  snooze: (
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="13" r="7.5" />
      <path d="M12 9v4l2.5 2M4 4.5l3 -2M20 4.5l-3-2" />
    </g>
  ),
  flashlight: (
    <g fill="currentColor">
      <path d="M8 2.5h8v3.5l-2 3.5v11a1.5 1.5 0 0 1-1.5 1.5h-1A1.5 1.5 0 0 1 10 20.5v-11L8 6z" />
    </g>
  ),
  camera: (
    <g fill="currentColor">
      <path d="M8.5 5l1.3-2h4.4l1.3 2H19a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />
      <circle cx="12" cy="12.5" r="3.6" fill="#000" opacity="0.35" />
    </g>
  ),
  chevronDown: <path d="M6 9.5l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />,
  people: (
    <g fill="currentColor">
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 19c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6z" />
      <circle cx="17" cy="9" r="2.8" opacity="0.7" />
      <path d="M16.5 13.2c3 0 5 2 5 5.3h-4.4c0-2.1-.4-3.9-1.6-5.2z" opacity="0.7" />
    </g>
  ),
  shieldCheck: (
    <g>
      <path d="M12 2.8l7.5 3v5.6c0 4.6-3.1 8.4-7.5 9.8-4.4-1.4-7.5-5.2-7.5-9.8V5.8z" fill="currentColor" />
      <path d="M8.5 12l2.5 2.5 4.5-5" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  ),
  clock: (
    <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </g>
  ),
  list: (
    <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M9 6.5h11M9 12h11M9 17.5h11" />
      <circle cx="4.5" cy="6.5" r="1.2" fill="currentColor" />
      <circle cx="4.5" cy="12" r="1.2" fill="currentColor" />
      <circle cx="4.5" cy="17.5" r="1.2" fill="currentColor" />
    </g>
  ),
  chart: (
    <g fill="currentColor">
      <rect x="4" y="12" width="4" height="8" rx="1" />
      <rect x="10" y="7" width="4" height="13" rx="1" />
      <rect x="16" y="4" width="4" height="16" rx="1" />
    </g>
  ),
  gear: (
    <g fill="none" stroke="currentColor" strokeWidth="2.2">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8" strokeLinecap="round" />
    </g>
  ),
  calendar: (
    <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <rect x="4" y="5.5" width="16" height="14.5" rx="3" />
      <path d="M4 10h16M8.5 3.5v3.5M15.5 3.5v3.5" />
    </g>
  ),
  capsule: (
    <g transform="rotate(-40 12 12)">
      <rect x="2.5" y="8" width="19" height="8" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M12 8.8H6.5a3.2 3.2 0 0 0 0 6.4H12z" fill="currentColor" />
    </g>
  ),
} as const;

export type GlyphName = keyof typeof PATHS;

export function Glyph({ name, size = 20, color, style }: { name: GlyphName; size?: number; color?: string; style?: CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ color, flexShrink: 0, display: "block", ...style }} aria-hidden>
      {PATHS[name]}
    </svg>
  );
}
