import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Caption, SubCaption } from "../../../shared/Caption";
import { LiveActivityCard, LockScreen } from "../../../shared/LockScreen";
import { SPRINGS, springAt } from "../../../shared/motion";
import { PHONE } from "../../../shared/PhoneFrame";
import { CaptionLayer, CaptionSlot, Stage } from "../../../shared/Stage";
import { TapRipple } from "../../../shared/TapRipple";
import { CoolingLiveActivity, CoolingScreen, LOG_BUTTON, LogSheet, SAVE_BUTTON, TodayScreen, keyCenter, tabCenter, type Key } from "../screens";
import { LOCK_WALLPAPER, STAGE_BG, headline, sub } from "../style";
import { TemplogPhone as TemplogPhoneShell } from "./Reveal";
import { CHILI, CHILI_USED, COLD_MAX, COOL_START, HOT_MIN, L, STAGE1_MAX, STAGE2_MAX, motion, temp } from "../tokens";

export const CORE_FRAMES = 240;

const TAP_LOG = 18;
const SHEET_UP = 24;
const PRESSES: { key: Key; at: number }[] = [
  { key: "4", at: 44 },
  { key: "1", at: 52 },
  { key: ".", at: 60 },
  { key: "0", at: 68 },
];
const TAP_SAVE = 82;
const STAMP = 84;
const SHEET_DOWN = 104;
const TAP_TAB = 120;
const TO_COOLING = 124;
const RING = 128;
const SLEEP = 160;
const WAKE = 170;
const ACTIVITY_IN = 174;
const PUSH_IN = 182;
const PULL_BACK = 208;

/** Templog's own springs (`packages/shared/src/tokens.ts`): snappy for the stamp, gentle for sheets and the ring. */
const SNAPPY = motion.spring.snappy;
const GENTLE = motion.spring.gentle;

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** A press that peaks at `at`: 0 → 1 → 0 over ~10 frames. */
function press(frame: number, at: number): number {
  return interpolate(frame, [at - 4, at, at + 6], [0, 1, 0], clamp);
}

