import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Caption, SubCaption } from "../../../shared/Caption";
import { FONT, tabular } from "../../../shared/fonts";
import { SPRINGS, springAt } from "../../../shared/motion";
import { exitOpacity } from "../../../shared/SceneTransition";
import { Grain } from "../../../shared/Stage";
import { STEEL_BG, condensed } from "../style";
import { L, STAGE1_MAX } from "../tokens";

export const PROBLEM_FRAMES = 195;

/** A paper log for the day: four holding checks written in, the chili's 2-hour cooling check left blank. */
const SLOTS = [
  { time: "8:00 AM", label: "Walk-in", value: "38" },
  { time: "10:00 AM", label: "Walk-in", value: "39" },
  { time: "12:00 PM", label: "Walk-in", value: "38" },
  { time: "2:00 PM", label: "Walk-in", value: "40" },
  { time: "2:50 PM", label: `Chili ≤ ${STAGE1_MAX}`, value: null },
] as const;

function PaperLog() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const missed = interpolate(frame, [104, 122], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ display: "flex", gap: 12, marginTop: 46 }}>
      {SLOTS.map((slot, i) => {
        const p = springAt(frame, fps, 56 + i * 6, SPRINGS.settle);
        const blank = slot.value === null;
        const hot = blank && missed > 0.5;
        return (
          <div
            key={slot.time}
            style={{
              position: "relative",
              width: 196,
              height: 92,
              borderRadius: 10,
              opacity: p,
              transform: `translateY(${(1 - p) * 14}px)`,
              border: `2px ${hot ? "dashed" : "solid"} ${hot ? L.heat : L.border}`,
              background: blank ? "transparent" : "#FFFFFF",
              boxSizing: "border-box",
              padding: "12px 16px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              fontFamily: FONT.archivo,
            }}
          >
            {blank ? <div style={{ position: "absolute", inset: 0, borderRadius: 8, background: L.heatSoft, opacity: missed * 0.7 }} /> : null}
            <div style={{ position: "relative", display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 600, color: hot ? L.heatText : L.textSecondary, ...tabular }}>
              <span>{slot.time}</span>
              <span>{slot.label}</span>
            </div>
            <div style={{ position: "relative", ...condensed, fontSize: 34, lineHeight: "36px", fontWeight: 700, color: hot ? L.heatText : L.text, ...tabular }}>
              {blank ? (hot ? "Missed" : "") : `${slot.value} °F`}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Scene 1: the paper log and its gap, then the price of the digital ones. */
export function Problem() {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: STEEL_BG }}>
      <Grain />
      <AbsoluteFill style={{ justifyContent: "center", paddingLeft: 96, paddingRight: 96, opacity: exitOpacity(frame, PROBLEM_FRAMES) }}>
        <Caption
          text="Paper temperature logs get lost. Staff forget the 2-hour check."
          delay={8}
          stagger={3}
          highlight={["2-hour", "check."]}
          highlightColor={L.heatText}
          style={{ ...condensed, fontWeight: 700, fontSize: 84, lineHeight: 0.98, letterSpacing: -1.2, color: L.text, maxWidth: 1060 }}
        />
        <PaperLog />
        <SubCaption delay={128} style={{ marginTop: 40, fontFamily: FONT.archivo, fontSize: 28, fontWeight: 500, color: L.textSecondary }}>
          Digital logs cost $9 to $84 a month per location.
        </SubCaption>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
