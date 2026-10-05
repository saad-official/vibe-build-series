import type { CSSProperties, ReactNode } from "react";
import { interpolate } from "remotion";
import { FONT, tabular } from "../../shared/fonts";
import { StatusBar } from "../../shared/StatusBar";
import { DRAWINGS, type DrawingName } from "./drawings";
import { D, L, ROOMS, X, formatElapsed, px, radius, type } from "./tokens";

/**
 * Turnproof screens recreated in DOM from `apps/mobile/src/screens/{today,turnover,capture}/*` and
 * `src/components/*` (list rows, checklist rows, photo tiles with stamp chips, the room stepper,
 * the camera overlay), light scheme, at phone scale `S`.
 */

const PAD = px(16);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const SHADOW_SM = "0px 1px 2px 0px rgba(43, 38, 32, 0.06)";

function T({ v, style, children }: { v: keyof typeof type; style?: CSSProperties; children: ReactNode }) {
  const t = type[v];
  return (
    <div
      style={{
        fontSize: px(t.fontSize),
        lineHeight: `${px(t.lineHeight)}px`,
        fontWeight: Number(t.fontWeight),
        letterSpacing: px(t.letterSpacing),
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------------------------------------
 * Icons: SF Symbol stand-ins for the names in `apps/mobile/src/constants/icons.ts`, 24-unit paths.
 * --------------------------------------------------------------------------------------------- */

const ICONS = {
  play: <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.4-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" fill="currentColor" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />,
  chevronRight: <path d="M9.5 5.5l6.5 6.5-6.5 6.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />,
  chevronLeft: <path d="M14.5 5.5L8 12l6.5 6.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />,
  close: <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />,
  plus: <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />,
  issue: (
    <path
      fillRule="evenodd"
      d="M10.3 3.9a2 2 0 0 1 3.4 0l8 13.9A2 2 0 0 1 20 20.8H4a2 2 0 0 1-1.7-3L10.3 3.9zM11 9h2v5.2h-2zM12 15.9a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6z"
      fill="currentColor"
    />
  ),
  more: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <circle cx="8" cy="12" r="0.9" fill="currentColor" />
      <circle cx="12" cy="12" r="0.9" fill="currentColor" />
      <circle cx="16" cy="12" r="0.9" fill="currentColor" />
    </g>
  ),
  camera: (
    <g fill="currentColor">
      <path d="M8.5 5l1.3-2h4.4l1.3 2H19a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />
      <circle cx="12" cy="12.5" r="3.6" fill="#fff" opacity="0.35" />
    </g>
  ),
  cameraOutline: (
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
      <path d="M8.5 5.5l1.3-2h4.4l1.3 2H19a2 2 0 0 1 2 2v10.5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7.5a2 2 0 0 1 2-2z" />
      <circle cx="12" cy="12.5" r="3.7" />
    </g>
  ),
  verified: (
    <g>
      <path
        d="M12 2.2l2.3 1.7 2.8-.2.9 2.7 2.4 1.5-.6 2.8 1.3 2.5-1.9 2.1-.1 2.8-2.7.8-1.5 2.4-2.8-.5L12 21.8l-2.1-1.9-2.8.5-1.5-2.4-2.7-.8-.1-2.8L.9 12.3l1.3-2.5-.6-2.8L4 5.5l.9-2.7 2.8.2z"
        fill="currentColor"
      />
      <path d="M8 12.2l2.7 2.7L16 9.6" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  ),
  bolt: <path d="M13.5 2.5L5 13.5h6l-1.5 8 8.5-11h-6z" fill="currentColor" />,
  flip: (
    <g fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 5.5l1.3-2h4.4l1.3 2H19a2 2 0 0 1 2 2v10.5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7.5a2 2 0 0 1 2-2z" />
      <path d="M8.5 12a3.5 3.5 0 0 1 6.2-2.2M15.5 13a3.5 3.5 0 0 1-6.2 2.2M14.7 8v1.9h-1.9M9.3 17v-1.9h1.9" />
    </g>
  ),
  clock: (
    <g fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </g>
  ),
  today: (
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect x="3.5" y="5" width="15" height="14" rx="3" />
      <path d="M3.5 9.5h15M7.5 3v3.5M14.5 3v3.5" />
      <circle cx="18" cy="17.5" r="4.2" fill="currentColor" stroke="none" />
      <path d="M18 15.6v2l1.2.8" stroke="#fff" strokeWidth="1.4" />
    </g>
  ),
  house: <path d="M3.5 11.2L12 4l8.5 7.2V19a1.5 1.5 0 0 1-1.5 1.5h-4.2v-5.3H9.2v5.3H5A1.5 1.5 0 0 1 3.5 19z" fill="currentColor" />,
  history: (
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3L4.5 9" />
      <path d="M4.5 4.5V9H9M12 8v4.3l2.8 1.7" />
    </g>
  ),
  gear: (
    <g fill="none" stroke="currentColor" strokeWidth="2.1">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8" strokeLinecap="round" />
    </g>
  ),
  bathtub: (
    <g fill="currentColor">
      <path d="M2.5 11.5h19v2.2A5.3 5.3 0 0 1 16.2 19H7.8a5.3 5.3 0 0 1-5.3-5.3z" />
      <path d="M5.5 11.5V5.8a2.3 2.3 0 0 1 4.4-.9" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7 19l-1 2M17 19l1 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </g>
  ),
  kitchen: (
    <g fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
      <path d="M7 3v6.5a2 2 0 0 0 2 2M11 3v6.5a2 2 0 0 1-2 2V21M9 3v5" />
      <path d="M17 21V3c-2 1-3 3.5-3 6.5V13h3" />
    </g>
  ),
  sofa: (
    <g fill="currentColor">
      <rect x="5" y="6" width="14" height="7" rx="2.5" />
      <rect x="2.5" y="10" width="19" height="7" rx="2.5" />
      <path d="M5 17v2.5M19 17v2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </g>
  ),
  bed: (
    <g fill="currentColor">
      <rect x="3" y="11" width="18" height="6" rx="1.5" />
      <rect x="5" y="7" width="6" height="4" rx="1.5" />
      <path d="M3 6v14M21 13v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </g>
  ),
  leaf: <path d="M5 19C5 10 10 5 20 4c0 9-5 15-12.5 15M5 19c3-4 6-6.5 9.5-8" fill="currentColor" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />,
  link: (
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
      <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
    </g>
  ),
  lock: (
    <g fill="currentColor">
      <rect x="5" y="10.5" width="14" height="10" rx="2.5" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" fill="none" stroke="currentColor" strokeWidth="2" />
    </g>
  ),
  pin: (
    <g fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.3" />
    </g>
  ),
  share: (
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v12M7.5 7.5L12 3l4.5 4.5" />
      <path d="M7 11H5.5v9.5h13V11H17" />
    </g>
  ),
} as const;

export type IconName = keyof typeof ICONS;

export function Icon({ name, size = 20, color, style }: { name: IconName; size?: number; color?: string; style?: CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ color, flexShrink: 0, display: "block", ...style }} aria-hidden>
      {ICONS[name]}
    </svg>
  );
}

/* ------------------------------------------------------------------------------------------------
 * Brand marks.
 * --------------------------------------------------------------------------------------------- */

/** The app icon (`apps/mobile/assets/icons/icon.png`): a deep-green camera with a check, on linen. */
export function TurnproofAppIcon({ size = 50, shadow }: { size?: number; shadow?: string }) {
  return (
    <svg viewBox="0 0 1024 1024" width={size} height={size} aria-hidden style={{ display: "block", borderRadius: size * 0.225, flexShrink: 0, boxShadow: shadow }}>
      <rect width="1024" height="1024" fill={L.surface} />
      <path d="M370 240h136a36 36 0 0 1 36 36v32h198a80 80 0 0 1 80 80v282a80 80 0 0 1-80 80H284a80 80 0 0 1-80-80V388a80 80 0 0 1 80-80h50v-32a36 36 0 0 1 36-36z" fill={L.accent} />
      <circle cx="714" cy="368" r="22" fill={L.surface} />
      <circle cx="512" cy="540" r="154" fill={L.surface} />
      <path d="M432 542l60 59 101-113" fill="none" stroke={L.accent} strokeWidth="52" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** The web mark (`apps/web/components/marketing/logo.tsx`): a photo frame with a check through it. */
export function ProofMark({ size = 28, color = L.accent, on = L.onAccent }: { size?: number; color?: string; on?: string }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden style={{ display: "block", flexShrink: 0 }}>
      <rect x="2" y="2" width="28" height="28" rx="7" fill={color} />
      <rect x="7" y="9" width="18" height="14" rx="3.5" fill="none" stroke={on} strokeWidth="2" />
      <path d="M11.5 16.2l3 3 6-6.4" fill="none" stroke={on} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------------------------------------
 * Photos: drawn tiles with the stamp chip (`components/photo-tile.tsx`).
 * --------------------------------------------------------------------------------------------- */

/** A drawn sample "photo". `crop` is an SVG viewBox into the 800x600 drawing. */
export function Drawing({ name, crop = "0 0 800 600", style }: { name: DrawingName; crop?: string; style?: CSSProperties }) {
  return (
    <svg
      viewBox={crop}
      preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block", ...style }}
      aria-hidden
      dangerouslySetInnerHTML={{ __html: DRAWINGS[name] }}
    />
  );
}

/** Time · GPS dot, drawn on the photo. */
export function StampChip({ time, gps = true, compact, scale = 1 }: { time: string; gps?: boolean; compact?: boolean; scale?: number }) {
  const dot = (px(10) - 2.4) * scale;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: px(4) * scale,
        padding: `${1.6 * scale}px ${(compact ? px(6) : px(8)) * scale}px`,
        borderRadius: 999,
        background: X.photoChip,
        color: X.onPhotoChip,
        fontFamily: FONT.ui,
        fontSize: px(13) * scale,
        lineHeight: `${px(17) * scale}px`,
        fontWeight: 500,
        whiteSpace: "nowrap",
        ...tabular,
      }}
    >
      {time}
      <span
        style={{
          width: dot,
          height: dot,
          borderRadius: 999,
          background: gps ? L.verified : "transparent",
          boxShadow: gps ? undefined : `inset 0 0 0 1.2px ${X.onPhotoChip}`,
        }}
      />
    </span>
  );
}

/** Photo tile: rounded, stamp chip bottom-left, teal verified seal top-right. `enter` 0..1 settles from 92%. */
export function PhotoTile({ drawing, time, size = px(116), verified = true, enter = 1 }: { drawing: DrawingName; time: string; size?: number; verified?: boolean; enter?: number }) {
  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        borderRadius: px(radius.md),
        overflow: "hidden",
        background: L.surfaceSunken,
        flexShrink: 0,
        opacity: Math.min(1, enter * 1.4),
        transform: `scale(${0.92 + 0.08 * enter})`,
      }}
    >
      <Drawing name={drawing} crop="100 0 600 600" />
      {verified ? (
        <span
          style={{
            position: "absolute",
            top: px(4),
            right: px(4),
            width: px(22),
            height: px(22),
            borderRadius: 999,
            background: L.verified,
            display: "grid",
            placeItems: "center",
          }}
        >
          <Icon name="check" size={px(13)} color={L.onVerified} />
        </span>
      ) : null}
      <div style={{ position: "absolute", left: px(4), bottom: px(4), display: "flex" }}>
        <StampChip time={time} compact={size < 90} />
      </div>
    </div>
  );
}

