import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill } from "remotion";
import { PHONE } from "./PhoneFrame";

export const VIDEO = { width: 1280, height: 720, fps: 30 } as const;

/**
 * The two-column grid every phone scene uses: captions on the left, the phone on the right.
 * The columns never overlap (caption column ends at 656 px, the phone starts at 760 px), so a
 * caption can never sit on top of the device even when the camera pushes in a little.
 */
export const LAYOUT = {
  captionX: 96,
  captionWidth: 560,
  phoneX: 760,
  phoneY: (VIDEO.height - PHONE.height) / 2,
} as const;

/** Phone centre, for camera moves that scale around it. */
export const PHONE_CENTER = { x: LAYOUT.phoneX + PHONE.width / 2, y: LAYOUT.phoneY + PHONE.height / 2 } as const;

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.5 0 0 0 0 0.5 0 0 0 0 0.5 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/**
 * A faint static grain over soft gradients: dithers the 8-bit steps so H.264 does not turn a
 * large, gentle glow into visible bands. Neutral on average (overlay blend of mid-grey noise).
 */
export function Grain({ opacity = 0.07 }: { opacity?: number }) {
  return <AbsoluteFill style={{ backgroundImage: NOISE, mixBlendMode: "overlay", opacity, pointerEvents: "none" }} />;
}

type Props = {
  background: string;
  caption?: ReactNode;
  phone?: ReactNode;
  /** Extra transform on the phone slot (camera push / reveal). */
  phoneStyle?: CSSProperties;
  children?: ReactNode;
};

export function Stage({ background, caption, phone, phoneStyle, children }: Props) {
  return (
    <AbsoluteFill style={{ background, overflow: "hidden" }}>
      <Grain />
      {children}
      {caption ? (
        <div
          style={{
            position: "absolute",
            left: LAYOUT.captionX,
            top: 0,
            bottom: 0,
            width: LAYOUT.captionWidth,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {caption}
        </div>
      ) : null}
      {phone ? <div style={{ position: "absolute", left: LAYOUT.phoneX, top: LAYOUT.phoneY, ...phoneStyle }}>{phone}</div> : null}
    </AbsoluteFill>
  );
}

/** Stacks several captions in the same spot (each fades itself in and out). */
export function CaptionSlot({ children, height = 360 }: { children: ReactNode; height?: number }) {
  return <div style={{ position: "relative", height }}>{children}</div>;
}

/** One caption block in a `CaptionSlot`, vertically centred in the slot. */
export function CaptionLayer({ children }: { children: ReactNode }) {
  return <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>{children}</div>;
}
