import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { linearTiming, springTiming } from "@remotion/transitions";
import type { ReactNode } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { standardEase } from "./motion";

/** Frames every cross-scene transition takes (used to size the compositions). */
export const TRANSITION_FRAMES = 15;

/** A calm cross-fade between scenes. Spread into `<TransitionSeries.Transition {...sceneFade()} />`. */
export function sceneFade(durationInFrames = TRANSITION_FRAMES) {
  return { presentation: fade(), timing: linearTiming({ durationInFrames, easing: standardEase }) };
}

/** A push from the right, for the quick cuts between native surfaces. */
export function scenePush(durationInFrames = TRANSITION_FRAMES) {
  return {
    presentation: slide({ direction: "from-right" }),
    timing: springTiming({ config: { damping: 200 }, durationInFrames }),
  };
}

/**
 * Foreground opacity for the end of a scene: 1 until `length` frames before the outgoing
 * cross-fade starts, 0 once it starts. Captions and full-width content use it so two scenes'
 * text never overlaps during a cross-fade (only the backgrounds and the phone dissolve).
 */
export function exitOpacity(frame: number, sceneFrames: number, length = 10, lead = TRANSITION_FRAMES): number {
  const end = sceneFrames - lead;
  return interpolate(frame, [end - length, end], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
}

/**
 * Fades a block in at the start of its Sequence and out before the end, for cuts inside a
 * scene (the native-surface montage) without another TransitionSeries.
 */
export function SceneTransition({
  children,
  durationInFrames,
  fadeIn = 8,
  fadeOut = 8,
}: {
  children: ReactNode;
  /** Length of the enclosing Sequence. */
  durationInFrames: number;
  fadeIn?: number;
  fadeOut?: number;
}) {
  const frame = useCurrentFrame();
  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const opacityIn = fadeIn > 0 ? interpolate(frame, [0, fadeIn], [0, 1], clamp) : 1;
  const opacityOut = fadeOut > 0 ? interpolate(frame, [durationInFrames - fadeOut, durationInFrames], [1, 0], clamp) : 1;
  const opacity = Math.min(opacityIn, opacityOut);
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
}
