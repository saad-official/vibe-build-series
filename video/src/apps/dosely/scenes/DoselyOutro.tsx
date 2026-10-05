import { FONT } from "../../../shared/fonts";
import { Outro } from "../../../shared/Outro";
import { DoselyAppIcon } from "../screens";
import { L } from "../tokens";

export const OUTRO_FRAMES = 135;

/** Scene 5: name, promise, URL. */
export function DoselyOutro() {
  return (
    <Outro
      background={`radial-gradient(820px 600px at 50% 50%, rgba(31,163,154,0.12) 0%, rgba(31,163,154,0.06) 40%, rgba(31,163,154,0.02) 72%, rgba(31,163,154,0) 100%), ${L.surface}`}
      mark={<DoselyAppIcon size={96} />}
      name="Dosely"
      nameStyle={{ fontFamily: FONT.atkinson, fontWeight: 650, fontSize: 108, lineHeight: 1, letterSpacing: -2, color: L.text }}
      promise="Reminders you can act on. Free, forever."
      promiseStyle={{ fontFamily: FONT.atkinson, fontWeight: 650, fontSize: 56, lineHeight: 1.1, letterSpacing: -1, color: L.text }}
      highlight={["Free,", "forever."]}
      highlightColor={L.accentText}
      url="getdosely.vercel.app"
      platforms="iPhone + Android · coming soon"
      textColor={L.text}
      mutedColor={L.textSecondary}
      urlBackground={L.accentSoft}
    />
  );
}
