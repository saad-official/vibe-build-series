import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { AndroidLiveUpdate, MATERIAL_LIGHT, StatusChip } from "../../../shared/AndroidLiveUpdate";
import { Caption, SubCaption } from "../../../shared/Caption";
import { FONT } from "../../../shared/fonts";
import { HomeScreen } from "../../../shared/HomeScreen";
import { springAt } from "../../../shared/motion";
import { PhoneFrame } from "../../../shared/PhoneFrame";
import { SceneTransition, TRANSITION_FRAMES } from "../../../shared/SceneTransition";
import { SpringIn } from "../../../shared/Spring";
import { CaptionLayer, CaptionSlot, Grain, LAYOUT, Stage } from "../../../shared/Stage";
import { StatusBar } from "../../../shared/StatusBar";
import { NextCheckWidget, PdfPage, TemplogAppIcon, ThermoMark } from "../screens";
import { HOME_WALLPAPER, PHONE_SHADOW, STAGE_BG, STEEL_BG, headline, sub } from "../style";
import { CHILI, L, STAGE1_MAX, motion, stage1Label } from "../tokens";

export const NATIVE_FRAMES = 195;
const CUT_A = 62;
const CUT_B = 120;

/** Templog's `gentle` spring (sheets, cards, the cooling ring). */
const GENTLE = motion.spring.gentle;

function Widget() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ghost = "rgba(255,255,255,0.55)";
  return (
    <Stage
      background={STAGE_BG}
      phone={
        <PhoneFrame screen={L.surface} bezel="#0B1114" shadow={PHONE_SHADOW} indicator="rgba(18,25,28,0.55)">
          <HomeScreen wallpaper={HOME_WALLPAPER} statusColor={L.text} ghost={ghost} time="2:05" gridTop={200} rows={4} appIcon={<TemplogAppIcon size={50} />}>
            <SpringIn delay={4} from="scale">
              <NextCheckWidget ring={springAt(frame, fps, 10, GENTLE)} />
            </SpringIn>
          </HomeScreen>
        </PhoneFrame>
      }
      caption={
        <CaptionSlot>
          <CaptionLayer>
            <Caption text="The next check, on the Home Screen." delay={14} style={headline} />
            <SubCaption delay={24} style={sub}>
              Which checkpoint is next, how long until it is due, and today&apos;s share logged.
            </SubCaption>
          </CaptionLayer>
        </CaptionSlot>
      }
    />
  );
}

/** 46 min left in stage 1 at 2:04 PM: 74 of the 360 cooling minutes used. */
const MINUTES_LEFT = CHILI.minutesLeft - 2;
const USED = (CHILI.stage1Minutes - MINUTES_LEFT) / CHILI.totalMinutes;
const STAGE1_END = CHILI.stage1Minutes / CHILI.totalMinutes;

/**
 * The Live Update's two-segment bar (`native/live-status.android.ts`): stage 1 (2 h) in heat, stage 2
 * (4 h) in cold, a warning point at the 2-hour mark. Drawn as one gradient across the full bar.
 */
function segmentBar(): string {
  const u = (USED * 100).toFixed(2);
  const s = (STAGE1_END * 100).toFixed(2);
  const e = (STAGE1_END * 100 + 1.2).toFixed(2);
  return `linear-gradient(90deg, ${L.heat} 0 ${u}%, rgba(232,86,42,0.28) ${u}% ${s}%, ${L.warning} ${s}% ${e}%, rgba(47,127,214,0.3) ${e}% 100%)`;
}

