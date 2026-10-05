import type { CSSProperties, ReactNode } from "react";
import { interpolate } from "remotion";
import { FONT, tabular } from "../../shared/fonts";
import { Glyph } from "../../shared/Glyph";
import { StatusBar } from "../../shared/StatusBar";
import {
  BOARD,
  CHILI,
  COLD_LABEL,
  D,
  HOT_LABEL,
  L,
  LOGGED_F,
  STAGE1_MAX,
  STAGE2_MAX,
  TRACK,
  px,
  radius,
  resultOf,
  stage1Label,
  temp,
  type,
  type Kind,
} from "./tokens";

/**
 * Templog screens recreated in DOM from `apps/mobile/src/screens/{today,log,cooling}/*`,
 * `src/components/*` (result stamp, status pill, kind icon, keypad, reading display, progress ring,
 * cooling card) and `src/widgets/*`, light scheme, at phone scale.
 */

type Palette = Record<keyof typeof L, string>;
const PAD = 14;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

function T({ v, style, children, c = L }: { v: keyof typeof type; style?: CSSProperties; children: ReactNode; c?: Palette }) {
  const t = type[v];
  return (
    <div
      style={{
        fontSize: px(t.fontSize),
        lineHeight: `${px(t.lineHeight)}px`,
        fontWeight: Number(t.fontWeight),
        letterSpacing: px(t.letterSpacing),
        color: c.text,
        ...(t.tabularNums ? tabular : null),
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ glyphs */

/** SF Symbol stand-ins for the icons Templog uses (`constants/icons.ts`), 24-unit, currentColor. */
const ICONS = {
  snowflake: (
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.5v19M3.8 7.25l16.4 9.5M3.8 16.75l16.4-9.5" />
      <path d="M9.4 3.9L12 6.4l2.6-2.5M9.4 20.1L12 17.6l2.6 2.5M3.4 10.6l3.5-.9-.9-3.5M20.6 13.4l-3.5.9.9 3.5M3.4 13.4l3.5.9-.9 3.5M20.6 10.6l-3.5-.9.9-3.5" />
    </g>
  ),
  flame: <path transform="translate(12 12.4) scale(1.18) translate(-12 -12.4)" d="M12.6 2.2c.4 3 4.9 5.2 4.9 10.6a5.5 5.5 0 0 1-11 0c0-2.6 1.3-4.4 2.6-5.6.1 1.9 1 3.1 2.2 3.3-.9-3.2-.1-6.1 1.3-8.3z" fill="currentColor" />,
  thermometer: (
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M9.5 14.3V5a2.5 2.5 0 0 1 5 0v9.3a4.5 4.5 0 1 1-5 0z" />
      <path d="M12 9.5v7" strokeWidth="2.6" />
      <circle cx="12" cy="17.6" r="1.6" fill="currentColor" />
    </g>
  ),
  plusCircle: (
    <g>
      <circle cx="12" cy="12" r="9.5" fill="currentColor" />
      <path d="M12 7.5v9M7.5 12h9" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
    </g>
  ),
  timer: (
    <g fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round">
      <circle cx="12" cy="13.5" r="7.8" />
      <path d="M12 9.5v4.2l2.6 1.6M9.5 2.8h5M18.6 6.4l1.4-1.4" />
    </g>
  ),
  backspace: (
    <g fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" strokeLinecap="round">
      <path d="M8.5 5.5H20a1.5 1.5 0 0 1 1.5 1.5v10a1.5 1.5 0 0 1-1.5 1.5H8.5L2.5 12z" />
      <path d="M11.5 9.5l5 5M16.5 9.5l-5 5" />
    </g>
  ),
  snooze: (
    <g fill="currentColor">
      <path d="M13.6 3.2A8.6 8.6 0 1 0 20.8 14a7 7 0 0 1-7.2-10.8z" />
    </g>
  ),
  trash: (
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 6.5h15M9.5 6.5V4.5h5v2M6.5 6.5l1 13h9l1-13M10.5 10v6.5M13.5 10v6.5" />
    </g>
  ),
  xmark: <path d="M7 7l10 10M17 7L7 17" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />,
  plus: <path d="M12 5.5v13M5.5 12h13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />,
  signature: (
    <g fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 16.5c2-4 3.5-9 5.5-9 2.5 0-2 9.5.5 9.5 1.5 0 2.5-3.5 4-3.5 1.2 0 .6 2.5 2 2.5 1 0 2-1.2 3-1.2" />
      <path d="M3.5 20.5h17" />
    </g>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />,
} as const;

type IconName = keyof typeof ICONS | "pass" | "fail";

/** `pass` / `fail` are the filled symbols (checkmark.circle.fill, exclamationmark.octagon.fill); `knock` is the cut-out colour. */
export function Icon({ name, size = 16, color, knock = "#fff", style }: { name: IconName; size?: number; color: string; knock?: string; style?: CSSProperties }) {
  let body: ReactNode;
  if (name === "pass") {
    body = (
      <g>
        <circle cx="12" cy="12" r="10" fill="currentColor" />
        <path d="M7.4 12.3l3.1 3.1 6.1-6.6" fill="none" stroke={knock} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    );
  } else if (name === "fail") {
    body = (
      <g>
        <path d="M8 2.5h8l5.5 5.5v8L16 21.5H8L2.5 16V8z" fill="currentColor" />
        <path d="M12 7v6.2" stroke={knock} strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="12" cy="16.6" r="1.4" fill={knock} />
      </g>
    );
  } else {
    body = ICONS[name];
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ color, flexShrink: 0, display: "block", ...style }} aria-hidden>
      {body}
    </svg>
  );
}

/** The thermometer mark (`components/marketing/logo.tsx`): a steel tube with the heat rising in it. */
export function ThermoMark({ size = 28, color = L.text, heat = L.heat }: { size?: number; color?: string; heat?: string }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden style={{ display: "block", color, flexShrink: 0 }}>
      <rect x="12" y="3" width="8" height="18" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="16" cy="23.5" r="5.5" fill={heat} />
      <rect x="14.75" y="10" width="2.5" height="12" rx="1.25" fill={heat} />
      <path d="M23 7h3M23 11h2M23 15h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

/** App icon: the mark in steel on ink, like the dark launcher icon. */
export function TemplogAppIcon({ size = 50 }: { size?: number }) {
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.27,
        background: `linear-gradient(160deg, #26323A 0%, ${L.text} 70%)`,
        display: "grid",
        placeItems: "center",
        flexShrink: 0,
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
      }}
    >
      <ThermoMark size={size * 0.68} color="#DCE3E6" heat={D.heat} />
    </span>
  );
}

/* -------------------------------------------------------------- components */

/** `components/progress-ring.tsx`: track + arc (butt ends: the app builds it from bordered halves). */
export function ProgressRing({ progress, size, stroke, color, track = TRACK, children }: { progress: number; size: number; stroke: number; color: string; track?: string; children?: ReactNode }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const p = Math.max(0, Math.min(1, progress));
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }} aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeDasharray={`${c * Math.max(0.0001, p)} ${c}`} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>{children}</div>
    </div>
  );
}

