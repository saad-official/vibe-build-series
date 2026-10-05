import type { ReactNode } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { Caption, SubCaption } from "../../../shared/Caption";
import { SPRINGS, springAt } from "../../../shared/motion";
import { PhoneFrame } from "../../../shared/PhoneFrame";
import { Stage } from "../../../shared/Stage";
import { TemplogAppIcon, TodayScreen } from "../screens";
import { PHONE_SHADOW, STAGE_BG, condensed, headline, sub } from "../style";
import { L } from "../tokens";

export const REVEAL_FRAMES = 120;

/** The phone the Reveal and Core scenes share (same slot, so the join between them is seamless). */
export function TemplogPhone({ children, island, islandWidth }: { children: ReactNode; island?: ReactNode; islandWidth?: number }) {
  return (
    <PhoneFrame screen={L.surface} bezel="#0B1114" shadow={PHONE_SHADOW} indicator="rgba(18,25,28,0.55)" island={island} islandWidth={islandWidth}>
      {children}
    </PhoneFrame>
  );
}

/** Scene 2: the Today board springs in on brushed steel. */
export function Reveal() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = springAt(frame, fps, 2, { damping: 24, stiffness: 140, mass: 1 });
  const mark = springAt(frame, fps, 10, SPRINGS.settle);
  return (
    <Stage
      background={STAGE_BG}
      phoneStyle={{ opacity: Math.min(1, p * 1.4), transform: `translateY(${(1 - p) * 90}px) scale(${0.94 + 0.06 * p})` }}
      phone={
        <TemplogPhone>
          <TodayScreen time="2:01" />
        </TemplogPhone>
      }
      caption={
        <div style={{ opacity: 1 - Math.max(0, Math.min(1, (frame - 106) / 10)) }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, opacity: mark, transform: `translateY(${(1 - mark) * 16}px)` }}>
            <TemplogAppIcon size={66} />
            <span style={{ ...condensed, fontWeight: 700, fontSize: 84, lineHeight: 1, letterSpacing: -1.5, color: L.text }}>Templog</span>
          </div>
          <Caption text="Temperature logs for independent kitchens and food trucks." delay={22} stagger={3} style={{ ...headline, fontSize: 46, lineHeight: 1.04, marginTop: 28 }} />
          <SubCaption delay={46} style={sub}>
            Reminders, a two-tap keypad, cooling timers and a PDF for the inspector.
          </SubCaption>
        </div>
      }
    />
  );
}
