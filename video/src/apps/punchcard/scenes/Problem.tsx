import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { exitOpacity } from "../../../shared/SceneTransition";
import { Caption, SubCaption } from "../../../shared/Caption";
import { FONT, condensed } from "../../../shared/fonts";
import { SPRINGS, springAt } from "../../../shared/motion";
import { C } from "../tokens";

const HOURS = ["Hour 1", "Hour 2", "Hour 3", "Hour 4", "Hour 5"];

/** Five billable hours: four land on the timesheet, the fifth drains to a dashed outline. */
function HourBlocks() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lost = interpolate(frame, [104, 126], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ display: "flex", gap: 12, marginTop: 48 }}>
      {HOURS.map((label, i) => {
        const p = springAt(frame, fps, 58 + i * 6, SPRINGS.settle);
        const isLost = i === 4;
        const fill = isLost ? 1 - lost : 1;
        return (
          <div
            key={label}
            style={{
              position: "relative",
              width: 168,
              height: 64,
              borderRadius: 12,
              opacity: p,
              transform: `translateY(${(1 - p) * 14}px)`,
              border: `2px ${isLost && lost > 0.5 ? "dashed" : "solid"} ${isLost ? (lost > 0.5 ? C.accentText : C.border) : C.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 16px",
              fontFamily: FONT.ui,
            }}
          >
            <div style={{ position: "absolute", inset: 0, borderRadius: 10, background: C.surfaceElevated, opacity: fill }} />
            <span style={{ position: "relative", fontSize: 18, fontWeight: 600, color: isLost && lost > 0.5 ? C.accentText : C.text }}>{label}</span>
            <span
              style={{
                position: "relative",
                fontSize: 15,
                fontWeight: 600,
                color: isLost && lost > 0.5 ? C.accentText : C.textSecondary,
              }}
            >
              {isLost && lost > 0.5 ? "Not billed" : "Billed"}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export const PROBLEM_FRAMES = 195;

/** Scene 1: the evidence line, quiet and stark. */
export function Problem() {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: C.surface }}>
      <AbsoluteFill style={{ justifyContent: "center", paddingLeft: 96, paddingRight: 96, opacity: exitOpacity(frame, PROBLEM_FRAMES) }}>
      <Caption
        text="Manual time tracking loses about 1 billable hour in 5."
        delay={8}
        stagger={4}
        highlight={["1", "billable", "hour", "in", "5."]}
        highlightColor={C.accent}
        style={{ ...condensed, fontWeight: 800, fontSize: 92, lineHeight: 0.96, letterSpacing: -0.5, color: C.text, maxWidth: 1000 }}
      />
      <HourBlocks />
      <SubCaption delay={128} style={{ marginTop: 40, fontFamily: FONT.ui, fontSize: 26, fontWeight: 500, color: C.textSecondary }}>
        ClockShark: $40/month + $9 per user, 3-year contract.
      </SubCaption>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
