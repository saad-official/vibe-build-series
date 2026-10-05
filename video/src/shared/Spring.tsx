import type { CSSProperties, ReactNode } from "react";
import { useCurrentFrame, useVideoConfig, type SpringConfig } from "remotion";
import { SPRINGS, springAt } from "./motion";

type Props = {
  children: ReactNode;
  /** Frame (relative to the enclosing Sequence) the element starts entering. */
  delay?: number;
  from?: "up" | "down" | "left" | "right" | "scale" | "none";
  distance?: number;
  config?: Partial<SpringConfig>;
  style?: CSSProperties;
};

/** Wraps children in a spring entrance (opacity + translate or scale). */
export function SpringIn({ children, delay = 0, from = "up", distance = 24, config = SPRINGS.settle, style }: Props) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = springAt(frame, fps, delay, config);
  const d = (1 - p) * distance;
  const transform =
    from === "up"
      ? `translateY(${d}px)`
      : from === "down"
        ? `translateY(${-d}px)`
        : from === "left"
          ? `translateX(${-d}px)`
          : from === "right"
            ? `translateX(${d}px)`
            : from === "scale"
              ? `scale(${0.92 + 0.08 * p})`
              : undefined;
  return <div style={{ opacity: Math.min(1, p * 1.2), transform, ...style }}>{children}</div>;
}
export * from "./motion";