/** `components/kind-icon.tsx`: cold blue for cold holding, amber for hot holding (heat red is for fails). */
export function KindIcon({ kind, size = 32 }: { kind: Kind; size?: number }) {
  const cold = kind === "cold-holding";
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: px(radius.sm + 2),
        background: cold ? L.coldSoft : L.warningSoft,
        display: "grid",
        placeItems: "center",
        flexShrink: 0,
      }}
    >
      <Icon name={cold ? "snowflake" : "flame"} size={Math.round(size * 0.52)} color={cold ? L.coldText : L.warningText} />
    </span>
  );
}

type StampResult = "pass" | "fail";

/** `components/result-stamp.tsx`, small: colour + icon + word, uppercase. */
export function StampSm({ result, label }: { result: StampResult; label?: string }) {
  const pass = result === "pass";
  const fg = pass ? L.passText : L.heatText;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 3,
        padding: "1.5px 6px",
        borderRadius: px(radius.sm),
        background: pass ? L.passSoft : L.heatSoft,
        color: fg,
        fontSize: px(type.caption.fontSize),
        lineHeight: "13px",
        fontWeight: 700,
        letterSpacing: 0.2,
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}
    >
      <Icon name={pass ? "pass" : "fail"} size={10.5} color={fg} knock={pass ? L.passSoft : L.heatSoft} />
      {label ?? (pass ? "Pass" : "Fail")}
    </span>
  );
}

/**
 * The large stamp that lands after a save: scale 1.35 → 1 on the snappy spring, tilted -6°,
 * opacity min(1, p × 1.6). `p` is the spring progress.
 */
export function StampLg({ result, p }: { result: StampResult; p: number }) {
  const pass = result === "pass";
  const fg = pass ? L.passText : L.heatText;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        padding: "6px 13px",
        borderRadius: px(radius.sm),
        border: `2.5px solid ${pass ? L.pass : L.heat}`,
        background: pass ? L.passSoft : L.heatSoft,
        color: fg,
        fontSize: px(type.headline.fontSize),
        lineHeight: "20px",
        fontWeight: 700,
        letterSpacing: 1.5,
        textTransform: "uppercase",
        opacity: Math.min(1, p * 1.6),
        transform: `scale(${1 + (1 - p) * 0.35}) rotate(-6deg)`,
      }}
    >
      <Icon name={pass ? "pass" : "fail"} size={21} color={fg} knock={pass ? L.passSoft : L.heatSoft} />
      {pass ? "Pass" : "Fail"}
    </span>
  );
}

type PillStatus = "due" | "upcoming" | "logged";

/** `components/status-pill.tsx`. */
function StatusPill({ status, detail }: { status: PillStatus; detail?: string }) {
  const meta = {
    due: { label: "Due now", fg: L.onWarning, bg: L.warning, icon: <Glyph name="bell" size={10} color={L.onWarning} /> },
    upcoming: { label: "Upcoming", fg: L.textSecondary, bg: L.surfaceSunken, icon: <Glyph name="clock" size={10} color={L.textSecondary} /> },
    logged: { label: "Logged", fg: L.passText, bg: L.passSoft, icon: <Icon name="pass" size={10} color={L.passText} knock={L.passSoft} /> },
  }[status];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 3,
        alignSelf: "flex-start",
        padding: "1.5px 6px",
        borderRadius: 999,
        background: meta.bg,
        color: meta.fg,
        fontSize: px(type.caption.fontSize),
        lineHeight: "13px",
        fontWeight: 700,
        whiteSpace: "nowrap",
        ...tabular,
      }}
    >
      {meta.icon}
      {detail ? `${meta.label} · ${detail}` : meta.label}
    </span>
  );
}

