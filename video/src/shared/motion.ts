import { Easing, interpolate, spring, type SpringConfig } from "remotion";

/**
 * Motion vocabulary shared by every video. Configs mirror the apps' own Reanimated springs
 * (calm, near-critically damped): nothing bounces like a cartoon.
 */
export const SPRINGS = {
  /** Punchcard `gentle` (sheets, cards). */
  gentle: { damping: 18, stiffness: 140, mass: 1 },
  /** Dosely `soft` (sheets, the progress ring). */
  soft: { damping: 24, stiffness: 110, mass: 1 },
  /** Buttons and toggles. */
  snappy: { damping: 20, stiffness: 320, mass: 1 },
  /** No overshoot at all: captions and camera moves. */
  settle: { damping: 200, stiffness: 120, mass: 1 },
} satisfies Record<string, Partial<SpringConfig>>;

/** The apps' `standard` easing curve, cubic-bezier(0.2, 0, 0, 1). */
export const standardEase = Easing.bezier(0.2, 0, 0, 1);
export const exitEase = Easing.bezier(0.3, 0, 1, 1);

/** Spring progress 0 → 1 starting at `delay` frames. */
export function springAt(
  frame: number,
  fps: number,
  delay = 0,
  config: Partial<SpringConfig> = SPRINGS.settle,
  durationInFrames?: number,
): number {
  return spring({ frame: frame - delay, fps, config, durationInFrames });
}

/** Clamped tween with the standard curve. */
export function tween(
  frame: number,
  input: [number, number],
  output: [number, number] = [0, 1],
  easing: (t: number) => number = standardEase,
): number {
  return interpolate(frame, input, output, { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing });
}

/** Opacity + rise for an entering element, from a 0..1 progress. */
export function riseIn(progress: number, distance = 16): { opacity: number; transform: string } {
  return { opacity: progress, transform: `translateY(${(1 - progress) * distance}px)` };
}

/** A value that is 1 between `from` and `to` (with `fade` frame ramps at each end). */
export function between(frame: number, from: number, to: number, fade = 8): number {
  const fadeIn = interpolate(frame, [from, from + fade], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [to - fade, to], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return Math.min(fadeIn, fadeOut);
}

/** Linear count between two frames, clamped (timers, earnings). */
export function countUp(frame: number, from: number, to: number, start: number, end: number, easing = standardEase): number {
  return interpolate(frame, [from, to], [start, end], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing });
}
