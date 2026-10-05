import type { ReactNode } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { Caption, SubCaption } from "../../../shared/Caption";
import { FONT } from "../../../shared/fonts";
import { SPRINGS, springAt } from "../../../shared/motion";
import { PhoneFrame } from "../../../shared/PhoneFrame";
import { Stage } from "../../../shared/Stage";
import { DoselyAppIcon, TodayScreen } from "../screens";
import { PHONE_SHADOW, STAGE_BG, headline, sub } from "../style";
import { L } from "../tokens";

export const REVEAL_FRAMES = 120;

/** The phone the Reveal and Core scenes share (same slot, so the join between them is seamless). */
export function DoselyPhone({ children }: { children: ReactNode }) {
  return (
    <PhoneFrame screen={L.surface} bezel="#0A0D0F" shadow={PHONE_SHADOW} indicator="rgba(28,36,48,0.55)">
      {children}
    </PhoneFrame>
  );
}

/** Scene 2: the Today screen springs in, calm teal on a soft surface. */
export function Reveal() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = springAt(frame, fps, 2, SPRINGS.soft);
  const mark = springAt(frame, fps, 10, SPRINGS.settle);
  return (
    <Stage
      background={STAGE_BG}
      phoneStyle={{ opacity: Math.min(1, p * 1.4), transform: `translateY(${(1 - p) * 90}px) scale(${0.94 + 0.06 * p})` }}
      phone={
        <DoselyPhone>
          <TodayScreen time="8:29" taken={1} lisinopril={0} />
        </DoselyPhone>
      }
      caption={
        <div style={{ opacity: 1 - Math.max(0, Math.min(1, (frame - 108) / 10)) }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, opacity: mark, transform: `translateY(${(1 - mark) * 16}px)` }}>
            <DoselyAppIcon size={64} />
            <span style={{ fontFamily: FONT.atkinson, fontWeight: 650, fontSize: 76, lineHeight: 1, letterSpacing: -1.5, color: L.text }}>Dosely</span>
          </div>
          <Caption text="Medication reminders for you and the people you look after." delay={22} stagger={3} style={{ ...headline, fontSize: 44, marginTop: 28 }} />
          <SubCaption delay={46} style={sub}>
            No subscription, no ads, no limit on medications.
          </SubCaption>
        </div>
      }
    />
  );
}
