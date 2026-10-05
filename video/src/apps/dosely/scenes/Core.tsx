import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Caption, SubCaption } from "../../../shared/Caption";
import { LiveActivityCard, LockScreen } from "../../../shared/LockScreen";
import { SPRINGS, springAt } from "../../../shared/motion";
import { PHONE } from "../../../shared/PhoneFrame";
import { CaptionLayer, CaptionSlot, Stage } from "../../../shared/Stage";
import { TapRipple } from "../../../shared/TapRipple";
import { CircleView, DoseLiveActivity, TodayScreen } from "../screens";
import { LOCK_WALLPAPER, STAGE_BG, headline, sub } from "../style";
import { DoselyPhone } from "./Reveal";

export const CORE_FRAMES = 240;

const SLEEP = 26;
const WAKE = 36;
const ACTIVITY_IN = 42;
const PUSH_IN = 52;
const TAP = 104;
const TAKEN = 112;
const DISMISS = 134;
const PULL_BACK = 132;
const UNLOCK = 146;
const RING = 156;
const TO_CIRCLE = 184;
const ALL_GOOD = 202;

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Scene 3: a dose comes due, the Lock Screen Live Activity takes it, the day and the circle update. */
export function Core() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sleep = interpolate(frame, [SLEEP, SLEEP + 8, WAKE, WAKE + 10], [0, 1, 1, 0], clamp);
  const activity = springAt(frame, fps, ACTIVITY_IN, SPRINGS.soft);
  const dismiss = springAt(frame, fps, DISMISS, SPRINGS.settle, 16);
  const taken = springAt(frame, fps, TAKEN, SPRINGS.gentle);
  const push = springAt(frame, fps, PUSH_IN, SPRINGS.settle, 40) - springAt(frame, fps, PULL_BACK, SPRINGS.settle, 30);
  const scale = 1 + 0.2 * push;
  const origin = `${PHONE.width / 2}px ${PHONE.height - 150}px`;

  const unlock = interpolate(frame, [UNLOCK, UNLOCK + 10], [0, 1], clamp);
  const ring = 1 + springAt(frame, fps, RING, SPRINGS.soft);
  const toCircle = springAt(frame, fps, TO_CIRCLE, SPRINGS.settle, 22);
  const allGood = springAt(frame, fps, ALL_GOOD, SPRINGS.gentle);
  const minutesLeft = frame < TAP ? 60 - Math.floor(Math.max(0, frame - ACTIVITY_IN) / 60) : 59;

  // Taken button centre on the Lock Screen, in screen coordinates.
  const tapX = 10 + 14 + (PHONE.screenWidth - 20 - 28 - 8) / 4;
  const tapY = PHONE.screenHeight - 86 - 14 - 17;

  return (
    <Stage
      background={STAGE_BG}
      phoneStyle={{ transform: `scale(${scale})`, transformOrigin: origin }}
      phone={
        <DoselyPhone>
          {frame < WAKE ? <TodayScreen time="8:29" taken={1} lisinopril={0} /> : null}
          {frame >= WAKE && unlock < 1 ? (
            <div style={{ position: "absolute", inset: 0, opacity: 1 - unlock }}>
              <LockScreen wallpaper={LOCK_WALLPAPER} time="8:30" date="Monday, October 5">
                <LiveActivityCard
                  background="rgba(26,32,37,0.92)"
                  style={{
                    opacity: activity * (1 - dismiss),
                    transform: `translateY(${(1 - activity) * 40 + dismiss * 30}px) scale(${1 - 0.04 * dismiss})`,
                  }}
                >
                  <DoseLiveActivity minutesLeft={minutesLeft} taken={taken} />
                </LiveActivityCard>
              </LockScreen>
            </div>
          ) : null}
          {unlock > 0 ? (
            <div style={{ position: "absolute", inset: 0, opacity: unlock, overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, transform: `translateX(${-toCircle * 100}%)` }}>
                <TodayScreen time="8:31" taken={ring} lisinopril={1} />
              </div>
              {toCircle > 0 ? (
                <div style={{ position: "absolute", inset: 0, transform: `translateX(${(1 - toCircle) * 100}%)` }}>
                  <CircleView allGood={allGood} />
                </div>
              ) : null}
            </div>
          ) : null}
          <div style={{ position: "absolute", inset: 0, background: "#000", opacity: sleep, zIndex: 15 }} />
          <TapRipple x={tapX} y={tapY} at={TAP} />
        </DoselyPhone>
      }
      caption={
        <CaptionSlot>
          {frame < 80 ? (
            <CaptionLayer>
              <Caption text="A dose comes due." delay={4} exitAt={66} style={headline} />
              <SubCaption delay={16} exitAt={66} style={sub}>
                Lisinopril 10 mg for Mum, 8:30 AM. The dose window opens on the Lock Screen.
              </SubCaption>
            </CaptionLayer>
          ) : null}
          {frame >= 74 && frame < 152 ? (
            <CaptionLayer>
              <Caption text="Mark it Taken from the Lock Screen." delay={76} exitAt={140} style={headline} />
              <SubCaption delay={88} exitAt={140} style={sub}>
                Or snooze it ten minutes. No unlocking, no searching.
              </SubCaption>
            </CaptionLayer>
          ) : null}
          {frame >= 146 ? (
            <CaptionLayer>
              <Caption text="Your day updates. Your circle stays calm." delay={150} exitAt={CORE_FRAMES - 25} style={headline} />
              <SubCaption delay={186} exitAt={CORE_FRAMES - 25} style={sub}>
                Caregivers only hear from Dosely when a dose is missed.
              </SubCaption>
            </CaptionLayer>
          ) : null}
        </CaptionSlot>
      }
    />
  );
}

