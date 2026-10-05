import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { AndroidLiveUpdate, MATERIAL_LIGHT, StatusChip } from "../../../shared/AndroidLiveUpdate";
import { Caption, SubCaption } from "../../../shared/Caption";
import { FONT } from "../../../shared/fonts";
import { Ghost, HomeScreen } from "../../../shared/HomeScreen";
import { SPRINGS, springAt } from "../../../shared/motion";
import { PhoneFrame } from "../../../shared/PhoneFrame";
import { SceneTransition, TRANSITION_FRAMES } from "../../../shared/SceneTransition";
import { SpringIn } from "../../../shared/Spring";
import { CaptionLayer, CaptionSlot, Stage } from "../../../shared/Stage";
import { StatusBar } from "../../../shared/StatusBar";
import { CapsuleMark, DoselyAppIcon, NextDoseWidget, ProgressRing } from "../screens";
import { HOME_WALLPAPER, PHONE_SHADOW, STAGE_BG, headline, sub } from "../style";
import { L, THEMES, resolveThemeColors, type ThemeId } from "../tokens";

export const NATIVE_FRAMES = 195;
const CUT_A = 62;
const CUT_B = 120;

function Widget() {
  const ghost = "rgba(255,255,255,0.6)";
  return (
    <Stage
      background={STAGE_BG}
      phone={
        <PhoneFrame screen={L.surface} bezel="#0A0D0F" shadow={PHONE_SHADOW} indicator="rgba(28,36,48,0.55)">
          <HomeScreen wallpaper={HOME_WALLPAPER} statusColor={L.text} ghost={ghost} time="12:40" gridTop={198} rows={4}>
            <div style={{ display: "flex", gap: 22, alignItems: "flex-start" }}>
              <SpringIn delay={4} from="scale">
                <NextDoseWidget />
              </SpringIn>
              <div style={{ display: "grid", gridTemplateColumns: "50px 50px", gap: 18 }}>
                <DoselyAppIcon size={50} />
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
            <Caption text="The next dose, on your Home Screen." delay={16} style={headline} />
            <SubCaption delay={26} style={sub}>
              Today&apos;s ring and what is next, without opening anything.
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
  return (
    <Stage
      background={STAGE_BG}
      phone={
        <PhoneFrame screen={m.shade} variant="android" bezel="#0A0D0F" shadow={PHONE_SHADOW} indicator="rgba(28,36,48,0.5)">
          <div style={{ position: "absolute", inset: 0, background: m.shade, fontFamily: FONT.ui, color: m.onCard }}>
            <StatusBar variant="android" time="8:31" color={m.onCard} chip={<StatusChip label="59m" background={L.accent} color={L.onAccent} />} />
            <div style={{ position: "absolute", top: 44, left: 14, right: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} style={{ height: 50, borderRadius: 999, background: i === 0 ? "#C9D3D6" : "#F4F6F7" }} />
              ))}
            </div>
            <div style={{ position: "absolute", top: 166, left: 18, fontSize: 13, fontWeight: 600, color: m.onCardMuted }}>Mon, Oct 5</div>
            <SpringIn delay={4} distance={30} style={{ position: "absolute", top: 192, left: 10, right: 10 }}>
              <AndroidLiveUpdate
                scheme={m}
                appName="Dosely"
                badge={<CapsuleMark size={15} color={L.onAccent} />}
                badgeColor={L.accent}
                title="Lisinopril 10 mg"
                text="Mum, morning dose · 59 min left"
                when="8:30"
                progress={(59 - frame / 120) / 60}
                progressColor={L.accent}
                actions={[{ label: "Taken", primary: true }, { label: "Snooze 10 min" }]}
                primaryColor={L.accent}
                onPrimary={L.onAccent}
                style={{ boxShadow: "0 1px 3px rgba(28,36,48,0.08)" }}
              />
            </SpringIn>
            <SpringIn delay={10} distance={30} style={{ position: "absolute", top: 384, left: 10, right: 10 }}>
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
              The dose window counts down in the notification shade, with Taken and Snooze.
            </SubCaption>
          </CaptionLayer>
        </CaptionSlot>
      }
    />
  );
}

const SEASONAL: ThemeId[] = ["valentines", "st-patricks", "halloween"];

function ThemeCard({ id, delay }: { id: ThemeId; delay: number }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = THEMES[id];
  const c = resolveThemeColors(id, "light");
  const p = springAt(frame, fps, delay, SPRINGS.soft);
  const ring = springAt(frame, fps, delay + 12, SPRINGS.soft) * 0.5;
  return (
    <div
      style={{
        width: 340,
        borderRadius: 24,
        background: c.surface,
        padding: 24,
        boxShadow: `0 0 0 1px ${c.separator}, 0 24px 48px -20px rgba(28,36,48,0.28)`,
        opacity: p,
        transform: `translateY(${(1 - p) * 40}px)`,
        fontFamily: FONT.atkinson,
        color: c.text,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <DoselyAppIcon size={76} accent={c.accent} onAccent={c.onAccent} motif={theme.motif} />
        <div style={{ fontSize: 28, lineHeight: "34px", fontWeight: 650, letterSpacing: -0.4 }}>{theme.name}</div>
      </div>
      <div style={{ marginTop: 14, fontSize: 18, lineHeight: "26px", color: c.textSecondary, minHeight: 52 }}>{theme.description}</div>
      <div
        style={{
          marginTop: 18,
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: 14,
          borderRadius: 16,
          background: c.surfaceElevated,
          boxShadow: `0 0 0 1px ${c.separator}`,
        }}
      >
        <ProgressRing progress={ring} size={52} stroke={6} accent={c.accent} track={c.surfaceSunken}>
          <span style={{ fontFamily: FONT.ui, fontSize: 13, fontWeight: 600 }}>2/4</span>
        </ProgressRing>
        <span style={{ flex: 1, fontFamily: FONT.ui, fontSize: 14, fontWeight: 600 }}>Lisinopril 10 mg</span>
        <span style={{ fontFamily: FONT.ui, fontSize: 13, fontWeight: 650, borderRadius: 999, padding: "7px 14px", background: c.accent, color: c.onAccent }}>Taken</span>
      </div>
    </div>
  );
}

function Themes() {
  return (
    <AbsoluteFill style={{ background: L.surface }}>
      <div style={{ position: "absolute", left: 96, top: 72, right: 96 }}>
        <Caption text="Seasonal themes, with matching app icons." delay={10} style={{ ...headline, fontSize: 50, maxWidth: 1100 }} />
        <SubCaption delay={20} style={{ ...sub, marginTop: 12, maxWidth: 900 }}>
          Pick one in Settings, or let Dosely switch by date. Every theme keeps the same contrast.
        </SubCaption>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 290, display: "flex", justifyContent: "center", gap: 32 }}>
        {SEASONAL.map((id, i) => (
          <ThemeCard key={id} id={id} delay={6 + i * 5} />
        ))}
      </div>
    </AbsoluteFill>
  );
}

/** Scene 4: quick cuts across the native surfaces and the seasonal themes. */
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
          <Themes />
        </SceneTransition>
      </Sequence>
    </>
  );
}
