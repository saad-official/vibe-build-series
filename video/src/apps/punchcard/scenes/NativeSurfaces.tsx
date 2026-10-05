import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { AndroidLiveUpdate, MATERIAL_DARK, StatusChip } from "../../../shared/AndroidLiveUpdate";
import { Caption, SubCaption } from "../../../shared/Caption";
import { FONT } from "../../../shared/fonts";
import { Ghost, HomeScreen } from "../../../shared/HomeScreen";
import { SPRINGS, springAt } from "../../../shared/motion";
import { PhoneFrame } from "../../../shared/PhoneFrame";
import { SceneTransition, TRANSITION_FRAMES } from "../../../shared/SceneTransition";
import { SpringIn } from "../../../shared/Spring";
import { CaptionLayer, CaptionSlot, Stage } from "../../../shared/Stage";
import { StatusBar } from "../../../shared/StatusBar";
import { PunchAppIcon, PunchIsland, TodayWidget } from "../screens";
import { Glyph } from "../../../shared/Glyph";
import { STAGE_BG, WALLPAPER, headline, sub } from "../style";
import { C, STORY, clientColorHex, dollars, earnedCents, hms } from "../tokens";

export const NATIVE_FRAMES = 195;
const CUT = 100;

function secondsAt(frame: number) {
  return STORY.finalSeconds + 4 + frame / 30;
}

function IosHome() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const island = springAt(frame, fps, 18, SPRINGS.gentle);
  const seconds = secondsAt(frame);
  return (
    <Stage
      background={STAGE_BG}
      phone={
        <PhoneFrame
          screen="#121316"
          islandWidth={96 + 66 * island}
          island={<PunchIsland seconds={seconds} reveal={Math.max(0, island * 1.3 - 0.3)} />}
        >
          <HomeScreen wallpaper={WALLPAPER} gridTop={198} rows={4} islandActive={island > 0.05}>
            <div style={{ display: "flex", gap: 22, alignItems: "flex-start" }}>
              <SpringIn delay={4} from="scale">
                <TodayWidget seconds={seconds} />
              </SpringIn>
              <div style={{ display: "grid", gridTemplateColumns: "50px 50px", gap: 18, rowGap: 18 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <PunchAppIcon size={50} />
                </div>
                <Ghost color="rgba(255,255,255,0.14)" />
                <Ghost color="rgba(255,255,255,0.14)" />
                <Ghost color="rgba(255,255,255,0.14)" />
              </div>
            </div>
          </HomeScreen>
        </PhoneFrame>
      }
      caption={
        <CaptionSlot>
          <CaptionLayer>
            <Caption text="Widgets and the Dynamic Island." delay={16} style={headline} />
            <SubCaption delay={28} style={sub}>
              Today&apos;s total and the running job, at a glance.
            </SubCaption>
          </CaptionLayer>
        </CaptionSlot>
      }
    />
  );
}

function AndroidShade() {
  const frame = useCurrentFrame();
  const seconds = secondsAt(frame + CUT);
  const sweep = (frame % 45) / 45;
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return (
    <Stage
      background={STAGE_BG}
      phone={
        <PhoneFrame screen={MATERIAL_DARK.shade} variant="android" indicator="rgba(230,225,229,0.6)">
          <div style={{ position: "absolute", inset: 0, background: MATERIAL_DARK.shade, fontFamily: FONT.ui, color: MATERIAL_DARK.onCard }}>
            <StatusBar
              variant="android"
              time="9:41"
              color={MATERIAL_DARK.onCard}
              chip={<StatusChip label={`${h}:${String(m).padStart(2, "0")}`} background={C.accent} color={C.onAccent} />}
            />
            {/* Quick settings tiles (neutral). */}
            <div style={{ position: "absolute", top: 44, left: 14, right: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} style={{ height: 50, borderRadius: 999, background: i === 0 ? "#3A3C42" : "#24262B" }} />
              ))}
            </div>
            <div style={{ position: "absolute", top: 166, left: 18, fontSize: 13, fontWeight: 600, color: MATERIAL_DARK.onCardMuted }}>
              Mon, 5 Oct
            </div>
            <SpringIn delay={6} distance={30} style={{ position: "absolute", top: 192, left: 10, right: 10 }}>
              <AndroidLiveUpdate
                scheme={MATERIAL_DARK}
                appName="Punchcard"
                badge={<Glyph name="clock" size={13} color="#fff" />}
                badgeColor={clientColorHex("blue")}
                title={`${STORY.client} · ${STORY.job}`}
                text={`Running · ${h}h ${m}m`}
                subText={`${dollars(earnedCents(seconds))} so far`}
                when={hms(seconds)}
                progress="indeterminate"
                sweep={sweep}
                progressColor={C.accent}
                actions={[{ label: "Break" }, { label: "Stop", primary: true }]}
                primaryColor={C.accent}
                onPrimary={C.onAccent}
              />
            </SpringIn>
            <SpringIn delay={12} distance={30} style={{ position: "absolute", top: 404, left: 10, right: 10 }}>
              <div style={{ height: 64, borderRadius: 24, background: MATERIAL_DARK.card, opacity: 0.7 }} />
            </SpringIn>
          </div>
        </PhoneFrame>
      }
      caption={
        <CaptionSlot>
          <CaptionLayer>
            <Caption text="A Live Update on Android 16." delay={10} style={headline} />
            <SubCaption delay={22} style={sub}>
              The same clock, with Break and Stop, in the notification shade.
            </SubCaption>
          </CaptionLayer>
        </CaptionSlot>
      }
    />
  );
}

/** Scene 4: quick cuts across the native surfaces. */
export function NativeSurfaces() {
  return (
    <>
      {/* Base layer, so cut fades and the outgoing cross-fade never show through to black. */}
      <AbsoluteFill style={{ background: STAGE_BG }} />
      <Sequence durationInFrames={CUT + 6}>
        <SceneTransition durationInFrames={CUT + 6} fadeIn={0} fadeOut={8}>
          <IosHome />
        </SceneTransition>
      </Sequence>
      {/* Ends (faded out) when the cross-fade into the outro starts, so nothing overlaps the end card. */}
      <Sequence from={CUT} durationInFrames={NATIVE_FRAMES - TRANSITION_FRAMES - CUT}>
        <SceneTransition durationInFrames={NATIVE_FRAMES - TRANSITION_FRAMES - CUT} fadeIn={8} fadeOut={10}>
          <AndroidShade />
        </SceneTransition>
      </Sequence>
    </>
  );
}
