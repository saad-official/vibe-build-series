import type { CSSProperties, ReactNode } from "react";
import { FONT, tabular } from "./fonts";
import { Glyph } from "./Glyph";

export type MaterialScheme = {
  /** Notification shade behind the cards. */
  shade: string;
  card: string;
  onCard: string;
  onCardMuted: string;
  /** Tonal action buttons. */
  action: string;
  onAction: string;
  track: string;
};

export const MATERIAL_DARK: MaterialScheme = {
  shade: "#111214",
  card: "#24262B",
  onCard: "#E6E1E5",
  onCardMuted: "#B2ADB6",
  action: "#3A3C42",
  onAction: "#E6E1E5",
  track: "#3A3C42",
};

export const MATERIAL_LIGHT: MaterialScheme = {
  shade: "#E3E8EA",
  card: "#FFFFFF",
  onCard: "#1B1C1E",
  onCardMuted: "#4C5157",
  action: "#E7ECEE",
  onAction: "#1B1C1E",
  track: "#DCE2E5",
};

type Props = {
  scheme: MaterialScheme;
  appName: string;
  /** Small app badge content (a glyph), drawn on `badgeColor`. */
  badge: ReactNode;
  badgeColor: string;
  title: string;
  text: string;
  subText?: string;
  /** Header timestamp or chronometer. */
  when?: string;
  /** 0..1, or "indeterminate". */
  progress?: number | "indeterminate";
  /** Indeterminate segment position 0..1 (animate it). */
  sweep?: number;
  progressColor: string;
  actions: { label: string; primary?: boolean }[];
  primaryColor: string;
  onPrimary: string;
  style?: CSSProperties;
};

/** An Android 16 Live Update notification card in Material 3 style. */
export function AndroidLiveUpdate({
  scheme,
  appName,
  badge,
  badgeColor,
  title,
  text,
  subText,
  when = "now",
  progress,
  sweep = 0,
  progressColor,
  actions,
  primaryColor,
  onPrimary,
  style,
}: Props) {
  return (
    <div style={{ borderRadius: 24, background: scheme.card, color: scheme.onCard, padding: "14px 16px", fontFamily: FONT.ui, ...style }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, color: scheme.onCardMuted }}>
        <span style={{ width: 22, height: 22, borderRadius: 999, background: badgeColor, display: "grid", placeItems: "center" }}>{badge}</span>
        <span style={{ fontWeight: 600, color: scheme.onCard, marginLeft: 2 }}>{appName}</span>
        <span>·</span>
        <span style={tabular}>{when}</span>
        <span style={{ marginLeft: "auto" }}>
          <Glyph name="chevronDown" size={16} color={scheme.onCardMuted} />
        </span>
      </div>
      <div style={{ marginTop: 8, fontSize: 15, fontWeight: 650, lineHeight: "20px" }}>{title}</div>
      <div style={{ fontSize: 13, lineHeight: "18px", color: scheme.onCardMuted, ...tabular }}>{text}</div>
      {subText ? <div style={{ fontSize: 13, lineHeight: "18px", color: scheme.onCardMuted, ...tabular }}>{subText}</div> : null}
      {progress !== undefined ? (
        <div style={{ position: "relative", marginTop: 10, height: 5, borderRadius: 999, background: scheme.track, overflow: "hidden" }}>
          {progress === "indeterminate" ? (
            <span
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                width: "38%",
                left: `${-38 + sweep * 138}%`,
                borderRadius: 999,
                background: progressColor,
              }}
            />
          ) : (
            <span style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: `${progress * 100}%`, borderRadius: 999, background: progressColor }} />
          )}
        </div>
      ) : null}
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        {actions.map((a) => (
          <span
            key={a.label}
            style={{
              flex: 1,
              height: 34,
              borderRadius: 999,
              display: "grid",
              placeItems: "center",
              fontSize: 13,
              fontWeight: 650,
              background: a.primary ? primaryColor : scheme.action,
              color: a.primary ? onPrimary : scheme.onAction,
            }}
          >
            {a.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/** The promoted Live Update chip in the Android 16 status bar. */
export function StatusChip({ label, background, color }: { label: string; background: string; color: string }) {
  return (
    <span style={{ borderRadius: 999, background, color, padding: "2px 8px", fontSize: 11, fontWeight: 700, lineHeight: "15px", ...tabular }}>
      {label}
    </span>
  );
}