const TABS: { label: string; icon: "thermometer" | "plusCircle" | "timer" | "calendar" | "gear" }[] = [
  { label: "Today", icon: "thermometer" },
  { label: "Log", icon: "plusCircle" },
  { label: "Cooling", icon: "timer" },
  { label: "History", icon: "calendar" },
  { label: "Settings", icon: "gear" },
];

export const TAB_BAR = { left: 12, width: 258, bottom: 20, height: 50 } as const;
/** Centre of a tab in screen coordinates (for tap ripples). */
export function tabCenter(index: number): { x: number; y: number } {
  const w = TAB_BAR.width / TABS.length;
  return { x: TAB_BAR.left + w * (index + 0.5), y: 602 - TAB_BAR.bottom - TAB_BAR.height / 2 };
}

/** The iOS 26 floating tab bar (NativeTabs, tint = ink). */
function TabBar({ active }: { active: string }) {
  return (
    <div
      style={{
        position: "absolute",
        left: TAB_BAR.left,
        width: TAB_BAR.width,
        bottom: TAB_BAR.bottom,
        height: TAB_BAR.height,
        borderRadius: 25,
        background: "rgba(255,255,255,0.86)",
        boxShadow: `0 0 0 1px ${L.separator}, 0 8px 24px -6px rgba(11,17,20,0.18)`,
        display: "flex",
        alignItems: "center",
        zIndex: 6,
      }}
    >
      {TABS.map((t) => {
        const on = t.label === active;
        const color = on ? L.text : L.textSecondary;
        const name = t.icon;
        return (
          <div key={t.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, color }}>
            {name === "calendar" || name === "gear" ? <Glyph name={name} size={17} color={color} /> : <Icon name={name} size={17} color={color} />}
            <span style={{ fontSize: 8.5, fontWeight: on ? 700 : 600 }}>{t.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function LargeTitle({ children, top = 46 }: { children: ReactNode; top?: number }) {
  return <div style={{ position: "absolute", top, left: PAD + 2, fontSize: 27, lineHeight: "32px", fontWeight: 700, letterSpacing: -0.6 }}>{children}</div>;
}

function Button({ label, icon, variant, height = 42, style }: { label: string; icon?: ReactNode; variant: "primary" | "secondary" | "heat"; height?: number; style?: CSSProperties }) {
  const fill = variant === "primary" ? { bg: L.text, fg: L.surfaceElevated } : variant === "heat" ? { bg: L.heat, fg: L.onHeat } : { bg: L.surfaceSunken, fg: L.text };
  return (
    <span
      style={{
        height,
        borderRadius: px(radius.md),
        background: fill.bg,
        color: fill.fg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        fontSize: px(type.headline.fontSize) - 1,
        fontWeight: 600,
        letterSpacing: -0.2,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {icon}
      {label}
    </span>
  );
}

/* ------------------------------------------------------------------- Today */

/** Due-now card geometry, shared with the Core scene's tap. */
export const DUE_CARD = { top: 176, pad: 12 } as const;
export const LOG_BUTTON = { x: PAD + DUE_CARD.pad + ((282 - 2 * PAD - 2 * DUE_CARD.pad - 8) * 1.6) / 2.6 / 2, y: DUE_CARD.top + DUE_CARD.pad + 18 + 10 + 38 + 10 + 21 } as const;

function BoardRow({ row, logged }: { row: (typeof BOARD)[number]; logged: boolean }) {
  const walkIn = row.name === "Walk-in cooler";
  const valueF = walkIn && logged ? LOGGED_F : row.valueF;
  const at = walkIn && logged ? "2:02 PM" : row.at;
  const status: PillStatus = walkIn && logged ? "upcoming" : row.status;
  const result = resultOf(row.kind, valueF);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", height: 70, boxSizing: "border-box" }}>
      <KindIcon kind={row.kind} size={32} />
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 2 }}>
        <T v="body" style={{ fontWeight: 600, whiteSpace: "nowrap" }}>
          {row.name}
        </T>
        <T v="callout" style={{ color: L.textSecondary, ...tabular }}>
          {row.kind === "cold-holding" ? COLD_LABEL : HOT_LABEL}
        </T>
        <StatusPill status={status} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3, minWidth: 70 }}>
        <T v="headline" style={{ color: result === "fail" ? L.heatText : L.text, ...tabular, whiteSpace: "nowrap" }}>
          {temp(valueF)}
        </T>
        <StampSm result={result} />
        <T v="caption" style={{ color: L.textSecondary, fontWeight: 500, ...tabular, whiteSpace: "nowrap" }}>
          {`${at} · ${row.initials}`}
        </T>
      </div>
    </div>
  );
}

/** The Today tab (`screens/today/today-screen.tsx`): compliance ring, the due-now card, the board. */
export function TodayScreen({ time, logged = false, logPressed = 0 }: { time: string; logged?: boolean; logPressed?: number }) {
  const rate = logged ? 15 / 16 : 14 / 16;
  const due = !logged;
  return (
    <div style={{ position: "absolute", inset: 0, background: L.surface, fontFamily: FONT.ui, color: L.text }}>
      <StatusBar time={time} color={L.text} />
      <LargeTitle>Today</LargeTitle>
      <span style={{ position: "absolute", top: 48, right: PAD, width: 30, height: 30, borderRadius: 999, background: L.surfaceElevated, boxShadow: `0 0 0 1px ${L.separator}`, display: "grid", placeItems: "center" }}>
        <Icon name="timer" size={16} color={L.text} />
      </span>
      {/* Summary */}
      <div style={{ position: "absolute", top: 86, left: PAD, right: PAD, display: "flex", alignItems: "center", gap: 13 }}>
        <ProgressRing progress={rate} size={80} stroke={9} color={L.warning}>
          <div style={{ fontSize: px(type.title.fontSize) - 2, lineHeight: "24px", fontWeight: 700, letterSpacing: -0.4, ...tabular }}>{Math.round(rate * 100)}%</div>
          <T v="caption" style={{ color: L.textSecondary }}>
            logged
          </T>
        </ProgressRing>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <T v="headline">Rosa&apos;s Tacos</T>
          <T v="callout" style={{ color: L.textSecondary }}>
            Monday, October 5
          </T>
          <T v="callout" style={tabular}>
            {due ? "1 due · 14 logged" : "15 logged"}
          </T>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 3, alignSelf: "flex-start", marginTop: 2, padding: "1px 7px", borderRadius: 999, background: L.passSoft, color: L.passText, fontSize: 10.4, fontWeight: 700 }}>
            <Icon name="pass" size={10} color={L.passText} knock={L.passSoft} />6 days streak
          </span>
        </div>
      </div>
      {/* Due-now card (glass, tinted warning while due). */}
      <div
        style={{
          position: "absolute",
          top: DUE_CARD.top,
          left: PAD,
          right: PAD,
          padding: DUE_CARD.pad,
          borderRadius: px(radius.lg),
          background: due ? L.warningSoft : L.surfaceElevated,
          boxShadow: `0 6px 18px -4px rgba(11,17,20,0.14), 0 0 0 1px ${due ? "rgba(224,162,27,0.25)" : L.separator}`,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6, height: 18 }}>
          {due ? <Glyph name="bell" size={14} color={L.warningText} /> : <Glyph name="clock" size={14} color={L.textSecondary} />}
          <T v="callout" style={{ color: due ? L.warningText : L.textSecondary, fontWeight: 700, flex: 1, ...tabular }}>
            {due ? "Due now · 2:00 PM" : "Next check · 2:30 PM"}
          </T>
          <T v="callout" style={{ color: L.textSecondary, fontWeight: 600, ...tabular }}>
            {due ? "1 m ago" : "in 28 m"}
          </T>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, height: 38 }}>
          <KindIcon kind="cold-holding" size={38} />
          <div>
            <T v="headline">{due ? "Walk-in cooler" : "Reach-in"}</T>
            <T v="callout" style={{ color: L.textSecondary, ...tabular }}>
              {COLD_LABEL}
            </T>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Button
            label="Log"
            variant="primary"
            icon={<Icon name="thermometer" size={17} color={L.surfaceElevated} />}
            style={{ flex: 1.6, transform: `scale(${1 - 0.04 * logPressed})`, background: logPressed > 0.5 ? L.textSecondary : L.text }}
          />
          {due ? <Button label="Snooze 15" variant="secondary" icon={<Icon name="snooze" size={14} color={L.text} />} style={{ flex: 1, background: "rgba(255,255,255,0.7)" }} /> : null}
        </div>
      </div>
      {/* Checkpoints */}
      <div style={{ position: "absolute", top: 332, left: PAD + 4 }}>
        <T v="callout" style={{ color: L.textSecondary, fontWeight: 600 }}>
          Checkpoints
        </T>
      </div>
      <div style={{ position: "absolute", top: 354, left: PAD, right: PAD, borderRadius: px(radius.md), background: L.surfaceElevated, overflow: "hidden" }}>
        {BOARD.slice(0, 3).map((row, i) => (
          <div key={row.name} style={{ borderTop: i ? `1px solid ${L.separator}` : undefined, marginLeft: i ? 54 : 0 }}>
            <div style={{ marginLeft: i ? -54 : 0 }}>
              <BoardRow row={row} logged={logged} />
            </div>
          </div>
        ))}
      </div>
      <TabBar active="Today" />
    </div>
  );
}

