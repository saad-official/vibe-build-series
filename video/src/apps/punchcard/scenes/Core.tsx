import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Caption, SubCaption } from "../../../shared/Caption";
import { FONT } from "../../../shared/fonts";
import { LiveActivityCard, LockScreen } from "../../../shared/LockScreen";
import { SPRINGS, springAt } from "../../../shared/motion";
import { PHONE } from "../../../shared/PhoneFrame";
import { CaptionLayer, CaptionSlot, Stage } from "../../../shared/Stage";
import { TapRipple } from "../../../shared/TapRipple";
import { CLOCK_LAYOUT, ClockScreen, PunchLiveActivity, clockButtonTop } from "../screens";
import { STAGE_BG, WALLPAPER, headline, sub } from "../style";
import { C, STORY } from "../tokens";
import { PunchPhone } from "./Reveal";

export const CORE_FRAMES = 240;

const TAP = 22;
const RUN_START = 24;
const LAPSE_FROM = 62;
const LAPSE_TO = 128;
const SLEEP = 134;
const WAKE = 146;
const ACTIVITY_IN = 152;
const PUSH_IN = 164;

/** Elapsed seconds on screen: real time after the tap, then a time-lapse to 1:47:12, then real time again. */
export function elapsedAt(frame: number): number {
  if (frame < RUN_START) return 0;
  if (frame < LAPSE_FROM) return (frame - RUN_START) / 30;
  if (frame < LAPSE_TO) {
    return interpolate(frame, [LAPSE_FROM, LAPSE_TO], [(LAPSE_FROM - RUN_START) / 30, STORY.finalSeconds], {
      easing: Easing.inOut(Easing.cubic),
    });
  }
  return STORY.finalSeconds + (frame - LAPSE_TO) / 30;
}

/** Scene 3: one tap on Start, the timer runs, then the camera moves to the Lock Screen Live Activity. */
export function Core() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const run = springAt(frame, fps, RUN_START, SPRINGS.snappy);
  const seconds = elapsedAt(frame);

  const sleep = interpolate(frame, [SLEEP, SLEEP + 8, WAKE, WAKE + 10], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const locked = frame >= WAKE;
  const activity = springAt(frame, fps, ACTIVITY_IN, SPRINGS.gentle);
  const push = springAt(frame, fps, PUSH_IN, SPRINGS.settle, 40);
  const scale = 1 + 0.22 * push;
  // Camera pushes in around the Live Activity (bottom of the Lock Screen).
  const origin = `${PHONE.width / 2}px ${PHONE.height - 150}px`;

  // The fingertip stays on the button while it slides down into the Stop position.
  const tapY = clockButtonTop(run) + CLOCK_LAYOUT.buttonHeight / 2;

  return (
    <Stage
      background={STAGE_BG}
      phoneStyle={{ transform: `scale(${scale})`, transformOrigin: origin }}
      phone={
        <PunchPhone>
          {locked ? (
            <LockScreen wallpaper={WALLPAPER} time="9:41" date="Monday 5 October">
              <LiveActivityCard style={{ opacity: activity, transform: `translateY(${(1 - activity) * 40}px)` }}>
                <PunchLiveActivity seconds={seconds} />
              </LiveActivityCard>
            </LockScreen>
          ) : (
            <ClockScreen run={run} seconds={seconds} />
          )}
          <div style={{ position: "absolute", inset: 0, background: "#000", opacity: sleep, zIndex: 15 }} />
          <TapRipple x={PHONE.screenWidth / 2} y={tapY} at={TAP} />
        </PunchPhone>
      }
      caption={
        <CaptionSlot>
          {frame < 74 ? (
            <CaptionLayer>
              <Caption text="One tap starts the clock." delay={4} exitAt={62} style={headline} />
              <SubCaption delay={16} exitAt={62} style={sub}>
                A firm buzz, and the job is on the clock.
              </SubCaption>
            </CaptionLayer>
          ) : null}
          {frame >= 70 && frame < 140 ? (
            <CaptionLayer>
              <Caption text="Earnings count up as you work." delay={72} exitAt={128} style={headline} />
              <SubCaption delay={84} exitAt={128} style={{ ...sub, display: "flex" }}>
                <span
                  style={{
                    fontFamily: FONT.ui,
                    fontSize: 17,
                    fontWeight: 600,
                    color: C.accentText,
                    background: C.accentSoft,
                    borderRadius: 999,
                    padding: "6px 14px",
                  }}
                >
                  Time-lapse · 1 h 47 min
                </span>
              </SubCaption>
            </CaptionLayer>
          ) : null}
          {frame >= 136 ? (
            <CaptionLayer>
              <Caption text="It keeps running on your Lock Screen." delay={140} exitAt={CORE_FRAMES - 25} style={headline} />
              <SubCaption delay={158} exitAt={CORE_FRAMES - 25} style={sub}>
                Break and Stop from the Live Activity, without opening the app.
              </SubCaption>
            </CaptionLayer>
          ) : null}
        </CaptionSlot>
      }
    />
  );
}
