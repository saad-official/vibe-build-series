import type { CSSProperties, ReactNode } from "react";
import { interpolate } from "remotion";
import { FONT, tabular } from "../../shared/fonts";
import { Glyph, type GlyphName } from "../../shared/Glyph";
import { StatusBar } from "../../shared/StatusBar";
import { D, DOSES, L, px, radius, type, type Motif } from "./tokens";

/**
 * Dosely screens recreated in DOM from `apps/mobile/src/screens/today/*`, `screens/circle/*` and
 * `src/components/*` (progress ring, check button, state pill), light scheme, at phone scale.
 */

type Palette = Record<keyof typeof L, string>;
const PAD = 14;

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
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** The capsule mark: one half filled, like a dose taken (`components/marketing/logo.tsx`). */
export function CapsuleMark({ size = 28, color }: { size?: number; color: string }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden style={{ display: "block", color }}>
      <g transform="rotate(-40 16 16)">
        <rect x="3" y="10.5" width="26" height="11" rx="5.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <path d="M16 11.5H8.5a4.5 4.5 0 0 0 0 9H16z" fill="currentColor" />
      </g>
    </svg>
  );
}

const MOTIF_GLYPHS: Partial<Record<Motif, ReactNode>> = {
  hearts: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" fill="currentColor" />,
  clover: (
    <g fill="currentColor">
      <circle cx="12" cy="7.5" r="3.8" />
      <circle cx="7.6" cy="12.4" r="3.8" />
      <circle cx="16.4" cy="12.4" r="3.8" />
      <path d="M12 12v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </g>
  ),
  pumpkins: (
    <g fill="currentColor">
      <path d="M12 7.5c-5 0-8 2.9-8 6.6 0 3.6 3 5.9 8 5.9s8-2.3 8-5.9c0-3.7-3-6.6-8-6.6z" />
      <path d="M12 8V4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </g>
  ),
  lights: (
    <g fill="currentColor">
      <path d="M2 6c5 4.5 15 4.5 20 0" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="6" cy="12" rx="2" ry="3" />
      <ellipse cx="12" cy="13.5" rx="2" ry="3" />
      <ellipse cx="18" cy="12" rx="2" ry="3" />
    </g>
  ),
};

/** The (alternate) app icon: the capsule on the theme accent, motif in the corner (`theme-icon.tsx`). */
export function DoselyAppIcon({ size = 50, accent = L.accent, onAccent = L.onAccent, motif = "none" }: { size?: number; accent?: string; onAccent?: string; motif?: Motif }) {
  return (
    <span
      style={{
        position: "relative",
        width: size,
        height: size,
        borderRadius: size * 0.275,
        background: accent,
        color: onAccent,
        display: "grid",
        placeItems: "center",
        flexShrink: 0,
      }}
    >
      <CapsuleMark size={size * 0.6} color={onAccent} />
      {motif !== "none" && MOTIF_GLYPHS[motif] ? (
        <svg viewBox="0 0 24 24" width={size * 0.25} height={size * 0.25} style={{ position: "absolute", right: size * 0.1, bottom: size * 0.1, opacity: 0.9, color: onAccent }} aria-hidden>
          {MOTIF_GLYPHS[motif]}
        </svg>
      ) : null}
    </span>
  );
}