/** The "Add before photo" well (`AddPhotoTile`): accent-soft when the photo is still required. */
export function AddPhotoTile({ label, required, size = px(116), pressed = 0 }: { label: string; required?: boolean; size?: number; pressed?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: px(radius.md),
        background: pressed > 0.5 ? L.border : required ? L.accentSoft : L.surfaceSunken,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: px(4),
        padding: px(8),
        flexShrink: 0,
      }}
    >
      <Icon name="cameraOutline" size={px(30)} color={L.accentText} />
      <T v="caption" style={{ color: L.accentText, fontWeight: 600, textAlign: "center" }}>
        {label}
      </T>
    </div>
  );
}

/* ------------------------------------------------------------------------------------------------
 * Lists.
 * --------------------------------------------------------------------------------------------- */

function SectionHeader({ title, detail, inset = false, style }: { title: string; detail?: string; inset?: boolean; style?: CSSProperties }) {
  return (
    <div style={{ padding: inset ? `0 ${PAD}px` : 0, ...style }}>
      <T v="callout" style={{ color: L.textSecondary, fontWeight: 600 }}>
        {title}
      </T>
      {detail ? (
        <T v="caption" style={{ color: L.textTertiary, ...tabular }}>
          {detail}
        </T>
      ) : null}
    </div>
  );
}