/* --------------------------------------------------------------- Log sheet */

export const SHEET_TOP = 40;
const KEYPAD = { top: SHEET_TOP + 278, left: 13, width: 256, pad: 6, gap: 6, keyH: 42 } as const;
const KEYS = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  [".", "0", "back"],
] as const;
export type Key = (typeof KEYS)[number][number];

/** Centre of a key on the phone screen (for tap ripples). */
export function keyCenter(key: Key): { x: number; y: number } {
  const r = KEYS.findIndex((row) => (row as readonly string[]).includes(key));
  const c = (KEYS[r] as readonly string[]).indexOf(key);
  const w = (KEYPAD.width - 2 * KEYPAD.pad - 2 * KEYPAD.gap) / 3;
  return {
    x: KEYPAD.left + KEYPAD.pad + c * (w + KEYPAD.gap) + w / 2,
    y: KEYPAD.top + KEYPAD.pad + r * (KEYPAD.keyH + KEYPAD.gap) + KEYPAD.keyH / 2,
  };
}
const KEYPAD_HEIGHT = 2 * KEYPAD.pad + 4 * KEYPAD.keyH + 3 * KEYPAD.gap;
export const SAVE_BUTTON = { x: 141, y: KEYPAD.top + KEYPAD_HEIGHT + 10 + 22 } as const;

