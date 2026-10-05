import { useCurrentFrame, useVideoConfig } from "remotion";
import { Caption, SubCaption } from "../../../shared/Caption";
import { condensed } from "../../../shared/fonts";
import { SPRINGS, springAt } from "../../../shared/motion";
import { PhoneFrame } from "../../../shared/PhoneFrame";
import { Stage } from "../../../shared/Stage";
import { ClockScreen, PunchMark } from "../screens";
import { STAGE_BG, sub } from "../style";
import { C } from "../tokens";

export const REVEAL_FRAMES = 120;

/** The phone the Reveal and Core scenes share (same position, so the cut between them is seamless). */
export function PunchPhone({ children }: { children: React.ReactNode }) {
  return (
    <PhoneFrame screen={C.surface} indicator="rgba(242,239,232,0.7)">
      {children}
    </PhoneFrame>
  );
}

/** Scene 2: the Clock screen springs in, in the app's own identity. */
export function Reveal() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = springAt(frame, fps, 2, SPRINGS.gentle);
  const mark = springAt(frame, fps, 10, SPRINGS.settle);
  return (
    <Stage
      background={STAGE_BG}
      phoneStyle={{ opacity: Math.min(1, p * 1.4), transform: `translateY(${(1 - p) * 90}px) scale(${0.94 + 0.06 * p})` }}
      phone={
        <PunchPhone>
          <ClockScreen run={0} seconds={0} />
        </PunchPhone>
      }
      caption={
        <div style={{ opacity: 1 - Math.max(0, Math.min(1, (frame - 108) / 10)) }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, opacity: mark, transform: `translateY(${(1 - mark) * 16}px)` }}>
            <PunchMark height={56} />
            <span style={{ ...condensed, fontWeight: 800, fontSize: 84, lineHeight: 1, letterSpacing: -0.5, color: C.text }}>Punchcard</span>
          </div>
          <Caption
            text="A job clock for the trades."
            delay={22}
            stagger={3}
            style={{ ...condensed, fontWeight: 800, fontSize: 52, lineHeight: 1, color: C.accent, marginTop: 24 }}
          />
          <SubCaption delay={40} style={sub}>
            For plumbers, electricians, cleaners, landscapers and handypeople who bill by the hour.
          </SubCaption>
        </div>
      }
    />
  );
}
