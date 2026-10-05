import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { Caption, SubCaption } from "../../../shared/Caption";
import { FONT } from "../../../shared/fonts";
import { SPRINGS, springAt } from "../../../shared/motion";
import { exitOpacity } from "../../../shared/SceneTransition";
import type { DrawingName } from "../drawings";
import { Drawing, Icon } from "../screens";
import { L } from "../tokens";

const ROLL: { drawing: DrawingName; file: string }[] = [
  { drawing: "kitchen-after", file: "IMG_2041" },
  { drawing: "bathroom-after", file: "IMG_2042" },
  { drawing: "bedroom-after", file: "IMG_2047" },
  { drawing: "kitchen-before", file: "IMG_2050" },
];

/** Four camera-roll shots: clean rooms, but nothing says when or where. */
function CameraRoll() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ display: "flex", gap: 20, marginTop: 48 }}>
      {ROLL.map((shot, i) => {
        const appear = springAt(frame, fps, 56 + i * 5, SPRINGS.settle);
        const flag = springAt(frame, fps, 92 + i * 6, SPRINGS.snappy);
        return (
          <div key={shot.file} style={{ width: 200, opacity: appear, transform: `translateY(${(1 - appear) * 16}px)` }}>
            <div style={{ position: "relative", width: 200, height: 150, borderRadius: 16, overflow: "hidden", boxShadow: "0 10px 24px -14px rgba(43,38,32,0.4)" }}>
              <Drawing name={shot.drawing} />
              <span
                style={{
                  position: "absolute",
                  left: 10,
                  bottom: 10,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "4px 10px",
                  borderRadius: 999,
                  background: L.issueSoft,
                  color: L.issueText,
                  fontFamily: FONT.sourceSans,
                  fontSize: 16,
                  fontWeight: 700,
                  opacity: flag,
                  transform: `scale(${0.85 + 0.15 * flag})`,
                  transformOrigin: "left center",
                }}
              >
                <Icon name="issue" size={15} color={L.issueText} />
                No time, no place
              </span>
            </div>
            <div style={{ marginTop: 8, fontFamily: FONT.sourceSans, fontSize: 17, color: L.textTertiary }}>{shot.file}.jpg</div>
          </div>
        );
      })}
    </div>
  );
}

export const PROBLEM_FRAMES = 195;

/** Scene 1: the complaint, and a camera roll that cannot answer it. */
export function Problem() {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: L.surface }}>
      <AbsoluteFill style={{ justifyContent: "center", paddingLeft: 96, paddingRight: 96, opacity: exitOpacity(frame, PROBLEM_FRAMES) }}>
        <Caption
          text="“It wasn’t clean.” Without timestamped photos, the cleaner has no proof."
          delay={8}
          stagger={4}
          highlight={["“It", "wasn’t", "clean.”"]}
          highlightColor={L.issueText}
          style={{ fontFamily: FONT.sourceSans, fontWeight: 700, fontSize: 66, lineHeight: 1.06, letterSpacing: -1.4, color: L.text, maxWidth: 1060 }}
        />
        <CameraRoll />
        <SubCaption delay={128} style={{ marginTop: 36, fontFamily: FONT.sourceSans, fontSize: 28, fontWeight: 400, color: L.textSecondary }}>
          Airbnb’s 2026 policy can deny evidence it cannot verify.
        </SubCaption>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