type SheetProps = {
  /** Entry text as typed (`4`, `41`, `41.`, `41.0`). */
  text: string;
  /** The display's settle dip, 0.97 → 1. */
  settle: number;
  /** Key under the finger, with its press amount 0..1. */
  pressed?: { key: Key; p: number } | null;
  savePressed?: number;
  /** Stamp spring progress after Save (0 = not saved). */
  stamp: number;
};

/** The keypad sheet (`screens/log/log-reading-sheet.tsx` + `components/reading-entry.tsx`). */
export function LogSheet({ text, settle, pressed, savePressed = 0, stamp }: SheetProps) {
  const value = text && text !== "." ? Number(text) : null;
  const result = value === null ? null : resultOf("cold-holding", value);
  const color = !text ? L.textTertiary : result === "pass" ? L.passText : result === "fail" ? L.heatText : L.text;
  const saved = stamp > 0;
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: SHEET_TOP, bottom: 0, background: L.surface, borderRadius: "22px 22px 0 0", fontFamily: FONT.ui, color: L.text, boxShadow: "0 -8px 30px -10px rgba(11,17,20,0.35)" }}>
      <div style={{ position: "absolute", top: 5, left: "50%", width: 34, height: 4, borderRadius: 999, background: L.border, transform: "translateX(-50%)" }} />
      {/* Header */}
      <div style={{ position: "absolute", top: 12, left: 12, right: 12, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ position: "absolute", left: 0, width: 30, height: 30, borderRadius: 999, background: L.surfaceSunken, display: "grid", placeItems: "center" }}>
          <Icon name="xmark" size={14} color={L.text} />
        </span>
        <span style={{ fontSize: 14, fontWeight: 650 }}>Walk-in cooler</span>
      </div>
      {/* Context */}
      <div style={{ position: "absolute", top: 54, left: 13, right: 13, display: "flex", alignItems: "center", gap: 10 }}>
        <KindIcon kind="cold-holding" size={30} />
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <T v="callout" style={{ color: L.textSecondary, ...tabular }}>{`Limit ${COLD_LABEL}`}</T>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 3, alignSelf: "flex-start", padding: "2px 8px", borderRadius: 999, background: L.surfaceSunken, fontSize: 10.4, fontWeight: 700, ...tabular }}>
            <Glyph name="clock" size={10} color={L.textSecondary} />
            For the 2:00 PM check
          </span>
        </div>
      </div>
      {/* Reading panel */}
      <div
        style={{
          position: "absolute",
          top: 104,
          left: 13,
          right: 13,
          height: 130,
          borderRadius: px(radius.lg),
          background: L.surfaceElevated,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 5, transform: `scale(${settle})`, marginTop: saved ? -26 * Math.min(1, stamp) : 0 }}>
          <span style={{ fontSize: px(type.display.fontSize) + 4, lineHeight: "48px", fontWeight: 600, letterSpacing: -1, color, ...tabular }}>{text || "––"}</span>
          <span style={{ fontSize: px(type.headline.fontSize), fontWeight: 600, color: L.textSecondary }}>°F</span>
        </div>
        <div style={{ minHeight: 20, display: "flex", alignItems: "center", gap: 6, opacity: saved ? Math.max(0, 1 - stamp * 3) : 1 }}>
          {result ? (
            <>
              <StampSm result={result} />
              <T v="callout" style={{ color: L.textSecondary, ...tabular }}>
                {result === "pass" ? `In range (${COLD_LABEL})` : `above ${temp(41)}`}
              </T>
            </>
          ) : (
            <T v="callout" style={{ color: L.textTertiary }}>
              Type the temperature
            </T>
          )}
        </div>
        {saved && result ? (
          <div style={{ position: "absolute", bottom: 14, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
            <StampLg result={result} p={stamp} />
          </div>
        ) : null}
      </div>
      {/* Unit + initials */}
      <div style={{ position: "absolute", top: 242, left: 13, right: 13, height: 28, display: "flex", alignItems: "center" }}>
        <div style={{ display: "flex", width: 92, height: 28, borderRadius: 9, background: L.surfaceSunken, padding: 2, boxSizing: "border-box" }}>
          <span style={{ flex: 1, borderRadius: 7, background: L.surfaceElevated, display: "grid", placeItems: "center", fontSize: 12, fontWeight: 650, boxShadow: "0 1px 2px rgba(11,17,20,0.12)" }}>°F</span>
          <span style={{ flex: 1, display: "grid", placeItems: "center", fontSize: 12, fontWeight: 600, color: L.textSecondary }}>°C</span>
        </div>
        <span style={{ flex: 1 }} />
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5, height: 28, padding: "0 10px", borderRadius: 999, background: L.surfaceElevated, boxShadow: `inset 0 0 0 1px ${L.border}`, fontSize: 12, fontWeight: 700 }}>
          <Icon name="signature" size={13} color={L.textSecondary} />
          SR
        </span>
      </div>
      {/* Keypad (positioned in screen coordinates, so subtract the sheet offset). */}
      <div
        style={{
          position: "absolute",
          top: KEYPAD.top - SHEET_TOP,
          left: KEYPAD.left,
          width: KEYPAD.width,
          padding: KEYPAD.pad,
          boxSizing: "border-box",
          borderRadius: px(radius.lg),
          background: L.surfaceSunken,
          display: "flex",
          flexDirection: "column",
          gap: KEYPAD.gap,
        }}
      >
        {KEYS.map((row) => (
          <div key={row.join("")} style={{ display: "flex", gap: KEYPAD.gap }}>
            {row.map((k) => {
              const p = pressed && pressed.key === k ? pressed.p : 0;
              const back = k === "back";
              return (
                <span
                  key={k}
                  style={{
                    flex: 1,
                    height: KEYPAD.keyH,
                    borderRadius: px(radius.md),
                    background: p > 0.05 ? L.border : back ? "transparent" : L.surfaceElevated,
                    boxShadow: back || p > 0.05 ? undefined : "0 1px 0 rgba(11,17,20,0.08)",
                    transform: `scale(${1 - 0.04 * p})`,
                    display: "grid",
                    placeItems: "center",
                    fontSize: px(type.title.fontSize) - 2,
                    fontWeight: 600,
                    opacity: saved ? 0.4 : 1,
                    ...tabular,
                  }}
                >
                  {back ? <Icon name="backspace" size={22} color={L.text} /> : k}
                </span>
              );
            })}
          </div>
        ))}
      </div>
      <Button
        label="Save reading"
        variant="primary"
        height={44}
        icon={<Icon name="check" size={16} color={L.surfaceElevated} />}
        style={{
          position: "absolute",
          left: 13,
          right: 13,
          top: KEYPAD.top + KEYPAD_HEIGHT + 10 - SHEET_TOP,
          opacity: !text || saved ? 0.4 : 1,
          transform: `scale(${1 - 0.03 * savePressed})`,
          background: savePressed > 0.5 ? L.textSecondary : L.text,
        }}
      />
    </div>
  );
}