/** Scene 3: log the due check on the keypad, see it pass, then the cooling timer and its Live Activity. */
export function Core() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Keypad entry.
  const typed = PRESSES.filter((p) => frame >= p.at);
  const text = ["", "4", "41", "41.", "41.0"][typed.length];
  const last = typed.length ? typed[typed.length - 1].at : -100;
  const settle = frame - last < 2 ? 0.97 : 0.97 + 0.03 * springAt(frame, fps, last + 2, SNAPPY);
  const active = PRESSES.find((p) => Math.abs(frame - p.at) <= 6 && press(frame, p.at) > 0);
  const pressed = active ? { key: active.key, p: press(frame, active.at) } : null;
  const stamp = frame >= STAMP ? springAt(frame, fps, STAMP, SNAPPY) : 0;

  // Sheet up / down; the board behind recedes like an iOS page sheet.
  const sheet = springAt(frame, fps, SHEET_UP, GENTLE) - springAt(frame, fps, SHEET_DOWN, SPRINGS.settle, 18);
  const loggedBoard = frame >= SHEET_DOWN;

  const toCooling = interpolate(frame, [TO_COOLING, TO_COOLING + 8], [0, 1], clamp);
  const ring = CHILI_USED * springAt(frame, fps, RING, GENTLE);

  const sleep = interpolate(frame, [SLEEP, SLEEP + 8, WAKE, WAKE + 10], [0, 1, 1, 0], clamp);
  const activity = springAt(frame, fps, ACTIVITY_IN, GENTLE);
  const secondsLeft = CHILI.minutesLeft * 60 - Math.max(0, frame - WAKE) / fps;

  const push = springAt(frame, fps, PUSH_IN, SPRINGS.settle, 34) - springAt(frame, fps, PULL_BACK, SPRINGS.settle, 30);
  const scale = 1 + 0.18 * push;
  const origin = `${PHONE.width / 2}px ${PHONE.height - 158}px`;

  const tab = tabCenter(2);

  return (
    <Stage
      background={STAGE_BG}
      phoneStyle={{ transform: `scale(${scale})`, transformOrigin: origin }}
      phone={
        <TemplogPhoneShell>
          {frame < WAKE ? (
            <>
              {toCooling < 1 ? (
                <div style={{ position: "absolute", inset: 0, background: "#0B1114" }}>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      overflow: "hidden",
                      borderRadius: 14 * sheet,
                      transform: `translateY(${sheet * 10}px) scale(${1 - 0.07 * sheet})`,
                      opacity: 1 - 0.25 * sheet,
                    }}
                  >
                    <TodayScreen time={loggedBoard ? "2:02" : "2:01"} logged={loggedBoard} logPressed={press(frame, TAP_LOG)} />
                  </div>
                  {sheet > 0.001 ? (
                    <div style={{ position: "absolute", inset: 0, transform: `translateY(${(1 - sheet) * 610}px)` }}>
                      <LogSheet text={text} settle={settle} pressed={pressed} savePressed={press(frame, TAP_SAVE)} stamp={stamp} />
                    </div>
                  ) : null}
                </div>
              ) : null}
              {toCooling > 0 ? (
                <div style={{ position: "absolute", inset: 0, opacity: toCooling }}>
                  <CoolingScreen ring={ring} />
                </div>
              ) : null}
            </>
          ) : (
            <LockScreen wallpaper={LOCK_WALLPAPER} time="2:02" date="Monday, October 5">
              <LiveActivityCard
                background="rgba(25,33,37,0.92)"
                style={{ padding: 12, opacity: activity, transform: `translateY(${(1 - activity) * 40}px)` }}
              >
                <CoolingLiveActivity secondsLeft={secondsLeft} />
              </LiveActivityCard>
            </LockScreen>
          )}
          <div style={{ position: "absolute", inset: 0, background: "#000", opacity: sleep, zIndex: 15 }} />
          <TapRipple x={LOG_BUTTON.x} y={LOG_BUTTON.y} at={TAP_LOG} color="rgba(18,25,28,0.35)" />
          {PRESSES.map((p) => {
            const c = keyCenter(p.key);
            return <TapRipple key={p.at} x={c.x} y={c.y} at={p.at} color="rgba(18,25,28,0.28)" />;
          })}
          <TapRipple x={SAVE_BUTTON.x} y={SAVE_BUTTON.y} at={TAP_SAVE} color="rgba(18,25,28,0.35)" />
          <TapRipple x={tab.x} y={tab.y} at={TAP_TAB} color="rgba(18,25,28,0.3)" />
        </TemplogPhoneShell>
      }
      caption={
        <CaptionSlot>
          {frame < 68 ? (
            <CaptionLayer>
              <Caption text="Due now? Log it in two taps." delay={4} exitAt={56} style={headline} />
              <SubCaption delay={14} exitAt={56} style={sub}>
                Tap the card, then type the number on a big keypad.
              </SubCaption>
            </CaptionLayer>
          ) : null}
          {frame >= 62 && frame < 124 ? (
            <CaptionLayer>
              <Caption text="Pass or fail, by the Food Code." delay={64} exitAt={112} highlight={["Pass"]} highlightColor={L.passText} style={headline} />
              <SubCaption delay={74} exitAt={112} style={sub}>
                {`Cold holding at ${temp(COLD_MAX)} or below. Hot holding at ${temp(HOT_MIN)} or above.`}
              </SubCaption>
            </CaptionLayer>
          ) : null}
          {frame >= 118 && frame < 174 ? (
            <CaptionLayer>
              <Caption text="Cooling timers count both stages." delay={122} exitAt={160} style={headline} />
              <SubCaption delay={132} exitAt={160} style={sub}>
                {`${COOL_START} to ${STAGE1_MAX} within 2 hours, then to ${STAGE2_MAX} by hour 6.`}
              </SubCaption>
            </CaptionLayer>
          ) : null}
          {frame >= 166 ? (
            <CaptionLayer>
              <Caption text="On the Lock Screen, counting down." delay={170} exitAt={CORE_FRAMES - 27} style={headline} />
              <SubCaption delay={180} exitAt={CORE_FRAMES - 27} style={sub}>
                Log reading or Discarded, without unlocking the phone.
              </SubCaption>
            </CaptionLayer>
          ) : null}
        </CaptionSlot>
      }
    />
  );
}