/** Progress ring (`components/progress-ring.tsx`), drawn with an SVG arc. */
export function ProgressRing({
  progress,
  size,
  stroke,
  accent = L.accent,
  track = L.surfaceSunken,
  children,
}: {
  progress: number;
  size: number;
  stroke: number;
  accent?: string;
  track?: string;
  children?: ReactNode;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }} aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={accent}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${c * Math.max(0.001, progress)} ${c}`}
        />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>{children}</div>
    </div>
  );
}

/** The Taken control (`components/check-button.tsx`): disc fills, check springs in. `p` is 0..1. */
export function CheckDisc({ p, size = 40, c = L }: { p: number; size?: number; c?: Palette }) {
  const fill = Math.min(1, Math.max(0, p));
  const check = interpolate(p, [0.35, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <span
      style={{
        position: "relative",
        width: size,
        height: size,
        borderRadius: 999,
        border: `2.5px solid ${p > 0.05 ? c.accent : c.border}`,
        display: "grid",
        placeItems: "center",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          position: "absolute",
          width: size - 5,
          height: size - 5,
          borderRadius: 999,
          background: c.accent,
          opacity: fill,
          transform: `scale(${0.55 + 0.45 * Math.min(1, p)})`,
        }}
      />
      <span style={{ position: "relative", opacity: check, transform: `scale(${0.4 + 0.6 * check}) rotate(${-20 + 20 * check}deg)` }}>
        <Glyph name="check" size={Math.round(size * 0.5)} color={c.onAccent} />
      </span>
    </span>
  );
}

const TABS: { label: string; icon: GlyphName }[] = [
  { label: "Today", icon: "calendar" },
  { label: "Meds", icon: "capsule" },
  { label: "History", icon: "chart" },
  { label: "Circle", icon: "people" },
  { label: "Settings", icon: "gear" },
];

function TabBar({ active }: { active: string }) {
  return (
    <div
      style={{
        position: "absolute",
        left: 12,
        right: 12,
        bottom: 20,
        height: 52,
        borderRadius: 26,
        background: L.surfaceElevated,
        boxShadow: `0 0 0 1px ${L.separator}, 0 8px 24px -6px rgba(28,36,48,0.16)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "0 6px",
        zIndex: 6,
      }}
    >
      {TABS.map((t) => {
        const color = t.label === active ? L.accentText : L.textSecondary;
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

function MedDot({ color, size = 10 }: { color: string; size?: number }) {
  return <span style={{ width: size, height: size, borderRadius: 999, background: color, flexShrink: 0 }} />;
}

function DoseCard({ dose, checked }: { dose: (typeof DOSES)[number]; checked: number }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 10px 8px 12px",
        borderRadius: px(radius.md),
        background: L.surfaceElevated,
        boxShadow: `0 1px 3px rgba(28,36,48,0.06), 0 0 0 1px ${L.separator}`,
      }}
    >
      <MedDot color={dose.color} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <T v="body" style={{ fontWeight: 600 }}>
          {dose.name} <span style={{ fontWeight: 400, color: L.textSecondary }}>{dose.strength}</span>
        </T>
        <T v="caption" style={{ color: L.textSecondary, fontWeight: 400 }}>
          {dose.detail}
        </T>
      </div>
      <CheckDisc p={checked} size={36} />
    </div>
  );
}

function GroupLabel({ label, done }: { label: string; done?: number }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "0 4px 5px" }}>
      <T v="caption" style={{ color: L.textSecondary, fontWeight: 600, ...tabular }}>
        {label}
      </T>
      {done ? (
        <T v="caption" style={{ color: L.success, fontWeight: 600, opacity: done }}>
          Taken
        </T>
      ) : null}
    </div>
  );
}

type TodayProps = {
  time: string;
  /** Doses taken, animatable (1 → 2 springs the ring). */
  taken: number;
  /** 0..1, Lisinopril's check. */
  lisinopril: number;
};

