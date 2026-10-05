import type { CSSProperties, ReactNode } from "react";
import { interpolate } from "remotion";
import { FONT, tabular } from "../../shared/fonts";
import { Glyph, type GlyphName } from "../../shared/Glyph";
import { StatusBar } from "../../shared/StatusBar";
import { C, STORY, clientColorHex, clockAt, dollars, earnedCents, hms, px, radius, type } from "./tokens";

/**
 * Punchcard screens recreated in DOM from `apps/mobile/src/screens/clock/*` and
 * `src/components/*`, in the dark scheme, at the phone scale `S`.
 */

const PAD = 14;
const SMITH = clientColorHex("blue");

function T({ v, style, children }: { v: keyof typeof type; style?: CSSProperties; children: ReactNode }) {
  const t = type[v];
  return (
    <div
      style={{
        fontSize: px(t.fontSize),
        lineHeight: `${px(t.lineHeight)}px`,
        fontWeight: Number(t.fontWeight),
        letterSpacing: px(t.letterSpacing),
        ...(t.tabular ? tabular : null),
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** The mark: a safety-orange time card with one punched hole (`components/marketing/wordmark.tsx`). */
export function PunchMark({ height = 32, hole = C.surface }: { height?: number; hole?: string }) {
  return (
    <svg viewBox="0 0 24 32" height={height} width={(height * 24) / 32} aria-hidden style={{ display: "block" }}>
      <rect x="0" y="0" width="24" height="32" rx="4" fill={C.accent} />
      <rect x="5" y="6" width="14" height="2.5" rx="1.25" fill={C.onAccent} opacity="0.85" />
      <rect x="5" y="11" width="9" height="2.5" rx="1.25" fill={C.onAccent} opacity="0.85" />
      <circle cx="12" cy="23" r="4" fill={hole} />
    </svg>
  );
}

/** The app icon (`apps/mobile/assets/images/icon.png`): a punch clock on safety orange. */
export function PunchAppIcon({ size = 50 }: { size?: number }) {
  return (
    <svg viewBox="0 0 1024 1024" width={size} height={size} aria-hidden style={{ display: "block", borderRadius: size * 0.26 }}>
      <rect width="1024" height="1024" fill="#FF6A1A" />
      <circle cx="512" cy="448" r="190" fill="none" stroke="#fff" strokeWidth="58" />
      <path d="M512 340v108l112-64" fill="none" stroke="#fff" strokeWidth="46" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="512" cy="448" r="32" fill="#fff" />
      <rect x="352" y="694" width="320" height="110" rx="18" fill="#fff" />
      {[424, 512, 600].map((cx) => (
        <circle key={cx} cx={cx} cy="749" r="19" fill="#FF6A1A" />
      ))}
    </svg>
  );
}

function ClientBar({ color, height = 28 }: { color: string; height?: number }) {
  return <span style={{ width: 4, height, borderRadius: 999, background: color, flexShrink: 0 }} />;
}

function SectionHeader({ title }: { title: string }) {
  return (
    <T v="caption" style={{ color: C.textSecondary, textTransform: "uppercase", letterSpacing: 0.6, padding: "0 12px 6px" }}>
      {title}
    </T>
  );
}

function Button({ title, icon, style }: { title: string; icon: GlyphName; style?: CSSProperties }) {
  return (
    <div
      style={{
        flex: 1,
        height: px(56),
        borderRadius: px(radius.md),
        background: C.surfaceSunken,
        color: C.text,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        ...style,
      }}
    >
      <Glyph name={icon} size={16} color={C.text} />
      <T v="callout" style={{ fontWeight: 600 }}>
        {title}
      </T>
    </div>
  );
}

function EntryRows() {
  return (
    <div style={{ background: C.surfaceElevated, borderRadius: px(radius.md), overflow: "hidden" }}>
      {STORY.earlier.map((e, i) => (
        <div key={e.client}>
          {i > 0 ? <div style={{ height: 1, background: C.separator, marginLeft: 12 }} /> : null}
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px" }}>
            <ClientBar color={clientColorHex(e.color)} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <T v="callout" style={{ fontWeight: 600 }}>
                {e.client}
              </T>
              <T v="caption" style={{ color: C.textSecondary, fontWeight: 400 }}>
                {e.job}
              </T>
            </div>
            <div style={{ textAlign: "right", ...tabular }}>
              <T v="callout" style={{ fontWeight: 600 }}>
                {e.time}
              </T>
              <T v="caption" style={{ color: C.textSecondary, fontWeight: 400 }}>
                {e.earned}
              </T>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function QuickStartCard({ client, job, color }: { client: string; job: string; color: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "8px 12px",
        borderRadius: px(radius.md),
        background: C.surfaceElevated,
      }}
    >
      <ClientBar color={color} />
      <div style={{ flex: 1 }}>
        <T v="body" style={{ fontWeight: 600 }}>
          {client}
        </T>
        <T v="caption" style={{ color: C.textSecondary, fontWeight: 400 }}>
          {job} · $72.00/h
        </T>
      </div>
      <span style={{ width: 34, height: 34, borderRadius: 999, background: C.accentSoft, display: "grid", placeItems: "center" }}>
        <Glyph name="play" size={15} color={C.accentText} />
      </span>
    </div>
  );
}

const TABS: { label: string; icon: GlyphName }[] = [
  { label: "Clock", icon: "clock" },
  { label: "Timesheet", icon: "list" },
  { label: "Clients", icon: "people" },
  { label: "Reports", icon: "chart" },
  { label: "Settings", icon: "gear" },
];

function TabBar() {
  return (
    <div
      style={{
        position: "absolute",
        left: 12,
        right: 12,
        bottom: 20,
        height: 52,
        borderRadius: 26,
        background: C.surfaceElevated,
        boxShadow: `0 0 0 1px ${C.separator}, 0 8px 20px -8px rgba(0,0,0,0.6)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "0 6px",
      }}
    >
      {TABS.map((t, i) => {
        const color = i === 0 ? C.accentText : C.textSecondary;
        return (
          <div key={t.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, color }}>
            <Glyph name={t.icon} size={17} color={color} />
            <span style={{ fontSize: 8.5, fontWeight: 600 }}>{t.label}</span>
          </div>
        );
      })}
    </div>
  );
}

/** Layout constants for the Clock screen, shared with the scenes (tap targets). */
export const CLOCK_LAYOUT = {
  headerTop: 98,
  idleHeader: 64,
  runningCard: 222,
  gap: 12,
  buttonHeight: px(88),
} as const;

export function clockButtonTop(run: number): number {
  const { headerTop, idleHeader, runningCard, gap } = CLOCK_LAYOUT;
  return headerTop + interpolate(run, [0, 1], [idleHeader, runningCard]) + gap;
}

type ClockProps = {
  /** 0 = idle (Ready to work), 1 = running; values between morph the screen. */
  run: number;
  /** Elapsed seconds on the running entry. */
  seconds: number;
};

/** The Clock tab, idle or running (`clock-screen.tsx`, `running-card.tsx`, `clock-button.tsx`). */
export function ClockScreen({ run, seconds }: ClockProps) {
  const { headerTop, runningCard, buttonHeight } = CLOCK_LAYOUT;
  const buttonTop = clockButtonTop(run);
  const belowTop = buttonTop + buttonHeight + 16;
  const runBg = run > 0.5 ? C.danger : C.accent;
  const statusTime = run > 0 ? clockAt(seconds) : "7:54";
  return (
    <div style={{ position: "absolute", inset: 0, background: C.surface, color: C.text, fontFamily: FONT.ui }}>
      <StatusBar time={statusTime} color={C.text} />
      <div style={{ position: "absolute", top: 50, left: PAD + 2, fontSize: 27, lineHeight: "34px", fontWeight: 700, letterSpacing: -0.6 }}>
        Mon 5 Oct
      </div>

      {/* Idle header. */}
      <div style={{ position: "absolute", top: headerTop, left: PAD + 2, right: PAD + 2, opacity: interpolate(run, [0, 0.4], [1, 0], { extrapolateRight: "clamp" }) }}>
        <T v="title">Ready to work</T>
        <T v="callout" style={{ color: C.textSecondary, marginTop: 4 }}>
          One tap starts the clock. It keeps running on your Lock Screen.
        </T>
      </div>

      {/* Running card (GlassCard → elevated surface on Android / pre-26). */}
      <div
        style={{
          position: "absolute",
          top: headerTop,
          left: PAD,
          right: PAD,
          height: runningCard,
          borderRadius: px(radius.lg),
          background: C.surfaceElevated,
          boxShadow: `0 0 0 1px ${C.separator}`,
          padding: 18,
          opacity: interpolate(run, [0.35, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          transform: `translateY(${(1 - run) * -8}px) scale(${0.97 + 0.03 * run})`,
          transformOrigin: "top center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 11, height: 11, borderRadius: 999, background: SMITH }} />
          <div>
            <T v="headline">{STORY.client}</T>
            <T v="caption" style={{ color: C.textSecondary, fontWeight: 400 }}>
              {STORY.job} · since {STORY.startedAt}
            </T>
          </div>
        </div>
        <T v="display" style={{ marginTop: 10 }}>
          {hms(seconds)}
        </T>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 2 }}>
          <T v="headline" style={tabular}>
            {dollars(earnedCents(seconds))}
          </T>
          <T v="caption" style={{ color: C.textSecondary, fontWeight: 400 }}>
            earned at $60.00/h
          </T>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <Button title="Break" icon="cup" />
          <Button title="Switch job" icon="swap" />
        </div>
      </div>

      {/* The one big button: Start (orange) morphs into Stop. */}
      <div
        style={{
          position: "absolute",
          top: buttonTop,
          left: PAD,
          right: PAD,
          height: buttonHeight,
          borderRadius: px(radius.lg),
          background: runBg,
          transition: "none",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "0 18px",
            color: C.onAccent,
            opacity: 1 - Math.min(1, run * 2),
            transform: `translateY(${-8 * run}px)`,
          }}
        >
          <Glyph name="play" size={24} color={C.onAccent} />
          <div>
            <T v="title">Start</T>
            <T v="callout" style={{ opacity: 0.8 }}>
              {STORY.client} · {STORY.job}
            </T>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            color: C.onAccent,
            opacity: Math.max(0, run * 2 - 1),
            transform: `translateY(${8 * (1 - run)}px)`,
          }}
        >
          <Glyph name="stop" size={24} color={C.onAccent} />
          <T v="title">Stop</T>
        </div>
      </div>

      {/* Idle: quick start. */}
      <div style={{ position: "absolute", top: belowTop, left: PAD, right: PAD, opacity: 1 - Math.min(1, run * 2.5) }}>
        <SectionHeader title="Quick start" />
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {STORY.earlier.map((e) => (
            <QuickStartCard key={e.client} client={e.client} job={e.job} color={clientColorHex(e.color)} />
          ))}
        </div>
      </div>

      {/* Running: earlier today. */}
      <div style={{ position: "absolute", top: belowTop, left: PAD, right: PAD, opacity: interpolate(run, [0.6, 1], [0, 1], { extrapolateLeft: "clamp" }) }}>
        <SectionHeader title="Earlier today" />
        <EntryRows />
      </div>

      <TabBar />
    </div>
  );
}

/** Lock Screen Live Activity banner (`src/widgets/running-entry.activity.tsx`, as the landing hero draws it). */
export function PunchLiveActivity({ seconds, pressBreak = 0 }: { seconds: number; pressBreak?: number }) {
  return (
    <div style={{ fontFamily: FONT.ui }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ width: 6, height: 44, borderRadius: 999, background: SMITH }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 600, lineHeight: "20px" }}>{STORY.client}</div>
          <div style={{ fontSize: 13, lineHeight: "18px", color: "rgba(242,239,232,0.7)", ...tabular }}>
            {dollars(earnedCents(seconds)).replace(/\.\d\d$/, "")} so far
          </div>
        </div>
        <div style={{ fontSize: 28, lineHeight: "30px", fontWeight: 600, letterSpacing: -0.6, color: C.accent, ...tabular }}>{hms(seconds)}</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 12, fontSize: 14, fontWeight: 600 }}>
        <span
          style={{
            borderRadius: 999,
            background: "rgba(255,255,255,0.12)",
            padding: "8px 0",
            textAlign: "center",
            transform: `scale(${1 - 0.04 * pressBreak})`,
          }}
        >
          Break
        </span>
        <span style={{ borderRadius: 999, background: C.accent, color: C.onAccent, padding: "8px 0", textAlign: "center" }}>Stop</span>
      </div>
    </div>
  );
}

/** Dynamic Island compact: the mark on the left, elapsed time on the right. */
export function PunchIsland({ seconds, reveal }: { seconds: number; reveal: number }) {
  return (
    <>
      <span style={{ opacity: reveal }}>
        <PunchMark height={15} hole="#000" />
      </span>
      <span style={{ opacity: reveal, color: C.accent, fontFamily: FONT.ui, fontSize: 12.5, fontWeight: 650, ...tabular }}>{hms(seconds)}</span>
    </>
  );
}

/** Home Screen widget, small (`src/widgets/today-widget.tsx`): today's total and the running job. */
export function TodayWidget({ seconds, size = 118 }: { seconds: number; size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 22,
        background: C.surface,
        padding: "14px 14px 13px",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        fontFamily: FONT.ui,
        color: C.text,
        boxShadow: "0 10px 24px -12px rgba(0,0,0,0.6)",
      }}
    >
      <span style={{ fontSize: 10.5, fontWeight: 650, color: C.textSecondary, letterSpacing: 0.4 }}>TODAY</span>
      <span style={{ fontSize: 21, lineHeight: "26px", fontWeight: 700, letterSpacing: -0.4, ...tabular }}>{hms(STORY.earlierSeconds + seconds)}</span>
      <span style={{ flex: 1 }} />
      <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11.5, fontWeight: 600, whiteSpace: "nowrap" }}>
        <span style={{ width: 7, height: 7, borderRadius: 999, background: SMITH, flexShrink: 0 }} />
        {STORY.client}
      </span>
    </div>
  );
}
