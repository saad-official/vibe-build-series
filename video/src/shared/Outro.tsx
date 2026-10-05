import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { Caption, SubCaption } from "./Caption";
import { FONT } from "./fonts";
import { SPRINGS, springAt } from "./motion";
import { Grain } from "./Stage";

type Props = {
  background: string;
  mark: ReactNode;
  name: string;
  nameStyle: CSSProperties;
  promise: string;
  promiseStyle: CSSProperties;
  highlight?: string[];
  highlightColor?: string;
  url: string;
  platforms: string;
  textColor: string;
  mutedColor: string;
  /** Pill behind the URL. */
  urlBackground: string;
  children?: ReactNode;
};

/** End card: mark + name, the one-line promise, the URL and platform line. Centred, calm. */
export function Outro({
  background,
  mark,
  name,
  nameStyle,
  promise,
  promiseStyle,
  highlight,
  highlightColor,
  url,
  platforms,
  textColor,
  mutedColor,
  urlBackground,
  children,
}: Props) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const markIn = springAt(frame, fps, 8, SPRINGS.gentle);
  return (
    <AbsoluteFill style={{ background, color: textColor, alignItems: "center", justifyContent: "center", textAlign: "center" }}>
      <Grain />
      {children}
      <div style={{ display: "flex", alignItems: "center", gap: 20, opacity: markIn, transform: `translateY(${(1 - markIn) * 20}px)` }}>
        <div style={{ transform: `scale(${0.85 + 0.15 * markIn})` }}>{mark}</div>
        <div style={nameStyle}>{name}</div>
      </div>
      <Caption
        text={promise}
        delay={20}
        stagger={3}
        highlight={highlight}
        highlightColor={highlightColor}
        style={{ marginTop: 28, ...promiseStyle }}
      />
      <SubCaption delay={44} style={{ marginTop: 36, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
        <span
          style={{
            fontFamily: FONT.ui,
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: -0.3,
            padding: "10px 24px",
            borderRadius: 999,
            background: urlBackground,
          }}
        >
          {url}
        </span>
        <span style={{ fontFamily: FONT.ui, fontSize: 20, fontWeight: 500, color: mutedColor }}>{platforms}</span>
      </SubCaption>
    </AbsoluteFill>
  );
}
