import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Caption, SubCaption } from "../../../shared/Caption";
import { LiveActivityCard, LockScreen } from "../../../shared/LockScreen";
import { SPRINGS, springAt } from "../../../shared/motion";
import { PHONE } from "../../../shared/PhoneFrame";
import { CaptionLayer, CaptionSlot, Stage } from "../../../shared/Stage";
import { TapRipple } from "../../../shared/TapRipple";
import { CaptureScreen, FlowScreen, RoomDoneCheck, TurnoverLiveActivity, type RoomState } from "../screens";
import { LOCK_WALLPAPER, STAGE_BG, headline, sub } from "../style";
import { ROOMS, motion } from "../tokens";
import { FLOW_START, TurnproofPhone, missingText } from "./phone";

export const CORE_FRAMES = 240;

/** The app's own springs (`motion.spring` in packages/shared tokens). */
const GENTLE = motion.spring.gentle;
const SOFT = motion.spring.soft;

const TAP_BEFORE = 16;
const CAM_IN = 18;
const SHUTTER = 36;
const TAP_CAM_DONE = 46;
const CAM_OUT = 48;
const BEFORE_IN = 56;
const SCROLL_1 = 58;
const CHECKS = [72, 79, 86, 93];
const SCROLL_2 = 100;
const TAP_AFTER = 112;
const AFTER_IN = 117;
const TAP_DONE = 126;
const ROOM_DONE = 128;
const CHECK_OUT = 147;
const SLEEP = 148;
const WAKE = 158;
const ACTIVITY_IN = 160;
const PUSH_IN = 168;
const RING = 174;

/** Elapsed seconds when the bathroom starts (38:12) and when the Lock Screen wakes (42:18). */
const BATHROOM_AT = 38 * 60 + 12;
const LOCK_AT = 42 * 60 + 18;

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ripple = "rgba(26,31,36,0.35)";

/** Taps, in screen coordinates (tile and row centres after each scroll). */
const AT = {
  beforeTile: { x: 59, y: 284 },
  shutter: { x: 141, y: 540 },
  cameraDone: { x: 236, y: 540 },
  checkX: 38,
  checkY: (i: number, scroll: number) => 412 + i * 47 - scroll,
  afterTile: { x: 59, y: 444 },
  roomDone: { x: 186, y: 548 },
} as const;