/* ----------------------------------------------------------------- Cooling */

/** The Cooling tab (`screens/cooling/cooling-screen.tsx` + `components/cooling-card.tsx`). */
export function CoolingScreen({ ring }: { ring: number }) {
  return (
    <div style={{ position: "absolute", inset: 0, background: L.surface, fontFamily: FONT.ui, color: L.text }}>
      <StatusBar time="2:02" color={L.text} />
      <LargeTitle>Cooling</LargeTitle>
      <span style={{ position: "absolute", top: 48, right: PAD, width: 30, height: 30, borderRadius: 999, background: L.surfaceElevated, boxShadow: `0 0 0 1px ${L.separator}`, display: "grid", placeItems: "center" }}>
        <Icon name="plus" size={15} color={L.text} />
      </span>
      <div style={{ position: "absolute", top: 90, left: PAD + 4 }}>
        <T v="callout" style={{ color: L.textSecondary, fontWeight: 600 }}>
          Cooling now · 1
        </T>
      </div>
      <div style={{ position: "absolute", top: 112, left: PAD, right: PAD, padding: 13, borderRadius: px(radius.lg), background: L.surfaceElevated, display: "flex", flexDirection: "column", gap: 13 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
          <ProgressRing progress={ring} size={76} stroke={8} color={L.heat}>
            <T v="headline" style={{ ...tabular, whiteSpace: "nowrap" }}>{`${CHILI.minutesLeft} m`}</T>
            <T v="caption" style={{ color: L.textSecondary }}>
              left
            </T>
          </ProgressRing>
          <div style={{ display: "flex", flexDirection: "column", gap: 3, minWidth: 0 }}>
            <T v="headline">{CHILI.name}</T>
            <T v="callout" style={{ color: L.heatText, fontWeight: 600 }}>
              Stage 1 of 2
            </T>
            <T v="callout" style={{ color: L.textSecondary, ...tabular, whiteSpace: "nowrap" }}>
              {stage1Label(CHILI.minutesLeft)}
            </T>
            <T v="caption" style={{ color: L.textTertiary, fontWeight: 500, ...tabular }}>{`Off heat ${CHILI.offHeat} · ${CHILI.initials}`}</T>
          </div>
        </div>
        <Button label="Log reading" variant="secondary" icon={<Icon name="thermometer" size={17} color={L.text} />} />
      </div>
      <Button
        label="Start another timer"
        variant="secondary"
        height={38}
        icon={<Icon name="plus" size={14} color={L.text} />}
        style={{ position: "absolute", top: 286, left: PAD, right: PAD, fontSize: 12.5 }}
      />
      <div style={{ position: "absolute", top: 340, left: PAD + 4 }}>
        <T v="callout" style={{ color: L.textSecondary, fontWeight: 600 }}>
          Last 7 days
        </T>
      </div>
      <div style={{ position: "absolute", top: 362, left: PAD, right: PAD, borderRadius: px(radius.md), background: L.surfaceElevated, overflow: "hidden" }}>
        {[
          { name: "Pinto beans", when: "Sat 3 Oct · 6:10 PM" },
          { name: "Rice, 2 hotel pans", when: "Fri 2 Oct · 8:40 PM" },
        ].map((r, i) => (
          <div key={r.name} style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 12px", borderTop: i ? `1px solid ${L.separator}` : undefined }}>
            <div style={{ flex: 1 }}>
              <T v="body" style={{ fontWeight: 600 }}>
                {r.name}
              </T>
              <T v="caption" style={{ color: L.textSecondary, fontWeight: 500, ...tabular }}>
                {r.when}
              </T>
            </div>
            <StampSm result="pass" label="Cooled" />
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", top: 470, left: PAD + 4, right: PAD + 4 }}>
        <T v="caption" style={{ color: L.textSecondary, fontWeight: 500 }}>
          {`FDA Food Code 3-501.14: cooked food must cool ≤ ${STAGE1_MAX} within 2 h, then ≤ ${STAGE2_MAX} within 6 h of coming off heat.`}
        </T>
      </div>
      <TabBar active="Cooling" />
    </div>
  );
}

/* --------------------------------------------------------- Live Activity */

/** `m:ss` like SwiftUI's `Text(timerInterval:countsDown:)`. */
export function clock(seconds: number): string {
  const s = Math.max(0, Math.ceil(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

/** Lock Screen banner of the `Cooling` Live Activity (`widgets/cooling.activity.tsx`), dark scheme. */
export function CoolingLiveActivity({ secondsLeft, pressLog = 0 }: { secondsLeft: number; pressLog?: number }) {
  const used = 1 - secondsLeft / (CHILI.stage1Minutes * 60);
  return (
    <div style={{ fontFamily: FONT.ui, color: D.text, display: "flex", flexDirection: "column", gap: 10, padding: 2 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Icon name="snowflake" size={21} color={D.heat} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, lineHeight: "18px", fontWeight: 650, whiteSpace: "nowrap" }}>{CHILI.name}</div>
          <div style={{ fontSize: 10.5, lineHeight: "14px", color: D.textSecondary, whiteSpace: "nowrap", ...tabular }}>{`Stage 1 · ≤ ${STAGE1_MAX} by ${CHILI.stage1Due}`}</div>
        </div>
        <div style={{ fontSize: 18, lineHeight: "22px", fontWeight: 650, color: D.heatText, flexShrink: 0, ...tabular }}>{clock(secondsLeft)}</div>
      </div>
      <div style={{ height: 5, borderRadius: 999, background: "rgba(237,241,242,0.16)", overflow: "hidden" }}>
        <div style={{ width: `${used * 100}%`, height: "100%", borderRadius: 999, background: D.heat }} />
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <span
          style={{
            flex: 1,
            height: 34,
            borderRadius: 999,
            background: pressLog > 0.5 ? "rgba(242,104,60,0.38)" : "rgba(242,104,60,0.22)",
            color: D.heatText,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            fontSize: 13,
            fontWeight: 650,
            transform: `scale(${1 - 0.04 * pressLog})`,
          }}
        >
          <Icon name="thermometer" size={15} color={D.heatText} />
          Log reading
        </span>
        <span style={{ flex: 1, height: 34, borderRadius: 999, background: "rgba(237,241,242,0.12)", color: D.textSecondary, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, fontSize: 13, fontWeight: 650 }}>
          <Icon name="trash" size={14} color={D.textSecondary} />
          Discarded
        </span>
      </div>
    </div>
  );
}

/** Dynamic Island compact trailing: the same countdown. */
export function IslandCountdown({ secondsLeft }: { secondsLeft: number }) {
  return (
    <>
      <Icon name="snowflake" size={13} color={D.heat} />
      <span style={{ fontFamily: FONT.ui, fontSize: 11.5, fontWeight: 650, color: D.heat, ...tabular }}>{clock(secondsLeft)}</span>
    </>
  );
}

/* ------------------------------------------------------------------ Widget */

/** Home Screen widget `NextCheck`, systemMedium (`widgets/next-check-widget.tsx`). */
export function NextCheckWidget({ ring }: { ring: number }) {
  return (
    <div
      style={{
        height: 118,
        borderRadius: 22,
        background: L.surfaceElevated,
        padding: "14px 16px",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        fontFamily: FONT.ui,
        color: L.text,
        boxShadow: "0 10px 24px -12px rgba(11,17,20,0.35)",
      }}
    >
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
        <div style={{ fontSize: 9.6, fontWeight: 650, letterSpacing: 0.3, color: L.textSecondary }}>NEXT CHECK</div>
        <div style={{ fontSize: 15.5, lineHeight: "19px", fontWeight: 650 }}>Reach-in</div>
        <div style={{ display: "flex", gap: 4, fontSize: 10.8, ...tabular }}>
          <span style={{ fontWeight: 600 }}>2:30 PM</span>
          <span style={{ color: L.textSecondary }}>in 25 min</span>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <ProgressRing progress={0.94 * ring} size={54} stroke={6} color={L.heat}>
          <span style={{ fontSize: 11.5, fontWeight: 650, ...tabular }}>94%</span>
        </ProgressRing>
        <span style={{ fontSize: 9.6, color: L.textSecondary, ...tabular }}>15/16 today</span>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- PDF page */

const PDF_ROWS: { at: string; name: string; valueF: number | null; kind: Kind; by: string }[] = [
  { at: "10:00 AM", name: "Reach-in", valueF: null, kind: "cold-holding", by: "–" },
  { at: "11:58 AM", name: "Hot well", valueF: 128, kind: "hot-holding", by: "MA" },
  { at: "12:01 PM", name: "Soup kettle", valueF: 152, kind: "hot-holding", by: "MA" },
  { at: "12:04 PM", name: "Walk-in cooler", valueF: 37.8, kind: "cold-holding", by: "SR" },
  { at: "12:06 PM", name: "Reach-in", valueF: 40.1, kind: "cold-holding", by: "SR" },
  { at: "2:02 PM", name: "Walk-in cooler", valueF: LOGGED_F, kind: "cold-holding", by: "SR" },
];

/** A slice of the inspector PDF (`screens/history/report-html.ts`, as the landing `PdfMock` draws it). Paper is light. */
export function PdfPage({ rowsIn, actionIn }: { rowsIn: (i: number) => number; actionIn: number }) {
  return (
    <div style={{ width: 520, background: "#FFFFFF", borderRadius: 4, padding: "26px 28px 24px", boxSizing: "border-box", color: L.text, fontFamily: FONT.archivo, boxShadow: "0 0 0 1px rgba(18,25,28,0.10), 0 30px 60px -24px rgba(11,17,20,0.35)" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", borderBottom: `1.5px solid ${L.text}`, paddingBottom: 10 }}>
        <div>
          <div style={{ fontSize: 21, fontWeight: 700, letterSpacing: -0.2 }}>Temperature log · Rosa&apos;s Tacos</div>
          <div style={{ fontSize: 13, color: L.textSecondary, marginTop: 3, ...tabular }}>Monday 5 October 2026 · America/Chicago · °F</div>
        </div>
        <ThermoMark size={32} />
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 8, fontSize: 14, ...tabular }}>
        <thead>
          <tr style={{ color: L.textSecondary, textAlign: "left" }}>
            {["Time", "Checkpoint", "Reading", "Result", "By"].map((h) => (
              <th key={h} style={{ padding: "6px 0", fontWeight: 650 }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PDF_ROWS.map((r, i) => {
            const result = r.valueF === null ? null : resultOf(r.kind, r.valueF);
            const p = rowsIn(i);
            return (
              <tr key={`${r.at}-${r.name}`} style={{ borderTop: `1px solid ${L.separator}`, opacity: p, transform: `translateY(${(1 - p) * 8}px)` }}>
                <td style={{ padding: "7px 0", whiteSpace: "nowrap" }}>{r.at}</td>
                <td style={{ padding: "7px 0" }}>{r.name}</td>
                {result === null ? (
                  <td colSpan={2} style={{ padding: "7px 0", color: L.textSecondary }}>
                    Missed: no reading
                  </td>
                ) : (
                  <>
                    <td style={{ padding: "7px 0" }}>{temp(r.valueF!)}</td>
                    <td style={{ padding: "7px 0", fontWeight: 700, color: result === "pass" ? L.passText : L.heatText }}>{result === "pass" ? "Pass" : "Fail"}</td>
                  </>
                )}
                <td style={{ padding: "7px 0" }}>{r.by}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div
        style={{
          marginTop: 12,
          borderRadius: 4,
          background: L.heatSoft,
          color: L.heatText,
          padding: "8px 10px",
          fontSize: 13.5,
          lineHeight: "19px",
          opacity: actionIn,
          transform: `translateY(${(1 - actionIn) * 8}px)`,
          ...tabular,
        }}
      >
        <div style={{ fontWeight: 700 }}>Corrective action · Hot well, 11:58 AM</div>
        <div>Reheated to 168 °F, rechecked 12:20 PM (MA)</div>
      </div>
      <div style={{ display: "flex", gap: 24, marginTop: 18, fontSize: 12, color: L.textSecondary }}>
        <div style={{ flex: 2, borderTop: `1px solid ${L.border}`, paddingTop: 5 }}>Reviewed by (name, signature)</div>
        <div style={{ flex: 1, borderTop: `1px solid ${L.border}`, paddingTop: 5 }}>Date</div>
      </div>
    </div>
  );
}

/** Interpolation helper re-exported for scenes. */
export const ramp = (frame: number, a: number, b: number) => interpolate(frame, [a, b], [0, 1], clamp);