function ListGroup({ children }: { children: ReactNode }) {
  return (
    <div style={{ background: L.surfaceElevated, borderRadius: px(radius.md), overflow: "hidden", boxShadow: SHADOW_SM }}>{children}</div>
  );
}

function Hairline({ inset = PAD }: { inset?: number }) {
  return <div style={{ height: 0.6, background: L.separator, marginLeft: inset }} />;
}

/** One checklist item as a large toggle (`components/checklist-row.tsx`). `p` 0..1 fills the check. */
export function ChecklistRow({ label, required = true, p }: { label: string; required?: boolean; p: number }) {
  const box = px(30);
  const on = p > 0.5;
  const check = interpolate(p, [0.3, 1], [0, 1], clamp);
  return (
    <div style={{ minHeight: px(56), display: "flex", alignItems: "center", gap: px(16), padding: `${px(8)}px ${px(16)}px` }}>
      <span
        style={{
          position: "relative",
          width: box,
          height: box,
          borderRadius: 999,
          boxShadow: `inset 0 0 0 2px ${on ? L.accent : L.border}`,
          display: "grid",
          placeItems: "center",
          flexShrink: 0,
        }}
      >
        <span style={{ position: "absolute", inset: 0, borderRadius: 999, background: L.accent, opacity: Math.min(1, p * 1.6) }} />
        <span style={{ position: "relative", opacity: check, transform: `scale(${0.6 + 0.4 * check})` }}>
          <Icon name="check" size={px(16)} color={L.onAccent} />
        </span>
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <T v="body" style={{ color: on ? L.textSecondary : L.text, whiteSpace: "nowrap" }}>
          {label}
        </T>
        <T v="caption" style={{ color: required ? L.textSecondary : L.textTertiary }}>
          {required ? "Required" : "Optional"}
        </T>
      </div>
    </div>
  );
}

