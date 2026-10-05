import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Caption, SubCaption } from "../../../shared/Caption";
import { FONT } from "../../../shared/fonts";
import { SPRINGS, springAt } from "../../../shared/motion";
import { Stage } from "../../../shared/Stage";
import { TapRipple } from "../../../shared/TapRipple";
import { FlowScreen, TodayScreen, TurnproofAppIcon } from "../screens";
import { STAGE_BG, headline, sub } from "../style";
import { L } from "../tokens";
import { FLOW_START, TurnproofPhone } from "./phone";

export const REVEAL_FRAMES = 120;

const TAP = 80;
const PUSH = 90;
/** Centre of Maple St's Start button on the Today screen. */
export const START_TAP = { x: 219, y: 206 } as const;

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Scene 2: the Today screen springs in, Maple St is due, tap Start. */
export function Reveal() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = springAt(frame, fps, 2, SPRINGS.soft);
  const mark = springAt(frame, fps, 10, SPRINGS.settle);
  const press = interpolate(frame, [TAP - 4, TAP, TAP + 6, TAP + 10], [0, 1, 1, 0], clamp);
  const push = springAt(frame, fps, PUSH, SPRINGS.settle, 18);
  const late = frame >= 46;
  return (
    <Stage
      background={STAGE_BG}
      phoneStyle={{ opacity: Math.min(1, p * 1.4), transform: `translateY(${(1 - p) * 90}px) scale(${0.94 + 0.06 * p})` }}
      phone={
        <TurnproofPhone>
          <div style={{ position: "absolute", inset: 0, transform: `translateX(${-push * 30}%)` }}>
            <TodayScreen time={late ? "10:59" : "10:58"} countdown={`Checkout 11:00 AM · in ${late ? 1 : 2} min`} pressStart={press} />
            <div style={{ position: "absolute", inset: 0, background: "#000", opacity: push * 0.12 }} />
          </div>
          {push > 0.001 ? (
            <div style={{ position: "absolute", inset: 0, transform: `translateX(${(1 - push) * 100}%)`, boxShadow: "-8px 0 24px rgba(43,38,32,0.12)" }}>
              <FlowScreen {...FLOW_START} />
            </div>
          ) : null}
          <TapRipple x={START_TAP.x} y={START_TAP.y} at={TAP} color="rgba(26,31,36,0.35)" />
        </TurnproofPhone>
      }
      caption={
        <div style={{ opacity: 1 - Math.max(0, Math.min(1, (frame - 108) / 10)) }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, opacity: mark, transform: `translateY(${(1 - mark) * 16}px)` }}>
            <TurnproofAppIcon size={68} shadow="0 0 0 1px rgba(43,38,32,0.10), 0 8px 18px -10px rgba(43,38,32,0.35)" />
            <span style={{ fontFamily: FONT.sourceSans, fontWeight: 700, fontSize: 78, lineHeight: 1, letterSpacing: -1.6, color: L.text }}>Turnproof</span>
          </div>
          <Caption text="A turnover checklist with photo proof." delay={22} stagger={3} style={{ ...headline, fontSize: 48, marginTop: 28 }} />
          <SubCaption delay={46} style={sub}>
            For solo cleaners and small hosts. Free, no ads.
          </SubCaption>
        </div>
      }
    />
  );
}