/** Scene 3: before photo at the shutter, the checklist, the after photo, Room done, the Lock Screen. */
export function Core() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Room pager: Kitchen to Bathroom. Rooms 1 and 2 were done earlier: a time cut, the timer jumps.
  const slide = springAt(frame, fps, 0, SPRINGS.settle, 14);
  const page = slide * 2;
  // The bathroom takes about three minutes, shown as a time-lapse: 38:12 at the first frame of the
  // room, 41:20 when the after photo lands (stamped 11:41), then real time.
  const elapsed =
    frame < 7
      ? FLOW_START.elapsedSeconds
      : interpolate(frame, [7, AFTER_IN, AFTER_IN + 30], [BATHROOM_AT, 41 * 60 + 20, 41 * 60 + 21], { extrapolateRight: "extend" });

  const cam = springAt(frame, fps, CAM_IN, SPRINGS.settle, 12) - springAt(frame, fps, CAM_OUT, SPRINGS.settle, 12);
  const shutterPress = interpolate(frame, [SHUTTER - 2, SHUTTER, SHUTTER + 4], [0, 1, 0], clamp);
  const shots = frame >= SHUTTER + 4 ? springAt(frame, fps, SHUTTER + 4, GENTLE) : 0;
  const flash = Math.max(
    interpolate(frame, [SHUTTER, SHUTTER + 1, SHUTTER + 6], [0, 0.85, 0], clamp),
    interpolate(frame, [TAP_AFTER + 1, TAP_AFTER + 2, TAP_AFTER + 7], [0, 0.75, 0], clamp),
  );

  const scroll = 120 * springAt(frame, fps, SCROLL_1, SPRINGS.settle, 12) + 120 * springAt(frame, fps, SCROLL_2, SPRINGS.settle, 12);
  const checks = CHECKS.map((at) => springAt(frame, fps, at, GENTLE));
  const checked = checks.filter((c) => c > 0.5).length;
  const before = frame >= BEFORE_IN ? springAt(frame, fps, BEFORE_IN, SOFT) : undefined;
  const after = frame >= AFTER_IN ? springAt(frame, fps, AFTER_IN, SOFT) : undefined;
  const done = frame >= ROOM_DONE + 2 ? springAt(frame, fps, ROOM_DONE + 2, GENTLE) : 0;

  const bathroom: RoomState = {
    before,
    after,
    checks,
    done,
    pressBefore: interpolate(frame, [TAP_BEFORE - 2, TAP_BEFORE, TAP_BEFORE + 4], [0, 1, 0], clamp),
    pressAfter: interpolate(frame, [TAP_AFTER - 2, TAP_AFTER, TAP_AFTER + 4], [0, 1, 0], clamp),
  };
  const roomsDone = [springAt(frame, fps, 5, GENTLE), springAt(frame, fps, 9, GENTLE), done, 0, 0, 0];
  const missing = missingText(ROOMS[2].items.length - checked, after === undefined);
  const primary = frame >= ROOM_DONE + 4 ? "next-room" : missing ? "disabled" : "room-done";
  const pressPrimary = interpolate(frame, [TAP_DONE - 2, TAP_DONE, TAP_DONE + 4], [0, 1, 0], clamp);

  const checkIn = interpolate(frame, [ROOM_DONE, ROOM_DONE + 10], [0, 1], clamp);
  const checkOut = interpolate(frame, [CHECK_OUT, CHECK_OUT + 6], [0, 1], clamp);

  // Lock Screen.
  const sleep = interpolate(frame, [SLEEP, SLEEP + 8, WAKE, WAKE + 10], [0, 1, 1, 0], clamp);
  const activity = springAt(frame, fps, ACTIVITY_IN, SOFT);
  const ring = 2 / 6 + springAt(frame, fps, RING, SOFT) / 6;
  const push = springAt(frame, fps, PUSH_IN, SPRINGS.settle, 40);
  const scale = 1 + 0.18 * push;
  const origin = `${PHONE.width / 2}px ${PHONE.height - 150}px`;
  const lockElapsed = LOCK_AT + Math.max(0, frame - WAKE) / 30;
  const clockSeconds = Math.max(24, 24 + Math.floor((frame - CAM_IN) / 30));

  return (
    <Stage
      background={STAGE_BG}
      phoneStyle={{ transform: `scale(${scale})`, transformOrigin: origin }}
      phone={
        <TurnproofPhone>
          {frame < WAKE ? (
            <>
              <FlowScreen
                time={frame < 7 ? "11:00" : frame < 70 ? "11:38" : frame < AFTER_IN ? "11:40" : "11:41"}
                elapsedSeconds={elapsed}
                page={page}
                roomsDone={roomsDone}
                rooms={{ 0: FLOW_START.rooms[0], 1: FLOW_START.rooms[1], 2: bathroom }}
                scroll={scroll}
                primary={primary}
                missing={primary === "next-room" ? null : missing}
                pressPrimary={pressPrimary}
              />
              <RoomDoneCheck p={checkIn} out={checkOut} />
              {cam > 0.001 ? (
                <div style={{ position: "absolute", inset: 0, transform: `translateY(${(1 - cam) * 100}%)`, zIndex: 8 }}>
                  <CaptureScreen clock={`11:38:${String(clockSeconds).padStart(2, "0")}`} shots={shots} press={shutterPress} />
                </div>
              ) : null}
              <div style={{ position: "absolute", inset: 0, background: "#fff", opacity: flash, zIndex: 9 }} />
            </>
          ) : (
            <LockScreen wallpaper={LOCK_WALLPAPER} time="11:42" date="Tuesday, October 6">
              <LiveActivityCard background="rgba(28,32,37,0.92)" style={{ opacity: activity, transform: `translateY(${(1 - activity) * 40}px)` }}>
                <TurnoverLiveActivity elapsedSeconds={lockElapsed} roomsDone={3} ringProgress={ring} />
              </LiveActivityCard>
            </LockScreen>
          )}
          <div style={{ position: "absolute", inset: 0, background: "#000", opacity: sleep, zIndex: 15 }} />
          <TapRipple x={AT.beforeTile.x} y={AT.beforeTile.y} at={TAP_BEFORE} color={ripple} />
          <TapRipple x={AT.shutter.x} y={AT.shutter.y} at={SHUTTER} />
          <TapRipple x={AT.cameraDone.x} y={AT.cameraDone.y} at={TAP_CAM_DONE} />
          {CHECKS.map((at, i) => (
            <TapRipple key={at} x={AT.checkX} y={AT.checkY(i, scroll)} at={at} color={ripple} />
          ))}
          <TapRipple x={AT.afterTile.x} y={AT.afterTile.y} at={TAP_AFTER} color={ripple} />
          <TapRipple x={AT.roomDone.x} y={AT.roomDone.y} at={TAP_DONE} />
        </TurnproofPhone>
      }
      caption={
        <CaptionSlot>
          {frame < 64 ? (
            <CaptionLayer>
              <Caption text="Before photos, stamped at the shutter." delay={4} exitAt={52} style={headline} />
              <SubCaption delay={14} exitAt={52} style={sub}>
                Time and GPS are written the moment you shoot. Camera only.
              </SubCaption>
            </CaptionLayer>
          ) : null}
          {frame >= 58 && frame < 146 ? (
            <CaptionLayer>
              <Caption text="Tick the room. Shoot the after." delay={62} exitAt={134} style={headline} />
              <SubCaption delay={72} exitAt={134} style={sub}>
                A room is done once its items are ticked and it has an after photo.
              </SubCaption>
            </CaptionLayer>
          ) : null}
          {frame >= 140 ? (
            <CaptionLayer>
              <Caption text="The turnover, on your Lock Screen." delay={150} exitAt={CORE_FRAMES - 25} style={headline} />
              <SubCaption delay={164} exitAt={CORE_FRAMES - 25} style={sub}>
                Room, rooms done and time so far, with Next room and Issue.
              </SubCaption>
            </CaptionLayer>
          ) : null}
        </CaptionSlot>
      }
    />
  );
}
