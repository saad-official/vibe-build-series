import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { AndroidLiveUpdate, MATERIAL_LIGHT, StatusChip } from "../../../shared/AndroidLiveUpdate";
import { Caption, SubCaption } from "../../../shared/Caption";
import { FONT } from "../../../shared/fonts";
import { Ghost, HomeScreen } from "../../../shared/HomeScreen";
import { SPRINGS, springAt, tween } from "../../../shared/motion";
import { PhoneFrame } from "../../../shared/PhoneFrame";
import { SceneTransition, TRANSITION_FRAMES } from "../../../shared/SceneTransition";
import { SpringIn } from "../../../shared/Spring";
import { CaptionLayer, CaptionSlot, Stage } from "../../../shared/Stage";
import { StatusBar } from "../../../shared/StatusBar";
import { Icon, NextTurnoverWidget, TurnproofAppIcon } from "../screens";
import { HOME_WALLPAPER, PHONE_SHADOW, STAGE_BG, headline, sub } from "../style";
import { L, X, formatElapsed } from "../tokens";
import { BrowserCard, ProofPage } from "./ProofPage";

export const NATIVE_FRAMES = 195;
const CUT_A = 54;
const CUT_B = 104;

function Widget() {
  const ghost = "rgba(255,255,255,0.62)";
  return (
    <Stage
      background={STAGE_BG}
      phone={
        <PhoneFrame screen={L.surface} bezel="#0B0D0F" shadow={PHONE_SHADOW} indicator="rgba(26,31,36,0.55)">
          <HomeScreen wallpaper={HOME_WALLPAPER} statusColor={L.text} ghost={ghost} time="9:40" gridTop={198} rows={4}>
            <div style={{ display: "flex", gap: 22, alignItems: "flex-start" }}>
              <SpringIn delay={4} from="scale">
                <NextTurnoverWidget countdown="in 1 h 20 min" />
              </SpringIn>
              <div style={{ display: "grid", gridTemplateColumns: "50px 50px", gap: 18 }}>
                <TurnproofAppIcon size={50} />
                <Ghost color={ghost} />
                <Ghost color={ghost} />
                <Ghost color={ghost} />
              </div>
            </div>
          </HomeScreen>
        </PhoneFrame>
      }
      caption={
        <CaptionSlot>
          <CaptionLayer>
            <Caption text="The next turnover, on your Home Screen." delay={10} style={headline} />
            <SubCaption delay={20} style={sub}>
              Checkout time and a countdown, without opening the app.
            </SubCaption>
          </CaptionLayer>
        </CaptionSlot>
      }
    />
  );
}

function AndroidShade() {
  const frame = useCurrentFrame();
  const m = MATERIAL_LIGHT;
  const elapsed = 42 * 60 + 31 + frame / 30;
  const segments = [L.accent, L.accent, L.accent, X.track, X.track, X.track];
  return (
    <Stage
      background={STAGE_BG}
      phone={
        <PhoneFrame screen={m.shade} variant="android" bezel="#0B0D0F" shadow={PHONE_SHADOW} indicator="rgba(26,31,36,0.5)">
          <div style={{ position: "absolute", inset: 0, background: m.shade, fontFamily: FONT.ui, color: m.onCard }}>
            <StatusBar variant="android" time="11:42" color={m.onCard} chip={<StatusChip label="3/6" background={L.accent} color={L.onAccent} />} />
            <div style={{ position: "absolute", top: 44, left: 14, right: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} style={{ height: 50, borderRadius: 999, background: i === 0 ? "#C9D3D6" : "#F4F6F7" }} />
              ))}
            </div>
            <div style={{ position: "absolute", top: 166, left: 18, fontSize: 13, fontWeight: 600, color: m.onCardMuted }}>Tue, Oct 6</div>
            <SpringIn delay={4} distance={30} style={{ position: "absolute", top: 192, left: 10, right: 10 }}>
              <AndroidLiveUpdate
                scheme={m}
                appName="Turnproof"
                badge={<Icon name="check" size={13} color={L.onAccent} />}
                badgeColor={L.accent}
                title="Maple St"
                text="Bathroom · 3/6 rooms"
                subText="Turnover in progress"
                when={formatElapsed(elapsed)}
                progressColor={L.accent}
                segments={segments}
                actions={[]}
                primaryColor={L.accent}
                onPrimary={L.onAccent}
                style={{ boxShadow: "0 1px 3px rgba(43,38,32,0.08)" }}
              />
            </SpringIn>
            <SpringIn delay={10} distance={30} style={{ position: "absolute", top: 330, left: 10, right: 10 }}>
              <div style={{ height: 64, borderRadius: 24, background: m.card, opacity: 0.75 }} />
            </SpringIn>
          </div>
        </PhoneFrame>
      }
      caption={
        <CaptionSlot>
          <CaptionLayer>
            <Caption text="A Live Update on Android 16." delay={8} style={headline} />
            <SubCaption delay={18} style={sub}>
              One progress segment per room, and the time so far, in the shade and the status bar.
            </SubCaption>
          </CaptionLayer>
        </CaptionSlot>
      }
    />
  );
}

const CARD = { x: 520, y: 52, width: 664, height: 616 } as const;

function ProofLink() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = springAt(frame, fps, 2, SPRINGS.soft);
  // Hold on the header and the bathroom pair, scroll past the kitchen pair to the footer.
  const scroll = tween(frame, [20, 52], [0, 520]);
  return (
    <AbsoluteFill style={{ background: STAGE_BG }}>
      <div style={{ position: "absolute", left: 96, top: 0, bottom: 0, width: 380, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Caption text="A proof link the host can open." delay={8} style={{ ...headline, fontSize: 54, maxWidth: 380 }} />
        <SubCaption delay={18} style={{ ...sub, fontSize: 23, maxWidth: 380 }}>
          Before and after, room by room, each photo checked. No account, no app.
        </SubCaption>
      </div>
      <div style={{ position: "absolute", left: CARD.x, top: CARD.y, opacity: p, transform: `translateY(${(1 - p) * 40}px)` }}>
        <BrowserCard url="getturnproof.vercel.app/p/7Qm2xK" width={CARD.width} height={CARD.height} scroll={scroll}>
          <ProofPage />
        </BrowserCard>
      </div>
    </AbsoluteFill>
  );
}

/** Scene 4: quick cuts across the native surfaces, then the public proof page. */
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
          <ProofLink />
        </SceneTransition>
      </Sequence>
    </>
  );
}
