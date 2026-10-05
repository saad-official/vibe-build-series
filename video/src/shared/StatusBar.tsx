import type { ReactNode } from "react";
import { FONT, tabular } from "./fonts";

type Props = {
  time?: string;
  color: string;
  variant?: "iphone" | "android";
  /** Android 16 promoted Live Update chip, drawn beside the clock. */
  chip?: ReactNode;
  /** Hide the clock (the iOS Lock Screen shows it large instead). */
  hideTime?: boolean;
  /** A compact Live Activity widens the Dynamic Island: keep only the clock and battery. */
  islandActive?: boolean;
};

function Signal({ color }: { color: string }) {
  return (
    <span style={{ display: "flex", alignItems: "flex-end", gap: 2 }}>
      {[4, 6, 8, 10].map((h) => (
        <span key={h} style={{ width: 3, height: h, borderRadius: 1, background: color }} />
      ))}
    </span>
  );
}

function Wifi({ color }: { color: string }) {
  return (
    <svg width="15" height="11" viewBox="0 0 15 11" aria-hidden>
      <path d="M7.5 10.5l2.3-2.6a3.2 3.2 0 0 0-4.6 0z" fill={color} />
      <path d="M3.6 6.3a5.6 5.6 0 0 1 7.8 0" stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M1.3 3.9a8.9 8.9 0 0 1 12.4 0" stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function Battery({ color }: { color: string }) {
  return (
    <span style={{ position: "relative", width: 23, height: 11, borderRadius: 3, border: `1px solid ${color}`, opacity: 0.95 }}>
      <span style={{ position: "absolute", inset: 1.5, right: 5, borderRadius: 1.5, background: color }} />
      <span style={{ position: "absolute", right: -3, top: 3, width: 1.5, height: 4, borderRadius: 1, background: color, opacity: 0.6 }} />
    </span>
  );
}

/** iOS / Android status bar, sized for the 282 px-wide screen inside `PhoneFrame`. */
export function StatusBar({ time = "9:41", color, variant = "iphone", chip, hideTime, islandActive }: Props) {
  const ios = variant === "iphone";
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: ios ? 46 : 34,
        padding: ios ? (islandActive ? "15px 22px 0 24px" : "15px 26px 0 30px") : "10px 18px 0 18px",
        display: "flex",
        alignItems: ios ? "flex-start" : "center",
        justifyContent: "space-between",
        color,
        fontFamily: FONT.ui,
        fontSize: ios ? 14 : 12,
        fontWeight: 600,
        zIndex: 5,
        ...tabular,
      }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 40 }}>
        {hideTime ? null : <span>{time}</span>}
        {chip}
      </span>
      <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {islandActive ? null : <Signal color={color} />}
        {islandActive ? null : <Wifi color={color} />}
        <Battery color={color} />
      </span>
    </div>
  );
}
