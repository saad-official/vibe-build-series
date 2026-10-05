import type { CSSProperties, ReactNode } from "react";
import { StatusBar } from "./StatusBar";

type Props = {
  wallpaper: string;
  /** Widgets, laid out by the caller in the top area. */
  children: ReactNode;
  /** The featured app icon, placed first in the icon grid. */
  appIcon?: ReactNode;
  /** Colour of the neutral "other app" tiles. */
  ghost?: string;
  statusColor?: string;
  time?: string;
  /** Top of the icon grid and its number of rows (4 icons each). */
  gridTop?: number;
  rows?: number;
  /** Passed to the status bar when a compact Live Activity is showing. */
  islandActive?: boolean;
  style?: CSSProperties;
};

export const HOME_ICON = 50;

export function Ghost({ color }: { color: string }) {
  return <span style={{ width: HOME_ICON, height: HOME_ICON, borderRadius: 13, background: color }} />;
}

/**
 * An iOS Home Screen: widgets on top, neutral tiles standing in for other apps (no real brands),
 * and the dock. The tiles are deliberately plain so the widget carries the frame.
 */
export function HomeScreen({ wallpaper, children, appIcon, ghost = "rgba(255,255,255,0.14)", statusColor = "#fff", time = "9:41", gridTop = 198, rows = 4, islandActive, style }: Props) {
  return (
    <div style={{ position: "absolute", inset: 0, background: wallpaper, ...style }}>
      <StatusBar color={statusColor} time={time} islandActive={islandActive} />
      <div style={{ position: "absolute", top: 58, left: 18, right: 18 }}>{children}</div>
      <div
        style={{
          position: "absolute",
          left: 18,
          right: 18,
          top: gridTop,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          rowGap: 18,
          justifyItems: "center",
        }}
      >
        {appIcon}
        {Array.from({ length: rows * 4 - (appIcon ? 1 : 0) }, (_, i) => (
          <Ghost key={i} color={ghost} />
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          left: 12,
          right: 12,
          bottom: 22,
          height: 76,
          borderRadius: 30,
          background: "rgba(255,255,255,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          padding: "0 10px",
        }}
      >
        {Array.from({ length: 4 }, (_, i) => (
          <Ghost key={i} color={ghost} />
        ))}
      </div>
    </div>
  );
}
