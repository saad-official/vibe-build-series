import type { CSSProperties, ReactNode } from "react";
import { FONT, tabular } from "./fonts";
import { Glyph } from "./Glyph";
import { StatusBar } from "./StatusBar";

type Props = {
  /** CSS background for the wallpaper (gradients only, no imagery). */
  wallpaper: string;
  time: string;
  date: string;
  /** The Live Activity (or notifications) at the bottom of the Lock Screen. */
  children?: ReactNode;
  textColor?: string;
  style?: CSSProperties;
};

/** The iOS Lock Screen: date, big clock, a bottom stack for Live Activities, flashlight and camera. */
export function LockScreen({ wallpaper, time, date, children, textColor = "#FFFFFF", style }: Props) {
  return (
    <div style={{ position: "absolute", inset: 0, background: wallpaper, color: textColor, fontFamily: FONT.ui, ...style }}>
      <StatusBar color={textColor} hideTime />
      <div style={{ position: "absolute", top: 62, left: 0, right: 0, textAlign: "center" }}>
        <div style={{ fontSize: 15, fontWeight: 600, opacity: 0.88, letterSpacing: 0.1 }}>{date}</div>
        <div style={{ fontSize: 80, lineHeight: "84px", fontWeight: 650, letterSpacing: -3, marginTop: 2, ...tabular }}>{time}</div>
      </div>
      <div style={{ position: "absolute", left: 10, right: 10, bottom: 86 }}>{children}</div>
      {[
        { side: "left" as const, icon: "flashlight" as const },
        { side: "right" as const, icon: "camera" as const },
      ].map(({ side, icon }) => (
        <div
          key={side}
          style={{
            position: "absolute",
            bottom: 30,
            [side]: 34,
            width: 42,
            height: 42,
            borderRadius: 999,
            background: "rgba(0,0,0,0.32)",
            display: "grid",
            placeItems: "center",
          }}
        >
          <Glyph name={icon} size={18} color={textColor} />
        </div>
      ))}
    </div>
  );
}

/** Container for a Live Activity banner on the Lock Screen (system dark material). */
export function LiveActivityCard({ children, background = "rgba(28,29,32,0.86)", style }: { children: ReactNode; background?: string; style?: CSSProperties }) {
  return (
    <div
      style={{
        borderRadius: 24,
        background,
        padding: 14,
        color: "#F5F5F7",
        boxShadow: "0 10px 30px -12px rgba(0,0,0,0.5)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
