import { TransitionSeries } from "@remotion/transitions";
import { TRANSITION_FRAMES, sceneFade } from "../../shared/SceneTransition";
import { CORE_FRAMES, Core } from "./scenes/Core";
import { NATIVE_FRAMES, NativeSurfaces } from "./scenes/NativeSurfaces";
import { PROBLEM_FRAMES, Problem } from "./scenes/Problem";
import { OUTRO_FRAMES, PunchcardOutro } from "./scenes/PunchcardOutro";
import { REVEAL_FRAMES, Reveal } from "./scenes/Reveal";

/**
 * Punchcard product video, 28 s at 30 fps:
 * Problem 0–6 s · Reveal 6–10 s · Core 10–18 s · Native surfaces 18–24 s · Outro 24–28 s.
 * Reveal → Core is a hard join on the same phone; the other joins cross-fade.
 */
export const PUNCHCARD_DURATION = PROBLEM_FRAMES + REVEAL_FRAMES + CORE_FRAMES + NATIVE_FRAMES + OUTRO_FRAMES - 3 * TRANSITION_FRAMES;

export function Punchcard() {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={PROBLEM_FRAMES}>
        <Problem />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition {...sceneFade()} />
      <TransitionSeries.Sequence durationInFrames={REVEAL_FRAMES}>
        <Reveal />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence durationInFrames={CORE_FRAMES}>
        <Core />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition {...sceneFade()} />
      <TransitionSeries.Sequence durationInFrames={NATIVE_FRAMES}>
        <NativeSurfaces />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition {...sceneFade()} />
      <TransitionSeries.Sequence durationInFrames={OUTRO_FRAMES}>
        <PunchcardOutro />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
}
