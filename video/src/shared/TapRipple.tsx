import { interpolate, useCurrentFrame } from "remotion";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** A fingertip tap at frame `at`: a soft disc presses in, then a ring spreads out. */
export function TapRipple({ x, y, at, color = "rgba(255,255,255,0.9)" }: { x: number; y: number; at: number; color?: string }) {
  const frame = useCurrentFrame();
  const t = frame - at;
  if (t < -8 || t > 24) return null;
  const disc = interpolate(t, [-8, 0, 6, 14], [0, 0.45, 0.45, 0], clamp);
  const discScale = interpolate(t, [-8, 0, 4], [1.25, 0.88, 1], clamp);
  const ring = interpolate(t, [0, 20], [0, 1], clamp);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 0, height: 0, zIndex: 30, pointerEvents: "none" }}>
      <span
        style={{
          position: "absolute",
          left: -22,
          top: -22,
          width: 44,
          height: 44,
          borderRadius: 999,
          background: color,
          opacity: disc,
          transform: `scale(${discScale})`,
        }}
      />
      {t >= 0 ? (
        <span
          style={{
            position: "absolute",
            left: -22,
            top: -22,
            width: 44,
            height: 44,
            borderRadius: 999,
            border: `2px solid ${color}`,
            opacity: (1 - ring) * 0.7,
            transform: `scale(${1 + ring * 1.2})`,
          }}
        />
      ) : null}
    </div>
  );
}