/** The app's button (`components/primary-button.tsx`). */
function Button({
  title,
  icon,
  variant = "primary",
  size = "lg",
  disabled,
  pressed = 0,
  iconAfter,
  style,
}: {
  title: string;
  icon?: IconName;
  variant?: "primary" | "secondary" | "issue";
  size?: "sm" | "lg";
  disabled?: boolean;
  pressed?: number;
  iconAfter?: boolean;
  style?: CSSProperties;
}) {
  const fill = { primary: { bg: L.accent, fg: L.onAccent }, secondary: { bg: L.accentSoft, fg: L.accentText }, issue: { bg: L.issue, fg: L.onIssue } }[variant];
  const lg = size === "lg";
  const glyph = icon ? <Icon name={icon} size={lg ? px(22) : px(18)} color={fill.fg} /> : null;
  return (
    <div
      style={{
        height: lg ? px(56) : px(44),
        padding: `0 ${lg ? px(24) : px(16)}px`,
        borderRadius: lg ? px(radius.md) : px(radius.sm),
        background: fill.bg,
        color: fill.fg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: px(8),
        opacity: disabled ? 0.45 : 1,
        transform: `scale(${1 - 0.03 * pressed})`,
        fontSize: lg ? px(17) : px(15),
        fontWeight: 600,
        whiteSpace: "nowrap",
        flexShrink: 0,
        ...style,
      }}
    >
      {iconAfter ? null : glyph}
      {title}
      {iconAfter ? glyph : null}
    </div>
  );
}

/* ------------------------------------------------------------------------------------------------
 * Today (`screens/today/today-screen.tsx`).
 * --------------------------------------------------------------------------------------------- */

const TABS: { label: string; icon: IconName }[] = [
  { label: "Today", icon: "today" },
  { label: "Properties", icon: "house" },
  { label: "History", icon: "history" },
  { label: "Settings", icon: "gear" },
];

