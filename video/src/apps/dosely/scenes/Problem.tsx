import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { exitOpacity } from "../../../shared/SceneTransition";
import { Caption, SubCaption } from "../../../shared/Caption";
import { FONT } from "../../../shared/fonts";
import { SPRINGS, springAt } from "../../../shared/motion";
import { CheckDisc } from "../screens";
import { L } from "../tokens";

/** Ten of the app's own Taken checks: five fill, five stay empty. */
function HalfChecks() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ display: "flex", gap: 20, marginTop: 52 }}>
      {Array.from({ length: 10 }, (_, i) => {
        const appear = springAt(frame, fps, 56 + i * 4, SPRINGS.settle);
        const check = i < 5 ? springAt(frame, fps, 84 + i * 5, SPRINGS.soft) : 0;
        return (
          <div key={i} style={{ opacity: appear, transform: `translateY(${(1 - appear) * 14}px)` }}>
            <CheckDisc p={check} size={60} />
          </div>
        );
      })}
    </div>
  );
}

export const PROBLEM_FRAMES = 195;

/** Scene 1: the adherence gap, calm and quiet. */
export function Problem() {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: L.surface }}>
      <AbsoluteFill style={{ justifyContent: "center", paddingLeft: 96, paddingRight: 96, opacity: exitOpacity(frame, PROBLEM_FRAMES) }}>
      <Caption
        text="Only half of chronic patients take their medication as prescribed."
        delay={8}
        stagger={4}
        highlight={["half"]}
        highlightColor={L.accentText}
        style={{ fontFamily: FONT.atkinson, fontWeight: 650, fontSize: 72, lineHeight: 1.1, letterSpacing: -1.2, color: L.text, maxWidth: 1040 }}
      />
      <HalfChecks />
      <SubCaption delay={128} style={{ marginTop: 44, fontFamily: FONT.atkinson, fontSize: 28, fontWeight: 400, color: L.textSecondary }}>
        Medisafe went paid on 1 Jan 2026: 2 medications free.
      </SubCaption>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