function AndroidShade() {
  const m = MATERIAL_LIGHT;
  return (
    <Stage
      background={STAGE_BG}
      phone={
        <PhoneFrame screen={m.shade} variant="android" bezel="#0B1114" shadow={PHONE_SHADOW} indicator="rgba(18,25,28,0.5)">
          <div style={{ position: "absolute", inset: 0, background: m.shade, fontFamily: FONT.ui, color: m.onCard }}>
            <StatusBar variant="android" time="2:04" color={m.onCard} chip={<StatusChip label={`${MINUTES_LEFT}m`} background={L.heat} color={L.onHeat} />} />
            <div style={{ position: "absolute", top: 44, left: 14, right: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} style={{ height: 50, borderRadius: 999, background: i === 0 ? "#C9D3D6" : "#F4F6F7" }} />
              ))}
            </div>
            <div style={{ position: "absolute", top: 166, left: 18, fontSize: 13, fontWeight: 600, color: m.onCardMuted }}>Mon, Oct 5</div>
            <SpringIn delay={4} distance={30} style={{ position: "absolute", top: 192, left: 10, right: 10 }}>
              <AndroidLiveUpdate
                scheme={m}
                appName="Templog"
                badge={<ThermoMark size={17} color={L.onHeat} heat={L.surfaceElevated} />}
                badgeColor={L.heat}
                title={CHILI.name}
                text={stage1Label(MINUTES_LEFT)}
                subText={`Stage 1 · ≤ ${STAGE1_MAX} by ${CHILI.stage1Due}`}
                when={CHILI.stage1Due}
                progress={1}
                progressColor={segmentBar()}
                actions={[]}
                primaryColor={L.heat}
                onPrimary={L.onHeat}
                style={{ boxShadow: "0 1px 3px rgba(11,17,20,0.08)" }}
              />
            </SpringIn>
            <SpringIn delay={10} distance={30} style={{ position: "absolute", top: 336, left: 10, right: 10 }}>
              <div style={{ height: 64, borderRadius: 24, background: m.card, opacity: 0.75 }} />
            </SpringIn>
          </div>
        </PhoneFrame>
      }
      caption={
        <CaptionSlot>
          <CaptionLayer>
            <Caption text="A Live Update on Android 16." delay={10} style={headline} />
            <SubCaption delay={20} style={sub}>
              The cooling timer in the status bar and the shade: stage 1 in heat, stage 2 in cold.
            </SubCaption>
          </CaptionLayer>
        </CaptionSlot>
      }
    />
  );
}

function Pdf() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const page = springAt(frame, fps, 4, GENTLE);
  return (
    <AbsoluteFill style={{ background: STEEL_BG }}>
      <Grain />
      <div style={{ position: "absolute", left: LAYOUT.captionX, top: 0, bottom: 0, width: 540, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Caption text="A PDF the inspector can read." delay={10} style={headline} />
        <SubCaption delay={20} style={sub}>
          Every reading with its time and initials, every fail with what was done about it, every missed check.
        </SubCaption>
      </div>
      <div
        style={{
          position: "absolute",
          left: 690,
          top: 132,
          opacity: page,
          transform: `translateY(${(1 - page) * 50}px) rotate(${-1.4 * page}deg)`,
        }}
      >
        <PdfPage rowsIn={(i) => springAt(frame, fps, 10 + i * 3, GENTLE)} actionIn={springAt(frame, fps, 32, GENTLE)} />
      </div>
    </AbsoluteFill>
  );
}

/** Scene 4: quick cuts across the native surfaces and the inspector PDF. */
export function NativeSurfaces() {
  return (
    <>
      {/* Base layer, so cut fades and the outgoing cross-fade never show through to black. */}
      <AbsoluteFill style={{ background: STAGE_BG }} />
      <Sequence durationInFrames={CUT_A + 6}>
        <SceneTransition durationInFrames={CUT_A + 6} fadeIn={0} fadeOut={8}>
          <Widget />
        </SceneTransition>
      </Sequence>
      <Sequence from={CUT_A} durationInFrames={CUT_B - CUT_A + 6}>
        <SceneTransition durationInFrames={CUT_B - CUT_A + 6} fadeIn={8} fadeOut={8}>
          <AndroidShade />
        </SceneTransition>
      </Sequence>
      {/* Ends (faded out) when the cross-fade into the outro starts, so nothing overlaps the end card. */}
      <Sequence from={CUT_B} durationInFrames={NATIVE_FRAMES - TRANSITION_FRAMES - CUT_B}>
        <SceneTransition durationInFrames={NATIVE_FRAMES - TRANSITION_FRAMES - CUT_B} fadeIn={8} fadeOut={10}>
          <Pdf />
        </SceneTransition>
      </Sequence>
    </>
  );
}