/** iOS 26 native tabs: a floating glass capsule (`app/(tabs)/_layout.tsx`). */
function TabBar({ active }: { active: string }) {
  return (
    <div
      style={{
        position: "absolute",
        left: 14,
        right: 14,
        bottom: 20,
        height: 52,
        borderRadius: 26,
        background: "rgba(255,255,255,0.86)",
        boxShadow: `0 0 0 0.6px ${L.border}, 0 8px 24px -8px rgba(43,38,32,0.22)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "0 4px",
        zIndex: 6,
      }}
    >
      {TABS.map((t) => {
        const on = t.label === active;
        const color = on ? L.accentText : L.text;
        return (
          <div
            key={t.label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              color,
              padding: "5px 9px",
              borderRadius: 20,
              background: on ? "rgba(31,107,74,0.10)" : "transparent",
            }}
          >
            <Icon name={t.icon} size={18} color={color} />
            <span style={{ fontSize: 8.5, fontWeight: 600 }}>{t.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function CountdownLabel({ text, overdue }: { text: string; overdue?: boolean }) {
  const color = overdue ? L.issueText : L.textSecondary;
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: px(4), marginTop: 2 }}>
      <Icon name="clock" size={px(14)} color={color} style={{ marginTop: 2.5 }} />
      <T v="callout" style={{ color, fontWeight: overdue ? 600 : 400, ...tabular }}>
        {text}
      </T>
    </div>
  );
}

function TurnoverRow({ name, countdown, start, pressed = 0 }: { name: string; countdown: string; start?: "primary" | "secondary"; pressed?: number }) {
  return (
    <div style={{ minHeight: px(56), display: "flex", alignItems: "center", gap: px(12), padding: `${px(12)}px ${px(16)}px`, background: pressed > 0.5 ? L.surfaceSunken : "transparent" }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <T v="body">{name}</T>
        <CountdownLabel text={countdown} />
      </div>
      {start ? (
        <Button title="Start" icon="play" size="sm" variant={start} pressed={pressed} />
      ) : (
        <Icon name="chevronRight" size={px(14)} color={L.textTertiary} />
      )}
    </div>
  );
}

/** Today: today's turnovers with Start, then tomorrow. `pressStart` 0..1 presses Maple St's Start. */
export function TodayScreen({ time, countdown, pressStart = 0 }: { time: string; countdown: string; pressStart?: number }) {
  return (
    <div style={{ position: "absolute", inset: 0, background: L.surface, fontFamily: FONT.ui, color: L.text }}>
      <StatusBar time={time} color={L.text} />
      <div style={{ position: "absolute", top: 50, right: PAD, width: 30, height: 30, borderRadius: 999, background: L.surfaceElevated, boxShadow: SHADOW_SM, display: "grid", placeItems: "center" }}>
        <Icon name="plus" size={16} color={L.text} />
      </div>
      <div style={{ position: "absolute", top: 82, left: PAD + 2, fontSize: px(34), lineHeight: `${px(41)}px`, fontWeight: 700, letterSpacing: px(-0.6) }}>Today</div>
      <div style={{ position: "absolute", top: 132, left: PAD, right: PAD, display: "flex", flexDirection: "column", gap: px(24) }}>
        <div style={{ display: "flex", flexDirection: "column", gap: px(8) }}>
          <SectionHeader title="Today" detail="2 turnovers" inset />
          <ListGroup>
            <TurnoverRow name="Maple St" countdown={countdown} start="primary" pressed={pressStart} />
            <Hairline />
            <TurnoverRow name="Harbour View" countdown="Checkout 2:00 PM · in 3 h" start="secondary" />
          </ListGroup>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: px(8) }}>
          <SectionHeader title="Tomorrow" detail="1 turnover" inset />
          <ListGroup>
            <TurnoverRow name="Cedar Cottage" countdown="Checkout 10:00 AM · in 23 h" />
          </ListGroup>
        </div>
        <Button title="Schedule a turnover" icon="plus" variant="secondary" size="sm" style={{ height: px(48) }} />
      </div>
      <TabBar active="Today" />
    </div>
  );
}

/* ------------------------------------------------------------------------------------------------
 * The running turnover (`screens/turnover/turnover-flow.tsx` + `room-page.tsx`).
 * --------------------------------------------------------------------------------------------- */

export type RoomState = {
  /** Before / after photos: 0..1 entrance each, `undefined` = not taken. */
  before?: number;
  after?: number;
  /** Per checklist item 0..1. */
  checks: number[];
  /** 0..1 "Done" pill. */
  done: number;
  /** Highlight the add tile being tapped. */
  pressBefore?: number;
  pressAfter?: number;
};

const SAMPLE_FOR: Record<string, { before: DrawingName; after: DrawingName; beforeAt: string; afterAt: string }> = {
  Kitchen: { before: "kitchen-before", after: "kitchen-after", beforeAt: "11:01", afterAt: "11:14" },
  Bedroom: { before: "bedroom-before", after: "bedroom-after", beforeAt: "11:16", afterAt: "11:33" },
  Bathroom: { before: "bathroom-before", after: "bathroom-after", beforeAt: "11:38", afterAt: "11:41" },
};

function RoomPage({ index, state, scroll = 0 }: { index: number; state: RoomState; scroll?: number }) {
  const room = ROOMS[index];
  const sample = SAMPLE_FOR[room.name] ?? SAMPLE_FOR.Kitchen;
  const checked = state.checks.filter((c) => c > 0.5).length;
  return (
    <div style={{ position: "absolute", top: 0, left: index * 282, width: 282, height: "100%", overflow: "hidden" }}>
      <div style={{ padding: PAD, display: "flex", flexDirection: "column", gap: px(24), transform: `translateY(${-scroll}px)` }}>
        <div style={{ display: "flex", alignItems: "center", gap: px(12) }}>
          <Icon name={room.icon} size={px(28)} color={L.accentText} />
          <div style={{ flex: 1 }}>
            <T v="title">{room.name}</T>
            <T v="callout" style={{ color: L.textSecondary }}>
              Room {index + 1} of {ROOMS.length}
            </T>
          </div>
          {state.done > 0 ? (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: px(4),
                padding: `3px ${px(10)}px`,
                borderRadius: 999,
                background: L.accentSoft,
                color: L.accentText,
                fontSize: px(13),
                fontWeight: 600,
                opacity: state.done,
                transform: `scale(${0.9 + 0.1 * state.done})`,
              }}
            >
              <Icon name="check" size={px(12)} color={L.accentText} />
              Done
            </span>
          ) : null}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: px(12) }}>
          <SectionHeader title="Before" detail="How you found it" />
          <div style={{ display: "flex", gap: px(8) }}>
            <AddPhotoTile label="Add before photo" pressed={state.pressBefore} />
            {state.before !== undefined ? <PhotoTile drawing={sample.before} time={sample.beforeAt} enter={state.before} /> : null}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: px(12) }}>
          <SectionHeader title="Checklist" detail={`${checked} of ${room.items.length} required done`} />
          <ListGroup>
            {room.items.map((label, i) => (
              <div key={label}>
                {i > 0 ? <Hairline /> : null}
                <ChecklistRow label={label} p={state.checks[i] ?? 0} />
              </div>
            ))}
          </ListGroup>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: px(12) }}>
          <SectionHeader title="After" detail="Required to finish the room" />
          <div style={{ display: "flex", gap: px(8) }}>
            <AddPhotoTile label="Add after photo" required={state.after === undefined} pressed={state.pressAfter} />
            {state.after !== undefined ? <PhotoTile drawing={sample.after} time={sample.afterAt} enter={state.after} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Room dots (`components/room-stepper.tsx`): green when done, a ring that follows the pager. */
function RoomStepper({ done, position }: { done: number[]; position: number }) {
  const slot = px(28);
  const ring = px(20);
  const dot = px(10);
  return (
    <div style={{ position: "relative", display: "flex", height: px(44), alignItems: "center" }}>
      <span
        style={{
          position: "absolute",
          left: (slot - ring) / 2 + position * slot,
          width: ring,
          height: ring,
          borderRadius: 999,
          boxShadow: `inset 0 0 0 2px ${L.accent}`,
        }}
      />
      {ROOMS.map((r, i) => {
        const d = done[i] ?? 0;
        return (
          <span key={r.name} style={{ width: slot, display: "grid", placeItems: "center" }}>
            <span style={{ position: "relative", width: dot, height: dot, borderRadius: 999, background: X.track, boxShadow: `inset 0 0 0 1.2px ${L.border}` }}>
              <span style={{ position: "absolute", inset: 0, borderRadius: 999, background: L.accent, opacity: d, transform: `scale(${0.4 + 0.6 * d})` }} />
            </span>
          </span>
        );
      })}
    </div>
  );
}

export type FlowProps = {
  time: string;
  elapsedSeconds: number;
  /** Fractional room index the pager shows. */
  page: number;
  /** Per room 0..1 done (stepper dots). */
  roomsDone: number[];
  rooms: Record<number, RoomState>;
  /** Vertical scroll of the current room page, px. */
  scroll: number;
  /** Bottom bar: what the primary button says. */
  primary: "disabled" | "room-done" | "next-room";
  missing?: string | null;
  pressPrimary?: number;
};

/** Height of the bottom action bar, for placing taps. */
export const FLOW_BAR = { top: 602 - 106, buttonCenterY: 602 - 106 + 10 + 18 + px(28) } as const;

export function FlowScreen({ time, elapsedSeconds, page, roomsDone, rooms, scroll, primary, missing, pressPrimary = 0 }: FlowProps) {
  const current = Math.round(page);
  return (
    <div style={{ position: "absolute", inset: 0, background: L.surface, fontFamily: FONT.ui, color: L.text }}>
      <StatusBar time={time} color={L.text} />
      {/* Navigation bar: back, property + live timer, overflow. */}
      <div style={{ position: "absolute", top: 46, left: 0, right: 0, height: 38, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 10px" }}>
        <span style={{ width: 30, height: 30, borderRadius: 999, background: L.surfaceElevated, boxShadow: SHADOW_SM, display: "grid", placeItems: "center" }}>
          <Icon name="chevronLeft" size={16} color={L.text} />
        </span>
        <div style={{ textAlign: "center" }}>
          <T v="body" style={{ fontWeight: 600, lineHeight: "17px" }}>
            Maple St
          </T>
          <T v="caption" style={{ color: L.textSecondary, ...tabular }}>
            {formatElapsed(elapsedSeconds)} elapsed
          </T>
        </div>
        <span style={{ width: 30, height: 30, borderRadius: 999, background: L.surfaceElevated, boxShadow: SHADOW_SM, display: "grid", placeItems: "center" }}>
          <Icon name="more" size={18} color={L.text} />
        </span>
      </div>
      {/* Stepper row. */}
      <div style={{ position: "absolute", top: 86, left: 0, right: 0, height: 36, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 8px", borderBottom: `0.6px solid ${L.separator}` }}>
        <Icon name="chevronLeft" size={18} color={L.accentText} />
        <RoomStepper done={roomsDone} position={page} />
        <Icon name="chevronRight" size={18} color={L.accentText} />
      </div>
      {/* Room pager. */}
      <div style={{ position: "absolute", top: 122, left: 0, right: 0, bottom: 106, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, transform: `translateX(${-page * 282}px)` }}>
          {Object.entries(rooms).map(([i, state]) => (
            <RoomPage key={i} index={Number(i)} state={state} scroll={Number(i) === current ? scroll : 0} />
          ))}
        </div>
      </div>
      {/* Bottom action bar. */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 106,
          background: L.surface,
          borderTop: `0.6px solid ${L.separator}`,
          padding: `${px(12)}px ${PAD}px 0`,
          display: "flex",
          flexDirection: "column",
          gap: px(8),
        }}
      >
        <T v="caption" style={{ color: L.textSecondary, textAlign: "center", height: px(17), whiteSpace: "nowrap" }}>
          {missing ?? ""}
        </T>
        <div style={{ display: "flex", gap: px(8) }}>
          <Button title="Issue" icon="issue" variant="issue" style={{ padding: `0 ${px(18)}px` }} />
          {primary === "next-room" ? (
            <Button title="Next room" icon="chevronRight" iconAfter style={{ flex: 1 }} />
          ) : (
            <Button title="Room done" icon="check" disabled={primary === "disabled"} pressed={pressPrimary} style={{ flex: 1 }} />
          )}
        </div>
      </div>
    </div>
  );
}

/** The room-done check: a 112 pt green disc that settles in from 90% (`CHECK_ENTER`). */
export function RoomDoneCheck({ p, out }: { p: number; out: number }) {
  if (p <= 0 || out >= 1) return null;
  const scale = interpolate(p, [0, 0.6, 1], [0.9, 1.04, 1], clamp);
  return (
    <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", zIndex: 12, pointerEvents: "none" }}>
      <div
        style={{
          width: px(112),
          height: px(112),
          borderRadius: 999,
          background: L.accent,
          display: "grid",
          placeItems: "center",
          opacity: interpolate(p, [0, 0.6], [0, 1], clamp) * (1 - out),
          transform: `scale(${scale})`,
          boxShadow: "0 20px 44px -12px rgba(43,38,32,0.35)",
        }}
      >
        <Icon name="check" size={px(56)} color={L.onAccent} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------------------------------
 * Capture (`screens/capture/capture-screen.tsx` + `components/camera-overlay.tsx`). Always dark.
 * --------------------------------------------------------------------------------------------- */

function CameraButton({ icon, size = 35 }: { icon: IconName; size?: number }) {
  return (
    <span style={{ width: size, height: size, borderRadius: 999, background: X.cameraControl, display: "grid", placeItems: "center", flexShrink: 0 }}>
      <Icon name={icon} size={17} color={D.text} />
    </span>
  );
}

export function CaptureScreen({ clock, shots, press = 0 }: { clock: string; shots: number; press?: number }) {
  const shutter = px(80);
  return (
    <div style={{ position: "absolute", inset: 0, background: X.cameraBackground, fontFamily: FONT.ui, color: D.text, overflow: "hidden" }}>
      {/* The live preview: the bathroom as found (a drawing, cropped portrait). */}
      <Drawing name="bathroom-before" crop="40 40 300 540" />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(12,14,16,0.55) 0%, rgba(12,14,16,0) 26%, rgba(12,14,16,0) 66%, rgba(12,14,16,0.6) 100%)" }} />
      <StatusBar time={clock.slice(0, 5)} color={D.text} />
      <div style={{ position: "absolute", top: 50, left: PAD, right: PAD, display: "flex", alignItems: "center", gap: px(8) }}>
        <CameraButton icon="close" />
        <div style={{ flex: 1, textAlign: "center", padding: `${px(4)}px ${px(12)}px`, borderRadius: 999, background: X.cameraControl }}>
          <T v="callout" style={{ fontWeight: 600, color: D.text }}>
            Bathroom
          </T>
          <T v="caption" style={{ color: D.textSecondary }}>
            Before photos
          </T>
        </div>
        <CameraButton icon="bolt" />
        <CameraButton icon="flip" />
      </div>
      {/* Live stamp preview: what the next photo will carry. */}
      <div style={{ position: "absolute", top: 96, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: px(8),
            padding: `${px(6)}px ${px(12)}px`,
            borderRadius: 999,
            background: X.photoChip,
            ...tabular,
          }}
        >
          <span style={{ fontSize: px(15), fontWeight: 600 }}>{clock}</span>
          <span style={{ width: px(10), height: px(10), borderRadius: 999, background: L.verified }} />
          <span style={{ fontSize: px(13), fontWeight: 500 }}>GPS on</span>
        </span>
      </div>
      {/* Thumbnails, shutter, Done. */}
      <div style={{ position: "absolute", left: PAD, right: PAD, bottom: 30, display: "flex", flexDirection: "column", gap: px(16) }}>
        <div style={{ height: px(56), display: "flex", gap: px(8) }}>
          {shots > 0 ? (
            <div style={{ position: "relative", width: px(56), height: px(56), borderRadius: px(radius.sm), overflow: "hidden", boxShadow: `0 0 0 2px ${D.text}`, opacity: Math.min(1, shots), transform: `scale(${0.8 + 0.2 * Math.min(1, shots)})` }}>
              <Drawing name="bathroom-before" crop="40 40 300 540" />
            </div>
          ) : null}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ width: 77 }}>
            <span style={{ display: "inline-block", padding: `${px(6)}px ${px(8)}px`, borderRadius: px(radius.sm), background: X.cameraControl, fontSize: px(13), lineHeight: `${px(16)}px`, fontWeight: 600 }}>
              Add reference photo
            </span>
          </div>
          <div style={{ width: shutter, height: shutter, borderRadius: 999, boxShadow: `inset 0 0 0 3.2px ${X.shutter}`, display: "grid", placeItems: "center" }}>
            <span style={{ width: shutter - 13, height: shutter - 13, borderRadius: 999, background: X.shutter, transform: `scale(${1 - 0.12 * press})` }} />
          </div>
          <div style={{ width: 77, display: "flex", justifyContent: "flex-end" }}>
            <span
              style={{
                minWidth: px(80),
                height: px(52),
                borderRadius: 999,
                display: "grid",
                placeItems: "center",
                background: shots > 0.5 ? D.accent : X.cameraControl,
                color: shots > 0.5 ? D.onAccent : D.text,
                fontSize: px(17),
                fontWeight: 700,
              }}
            >
              Done
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------------------------------
 * Native surfaces.
 * --------------------------------------------------------------------------------------------- */

/** A circular gauge like SwiftUI `.circularCapacity`, with the rooms label inside. */
export function RoomsGauge({ progress, label, size, accent, track, color }: { progress: number; label: string; size: number; accent: string; track: string; color: string }) {
  const stroke = Math.max(3, size * 0.11);
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }} aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={accent} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={`${c * Math.max(0.001, progress)} ${c}`} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", fontSize: size * 0.3, fontWeight: 600, color, ...tabular }}>{label}</div>
    </div>
  );
}

/** Lock Screen Live Activity banner (`src/widgets/turnover.activity.tsx`), dark palette. */
export function TurnoverLiveActivity({ elapsedSeconds, roomsDone, ringProgress }: { elapsedSeconds: number; roomsDone: number; ringProgress: number }) {
  return (
    <div style={{ fontFamily: FONT.ui, color: D.text }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <RoomsGauge progress={ringProgress} label={`${roomsDone}/6`} size={42} accent={D.accent} track="rgba(236,238,240,0.16)" color={D.text} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, lineHeight: "19px", fontWeight: 600, whiteSpace: "nowrap" }}>Maple St</div>
          <div style={{ fontSize: 11.5, lineHeight: "15px", color: D.textSecondary, whiteSpace: "nowrap" }}>Room 3: Bathroom</div>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ fontSize: 19, lineHeight: "22px", fontWeight: 600, color: D.accentText, ...tabular }}>{formatElapsed(elapsedSeconds)}</div>
          <div style={{ fontSize: 10, color: D.textSecondary }}>elapsed</div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 11 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 13px", borderRadius: 999, background: "rgba(63,159,116,0.22)", color: D.accentText, fontSize: 13.5, fontWeight: 600 }}>
          <span style={{ width: 16, height: 16, borderRadius: 999, background: D.accent, display: "grid", placeItems: "center" }}>
            <Icon name="chevronRight" size={11} color={D.onAccent} />
          </span>
          Next room
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5, color: D.issueText, fontSize: 13.5, fontWeight: 600 }}>
          <Icon name="issue" size={14} color={D.issue} />
          Issue
        </span>
      </div>
    </div>
  );
}

/** Compact Live Activity in the Dynamic Island: checklist glyph + rooms. */
export function TurnoverIsland({ reveal }: { reveal: number }) {
  return (
    <>
      <span style={{ opacity: reveal, display: "flex" }}>
        <Icon name="check" size={13} color={D.accent} />
      </span>
      <span style={{ opacity: reveal, fontFamily: FONT.ui, fontSize: 11.5, fontWeight: 600, color: D.accent, ...tabular }}>3/6</span>
    </>
  );
}

/** Home Screen widget `NextTurnover`, systemSmall (`src/widgets/next-turnover-widget.tsx`), light. */
export function NextTurnoverWidget({ size = 118, countdown }: { size?: number; countdown: string }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 22,
        background: L.surfaceElevated,
        padding: 11,
        display: "flex",
        flexDirection: "column",
        fontFamily: FONT.ui,
        color: L.text,
        boxShadow: "0 10px 24px -12px rgba(43,38,32,0.35)",
      }}
    >
      <div style={{ fontSize: 8.8, fontWeight: 600, color: L.textSecondary, letterSpacing: 0.2 }}>NEXT TURNOVER</div>
      <div style={{ marginTop: 5, fontSize: 13.6, lineHeight: "16px", fontWeight: 600 }}>Maple St</div>
      <div style={{ fontSize: 10, lineHeight: "14px", fontWeight: 500, letterSpacing: -0.1, color: L.accentText, marginTop: 1, whiteSpace: "nowrap", ...tabular }}>Checkout 11:00 AM</div>
      <div style={{ fontSize: 9.6, lineHeight: "13px", color: L.textSecondary, ...tabular }}>{countdown}</div>
      <div style={{ flex: 1 }} />
      <div style={{ fontSize: 8.8, color: L.textSecondary, ...tabular }}>0/2 today</div>
    </div>
  );
}