/** The Today tab for Mum (`screens/today/today-screen.tsx`). */
export function TodayScreen({ time, taken, lisinopril }: TodayProps) {
  const total = 4;
  const remaining = Math.round(total - taken);
  return (
    <div style={{ position: "absolute", inset: 0, background: L.surface, fontFamily: FONT.ui, color: L.text }}>
      <StatusBar time={time} color={L.text} />
      <div style={{ position: "absolute", top: 50, left: PAD, display: "flex", gap: 6 }}>
        <span style={{ borderRadius: 999, padding: "3px 12px", fontSize: 11, fontWeight: 500, color: L.textSecondary, boxShadow: `inset 0 0 0 1px ${L.border}` }}>Me</span>
        <span style={{ borderRadius: 999, padding: "3px 12px", fontSize: 11, fontWeight: 600, color: L.surface, background: L.text }}>Mum</span>
      </div>
      <div style={{ position: "absolute", top: 80, left: PAD + 2 }}>
        <div style={{ fontSize: 27, lineHeight: "32px", fontWeight: 600, letterSpacing: -0.6 }}>Today</div>
        <T v="caption" style={{ color: L.textSecondary, fontWeight: 400 }}>
          Monday, October 5
        </T>
      </div>
      <div style={{ position: "absolute", top: 138, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <ProgressRing progress={taken / total} size={112} stroke={10}>
          <div style={{ fontSize: px(type.display.fontSize), lineHeight: 1, fontWeight: 600, letterSpacing: -0.6, ...tabular }}>
            {Math.round(taken)}/{total}
          </div>
          <T v="caption" style={{ color: L.textSecondary, marginTop: 2 }}>
            taken
          </T>
        </ProgressRing>
        <T v="headline" style={{ marginTop: 10 }}>
          {remaining} doses still to take
        </T>
      </div>
      <div style={{ position: "absolute", top: 296, left: PAD, right: PAD, display: "flex", flexDirection: "column", gap: 10 }}>
        <div>
          <GroupLabel label="8:00 AM" done={1} />
          <DoseCard dose={DOSES[0]} checked={1} />
        </div>
        <div>
          <GroupLabel label="8:30 AM" done={lisinopril} />
          <DoseCard dose={DOSES[1]} checked={lisinopril} />
        </div>
        <div>
          <GroupLabel label="6:00 PM" />
          <DoseCard dose={DOSES[2]} checked={0} />
        </div>
      </div>
      <TabBar active="Today" />
    </div>
  );
}

function StatePill({ label, tone }: { label: string; tone: "success" | "neutral" }) {
  const bg = tone === "success" ? L.successSoft : L.surfaceSunken;
  const fg = tone === "success" ? L.success : L.textSecondary;
  return (
    <span style={{ borderRadius: 999, padding: "2px 8px", fontSize: 10.5, fontWeight: 600, background: bg, color: fg, whiteSpace: "nowrap", ...tabular }}>{label}</span>
  );
}

/** "What your circle sees" (`screens/circle/circle-today-screen.tsx`), the owner's preview of the caregiver view. */
export function CircleView({ allGood }: { allGood: number }) {
  const rows = [
    { time: "8:00 AM", dose: DOSES[0], pill: "Taken 8:02", tone: "success" as const },
    { time: "8:30 AM", dose: DOSES[1], pill: "Taken 8:30", tone: "success" as const },
    { time: "6:00 PM", dose: DOSES[2], pill: "Later", tone: "neutral" as const },
    { time: "9:30 PM", dose: DOSES[3], pill: "Later", tone: "neutral" as const },
  ];
  return (
    <div style={{ position: "absolute", inset: 0, background: L.surface, fontFamily: FONT.ui, color: L.text }}>
      <StatusBar time="8:31" color={L.text} />
      <div style={{ position: "absolute", top: 50, left: 10, display: "flex", alignItems: "center", gap: 2, color: L.accentText, fontSize: 13, fontWeight: 500 }}>
        <Glyph name="chevronDown" size={16} color={L.accentText} style={{ transform: "rotate(90deg)" }} />
        Circle
      </div>
      <div style={{ position: "absolute", top: 50, left: 0, right: 0, textAlign: "center", fontSize: 13.5, fontWeight: 600 }}>What your circle sees</div>
      <div style={{ position: "absolute", top: 86, left: PAD, right: PAD }}>
        <T v="headline">Monday, October 5</T>
        <div
          style={{
            marginTop: 10,
            borderRadius: px(radius.md),
            background: L.surfaceElevated,
            boxShadow: `0 0 0 1px ${L.separator}`,
            overflow: "hidden",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px" }}>
            <span style={{ width: 30, height: 30, borderRadius: 999, background: L.accentSoft, color: L.accentText, display: "grid", placeItems: "center", fontSize: 13, fontWeight: 700 }}>M</span>
            <div style={{ flex: 1 }}>
              <T v="body" style={{ fontWeight: 600 }}>
                Mum
              </T>
              <T v="caption" style={{ color: L.textSecondary, fontWeight: 600 }}>
                2 of 4 taken
              </T>
            </div>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                borderRadius: 999,
                padding: "3px 9px 3px 6px",
                background: L.successSoft,
                color: L.success,
                fontSize: 11,
                fontWeight: 700,
                opacity: allGood,
                transform: `scale(${0.9 + 0.1 * allGood})`,
              }}
            >
              <Glyph name="check" size={12} color={L.success} />
              All good
            </span>
          </div>
          {rows.map((r) => (
            <div key={r.dose.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 12px", borderTop: `1px solid ${L.separator}` }}>
              <T v="callout" style={{ color: L.textSecondary, width: 56, fontSize: 11, ...tabular }}>
                {r.time}
              </T>
              <T v="callout" style={{ fontWeight: 600, flex: 1, fontSize: 12 }}>
                {r.dose.name}
              </T>
              <StatePill label={r.pill} tone={r.tone} />
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, display: "flex", gap: 10, padding: "10px 12px", borderRadius: px(radius.md), background: L.surfaceElevated, boxShadow: `0 0 0 1px ${L.separator}` }}>
          <Glyph name="bell" size={16} color={L.accentText} />
          <div>
            <T v="callout" style={{ fontWeight: 600, fontSize: 12 }}>
              When they&apos;re told
            </T>
            <T v="caption" style={{ color: L.textSecondary, fontWeight: 400 }}>
              Only when a dose is still unmarked after its window and your chosen delay.
            </T>
          </div>
        </div>
      </div>
      <TabBar active="Circle" />
    </div>
  );
}

/** Lock Screen dose-window Live Activity (`src/widgets/dose-window`, as the landing hero draws it). */
export function DoseLiveActivity({ minutesLeft, taken }: { minutesLeft: number; taken: number }) {
  const before = 1 - Math.min(1, taken * 3);
  const after = interpolate(taken, [0.2, 0.6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "relative", fontFamily: FONT.ui, color: D.text }}>
      <div style={{ opacity: before }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 30, height: 30, borderRadius: 999, background: D.accent, display: "grid", placeItems: "center", flexShrink: 0 }}>
            <CapsuleMark size={18} color={D.onAccent} />
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11.5, lineHeight: "15px", color: D.textSecondary, whiteSpace: "nowrap" }}>Mum, morning dose</div>
            <div style={{ fontSize: 15, lineHeight: "20px", fontWeight: 600, whiteSpace: "nowrap" }}>Lisinopril 10 mg</div>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <div style={{ fontSize: 18, lineHeight: "22px", fontWeight: 600, whiteSpace: "nowrap", ...tabular }}>{minutesLeft} min</div>
            <div style={{ fontSize: 10, color: D.textSecondary, whiteSpace: "nowrap" }}>left in window</div>
          </div>
        </div>
        <div style={{ marginTop: 10, height: 6, borderRadius: 999, background: "rgba(238,243,244,0.18)", overflow: "hidden" }}>
          <div style={{ width: `${(minutesLeft / 60) * 100}%`, height: "100%", borderRadius: 999, background: D.accent }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 10, fontSize: 14, fontWeight: 600 }}>
          <span style={{ borderRadius: 999, background: D.accent, color: D.onAccent, padding: "8px 0", textAlign: "center" }}>Taken</span>
          <span style={{ borderRadius: 999, background: D.surfaceSunken, color: D.text, padding: "8px 0", textAlign: "center", boxShadow: `inset 0 0 0 1px ${D.border}` }}>
            Snooze 10 min
          </span>
        </div>
      </div>
      {taken > 0 ? (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", gap: 14, padding: "0 8px", opacity: after }}>
          <CheckDisc p={taken} size={52} c={D} />
          <div>
            <div style={{ fontSize: 17, lineHeight: "22px", fontWeight: 600 }}>Lisinopril 10 mg</div>
            <div style={{ fontSize: 13, lineHeight: "18px", color: D.textSecondary, ...tabular }}>Taken at 8:30 AM</div>
            <div style={{ fontSize: 13, lineHeight: "18px", color: D.textSecondary, ...tabular }}>2 of 4 today</div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

/** Home Screen widget, small (`NextDose`): today's ring and the next dose. */
export function NextDoseWidget({ size = 118, progress = 0.5 }: { size?: number; progress?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 22,
        background: L.surfaceElevated,
        padding: 13,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: FONT.ui,
        color: L.text,
        boxShadow: "0 10px 24px -12px rgba(28,36,48,0.35)",
      }}
    >
      <ProgressRing progress={progress} size={40} stroke={5}>
        <span style={{ fontSize: 10.5, fontWeight: 600, ...tabular }}>2/4</span>
      </ProgressRing>
      <div>
        <div style={{ fontSize: 10.5, color: L.textSecondary }}>Next</div>
        <div style={{ fontSize: 14, lineHeight: "18px", fontWeight: 600 }}>Metformin</div>
        <div style={{ fontSize: 11.5, color: L.accentText, fontWeight: 600, ...tabular }}>6:00 PM</div>
      </div>
    </div>
  );
}
